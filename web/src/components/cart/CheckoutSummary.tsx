"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useCartStore } from "@/store/cart-store";
import { CheckoutButton } from "@/components/cart/CheckoutButton";
import { buttonVariants } from "@/components/ui/button";
import { cn, formatPrice } from "@/lib/utils";

/** Resumen de la orden en /checkout antes de redirigir a Stripe. */
export function CheckoutSummary() {
  const [mounted, setMounted] = useState(false);
  const items = useCartStore((s) => s.items);
  const subtotal = useCartStore((s) => s.getSubtotal());
  useEffect(() => setMounted(true), []);

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
    <div className="mx-auto max-w-lg rounded-2xl border border-border bg-card p-6">
      <h2 className="font-serif text-xl font-semibold text-brand-ink">
        Tu orden
      </h2>
      <ul className="mt-4 divide-y divide-border">
        {items.map((item) => (
          <li key={item.id} className="flex items-center gap-3 py-3">
            <div className="relative h-14 w-14 flex-shrink-0 overflow-hidden rounded-lg bg-brand-marfil">
              <Image
                src={item.image}
                alt={item.name}
                fill
                sizes="56px"
                className="object-cover"
              />
            </div>
            <div className="flex-1">
              <p className="text-sm font-medium text-brand-ink">{item.name}</p>
              <p className="text-xs text-muted-foreground">
                {item.quantity} × {formatPrice(item.price)}
              </p>
            </div>
            <span className="text-sm font-medium">
              {formatPrice(item.price * item.quantity)}
            </span>
          </li>
        ))}
      </ul>

      <div className="mt-4 flex justify-between border-t border-border pt-4">
        <span className="font-medium text-brand-ink">Subtotal</span>
        <span className="font-semibold text-brand-ink">
          {formatPrice(subtotal)}
        </span>
      </div>

      <CheckoutButton className="mt-6" />

      <Link
        href="/carrito"
        className="mt-3 block text-center text-sm text-muted-foreground hover:text-brand-gold"
      >
        Volver al carrito
      </Link>
    </div>
  );
}
