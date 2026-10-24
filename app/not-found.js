import Link from "next/link";

export const metadata = { title: "Page not found" };

export default function NotFound() {
  return (
    <div className="state">
      <h1>404 - Not found</h1>
      <p className="muted">We couldn&apos;t find what you were looking for.</p>
      <Link className="btn" href="/">
        Back to home
      </Link>
    </div>
  );
}
