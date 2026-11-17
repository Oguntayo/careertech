import { isUuid, query } from "@/lib/db";

type Resume = {
  id: string;
  title: string;
  template: string;
  html: string;
  createdAt: Date;
};

type ResumeSummary = Omit<Resume, "html">;

const SUMMARY_COLUMNS = `id, title, template, created_at as "createdAt"`;

export const listResumes = (userId: string) =>
  query<ResumeSummary>(
    `select ${SUMMARY_COLUMNS} from resumes where user_id = $1 order by created_at desc`,
    [userId],
  );

export async function getResume(userId: string, id: string) {
  if (!isUuid(id)) return null;
  const [resume] = await query<Resume>(
    `select ${SUMMARY_COLUMNS}, html from resumes where id = $1 and user_id = $2`,
    [id, userId],
  );
  return resume ?? null;
}

export async function createResume(
  userId: string,
  resume: Pick<Resume, "title" | "template" | "html">,
) {
  const [created] = await query<{ id: string }>(
    `insert into resumes (user_id, title, template, html) values ($1, $2, $3, $4) returning id`,
    [userId, resume.title, resume.template, resume.html],
  );
  return created;
}

export async function deleteResume(userId: string, id: string) {
  if (!isUuid(id)) return;
  await query(`delete from resumes where id = $1 and user_id = $2`, [id, userId]);
}
