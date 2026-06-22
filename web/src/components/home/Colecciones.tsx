import Link from "next/link";
import { ProductGrid } from "@/components/product/ProductGrid";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import type { Collection, Product } from "@/types";

export interface CollectionSection {
  collection: Collection;
  products: Product[];
}

/**
 * Sección de la home que destaca TODAS las colecciones por igual: cada una con
 * su nombre, su tagline y su grid de productos. Recibe los datos ya resueltos.
 */
export function Colecciones({ sections }: { sections: CollectionSection[] }) {
  return (
    <section className="container py-16 md:py-24">
      <div className="mx-auto max-w-2xl text-center">
        <p className="eyebrow">Nuestras colecciones</p>
        <h2 className="mt-4 font-serif text-3xl font-semibold text-brand-ink sm:text-4xl">
          Un ritual para cada momento
        </h2>
        <p className="mt-4 text-muted-foreground">
          Tres familias de aromas: calma para descansar, alegría para encender
          el ánimo y respira profundo para despejar.
        </p>
      </div>

      <div className="mt-12 space-y-16 md:space-y-20">
        {sections.map(({ collection, products }) => (
          <div key={collection.id}>
            <div className="mx-auto max-w-2xl text-center">
              <p className="eyebrow">
                {collection.name.replace("Colección ", "")}
              </p>
              <h3 className="mt-3 font-serif text-2xl font-semibold text-brand-ink sm:text-3xl">
                {collection.tagline}
              </h3>
            </div>
            <div className="mt-8">
              <ProductGrid products={products} />
            </div>
          </div>
        ))}
      </div>

      <div className="mt-12 text-center">
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
