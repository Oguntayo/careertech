import Link from "next/link";
import { EmptyState, PageHeader } from "@/components/page-header";
import { formatDate } from "@/lib/format";
import { listResumes } from "@/lib/repositories/resumes";
import { requireUser } from "@/lib/session";
import { templateLabel } from "@/lib/templates";

export const metadata = { title: "Dashboard" };

export default async function DashboardPage() {
  const user = await requireUser();
  const resumes = await listResumes(user.id);

  return (
    <div className="wrap pb-8">
      <PageHeader
        title="Your dashboard"
        subtitle={`Signed in as ${user.email}`}
        action={{ href: "/dashboard/new", label: "New resume" }}
      />

      <h2 className="mb-4 font-display text-2xl font-semibold">Your resumes</h2>
      {resumes.length === 0 ? (
        <EmptyState
          title="No resumes yet"
          text="Paste a job description and we will tailor your resume to it in a design you choose."
          action={{ href: "/dashboard/new", label: "Create your first resume" }}
        />
      ) : (
        <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {resumes.map((resume) => (
            <li key={resume.id}>
              <Link
                href={`/dashboard/resumes/${resume.id}`}
                className="card block h-full p-5 transition hover:-translate-y-0.5 hover:border-brand/50 hover:shadow-lg hover:shadow-brand/5"
              >
                <h3 className="font-display text-xl leading-snug">{resume.title}</h3>
                <p className="mt-3 text-sm text-muted">
                  {templateLabel(resume.template)} · {formatDate(resume.createdAt)}
                </p>
              </Link>
            </li>
          ))}
        </ul>
      )}

      <div className="mt-14 grid gap-4 sm:grid-cols-2">
        <Link href="/jobs/new" className="card p-6 transition hover:border-brand/50">
          <h3 className="font-display text-xl font-semibold">Post a job</h3>
          <p className="mt-1.5 text-sm text-muted">Hiring? List an opening on the public board.</p>
        </Link>
        <Link href="/posts/new" className="card p-6 transition hover:border-brand/50">
          <h3 className="font-display text-xl font-semibold">Write a post</h3>
          <p className="mt-1.5 text-sm text-muted">Share advice or news with the community.</p>
        </Link>
      </div>
    </div>
  );
}
