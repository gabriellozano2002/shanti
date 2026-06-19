import Link from "next/link";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export default function NotFound() {
  return (
    <div className="container flex flex-col items-center py-24 text-center">
      <p className="eyebrow">Error 404</p>
      <h1 className="mt-4 font-serif text-5xl font-semibold text-brand-ink">
        Página no encontrada
      </h1>
      <p className="mt-4 max-w-md text-muted-foreground">
        Parece que esta página se perdió en la calma. Volvamos a un lugar
        conocido.
      </p>
      <Link href="/" className={cn(buttonVariants({ size: "lg" }), "mt-8")}>
        Volver al inicio
      </Link>
    </div>
  );
}
