# SHANTI ESSENCE — Memoria del proyecto

E-commerce **mobile-first** de aceites esenciales 100% naturales. Los clientes
compran directo en la web con pago por **Stripe**. La mayoría entra **desde el
celular** (links de Instagram y WhatsApp): el móvil no es un caso de borde, es
el caso principal.

Slogan: **"Conecta con tu esencia"** · Lema visual: _lujo orgánico, spa frente al mar_.

## Stack

- **Next.js 14 (App Router) + TypeScript**
- **Tailwind CSS** + **shadcn/ui** (componentes en `src/components/ui/`)
- **Zustand** para el carrito (`src/store/cart-store.ts`)
- **Stripe** — `@stripe/stripe-js` en cliente, SDK `stripe` en servidor
- Deploy en **Vercel** · Tests con **Vitest**

## Comandos

```bash
npm run dev      # desarrollo en http://localhost:3000
npm run build    # build de producción
npm test         # tests (Vitest)
npm run lint     # ESLint
```

## Reglas duras (no negociables)

1. **Mobile-first SIEMPRE.** Diseña primero para 375px; expande con `md:` / `lg:`.
   Todo debe verse perfecto en celular ANTES de pensar en escritorio.
2. **`STRIPE_SECRET_KEY` JAMÁS** llega al navegador. Solo se usa en
   `src/lib/stripe.ts` y en rutas `src/app/api/`. Nunca con prefijo `NEXT_PUBLIC_`.
3. El pago se confirma **solo** vía el webhook (`api/webhooks/stripe`), nunca por
   el redirect a la página de éxito.
4. **Nunca** subas `.env.local` ni secretos a git.
5. Antes de decir que una tarea terminó, corre `npm test` y `npm run build`.
6. Archivos chicos y de **responsabilidad única**. Divide cuando crezcan.
7. Sin lógica de negocio dentro de componentes de presentación.
8. El catálogo se consume SOLO vía `getProducts()` / `getProductBySlug()` de
   `src/data/products.ts`, nunca leyendo el array directo (para migrar a CMS/DB
   sin tocar la UI).

## Convenciones de nombres

- Componentes React: `PascalCase` (`ProductCard.tsx`).
- Hooks, utils, rutas y carpetas: `kebab-case` (`use-cart.ts`, `cart-store.ts`).
- Imágenes: minúsculas con guiones, `.webp` cuando se pueda, sin espacios ni
  mayúsculas (`esencia-lavanda-calma.webp`).
- Precios en **centavos** (enteros), moneda `"MXN"`.

## Marca (paleta + tipografía)

Colores en `tailwind.config.ts` (token `brand`): Marfil `#F8F6F2`, Lavanda
`#CBB7E6`, Verde Salvia `#A9B8A3`, Dorado `#C8A86B`, Rosa Pétalo `#E8D6DD`,
texto `#46413E`. Tipografías: **Cormorant Garamond** (títulos) + **Montserrat**
(texto). Evitar: estilo clínico/farmacéutico, colores oscuros, diseño agresivo.

## Estado actual

Colección activa: **Calma** (Lavanda, Bergamota, Manzanilla). Las colecciones
_Alegría_ y _Respira Profundo_ existen como assets pero **aún no se publican**.

## Docs (lee según la tarea)

- @docs/ARCHITECTURE.md — estructura, capa de datos, decisiones.
- @docs/conventions.md — convenciones de código y UI.
- @docs/stripe-setup.md — variables y prueba local de Stripe.
- @docs/pwa-plan.md — plan PWA (futuro).

Reglas detalladas en `.claude/rules/` · Comandos en `.claude/commands/`.

> Si una duda cambia la arquitectura, **pregunta antes de asumir**.
