import Link from "next/link";
import Image from "next/image";
import { Instagram } from "lucide-react";
import { CONTACT, NAV_LINKS, SITE } from "@/lib/constants";
import { whatsappUrl } from "@/lib/utils";

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="mt-20 border-t border-border bg-brand-marfil">
      <div className="container grid grid-cols-1 gap-10 py-14 sm:grid-cols-2 lg:grid-cols-4">
        {/* Marca */}
        <div className="sm:col-span-2 lg:col-span-1">
          <div className="flex items-center gap-2">
            <Image
              src="/images/brand/logo.png"
              alt={SITE.name}
              width={40}
              height={40}
              className="h-10 w-10 object-contain"
            />
            <span className="font-serif text-xl font-semibold text-brand-ink">
              Shanti <span className="text-brand-gold">Essence</span>
            </span>
          </div>
          <p className="mt-4 max-w-xs text-sm leading-relaxed text-muted-foreground">
            {SITE.description}
          </p>
        </div>

        {/* Navegación */}
        <div>
          <h4 className="text-sm font-semibold uppercase tracking-wide text-brand-ink">
            Explora
          </h4>
          <ul className="mt-4 space-y-2 text-sm">
            <li>
              <Link href="/" className="text-muted-foreground hover:text-brand-gold">
                Inicio
              </Link>
            </li>
            {NAV_LINKS.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className="text-muted-foreground hover:text-brand-gold"
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Legal */}
        <div>
          <h4 className="text-sm font-semibold uppercase tracking-wide text-brand-ink">
            Información
          </h4>
          <ul className="mt-4 space-y-2 text-sm">
            <li>
              <Link
                href="/contacto"
                className="text-muted-foreground hover:text-brand-gold"
              >
                Contacto
              </Link>
            </li>
            {/* TODO: crear estas páginas legales. */}
            <li>
              <span className="text-muted-foreground">Políticas de envío</span>
            </li>
            <li>
              <span className="text-muted-foreground">Aviso de privacidad</span>
            </li>
          </ul>
        </div>

        {/* Redes */}
        <div>
          <h4 className="text-sm font-semibold uppercase tracking-wide text-brand-ink">
            Síguenos
          </h4>
          <div className="mt-4 flex gap-3">
            <a
              href={CONTACT.instagram}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Instagram"
              className="flex h-11 w-11 items-center justify-center rounded-full border border-border text-brand-ink transition-colors hover:bg-accent"
            >
              <Instagram className="h-5 w-5" />
            </a>
          </div>
          <a
            href={whatsappUrl(CONTACT.whatsapp, CONTACT.whatsappMessage)}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-4 inline-block text-sm text-muted-foreground hover:text-brand-gold"
          >
            WhatsApp
          </a>
        </div>
      </div>

      <div className="border-t border-border">
        <p className="container py-6 text-center text-xs text-muted-foreground">
          © {year} {SITE.name}. Hecho con calma. · {SITE.slogan}
        </p>
      </div>
    </footer>
  );
}
