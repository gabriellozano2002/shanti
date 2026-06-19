# Reglas de componentes (`src/components/`)

## Organización por carpeta

- `ui/` — primitivos shadcn/ui reutilizables y sin marca (Button, Input…).
- `layout/` — estructura global (Navbar, Footer, WhatsAppButton).
- `product/` — catálogo y detalle (ProductCard, ProductGrid, ProductGallery…).
- `cart/` — carrito (CartItem, CartSummary, AddToCartButton…).
- `home/` — secciones de la landing (Hero, Beneficios, Testimonios…).

## Mobile-first (obligatorio)

- Escribe los estilos base para **375px**. Agrega `sm:` / `md:` / `lg:` solo para
  agrandar, nunca para arreglar el móvil.
- Áreas táctiles cómodas: mínimo ~44px de alto en botones e íconos clicables.
- Imágenes siempre con `next/image` + `sizes` correcto. Nada de `<img>`.

## Presentación vs. lógica

- Los componentes de presentación reciben datos por **props tipadas**; no hacen
  fetch, no acceden al store ni leen `process.env`.
- La lógica de negocio vive en `src/store/`, `src/lib/` y `src/data/`.
- Un componente que necesita estado del carrito usa el hook del store
  (`useCartStore`), pero la regla del cálculo (totales, etc.) está en el store.

## Estilo y marca

- Usa la paleta de marca: `bg-brand-marfil`, `text-brand-ink`, `bg-brand-gold`,
  `border-brand-sage/30`… o los tokens semánticos (`bg-primary`, `text-muted-foreground`).
- Títulos con `font-serif` (Cormorant), texto con `font-sans` (Montserrat).
- Componibles con `cn()` de `@/lib/utils` para fusionar clases.
- Marca componentes interactivos con `"use client"`; los demás son Server Components.

## Tamaño

- Un componente por archivo, en `PascalCase`. Si pasa de ~120 líneas o mezcla
  responsabilidades, divídelo.

Ver patrones de Tailwind y breakpoints en `.claude/rules/componentes.md`.
