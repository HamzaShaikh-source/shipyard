import type { Metadata } from "next";
import dynamic from "next/dynamic";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getProduct, products } from "../../data/products";

const basePath = process.env.NODE_ENV === "production" ? "/shipyard" : "";

// Reviews ships in its own chunk, fetched only when it renders (lazy loading).
const Reviews = dynamic(() => import("./Reviews"), {
  loading: () => <p className="reviews-loading">Loading reviews…</p>,
});

// Pre-build one static page per product at build time.
export function generateStaticParams() {
  return products.map((product) => ({ id: product.id }));
}

export function generateMetadata({
  params,
}: {
  params: { id: string };
}): Metadata {
  const product = getProduct(params.id);
  if (!product) return { title: "Product not found | ShipYard" };
  return {
    title: `${product.name} | ShipYard`,
    description: product.tagline,
  };
}

export default function ProductPage({ params }: { params: { id: string } }) {
  const product = getProduct(params.id);

  // If the id in the URL does not match a product, show the 404 page.
  if (!product) {
    notFound();
  }

  const imageSrc = product.image.startsWith("/")
    ? `${basePath}${product.image}`
    : product.image;

  return (
    <main className="container">
      <Link href="/" className="back-link">
        ← Back to catalog
      </Link>

      <article className="detail">
        <div className="detail-art">
          {/* Main hero image with explicit dimensions and priority for optimal LCP */}
          <Image
            src={imageSrc}
            alt={product.name}
            width={600}
            height={450}
            className="detail-img"
            priority
          />
        </div>

        <div className="detail-body">
          <span className="card-category">{product.category}</span>
          <h1 className="detail-name">{product.name}</h1>
          <p className="detail-tagline">{product.tagline}</p>
          <span className="detail-price">${product.price}</span>
          <p className="detail-desc">{product.description}</p>

          <h2 className="detail-specs-title">Specs</h2>
          <ul className="detail-specs">
            {product.specs.map((spec) => (
              <li key={spec}>{spec}</li>
            ))}
          </ul>
        </div>
      </article>

      <Reviews productId={product.id} />
    </main>
  );
}
