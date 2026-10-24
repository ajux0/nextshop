import Link from "next/link";

export default function Pagination({ page, totalPages, category }) {
  if (totalPages <= 1) return null;

  const href = (p) => {
    const params = new URLSearchParams();
    if (category) params.set("category", category);
    if (p > 1) params.set("page", String(p));
    const qs = params.toString();
    return qs ? `/?${qs}` : "/";
  };

  return (
    <nav className="pagination" aria-label="Pagination">
      {page > 1 ? (
        <Link className="btn btn-light" href={href(page - 1)}>
          &larr; Previous
        </Link>
      ) : (
        <span />
      )}
      <span className="muted">
        Page {page} of {totalPages}
      </span>
      {page < totalPages ? (
        <Link className="btn btn-light" href={href(page + 1)}>
          Next &rarr;
        </Link>
      ) : (
        <span />
      )}
    </nav>
  );
}
