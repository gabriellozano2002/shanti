import type { Metadata } from "next";
import { CheckoutForm } from "@/components/cart/CheckoutForm";

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
          Ingresa tus datos de envío. El pago lo procesa Stripe de forma segura.
        </p>
      </div>
      <div className="mx-auto mt-10 max-w-4xl">
        <CheckoutForm />
      </div>
    </div>
  );
}
