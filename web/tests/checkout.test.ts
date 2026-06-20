import { describe, it, expect } from "vitest";
import {
  buildStripeLineItems,
  buildShippingOptions,
  buildPaymentIntentShipping,
  buildSessionMetadata,
  calculateOrderTotal,
  calculateShippingAmount,
  orderItemCount,
  FREE_SHIPPING_THRESHOLD,
  NATIONAL_SHIPPING_AMOUNT,
  type ResolvedItem,
} from "@/lib/checkout";
import type { CheckoutCustomer, Product } from "@/types";

const customer: CheckoutCustomer = {
  name: "Ana López",
  email: "ana@example.com",
  phone: "8181876423",
  street: "Av. Constitución 200",
  neighborhood: "Centro",
  postalCode: "64000",
  city: "Monterrey",
  state: "Nuevo León",
  notes: "Casa azul",
};

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

describe("checkout (opciones de envío)", () => {
  it("cobra envío nacional cuando el subtotal es $1,500 MXN o MENOS", () => {
    const [option] = buildShippingOptions(FREE_SHIPPING_THRESHOLD); // exactamente $1,500
    expect(option.shipping_rate_data.display_name).toBe("Envío nacional");
    expect(option.shipping_rate_data.fixed_amount.amount).toBe(
      NATIONAL_SHIPPING_AMOUNT,
    );
    expect(option.shipping_rate_data.fixed_amount.currency).toBe("mxn");
  });

  it("ofrece envío gratis cuando el subtotal es MAYOR a $1,500 MXN", () => {
    const [option] = buildShippingOptions(FREE_SHIPPING_THRESHOLD + 1);
    expect(option.shipping_rate_data.display_name).toBe("Envío gratis");
    expect(option.shipping_rate_data.fixed_amount.amount).toBe(0);
  });

  it("calculateShippingAmount: $150 en el umbral, gratis por encima", () => {
    expect(calculateShippingAmount(FREE_SHIPPING_THRESHOLD)).toBe(
      NATIONAL_SHIPPING_AMOUNT,
    );
    expect(calculateShippingAmount(FREE_SHIPPING_THRESHOLD - 1)).toBe(
      NATIONAL_SHIPPING_AMOUNT,
    );
    expect(calculateShippingAmount(FREE_SHIPPING_THRESHOLD + 1)).toBe(0);
  });
});

describe("checkout (datos de envío a Stripe)", () => {
  it("mapea el customer a la forma shipping del PaymentIntent (país MX)", () => {
    const shipping = buildPaymentIntentShipping(customer);
    expect(shipping.name).toBe("Ana López");
    expect(shipping.phone).toBe("8181876423");
    expect(shipping.address.line1).toBe("Av. Constitución 200");
    expect(shipping.address.line2).toBe("Col. Centro — Casa azul");
    expect(shipping.address.city).toBe("Monterrey");
    expect(shipping.address.state).toBe("Nuevo León");
    expect(shipping.address.postal_code).toBe("64000");
    expect(shipping.address.country).toBe("MX");
  });

  it("metadata lleva nombre, teléfono y dirección en una línea (strings)", () => {
    const meta = buildSessionMetadata(customer);
    expect(meta.cliente).toBe("Ana López");
    expect(meta.telefono).toBe("8181876423");
    expect(meta.direccion).toContain("Av. Constitución 200");
    expect(meta.direccion).toContain("CP 64000");
    expect(meta.direccion).toContain("Monterrey");
  });
});
