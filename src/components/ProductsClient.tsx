"use client";

import { useState } from "react";
import Link from "next/link";
import { Product } from "@/lib/products";
import AddToCartButton from "./AddToCartButton";

type Props = {
  products: Product[];
  categories: string[];
};

export default function ProductsClient({ products, categories }: Props) {
  const [selected, setSelected] = useState("all");

  const filtered =
    selected === "all"
      ? products
      : products.filter((p) => p.category === selected);

  return (
    <div>
      {/* Filter Buttons */}
      <div className="flex gap-3 flex-wrap mb-8">
        <button
          onClick={() => setSelected("all")}
          className={`px-4 py-2 rounded-full border transition-colors ${
            selected === "all"
              ? "bg-black text-white border-black"
              : "bg-white text-gray-600 hover:border-gray-400"
          }`}
        >
          All
        </button>

        {categories.map((category) => (
          <button
            key={category}
            onClick={() => setSelected(category)}
            className={`px-4 py-2 rounded-full border capitalize transition-colors ${
              selected === category
                ? "bg-black text-white border-black"
                : "bg-white text-gray-600 hover:border-gray-400"
            }`}
          >
            {category}
          </button>
        ))}
      </div>

      {/* Products Grid */}
      <div className="grid grid-cols-4 gap-6">
        {filtered.map((product) => (
          <div
            key={product.id}
            className="border rounded-xl p-4 flex flex-col gap-3 hover:shadow-lg transition-shadow"
          >
            <Link href={`/products/${product.id}`}>
              <img
                src={product.image}
                alt={product.title}
                className="w-full h-48 object-contain"
              />
              <h2 className="font-semibold line-clamp-2 mt-3">
                {product.title}
              </h2>
            </Link>
            <p className="text-gray-500">${product.price}</p>
            <AddToCartButton product={product} />
          </div>
        ))}
      </div>
    </div>
  );
}
