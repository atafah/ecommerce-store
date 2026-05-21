import { products } from "@/lib/products";
import ProductsClient from "@/components/ProductsClient";

export default async function ProductsPage({
  searchParams,
}: {
  searchParams: Promise<{ category?: string }>;
}) {
  const { category } = await searchParams;

  // data is bundled with the app — always available, instant, never blocked
  const categories = [...new Set(products.map((p) => p.category))];

  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold mb-6">Products</h1>
      <ProductsClient
        products={products}
        categories={categories}
        initialCategory={category}
      />
    </div>
  );
}
