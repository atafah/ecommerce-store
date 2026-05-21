"use client";

import Link from "next/link";
import { useCart } from "@/context/CartContext";
import { ShoppingBag } from "lucide-react";

export default function Navbar() {
  const { totalItems } = useCart();

  return (
    <nav className="sticky top-0 z-40 border-b border-border bg-background/80 backdrop-blur-md px-6 md:px-10 py-4 flex justify-between items-center">
      <Link href="/" className="text-2xl font-semibold tracking-tight">
        CASATARA
      </Link>

      <div className="flex gap-8 items-center text-sm">
        <Link
          href="/"
          className="text-muted hover:text-foreground transition-colors"
        >
          Home
        </Link>
        <Link
          href="/products"
          className="text-muted hover:text-foreground transition-colors"
        >
          Products
        </Link>

        <Link href="/cart" className="relative group">
          <ShoppingBag className="w-6 h-6 group-hover:scale-110 transition-transform" />
          {totalItems > 0 && (
            <span className="absolute -top-2 -right-2 bg-accent text-white text-xs font-semibold w-5 h-5 rounded-full flex items-center justify-center">
              {totalItems > 99 ? "99+" : totalItems}
            </span>
          )}
        </Link>
      </div>
    </nav>
  );
}
