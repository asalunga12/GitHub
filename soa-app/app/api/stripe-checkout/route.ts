import { NextRequest, NextResponse } from "next/server";
import { stripe } from "@/lib/stripe";
import { prisma } from "@/lib/db";

export async function POST(req: NextRequest) {
  try {
    const { soaNumber } = await req.json();

    if (!soaNumber) {
      return NextResponse.json({ error: "SOA number required" }, { status: 400 });
    }

    const soa = await prisma.statementOfAccount.findUnique({
      where: { soaNumber },
    });

    if (!soa) {
      return NextResponse.json({ error: "SOA not found" }, { status: 404 });
    }

    if (soa.status === "Paid") {
      return NextResponse.json({ error: "SOA is already paid" }, { status: 400 });
    }

    const appUrl = process.env.NEXT_PUBLIC_APP_URL ?? "http://localhost:3000";

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      line_items: [
        {
          price_data: {
            currency: "php",
            product_data: {
              name: `Statement of Account - ${soaNumber}`,
              description: `Training registration for ${soa.companyName}`,
            },
            unit_amount: Math.round(soa.total * 100),
          },
          quantity: 1,
        },
      ],
      mode: "payment",
      customer_email: soa.email,
      metadata: {
        soaNumber: soa.soaNumber,
        soaId: soa.id,
      },
      success_url: `${appUrl}/soa/${soaNumber}?payment=success`,
      cancel_url: `${appUrl}/soa/${soaNumber}?payment=cancelled`,
    });

    // Store session ID
    await prisma.statementOfAccount.update({
      where: { soaNumber },
      data: { stripeSessionId: session.id },
    });

    return NextResponse.json({ url: session.url });
  } catch (error) {
    console.error("Stripe checkout error:", error);
    return NextResponse.json(
      { error: "Failed to create checkout session" },
      { status: 500 }
    );
  }
}
