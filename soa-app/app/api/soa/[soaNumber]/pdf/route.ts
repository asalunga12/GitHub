import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import { generateSOAPDF } from "@/lib/pdfGenerator";

export async function GET(
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

    return new NextResponse(pdfBuffer, {
      headers: {
        "Content-Type": "application/pdf",
        "Content-Disposition": `attachment; filename="${soaNumber}.pdf"`,
        "Cache-Control": "no-store",
      },
    });
  } catch (error) {
    console.error("PDF generation error:", error);
    return NextResponse.json({ error: "Failed to generate PDF" }, { status: 500 });
  }
}
