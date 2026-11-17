import { slugify } from "@/lib/format";
import { getResume } from "@/lib/repositories/resumes";
import { getSession } from "@/lib/session";

export async function GET(request: Request, { params }: { params: Promise<{ id: string }> }) {
  const user = await getSession();
  if (!user) return new Response("Unauthorized", { status: 401 });

  const resume = await getResume(user.id, (await params).id);
  if (!resume) return new Response("Not found", { status: 404 });

  const headers: Record<string, string> = {
    "Content-Type": "text/html; charset=utf-8",
    // The HTML is model-generated: never let it run scripts on our origin.
    "Content-Security-Policy": "script-src 'none'; object-src 'none'",
    "X-Content-Type-Options": "nosniff",
  };
  if (new URL(request.url).searchParams.has("download")) {
    headers["Content-Disposition"] = `attachment; filename="${slugify(resume.title)}.html"`;
  }

  return new Response(resume.html, { headers });
}
