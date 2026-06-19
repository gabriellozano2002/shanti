import Image from "next/image";
import { Instagram } from "lucide-react";
import { CONTACT } from "@/lib/constants";

// TODO: integrar el feed real de Instagram (API o widget). Por ahora, imágenes de marca.
const IMAGES = [
  "/images/products/esencia-lavanda-calma.png",
  "/images/products/esencia-bergamota-calma.png",
  "/images/products/esencia-manzanilla-calma.png",
  "/images/hero/coleccion-calma.png",
];

export function InstagramFeed() {
  return (
    <section className="bg-brand-marfil py-16 md:py-24">
      <div className="container">
        <div className="text-center">
          <p className="eyebrow">Comunidad</p>
          <h2 className="mt-4 font-serif text-3xl font-semibold text-brand-ink sm:text-4xl">
            Síguenos en Instagram
          </h2>
          <a
            href={CONTACT.instagram}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-2 inline-block text-sm font-medium text-brand-gold hover:underline"
          >
            {CONTACT.instagramHandle}
          </a>
        </div>

        <div className="mt-10 grid grid-cols-2 gap-3 sm:grid-cols-4">
          {IMAGES.map((src) => (
            <a
              key={src}
              href={CONTACT.instagram}
              target="_blank"
              rel="noopener noreferrer"
              className="group relative aspect-square overflow-hidden rounded-xl"
            >
              <Image
                src={src}
                alt="Shanti Essence en Instagram"
                fill
                sizes="(max-width: 640px) 50vw, 25vw"
                className="object-cover transition-transform duration-500 group-hover:scale-105"
              />
              <span className="absolute inset-0 flex items-center justify-center bg-brand-ink/0 transition-colors group-hover:bg-brand-ink/30">
                <Instagram className="h-6 w-6 text-white opacity-0 transition-opacity group-hover:opacity-100" />
              </span>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
