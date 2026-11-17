import Link from "next/link";
import { CompanyLogo } from "@/components/company-logo";
import { formatDate } from "@/lib/format";
import type { Job } from "@/lib/repositories/jobs";

export function JobCard({ job }: { job: Job }) {
  return (
    <Link
      href={`/jobs/${job.id}`}
      className="card group flex flex-col gap-4 p-5 transition hover:-translate-y-0.5 hover:border-brand/50 hover:shadow-lg hover:shadow-brand/5"
    >
      <div className="flex items-center gap-3">
        <CompanyLogo name={job.company} url={job.logoUrl} />
        <p className="truncate text-sm text-muted">{job.company}</p>
      </div>
      <h3 className="font-display text-xl leading-snug group-hover:text-brand">{job.title}</h3>
      <div className="mt-auto flex flex-wrap items-center gap-x-2 gap-y-1.5 text-xs text-muted">
        <span className="rounded-full bg-brand-soft px-2.5 py-1 font-medium text-brand">{job.jobType}</span>
        <span>{job.location}</span>
        <span aria-hidden>·</span>
        <time dateTime={job.createdAt.toISOString()}>{formatDate(job.createdAt)}</time>
      </div>
    </Link>
  );
}
