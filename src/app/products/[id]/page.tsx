import AddToCartButton from "@/components/AddToCartButton";
import { Product } from "@/lib/products";

export default async function ProductDetailPage({
  params,
}: {
  params: Promise<{ id: string }>; // ← changed to Promise
}) {
  const { id } = await params; // ← await it first

  const res = await fetch(`https://fakestoreapi.com/products/${id}`); // ← use id directly

  const text = await res.text();

  if (!text) {
    return <div className="p-8 text-red-500">Product not found.</div>;
  }

  const product: Product = JSON.parse(text);

  return (
    <div className="p-8 max-w-2xl mx-auto">
      <img
        src={product.image}
        alt={product.title}
        className="w-full h-72 object-contain mb-6"
      />
      <p className="text-sm text-gray-400 uppercase mb-2">{product.category}</p>
      <h1 className="text-3xl font-bold mb-2">{product.title}</h1>
      <p className="text-gray-500 mb-4">{product.description}</p>
      <p className="text-2xl font-semibold mb-6">${product.price}</p>
      <AddToCartButton product={product} /> {/* <- replace the plain button */}
    </div>
  );
}
