import { NextResponse } from "next/server";
import { getStripe } from "@/lib/stripe";
import { getProductById } from "@/data/products";
import {
  buildStripeLineItems,
  buildShippingOptions,
  buildPaymentIntentShipping,
  buildSessionMetadata,
  calculateOrderTotal,
  type ResolvedItem,
} from "@/lib/checkout";
import { validateCustomer } from "@/lib/customer";
import { SITE } from "@/lib/constants";
import type { CheckoutRequest } from "@/types";

// El SDK de Stripe necesita Node, no Edge.
export const runtime = "nodejs";

/**
 * Crea una sesión de Stripe Checkout a partir del carrito + datos de envío.
 * El cliente manda { items: [{ id, quantity }], customer: {...} }. El precio se
 * resuelve aquí en el servidor y los datos del cliente se validan aquí; nunca
 * se confía en lo que mande el cliente. La dirección ya validada se adjunta al
 * pago, así Stripe NO la vuelve a pedir.
 */
export async function POST(req: Request) {
  try {
    const body = (await req.json().catch(() => null)) as Partial<
      CheckoutRequest
    > | null;
    const items = body?.items;

    if (!Array.isArray(items) || items.length === 0) {
      return NextResponse.json(
        { error: "El carrito está vacío o es inválido." },
        { status: 400 },
      );
    }

    // Validar y normalizar los datos de contacto/envío.
    const validation = validateCustomer(body?.customer);
    if (!validation.ok) {
      return NextResponse.json({ error: validation.error }, { status: 400 });
    }
    const customer = validation.customer;

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

    // Subtotal en el servidor (centavos): decide la tarifa de envío.
    const subtotal = calculateOrderTotal(resolved);

    const stripe = getStripe();
    const session = await stripe.checkout.sessions.create({
      mode: "payment",
      line_items: buildStripeLineItems(resolved),
      // Email para el recibo (ya lo capturamos, Stripe no lo vuelve a pedir).
      customer_email: customer.email,
      // Dirección de envío YA capturada → al PaymentIntent (Stripe no la repide).
      payment_intent_data: {
        shipping: buildPaymentIntentShipping(customer),
      },
      // Nombre/teléfono/dirección visibles en el Dashboard y el webhook.
      metadata: buildSessionMetadata(customer),
      // Envío gratis arriba de $1,500 MXN; si no, $150 nacional.
      // Stripe suma esta tarifa al total antes del cobro.
      shipping_options: buildShippingOptions(subtotal),
      success_url: `${SITE.url}/checkout/exito?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${SITE.url}/checkout/cancelado`,
      // TODO: impuestos y métodos de pago locales (OXXO/SPEI) cuando aplique.
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
