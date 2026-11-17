"use client";

import { startTransition, useActionState, type FormEvent } from "react";
import type { FormState } from "@/lib/form";

/**
 * Runs a server action from a form without React resetting the inputs when the
 * action returns an error, so users never lose typed text or chosen files.
 */
export function useServerForm(action: (state: FormState, data: FormData) => Promise<FormState>) {
  const [state, dispatch, pending] = useActionState(action, {});

  const onSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    startTransition(() => dispatch(data));
  };

  return { state, pending, onSubmit };
}
