import Link from "next/link";
import Image from "next/image";
import { discountedPrice, formatPrice } from "@/lib/api";

export default function ProductCard({ product }) {
  const { id, title, thumbnail, price, discountPercentage, rating, category } = product;
  const finalPrice = discountedPrice(price, discountPercentage);

  return (
    <Link href={`/products/${id}`} className="card">
      <div className="card-image">
        <Image
          src={thumbnail}
          alt={title}
          width={300}
          height={300}
          sizes="(max-width: 600px) 50vw, (max-width: 1000px) 33vw, 25vw"
        />
        {discountPercentage > 1 && (
          <span className="tag">-{Math.round(discountPercentage)}%</span>
        )}
      </div>
      <div className="card-body">
        <p className="muted small">{category}</p>
        <h3>{title}</h3>
        <div className="card-meta">
          <strong>{formatPrice(finalPrice)}</strong>
          <span className="muted small">&#9733; {rating}</span>
        </div>
      </div>
    </Link>
  );
}
