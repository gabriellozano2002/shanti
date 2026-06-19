import Image from "next/image";
import Link from "next/link";
import { formatPrice } from "@/lib/utils";
import { AddToCartButton } from "@/components/cart/AddToCartButton";
import type { Product } from "@/types";

/** Tarjeta de producto. Presentación pura: recibe el producto por props. */
export function ProductCard({ product }: { product: Product }) {
  return (
    <article className="group flex flex-col overflow-hidden rounded-2xl border border-border/70 bg-card transition-shadow hover:shadow-md">
      <Link
        href={`/productos/${product.slug}`}
        className="relative block aspect-square overflow-hidden bg-brand-marfil"
      >
        <Image
          src={product.images[0]}
          alt={product.name}
          fill
          sizes="(max-width: 768px) 50vw, 25vw"
          className="object-cover transition-transform duration-500 group-hover:scale-105"
        />
      </Link>
      <div className="flex flex-1 flex-col p-4">
        <Link href={`/productos/${product.slug}`}>
          <h3 className="font-serif text-lg font-semibold leading-tight text-brand-ink">
            {product.name}
          </h3>
        </Link>
        <p className="mt-1 line-clamp-2 text-sm text-muted-foreground">
          {product.shortDescription}
        </p>
        <div className="mt-3 flex items-center justify-between">
          <span className="font-medium text-brand-ink">
            {formatPrice(product.price, product.currency)}
          </span>
          {product.size && (
            <span className="text-xs text-muted-foreground">{product.size}</span>
          )}
        </div>
        <div className="mt-4 pt-0">
          <AddToCartButton product={product} className="w-full" />
        </div>
      </div>
    </article>
  );
}
