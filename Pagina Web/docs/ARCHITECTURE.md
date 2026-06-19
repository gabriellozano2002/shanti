# Arquitectura — SHANTI ESSENCE

## Stack

Next.js 14 (App Router) · TypeScript · Tailwind + shadcn/ui · Zustand · Stripe ·
Vitest · deploy en Vercel.

## Estructura

```
src/
  app/
    (marketing)/        # home, nosotros, contacto
    (shop)/             # productos, carrito, checkout
    api/                # checkout + webhook de Stripe (solo servidor)
    layout.tsx          # layout raíz: fuentes, Navbar, Footer, WhatsApp
    globals.css         # tokens de color (CSS vars) + base
  components/           # ui / layout / product / cart / home
  lib/                  # stripe.ts, utils.ts, constants.ts
  data/                 # products.ts (catálogo + getters) ← única fuente
  store/                # cart-store.ts (Zustand)
  hooks/                # hooks reutilizables
  types/                # index.ts (Product, CartItem, ...)
tests/                  # cart.test.ts, checkout.test.ts
```

Route groups: `(marketing)` y `(shop)` agrupan rutas sin afectar la URL.

## Capa de datos (decisión clave)

Hoy el catálogo es estático en `src/data/products.ts`. **La UI nunca lee el array
directo**: consume funciones intermediarias —`getProducts()`, `getProductBySlug()`,
`getProductById()`, `getFeaturedProducts()`, `getProductsByCollection()`.

**Por qué:** podremos cambiar la fuente a un CMS (Sanity) o a una base de datos
(Prisma + Postgres) reescribiendo solo `src/data/products.ts` (volviéndolas
`async`), sin tocar páginas ni componentes. Las páginas ya se escriben con esto en
mente (Server Components, listas para `await`).

## Estado del carrito

`src/store/cart-store.ts` (Zustand, persistido en `localStorage`). Expone acciones
(`addItem`, `removeItem`, `setQuantity`, `clear`) y selectores de cálculo
(`getSubtotal`, `getItemCount`). La regla de negocio (totales) vive en el store,
no en los componentes. Probado en `tests/cart.test.ts`.

## Flujo de pago (Stripe)

1. Cliente arma el carrito (solo `id`/`slug` + cantidad).
2. `POST /api/checkout` resuelve precios reales en el servidor y crea la sesión
   de Stripe Checkout → devuelve la URL.
3. Cliente redirige a Stripe.
4. Stripe redirige a `/checkout/exito` (no confirma nada por sí solo).
5. `POST /api/webhooks/stripe` valida la firma y, en `checkout.session.completed`,
   confirma el pago (registrar orden = TODO). **Única fuente de verdad del pago.**

Detalle en `docs/stripe-setup.md` y `.claude/rules/stripe.md`.

## Renderizado y SEO

- Páginas de catálogo/contenido: Server Components (SSG/SSR) para SEO y velocidad.
- `next/image` siempre. `metadata` por página. `sizes` correcto en imágenes.
- Solo es client lo interactivo (carrito, botones de compra, menú móvil).

## Pendientes / futuro

- **Blog** (`/blog`) — pedido en el brief; aún no implementado. Sería un route
  group `(content)` o `app/blog/`, ideal con MDX o el CMS.
- **Testimonios / Instagram feed** — hoy con datos de ejemplo; conectar API real.
- **Newsletter** — formulario stub; conectar a un proveedor (Mailchimp/Resend).
- **Colecciones Alegría y Respira Profundo** — assets listos, sin publicar.
- Migración del catálogo a CMS/DB (ver "Capa de datos").
- PWA (ver `docs/pwa-plan.md`).
