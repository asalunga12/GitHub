import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/db";

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const page = parseInt(searchParams.get("page") ?? "1", 10);
    const limit = parseInt(searchParams.get("limit") ?? "20", 10);
    const status = searchParams.get("status");
    const search = searchParams.get("search");

    const skip = (page - 1) * limit;

    const where = {
      ...(status ? { status } : {}),
      ...(search
        ? {
            OR: [
              { soaNumber: { contains: search, mode: "insensitive" as const } },
              { companyName: { contains: search, mode: "insensitive" as const } },
              { requestorName: { contains: search, mode: "insensitive" as const } },
            ],
          }
        : {}),
    };

    const [soas, total] = await Promise.all([
      prisma.statementOfAccount.findMany({
        where,
        skip,
        take: limit,
        orderBy: { createdAt: "desc" },
        include: { registrants: true },
      }),
      prisma.statementOfAccount.count({ where }),
    ]);

    return NextResponse.json({
      data: soas,
      pagination: {
        page,
        limit,
        total,
        pages: Math.ceil(total / limit),
      },
    });
  } catch (error) {
    console.error("List SOA error:", error);
    return NextResponse.json({ error: "Failed to fetch SOAs" }, { status: 500 });
  }
}
