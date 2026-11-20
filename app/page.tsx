import ProductCard from "./components/ProductCard";
import { products } from "./data/products";

export const metadata = {
  title: "ShipYard: Gear for builders, runners, and explorers",
  description: "Browse sneakers, audio, wearables, and gadgets in the ShipYard catalog.",
};

export default function HomePage() {
  return (
    <main className="container">
      <header className="hero">
        <h1 className="hero-title">ShipYard</h1>
        <p className="hero-sub">Gear for people who build, run, and explore.</p>
      </header>

      <section>
        <div className="section-head">
          <h2 className="section-title">All products</h2>
          <span className="section-count">{products.length} items</span>
        </div>

        {/* A responsive grid: one card per product, with priority on the above-the-fold hero card */}
        <div className="grid">
          {products.map((product, index) => (
            <ProductCard
              key={product.id}
              product={product}
              priority={index === 0}
            />
          ))}
        </div>
      </section>
    </main>
  );
}
