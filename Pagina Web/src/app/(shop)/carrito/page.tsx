import type { Metadata } from "next";
import { CartView } from "@/components/cart/CartView";

export const metadata: Metadata = {
  title: "Carrito",
  robots: { index: false },
};

export default function CarritoPage() {
  return (
    <div className="container py-12 md:py-16">
      <h1 className="font-serif text-3xl font-semibold text-brand-ink sm:text-4xl">
        Tu carrito
      </h1>
      <div className="mt-8">
        <CartView />
      </div>
    </div>
  );
}
