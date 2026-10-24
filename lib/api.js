// Data layer. All product data comes from the free DummyJSON API (no API key needed).
// These functions run on the server, and responses are cached for an hour (ISR-style).

const BASE = "https://dummyjson.com";
const REVALIDATE = 3600; // seconds

export const PAGE_SIZE = 12;
const USD_TO_INR = 88;

async function request(path) {
  const res = await fetch(`${BASE}${path}`, { next: { revalidate: REVALIDATE } });
  if (res.status === 404) return null;
  if (!res.ok) throw new Error(`Request failed (${res.status}) for ${path}`);
  return res.json();
}

export async function getProducts({ page = 1, category } = {}) {
  const skip = (page - 1) * PAGE_SIZE;
  const base = category
    ? `/products/category/${encodeURIComponent(category)}`
    : "/products";
  const data = await request(`${base}?limit=${PAGE_SIZE}&skip=${skip}`);
  return data ?? { products: [], total: 0 };
}

export async function getProduct(id) {
  return request(`/products/${encodeURIComponent(id)}`);
}

export async function getCategories() {
  const data = await request("/products/categories");
  if (!Array.isArray(data)) return [];
  // The API returns objects ({ slug, name }) - handle plain strings too.
  return data.map((c) =>
    typeof c === "string" ? { slug: c, name: c } : { slug: c.slug, name: c.name }
  );
}

export async function searchProducts(query) {
  const data = await request(`/products/search?q=${encodeURIComponent(query)}&limit=20`);
  return data ?? { products: [], total: 0 };
}

export function formatPrice(usdValue) {
  return new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 0,
  }).format(usdValue * USD_TO_INR);
}

export function discountedPrice(price, discountPercentage = 0) {
  return Math.round(price * (1 - discountPercentage / 100) * 100) / 100;
}
