"use client";

import Link from "next/link";
import { useCart } from "./CartProvider";
import SearchBar from "./SearchBar";

export default function Header() {
  const { count } = useCart();

  return (
    <header className="header">
      <div className="container header-inner">
        <Link href="/" className="logo">
          Next<span>Shop</span>
        </Link>
        <SearchBar />
        <Link href="/cart" className="cart-link" aria-label={`Cart, ${count} items`}>
          Cart
          {count > 0 && <span className="badge">{count}</span>}
        </Link>
      </div>
    </header>
  );
}
