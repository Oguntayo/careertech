"use client";

import { useFormStatus } from "react-dom";

export function ActionSubmitButton({ label, pendingLabel, className = "btn btn-primary" }: {
  label: string;
  pendingLabel: string;
  className?: string;
}) {
  const { pending } = useFormStatus();
  return (
    <button type="submit" disabled={pending} className={className}>
      {pending ? pendingLabel : label}
    </button>
  );
}
