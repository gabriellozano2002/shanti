/**
 * Tipos centrales de SHANTI ESSENCE.
 * Ver reglas en .claude/rules/productos.md
 */

export type CollectionId = "calma" | "alegria" | "respira-profundo";

export interface Collection {
  id: CollectionId;
  name: string;
  tagline: string;
  description: string;
  /** Si la colección ya tiene productos publicados. */
  available: boolean;
}

export interface Product {
  id: string;
  slug: string;
  name: string;
  /** Una línea para tarjetas. */
  shortDescription: string;
  /** Descripción larga para el detalle. */
  description: string;
  /** Precio en CENTAVOS (entero). 18900 = $189.00. */
  price: number;
  currency: "MXN";
  /** Rutas en /public. La primera es la principal. */
  images: string[];
  collection: CollectionId;
  benefits: string[];
  howToUse: string;
  ingredients: string;
  inStock: boolean;
  featured?: boolean;
  /** Ej. "10 ml". */
  size?: string;
}

export interface CartItem {
  id: string;
  slug: string;
  name: string;
  /** Precio unitario en centavos (copiado al agregar). */
  price: number;
  image: string;
  quantity: number;
}

/** Lo que el cliente manda al servidor para checkout: nunca el precio. */
export interface CheckoutRequestItem {
  id: string;
  quantity: number;
}
