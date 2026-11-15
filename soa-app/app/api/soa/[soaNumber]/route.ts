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

    return NextResponse.json(soa);
  } catch (error) {
    console.error("Get SOA error:", error);
    return NextResponse.json({ error: "Failed to fetch SOA" }, { status: 500 });
  }
}

export async function PATCH(
  req: NextRequest,
  { params }: { params: Promise<{ soaNumber: string }> }
) {
  try {
    const { soaNumber } = await params;
    const body = await req.json();
    const { status } = body;

    if (!["Unpaid", "Paid", "Cancelled"].includes(status)) {
      return NextResponse.json({ error: "Invalid status" }, { status: 400 });
    }

    const soa = await prisma.statementOfAccount.update({
      where: { soaNumber },
      data: { status },
      include: { registrants: true },
    });

    return NextResponse.json(soa);
  } catch (error) {
    console.error("Update SOA error:", error);
    return NextResponse.json({ error: "Failed to update SOA" }, { status: 500 });
  }
}

export async function POST(
  req: NextRequest,
  { params }: { params: Promise<{ soaNumber: string }> }
) {
  const { soaNumber } = await params;
  const url = new URL(req.url);

  if (url.pathname.endsWith("/pdf")) {
    return handlePDFDownload(soaNumber);
  }

  return NextResponse.json({ error: "Not found" }, { status: 404 });
}

async function handlePDFDownload(soaNumber: string) {
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
    },
  });
}
