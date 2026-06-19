import { describe, it, expect } from "vitest";
import {
  addToCart,
  cartItemCount,
  cartSubtotal,
  removeFromCart,
  setItemQuantity,
  toCartItem,
} from "@/lib/cart";
import type { Product } from "@/types";

const base: Omit<Product, "id" | "price" | "images"> = {
  slug: "x",
  name: "X",
  shortDescription: "",
  description: "",
  currency: "MXN",
  collection: "calma",
  benefits: [],
  howToUse: "",
  ingredients: "",
  inStock: true,
};

const lavanda: Product = {
  ...base,
  id: "calma-lavanda",
  slug: "lavanda",
  name: "Lavanda",
  price: 18900,
  images: ["/images/products/esencia-lavanda-calma.png"],
};
const bergamota: Product = {
  ...base,
  id: "calma-bergamota",
  slug: "bergamota",
  name: "Bergamota",
  price: 19900,
  images: ["/images/products/esencia-bergamota-calma.png"],
};

describe("carrito (lógica pura)", () => {
  it("agrega un producto nuevo", () => {
    const items = addToCart([], lavanda);
    expect(items).toHaveLength(1);
    expect(items[0].quantity).toBe(1);
    expect(items[0].price).toBe(18900);
  });

  it("suma la cantidad si el producto ya existe", () => {
    let items = addToCart([], lavanda);
    items = addToCart(items, lavanda, 2);
    expect(items).toHaveLength(1);
    expect(items[0].quantity).toBe(3);
  });

  it("ignora cantidades <= 0 al agregar", () => {
    expect(addToCart([], lavanda, 0)).toHaveLength(0);
  });

  it("quita un producto por id", () => {
    const items = addToCart(addToCart([], lavanda), bergamota);
    const after = removeFromCart(items, lavanda.id);
    expect(after).toHaveLength(1);
    expect(after[0].id).toBe(bergamota.id);
  });

  it("fija la cantidad y elimina cuando es 0", () => {
    let items = addToCart([], lavanda, 5);
    items = setItemQuantity(items, lavanda.id, 2);
    expect(items[0].quantity).toBe(2);
    items = setItemQuantity(items, lavanda.id, 0);
    expect(items).toHaveLength(0);
  });

  it("cuenta las unidades totales", () => {
    let items = addToCart([], lavanda, 2);
    items = addToCart(items, bergamota, 3);
    expect(cartItemCount(items)).toBe(5);
  });

  it("suma el subtotal en centavos", () => {
    let items = addToCart([], lavanda, 2);
    items = addToCart(items, bergamota, 1);
    expect(cartSubtotal(items)).toBe(2 * 18900 + 19900);
  });

  it("toCartItem copia el precio del momento", () => {
    expect(toCartItem(lavanda).price).toBe(lavanda.price);
    expect(toCartItem(lavanda).image).toBe(lavanda.images[0]);
  });
});
