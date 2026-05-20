"use client"; // ← needed because we're using useCart hook

import Link from "next/link";
import { useCart } from "@/context/CartContext";
import { ShoppingCart } from "lucide-react";

export default function Navbar() {
  const { totalItems } = useCart();

  return (
    <nav className="border-b px-8 py-4 flex justify-between items-center">
      <Link href="/" className="text-xl font-bold">
        My Store 🛍️
      </Link>

      <div className="flex gap-6">
        <Link href="/" className="hover:underline">
          Home
        </Link>
        <Link href="/products" className="hover:underline">
          Products
        </Link>

        {/* Cart Icon with Badge */}
        <Link href="/cart" className="relative">
          <ShoppingCart className="w-6 h-6" />
          {totalItems > 0 && (
            <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs font-bold w-5 h-5 rounded-full flex items-center justify-center">
              {totalItems > 99 ? "99+" : totalItems}
            </span>
          )}
        </Link>
      </div>
    </nav>
  );
}
