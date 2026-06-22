/**
 * ÚNICA fuente del catálogo. La UI NUNCA lee `products` directo: usa los getters.
 * Hoy es estático; mañana estos getters pueden leer de un CMS (Sanity) o DB
 * (Prisma) sin tocar la UI — por eso son `async`. Ver docs/ARCHITECTURE.md.
 *
 * Precios en CENTAVOS. Confirmados con lista-precios-shanti.md (presentación 10 ml).
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
    tagline: "Vive la frescura, siente la alegría",
    description:
      "Aromas cítricos luminosos y vitales que encienden el ánimo y llenan el espacio de buena energía. Perfectos para empezar el día con frescura.",
    available: true,
  },
  {
    id: "respira-profundo",
    name: "Colección Respira Profundo",
    tagline: "Aire puro, cuerpo ligero, mente en calma",
    description:
      "Aromas frescos y balsámicos que abren el pecho, despejan las vías y purifican el ambiente. Para respirar hondo y sentir la mente más clara.",
    available: true,
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
    price: 38000,
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
    price: 40000,
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
    price: 120000,
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

  // ── Colección Alegría (cítricos) ──────────────────────────────────────────
  {
    id: "alegria-naranja",
    slug: "aceite-esencial-naranja",
    name: "Aceite Esencial de Naranja",
    shortDescription: "Alegría dulce y luminosa.",
    description:
      "El aroma de la naranja es pura alegría embotellada. Dulce y envolvente, llena el espacio de calidez y buen humor, perfecto para los días que piden un poco más de luz.",
    price: 34000,
    currency: "MXN",
    images: ["/images/products/esencia-naranja-alegria.png"],
    collection: "alegria",
    benefits: [
      "Levanta el ánimo y aporta calidez",
      "Aroma dulce que alegra cualquier espacio",
      "Acompaña los momentos de convivencia",
    ],
    howToUse:
      "Difunde 3–5 gotas para llenar el ambiente de frescura. Si la aplicas en piel diluida, evita la exposición solar directa después (los cítricos son fotosensibles).",
    ingredients: "100% aceite esencial puro de naranja (Citrus sinensis).",
    inStock: true,
    size: "10 ml",
  },
  {
    id: "alegria-mandarina",
    slug: "aceite-esencial-mandarina",
    name: "Aceite Esencial de Mandarina",
    shortDescription: "Dulzura cítrica que reconforta.",
    description:
      "Dulce y dócil, la mandarina es la más tierna de los cítricos. Su aroma reconforta y serena, ideal para relajar a grandes y pequeños sin perder la frescura.",
    price: 48000,
    currency: "MXN",
    images: ["/images/products/esencia-mandarina-alegria.png"],
    collection: "alegria",
    benefits: [
      "Relaja con dulzura",
      "Aroma cítrico suave y reconfortante",
      "Favorece un ambiente tranquilo",
    ],
    howToUse:
      "Difunde 3–5 gotas para un ambiente cálido y fresco. Si la aplicas en piel diluida, evita la exposición solar directa después (es fotosensible).",
    ingredients: "100% aceite esencial puro de mandarina (Citrus reticulata).",
    inStock: true,
    size: "10 ml",
  },
  {
    id: "alegria-toronja",
    slug: "aceite-esencial-toronja",
    name: "Aceite Esencial de Toronja",
    shortDescription: "Frescura vibrante que energiza.",
    description:
      "Fresca, vibrante y con un toque amargo, la toronja despierta los sentidos. Su aroma energizante ayuda a renovar el ánimo y despejar el ambiente.",
    price: 38000,
    currency: "MXN",
    images: ["/images/products/esencia-toronja-alegria.png"],
    collection: "alegria",
    benefits: [
      "Energiza y renueva el ánimo",
      "Aroma cítrico vibrante y fresco",
      "Despeja y refresca el ambiente",
    ],
    howToUse:
      "Difunde 3–5 gotas para revitalizar el espacio. Si la aplicas en piel diluida, evita la exposición solar directa después (es fotosensible).",
    ingredients: "100% aceite esencial puro de toronja (Citrus paradisi).",
    inStock: true,
    size: "10 ml",
  },
  {
    id: "alegria-lima",
    slug: "aceite-esencial-lima",
    name: "Aceite Esencial de Lima",
    shortDescription: "Chispa cítrica que aviva el ánimo.",
    description:
      "Chispeante y luminosa, la lima aporta una frescura que contagia. Su aroma cítrico aviva el espíritu y trae claridad a tu día.",
    price: 38000,
    currency: "MXN",
    images: ["/images/products/esencia-lima-alegria.png"],
    collection: "alegria",
    benefits: [
      "Refresca y aviva el ánimo",
      "Aroma cítrico luminoso",
      "Aporta sensación de claridad",
    ],
    howToUse:
      "Difunde 3–5 gotas para una atmósfera fresca y alegre. Si la aplicas en piel diluida, evita la exposición solar directa después (es fotosensible).",
    ingredients: "100% aceite esencial puro de lima (Citrus aurantifolia).",
    inStock: true,
    size: "10 ml",
  },

  // ── Colección Respira Profundo ────────────────────────────────────────────
  {
    id: "respira-eucalipto",
    slug: "aceite-esencial-eucalipto",
    name: "Aceite Esencial de Eucalipto",
    shortDescription: "Despeja las vías y purifica el aire.",
    description:
      "El eucalipto es sinónimo de aire libre. Su aroma fresco y penetrante despeja las vías y purifica el ambiente, ideal para respirar hondo y sentir la mente más clara.",
    price: 38000,
    currency: "MXN",
    images: ["/images/products/esencia-eucalipto-respira.png"],
    collection: "respira-profundo",
    benefits: [
      "Despeja las vías respiratorias",
      "Purifica el aire del ambiente",
      "Refresca y aclara la mente",
    ],
    howToUse:
      "Añade 3–5 gotas en tu difusor para despejar el ambiente, o en un tazón de agua caliente para vahos. Evita el uso directo en niños pequeños.",
    ingredients: "100% aceite esencial puro de eucalipto (Eucalyptus globulus).",
    inStock: true,
    size: "10 ml",
  },
  {
    id: "respira-menta",
    slug: "aceite-esencial-menta",
    name: "Aceite Esencial de Menta",
    shortDescription: "Frescura que revitaliza y aclara.",
    description:
      "Fresca y revitalizante, la menta despierta cuerpo y mente. Su aroma penetrante aporta claridad, energía y una sensación inmediata de frescura.",
    price: 38000,
    currency: "MXN",
    images: ["/images/products/esencia-menta-respira.png"],
    collection: "respira-profundo",
    benefits: [
      "Refresca y revitaliza",
      "Aporta claridad y energía",
      "Despeja el ambiente",
    ],
    howToUse:
      "Difunde 3–4 gotas para revitalizar el espacio. Diluye bien si la aplicas en piel y evita el contacto con los ojos.",
    ingredients: "100% aceite esencial puro de menta (Mentha piperita).",
    inStock: true,
    size: "10 ml",
  },
  {
    id: "respira-tomillo",
    slug: "aceite-esencial-tomillo",
    name: "Aceite Esencial de Tomillo",
    shortDescription: "Aroma herbal cálido y protector.",
    description:
      "Herbal e intenso, el tomillo es un clásico protector. Su aroma cálido fortalece el ambiente y acompaña los días en que quieres sentirte más resguardada.",
    price: 38000,
    currency: "MXN",
    images: ["/images/products/esencia-tomillo-respira.png"],
    collection: "respira-profundo",
    benefits: [
      "Fortalece las defensas del ambiente",
      "Apoya la salud respiratoria",
      "Aroma herbal cálido y protector",
    ],
    howToUse:
      "Difunde 2–3 gotas (es un aroma intenso). Diluye siempre antes de aplicar en piel.",
    ingredients: "100% aceite esencial puro de tomillo (Thymus vulgaris).",
    inStock: true,
    size: "10 ml",
  },
  {
    id: "respira-inhala",
    slug: "sinergia-inhala-plus",
    name: "Inhala + — Sinergia Respira",
    shortDescription: "Sinergia que abre la respiración.",
    description:
      "Inhala + es una sinergia pensada para respirar mejor. Combina aceites frescos y balsámicos que abren el pecho, despejan las vías y renuevan tu energía.",
    price: 43000,
    currency: "MXN",
    images: ["/images/products/esencia-inhala-respira.png"],
    collection: "respira-profundo",
    benefits: [
      "Abre la respiración",
      "Despeja las vías y el ambiente",
      "Renueva la energía",
    ],
    howToUse:
      "Añade 3–5 gotas en tu difusor, especialmente en temporada de frío. También en vahos con agua caliente.",
    ingredients:
      "Mezcla sinérgica de aceites esenciales puros formulada para la respiración.",
    inStock: true,
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
