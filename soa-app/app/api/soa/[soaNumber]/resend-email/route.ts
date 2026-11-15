import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import { generateSOAPDF } from "@/lib/pdfGenerator";
import { sendSOAEmail } from "@/lib/emailService";

export async function POST(
  _req: NextRequest,
  { params }: { params: Promise<{ soaNumber: string }> }
) {
  try {
    const { soaNumber } = await params;

    const soa = await prisma.statementOfAccount.findUnique({
      where: { soaNumber },
      include: { registrants: true },
    });

    if (!soa) {
      return NextResponse.json({ error: "SOA not found" }, { status: 404 });
    }

    const pdfBuffer = await generateSOAPDF({
      ...soa,
      registrants: soa.registrants,
    });

    await sendSOAEmail({
      to: soa.email,
      requestorName: soa.requestorName,
      soaNumber: soa.soaNumber,
      pdfBuffer,
    });

    return NextResponse.json({ success: true, message: "Email resent successfully" });
  } catch (error) {
    console.error("Resend email error:", error);
    return NextResponse.json({ error: "Failed to resend email" }, { status: 500 });
  }
}
