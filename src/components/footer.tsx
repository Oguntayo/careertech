import Link from "next/link";

export function Footer() {
  return (
    <footer className="mt-24 border-t border-line">
      <div className="wrap flex flex-col items-center justify-between gap-3 py-8 text-sm text-muted sm:flex-row">
        <p>© {new Date().getFullYear()} CareerCraft. Open source under the MIT license.</p>
        <nav className="flex gap-5">
          <Link href="/jobs" className="hover:text-ink">
            Jobs
          </Link>
          <Link href="/posts" className="hover:text-ink">
            Posts
          </Link>
          <Link href="/register" className="hover:text-ink">
            Create account
          </Link>
        </nav>
      </div>
    </footer>
  );
}
