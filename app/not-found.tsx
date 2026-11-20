import Link from "next/link";

// Friendly 404 page displayed when a product is not found or an invalid route is visited.
export default function NotFound() {
  return (
    <main className="container">
      <div className="notfound">
        <h1 className="notfound-title">Product not found</h1>
        <p className="notfound-sub">
          We could not find that item. It may have sold out or moved.
        </p>
        <Link href="/" className="back-link">
          ← Back to catalog
        </Link>
      </div>
    </main>
  );
}
