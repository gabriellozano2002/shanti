/**
 * Lógica PURA del cálculo de la orden de checkout (testeable sin Stripe).
 * La ruta /api/checkout resuelve los productos en el servidor y usa estas
 * funciones para construir los line_items y el total. El precio SIEMPRE sale
 * del catálogo del servidor, nunca del cliente.
 */
import type { Product } from "@/types";
import { SITE } from "@/lib/constants";

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
