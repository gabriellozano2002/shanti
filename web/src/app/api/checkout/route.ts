import { NextResponse } from "next/server";
import { getStripe } from "@/lib/stripe";
import { getProductById } from "@/data/products";
import { buildStripeLineItems, type ResolvedItem } from "@/lib/checkout";
import { SITE } from "@/lib/constants";
import type { CheckoutRequestItem } from "@/types";

// El SDK de Stripe necesita Node, no Edge.
export const runtime = "nodejs";

/**
 * Crea una sesión de Stripe Checkout a partir del carrito.
 * El cliente manda SOLO { items: [{ id, quantity }] }. El precio se resuelve
 * aquí en el servidor; nunca se confía en lo que mande el cliente.
 */
export async function POST(req: Request) {
  try {
    const body = (await req.json().catch(() => null)) as {
      items?: CheckoutRequestItem[];
    } | null;
    const items = body?.items;

    if (!Array.isArray(items) || items.length === 0) {
      return NextResponse.json(
        { error: "El carrito está vacío o es inválido." },
        { status: 400 },
      );
    }

    // Resolver cada ítem contra el catálogo del servidor.
    const resolved: ResolvedItem[] = [];
    for (const item of items) {
      const quantity = Number(item?.quantity);
      if (!item?.id || !Number.isInteger(quantity) || quantity <= 0) {
        return NextResponse.json(
          { error: "Hay un ítem inválido en el carrito." },
          { status: 400 },
        );
      }
      const product = await getProductById(String(item.id));
      if (!product || !product.inStock) {
        return NextResponse.json(
          { error: "Uno de los productos ya no está disponible." },
          { status: 400 },
        );
      }
      resolved.push({ product, quantity });
    }

    const stripe = getStripe();
    const session = await stripe.checkout.sessions.create({
      mode: "payment",
      line_items: buildStripeLineItems(resolved),
      success_url: `${SITE.url}/checkout/exito?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${SITE.url}/checkout/cancelado`,
      // TODO: envío, impuestos y métodos de pago locales (OXXO/SPEI) cuando aplique.
    });

    return NextResponse.json({ url: session.url });
  } catch (err) {
    // Log interno detallado; respuesta genérica al cliente.
    console.error("[checkout] error:", err);
    return NextResponse.json(
      { error: "No se pudo iniciar el pago. Intenta de nuevo." },
      { status: 500 },
    );
  }
}
