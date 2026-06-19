# Reglas de la API (`src/app/api/`)

Estas rutas corren **solo en el servidor**. Aquí vive todo lo sensible.

## Seguridad de Stripe

- `STRIPE_SECRET_KEY` y `STRIPE_WEBHOOK_SECRET` se leen de `process.env` **solo
  aquí** y en `src/lib/stripe.ts`. Nunca se devuelven en una respuesta.
- El cliente Stripe se importa de `@/lib/stripe`, no se re-inicializa por ruta.
- El webhook (`webhooks/stripe/route.ts`) **siempre** valida la firma con
  `stripe.webhooks.constructEvent(rawBody, signature, STRIPE_WEBHOOK_SECRET)`.
  Lee el cuerpo crudo (`await req.text()`), no `req.json()`, o la firma falla.
- El pago se da por bueno **únicamente** al recibir `checkout.session.completed`
  (u otro evento confirmado) en el webhook. El redirect de éxito NO confirma nada.

## Validación de entrada

- Valida y normaliza todo lo que llega del cliente antes de usarlo.
- **Nunca confíes en el precio que manda el cliente.** El precio se resuelve en
  el servidor desde `getProductBySlug()` / `getProductById()`. El cliente solo
  manda `id`/`slug` y cantidad.
- Si falta un campo o el producto no existe / no está `inStock`, responde 400.

## Manejo de errores

- Envuelve la lógica en `try/catch`. En error responde
  `NextResponse.json({ error: "mensaje genérico" }, { status })`.
- **No filtres** mensajes internos, stack traces ni datos de Stripe al cliente.
  Loguea el detalle en el servidor (`console.error`), responde algo genérico.
- Códigos: 400 entrada inválida · 405 método no permitido · 500 error interno.

## Convenciones

- Usa el `Route Handler` de App Router (`export async function POST(req: Request)`).
- Marca rutas con efectos como `export const runtime = "nodejs"` (Stripe SDK
  necesita Node, no Edge).
- Una responsabilidad por archivo de ruta.
