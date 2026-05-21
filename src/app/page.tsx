import Link from "next/link";
import { products } from "@/lib/products";
import StarRating from "@/components/StarRating";

export default function Home() {
  // pick the 4 highest-rated products as "featured"
  const featured = [...products]
    .sort((a, b) => b.rating - a.rating)
    .slice(0, 4);

  // unique categories for the shortcut section
  const categories = [...new Set(products.map((p) => p.category))];

  return (
    <main>
      {/* ==== HERO ==== */}
      <section className="px-8 py-20 md:py-28 max-w-6xl mx-auto text-center">
        <p className="text-sm uppercase tracking-widest text-gray-400 mb-4">
          New Season . 2026 Collection
        </p>
        <h1 className="text-4xl md:text-6xl font-bold tracking-tight mb-6 max-w-3xl mx-auto">
          Everything you need, all in one store.
        </h1>
        <p className="text-lg text-gray-500 mb-10 max-w-xl mx-auto">
          Carefully selected products across electtroniccs, fashion, and jewelry
          - shipped fast and free.
        </p>

        <div className="flex gap-4 justify-center flex-wrap">
          <Link
            href="/products"
            className="bg-black text-white px-8 py-5 rounded-xl font-medium hover:bg-gray-800 transition-colors"
          >
            Shop All Products
          </Link>
          <Link
            href="/products"
            className="border border-gray-300 px-8 py-4 rounded-xl font-medium hover:border-gray-500 transition-colors"
          >
            Browse Categories
          </Link>
        </div>
      </section>

      {/* ==== CATEGORY SHORTCUTS ==== */}
      <section className="px-8 py-12 max-w-6xl mx-auto">
        <h2 className="text-2xl font-bold mb-6">Shop by Category</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {categories.map((category) => (
            <Link
              key={category}
              href={`/products?category=${category}`} // <- include category in URL
              className="border rounded-xl p-6 text-center capitalize font-medium hover:shadow-lg hover:border-black transition-all"
            >
              {category}
            </Link>
          ))}
        </div>
      </section>

      {/* ==== FEATURED PRODUCTS ==== */}
      <section className="px-8 py-12 max-w-6xl mx-auto">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold">Featured Products</h2>
          <Link
            href="/products"
            className="text-gray-500 hover:text-black transition-colors"
          >
            View all →
          </Link>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {featured.map((product) => (
            <Link
              key={product.id}
              href={`/products/${product.id}`}
              className="border rounded-xl p-4 flex flex-col gap-3 hover:shadow-lg transition-shadow"
            >
              <img
                src={product.thumbnail}
                alt={product.title}
                className="w-full h-48 object-contain"
              />
              <h3 className="font-semibold line-clamp-2">{product.title}</h3>
              <StarRating rate={product.rating} />
              <p className="text-gray-500 mt-auto">${product.price}</p>
            </Link>
          ))}
        </div>
      </section>

      {/* ==== FOOTER ==== */}
      <footer className="border-t mt-12 px-8 py-10 text-center text-gray-400 text-sm">
        <p>© 2026 My Store. Built with Next.js.</p>
      </footer>
    </main>
  );
}
