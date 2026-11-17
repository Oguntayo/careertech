import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { CompanyLogo } from "@/components/company-logo";
import { formatDate } from "@/lib/format";
import { getJob } from "@/lib/repositories/jobs";

type Props = { params: Promise<{ id: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const job = await getJob((await params).id);
  return { title: job ? `${job.title} at ${job.company}` : "Job not found" };
}

export default async function JobPage({ params }: Props) {
  const job = await getJob((await params).id);
  if (!job) notFound();

  return (
    <div className="wrap max-w-5xl py-12">
      <Link href="/jobs" className="text-sm font-medium text-muted hover:text-ink">
        ← All jobs
      </Link>

      <div className="mt-6 grid gap-8 lg:grid-cols-[1fr_300px]">
        <article>
          <div className="flex items-center gap-4">
            <CompanyLogo name={job.company} url={job.logoUrl} size={56} />
            <p className="text-lg text-muted">{job.company}</p>
          </div>
          <h1 className="mt-5 font-display text-4xl font-semibold tracking-tight sm:text-5xl">{job.title}</h1>
          <div className="mt-4 flex flex-wrap items-center gap-x-3 gap-y-2 text-sm text-muted">
            <span className="rounded-full bg-brand-soft px-3 py-1 font-medium text-brand">{job.jobType}</span>
            <span>{job.location}</span>
            <span aria-hidden>·</span>
            <time dateTime={job.createdAt.toISOString()}>Posted {formatDate(job.createdAt)}</time>
          </div>
          <div className="mt-8 whitespace-pre-line text-lg leading-relaxed">{job.description}</div>
        </article>

        <aside className="card h-fit space-y-3 p-5 lg:sticky lg:top-24">
          {job.applyUrl && (
            <a href={job.applyUrl} target="_blank" rel="noopener noreferrer" className="btn btn-primary w-full">
              Apply on company site
            </a>
          )}
          <Link href={`/dashboard/new?job=${job.id}`} className="btn btn-secondary w-full">
            Tailor my resume to this job
          </Link>
          <p className="text-xs text-muted">
            Tailoring needs a free account. We pre-fill the job description for you.
          </p>
        </aside>
      </div>
    </div>
  );
}
