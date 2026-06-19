import { ProductCard } from "./ProductCard";
import type { Product } from "@/types";

/** Grilla de productos. Mobile-first: 2 columnas en cel, más en pantallas grandes. */
export function ProductGrid({ products }: { products: Product[] }) {
  if (products.length === 0) {
    return (
      <p className="py-12 text-center text-muted-foreground">
        Pronto habrá productos en esta colección.
      </p>
    );
  }

  return (
    <div className="grid grid-cols-2 gap-4 sm:gap-6 md:grid-cols-3 lg:grid-cols-4">
      {products.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  );
}
