import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import { generateSOANumber } from "@/lib/soaNumber";
import { generateSOAPDF } from "@/lib/pdfGenerator";
import { sendSOAEmail } from "@/lib/emailService";
import { syncSOAToHubSpot } from "@/lib/hubspot";
import { soaRequestSchema } from "@/lib/validation";
import { headers } from "next/headers";

const rateLimitMap = new Map<string, { count: number; resetAt: number }>();

function checkRateLimit(ip: string): boolean {
  const now = Date.now();
  const windowMs = 60_000;
  const max = 5;
  const record = rateLimitMap.get(ip);
  if (!record || now > record.resetAt) {
    rateLimitMap.set(ip, { count: 1, resetAt: now + windowMs });
    return true;
  }
  if (record.count >= max) return false;
  record.count += 1;
  return true;
}

export async function POST(req: NextRequest) {
  const headersList = await headers();
  const forwarded = headersList.get("x-forwarded-for");
  const ip = forwarded ? forwarded.split(",")[0].trim() : "unknown";

  if (!checkRateLimit(ip)) {
    return NextResponse.json(
      { error: "Too many requests. Please try again later." },
      { status: 429 }
    );
  }

  let body: unknown;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON body" }, { status: 400 });
  }

  const parsed = soaRequestSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json(
      { error: "Validation failed", details: parsed.error.flatten() },
      { status: 400 }
    );
  }

  const data = parsed.data;

  if (data.honeypot) {
    return NextResponse.json({ error: "Bot detected" }, { status: 400 });
  }

  const subtotal = data.rate * data.registrants.length;
  const vat = subtotal * 0.12;
  const total = subtotal + vat;

  try {
    const soaNumber = await generateSOANumber();

    const soa = await prisma.statementOfAccount.create({
      data: {
        soaNumber,
        requestorName: data.requestorName,
        email: data.email,
        phone: data.phone,
        jobTitle: data.jobTitle,
        registrationType: data.registrationType,
        headcount: data.headcount,
        companyName: data.companyName,
        companyAddress: data.companyAddress,
        tin: data.tin,
        sproutClient: data.sproutClient,
        rate: data.rate,
        subtotal,
        vat,
        total,
        status: "Unpaid",
        registrants: {
          create: data.registrants.map((r) => ({
            name: r.name,
            email: r.email,
          })),
        },
      },
      include: { registrants: true },
    });

    const pdfBuffer = await generateSOAPDF({
      soaNumber: soa.soaNumber,
      requestorName: soa.requestorName,
      email: soa.email,
      companyName: soa.companyName,
      companyAddress: soa.companyAddress,
      tin: soa.tin,
      sproutClient: soa.sproutClient,
      rate: soa.rate,
      subtotal: soa.subtotal,
      vat: soa.vat,
      total: soa.total,
      registrants: soa.registrants,
      createdAt: soa.createdAt,
    });

    await sendSOAEmail({
      to: soa.email,
      requestorName: soa.requestorName,
      soaNumber: soa.soaNumber,
      pdfBuffer,
    });

    // Fire-and-forget — HubSpot failure must never block SOA generation
    syncSOAToHubSpot({
      requestorName: soa.requestorName,
      requestorEmail: soa.email,
      phone: soa.phone,
      jobTitle: soa.jobTitle,
      registrationType: soa.registrationType,
      headcount: soa.headcount,
      companyName: soa.companyName,
      registrants: soa.registrants,
    }).catch((err) => console.error("HubSpot sync error:", err));

    return NextResponse.json(
      { success: true, soaNumber: soa.soaNumber, id: soa.id, total: soa.total },
      { status: 201 }
    );
  } catch (error) {
    console.error("Generate SOA error:", error);
    return NextResponse.json(
      { error: "Failed to generate SOA. Please try again." },
      { status: 500 }
    );
  }
}
