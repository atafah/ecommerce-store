import Link from "next/link";
import { products } from "@/lib/products";
import StarRating from "@/components/StarRating";

export default function Home() {
  const featured = [...products]
    .sort((a, b) => b.rating - a.rating)
    .slice(0, 4);
  const categories = [...new Set(products.map((p) => p.category))];

  return (
    <main>
      <section className="px-6 md:px-10 py-24 md:py-36 max-w-5xl mx-auto text-center">
        <p className="fade-up text-xs uppercase tracking-[0.25em] text-muted mb-6">
          New Season · 2026 Collection
        </p>
        <h1
          className="fade-up text-5xl md:text-7xl font-medium tracking-tight mb-8 leading-[1.05]"
          style={{ animationDelay: "0.1s" }}
        >
          Everything you need,
          <br />
          <span className="italic text-accent">all in one place.</span>
        </h1>
        <p
          className="fade-up text-lg text-muted mb-12 max-w-xl mx-auto leading-relaxed"
          style={{ animationDelay: "0.2s" }}
        >
          Carefully selected products across electronics, fashion, and jewelry —
          shipped fast and free.
        </p>
        <div
          className="fade-up flex gap-4 justify-center flex-wrap"
          style={{ animationDelay: "0.3s" }}
        >
          <Link
            href="/products"
            className="bg-foreground text-background px-8 py-4 rounded-full font-medium hover:opacity-90 transition-opacity"
          >
            Shop All Products
          </Link>
          <Link
            href="/products"
            className="border border-border px-8 py-4 rounded-full font-medium hover:border-foreground transition-colors"
          >
            Browse Categories
          </Link>
        </div>
      </section>

      <section className="px-6 md:px-10 py-16 max-w-6xl mx-auto">
        <h2 className="text-3xl font-medium mb-8">Shop by Category</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {categories.map((category) => (
            <Link
              key={category}
              href={`/products?category=${category}`}
              className="group border border-border rounded-2xl p-8 text-center capitalize font-medium bg-card hover:border-foreground transition-all hover:-translate-y-1"
            >
              <span className="group-hover:text-accent transition-colors">
                {category}
              </span>
            </Link>
          ))}
        </div>
      </section>

      <section className="px-6 md:px-10 py-16 max-w-6xl mx-auto">
        <div className="flex justify-between items-end mb-8">
          <h2 className="text-3xl font-medium">Featured Products</h2>
          <Link
            href="/products"
            className="text-sm text-muted hover:text-accent transition-colors"
          >
            View all →
          </Link>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {featured.map((product) => (
            <Link
              key={product.id}
              href={`/products/${product.id}`}
              className="group bg-card border border-border rounded-2xl p-5 flex flex-col gap-3 hover:shadow-[0_12px_40px_rgba(0,0,0,0.08)] transition-all duration-300"
            >
              <div className="overflow-hidden rounded-xl">
                <img
                  src={product.thumbnail}
                  alt={product.title}
                  className="w-full h-48 object-contain group-hover:scale-105 transition-transform duration-300"
                />
              </div>
              <h3 className="font-medium text-base line-clamp-2 leading-snug">
                {product.title}
              </h3>
              <StarRating rate={product.rating} />
              <p className="text-muted mt-auto font-medium">${product.price}</p>
            </Link>
          ))}
        </div>
      </section>

      <footer className="border-t border-border mt-16 px-6 md:px-10 py-12 text-center text-muted text-sm">
        <p className="text-xl font-medium text-foreground mb-2">CASATARA</p>
        <p>© 2026 CASATARA. Built with Next.js.</p>
      </footer>
    </main>
  );
}
