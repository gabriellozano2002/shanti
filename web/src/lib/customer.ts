/**
 * Validación PURA de los datos de contacto/envío del checkout (sin Stripe ni
 * DOM, testeable). El servidor NUNCA confía en el cliente: normaliza y valida
 * aquí antes de crear la sesión de pago. Ver src/app/api/CLAUDE.md.
 */
import type { CheckoutCustomer } from "@/types";
import { MX_STATES } from "@/lib/constants";

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export type CustomerValidation =
  | { ok: true; customer: CheckoutCustomer }
  | { ok: false; error: string };

function str(v: unknown): string {
  return typeof v === "string" ? v.trim() : "";
}

/** Deja solo dígitos: "(81) 8187-6423" → "8181876423". */
export function digitsOnly(v: string): string {
  return v.replace(/\D/g, "");
}

/**
 * Normaliza y valida los datos del formulario. Devuelve el customer limpio o
 * un mensaje de error claro (apto para mostrar al cliente).
 */
export function validateCustomer(raw: unknown): CustomerValidation {
  if (!raw || typeof raw !== "object") {
    return { ok: false, error: "Faltan los datos de envío." };
  }
  const r = raw as Record<string, unknown>;
  const notes = str(r.notes);
  const customer: CheckoutCustomer = {
    name: str(r.name),
    email: str(r.email).toLowerCase(),
    phone: digitsOnly(str(r.phone)),
    street: str(r.street),
    neighborhood: str(r.neighborhood),
    postalCode: digitsOnly(str(r.postalCode)),
    city: str(r.city),
    state: str(r.state),
    notes: notes || undefined,
  };

  if (!customer.name) return { ok: false, error: "El nombre es obligatorio." };
  if (!EMAIL_RE.test(customer.email)) {
    return { ok: false, error: "El correo electrónico no es válido." };
  }
  if (customer.phone.length < 10) {
    return { ok: false, error: "El teléfono debe tener al menos 10 dígitos." };
  }
  if (!customer.street) {
    return { ok: false, error: "La calle y número son obligatorios." };
  }
  if (!customer.neighborhood) {
    return { ok: false, error: "La colonia es obligatoria." };
  }
  if (customer.postalCode.length !== 5) {
    return { ok: false, error: "El código postal debe tener 5 dígitos." };
  }
  if (!customer.city) return { ok: false, error: "La ciudad es obligatoria." };
  if (!(MX_STATES as readonly string[]).includes(customer.state)) {
    return { ok: false, error: "Selecciona un estado válido." };
  }
  return { ok: true, customer };
}

/** Una línea legible de la dirección (para metadata y logs). */
export function formatShippingAddress(c: CheckoutCustomer): string {
  return [
    c.street,
    `Col. ${c.neighborhood}`,
    c.notes,
    `CP ${c.postalCode}`,
    c.city,
    c.state,
  ]
    .filter(Boolean)
    .join(", ");
}
