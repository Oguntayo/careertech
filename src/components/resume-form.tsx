"use client";

import { useState } from "react";
import { generateResumeAction } from "@/actions/resumes";
import { Field, FormNotice, SubmitButton } from "@/components/field";
import { useServerForm } from "@/hooks/use-server-form";
import { CUSTOM_TEMPLATE_ID, TEMPLATES } from "@/lib/templates";

const FILE_TYPES = "application/pdf,image/png,image/jpeg,image/webp";

type Props = { defaultTitle: string; defaultJobDescription: string };

export function ResumeForm({ defaultTitle, defaultJobDescription }: Props) {
  const { state, pending, onSubmit } = useServerForm(generateResumeAction);
  const [template, setTemplate] = useState(TEMPLATES[0].id);

  const optionClass =
    "card flex h-full flex-col p-4 transition peer-checked:border-brand peer-checked:ring-2 peer-checked:ring-brand/30 peer-focus-visible:outline-2 peer-focus-visible:outline-brand";

  return (
    <form onSubmit={onSubmit} className="space-y-8">
      <section className="card space-y-5 p-6 sm:p-8">
        <h2 className="font-display text-2xl font-semibold">1. The job</h2>
        <Field label="Resume name" hint="Only you see this. It labels the resume in your dashboard.">
          <input name="title" defaultValue={defaultTitle} className="input" placeholder="Backend Engineer at Acme" />
        </Field>
        <Field
          label="Job description"
          hint="Paste the full posting. Leave it empty to create a strong general-purpose resume."
        >
          <textarea name="jobDescription" rows={9} defaultValue={defaultJobDescription} className="input" />
        </Field>
      </section>

      <section className="card space-y-5 p-6 sm:p-8">
        <h2 className="font-display text-2xl font-semibold">2. About you</h2>
        <Field label="Your current resume" hint="PDF or image, up to 4 MB. Skip it to build one from scratch.">
          <input name="resume" type="file" accept={FILE_TYPES} className="input" />
        </Field>
        <Field
          label="Anything your resume does not say"
          hint="Projects, skills, achievements, the kind of role you want. We only use what you write here."
        >
          <textarea name="about" rows={6} className="input" />
        </Field>
      </section>

      <section className="card space-y-5 p-6 sm:p-8">
        <h2 className="font-display text-2xl font-semibold">3. The design</h2>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {TEMPLATES.map((option) => (
            <label key={option.id} className="relative cursor-pointer">
              <input
                type="radio"
                name="template"
                value={option.id}
                checked={template === option.id}
                onChange={() => setTemplate(option.id)}
                className="peer sr-only"
              />
              <div className={optionClass}>
                <div className="flex h-14 overflow-hidden rounded-lg border border-line">
                  {option.swatch.map((color) => (
                    <span key={color} className="flex-1" style={{ background: color }} />
                  ))}
                </div>
                <p className="mt-3 font-medium">{option.name}</p>
                <p className="mt-1 text-xs text-muted">{option.description}</p>
              </div>
            </label>
          ))}

          <label className="relative cursor-pointer">
            <input
              type="radio"
              name="template"
              value={CUSTOM_TEMPLATE_ID}
              checked={template === CUSTOM_TEMPLATE_ID}
              onChange={() => setTemplate(CUSTOM_TEMPLATE_ID)}
              className="peer sr-only"
            />
            <div className={optionClass}>
              <div className="flex h-14 items-center justify-center rounded-lg border border-dashed border-brand/50 bg-brand-soft text-2xl text-brand">
                +
              </div>
              <p className="mt-3 font-medium">Use my own design</p>
              <p className="mt-1 text-xs text-muted">Upload a resume and we copy its look.</p>
            </div>
          </label>
        </div>

        {template === CUSTOM_TEMPLATE_ID && (
          <Field label="Resume design to copy" hint="PDF or image. We copy the layout, fonts and colours, not the text.">
            <input name="design" type="file" accept={FILE_TYPES} required className="input" />
          </Field>
        )}
      </section>

      <FormNotice state={state} />
      <SubmitButton pending={pending} label="Generate my resume" pendingLabel="Crafting your resume…" />
      {pending && <p className="text-sm text-muted">This usually takes under a minute. Please keep this page open.</p>}
    </form>
  );
}
