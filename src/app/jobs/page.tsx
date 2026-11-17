import { notFound } from "next/navigation";
import { JobCard } from "@/components/job-card";
import { EmptyState, PageHeader } from "@/components/page-header";
import { Pagination } from "@/components/pagination";
import { parsePage } from "@/lib/pagination";
import { listJobs } from "@/lib/repositories/jobs";

export const metadata = { title: "Jobs" };

export default async function JobsPage({ searchParams }: { searchParams: Promise<{ page?: string }> }) {
  const page = parsePage((await searchParams).page);
  const { items, pageCount } = await listJobs(page);
  if (page > pageCount) notFound();

  return (
    <div className="wrap pb-8">
      <PageHeader
        title="Open jobs"
        subtitle="Browse roles for free. Create an account to post one or tailor your resume to it."
        action={{ href: "/jobs/new", label: "Post a job" }}
      />
      {items.length === 0 ? (
        <EmptyState
          title="No jobs yet"
          text="Be the first to post an opening."
          action={{ href: "/jobs/new", label: "Post a job" }}
        />
      ) : (
        <>
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {items.map((job) => (
              <JobCard key={job.id} job={job} />
            ))}
          </div>
          <Pagination page={page} pageCount={pageCount} basePath="/jobs" />
        </>
      )}
    </div>
  );
}
