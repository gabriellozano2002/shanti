---
description: Despliega el sitio a Vercel (checklist + pasos).
---

Despliegue de SHANTI ESSENCE a **Vercel**.

Antes de desplegar (no continúes si algo falla):

1. `npm run lint`
2. `npm test`
3. `npm run build`

Variables de entorno en Vercel (Project → Settings → Environment Variables),
NUNCA en git:

- `NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY`
- `STRIPE_SECRET_KEY`
- `STRIPE_WEBHOOK_SECRET`
- `NEXT_PUBLIC_SITE_URL` (la URL de producción, ej. `https://shantiessence.com`)

Pasos:

1. Asegúrate de que el repo está en GitHub y conectado al proyecto de Vercel
   (o usa `npx vercel` / `npx vercel --prod` con la CLI).
2. Primer deploy: `npx vercel` (preview). Producción: `npx vercel --prod`.
3. Configura el **webhook de Stripe** en el dashboard apuntando a
   `https://<dominio>/api/webhooks/stripe` y copia el signing secret a
   `STRIPE_WEBHOOK_SECRET` en Vercel.
4. Cambia las llaves de Stripe de test a **live** cuando todo esté validado.
5. Verifica en producción: home, catálogo, agregar al carrito y un checkout de prueba.

Reporta la URL de deploy y cualquier warning del build.
