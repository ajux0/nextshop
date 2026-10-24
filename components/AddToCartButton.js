"use client";

import { useState } from "react";
import { useCart } from "./CartProvider";
import { discountedPrice } from "@/lib/api";

export default function AddToCartButton({ product }) {
  const { addItem } = useCart();
  const [added, setAdded] = useState(false);
  const outOfStock = product.stock === 0;

  function handleClick() {
    addItem({
      id: product.id,
      title: product.title,
      thumbnail: product.thumbnail,
      price: discountedPrice(product.price, product.discountPercentage),
    });
    setAdded(true);
    setTimeout(() => setAdded(false), 1500);
  }

  return (
    <button className="btn" onClick={handleClick} disabled={outOfStock}>
      {outOfStock ? "Out of stock" : added ? "Added to cart \u2713" : "Add to cart"}
    </button>
  );
}
