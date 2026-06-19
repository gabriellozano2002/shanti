import { Hero } from "@/components/home/Hero";
import { Filosofia } from "@/components/home/Filosofia";
import { Beneficios } from "@/components/home/Beneficios";
import { ColeccionCalma } from "@/components/home/ColeccionCalma";
import { Experiencia } from "@/components/home/Experiencia";
import { Testimonios } from "@/components/home/Testimonios";
import { InstagramFeed } from "@/components/home/InstagramFeed";
import { Newsletter } from "@/components/home/Newsletter";
import { getProductsByCollection } from "@/data/products";

export default async function HomePage() {
  const calma = await getProductsByCollection("calma");

  return (
    <>
      <Hero />
      <Filosofia />
      <Beneficios />
      <ColeccionCalma products={calma} />
      <Experiencia />
      <Testimonios />
      <InstagramFeed />
      <Newsletter />
    </>
  );
}
