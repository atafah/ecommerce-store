"use client";

import { useCart } from "@/context/CartContext";
import { Product } from "@/lib/products";

export default function AddToCartButton({ product }: { product: Product }) {
  const { addToCart } = useCart();

  return (
    <button
      onClick={(e) => {
        e.stopPropagation(); // ← this must be here
        addToCart(product);
      }}
      className="mt-auto bg-black text-white py-2 rounded-lg hover:bg-gray-800 w-full"
    >
      Add to Cart
    </button>
  );
}
