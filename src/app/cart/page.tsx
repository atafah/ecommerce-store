"use client";

import { useCart } from "@/context/CartContext";
import Link from "next/link";

export default function CartPage() {
  const { cartItems, totalItems, updateQuantity, removeItem } = useCart(); // ← pull new functions

  if (cartItems.length === 0) {
    return (
      <div className="p-8 text-center">
        <h1 className="text-3xl font-bold mb-4">Your Cart</h1>
        <p className="text-gray-500 mb-6">Your cart is empty.</p>
        <Link
          href="/products"
          className="bg-black text-white px-6 py-3 rounded-xl hover:bg-gray-800"
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
    <div className="p-8 max-w-3xl mx-auto">
      <h1 className="text-3xl font-bold mb-6">
        Your Cart ({totalItems} items)
      </h1>

      <div className="flex flex-col gap-4 mb-8">
        {cartItems.map((item) => (
          <div
            key={item.product.id}
            className="flex items-center gap-4 border rounded-xl p-4"
          >
            <img
              src={item.product.image}
              alt={item.product.title}
              className="w-20 h-20 object-contain"
            />

            <div className="flex-1">
              <h2 className="font-semibold line-clamp-1">
                {item.product.title}
              </h2>
              <p className="text-gray-500">${item.product.price}</p>

              {/* Quantity Controls */}
              <div className="flex items-center gap-3 mt-2">
                <button
                  onClick={() =>
                    updateQuantity(item.product.id, item.quantity - 1)
                  }
                  disabled={item.quantity === 1} // ← can't go below 1
                  className="w-8 h-8 border rounded-lg flex items-center justify-center hover:bg-gray-100 disabled:opacity-40"
                >
                  -
                </button>
                <span>{item.quantity}</span>
                <button
                  onClick={() =>
                    updateQuantity(item.product.id, item.quantity + 1)
                  }
                  className="w-8 h-8 border rounded-lg flex items-center justify-center hover:bg-gray-100"
                >
                  +
                </button>
              </div>
            </div>

            <div className="text-right flex flex-col items-end gap-2">
              <p className="font-semibold">
                ${(item.product.price * item.quantity).toFixed(2)}
              </p>
              {/* Remove Button */}
              <button
                onClick={() => removeItem(item.product.id)}
                className="text-sm text-red-500 hover:underline"
              >
                Remove
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Order Summary */}
      <div className="border rounded-xl p-6 flex flex-col gap-4">
        <h2 className="text-xl font-bold">Order Summary</h2>
        <div className="flex justify-between text-gray-500">
          <span>Subtotal ({totalItems} items)</span>
          <span>${totalPrice.toFixed(2)}</span>
        </div>
        <div className="flex justify-between text-gray-500">
          <span>Shipping</span>
          <span className="text-green-600">Free</span>
        </div>
        <div className="border-t pt-4 flex justify-between font-bold text-lg">
          <span>Total</span>
          <span>${totalPrice.toFixed(2)}</span>
        </div>
        <button className="w-full bg-black text-white py-3 rounded-xl hover:bg-gray-800">
          Proceed to Checkout
        </button>
      </div>
    </div>
  );
}
