import { getCategories, getProducts, PAGE_SIZE } from "@/lib/api";
import ProductCard from "@/components/ProductCard";
import CategoryFilter from "@/components/CategoryFilter";
import Pagination from "@/components/Pagination";

// Server Component: data is fetched on the server, so the HTML arrives fully rendered (good for SEO).
export default async function HomePage({ searchParams }) {
  const params = await searchParams;
  const page = Math.max(1, Number(params.page) || 1);
  const category = typeof params.category === "string" ? params.category : undefined;

  const [{ products, total }, categories] = await Promise.all([
    getProducts({ page, category }),
    getCategories(),
  ]);

  const totalPages = Math.ceil(total / PAGE_SIZE);
  const activeName = categories.find((c) => c.slug === category)?.name;

  return (
    <>
      <section className="hero">
        <h1>{activeName ? activeName : "Discover great products"}</h1>
        <p className="muted">
          {total} products. Browse by category, search from the header, and add items to your cart.
        </p>
      </section>

      <CategoryFilter categories={categories} active={category} />

      {products.length === 0 ? (
        <p className="empty">No products found for this page.</p>
      ) : (
        <div className="grid">
          {products.map((p) => (
            <ProductCard key={p.id} product={p} />
          ))}
        </div>
      )}

      <Pagination page={page} totalPages={totalPages} category={category} />
    </>
  );
}
