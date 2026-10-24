"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useCart } from "@/components/CartProvider";
import { formatPrice } from "@/lib/api";

export default function CartPage() {
  const { items, total, count, hydrated, setQty, removeItem, clear } = useCart();
  const [ordered, setOrdered] = useState(false);

  if (!hydrated) {
    return <p className="muted">Loading your cart...</p>;
  }

  if (ordered) {
    return (
      <div className="state">
        <h1>Thank you!</h1>
        <p className="muted">This is a demo store, so no real order was placed.</p>
        <Link className="btn" href="/">
          Continue shopping
        </Link>
      </div>
    );
  }

  if (items.length === 0) {
    return (
      <div className="state">
        <h1>Your cart is empty</h1>
        <p className="muted">Add a few products and they will show up here.</p>
        <Link className="btn" href="/">
          Browse products
        </Link>
      </div>
    );
  }

  return (
    <>
      <h1>Your cart ({count})</h1>
      <div className="cart">
        <ul className="cart-list">
          {items.map((item) => (
            <li key={item.id} className="cart-row">
              <Image src={item.thumbnail} alt={item.title} width={72} height={72} />
              <div className="cart-info">
                <Link href={`/products/${item.id}`}>{item.title}</Link>
                <span className="muted small">{formatPrice(item.price)} each</span>
              </div>
              <div className="qty">
                <button aria-label="Decrease quantity" onClick={() => setQty(item.id, item.qty - 1)}>
                  -
                </button>
                <span>{item.qty}</span>
                <button
                  aria-label="Increase quantity"
                  onClick={() => setQty(item.id, Math.min(item.qty + 1, 10))}
                >
                  +
                </button>
              </div>
              <strong className="line-total">{formatPrice(item.price * item.qty)}</strong>
              <button className="link-btn" onClick={() => removeItem(item.id)}>
                Remove
              </button>
            </li>
          ))}
        </ul>

        <aside className="summary">
          <h2>Order summary</h2>
          <p className="summary-row">
            <span>Items</span>
            <span>{count}</span>
          </p>
          <p className="summary-row total">
            <span>Total</span>
            <span>{formatPrice(total)}</span>
          </p>
          <button
            className="btn"
            onClick={() => {
              clear();
              setOrdered(true);
            }}
          >
            Place order (demo)
          </button>
          <button className="btn btn-light" onClick={clear}>
            Clear cart
          </button>
        </aside>
      </div>
    </>
  );
}
