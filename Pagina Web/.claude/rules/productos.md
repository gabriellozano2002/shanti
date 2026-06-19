# Regla: Productos

## Modelo

El tipo `Product` vive en `src/types/index.ts`. Campos principales:

- `id` — identificador estable (string, ej. `"calma-lavanda"`).
- `slug` — para la URL (`/productos/[slug]`). kebab-case, único.
- `name` — nombre visible (ej. `"Aceite Esencial de Lavanda"`).
- `shortDescription` — una línea para tarjetas.
- `description` — descripción larga para el detalle.
- `price` — **en centavos** (entero). `19900` = $199.00 MXN.
- `currency` — `"MXN"`.
- `images` — array de rutas en `public/` (la primera es la principal).
- `collection` — colección/categoría (`"calma" | "alegria" | "respira-profundo"`).
- `benefits` — array de beneficios (string[]).
- `howToUse` — modo de uso.
- `ingredients` — ingredientes.
- `inStock` — boolean.
- `featured` — opcional, destacar en home.
- `size` — opcional, ej. `"10 ml"`.

## La capa de datos

**Nunca** importes el array crudo. Usa siempre las funciones de
`src/data/products.ts`: `getProducts()`, `getProductBySlug()`, `getProductById()`,
`getFeaturedProducts()`, `getProductsByCollection()`. Así migramos a un CMS
(Sanity) o DB (Prisma + Postgres) sin tocar la UI.

## Agregar un producto nuevo

Ver el comando `/.claude/commands/nuevo-producto.md`. En resumen:

1. Pon la imagen en `public/images/products/` con nombre kebab-case `.webp`
   (sin espacios ni mayúsculas), ej. `esencia-lavanda-calma.webp`.
2. Agrega un objeto al array en `src/data/products.ts` respetando el tipo `Product`.
3. `price` en centavos. `slug` único. `collection` válida.
4. Corre `npm test` (los tests validan integridad básica del catálogo).

## Estado de colecciones

- **Calma** — activa: Lavanda, Bergamota, Manzanilla.
- **Alegría** y **Respira Profundo** — definidas en `COLLECTIONS` pero sin
  productos publicados todavía. Cuando lleguen, se agregan al array y a las fotos.
