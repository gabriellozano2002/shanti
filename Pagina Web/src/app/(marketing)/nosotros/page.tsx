import type { Metadata } from "next";
import Image from "next/image";

export const metadata: Metadata = {
  title: "Nosotros",
  description:
    "La historia de Shanti Essence: aceites esenciales 100% naturales para crear rituales de bienestar y conexión interior.",
};

const VALORES = [
  {
    title: "Naturalidad",
    text: "Aceites esenciales 100% naturales, sin aditivos sintéticos.",
  },
  {
    title: "Intención",
    text: "Cada producto está pensado para acompañar un momento de bienestar.",
  },
  {
    title: "Calma",
    text: "Creemos en el poder de bajar el ritmo y volver a uno mismo.",
  },
  {
    title: "Cuidado",
    text: "Atención al detalle en cada aroma, etiqueta y experiencia.",
  },
];

export default function NosotrosPage() {
  return (
    <div className="container py-12 md:py-20">
      {/* Intro */}
      <div className="mx-auto max-w-2xl text-center">
        <p className="eyebrow">Nuestra historia</p>
        <h1 className="mt-4 font-serif text-4xl font-semibold text-brand-ink sm:text-5xl">
          Conecta con tu esencia
        </h1>
        <p className="mt-6 text-lg leading-relaxed text-muted-foreground">
          Shanti Essence nació de la búsqueda de momentos de calma en medio de la
          prisa. Inspirados en la serenidad de un spa frente al mar, creamos
          aceites esenciales 100% naturales que transforman los pequeños
          instantes cotidianos en rituales de bienestar y conexión interior.
        </p>
      </div>

      <div className="relative mx-auto mt-12 aspect-[16/10] w-full max-w-3xl overflow-hidden rounded-3xl shadow-lg shadow-brand-ink/5">
        <Image
          src="/images/brand/flyer.png"
          alt="Shanti Essence — aceites esenciales y bienestar"
          fill
          sizes="(max-width: 768px) 100vw, 768px"
          className="object-cover"
        />
      </div>

      {/* Misión y Visión */}
      <div className="mx-auto mt-16 grid max-w-4xl gap-6 md:grid-cols-2">
        <div className="rounded-2xl border border-border/70 bg-card p-8">
          <h2 className="font-serif text-2xl font-semibold text-brand-ink">
            Misión
          </h2>
          <p className="mt-3 leading-relaxed text-muted-foreground">
            Acompañar a las personas en la creación de rituales de bienestar,
            relajación y conexión, a través de aromas naturales elaborados con
            intención.
          </p>
        </div>
        <div className="rounded-2xl border border-border/70 bg-card p-8">
          <h2 className="font-serif text-2xl font-semibold text-brand-ink">
            Visión
          </h2>
          <p className="mt-3 leading-relaxed text-muted-foreground">
            Ser la marca de aromaterapia de referencia para quienes buscan
            cuidar su bienestar emocional con elegancia, naturalidad y calma.
          </p>
        </div>
      </div>

      {/* Valores */}
      <div className="mx-auto mt-16 max-w-4xl">
        <h2 className="text-center font-serif text-3xl font-semibold text-brand-ink">
          Nuestros valores
        </h2>
        <div className="mt-8 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {VALORES.map((v) => (
            <div
              key={v.title}
              className="rounded-2xl bg-brand-marfil p-6 text-center"
            >
              <h3 className="font-serif text-xl font-semibold text-brand-ink">
                {v.title}
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                {v.text}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
