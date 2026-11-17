import { PageHeader } from "@/components/page-header";
import { ResumeForm } from "@/components/resume-form";
import { getJob } from "@/lib/repositories/jobs";

export const metadata = { title: "New resume" };

// Generation can take a while; platforms with request limits (e.g. Vercel) honour this.
export const maxDuration = 120;

export default async function NewResumePage({ searchParams }: { searchParams: Promise<{ job?: string }> }) {
  const { job: jobId } = await searchParams;
  const job = jobId ? await getJob(jobId) : null;

  return (
    <div className="wrap max-w-4xl pb-8">
      <PageHeader
        title="Create a resume"
        subtitle="Tell us about the job and about you, pick a design, and we will do the writing."
      />
      <ResumeForm
        defaultTitle={job ? `${job.title} at ${job.company}` : ""}
        defaultJobDescription={job ? `${job.title} at ${job.company}\n\n${job.description}` : ""}
      />
    </div>
  );
}
