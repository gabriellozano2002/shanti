"use client";

/**
 * Store del carrito (Zustand) persistido en localStorage.
 * La lógica de cálculo vive en src/lib/cart.ts (pura y testeable); aquí solo
 * se conecta al estado. Ver docs/ARCHITECTURE.md.
 */
import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";
import type { CartItem, Product } from "@/types";
import {
  addToCart,
  cartItemCount,
  cartSubtotal,
  removeFromCart,
  setItemQuantity,
} from "@/lib/cart";
import { calculateShippingAmount } from "@/lib/checkout";

interface CartState {
  items: CartItem[];
  addItem: (product: Product, quantity?: number) => void;
  removeItem: (id: string) => void;
  setQuantity: (id: string, quantity: number) => void;
  clear: () => void;
  getItemCount: () => number;
  getSubtotal: () => number;
  /** Costo de envío en centavos según el subtotal (misma regla que Stripe). */
  getShipping: () => number;
  /** Total a pagar en centavos: subtotal + envío. */
  getTotal: () => number;
}

export const useCartStore = create<CartState>()(
  persist(
    (set, get) => ({
      items: [],
      addItem: (product, quantity = 1) =>
        set((state) => ({ items: addToCart(state.items, product, quantity) })),
      removeItem: (id) =>
        set((state) => ({ items: removeFromCart(state.items, id) })),
      setQuantity: (id, quantity) =>
        set((state) => ({
          items: setItemQuantity(state.items, id, quantity),
        })),
      clear: () => set({ items: [] }),
      getItemCount: () => cartItemCount(get().items),
      getSubtotal: () => cartSubtotal(get().items),
      getShipping: () => calculateShippingAmount(cartSubtotal(get().items)),
      getTotal: () => {
        const subtotal = cartSubtotal(get().items);
        return subtotal + calculateShippingAmount(subtotal);
      },
    }),
    {
      name: "shanti-cart",
      storage: createJSONStorage(() =>
        typeof window !== "undefined"
          ? window.localStorage
          : // En SSR no hay localStorage: storage no-op.
            {
              getItem: () => null,
              setItem: () => {},
              removeItem: () => {},
            },
      ),
    },
  ),
);
