import { Product } from "@/lib/products";
import ProductsClient from "@/components/ProductsClient";

async function getProducts(): Promise<Product[]> {
  // try up to 3 times in case the API is flaky
  for (let attempt = 1; attempt <= 3; attempt++) {
    try {
      const res = await fetch("https://fakestoreapi.com/products", {
        cache: "no-store",
        signal: AbortSignal.timeout(8000), // give up after 8 seconds
      });

      if (!res.ok) throw new Error(`API responded with ${res.status}`);

      const text = await res.text();
      if (!text) throw new Error("Empty response body");

      return JSON.parse(text);
    } catch (err) {
      console.error(`Fetch attempt ${attempt} failed:`, err);
      if (attempt === 3) throw err; // out of retries, give up
      await new Promise((r) => setTimeout(r, 1000)); // wait 1s before retry
    }
  }
  return []; // unreachable, but satisfies TypeScript
}

export default async function ProductsPage() {
  const products = await getProducts();

  const categories = [...new Set(products.map((p) => p.category))];

  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold mb-6">Products</h1>
      <ProductsClient products={products} categories={categories} />
    </div>
  );
}
