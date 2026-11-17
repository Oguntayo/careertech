"use client";

import Link from "next/link";
import { Field, FormNotice, SubmitButton } from "@/components/field";
import { useServerForm } from "@/hooks/use-server-form";
import type { FormState } from "@/lib/form";

type Props = {
  mode: "login" | "register";
  action: (state: FormState, data: FormData) => Promise<FormState>;
  next: string;
};

export function AuthForm({ mode, action, next }: Props) {
  const { state, pending, onSubmit } = useServerForm(action);
  const isLogin = mode === "login";
  const query = next ? `?next=${encodeURIComponent(next)}` : "";

  return (
    <form onSubmit={onSubmit} className="card space-y-5 p-6 sm:p-8">
      <input type="hidden" name="next" value={next} />
      <Field label="Email">
        <input name="email" type="email" required autoComplete="email" className="input" />
      </Field>
      <Field label="Password" hint={isLogin ? undefined : "At least 8 characters."}>
        <input
          name="password"
          type="password"
          required
          minLength={isLogin ? undefined : 8}
          autoComplete={isLogin ? "current-password" : "new-password"}
          className="input"
        />
      </Field>
      <FormNotice state={state} />
      <SubmitButton
        pending={pending}
        label={isLogin ? "Log in" : "Create account"}
        pendingLabel={isLogin ? "Logging in…" : "Creating account…"}
      />
      <p className="text-sm text-muted">
        {isLogin ? "New here? " : "Already have an account? "}
        <Link
          href={`${isLogin ? "/register" : "/login"}${query}`}
          className="font-semibold text-brand hover:underline"
        >
          {isLogin ? "Create an account" : "Log in"}
        </Link>
      </p>
    </form>
  );
}
