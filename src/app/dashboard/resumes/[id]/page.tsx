import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { DeleteResumeForm } from "@/components/delete-resume-form";
import { EmailResumeForm } from "@/components/email-resume-form";
import { formatDate } from "@/lib/format";
import { getResume } from "@/lib/repositories/resumes";
import { requireUser } from "@/lib/session";
import { templateLabel } from "@/lib/templates";

export const metadata: Metadata = { title: "Resume" };

export default async function ResumePage({ params }: { params: Promise<{ id: string }> }) {
  const user = await requireUser();
  const resume = await getResume(user.id, (await params).id);
  if (!resume) notFound();

  const url = `/api/resumes/${resume.id}`;

  return (
    <div className="wrap max-w-4xl py-12">
      <Link href="/dashboard" className="text-sm font-medium text-muted hover:text-ink">
        ← Dashboard
      </Link>
      <h1 className="mt-6 font-display text-4xl font-semibold tracking-tight">{resume.title}</h1>
      <p className="mt-2 text-muted">
        {templateLabel(resume.template)} · {formatDate(resume.createdAt)}
      </p>

      <div className="mt-8 flex flex-wrap items-start gap-3">
        <a href={`${url}?download`} className="btn btn-primary">
          Download
        </a>
        <a href={url} target="_blank" rel="noopener noreferrer" className="btn btn-secondary">
          Open to print or save as PDF
        </a>
        <EmailResumeForm id={resume.id} />
        <DeleteResumeForm id={resume.id} />
      </div>

      <iframe
        src={url}
        title="Resume preview"
        sandbox=""
        className="mt-8 h-[1200px] w-full rounded-2xl border border-line bg-white"
      />
    </div>
  );
}
