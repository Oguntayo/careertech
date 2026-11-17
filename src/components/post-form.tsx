"use client";

import { createPostAction } from "@/actions/posts";
import { Field, FormNotice, SubmitButton } from "@/components/field";
import { useServerForm } from "@/hooks/use-server-form";

export function PostForm() {
  const { state, pending, onSubmit } = useServerForm(createPostAction);

  return (
    <form onSubmit={onSubmit} className="card space-y-5 p-6 sm:p-8">
      <Field label="Title">
        <input name="title" required className="input" />
      </Field>
      <Field label="Content">
        <textarea name="body" required rows={12} className="input" />
      </Field>
      <Field label="Cover image (optional)" hint="PNG, JPG or WebP, up to 4 MB.">
        <input name="cover" type="file" accept="image/*" className="input" />
      </Field>
      <FormNotice state={state} />
      <SubmitButton pending={pending} label="Publish post" pendingLabel="Publishing…" />
    </form>
  );
}
