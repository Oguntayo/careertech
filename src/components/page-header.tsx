import Link from "next/link";

export function PageHeader({
  title,
  subtitle,
  action,
}: {
  title: string;
  subtitle: string;
  action?: { href: string; label: string };
}) {
  return (
    <div className="flex flex-col justify-between gap-5 pb-10 pt-12 sm:flex-row sm:items-end">
      <div>
        <h1 className="font-display text-4xl font-semibold tracking-tight sm:text-5xl">{title}</h1>
        <p className="mt-3 max-w-xl text-lg text-muted">{subtitle}</p>
      </div>
      {action && (
        <Link href={action.href} className="btn btn-primary shrink-0">
          {action.label}
        </Link>
      )}
    </div>
  );
}

export function EmptyState({
  title,
  text,
  action,
}: {
  title: string;
  text: string;
  action: { href: string; label: string };
}) {
  return (
    <div className="card flex flex-col items-center gap-3 px-6 py-16 text-center">
      <h2 className="font-display text-2xl font-semibold">{title}</h2>
      <p className="max-w-md text-muted">{text}</p>
      <Link href={action.href} className="btn btn-primary mt-2">
        {action.label}
      </Link>
    </div>
  );
}
