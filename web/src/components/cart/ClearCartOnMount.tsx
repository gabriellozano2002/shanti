"use client";

import { useEffect } from "react";
import { useCartStore } from "@/store/cart-store";

/** Vacía el carrito al montar (página de éxito tras el pago). */
export function ClearCartOnMount() {
  const clear = useCartStore((s) => s.clear);
  useEffect(() => {
    clear();
  }, [clear]);
  return null;
}
