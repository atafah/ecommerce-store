"use client"; // ← needed because we're using useCart hook

import Link from "next/link";
import { useCart } from "@/context/CartContext";

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
        <Link href="/cart" className="hover:underline">
          Cart ({totalItems}) {/* ← live count */}
        </Link>
      </div>
    </nav>
  );
}
