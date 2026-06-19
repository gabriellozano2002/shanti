import type { Metadata } from "next";
import Link from "next/link";
import { XCircle } from "lucide-react";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export const metadata: Metadata = {
  title: "Pago cancelado",
  robots: { index: false },
};

export default function CanceladoPage() {
  return (
    <div className="container flex flex-col items-center py-24 text-center">
      <XCircle className="h-16 w-16 text-muted-foreground" />
      <h1 className="mt-6 font-serif text-4xl font-semibold text-brand-ink">
        Pago cancelado
      </h1>
      <p className="mt-4 max-w-md text-muted-foreground">
        No te preocupes, tu carrito sigue guardado. Puedes retomar la compra
        cuando quieras.
      </p>
      <div className="mt-8 flex flex-col gap-3 sm:flex-row">
        <Link href="/carrito" className={cn(buttonVariants({ size: "lg" }))}>
          Volver al carrito
        </Link>
        <Link
          href="/productos"
          className={cn(buttonVariants({ variant: "outline", size: "lg" }))}
        >
          Seguir explorando
        </Link>
      </div>
    </div>
  );
}
