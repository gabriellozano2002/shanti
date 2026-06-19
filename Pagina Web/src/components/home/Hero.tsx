import Link from "next/link";
import Image from "next/image";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { SITE } from "@/lib/constants";

export function Hero() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-brand-petal/30 via-background to-background">
      <div className="container grid items-center gap-10 py-14 md:py-24 lg:grid-cols-2">
        <div className="animate-fade-in-up text-center lg:text-left">
          <p className="eyebrow">Aromaterapia · Bienestar</p>
          <h1 className="mt-4 font-serif text-4xl font-semibold leading-[1.1] text-brand-ink sm:text-5xl lg:text-6xl">
            {SITE.slogan}
          </h1>
          <p className="mx-auto mt-5 max-w-md text-base leading-relaxed text-muted-foreground lg:mx-0">
            {SITE.description}
          </p>
          <div className="mt-8 flex flex-col items-center gap-3 sm:flex-row sm:justify-center lg:justify-start">
            <Link
              href="/productos"
              className={cn(buttonVariants({ size: "lg" }))}
            >
              Descubrir la colección
            </Link>
            <Link
              href="/nosotros"
              className={cn(buttonVariants({ variant: "outline", size: "lg" }))}
            >
              Conoce la marca
            </Link>
          </div>
        </div>

        <div className="relative mx-auto aspect-square w-full max-w-md overflow-hidden rounded-3xl shadow-lg shadow-brand-ink/5 lg:max-w-none">
          <Image
            src="/images/hero/coleccion-calma.png"
            alt="Colección Calma de Shanti Essence: aceites esenciales de lavanda, bergamota y manzanilla"
            fill
            sizes="(max-width: 1024px) 90vw, 45vw"
            className="object-cover"
            priority
          />
        </div>
      </div>
    </section>
  );
}
