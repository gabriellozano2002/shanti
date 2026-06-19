import type { Metadata } from "next";
import { CheckoutSummary } from "@/components/cart/CheckoutSummary";

export const metadata: Metadata = {
  title: "Finalizar compra",
  robots: { index: false },
};

export default function CheckoutPage() {
  return (
    <div className="container py-12 md:py-16">
      <div className="text-center">
        <h1 className="font-serif text-3xl font-semibold text-brand-ink sm:text-4xl">
          Finalizar compra
        </h1>
        <p className="mt-3 text-muted-foreground">
          Revisa tu orden antes de continuar al pago seguro.
        </p>
      </div>
      <div className="mt-10">
        <CheckoutSummary />
      </div>
    </div>
  );
}
