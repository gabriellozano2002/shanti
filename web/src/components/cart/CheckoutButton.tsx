"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { useCartStore } from "@/store/cart-store";

/** Crea la sesión de Stripe Checkout y redirige. Solo manda id + cantidad. */
export function CheckoutButton({ className }: { className?: string }) {
  const items = useCartStore((s) => s.items);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleCheckout() {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch("/api/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          items: items.map((i) => ({ id: i.id, quantity: i.quantity })),
        }),
      });
      const data = (await res.json()) as { url?: string; error?: string };
      if (!res.ok || !data.url) {
        throw new Error(data.error ?? "No se pudo iniciar el pago.");
      }
      window.location.href = data.url;
    } catch (e) {
      setError(
        e instanceof Error ? e.message : "No se pudo iniciar el pago.",
      );
      setLoading(false);
    }
  }

  return (
    <div className={className}>
      <Button
        onClick={handleCheckout}
        disabled={loading || items.length === 0}
        size="lg"
        className="w-full"
      >
        {loading ? "Redirigiendo…" : "Proceder al pago"}
      </Button>
      {error && <p className="mt-2 text-sm text-destructive">{error}</p>}
      <p className="mt-3 text-center text-xs text-muted-foreground">
        Pago seguro con Stripe
      </p>
    </div>
  );
}
