"use client";

import { useState } from "react";
import Link from "next/link";
import { Product } from "@/lib/products";
import AddToCartButton from "./AddToCartButton";
import StarRating from "./StarRating";

type Props = {
  products: Product[];
  categories: string[];
  initialCategory?: string;
};

export default function ProductsClient({
  products,
  categories,
  initialCategory,
}: Props) {
  const [selected, setSelected] = useState(initialCategory ?? "all");

  const filtered =
    selected === "all"
      ? products
      : products.filter((p) => p.category === selected);

  // shared classes for the filter pills
  const pill = (isActive: boolean) =>
    `px-5 py-2 rounded-full border text-sm capitalize transition-all ${
      isActive
        ? "bg-foreground text-background border-foreground"
        : "bg-card text-muted border-border hover:border-foreground hover:text-foreground"
    }`;

  return (
    <div>
      {/* Filter Pills */}
      <div className="flex gap-3 flex-wrap mb-10">
        <button
          onClick={() => setSelected("all")}
          className={pill(selected === "all")}
        >
          All
        </button>
        {categories.map((category) => (
          <button
            key={category}
            onClick={() => setSelected(category)}
            className={pill(selected === category)}
          >
            {category}
          </button>
        ))}
      </div>

      {/* Products Grid */}
      {filtered.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-24 text-center">
          <div className="text-5xl mb-4">🛍️</div>
          <h2 className="text-xl font-medium mb-2">No products found</h2>
          <p className="text-muted mb-6">
            There are no products in this category yet.
          </p>
          <button
            onClick={() => setSelected("all")}
            className="bg-foreground text-background px-6 py-3 rounded-full hover:opacity-90 transition-opacity"
          >
            View All Products
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {filtered.map((product) => (
            <div
              key={product.id}
              className="group bg-card border border-border rounded-2xl p-5 flex flex-col gap-3 hover:shadow-[0_12px_40px_rgba(0,0,0,0.08)] transition-all duration-300"
            >
              <Link href={`/products/${product.id}`}>
                <div className="overflow-hidden rounded-xl">
                  <img
                    src={product.thumbnail}
                    alt={product.title}
                    className="w-full h-48 object-contain group-hover:scale-105 transition-transform duration-300"
                  />
                </div>
                <h2 className="font-medium line-clamp-2 mt-4 leading-snug">
                  {product.title}
                </h2>
              </Link>
              <StarRating rate={product.rating} />
              <p className="text-muted font-medium">${product.price}</p>
              <AddToCartButton product={product} />
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
