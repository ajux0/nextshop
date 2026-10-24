"use client";

import Link from "next/link";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { formatPrice } from "@/lib/api";

export default function SearchBar() {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);
  const [status, setStatus] = useState("idle"); // idle | loading | done | error
  const [open, setOpen] = useState(false);
  const wrapperRef = useRef(null);

  // Debounced search against our own route handler (/api/products).
  useEffect(() => {
    const q = query.trim();
    if (q.length < 2) {
      setResults([]);
      setStatus("idle");
      return;
    }

    const controller = new AbortController();
    setStatus("loading");

    const timer = setTimeout(async () => {
      try {
        const res = await fetch(`/api/products?q=${encodeURIComponent(q)}`, {
          signal: controller.signal,
        });
        if (!res.ok) throw new Error("Search failed");
        const data = await res.json();
        setResults(data.products ?? []);
        setStatus("done");
      } catch (err) {
        if (err.name !== "AbortError") setStatus("error");
      }
    }, 300);

    return () => {
      clearTimeout(timer);
      controller.abort();
    };
  }, [query]);

  // Close the dropdown when clicking outside.
  useEffect(() => {
    function onClick(e) {
      if (wrapperRef.current && !wrapperRef.current.contains(e.target)) setOpen(false);
    }
    document.addEventListener("mousedown", onClick);
    return () => document.removeEventListener("mousedown", onClick);
  }, []);

  const showPanel = open && query.trim().length >= 2;

  return (
    <div className="search" ref={wrapperRef}>
      <input
        type="search"
        value={query}
        placeholder="Search products..."
        aria-label="Search products"
        onChange={(e) => {
          setQuery(e.target.value);
          setOpen(true);
        }}
        onFocus={() => setOpen(true)}
        onKeyDown={(e) => e.key === "Escape" && setOpen(false)}
      />

      {showPanel && (
        <div className="search-panel" role="listbox">
          {status === "loading" && <p className="search-msg">Searching...</p>}
          {status === "error" && <p className="search-msg">Search is unavailable right now.</p>}
          {status === "done" && results.length === 0 && (
            <p className="search-msg">No products found.</p>
          )}
          {status === "done" &&
            results.map((p) => (
              <Link
                key={p.id}
                href={`/products/${p.id}`}
                className="search-item"
                onClick={() => {
                  setOpen(false);
                  setQuery("");
                }}
              >
                <Image src={p.thumbnail} alt="" width={40} height={40} />
                <span className="search-title">{p.title}</span>
                <span className="search-price">{formatPrice(p.price)}</span>
              </Link>
            ))}
        </div>
      )}
    </div>
  );
}
