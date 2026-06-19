"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Menu, ShoppingBag, X } from "lucide-react";
import { useCartStore } from "@/store/cart-store";
import { NAV_LINKS, SITE } from "@/lib/constants";
import { cn } from "@/lib/utils";

export function Navbar() {
  const [open, setOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  const count = useCartStore((s) => s.getItemCount());

  // Evita desajuste de hidratación: el contador solo se muestra ya montado.
  useEffect(() => setMounted(true), []);

  return (
    <header className="sticky top-0 z-40 border-b border-border/60 bg-background/80 backdrop-blur-md">
      <nav className="container flex h-16 items-center justify-between gap-4">
        <Link
          href="/"
          className="flex items-center gap-2"
          onClick={() => setOpen(false)}
        >
          <Image
            src="/images/brand/logo.png"
            alt={SITE.name}
            width={40}
            height={40}
            className="h-10 w-10 object-contain"
            priority
          />
          <span className="font-serif text-xl font-semibold tracking-wide text-brand-ink">
            Shanti <span className="text-brand-gold">Essence</span>
          </span>
        </Link>

        {/* Links escritorio */}
        <ul className="hidden items-center gap-8 md:flex">
          {NAV_LINKS.map((link) => (
            <li key={link.href}>
              <Link
                href={link.href}
                className="text-sm tracking-wide text-foreground/80 transition-colors hover:text-brand-gold"
              >
                {link.label}
              </Link>
            </li>
          ))}
        </ul>

        <div className="flex items-center gap-1">
          <Link
            href="/carrito"
            aria-label="Ver carrito"
            className="relative flex h-11 w-11 items-center justify-center rounded-full transition-colors hover:bg-accent"
          >
            <ShoppingBag className="h-5 w-5" />
            {mounted && count > 0 && (
              <span className="absolute right-1 top-1 flex h-5 min-w-5 items-center justify-center rounded-full bg-brand-gold px-1 text-[11px] font-semibold text-primary-foreground">
                {count}
              </span>
            )}
          </Link>

          {/* Botón menú móvil */}
          <button
            type="button"
            aria-label={open ? "Cerrar menú" : "Abrir menú"}
            aria-expanded={open}
            onClick={() => setOpen((v) => !v)}
            className="flex h-11 w-11 items-center justify-center rounded-full transition-colors hover:bg-accent md:hidden"
          >
            {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </nav>

      {/* Menú móvil desplegable */}
      <div
        className={cn(
          "overflow-hidden border-t border-border/60 md:hidden",
          open ? "max-h-72" : "max-h-0",
          "transition-[max-height] duration-300 ease-out",
        )}
      >
        <ul className="container flex flex-col gap-1 py-3">
          {NAV_LINKS.map((link) => (
            <li key={link.href}>
              <Link
                href={link.href}
                onClick={() => setOpen(false)}
                className="block rounded-xl px-3 py-3 text-base text-foreground/90 transition-colors hover:bg-accent"
              >
                {link.label}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </header>
  );
}
