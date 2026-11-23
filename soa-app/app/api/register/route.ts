import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { syncSOAToHubSpot } from "@/lib/hubspot";
import { headers } from "next/headers";

const registrationSchema = z.object({
  name: z.string().min(2, "Name is required"),
  email: z.string().email("Invalid email address"),
  phone: z.string().min(7, "Phone number is required"),
  jobTitle: z.string().min(1, "Job title is required"),
  companyName: z.string().min(2, "Company name is required"),
  headcount: z.string().min(1, "Headcount is required"),
  registrationType: z.string().min(1, "Registration type is required"),
  honeypot: z.string().max(0).optional(),
});

// Simple in-memory rate limit
const rateLimitMap = new Map<string, { count: number; resetAt: number }>();
function checkRateLimit(ip: string): boolean {
  const now = Date.now();
  const record = rateLimitMap.get(ip);
  if (!record || now > record.resetAt) {
    rateLimitMap.set(ip, { count: 1, resetAt: now + 60_000 });
    return true;
  }
  if (record.count >= 10) return false;
  record.count += 1;
  return true;
}

export async function POST(req: NextRequest) {
  const headersList = await headers();
  const ip = (headersList.get("x-forwarded-for") ?? "unknown").split(",")[0].trim();

  if (!checkRateLimit(ip)) {
    return NextResponse.json({ error: "Too many requests." }, { status: 429 });
  }

  let body: unknown;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON" }, { status: 400 });
  }

  const parsed = registrationSchema.safeParse(body);
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

  try {
    await syncSOAToHubSpot({
      requestorName: data.name,
      requestorEmail: data.email,
      phone: data.phone,
      jobTitle: data.jobTitle,
      registrationType: data.registrationType,
      headcount: data.headcount,
      companyName: data.companyName,
      registrants: [],
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Registration HubSpot sync error:", error);
    return NextResponse.json(
      { error: "Registration failed. Please try again." },
      { status: 500 }
    );
  }
}
