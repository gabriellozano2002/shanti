import type { Metadata } from "next";
import {
  getCollections,
  getProducts,
  getProductsByCollection,
} from "@/data/products";
import { ProductGrid } from "@/components/product/ProductGrid";
import { CollectionFilter } from "@/components/product/CollectionFilter";
import type { CollectionId } from "@/types";

export const metadata: Metadata = {
  title: "Tienda",
  description:
    "Descubre nuestros aceites esenciales 100% naturales: Colecciones Calma, Alegría y Respira Profundo.",
};

export default async function ProductosPage({
  searchParams,
}: {
  searchParams: { coleccion?: string };
}) {
  const collections = await getCollections();
  const requested = collections.find(
    (c) => c.id === searchParams.coleccion && c.available,
  );
  const products = requested
    ? await getProductsByCollection(requested.id as CollectionId)
    : await getProducts();

  return (
    <div className="container py-12 md:py-16">
      <header className="mx-auto max-w-2xl text-center">
        <p className="eyebrow">Tienda</p>
        <h1 className="mt-4 font-serif text-4xl font-semibold text-brand-ink sm:text-5xl">
          Nuestros aceites esenciales
        </h1>
        <p className="mt-4 text-muted-foreground">
          100% naturales, elaborados con intención para tus rituales de bienestar.
        </p>
      </header>

      <div className="mt-8 flex justify-center">
        <CollectionFilter
          collections={collections}
          active={requested ? (requested.id as CollectionId) : "todas"}
        />
      </div>

      <div className="mt-10">
        <ProductGrid products={products} />
      </div>
    </div>
  );
}
