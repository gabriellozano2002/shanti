import type { Metadata } from "next";
import { Instagram, MessageCircle } from "lucide-react";
import { CONTACT } from "@/lib/constants";
import { whatsappUrl } from "@/lib/utils";

export const metadata: Metadata = {
  title: "Contacto",
  description:
    "Escríbenos por WhatsApp o Instagram. Estamos para acompañarte en tu bienestar.",
};

export default function ContactoPage() {
  const canales = [
    {
      icon: MessageCircle,
      label: "WhatsApp",
      value: "Chatea con nosotros",
      href: whatsappUrl(CONTACT.whatsapp, CONTACT.whatsappMessage),
    },
    {
      icon: Instagram,
      label: "Instagram",
      value: CONTACT.instagramHandle,
      href: CONTACT.instagram,
    },
  ];

  return (
    <div className="container py-12 md:py-20">
      <div className="mx-auto max-w-2xl text-center">
        <p className="eyebrow">Contacto</p>
        <h1 className="mt-4 font-serif text-4xl font-semibold text-brand-ink sm:text-5xl">
          Hablemos
        </h1>
        <p className="mt-4 text-muted-foreground">
          ¿Tienes una duda o quieres saber más? Estamos para acompañarte.
        </p>
      </div>

      <div className="mx-auto mt-12 max-w-md space-y-3">
        {canales.map(({ icon: Icon, label, value, href }) => (
          <a
            key={label}
            href={href}
            target={href.startsWith("http") ? "_blank" : undefined}
            rel={href.startsWith("http") ? "noopener noreferrer" : undefined}
            className="flex items-center gap-4 rounded-2xl border border-border bg-card p-5 transition-colors hover:bg-accent"
          >
            <span className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full bg-brand-lavanda/30 text-brand-gold">
              <Icon className="h-6 w-6" />
            </span>
            <span>
              <span className="block text-sm font-medium text-brand-ink">
                {label}
              </span>
              <span className="block text-sm text-muted-foreground">
                {value}
              </span>
            </span>
          </a>
        ))}
      </div>
    </div>
  );
}
