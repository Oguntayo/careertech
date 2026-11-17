import Link from "next/link";

export function Pagination({
  page,
  pageCount,
  basePath,
}: {
  page: number;
  pageCount: number;
  basePath: string;
}) {
  if (pageCount <= 1) return null;
  const href = (target: number) => (target === 1 ? basePath : `${basePath}?page=${target}`);

  return (
    <nav aria-label="Pagination" className="mt-10 flex items-center justify-between">
      {page > 1 ? (
        <Link href={href(page - 1)} className="btn btn-secondary">
          ← Previous
        </Link>
      ) : (
        <span />
      )}
      <span className="text-sm text-muted">
        Page {page} of {pageCount}
      </span>
      {page < pageCount ? (
        <Link href={href(page + 1)} className="btn btn-secondary">
          Next →
        </Link>
      ) : (
        <span />
      )}
    </nav>
  );
}
