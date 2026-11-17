import Link from "next/link";
import { JobCard } from "@/components/job-card";
import { listJobs } from "@/lib/repositories/jobs";

const STEPS = [
  {
    title: "Tell us about you",
    text: "Upload your current resume and add whatever it leaves out: projects, skills, goals.",
  },
  {
    title: "Pick the job",
    text: "Paste any job description, or start from a listing on the board in one click.",
  },
  {
    title: "Get your resume",
    text: "Download it or have it emailed to you, ready to print or save as a PDF.",
  },
];

const FEATURES = [
  {
    title: "Tailored, never invented",
    text: "Your resume is rewritten around the job using only facts you provided. No made-up experience.",
  },
  {
    title: "Your design, or ours",
    text: "Choose a built-in template, or upload a CV you love and we will recreate its look.",
  },
  {
    title: "Open job board and posts",
    text: "Anyone can browse jobs and read posts. Create a free account to publish your own.",
  },
  {
    title: "Yours to keep",
    text: "Every resume is saved to your dashboard, so you can reopen, download or email it later.",
  },
];

function ResumePreview() {
  return (
    <div aria-hidden className="relative mx-auto w-full max-w-sm">
      <div className="absolute -inset-4 -rotate-3 rounded-3xl bg-brand-soft" />
      <div className="card relative overflow-hidden shadow-xl shadow-brand/10">
        <div className="bg-stone-200 px-6 py-5">
          <div className="h-4 w-40 rounded bg-stone-400/70" />
          <div className="mt-2.5 h-2.5 w-28 rounded bg-stone-400/50" />
        </div>
        <div className="space-y-5 p-6">
          {[0, 1, 2].map((section) => (
            <div key={section} className="space-y-2">
              <div className="mx-auto h-3 w-24 rounded bg-stone-200" />
              <div className="h-2 w-full rounded bg-stone-100" />
              <div className="h-2 w-11/12 rounded bg-stone-100" />
              <div className={`h-2 rounded ${section === 1 ? "w-3/4 bg-accent/40" : "w-2/3 bg-stone-100"}`} />
            </div>
          ))}
        </div>
      </div>
      <span className="absolute -right-3 top-24 rotate-3 rounded-full bg-accent px-3 py-1 text-xs font-semibold shadow-md">
        Matches the job
      </span>
    </div>
  );
}

export default async function HomePage() {
  const { items: jobs } = await listJobs(1, 3);

  return (
    <>
      <section className="wrap grid items-center gap-14 py-16 lg:grid-cols-[1.15fr_1fr] lg:py-24">
        <div>
          <p className="mb-5 inline-block rounded-full bg-brand-soft px-3.5 py-1.5 text-sm font-medium text-brand">
            Jobs + AI resume tailoring
          </p>
          <h1 className="font-display text-5xl font-semibold leading-[1.05] tracking-tight sm:text-6xl">
            Find the job. Then make your resume <em className="text-brand">fit it.</em>
          </h1>
          <p className="mt-6 max-w-xl text-lg text-muted">
            Browse open roles, paste any job description, and CareerCraft rewrites your resume to match, in a
            design you pick or one you upload.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Link href="/jobs" className="btn btn-primary">
              Browse jobs
            </Link>
            <Link href="/dashboard/new" className="btn btn-secondary">
              Tailor my resume
            </Link>
          </div>
        </div>
        <ResumePreview />
      </section>

      <section className="wrap py-12">
        <h2 className="font-display text-3xl font-semibold tracking-tight">How it works</h2>
        <ol className="mt-8 grid gap-5 md:grid-cols-3">
          {STEPS.map((step, index) => (
            <li key={step.title} className="card p-6">
              <span className="font-display text-4xl font-semibold text-accent">{index + 1}</span>
              <h3 className="mt-3 text-lg font-semibold">{step.title}</h3>
              <p className="mt-2 text-muted">{step.text}</p>
            </li>
          ))}
        </ol>
      </section>

      {jobs.length > 0 && (
        <section className="wrap py-12">
          <div className="flex items-end justify-between gap-4">
            <h2 className="font-display text-3xl font-semibold tracking-tight">Latest jobs</h2>
            <Link href="/jobs" className="text-sm font-semibold text-brand hover:underline">
              View all jobs →
            </Link>
          </div>
          <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {jobs.map((job) => (
              <JobCard key={job.id} job={job} />
            ))}
          </div>
        </section>
      )}

      <section className="wrap py-12">
        <div className="grid gap-x-10 gap-y-8 sm:grid-cols-2">
          {FEATURES.map((feature) => (
            <div key={feature.title} className="border-l-2 border-accent pl-5">
              <h3 className="font-display text-xl font-semibold">{feature.title}</h3>
              <p className="mt-1.5 text-muted">{feature.text}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="wrap py-12">
        <div className="rounded-3xl bg-brand px-8 py-14 text-center text-white">
          <h2 className="font-display text-3xl font-semibold sm:text-4xl">Ready for a resume that fits?</h2>
          <p className="mx-auto mt-3 max-w-lg text-white/80">
            Create a free account with just an email and password.
          </p>
          <Link href="/register" className="btn mt-7 bg-white text-brand hover:bg-brand-soft">
            Create your account
          </Link>
        </div>
      </section>
    </>
  );
}
