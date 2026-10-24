"use client";

// Error boundary for the route segment. Must be a Client Component.
export default function Error({ error, reset }) {
  return (
    <div className="state">
      <h1>Something went wrong</h1>
      <p className="muted">{error?.message || "An unexpected error occurred."}</p>
      <button className="btn" onClick={() => reset()}>
        Try again
      </button>
    </div>
  );
}
