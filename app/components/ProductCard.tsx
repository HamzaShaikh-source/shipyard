import Image from "next/image";
import Link from "next/link";
import type { Product } from "../data/products";

const basePath = process.env.NODE_ENV === "production" ? "/shipyard" : "";

// The card takes one typed product as a prop. TypeScript checks every field.
// Supports an optional priority prop for above-the-fold catalog hero images.
export default function ProductCard({
  product,
  priority = false,
}: {
  product: Product;
  priority?: boolean;
}) {
  const imageSrc = product.image.startsWith("/")
    ? `${basePath}${product.image}`
    : product.image;

  return (
    <Link href={`/products/${product.id}`} className="card">
      <div className="card-art">
        <Image
          src={imageSrc}
          alt={product.name}
          width={460}
          height={345}
          className="card-img"
          sizes="(max-width: 560px) 100vw, 230px"
          priority={priority}
        />
      </div>
      <div className="card-body">
        <span className="card-category">{product.category}</span>
        <h2 className="card-name">{product.name}</h2>
        <p className="card-tagline">{product.tagline}</p>
        <span className="card-price">${product.price}</span>
      </div>
    </Link>
  );
}
