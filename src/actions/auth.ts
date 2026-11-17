"use server";

import bcrypt from "bcryptjs";
import { redirect } from "next/navigation";
import { field, type FormState } from "@/lib/form";
import { createUser, findUserByEmail } from "@/lib/repositories/users";
import { createSession, destroySession } from "@/lib/session";

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const UNIQUE_VIOLATION = "23505";

/** Only allow redirects to paths inside this app. */
function safeNext(value: string) {
  return value.startsWith("/") && !value.startsWith("//") ? value : "/dashboard";
}

export async function registerAction(_: FormState, data: FormData): Promise<FormState> {
  const email = field(data, "email").toLowerCase();
  const password = String(data.get("password") ?? "");

  if (!EMAIL_PATTERN.test(email)) return { error: "Enter a valid email address." };
  if (password.length < 8 || password.length > 72) {
    return { error: "Password must be between 8 and 72 characters." };
  }

  let user;
  try {
    user = await createUser(email, await bcrypt.hash(password, 12));
  } catch (error) {
    if ((error as { code?: string }).code === UNIQUE_VIOLATION) {
      return { error: "An account with this email already exists." };
    }
    throw error;
  }

  await createSession(user);
  redirect(safeNext(field(data, "next")));
}

export async function loginAction(_: FormState, data: FormData): Promise<FormState> {
  const email = field(data, "email").toLowerCase();
  const password = String(data.get("password") ?? "");

  const user = await findUserByEmail(email);
  if (!user || !(await bcrypt.compare(password, user.passwordHash))) {
    return { error: "Incorrect email or password." };
  }

  await createSession({ id: user.id, email: user.email });
  redirect(safeNext(field(data, "next")));
}

export async function logoutAction() {
  await destroySession();
  redirect("/");
}
