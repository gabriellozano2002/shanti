import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Check } from "lucide-react";
import {
  getCollection,
  getProductBySlug,
  getProducts,
  getProductsByCollection,
} from "@/data/products";
import { AddToCartButton } from "@/components/cart/AddToCartButton";
import { ProductGrid } from "@/components/product/ProductGrid";
import { NobleBadge } from "@/components/product/NobleBadge";
import { Badge } from "@/components/ui/badge";
import { formatPrice } from "@/lib/utils";

export async function generateStaticParams() {
  const products = await getProducts();
  return products.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: { slug: string };
}): Promise<Metadata> {
  const product = await getProductBySlug(params.slug);
  if (!product) return { title: "Producto no encontrado" };
  return {
    title: product.name,
    description: product.shortDescription,
    openGraph: { images: product.images },
  };
}

export default async function ProductPage({
  params,
}: {
  params: { slug: string };
}) {
  const product = await getProductBySlug(params.slug);
  if (!product) notFound();

  const collection = getCollection(product.collection);
  const related = (await getProductsByCollection(product.collection)).filter(
    (p) => p.id !== product.id,
  );

  return (
    <div className="container py-10 md:py-16">
      <div className="grid gap-8 lg:grid-cols-2 lg:gap-14">
        {/* Galería (por ahora una imagen) */}
        <div className="relative aspect-square w-full overflow-hidden rounded-3xl bg-brand-marfil">
          <Image
            src={product.images[0]}
            alt={product.name}
            fill
            sizes="(max-width: 1024px) 100vw, 50vw"
            className="object-cover"
            priority
          />
          {product.noble && (
            <NobleBadge className="absolute left-4 top-4 z-10 text-xs" />
          )}
        </div>

        {/* Info */}
        <div>
          {collection && (
            <Badge className="bg-brand-lavanda/30">{collection.name}</Badge>
          )}
          <h1 className="mt-3 font-serif text-3xl font-semibold text-brand-ink sm:text-4xl">
            {product.name}
          </h1>
          <div className="mt-3 flex items-center gap-3">
            <span className="text-2xl font-medium text-brand-ink">
              {formatPrice(product.price, product.currency)}
            </span>
            {product.size && (
              <span className="text-sm text-muted-foreground">
                · {product.size}
              </span>
            )}
          </div>

          <p className="mt-5 leading-relaxed text-muted-foreground">
            {product.description}
          </p>

          <div className="mt-6">
            <AddToCartButton product={product} size="lg" className="w-full sm:w-auto" />
          </div>

          {/* Beneficios */}
          {product.benefits.length > 0 && (
            <div className="mt-8">
              <h2 className="font-serif text-xl font-semibold text-brand-ink">
                Beneficios
              </h2>
              <ul className="mt-3 space-y-2">
                {product.benefits.map((b) => (
                  <li key={b} className="flex items-start gap-2 text-sm">
                    <Check className="mt-0.5 h-4 w-4 flex-shrink-0 text-brand-gold" />
                    <span className="text-foreground/90">{b}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Modo de uso */}
          <div className="mt-6">
            <h2 className="font-serif text-xl font-semibold text-brand-ink">
              Modo de uso
            </h2>
            <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
              {product.howToUse}
            </p>
          </div>

          {/* Ingredientes */}
          <div className="mt-6">
            <h2 className="font-serif text-xl font-semibold text-brand-ink">
              Ingredientes
            </h2>
            <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
              {product.ingredients}
            </p>
          </div>
        </div>
      </div>

      {/* Relacionados */}
      {related.length > 0 && (
        <section className="mt-20">
          <div className="flex items-end justify-between">
            <h2 className="font-serif text-2xl font-semibold text-brand-ink">
              También te puede gustar
            </h2>
            <Link
              href="/productos"
              className="text-sm text-brand-gold hover:underline"
            >
              Ver todo
            </Link>
          </div>
          <div className="mt-8">
            <ProductGrid products={related} />
          </div>
        </section>
      )}
    </div>
  );
}
