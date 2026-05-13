"use client";

import { createContext, useContext, useState } from "react";
import { Product } from "@/lib/products";

// 1. Define the shape of a cart item
type CartItem = {
  product: Product;
  quantity: number;
};

// 2. Define what the context exposes
type CartContextType = {
  cartItems: CartItem[];
  addToCart: (product: Product) => void;
  updateQuantity: (productId: number, quantity: number) => void;
  removeItem: (productId: number) => void;
  totalItems: number;
};

// 3. Create the context
const CartContext = createContext<CartContextType | null>(null);

// 4. Create the Provider — wraps the app and holds the state
export function CartProvider({ children }: { children: React.ReactNode }) {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);

  function addToCart(product: Product) {
    setCartItems((prev) => {
      const existing = prev.find((item) => item.product.id === product.id);

      if (existing) {
        // product already in cart — increase quantity
        return prev.map((item) =>
          item.product.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item,
        );
      }

      // product not in cart — add it
      return [...prev, { product, quantity: 1 }];
    });
  }

  function updateQuantity(productId: number, quantity: number) {
    setCartItems((prev) =>
      prev.map((item) =>
        item.product.id === productId ? { ...item, quantity } : item,
      ),
    );
  }

  function removeItem(productId: number) {
    setCartItems((prev) =>
      prev.filter((item) => item.product.id !== productId),
    );
  }

  const totalItems = cartItems.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <CartContext.Provider
      value={{ cartItems, addToCart, updateQuantity, removeItem, totalItems }}
    >
      {children}
    </CartContext.Provider>
  );
}

// 5. Custom hook — how components access the cart
export function useCart() {
  const context = useContext(CartContext);
  if (!context) throw new Error("useCart must be used inside CartProvider");
  return context;
}
