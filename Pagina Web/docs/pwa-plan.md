# Plan PWA (futuro — NO construir todavía)

Objetivo: convertir el sitio en PWA instalable cuando ya haya clientes
recurrentes, **sin rehacer nada**. La arquitectura actual (Next App Router +
`next/image` + assets en `public/`) ya es compatible.

## Cuándo activarlo

Cuando veamos visitas repetidas y/o pedidos de "guardar en pantalla de inicio".
No antes: una PWA mal cacheada genera más soporte que valor en una tienda nueva.

## Qué hará falta (checklist)

1. **Manifest** — `public/manifest.webmanifest`:
   - `name`, `short_name` ("Shanti Essence"), `start_url: "/"`, `display: "standalone"`.
   - `theme_color: "#C8A86B"` (dorado), `background_color: "#F8F6F2"` (marfil).
   - `icons`: 192×192 y 512×512 (normal y `maskable`) en `public/images/icons/`.
   - Enlazarlo desde `metadata` en `app/layout.tsx`.

2. **Íconos** — generar desde `public/images/brand/logo.png` (el loto). Tamaños:
   192, 256, 384, 512. Guardar en `public/images/icons/`.

3. **Service worker** — preferible vía `@ducanh2912/next-pwa` o `next-pwa`
   (compatible con App Router) en vez de escribirlo a mano. Estrategias:
   - HTML/navegación: network-first.
   - Imágenes de producto y assets estáticos: cache-first con expiración.
   - **No** cachear `/api/*` ni nada de Stripe.

4. **Apple / iOS** — `apple-touch-icon`, `apple-mobile-web-app-capable`,
   `apple-mobile-web-app-status-bar-style` en `metadata`.

5. **Offline** — página `/offline` simple de respaldo.

## Cosas a cuidar

- El checkout y los webhooks **nunca** deben servirse desde caché.
- Versionar el SW para invalidar caché en cada release.
- Probar instalación en Android (Chrome) y iOS (Safari) reales — son distintos.

## Más allá de la PWA

App nativa (React Native / Expo) reutilizando la API: fuera de alcance por ahora,
anotado solo como horizonte.
