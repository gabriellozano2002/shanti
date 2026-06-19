import Link from "next/link";

export function Filosofia() {
  return (
    <section className="container py-16 md:py-24">
      <div className="mx-auto max-w-2xl text-center">
        <p className="eyebrow">Nuestra filosofía</p>
        <h2 className="mt-4 font-serif text-3xl font-semibold text-brand-ink sm:text-4xl">
          El bienestar empieza con una respiración profunda
        </h2>
        <p className="mt-6 text-lg leading-relaxed text-muted-foreground">
          Shanti Essence nace para quienes buscan transformar los pequeños
          momentos cotidianos en rituales de bienestar. Nuestros aceites
          esenciales están inspirados en la naturaleza y elaborados con
          intención, para acompañarte en momentos de calma, conexión y
          equilibrio.
        </p>
        <Link
          href="/nosotros"
          className="mt-6 inline-block text-sm font-medium text-brand-gold underline-offset-4 hover:underline"
        >
          Conoce nuestra historia →
        </Link>
      </div>
    </section>
  );
}
