/**
 * ÚNICA fuente del catálogo. La UI NUNCA lee `products` directo: usa los getters.
 * Hoy es estático; mañana estos getters pueden leer de un CMS (Sanity) o DB
 * (Prisma) sin tocar la UI — por eso son `async`. Ver docs/ARCHITECTURE.md.
 *
 * Precios en CENTAVOS. ⚠️ TODO: confirmar precios y tamaños reales con el cliente.
 */
import type { Collection, CollectionId, Product } from "@/types";

export const COLLECTIONS: Collection[] = [
  {
    id: "calma",
    name: "Colección Calma",
    tagline: "Para soltar, respirar y volver a ti",
    description:
      "Aromas suaves que invitan al descanso y la serenidad. Pensados para tus rituales de noche y los momentos en que necesitas bajar el ritmo.",
    available: true,
  },
  {
    id: "alegria",
    name: "Colección Alegría",
    tagline: "Frescura cítrica que enciende el ánimo",
    description:
      "Aromas luminosos y vitales para empezar el día con energía. Próximamente.",
    available: false,
  },
  {
    id: "respira-profundo",
    name: "Colección Respira Profundo",
    tagline: "Aire limpio, mente despejada",
    description:
      "Aromas que abren el pecho y despejan el ambiente. Próximamente.",
    available: false,
  },
];

const products: Product[] = [
  {
    id: "calma-lavanda",
    slug: "aceite-esencial-lavanda",
    name: "Aceite Esencial de Lavanda",
    shortDescription: "Calma profunda y descanso reparador.",
    description:
      "La lavanda es el aroma de la serenidad. Su perfume floral y herbáceo relaja el cuerpo y aquieta la mente, ideal para preparar el descanso y soltar la tensión del día. Un imprescindible de cualquier ritual de calma.",
    price: 18900,
    currency: "MXN",
    images: ["/images/products/esencia-lavanda-calma.png"],
    collection: "calma",
    benefits: [
      "Favorece la relajación y un sueño reparador",
      "Alivia el estrés y la tensión",
      "Equilibra las emociones",
    ],
    howToUse:
      "Añade 3–5 gotas en tu difusor, o diluye en un aceite portador para un masaje relajante. Ideal antes de dormir.",
    ingredients:
      "100% aceite esencial puro de lavanda (Lavandula angustifolia).",
    inStock: true,
    featured: true,
    size: "10 ml",
  },
  {
    id: "calma-bergamota",
    slug: "aceite-esencial-bergamota",
    name: "Aceite Esencial de Bergamota",
    shortDescription: "Equilibrio y ánimo luminoso.",
    description:
      "La bergamota combina la frescura cítrica con una calidez floral única. Eleva el ánimo a la vez que serena la mente, perfecta para despejar el ambiente y reencontrar el equilibrio en medio del ajetreo.",
    price: 19900,
    currency: "MXN",
    images: ["/images/products/esencia-bergamota-calma.png"],
    collection: "calma",
    benefits: [
      "Eleva el ánimo y aporta optimismo",
      "Reduce la ansiedad y el nerviosismo",
      "Aroma cítrico que renueva el ambiente",
    ],
    howToUse:
      "Difunde 3–5 gotas para despejar el ambiente. Si la aplicas en piel, evita la exposición solar directa después (es fotosensible).",
    ingredients: "100% aceite esencial puro de bergamota (Citrus bergamia).",
    inStock: true,
    featured: true,
    size: "10 ml",
  },
  {
    id: "calma-manzanilla",
    slug: "aceite-esencial-manzanilla",
    name: "Aceite Esencial de Manzanilla",
    shortDescription: "Serenidad suave para cuerpo y mente.",
    description:
      "Dulce, herbal y reconfortante, la manzanilla es un abrazo en forma de aroma. Suaviza la irritabilidad y acompaña los momentos en que el cuerpo pide pausa y ternura.",
    price: 21900,
    currency: "MXN",
    images: ["/images/products/esencia-manzanilla-calma.png"],
    collection: "calma",
    benefits: [
      "Calma la irritabilidad y el nerviosismo",
      "Apoya un descanso tranquilo",
      "Suaviza y reconforta",
    ],
    howToUse:
      "Difunde 3–4 gotas o diluye en aceite portador para un masaje suave. Perfecta para los rituales de noche.",
    ingredients:
      "100% aceite esencial puro de manzanilla (Matricaria chamomilla).",
    inStock: true,
    featured: true,
    size: "10 ml",
  },
];

// ── Getters (capa de acceso a datos). Úsalos SIEMPRE desde la UI. ──────────────

export async function getProducts(): Promise<Product[]> {
  return products;
}

export async function getProductBySlug(
  slug: string,
): Promise<Product | undefined> {
  return products.find((p) => p.slug === slug);
}

export async function getProductById(
  id: string,
): Promise<Product | undefined> {
  return products.find((p) => p.id === id);
}

export async function getFeaturedProducts(): Promise<Product[]> {
  return products.filter((p) => p.featured);
}

export async function getProductsByCollection(
  collection: CollectionId,
): Promise<Product[]> {
  return products.filter((p) => p.collection === collection);
}

export async function getCollections(): Promise<Collection[]> {
  return COLLECTIONS;
}

export async function getAvailableCollections(): Promise<Collection[]> {
  return COLLECTIONS.filter((c) => c.available);
}

export function getCollection(id: CollectionId): Collection | undefined {
  return COLLECTIONS.find((c) => c.id === id);
}
