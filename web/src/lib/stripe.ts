/**
 * Cliente de Stripe — SOLO SERVIDOR.
 * Lee STRIPE_SECRET_KEY de env. Este archivo NUNCA debe importarse desde
 * componentes de cliente. Ver .claude/rules/stripe.md y src/app/api/CLAUDE.md.
 */
import Stripe from "stripe";

const secretKey = process.env.STRIPE_SECRET_KEY;

/**
 * Instancia singleton. Es `null` si no hay llave (permite build/dev sin Stripe).
 * Usa `getStripe()` en las rutas para fallar claro si falta la configuración.
 */
export const stripe = secretKey
  ? new Stripe(secretKey, { typescript: true })
  : null;

export function getStripe(): Stripe {
  if (!stripe) {
    throw new Error(
      "Stripe no está configurado: falta STRIPE_SECRET_KEY en el entorno.",
    );
  }
  return stripe;
}
