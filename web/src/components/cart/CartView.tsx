"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Minus, Plus, Trash2 } from "lucide-react";
import { useCartStore } from "@/store/cart-store";
import { buttonVariants } from "@/components/ui/button";
import { cn, formatPrice } from "@/lib/utils";

/** Vista completa del carrito (página /carrito). Cliente: lee el store. */
export function CartView() {
  const [mounted, setMounted] = useState(false);
  const items = useCartStore((s) => s.items);
  const subtotal = useCartStore((s) => s.getSubtotal());
  const shipping = useCartStore((s) => s.getShipping());
  const total = useCartStore((s) => s.getTotal());
  const setQuantity = useCartStore((s) => s.setQuantity);
  const removeItem = useCartStore((s) => s.removeItem);

  // El store está persistido: esperamos al montaje para evitar mismatch de hidratación.
  useEffect(() => setMounted(true), []);

  if (!mounted) {
    return <p className="py-16 text-center text-muted-foreground">Cargando…</p>;
  }

  if (items.length === 0) {
    return (
      <div className="py-16 text-center">
        <p className="text-lg text-brand-ink">Tu carrito está vacío.</p>
        <p className="mt-2 text-muted-foreground">
          Descubre la Colección Calma y empieza tu ritual.
        </p>
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
      {/* Lista de ítems */}
      <ul className="divide-y divide-border">
        {items.map((item) => (
          <li key={item.id} className="flex gap-4 py-5">
            <div className="relative h-24 w-24 flex-shrink-0 overflow-hidden rounded-xl bg-brand-marfil">
              <Image
                src={item.image}
                alt={item.name}
                fill
                sizes="96px"
                className="object-cover"
              />
            </div>

            <div className="flex flex-1 flex-col">
              <div className="flex items-start justify-between gap-2">
                <Link
                  href={`/productos/${item.slug}`}
                  className="font-serif text-lg font-semibold text-brand-ink hover:text-brand-gold"
                >
                  {item.name}
                </Link>
                <button
                  type="button"
                  onClick={() => removeItem(item.id)}
                  aria-label={`Quitar ${item.name}`}
                  className="rounded-full p-2 text-muted-foreground transition-colors hover:bg-accent hover:text-destructive"
                >
                  <Trash2 className="h-4 w-4" />
                </button>
              </div>

              <span className="text-sm text-muted-foreground">
                {formatPrice(item.price)}
              </span>

              <div className="mt-auto flex items-center justify-between pt-3">
                {/* Stepper de cantidad */}
                <div className="flex items-center rounded-full border border-border">
                  <button
                    type="button"
                    onClick={() => setQuantity(item.id, item.quantity - 1)}
                    aria-label="Disminuir cantidad"
                    className="flex h-9 w-9 items-center justify-center rounded-full hover:bg-accent"
                  >
                    <Minus className="h-4 w-4" />
                  </button>
                  <span className="w-8 text-center text-sm">{item.quantity}</span>
                  <button
                    type="button"
                    onClick={() => setQuantity(item.id, item.quantity + 1)}
                    aria-label="Aumentar cantidad"
                    className="flex h-9 w-9 items-center justify-center rounded-full hover:bg-accent"
                  >
                    <Plus className="h-4 w-4" />
                  </button>
                </div>

                <span className="font-medium text-brand-ink">
                  {formatPrice(item.price * item.quantity)}
                </span>
              </div>
            </div>
          </li>
        ))}
      </ul>

      {/* Resumen */}
      <aside className="h-fit rounded-2xl border border-border bg-card p-6 lg:sticky lg:top-24">
        <h2 className="font-serif text-xl font-semibold text-brand-ink">
          Resumen
        </h2>
        <div className="mt-4 flex justify-between text-sm">
          <span className="text-muted-foreground">Subtotal</span>
          <span className="font-medium">{formatPrice(subtotal)}</span>
        </div>
        <div className="mt-2 flex justify-between text-sm">
          <span className="text-muted-foreground">Envío</span>
          <span className="font-medium">
            {shipping === 0 ? (
              <span className="text-brand-sage">Gratis</span>
            ) : (
              formatPrice(shipping)
            )}
          </span>
        </div>
        {shipping > 0 && (
          <p className="mt-1 text-xs text-muted-foreground">
            ¡Envío gratis en compras mayores a {formatPrice(150000)}!
          </p>
        )}
        <div className="mt-4 flex justify-between border-t border-border pt-4">
          <span className="font-medium text-brand-ink">Total</span>
          <span className="font-semibold text-brand-ink">
            {formatPrice(total)}
          </span>
        </div>
        <Link
          href="/checkout"
          className={cn(buttonVariants({ size: "lg" }), "mt-6 w-full")}
        >
          Continuar
        </Link>
        <Link
          href="/productos"
          className="mt-3 block text-center text-sm text-muted-foreground hover:text-brand-gold"
        >
          Seguir comprando
        </Link>
      </aside>
    </div>
  );
}
