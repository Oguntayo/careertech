import { redirect } from "next/navigation";
import { loginAction } from "@/actions/auth";
import { AuthForm } from "@/components/auth-form";
import { getSession } from "@/lib/session";

export const metadata = { title: "Log in" };

export default async function LoginPage({ searchParams }: { searchParams: Promise<{ next?: string }> }) {
  if (await getSession()) redirect("/dashboard");
  const { next = "" } = await searchParams;

  return (
    <div className="wrap max-w-md py-16">
      <h1 className="mb-8 font-display text-4xl font-semibold tracking-tight">Welcome back</h1>
      <AuthForm mode="login" action={loginAction} next={next} />
    </div>
  );
}
