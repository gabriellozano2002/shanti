import type { Metadata } from "next";
import Link from "next/link";
import { CheckCircle2 } from "lucide-react";
import { ClearCartOnMount } from "@/components/cart/ClearCartOnMount";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export const metadata: Metadata = {
  title: "¡Gracias por tu compra!",
  robots: { index: false },
};

export default function ExitoPage() {
  return (
    <div className="container flex flex-col items-center py-24 text-center">
      {/* El pago real se confirma vía webhook; aquí solo limpiamos el carrito. */}
      <ClearCartOnMount />
      <CheckCircle2 className="h-16 w-16 text-brand-sage" />
      <h1 className="mt-6 font-serif text-4xl font-semibold text-brand-ink">
        ¡Gracias por tu compra!
      </h1>
      <p className="mt-4 max-w-md text-muted-foreground">
        Tu pedido se está procesando. Te enviaremos la confirmación por correo.
        Que tus rituales de bienestar comiencen. 🌿
      </p>
      <div className="mt-8 flex flex-col gap-3 sm:flex-row">
        <Link href="/productos" className={cn(buttonVariants({ size: "lg" }))}>
          Seguir comprando
        </Link>
        <Link
          href="/"
          className={cn(buttonVariants({ variant: "outline", size: "lg" }))}
        >
          Volver al inicio
        </Link>
      </div>
    </div>
  );
}
