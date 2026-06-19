# Regla: Componentes y estilo

## Breakpoints (mobile-first)

Base = móvil (≈375px). Prefijos solo para crecer:

| Prefijo | Ancho | Uso típico |
| --- | --- | --- |
| (base) | 0+ | Móvil. **Aquí se diseña primero.** |
| `sm:` | 640px | Móvil grande / phablet. |
| `md:` | 768px | Tablet — aquí suele cambiar a multi-columna. |
| `lg:` | 1024px | Escritorio. |
| `xl:` | 1280px | Escritorio amplio. |

Ejemplo de grilla de catálogo: `grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-4`.
Contenedor centrado: usa `container` (configurado con padding y centrado).

## Tokens de color de marca

Definidos en `tailwind.config.ts` y `src/app/globals.css`.

| Nombre | Hex | Token directo | Token semántico |
| --- | --- | --- | --- |
| Blanco Marfil | `#F8F6F2` | `brand-marfil` | `background` |
| Lavanda | `#CBB7E6` | `brand-lavanda` | `accent` |
| Verde Salvia | `#A9B8A3` | `brand-sage` | `secondary` |
| Dorado Suave | `#C8A86B` | `brand-gold` | `primary` (CTA) |
| Rosa Pétalo | `#E8D6DD` | `brand-petal` | — |
| Texto (taupe) | `#46413E` | `brand-ink` | `foreground` |

Botones CTA: `bg-primary text-primary-foreground` (dorado con texto oscuro, AA).
Texto secundario: `text-muted-foreground`.

## Tipografía

- Títulos: `font-serif` → **Cormorant Garamond** (elegante, alto contraste).
- Texto: `font-sans` → **Montserrat**.
- Cargadas con `next/font` en `src/app/layout.tsx` como `--font-serif` y `--font-sans`.

## Patrones

- Espacios generosos (mucho aire). Secciones: `py-16 md:py-24`.
- Esquinas suaves (`rounded-xl` / `rounded-2xl`), sombras sutiles.
- Imágenes siempre `next/image` con `sizes`. Productos en formato cuadrado (1:1).
- Animaciones discretas (`animate-fade-in-up`), nunca agresivas.
- `cn()` (de `@/lib/utils`) para combinar/condicionar clases.

## Accesibilidad

- Contraste AA mínimo. Sobre dorado/lavanda/salvia usa texto oscuro, no blanco.
- `alt` descriptivo en imágenes; `aria-label` en botones de solo ícono.
- Foco visible; navegable por teclado.
