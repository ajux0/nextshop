import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import AddToCartButton from "@/components/AddToCartButton";
import { discountedPrice, formatPrice, getProduct, getProducts } from "@/lib/api";

// Pre-render the first page of products at build time. Other IDs render on demand.
export async function generateStaticParams() {
  try {
    const { products } = await getProducts({ page: 1 });
    return products.map((p) => ({ id: String(p.id) }));
  } catch {
    return [];
  }
}

// Dynamic SEO metadata for every product page.
export async function generateMetadata({ params }) {
  const { id } = await params;
  const product = await getProduct(id).catch(() => null);
  if (!product) return { title: "Product not found" };

  return {
    title: product.title,
    description: product.description,
    openGraph: {
      title: product.title,
      description: product.description,
      images: product.thumbnail ? [product.thumbnail] : [],
    },
  };
}

export default async function ProductPage({ params }) {
  const { id } = await params;
  const product = await getProduct(id);
  if (!product) notFound();

  const finalPrice = discountedPrice(product.price, product.discountPercentage);
  const hasDiscount = product.discountPercentage > 1;

  return (
    <article className="product">
      <Link href="/" className="back">
        &larr; Back to products
      </Link>

      <div className="product-layout">
        <div className="product-media">
          <Image
            src={product.images?.[0] ?? product.thumbnail}
            alt={product.title}
            width={600}
            height={600}
            priority
            sizes="(max-width: 800px) 100vw, 50vw"
          />
        </div>

        <div className="product-info">
          <p className="muted small">
            {product.category}
            {product.brand ? ` | ${product.brand}` : ""}
          </p>
          <h1>{product.title}</h1>
          <p className="muted">&#9733; {product.rating} rating</p>

          <p className="price">
            {formatPrice(finalPrice)}
            {hasDiscount && (
              <span className="old-price">{formatPrice(product.price)}</span>
            )}
          </p>

          <p>{product.description}</p>

          <ul className="facts">
            <li>
              <strong>Availability:</strong> {product.availabilityStatus ?? (product.stock > 0 ? "In stock" : "Out of stock")}
            </li>
            {product.shippingInformation && (
              <li>
                <strong>Shipping:</strong> {product.shippingInformation}
              </li>
            )}
            {product.warrantyInformation && (
              <li>
                <strong>Warranty:</strong> {product.warrantyInformation}
              </li>
            )}
            {product.returnPolicy && (
              <li>
                <strong>Returns:</strong> {product.returnPolicy}
              </li>
            )}
          </ul>

          <AddToCartButton product={product} />
        </div>
      </div>

      {product.reviews?.length > 0 && (
        <section className="reviews">
          <h2>Customer reviews</h2>
          {product.reviews.map((r, i) => (
            <div key={i} className="review">
              <p>
                <strong>{r.reviewerName}</strong>{" "}
                <span className="muted small">&#9733; {r.rating}</span>
              </p>
              <p className="muted">{r.comment}</p>
            </div>
          ))}
        </section>
      )}
    </article>
  );
}
