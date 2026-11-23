import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/db";

function escapeCSV(value: string | number | boolean | null | undefined): string {
  const str = String(value ?? "");
  if (str.includes(",") || str.includes('"') || str.includes("\n")) {
    return `"${str.replace(/"/g, '""')}"`;
  }
  return str;
}

function row(values: (string | number | boolean | null | undefined)[]): string {
  return values.map(escapeCSV).join(",");
}

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const status = searchParams.get("status");
  const from = searchParams.get("from");
  const to = searchParams.get("to");

  const soas = await prisma.statementOfAccount.findMany({
    where: {
      ...(status ? { status } : {}),
      ...(from || to
        ? {
            createdAt: {
              ...(from ? { gte: new Date(from) } : {}),
              ...(to ? { lte: new Date(to) } : {}),
            },
          }
        : {}),
    },
    orderBy: { createdAt: "desc" },
    include: { registrants: true },
  });

  const lines: string[] = [
    // Header
    row([
      "SOA Number",
      "Date",
      "Status",
      "Requestor Name",
      "Email",
      "Phone",
      "Job Title",
      "Registration Type",
      "Company Headcount",
      "Company Name",
      "Company Address",
      "TIN",
      "Sprout Client",
      "No. of Registrants",
      "Rate",
      "Subtotal",
      "VAT",
      "Total",
      "Registrant Names",
      "Registrant Emails",
    ]),
  ];

  for (const soa of soas) {
    lines.push(
      row([
        soa.soaNumber,
        new Date(soa.createdAt).toISOString().split("T")[0],
        soa.status,
        soa.requestorName,
        soa.email,
        soa.phone,
        soa.jobTitle,
        soa.registrationType,
        soa.headcount,
        soa.companyName,
        soa.companyAddress,
        soa.tin,
        soa.sproutClient ? "Yes" : "No",
        soa.registrants.length,
        soa.rate,
        soa.subtotal,
        soa.vat,
        soa.total,
        soa.registrants.map((r) => r.name).join("; "),
        soa.registrants.map((r) => r.email).join("; "),
      ])
    );
  }

  const csv = lines.join("\n");
  const filename = `SOA-Export-${new Date().toISOString().split("T")[0]}.csv`;

  return new NextResponse(csv, {
    headers: {
      "Content-Type": "text/csv; charset=utf-8",
      "Content-Disposition": `attachment; filename="${filename}"`,
      "Cache-Control": "no-store",
    },
  });
}
