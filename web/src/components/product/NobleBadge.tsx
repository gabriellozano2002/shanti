import { Sparkles } from "lucide-react";
import { cn } from "@/lib/utils";

/**
 * Sello "Esencia Noble" (dorado de marca) para aceites de botánicos raros o
 * preciosos (sándalo, incienso, palo santo…). Comunica exclusividad/rareza sin
 * insinuar que los demás sean de menor calidad. Se coloca en absoluto sobre la
 * esquina de la foto — no altera la imagen original.
 */
export function NobleBadge({ className }: { className?: string }) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1 rounded-full bg-brand-gold px-2.5 py-1 text-[10px] font-semibold uppercase tracking-[0.12em] text-brand-ink shadow-sm ring-1 ring-white/40",
        className,
      )}
    >
      <Sparkles className="h-3 w-3" />
      Esencia Noble
    </span>
  );
}
