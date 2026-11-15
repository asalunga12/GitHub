import { notFound } from "next/navigation";
import { prisma } from "@/lib/db";
import SOAViewClient from "./SOAViewClient";

interface Props {
  params: Promise<{ soaNumber: string }>;
}

export async function generateMetadata({ params }: Props) {
  const { soaNumber } = await params;
  return {
    title: `SOA ${soaNumber} - Sprout Solutions`,
  };
}

export default async function SOAViewPage({ params }: Props) {
  const { soaNumber } = await params;

  const soa = await prisma.statementOfAccount.findUnique({
    where: { soaNumber },
    include: { registrants: true },
  });

  if (!soa) notFound();

  return <SOAViewClient soa={JSON.parse(JSON.stringify(soa))} />;
}
