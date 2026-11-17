"use server";

import { redirect } from "next/navigation";
import { uploadImage } from "@/lib/cloudinary";
import { field, fileField, isHttpUrl, isImage, type FormState } from "@/lib/form";
import { JOB_TYPES } from "@/lib/job-types";
import { createJob } from "@/lib/repositories/jobs";
import { requireUser } from "@/lib/session";

export async function createJobAction(_: FormState, data: FormData): Promise<FormState> {
  const user = await requireUser();

  const title = field(data, "title");
  const company = field(data, "company");
  const location = field(data, "location");
  const jobType = field(data, "jobType");
  const description = field(data, "description");
  const applyUrl = field(data, "applyUrl");
  const logo = fileField(data, "logo");

  if (!title || !company || !location || !description) {
    return { error: "Please fill in every required field." };
  }
  if (!(JOB_TYPES as readonly string[]).includes(jobType)) return { error: "Choose a job type." };
  if (applyUrl && !isHttpUrl(applyUrl)) {
    return { error: "The application link must start with http:// or https://." };
  }
  if (logo && !isImage(logo)) return { error: "The logo must be an image under 4 MB." };

  let id: string;
  try {
    const logoUrl = logo ? await uploadImage(logo, "careercraft/logos") : null;
    ({ id } = await createJob(user.id, {
      title,
      company,
      location,
      jobType,
      description,
      applyUrl: applyUrl || null,
      logoUrl,
    }));
  } catch (error) {
    console.error(error);
    return { error: "We could not save the job. Please try again." };
  }

  redirect(`/jobs/${id}`);
}
