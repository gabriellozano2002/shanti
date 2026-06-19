import { describe, it, expect } from "vitest";
import {
  buildStripeLineItems,
  calculateOrderTotal,
  orderItemCount,
  type ResolvedItem,
} from "@/lib/checkout";
import type { Product } from "@/types";

function product(over: Partial<Product>): Product {
  return {
    id: "p",
    slug: "p",
    name: "Producto",
    shortDescription: "",
    description: "",
    price: 10000,
    currency: "MXN",
    images: ["/images/products/p.png"],
    collection: "calma",
    benefits: [],
    howToUse: "",
    ingredients: "",
    inStock: true,
    ...over,
  };
}

const items: ResolvedItem[] = [
  { product: product({ id: "a", price: 18900 }), quantity: 2 },
  { product: product({ id: "b", price: 19900 }), quantity: 1 },
];

describe("checkout (cálculo de orden)", () => {
  it("calcula el total en centavos", () => {
    expect(calculateOrderTotal(items)).toBe(2 * 18900 + 19900); // 57700
  });

  it("cuenta las unidades de la orden", () => {
    expect(orderItemCount(items)).toBe(3);
  });

  it("construye line_items con el precio del servidor y URL absoluta", () => {
    const lineItems = buildStripeLineItems(items, "https://shanti.test");
    expect(lineItems).toHaveLength(2);
    expect(lineItems[0].quantity).toBe(2);
    expect(lineItems[0].price_data.unit_amount).toBe(18900);
    expect(lineItems[0].price_data.currency).toBe("mxn");
    expect(lineItems[0].price_data.product_data.images[0]).toBe(
      "https://shanti.test/images/products/p.png",
    );
  });

  it("respeta imágenes que ya son URLs absolutas", () => {
    const lineItems = buildStripeLineItems(
      [{ product: product({ images: ["https://cdn.x/y.png"] }), quantity: 1 }],
      "https://shanti.test",
    );
    expect(lineItems[0].price_data.product_data.images[0]).toBe(
      "https://cdn.x/y.png",
    );
  });
});
