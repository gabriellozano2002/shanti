import { NextResponse } from "next/server";
import type Stripe from "stripe";
import { getStripe } from "@/lib/stripe";

export const runtime = "nodejs";

/**
 * Webhook de Stripe. ÚNICO lugar donde un pago se considera confirmado.
 * Valida SIEMPRE la firma con el cuerpo CRUDO (req.text(), no req.json()).
 * Ver .claude/rules/stripe.md.
 */
export async function POST(req: Request) {
  const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET;
  const signature = req.headers.get("stripe-signature");

  if (!webhookSecret || !signature) {
    console.error("[webhook] falta STRIPE_WEBHOOK_SECRET o la firma.");
    return NextResponse.json(
      { error: "Webhook no configurado." },
      { status: 400 },
    );
  }

  let event: Stripe.Event;
  try {
    const rawBody = await req.text(); // cuerpo crudo: necesario para la firma.
    event = getStripe().webhooks.constructEvent(
      rawBody,
      signature,
      webhookSecret,
    );
  } catch (err) {
    console.error("[webhook] firma inválida:", err);
    return NextResponse.json({ error: "Firma inválida." }, { status: 400 });
  }

  switch (event.type) {
    case "checkout.session.completed": {
      const session = event.data.object as Stripe.Checkout.Session;
      // ✅ AQUÍ (y solo aquí) el pago es real.
      console.log("[webhook] pago completado, sesión:", session.id);
      // TODO: registrar la orden en DB, reducir stock y enviar correo de confirmación.
      break;
    }
    default:
      // Otros eventos: por ahora se ignoran.
      break;
  }

  return NextResponse.json({ received: true });
}
