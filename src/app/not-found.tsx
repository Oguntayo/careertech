import Link from "next/link";

export default function NotFound() {
  return (
    <div className="wrap flex flex-col items-center py-28 text-center">
      <p className="font-display text-7xl font-semibold text-accent">404</p>
      <h1 className="mt-2 font-display text-3xl font-semibold">We could not find that page</h1>
      <Link href="/" className="btn btn-primary mt-6">
        Back to home
      </Link>
    </div>
  );
}
