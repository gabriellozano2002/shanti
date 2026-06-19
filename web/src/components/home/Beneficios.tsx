import { HeartHandshake, Leaf, Moon, Sparkles } from "lucide-react";

const BENEFITS = [
  {
    icon: Moon,
    title: "Calma emocional",
    text: "Aromas que serenan la mente y ayudan a soltar la tensión del día.",
  },
  {
    icon: Sparkles,
    title: "Bienestar diario",
    text: "Pequeños rituales que vuelven extraordinario lo cotidiano.",
  },
  {
    icon: Leaf,
    title: "Aromaterapia natural",
    text: "Aceites esenciales 100% naturales, sin aditivos sintéticos.",
  },
  {
    icon: HeartHandshake,
    title: "Autocuidado consciente",
    text: "Un instante para volver a ti, respirar y reconectar.",
  },
];

export function Beneficios() {
  return (
    <section className="bg-brand-marfil py-16 md:py-24">
      <div className="container">
        <div className="mx-auto max-w-2xl text-center">
          <p className="eyebrow">Beneficios</p>
          <h2 className="mt-4 font-serif text-3xl font-semibold text-brand-ink sm:text-4xl">
            Pequeños rituales, grandes cambios
          </h2>
        </div>
        <div className="mt-12 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {BENEFITS.map(({ icon: Icon, title, text }) => (
            <div
              key={title}
              className="rounded-2xl bg-card p-6 text-center shadow-sm"
            >
              <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-brand-lavanda/30">
                <Icon className="h-7 w-7 text-brand-gold" />
              </div>
              <h3 className="mt-4 font-serif text-xl font-semibold text-brand-ink">
                {title}
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                {text}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
