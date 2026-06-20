import { describe, it, expect } from "vitest";
import {
  validateCustomer,
  digitsOnly,
  formatShippingAddress,
} from "@/lib/customer";
import type { CheckoutCustomer } from "@/types";

function raw(over: Partial<Record<keyof CheckoutCustomer, string>> = {}) {
  return {
    name: "Ana López",
    email: "Ana@Example.com",
    phone: "(81) 8187-6423",
    street: "Av. Constitución 200",
    neighborhood: "Centro",
    postalCode: "64000",
    city: "Monterrey",
    state: "Nuevo León",
    ...over,
  };
}

describe("validateCustomer", () => {
  it("normaliza email (minúsculas) y teléfono (solo dígitos)", () => {
    const res = validateCustomer(raw());
    expect(res.ok).toBe(true);
    if (res.ok) {
      expect(res.customer.email).toBe("ana@example.com");
      expect(res.customer.phone).toBe("8181876423");
    }
  });

  it("rechaza email inválido", () => {
    const res = validateCustomer(raw({ email: "no-es-email" }));
    expect(res.ok).toBe(false);
  });

  it("rechaza teléfono con menos de 10 dígitos", () => {
    const res = validateCustomer(raw({ phone: "8181" }));
    expect(res.ok).toBe(false);
  });

  it("rechaza código postal que no tenga 5 dígitos", () => {
    expect(validateCustomer(raw({ postalCode: "640" })).ok).toBe(false);
    expect(validateCustomer(raw({ postalCode: "640000" })).ok).toBe(false);
  });

  it("rechaza un estado que no sea de México", () => {
    const res = validateCustomer(raw({ state: "California" }));
    expect(res.ok).toBe(false);
  });

  it("rechaza campos obligatorios vacíos", () => {
    expect(validateCustomer(raw({ name: "  " })).ok).toBe(false);
    expect(validateCustomer(raw({ street: "" })).ok).toBe(false);
    expect(validateCustomer(raw({ neighborhood: "" })).ok).toBe(false);
    expect(validateCustomer(raw({ city: "" })).ok).toBe(false);
  });

  it("rechaza cuerpos no-objeto", () => {
    expect(validateCustomer(null).ok).toBe(false);
    expect(validateCustomer("hola").ok).toBe(false);
  });
});

describe("helpers de customer", () => {
  it("digitsOnly deja solo números", () => {
    expect(digitsOnly("+52 (81) 8187-6423")).toBe("528181876423");
  });

  it("formatShippingAddress arma una línea legible", () => {
    const res = validateCustomer(raw({ notes: "Casa azul" }));
    expect(res.ok).toBe(true);
    if (res.ok) {
      const line = formatShippingAddress(res.customer);
      expect(line).toContain("Av. Constitución 200");
      expect(line).toContain("Col. Centro");
      expect(line).toContain("Casa azul");
      expect(line).toContain("CP 64000");
    }
  });
});
