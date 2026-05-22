import { products } from "@/lib/products";
import ProductsClient from "@/components/ProductsClient";

export default async function ProductsPage({
  searchParams,
}: {
  searchParams: Promise<{ category?: string }>;
}) {
  const { category } = await searchParams;
  const categories = [...new Set(products.map((p) => p.category))];

  return (
    <div className="px-6 md:px-10 py-12 max-w-6xl mx-auto">
      <h1 className="text-4xl font-medium mb-8">Products</h1>
      <ProductsClient
        products={products}
        categories={categories}
        initialCategory={category}
      />
    </div>
  );
}
