import { MessageCircle } from "lucide-react";
import { CONTACT } from "@/lib/constants";
import { whatsappUrl } from "@/lib/utils";

/** Botón flotante de WhatsApp (mobile-first: la mayoría llega desde el cel). */
export function WhatsAppButton() {
  return (
    <a
      href={whatsappUrl(CONTACT.whatsapp, CONTACT.whatsappMessage)}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Escríbenos por WhatsApp"
      className="fixed bottom-5 right-5 z-50 flex h-14 w-14 items-center justify-center rounded-full bg-[#25D366] text-white shadow-lg shadow-black/15 transition-transform hover:scale-105 active:scale-95"
    >
      <MessageCircle className="h-7 w-7" />
    </a>
  );
}
