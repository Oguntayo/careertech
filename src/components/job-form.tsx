"use client";

import { createJobAction } from "@/actions/jobs";
import { Field, FormNotice, SubmitButton } from "@/components/field";
import { useServerForm } from "@/hooks/use-server-form";
import { JOB_TYPES } from "@/lib/job-types";

export function JobForm() {
  const { state, pending, onSubmit } = useServerForm(createJobAction);

  return (
    <form onSubmit={onSubmit} className="card space-y-5 p-6 sm:p-8">
      <Field label="Job title">
        <input name="title" required className="input" placeholder="Backend Engineer" />
      </Field>
      <div className="grid gap-5 sm:grid-cols-2">
        <Field label="Company">
          <input name="company" required className="input" />
        </Field>
        <Field label="Location">
          <input name="location" required className="input" placeholder="Lagos, Nigeria" />
        </Field>
      </div>
      <Field label="Job type">
        <select name="jobType" className="input" defaultValue={JOB_TYPES[0]}>
          {JOB_TYPES.map((type) => (
            <option key={type}>{type}</option>
          ))}
        </select>
      </Field>
      <Field label="Description" hint="Responsibilities, requirements and anything applicants should know.">
        <textarea name="description" required rows={10} className="input" />
      </Field>
      <Field label="Application link (optional)">
        <input name="applyUrl" type="url" className="input" placeholder="https://company.com/careers/role" />
      </Field>
      <Field label="Company logo (optional)" hint="PNG, JPG or WebP, up to 4 MB.">
        <input name="logo" type="file" accept="image/*" className="input" />
      </Field>
      <FormNotice state={state} />
      <SubmitButton pending={pending} label="Publish job" pendingLabel="Publishing…" />
    </form>
  );
}
