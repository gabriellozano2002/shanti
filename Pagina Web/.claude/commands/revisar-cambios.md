---
description: Corre lint + tests + build y resume lo que cambió.
---

Revisión rápida de calidad antes de dar por terminada una tarea.

1. Ejecuta en orden y reporta el resultado de cada uno:
   - `npm run lint`
   - `npm test`
   - `npm run build`
2. Si algo falla, **arréglalo** y vuelve a correr hasta que pase. No reportes
   "listo" con algo en rojo.
3. Resume en pocas líneas:
   - Qué archivos cambiaron y por qué.
   - Si tocaste el carrito, Stripe o el modelo de productos, menciónalo explícito.
   - Cualquier `TODO` o cosa que quedó pendiente.
4. Recordatorios de seguridad: que no se haya filtrado `STRIPE_SECRET_KEY` al
   cliente ni se haya commiteado `.env.local`.
