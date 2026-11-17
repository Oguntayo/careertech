"use client";

export default function ErrorPage({ reset }: { reset: () => void }) {
  return (
    <div className="wrap flex flex-col items-center py-28 text-center">
      <h1 className="font-display text-4xl font-semibold">Something went wrong</h1>
      <p className="mt-3 max-w-md text-muted">An unexpected error occurred. Please try again.</p>
      <button onClick={reset} className="btn btn-primary mt-6">
        Try again
      </button>
    </div>
  );
}
