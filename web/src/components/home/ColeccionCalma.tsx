import Link from "next/link";
import { ProductGrid } from "@/components/product/ProductGrid";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import type { Product } from "@/types";

/** Sección de la home con los productos de la Colección Calma. */
export function ColeccionCalma({ products }: { products: Product[] }) {
  return (
    <section className="container py-16 md:py-24">
      <div className="mx-auto max-w-2xl text-center">
        <p className="eyebrow">Colección Calma</p>
        <h2 className="mt-4 font-serif text-3xl font-semibold text-brand-ink sm:text-4xl">
          Para soltar, respirar y volver a ti
        </h2>
        <p className="mt-4 text-muted-foreground">
          Aromas suaves que invitan al descanso y la serenidad.
        </p>
      </div>

      <div className="mt-12">
        <ProductGrid products={products} />
      </div>

      <div className="mt-10 text-center">
        <Link
          href="/productos"
          className={cn(buttonVariants({ variant: "outline", size: "lg" }))}
        >
          Ver toda la tienda
        </Link>
      </div>
    </section>
  );
}
