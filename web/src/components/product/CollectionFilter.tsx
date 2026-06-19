import Link from "next/link";
import { cn } from "@/lib/utils";
import type { Collection, CollectionId } from "@/types";

interface Props {
  collections: Collection[];
  active?: CollectionId | "todas";
}

/** Filtro por colección para la tienda. Usa search params (?coleccion=). */
export function CollectionFilter({ collections, active = "todas" }: Props) {
  return (
    <div className="flex flex-wrap gap-2">
      <Chip href="/productos" label="Todas" active={active === "todas"} />
      {collections.map((c) => {
        const label = c.name.replace("Colección ", "");
        if (!c.available) {
          return (
            <span
              key={c.id}
              className="cursor-not-allowed rounded-full border border-dashed border-border px-4 py-2 text-sm text-muted-foreground"
              title="Próximamente"
            >
              {label} · pronto
            </span>
          );
        }
        return (
          <Chip
            key={c.id}
            href={`/productos?coleccion=${c.id}`}
            label={label}
            active={active === c.id}
          />
        );
      })}
    </div>
  );
}

function Chip({
  href,
  label,
  active,
}: {
  href: string;
  label: string;
  active: boolean;
}) {
  return (
    <Link
      href={href}
      className={cn(
        "rounded-full border px-4 py-2 text-sm transition-colors",
        active
          ? "border-brand-gold bg-brand-gold/15 text-brand-ink"
          : "border-border text-foreground/80 hover:bg-accent",
      )}
    >
      {label}
    </Link>
  );
}
