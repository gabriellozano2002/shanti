"use client";

import Image from "next/image";
import { useCartStore } from "@/store/cart-store";
import { formatPrice } from "@/lib/utils";

/**
 * Desglose de la orden (productos + subtotal + envío + total) en /checkout.
 * Solo presenta datos del store; el botón de pago vive en CheckoutForm.
 * Se renderiza dentro de CheckoutForm, que ya garantiza el montaje del store.
 */
export function CheckoutSummary() {
  const items = useCartStore((s) => s.items);
  const subtotal = useCartStore((s) => s.getSubtotal());
  const shipping = useCartStore((s) => s.getShipping());
  const total = useCartStore((s) => s.getTotal());

  return (
    <div className="rounded-2xl border border-border bg-card p-6">
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

      <div className="mt-4 space-y-2 border-t border-border pt-4 text-sm">
        <div className="flex justify-between">
          <span className="text-muted-foreground">Subtotal</span>
          <span className="font-medium">{formatPrice(subtotal)}</span>
        </div>
        <div className="flex justify-between">
          <span className="text-muted-foreground">Envío</span>
          <span className="font-medium">
            {shipping === 0 ? (
              <span className="text-brand-sage">Gratis</span>
            ) : (
              formatPrice(shipping)
            )}
          </span>
        </div>
      </div>

      <div className="mt-3 flex justify-between border-t border-border pt-3">
        <span className="font-medium text-brand-ink">Total</span>
        <span className="font-semibold text-brand-ink">
          {formatPrice(total)}
        </span>
      </div>
    </div>
  );
}
