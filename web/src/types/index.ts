/**
 * Tipos centrales de SHANTI ESSENCE.
 * Ver reglas en .claude/rules/productos.md
 */

export type CollectionId =
  | "calma"
  | "alegria"
  | "respira-profundo"
  | "energia"
  | "espiritualidad";

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

/**
 * Datos de contacto y envío que captura nuestro formulario ANTES de Stripe.
 * El servidor los valida y se los adjunta a la sesión de pago; Stripe ya no
 * vuelve a pedir dirección. Campos pensados para México.
 */
export interface CheckoutCustomer {
  name: string;
  email: string;
  /** Teléfono (idealmente WhatsApp), 10 dígitos. */
  phone: string;
  /** Calle y número exterior/interior. → Stripe address.line1 */
  street: string;
  /** Colonia. → parte de Stripe address.line2 */
  neighborhood: string;
  /** Código postal de 5 dígitos. */
  postalCode: string;
  city: string;
  /** Estado de México (ver MX_STATES en constants). */
  state: string;
  /** Referencias / entre calles (opcional). */
  notes?: string;
}

/** Cuerpo completo del POST /api/checkout. */
export interface CheckoutRequest {
  items: CheckoutRequestItem[];
  customer: CheckoutCustomer;
}
