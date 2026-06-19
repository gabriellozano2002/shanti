import Image from "next/image";

export function Experiencia() {
  return (
    <section className="bg-brand-marfil py-16 md:py-24">
      <div className="container grid items-center gap-10 lg:grid-cols-2">
        <div className="relative order-1 aspect-[4/5] w-full overflow-hidden rounded-3xl shadow-lg shadow-brand-ink/5 lg:order-none">
          <Image
            src="/images/products/esencia-lavanda-calma.png"
            alt="Ritual de bienestar con aceite esencial de lavanda"
            fill
            sizes="(max-width: 1024px) 90vw, 45vw"
            className="object-cover"
          />
        </div>
        <div className="text-center lg:text-left">
          <p className="eyebrow">La experiencia Shanti</p>
          <h2 className="mt-4 font-serif text-3xl font-semibold leading-tight text-brand-ink sm:text-4xl">
            Un instante para volver a ti
          </h2>
          <p className="mt-6 text-lg leading-relaxed text-muted-foreground">
            Enciende el difusor, respira hondo y deja que el aroma te lleve a un
            estado de calma. Cada gota es una invitación a bajar el ritmo,
            reconectar con tus sentidos y crear un espacio de paz en tu día.
          </p>
          <p className="mt-4 italic text-brand-ink/80">
            “El bienestar comienza con una respiración profunda, un aroma que
            inspira y un instante para volver a ti.”
          </p>
        </div>
      </div>
    </section>
  );
}
