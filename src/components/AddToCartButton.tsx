"use client";

import { useCart } from "@/context/CartContext";
import { Product } from "@/lib/products";

export default function AddToCartButton({ product }: { product: Product }) {
  const { addToCart } = useCart();

  return (
    <button
      onClick={(e) => {
        e.stopPropagation();
        addToCart(product);
      }}
      className="mt-auto bg-foreground text-background py-3 rounded-full w-full font-medium hover:opacity-90 transition-opacity"
    >
      Add to Cart
    </button>
  );
}
