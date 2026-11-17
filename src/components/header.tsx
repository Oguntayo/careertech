import Link from "next/link";
import { logoutAction } from "@/actions/auth";
import { ActionSubmitButton } from "@/components/action-submit-button";
import { getSession } from "@/lib/session";

export async function Header() {
  const user = await getSession();

  return (
    <header className="sticky top-0 z-20 border-b border-line bg-paper/85 backdrop-blur">
      <div className="wrap flex h-16 items-center justify-between gap-4">
        <Link href="/" className="font-display text-xl font-semibold tracking-tight">
          Career<span className="text-brand">Craft</span>
          <span className="ml-0.5 inline-block size-1.5 rounded-full bg-accent" aria-hidden />
        </Link>

        <nav className="flex items-center gap-1 text-sm font-medium sm:gap-3">
          <Link href="/jobs" className="rounded-full px-3 py-2 hover:bg-brand-soft">
            Jobs
          </Link>
          <Link href="/posts" className="rounded-full px-3 py-2 hover:bg-brand-soft">
            Posts
          </Link>
          {user ? (
            <>
              <Link href="/dashboard" className="btn btn-primary py-2">
                Dashboard
              </Link>
              <form action={logoutAction}>
                <ActionSubmitButton
                  label="Log out"
                  pendingLabel="Logging out…"
                  className="rounded-full px-3 py-2 text-muted hover:text-ink disabled:opacity-60"
                />
              </form>
            </>
          ) : (
            <>
              <Link href="/login" className="rounded-full px-3 py-2 hover:bg-brand-soft">
                Log in
              </Link>
              <Link href="/register" className="btn btn-primary py-2">
                Get started
              </Link>
            </>
          )}
        </nav>
      </div>
    </header>
  );
}
