import { redirect } from "next/navigation";
import { registerAction } from "@/actions/auth";
import { AuthForm } from "@/components/auth-form";
import { getSession } from "@/lib/session";

export const metadata = { title: "Create account" };

export default async function RegisterPage({ searchParams }: { searchParams: Promise<{ next?: string }> }) {
  if (await getSession()) redirect("/dashboard");
  const { next = "" } = await searchParams;

  return (
    <div className="wrap max-w-md py-16">
      <h1 className="mb-2 font-display text-4xl font-semibold tracking-tight">Create your account</h1>
      <p className="mb-8 text-muted">Just an email and a password. Free, and it takes a few seconds.</p>
      <AuthForm mode="register" action={registerAction} next={next} />
    </div>
  );
}
