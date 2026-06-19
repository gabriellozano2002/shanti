# Configuración de Stripe

> Estado: **base stubbeada**. Las rutas existen y son seguras, pero faltan llaves
> reales y registrar la orden en el webhook. Aquí está cómo activarlo.

## 1. Cuenta y llaves

1. Crea cuenta en <https://stripe.com> (modo **test** primero).
2. Dashboard → Developers → API keys. Copia:
   - **Publishable key** (`pk_test_...`) → `NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY`
   - **Secret key** (`sk_test_...`) → `STRIPE_SECRET_KEY`

## 2. Variables de entorno

Copia `.env.example` a `.env.local` y llena los valores:

```bash
cp .env.example .env.local
```

```
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_test_xxx
STRIPE_SECRET_KEY=sk_test_xxx
STRIPE_WEBHOOK_SECRET=whsec_xxx        # del paso 3
NEXT_PUBLIC_SITE_URL=http://localhost:3000
```

`.env.local` está en `.gitignore`: **nunca** se sube. `STRIPE_SECRET_KEY` y
`STRIPE_WEBHOOK_SECRET` solo se usan en el servidor.

## 3. Webhook en local (Stripe CLI)

1. Instala la CLI: `brew install stripe/stripe-cli/stripe`.
2. `stripe login`.
3. Reenvía eventos a tu app local:

   ```bash
   stripe listen --forward-to localhost:3000/api/webhooks/stripe
   ```

   Imprime un `whsec_...`: cópialo a `STRIPE_WEBHOOK_SECRET` en `.env.local` y
   reinicia `npm run dev`.
4. Dispara un evento de prueba:

   ```bash
   stripe trigger checkout.session.completed
   ```

## 4. Probar un pago

1. `npm run dev`, agrega productos al carrito y ve a checkout.
2. Tarjeta de prueba: `4242 4242 4242 4242`, fecha futura, CVC cualquiera.
3. El redirect te lleva a `/checkout/exito`. El pago real se confirma en el
   webhook (mira la consola: por ahora solo loguea, con un `// TODO` para
   registrar la orden).

## 5. Producción

- Cambia a llaves **live** (`pk_live` / `sk_live`).
- Crea el webhook en Dashboard → Developers → Webhooks apuntando a
  `https://<dominio>/api/webhooks/stripe`, evento `checkout.session.completed`.
  Copia su signing secret a `STRIPE_WEBHOOK_SECRET` en Vercel.

## Reglas de seguridad

Ver `.claude/rules/stripe.md` y `src/app/api/CLAUDE.md`. En corto: el precio se
calcula en el servidor (nunca se confía en el cliente) y el pago solo es válido
vía webhook con firma verificada.
