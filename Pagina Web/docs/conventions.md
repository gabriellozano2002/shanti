# Convenciones de código y UI

## Nombres

- Componentes React: `PascalCase` → `ProductCard.tsx`.
- Hooks/utils/store: `kebab-case` → `cart-store.ts`, `use-cart.ts`.
- Carpetas y rutas: `kebab-case`.
- Tipos e interfaces: `PascalCase` (`Product`, `CartItem`).
- Constantes globales: `UPPER_SNAKE_CASE` en `src/lib/constants.ts`.

## Imports

- Usa el alias `@/` (configurado en `tsconfig.json`): `import { cn } from "@/lib/utils"`.
- Orden: librerías externas → alias `@/` → relativos.

## TypeScript

- `strict` activado. Sin `any` salvo justificación.
- Props de componentes con `interface` o `type` explícito.
- Precios siempre `number` en **centavos**. Formatea solo al mostrar
  (`formatPrice()` en `src/lib/utils.ts`).

## Componentes

- Server Components por defecto. `"use client"` solo cuando hay estado/eventos.
- Presentación recibe props; sin fetch ni acceso a env ni al store dentro de
  componentes de presentación (ver `src/components/CLAUDE.md`).
- Un componente por archivo. Divide antes de que crezca demasiado.

## Estilo (Tailwind)

- **Mobile-first**: base 375px, luego `md:`/`lg:`. Ver `.claude/rules/componentes.md`.
- Paleta de marca vía tokens (`brand-*` o semánticos). Nada de hex sueltos en JSX.
- `cn()` para combinar clases condicionales.

## Imágenes

- `next/image` siempre, con `alt` y `sizes`.
- Archivos en `public/images/<uso>/`, kebab-case, `.webp` cuando se pueda.

## Commits (sugerido)

- Conventional commits: `feat:`, `fix:`, `chore:`, `docs:`, `style:`, `refactor:`.

## Antes de terminar una tarea

`npm run lint && npm test && npm run build` en verde. (Comando `/revisar-cambios`.)
