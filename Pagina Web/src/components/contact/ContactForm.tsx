"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export function ContactForm() {
  const [sent, setSent] = useState(false);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    // TODO: conectar a un endpoint real / servicio de correo (Resend, Formspree…).
    setSent(true);
  }

  if (sent) {
    return (
      <div className="rounded-2xl border border-border bg-card p-8 text-center">
        <p className="font-serif text-2xl text-brand-ink">¡Gracias por escribir!</p>
        <p className="mt-2 text-muted-foreground">
          Te responderemos muy pronto. 🌿
        </p>
      </div>
    );
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="space-y-4 rounded-2xl border border-border bg-card p-6 md:p-8"
    >
      <div>
        <label htmlFor="nombre" className="text-sm font-medium text-brand-ink">
          Nombre
        </label>
        <Input id="nombre" name="nombre" required className="mt-1.5" />
      </div>
      <div>
        <label htmlFor="email" className="text-sm font-medium text-brand-ink">
          Correo
        </label>
        <Input
          id="email"
          name="email"
          type="email"
          required
          className="mt-1.5"
        />
      </div>
      <div>
        <label htmlFor="mensaje" className="text-sm font-medium text-brand-ink">
          Mensaje
        </label>
        <textarea
          id="mensaje"
          name="mensaje"
          required
          rows={4}
          className="mt-1.5 flex w-full rounded-2xl border border-input bg-white px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
        />
      </div>
      <Button type="submit" size="lg" className="w-full">
        Enviar mensaje
      </Button>
    </form>
  );
}
