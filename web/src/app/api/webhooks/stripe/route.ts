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
      // Datos del pedido: los guardamos en metadata al crear la sesión, así que
      // se ven aquí (Vercel logs) y en el Dashboard de Stripe (sección Metadata).
      console.log("[webhook] pago completado, sesión:", session.id, {
        nombre: session.metadata?.cliente,
        email: session.customer_details?.email,
        telefono: session.metadata?.telefono,
        direccion: session.metadata?.direccion,
        total: session.amount_total, // incluye el envío, en centavos
      });
      // TODO: registrar la orden en DB, reducir stock y enviar correo de confirmación.
      break;
    }
    default:
      // Otros eventos: por ahora se ignoran.
      break;
  }

  return NextResponse.json({ received: true });
}
