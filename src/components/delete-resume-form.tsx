import { deleteResumeAction } from "@/actions/resumes";
import { ActionSubmitButton } from "@/components/action-submit-button";

export function DeleteResumeForm({ id }: { id: string }) {
  return (
    <form action={deleteResumeAction} className="sm:ml-auto">
      <input type="hidden" name="id" value={id} />
      <ActionSubmitButton
        label="Delete"
        pendingLabel="Deleting…"
        className="btn btn-secondary text-red-700 hover:border-red-700"
      />
    </form>
  );
}
