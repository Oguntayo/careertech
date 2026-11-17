import { JobForm } from "@/components/job-form";
import { PageHeader } from "@/components/page-header";

export const metadata = { title: "Post a job" };

export default function NewJobPage() {
  return (
    <div className="wrap max-w-3xl pb-8">
      <PageHeader title="Post a job" subtitle="Share an opening with everyone on CareerCraft." />
      <JobForm />
    </div>
  );
}
