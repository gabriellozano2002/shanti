/**
 * Lógica PURA del cálculo de la orden de checkout (testeable sin Stripe).
 * La ruta /api/checkout resuelve los productos en el servidor y usa estas
 * funciones para construir los line_items y el total. El precio SIEMPRE sale
 * del catálogo del servidor, nunca del cliente.
 */
import type { CheckoutCustomer, Product } from "@/types";
import { SITE, CURRENCY } from "@/lib/constants";
import { formatShippingAddress } from "@/lib/customer";

/** Umbral de envío gratis en CENTAVOS: subtotal MAYOR a $1,500 MXN. */
export const FREE_SHIPPING_THRESHOLD = 150_000;
/** Costo del envío nacional en CENTAVOS ($150 MXN). */
export const NATIONAL_SHIPPING_AMOUNT = 15_000;

/**
 * Costo de envío en CENTAVOS según el subtotal. FUENTE ÚNICA de la regla:
 * la usa tanto la UI (carrito/checkout) como Stripe (`buildShippingOptions`).
 * - Subtotal MAYOR a $1,500 MXN  → gratis (0).
 * - Subtotal de $1,500 MXN o MENOR → $150 MXN.
 */
export function calculateShippingAmount(subtotalCents: number): number {
  return subtotalCents > FREE_SHIPPING_THRESHOLD ? 0 : NATIONAL_SHIPPING_AMOUNT;
}

export interface ResolvedItem {
  product: Product;
  quantity: number;
}

/** Total de la orden en CENTAVOS. */
export function calculateOrderTotal(items: ResolvedItem[]): number {
  return items.reduce(
    (sum, { product, quantity }) => sum + product.price * quantity,
    0,
  );
}

/** Unidades totales de la orden. */
export function orderItemCount(items: ResolvedItem[]): number {
  return items.reduce((n, { quantity }) => n + quantity, 0);
}

/** Forma de un line_item de Stripe Checkout (price_data en línea). */
export interface StripeLineItem {
  quantity: number;
  price_data: {
    currency: string;
    unit_amount: number;
    product_data: { name: string; images: string[] };
  };
}

/** Construye los line_items de Stripe a partir de productos resueltos. */
export function buildStripeLineItems(
  items: ResolvedItem[],
  baseUrl: string = SITE.url,
): StripeLineItem[] {
  return items.map(({ product, quantity }) => ({
    quantity,
    price_data: {
      currency: product.currency.toLowerCase(),
      unit_amount: product.price,
      product_data: {
        name: product.name,
        images: product.images
          .slice(0, 1)
          .map((src) => (src.startsWith("http") ? src : `${baseUrl}${src}`)),
      },
    },
  }));
}

/** Forma de una opción de envío de Stripe Checkout (tarifa en línea). */
export interface StripeShippingOption {
  shipping_rate_data: {
    type: "fixed_amount";
    display_name: string;
    fixed_amount: { amount: number; currency: string };
  };
}

/**
 * Construye las opciones de envío según el subtotal (en CENTAVOS).
 * - Subtotal MAYOR a $1,500 MXN  → "Envío gratis" ($0).
 * - Subtotal de $1,500 MXN o MENOR → "Envío nacional" ($150 MXN).
 *
 * Stripe suma automáticamente la tarifa elegida al total antes del cobro.
 */
export function buildShippingOptions(
  subtotalCents: number,
  currency: string = CURRENCY.toLowerCase(),
): StripeShippingOption[] {
  const amount = calculateShippingAmount(subtotalCents);
  return [
    {
      shipping_rate_data: {
        type: "fixed_amount",
        display_name: amount === 0 ? "Envío gratis" : "Envío nacional",
        fixed_amount: { amount, currency },
      },
    },
  ];
}

/** Forma de la dirección de envío que adjuntamos al PaymentIntent de Stripe. */
export interface StripeShipping {
  name: string;
  phone: string;
  address: {
    line1: string;
    line2: string;
    city: string;
    state: string;
    postal_code: string;
    country: string;
  };
}

/**
 * Convierte los datos del formulario (ya validados) a la forma de
 * `payment_intent_data.shipping` de Stripe. Así la dirección queda en el pago
 * y NO se la volvemos a pedir al cliente en Stripe.
 */
export function buildPaymentIntentShipping(c: CheckoutCustomer): StripeShipping {
  const line2 = [`Col. ${c.neighborhood}`, c.notes?.trim()]
    .filter(Boolean)
    .join(" — ");
  return {
    name: c.name,
    phone: c.phone,
    address: {
      line1: c.street,
      line2,
      city: c.city,
      state: c.state,
      postal_code: c.postalCode,
      country: "MX",
    },
  };
}

/**
 * Metadata de la sesión: deja nombre/teléfono/dirección a la vista en el
 * Dashboard de Stripe y en el log del webhook (los valores deben ser strings).
 */
export function buildSessionMetadata(
  c: CheckoutCustomer,
): Record<string, string> {
  return {
    cliente: c.name,
    telefono: c.phone,
    direccion: formatShippingAddress(c),
  };
}
