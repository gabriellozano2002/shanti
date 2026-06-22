import { Hero } from "@/components/home/Hero";
import { Filosofia } from "@/components/home/Filosofia";
import { Beneficios } from "@/components/home/Beneficios";
import { Colecciones } from "@/components/home/Colecciones";
import { Experiencia } from "@/components/home/Experiencia";
import { Testimonios } from "@/components/home/Testimonios";
import { InstagramFeed } from "@/components/home/InstagramFeed";
import { Newsletter } from "@/components/home/Newsletter";
import {
  getAvailableCollections,
  getProductsByCollection,
} from "@/data/products";

export default async function HomePage() {
  // Destaca TODAS las colecciones disponibles por igual.
  const collections = await getAvailableCollections();
  const sections = await Promise.all(
    collections.map(async (collection) => ({
      collection,
      products: await getProductsByCollection(collection.id),
    })),
  );

  return (
    <>
      <Hero />
      <Filosofia />
      <Beneficios />
      <Colecciones sections={sections} />
      <Experiencia />
      <Testimonios />
      <InstagramFeed />
      <Newsletter />
    </>
  );
}
