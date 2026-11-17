import nodemailer from "nodemailer";
import { slugify } from "@/lib/format";

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: { user: process.env.GMAIL_USER, pass: process.env.GMAIL_APP_PASSWORD },
});

export async function sendResumeEmail(to: string, title: string, html: string) {
  await transporter.sendMail({
    from: `CareerCraft <${process.env.GMAIL_USER}>`,
    to,
    subject: `Your resume: ${title}`,
    text:
      "Your tailored resume is attached as an HTML file.\n\n" +
      "Open it in your browser and use Print > Save as PDF to get a PDF copy.",
    attachments: [{ filename: `${slugify(title)}.html`, content: html, contentType: "text/html" }],
  });
}
