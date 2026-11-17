"use server";

import { redirect } from "next/navigation";
import { uploadImage } from "@/lib/cloudinary";
import { field, fileField, isImage, type FormState } from "@/lib/form";
import { createPost } from "@/lib/repositories/posts";
import { requireUser } from "@/lib/session";

export async function createPostAction(_: FormState, data: FormData): Promise<FormState> {
  const user = await requireUser();

  const title = field(data, "title");
  const body = field(data, "body");
  const cover = fileField(data, "cover");

  if (!title || !body) return { error: "Please add a title and some content." };
  if (cover && !isImage(cover)) return { error: "The cover must be an image under 4 MB." };

  let id: string;
  try {
    const coverUrl = cover ? await uploadImage(cover, "careercraft/posts") : null;
    ({ id } = await createPost(user.id, { title, body, coverUrl }));
  } catch (error) {
    console.error(error);
    return { error: "We could not publish the post. Please try again." };
  }

  redirect(`/posts/${id}`);
}
