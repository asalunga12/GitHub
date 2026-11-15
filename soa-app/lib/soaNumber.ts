import { prisma } from "./db";

export async function generateSOANumber(): Promise<string> {
  const year = new Date().getFullYear();
  const prefix = `SOA-${year}-`;

  const lastSOA = await prisma.statementOfAccount.findFirst({
    where: {
      soaNumber: {
        startsWith: prefix,
      },
    },
    orderBy: {
      soaNumber: "desc",
    },
  });

  let nextNumber = 1;
  if (lastSOA) {
    const lastSequence = parseInt(lastSOA.soaNumber.split("-")[2], 10);
    if (!isNaN(lastSequence)) {
      nextNumber = lastSequence + 1;
    }
  }

  return `${prefix}${String(nextNumber).padStart(4, "0")}`;
}
