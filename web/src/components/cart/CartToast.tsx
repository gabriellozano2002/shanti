"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { Check } from "lucide-react";
import { useCartStore } from "@/store/cart-store";
import { cn } from "@/lib/utils";

/**
 * Aviso global "Agregado al carrito". Escucha la señal `lastAdded` del store
 * y muestra un toast breve. Montado una vez en el layout.
 *
 * Animación: entra desde abajo (translateY + opacity) con ease-out; respeta
 * prefers-reduced-motion. Transición (no keyframes) para que se re-dispare
 * suave si agregan varios productos seguidos.
 */
export function CartToast() {
  const lastAdded = useCartStore((s) => s.lastAdded);
  const [visible, setVisible] = useState(false);
  const [name, setName] = useState("");
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    if (!lastAdded) return;
    setName(lastAdded.name);
    setVisible(true);
    if (timer.current) clearTimeout(timer.current);
    timer.current = setTimeout(() => setVisible(false), 2200);
    return () => {
      if (timer.current) clearTimeout(timer.current);
    };
  }, [lastAdded]);

  return (
    <div
      aria-live="polite"
      className={cn(
        "pointer-events-none fixed inset-x-0 bottom-4 z-50 flex justify-center px-4 transition-all duration-300 ease-out motion-reduce:transition-opacity",
        visible
          ? "translate-y-0 opacity-100"
          : "translate-y-3 opacity-0",
      )}
    >
      <div className="pointer-events-auto flex items-center gap-3 rounded-full border border-border bg-card py-2.5 pl-2.5 pr-4 shadow-lg">
        <span className="flex h-7 w-7 flex-shrink-0 items-center justify-center rounded-full bg-brand-sage/20 text-brand-sage">
          <Check className="h-4 w-4" />
        </span>
        <p className="text-sm text-brand-ink">
          <span className="font-medium">{name}</span> agregado al carrito
        </p>
        <Link
          href="/carrito"
          className="text-sm font-medium text-brand-gold hover:underline"
        >
          Ver
        </Link>
      </div>
    </div>
  );
}
