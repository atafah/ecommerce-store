"use client";

import { useCart } from "@/context/CartContext";
import Link from "next/link";
import { Trash2 } from "lucide-react";

export default function CartPage() {
  const { cartItems, totalItems, updateQuantity, removeItem } = useCart();

  if (cartItems.length === 0) {
    return (
      <div className="px-6 py-24 text-center max-w-md mx-auto">
        <div className="text-5xl mb-6">🛍️</div>
        <h1 className="text-3xl font-medium mb-3">Your cart is empty</h1>
        <p className="text-muted mb-8">
          Looks like you haven&apos;t added anything yet.
        </p>
        <Link
          href="/products"
          className="inline-block bg-foreground text-background px-8 py-4 rounded-full font-medium hover:opacity-90 transition-opacity"
        >
          Browse Products
        </Link>
      </div>
    );
  }

  const totalPrice = cartItems.reduce(
    (sum, item) => sum + item.product.price * item.quantity,
    0,
  );

  return (
    <div className="px-6 md:px-10 py-12 max-w-3xl mx-auto">
      <h1 className="text-4xl font-medium mb-8">
        Your Cart{" "}
        <span className="text-muted text-2xl">({totalItems} items)</span>
      </h1>

      <div className="flex flex-col gap-4 mb-10">
        {cartItems.map((item) => (
          <div
            key={item.product.id}
            className="flex items-center gap-5 bg-card border border-border rounded-2xl p-5"
          >
            <img
              src={item.product.thumbnail}
              alt={item.product.title}
              className="w-24 h-24 object-contain"
            />

            <div className="flex-1">
              <h2 className="font-medium line-clamp-1">{item.product.title}</h2>
              <p className="text-muted text-sm mb-3">${item.product.price}</p>

              <div className="flex items-center gap-2">
                <button
                  onClick={() =>
                    updateQuantity(item.product.id, item.quantity - 1)
                  }
                  disabled={item.quantity === 1}
                  className="w-9 h-9 border border-border rounded-full flex items-center justify-center hover:border-foreground disabled:opacity-30 disabled:hover:border-border transition-colors"
                >
                  −
                </button>
                <span className="w-8 text-center font-medium">
                  {item.quantity}
                </span>
                <button
                  onClick={() =>
                    updateQuantity(item.product.id, item.quantity + 1)
                  }
                  className="w-9 h-9 border border-border rounded-full flex items-center justify-center hover:border-foreground transition-colors"
                >
                  +
                </button>
              </div>
            </div>

            <div className="text-right flex flex-col items-end gap-3">
              <p className="font-semibold text-lg">
                ${(item.product.price * item.quantity).toFixed(2)}
              </p>
              <button
                onClick={() => removeItem(item.product.id)}
                className="text-muted hover:text-accent transition-colors"
                aria-label="Remove item"
              >
                <Trash2 className="w-5 h-5" />
              </button>
            </div>
          </div>
        ))}
      </div>

      <div className="bg-card border border-border rounded-2xl p-7 flex flex-col gap-4">
        <h2 className="text-xl font-medium">Order Summary</h2>
        <div className="flex justify-between text-muted">
          <span>Subtotal ({totalItems} items)</span>
          <span>${totalPrice.toFixed(2)}</span>
        </div>
        <div className="flex justify-between text-muted">
          <span>Shipping</span>
          <span className="text-emerald-600">Free</span>
        </div>
        <div className="border-t border-border pt-4 flex justify-between font-semibold text-lg">
          <span>Total</span>
          <span>${totalPrice.toFixed(2)}</span>
        </div>
        <button className="w-full bg-foreground text-background py-4 rounded-full font-medium hover:opacity-90 transition-opacity mt-2">
          Proceed to Checkout
        </button>
      </div>
    </div>
  );
}
