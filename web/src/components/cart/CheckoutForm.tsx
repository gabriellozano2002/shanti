"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Button, buttonVariants } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { CheckoutSummary } from "@/components/cart/CheckoutSummary";
import { useCartStore } from "@/store/cart-store";
import { MX_STATES } from "@/lib/constants";
import { cn } from "@/lib/utils";
import type { CheckoutCustomer } from "@/types";

type FormState = CheckoutCustomer;

const EMPTY: FormState = {
  name: "",
  email: "",
  phone: "",
  street: "",
  neighborhood: "",
  postalCode: "",
  city: "",
  state: "",
  notes: "",
};

/** Etiqueta + campo, mobile-first. */
function Field({
  id,
  label,
  children,
}: {
  id: string;
  label: string;
  children: React.ReactNode;
}) {
  return (
    <div>
      <label
        htmlFor={id}
        className="mb-1.5 block text-sm font-medium text-brand-ink"
      >
        {label}
      </label>
      {children}
    </div>
  );
}

/**
 * Página de checkout: captura contacto + dirección de envío (México) y, al
 * confirmar, crea la sesión de Stripe ya con esos datos para que Stripe solo
 * cobre. Maneja el montaje del store y el carrito vacío.
 *
 * NOTA: el campo de calle está listo para enchufarle Google Places
 * autocomplete más adelante (ver onStreetAutocomplete más abajo).
 */
export function CheckoutForm() {
  const [mounted, setMounted] = useState(false);
  const items = useCartStore((s) => s.items);
  const [form, setForm] = useState<FormState>(EMPTY);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => setMounted(true), []);

  function set<K extends keyof FormState>(key: K, value: FormState[K]) {
    setForm((f) => ({ ...f, [key]: value }));
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError(null);
    try {
      const res = await fetch("/api/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          items: items.map((i) => ({ id: i.id, quantity: i.quantity })),
          customer: form,
        }),
      });
      const data = (await res.json()) as { url?: string; error?: string };
      if (!res.ok || !data.url) {
        throw new Error(data.error ?? "No se pudo iniciar el pago.");
      }
      window.location.href = data.url;
    } catch (err) {
      setError(
        err instanceof Error ? err.message : "No se pudo iniciar el pago.",
      );
      setLoading(false);
    }
  }

  if (!mounted) {
    return <p className="py-16 text-center text-muted-foreground">Cargando…</p>;
  }

  if (items.length === 0) {
    return (
      <div className="py-16 text-center">
        <p className="text-lg text-brand-ink">No hay nada que pagar todavía.</p>
        <Link
          href="/productos"
          className={cn(buttonVariants({ size: "lg" }), "mt-6")}
        >
          Ver productos
        </Link>
      </div>
    );
  }

  return (
    <div className="grid gap-8 lg:grid-cols-[1fr_360px]">
      {/* Formulario de contacto y envío */}
      <form onSubmit={handleSubmit} className="space-y-6">
        <section className="space-y-4 rounded-2xl border border-border bg-card p-6">
          <h2 className="font-serif text-xl font-semibold text-brand-ink">
            Contacto
          </h2>
          <Field id="name" label="Nombre completo">
            <Input
              id="name"
              autoComplete="name"
              required
              value={form.name}
              onChange={(e) => set("name", e.target.value)}
            />
          </Field>
          <div className="grid gap-4 sm:grid-cols-2">
            <Field id="email" label="Correo electrónico">
              <Input
                id="email"
                type="email"
                autoComplete="email"
                required
                value={form.email}
                onChange={(e) => set("email", e.target.value)}
              />
            </Field>
            <Field id="phone" label="Teléfono (WhatsApp)">
              <Input
                id="phone"
                type="tel"
                inputMode="tel"
                autoComplete="tel"
                placeholder="10 dígitos"
                required
                value={form.phone}
                onChange={(e) => set("phone", e.target.value)}
              />
            </Field>
          </div>
        </section>

        <section className="space-y-4 rounded-2xl border border-border bg-card p-6">
          <h2 className="font-serif text-xl font-semibold text-brand-ink">
            Dirección de envío
          </h2>
          <Field id="street" label="Calle y número">
            <Input
              id="street"
              autoComplete="address-line1"
              placeholder="Av. Constitución 200, Int. 4"
              required
              value={form.street}
              onChange={(e) => set("street", e.target.value)}
            />
          </Field>
          <Field id="neighborhood" label="Colonia">
            <Input
              id="neighborhood"
              autoComplete="address-line2"
              required
              value={form.neighborhood}
              onChange={(e) => set("neighborhood", e.target.value)}
            />
          </Field>
          <div className="grid gap-4 sm:grid-cols-2">
            <Field id="postalCode" label="Código postal">
              <Input
                id="postalCode"
                inputMode="numeric"
                autoComplete="postal-code"
                placeholder="64000"
                maxLength={5}
                required
                value={form.postalCode}
                onChange={(e) => set("postalCode", e.target.value)}
              />
            </Field>
            <Field id="city" label="Ciudad / Municipio">
              <Input
                id="city"
                autoComplete="address-level2"
                required
                value={form.city}
                onChange={(e) => set("city", e.target.value)}
              />
            </Field>
          </div>
          <Field id="state" label="Estado">
            <select
              id="state"
              required
              value={form.state}
              onChange={(e) => set("state", e.target.value)}
              className="flex h-11 w-full rounded-full border border-input bg-white px-4 py-2 text-sm text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
            >
              <option value="" disabled>
                Selecciona tu estado
              </option>
              {MX_STATES.map((s) => (
                <option key={s} value={s}>
                  {s}
                </option>
              ))}
            </select>
          </Field>
          <Field id="notes" label="Referencias (opcional)">
            <textarea
              id="notes"
              rows={2}
              placeholder="Entre calles, color de la casa, indicaciones…"
              value={form.notes ?? ""}
              onChange={(e) => set("notes", e.target.value)}
              className="flex w-full rounded-2xl border border-input bg-white px-4 py-2 text-sm text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
            />
          </Field>
        </section>

        {error && <p className="text-sm text-destructive">{error}</p>}

        <Button type="submit" size="lg" className="w-full" disabled={loading}>
          {loading ? "Redirigiendo al pago…" : "Continuar al pago seguro"}
        </Button>
        <p className="text-center text-xs text-muted-foreground">
          Pago seguro con Stripe. El cobro y tu recibo los procesa Stripe.
        </p>
        <Link
          href="/carrito"
          className="block text-center text-sm text-muted-foreground hover:text-brand-gold"
        >
          Volver al carrito
        </Link>
      </form>

      {/* Resumen de la orden */}
      <aside className="h-fit lg:sticky lg:top-24">
        <CheckoutSummary />
      </aside>
    </div>
  );
}
