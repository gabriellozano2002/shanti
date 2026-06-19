# Regla: Stripe

Cómo integramos pagos. Resumen de seguridad en `CLAUDE.md` y `src/app/api/CLAUDE.md`.

## Variables de entorno

| Variable | Lado | Para qué |
| --- | --- | --- |
| `NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY` | cliente | Redirigir a Stripe Checkout con `@stripe/stripe-js`. |
| `STRIPE_SECRET_KEY` | **solo servidor** | Crear sesiones / llamar a la API de Stripe. |
| `STRIPE_WEBHOOK_SECRET` | **solo servidor** | Verificar la firma del webhook. |
| `NEXT_PUBLIC_SITE_URL` | ambos | Construir `success_url` / `cancel_url`. |

La secreta y el webhook secret **nunca** llevan `NEXT_PUBLIC_` y **nunca** se
leen fuera de `src/lib/stripe.ts` y `src/app/api/`.

## Crear la sesión de Checkout (`POST /api/checkout`)

1. El cliente manda solo `{ items: [{ id|slug, quantity }] }`. **No** manda precios.
2. El servidor resuelve cada producto con `getProductById()` / `getProductBySlug()`,
   valida que exista y esté `inStock`, y arma los `line_items` con el precio real
   (en centavos, `currency: "mxn"`).
3. `stripe.checkout.sessions.create({ mode: "payment", line_items, success_url,
   cancel_url, ... })`.
4. Responde `{ url }` (o `{ id }`) y el cliente redirige a Stripe.
5. `success_url` → `${SITE_URL}/checkout/exito?session_id={CHECKOUT_SESSION_ID}`.
   `cancel_url` → `${SITE_URL}/checkout/cancelado`.

## Webhook (`POST /api/webhooks/stripe`)

1. Lee el cuerpo **crudo**: `const body = await req.text();`.
2. Toma la firma del header `stripe-signature`.
3. `event = stripe.webhooks.constructEvent(body, sig, STRIPE_WEBHOOK_SECRET)`.
   Si lanza, responde 400.
4. En `checkout.session.completed`: aquí (y solo aquí) el pago es real → registrar
   la orden / reducir stock / enviar correo. Por ahora: log + `// TODO`.
5. Siempre responde 200 rápido cuando el evento se procesó bien.

`runtime = "nodejs"` en ambas rutas (el SDK de Stripe no corre en Edge).

## Prueba local

Ver `docs/stripe-setup.md` (usa la CLI `stripe listen --forward-to`).
