/**
 * Lógica PURA del carrito (sin estado ni DOM) para poder testearla fácil.
 * El store de Zustand (src/store/cart-store.ts) la usa; los tests también
 * (tests/cart.test.ts). No metas aquí nada de React ni de localStorage.
 */
import type { CartItem, Product } from "@/types";

/** Convierte un Product a línea de carrito (copia el precio del momento). */
export function toCartItem(product: Product, quantity = 1): CartItem {
  return {
    id: product.id,
    slug: product.slug,
    name: product.name,
    price: product.price,
    image: product.images[0] ?? "",
    quantity,
  };
}

/** Agrega un producto; si ya existe, suma la cantidad. Devuelve un array nuevo. */
export function addToCart(
  items: CartItem[],
  product: Product,
  quantity = 1,
): CartItem[] {
  if (quantity <= 0) return items;
  const existing = items.find((i) => i.id === product.id);
  if (existing) {
    return items.map((i) =>
      i.id === product.id ? { ...i, quantity: i.quantity + quantity } : i,
    );
  }
  return [...items, toCartItem(product, quantity)];
}

/** Quita por completo un producto del carrito. */
export function removeFromCart(items: CartItem[], id: string): CartItem[] {
  return items.filter((i) => i.id !== id);
}

/** Fija la cantidad de un producto. Si es <= 0, lo elimina. */
export function setItemQuantity(
  items: CartItem[],
  id: string,
  quantity: number,
): CartItem[] {
  if (quantity <= 0) return removeFromCart(items, id);
  return items.map((i) => (i.id === id ? { ...i, quantity } : i));
}

/** Número total de unidades en el carrito. */
export function cartItemCount(items: CartItem[]): number {
  return items.reduce((n, i) => n + i.quantity, 0);
}

/** Subtotal en CENTAVOS. */
export function cartSubtotal(items: CartItem[]): number {
  return items.reduce((sum, i) => sum + i.price * i.quantity, 0);
}
