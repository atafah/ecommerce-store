import Link from "next/link";
import { Product } from "@/lib/products";
import AddToCartButton from "@/components/AddToCartButton"; // ← import
import ProductsClient from "@/components/ProductsClient";
import { cache } from "react";

export default async function ProductsPage() {
  const res = await fetch("https://fakestoreapi.com/products", {
    cache: "no-store",
  });

  if (!res.ok) throw new Error("Failed to fetch products");
  const text = await res.text();
  if (!text) throw new Error("Empty response");
  const products: Product[] = JSON.parse(text);

  // extract unique categories from the products array
  const categories = [...new Set(products.map((p) => p.category))];

  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold mb-6">Products</h1>
      <ProductsClient products={products} categories={categories} />
      {/*
      <div className="grid grid-cols-4 gap-6">
        {products.map((product) => (
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
              <h2 className="font-semibold line-clamp-2">{product.title}</h2>
            </Link>
            <p className="text-gray-500">${product.price}</p>
            <AddToCartButton product={product} />
          </div>
        ))}
      </div>
      */}
    </div>
  );
}
