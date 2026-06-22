/**
 * Construye el mensaje de WhatsApp con el pedido del carrito (Modo Catálogo).
 * Pura y testeable: recibe los ítems y los montos ya calculados (en CENTAVOS)
 * y devuelve el texto plano. La URL final se arma con whatsappUrl() de utils.
 */
import type { CartItem } from "@/types";
import { formatPrice } from "@/lib/utils";

export function buildWhatsAppOrderMessage(
  items: CartItem[],
  subtotal: number,
  shipping: number,
  total: number,
): string {
  const lines = items.map(
    (i) => `• ${i.quantity}× ${i.name} — ${formatPrice(i.price * i.quantity)}`,
  );
  const envio = shipping === 0 ? "Gratis" : formatPrice(shipping);

  return [
    "¡Hola Shanti Essence! Quiero hacer este pedido:",
    "",
    ...lines,
    "",
    `Subtotal: ${formatPrice(subtotal)}`,
    `Envío: ${envio}`,
    `Total: ${formatPrice(total)}`,
    "",
    "¡Gracias! Espero su confirmación.",
  ].join("\n");
}
