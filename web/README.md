# SHANTI ESSENCE — E-commerce

Tienda en línea **mobile-first** de aceites esenciales 100% naturales.
_Conecta con tu esencia._

## Stack

Next.js 14 (App Router) · TypeScript · Tailwind + shadcn/ui · Zustand · Stripe ·
Vitest · deploy en Vercel.

## Empezar

```bash
npm install
cp .env.example .env.local   # llena las llaves de Stripe
npm run dev                  # http://localhost:3000
```

## Scripts

| Comando | Qué hace |
| --- | --- |
| `npm run dev` | Servidor de desarrollo. |
| `npm run build` | Build de producción. |
| `npm start` | Sirve el build. |
| `npm test` | Tests (Vitest). |
| `npm run lint` | ESLint. |

## Estructura (resumen)

- `src/app/` — rutas (App Router): `(marketing)`, `(shop)`, `api/`.
- `src/components/` — UI por dominio (`ui`, `layout`, `product`, `cart`, `home`).
- `src/data/products.ts` — catálogo + getters (única fuente; ver ARQUITECTURA).
- `src/store/cart-store.ts` — carrito (Zustand).
- `src/lib/` — `stripe.ts`, `cart.ts`, `checkout.ts`, `utils.ts`, `constants.ts`.

## Documentación

- [Arquitectura](docs/ARCHITECTURE.md)
- [Convenciones](docs/conventions.md)
- [Configurar Stripe](docs/stripe-setup.md)
- [Plan PWA](docs/pwa-plan.md)
- Memoria para Claude Code: `CLAUDE.md` (raíz) + `.claude/`.

## Notas

- **Mobile-first**: se diseña primero para 375px.
- La llave secreta de Stripe vive solo en el servidor; el pago se confirma vía
  webhook. Ver `docs/stripe-setup.md`.
- Colección activa: **Calma**. _Alegría_ y _Respira Profundo_ llegan después.
- ⚠️ Precios, tamaños y datos de contacto son provisionales (buscar `TODO`).
