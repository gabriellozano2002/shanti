import { Star } from "lucide-react";

// TODO: reemplazar por testimonios reales (o conectar a reseñas).
const TESTIMONIOS = [
  {
    quote:
      "El aceite de lavanda se volvió parte de mi rutina de noche. Duermo muchísimo mejor.",
    name: "María Fernanda",
    place: "CDMX",
  },
  {
    quote:
      "La calidad y el aroma son increíbles. Se siente una marca hecha con amor.",
    name: "Gabriela R.",
    place: "Guadalajara",
  },
  {
    quote:
      "La bergamota me acompaña en el trabajo. Me ayuda a concentrarme y relajarme.",
    name: "Laura M.",
    place: "Monterrey",
  },
];

export function Testimonios() {
  return (
    <section className="container py-16 md:py-24">
      <div className="mx-auto max-w-2xl text-center">
        <p className="eyebrow">Testimonios</p>
        <h2 className="mt-4 font-serif text-3xl font-semibold text-brand-ink sm:text-4xl">
          Lo que dice nuestra comunidad
        </h2>
      </div>
      <div className="mt-12 grid grid-cols-1 gap-6 md:grid-cols-3">
        {TESTIMONIOS.map((t) => (
          <figure
            key={t.name}
            className="flex flex-col rounded-2xl border border-border/70 bg-card p-6"
          >
            <div className="flex gap-0.5 text-brand-gold">
              {Array.from({ length: 5 }).map((_, i) => (
                <Star key={i} className="h-4 w-4 fill-current" />
              ))}
            </div>
            <blockquote className="mt-4 flex-1 text-sm leading-relaxed text-foreground/90">
              “{t.quote}”
            </blockquote>
            <figcaption className="mt-4 text-sm font-medium text-brand-ink">
              {t.name}
              <span className="font-normal text-muted-foreground"> · {t.place}</span>
            </figcaption>
          </figure>
        ))}
      </div>
    </section>
  );
}
