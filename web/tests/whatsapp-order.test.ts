import { describe, it, expect } from "vitest";
import { buildWhatsAppOrderMessage } from "@/lib/whatsapp-order";
import type { CartItem } from "@/types";

function item(over: Partial<CartItem>): CartItem {
  return {
    id: "a",
    slug: "a",
    name: "Aceite de Lavanda",
    price: 18900,
    image: "/x.png",
    quantity: 1,
    ...over,
  };
}

describe("buildWhatsAppOrderMessage", () => {
  const items = [
    item({ id: "a", name: "Lavanda", price: 18900, quantity: 2 }),
    item({ id: "b", name: "Bergamota", price: 19900, quantity: 1 }),
  ];

  it("lista cada ítem con cantidad y precio de línea", () => {
    const msg = buildWhatsAppOrderMessage(items, 57700, 15000, 72700);
    expect(msg).toContain("2× Lavanda — $378.00");
    expect(msg).toContain("1× Bergamota — $199.00");
  });

  it("incluye subtotal, envío y total", () => {
    const msg = buildWhatsAppOrderMessage(items, 57700, 15000, 72700);
    expect(msg).toContain("Subtotal: $577.00");
    expect(msg).toContain("Envío: $150.00");
    expect(msg).toContain("Total: $727.00");
  });

  it("muestra 'Gratis' cuando el envío es 0", () => {
    const msg = buildWhatsAppOrderMessage(items, 200000, 0, 200000);
    expect(msg).toContain("Envío: Gratis");
  });
});
