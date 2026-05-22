import AddToCartButton from "@/components/AddToCartButton";
import StarRating from "@/components/StarRating";
import { products } from "@/lib/products";
import Link from "next/link";

export default async function ProductDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const product = products.find((p) => p.id === Number(id));

  if (!product) {
    return <div className="p-8 text-accent">Product not found.</div>;
  }

  return (
    <div className="p-6 md:px-10 py-12 max-w-5xl mx-auto">
      <Link
        href="/products"
        className="text-sm text-muted hover:text-foreground inline-flex items-center gap-1 mb-8 transition-colors"
      >
        ← Back to Products
      </Link>

      <div className="grid md:grid-cols-2 gap-12 items-start">
        {/* Image */}
        <div className="bg-card border border-border rounded-3xl p-10 flex items-center justify-center">
          <img
            src={product.thumbnail}
            alt={product.title}
            className="w-full h-80 object-contain"
          />
        </div>

        {/* Details */}
        <div className="pt-2">
          <p className="text-xs uppercase tracking-[0.2em] text-muted mb-3">
            {product.category}
          </p>
          <h1 className="text-4xl font-medium mb-4 leading-tight">
            {product.title}
          </h1>
          <div className="mb-6">
            <StarRating rate={product.rating} />
          </div>
          <p className="text-3xl font-semibold mb-6">${product.price}</p>
          <p className="text-muted leading-relaxed mb-8">
            {product.description}
          </p>
          <AddToCartButton product={product} />
        </div>
      </div>
    </div>
  );
}
