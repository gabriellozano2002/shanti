"use client";

import { useState } from "react";
import { Check, ShoppingBag } from "lucide-react";
import { Button, type ButtonProps } from "@/components/ui/button";
import { useCartStore } from "@/store/cart-store";
import type { Product } from "@/types";

interface Props {
  product: Product;
  className?: string;
  size?: ButtonProps["size"];
}

export function AddToCartButton({ product, className, size }: Props) {
  const addItem = useCartStore((s) => s.addItem);
  const [added, setAdded] = useState(false);

  if (!product.inStock) {
    return (
      <Button disabled variant="secondary" className={className} size={size}>
        Agotado
      </Button>
    );
  }

  function handleAdd() {
    addItem(product, 1);
    setAdded(true);
    setTimeout(() => setAdded(false), 1600);
  }

  return (
    <Button onClick={handleAdd} className={className} size={size}>
      {added ? (
        <>
          <Check className="h-4 w-4" /> Agregado
        </>
      ) : (
        <>
          <ShoppingBag className="h-4 w-4" /> Agregar
        </>
      )}
    </Button>
  );
}
