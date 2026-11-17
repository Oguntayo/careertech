"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { MAX_FILE_BYTES, field, fileField, type FormState } from "@/lib/form";
import { sendResumeEmail } from "@/lib/mailer";
import { generateResume } from "@/lib/openai";
import { createResume, deleteResume, getResume } from "@/lib/repositories/resumes";
import { requireUser } from "@/lib/session";
import { CUSTOM_TEMPLATE_ID, getTemplate } from "@/lib/templates";

const DOCUMENT_TYPES = ["application/pdf", "image/png", "image/jpeg", "image/webp"];
const MAX_TEXT_LENGTH = 15_000;

const isDocument = (file: File) => DOCUMENT_TYPES.includes(file.type) && file.size <= MAX_FILE_BYTES;

export async function generateResumeAction(_: FormState, data: FormData): Promise<FormState> {
  const user = await requireUser();

  const templateId = field(data, "template");
  const title = field(data, "title") || "Tailored resume";
  const jobDescription = field(data, "jobDescription");
  const about = field(data, "about");
  const resume = fileField(data, "resume");
  const design = fileField(data, "design");
  const isCustom = templateId === CUSTOM_TEMPLATE_ID;

  if (!isCustom && !getTemplate(templateId)) return { error: "Choose a template." };
  if (isCustom && !design) return { error: "Upload the resume design you want us to copy." };
  if (!resume && !about) return { error: "Upload your current resume or tell us about yourself." };
  if ((resume && !isDocument(resume)) || (design && !isDocument(design))) {
    return { error: "Files must be a PDF, PNG, JPG or WebP under 4 MB." };
  }
  if (jobDescription.length > MAX_TEXT_LENGTH || about.length > MAX_TEXT_LENGTH) {
    return { error: "The job description and your notes must each be under 15,000 characters." };
  }

  let id: string;
  try {
    const html = await generateResume({
      templateId,
      jobDescription,
      about,
      resume,
      design: isCustom ? design : null,
    });
    ({ id } = await createResume(user.id, { title, template: templateId, html }));
  } catch (error) {
    console.error(error);
    return { error: "We could not generate your resume. Please try again." };
  }

  revalidatePath("/dashboard");
  redirect(`/dashboard/resumes/${id}`);
}

export async function emailResumeAction(_: FormState, data: FormData): Promise<FormState> {
  const user = await requireUser();
  const resume = await getResume(user.id, field(data, "id"));
  if (!resume) return { error: "Resume not found." };

  try {
    await sendResumeEmail(user.email, resume.title, resume.html);
  } catch (error) {
    console.error(error);
    return { error: "We could not send the email. Please try again." };
  }

  return { message: `Sent to ${user.email}.` };
}

export async function deleteResumeAction(data: FormData) {
  const user = await requireUser();
  await deleteResume(user.id, field(data, "id"));
  revalidatePath("/dashboard");
  redirect("/dashboard");
}
