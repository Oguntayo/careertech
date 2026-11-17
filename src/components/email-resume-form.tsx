"use client";

import { emailResumeAction } from "@/actions/resumes";
import { FormNotice } from "@/components/field";
import { useServerForm } from "@/hooks/use-server-form";

export function EmailResumeForm({ id }: { id: string }) {
  const { state, pending, onSubmit } = useServerForm(emailResumeAction);

  return (
    <form onSubmit={onSubmit} className="flex flex-col items-start gap-3">
      <input type="hidden" name="id" value={id} />
      <button type="submit" disabled={pending} className="btn btn-secondary">
        {pending ? "Sending…" : "Email it to me"}
      </button>
      <FormNotice state={state} />
    </form>
  );
}
