import OpenAI from "openai";
import type { ChatCompletionContentPart } from "openai/resources/chat/completions";
import { CUSTOM_TEMPLATE_ID, getTemplate } from "@/lib/templates";

let client: OpenAI | undefined;
const getClient = () => (client ??= new OpenAI());

const SYSTEM_PROMPT = `You are an expert resume writer and front-end developer.
Produce ONE complete, self-contained HTML document (inline <style>, no JavaScript) containing a polished,
print-ready resume.

Content rules:
- Use ONLY facts found in the candidate's materials. Never invent employers, job titles, dates, metrics,
  qualifications, certifications or skills. If something would help but is missing, leave it out.
- When a job description is provided, tailor the resume to it: write a targeted profile, put the most relevant
  real experience first, mirror the job's keywords only where they truthfully apply, and drop irrelevant items.
- Keep wording concise and specific. Prefer strong verbs. Fix spelling and inconsistencies.

Layout rules:
- A4 pages: include @page { size: A4; margin: 0 } and print-color-adjust: exact. Aim for one to two pages and
  avoid splitting an entry across pages.
- Web fonts may only come from Google Fonts via <link>. Do not use external images or scripts.

Reply with the HTML document only: no markdown fences and no commentary.`;

type ResumeRequest = {
  templateId: string;
  jobDescription: string;
  about: string;
  resume: File | null;
  design: File | null;
};

async function filePart(file: File): Promise<ChatCompletionContentPart> {
  const base64 = Buffer.from(await file.arrayBuffer()).toString("base64");
  if (file.type === "application/pdf") {
    return {
      type: "file",
      file: { filename: file.name, file_data: `data:application/pdf;base64,${base64}` },
    };
  }
  return { type: "image_url", image_url: { url: `data:${file.type};base64,${base64}` } };
}

function extractHtml(output: string) {
  const html = output.replace(/^```(?:html)?\s*/i, "").replace(/\s*```$/, "").trim();
  if (!/<html[\s>]/i.test(html)) throw new Error("The model did not return a resume document");
  return html;
}

export async function generateResume(request: ResumeRequest) {
  const parts: ChatCompletionContentPart[] = [];
  const text = (value: string) => parts.push({ type: "text", text: value });

  text(
    request.jobDescription
      ? `JOB DESCRIPTION:\n${request.jobDescription}`
      : "No job description was provided: write a strong general-purpose resume.",
  );
  if (request.about) text(`ABOUT THE CANDIDATE (written by the candidate):\n${request.about}`);

  if (request.resume) {
    text("The next attachment is the candidate's current resume.");
    parts.push(await filePart(request.resume));
  }

  if (request.templateId === CUSTOM_TEMPLATE_ID && request.design) {
    text(
      "DESIGN: replicate the visual design of the next attachment as closely as you can: layout, fonts " +
        "(use the closest Google Font), colours, header treatment, section headings and spacing. " +
        "Do not copy its text content.",
    );
    parts.push(await filePart(request.design));
  } else {
    text(`DESIGN: ${getTemplate(request.templateId)?.prompt ?? ""}`);
  }

  const completion = await getClient().chat.completions.create({
    model: process.env.OPENAI_MODEL ?? "gpt-4o",
    messages: [
      { role: "system", content: SYSTEM_PROMPT },
      { role: "user", content: parts },
    ],
  });

  return extractHtml(completion.choices[0]?.message.content ?? "");
}
