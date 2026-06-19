"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export function Newsletter() {
  const [email, setEmail] = useState("");
  const [done, setDone] = useState(false);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!email) return;
    // TODO: conectar a un proveedor real (Mailchimp / Resend / Brevo).
    setDone(true);
    setEmail("");
  }

  return (
    <section className="container py-16 md:py-24">
      <div className="mx-auto max-w-xl rounded-3xl bg-brand-lavanda/25 p-8 text-center md:p-12">
        <p className="eyebrow">Comunidad</p>
        <h2 className="mt-4 font-serif text-3xl font-semibold text-brand-ink">
          Únete a nuestra comunidad
        </h2>
        <p className="mt-3 text-muted-foreground">
          Recibe rituales de bienestar, novedades y ofertas especiales.
        </p>

        {done ? (
          <p className="mt-6 font-medium text-brand-ink">
            ¡Gracias! Pronto sabrás de nosotros. 🌿
          </p>
        ) : (
          <form
            onSubmit={handleSubmit}
            className="mx-auto mt-6 flex max-w-md flex-col gap-3 sm:flex-row"
          >
            <Input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="tu@correo.com"
              aria-label="Correo electrónico"
            />
            <Button type="submit" className="sm:flex-shrink-0">
              Suscribirme
            </Button>
          </form>
        )}
      </div>
    </section>
  );
}
