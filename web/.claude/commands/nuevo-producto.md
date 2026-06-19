---
description: Agrega un producto nuevo al catálogo respetando el tipo Product.
---

Vas a agregar un producto nuevo a la tienda SHANTI ESSENCE.

Datos que me darás (pregunta lo que falte, no inventes precios ni aromas):
nombre, colección (`calma` | `alegria` | `respira-profundo`), precio en MXN,
beneficios, modo de uso, ingredientes, tamaño (ej. 10 ml) y la imagen.

Pasos:

1. **Imagen.** Colócala en `public/images/products/` con nombre kebab-case, sin
   espacios ni mayúsculas, `.webp` si se puede:
   `esencia-<aroma>-<coleccion>.webp` (ej. `esencia-romero-respira-profundo.webp`).
   Si me pasaste un archivo con otro nombre, renómbralo.
2. **Datos.** Agrega un objeto al array de `src/data/products.ts` cumpliendo el
   tipo `Product` de `src/types/index.ts`:
   - `price` en **centavos** (multiplica los pesos × 100).
   - `slug` único en kebab-case.
   - `id` estable (`<coleccion>-<aroma>`).
   - `collection` válida; `images` apuntando a la ruta del paso 1.
   - Rellena `benefits`, `howToUse`, `ingredients`, `shortDescription`,
     `description`, `inStock: true`.
3. **No** toques la UI: las páginas leen vía `getProducts()` y derivados.
4. Corre `npm run lint && npm test` y reporta el resultado.

Sigue las reglas de `.claude/rules/productos.md`.
