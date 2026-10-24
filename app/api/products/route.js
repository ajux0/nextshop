import { searchProducts } from "@/lib/api";

// GET /api/products?q=phone  ->  small JSON payload used by the live search box.
export async function GET(request) {
  const q = new URL(request.url).searchParams.get("q")?.trim() ?? "";

  if (q.length < 2) {
    return Response.json({ products: [] });
  }

  try {
    const data = await searchProducts(q);
    const products = data.products.slice(0, 6).map(({ id, title, thumbnail, price }) => ({
      id,
      title,
      thumbnail,
      price,
    }));
    return Response.json({ products });
  } catch {
    return Response.json({ error: "Search is unavailable right now." }, { status: 502 });
  }
}
