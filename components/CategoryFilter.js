import Link from "next/link";

export default function CategoryFilter({ categories, active }) {
  return (
    <nav className="chips" aria-label="Categories">
      <Link href="/" className={`chip ${!active ? "chip-active" : ""}`}>
        All
      </Link>
      {categories.slice(0, 12).map((c) => (
        <Link
          key={c.slug}
          href={`/?category=${encodeURIComponent(c.slug)}`}
          className={`chip ${active === c.slug ? "chip-active" : ""}`}
        >
          {c.name}
        </Link>
      ))}
    </nav>
  );
}
