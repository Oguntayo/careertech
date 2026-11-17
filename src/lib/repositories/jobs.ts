import { cache } from "react";
import { isUuid, query } from "@/lib/db";
import { PAGE_SIZE, offsetFor, paginate } from "@/lib/pagination";

export type Job = {
  id: string;
  title: string;
  company: string;
  location: string;
  jobType: string;
  description: string;
  applyUrl: string | null;
  logoUrl: string | null;
  createdAt: Date;
};

type NewJob = Omit<Job, "id" | "createdAt">;

const COLUMNS = `id, title, company, location, job_type as "jobType", description,
  apply_url as "applyUrl", logo_url as "logoUrl", created_at as "createdAt"`;

export async function listJobs(page: number, pageSize = PAGE_SIZE) {
  const [items, [{ count }]] = await Promise.all([
    query<Job>(`select ${COLUMNS} from jobs order by created_at desc limit $1 offset $2`, [
      pageSize,
      offsetFor(page, pageSize),
    ]),
    query<{ count: number }>(`select count(*)::int as count from jobs`),
  ]);
  return paginate(items, count, page, pageSize);
}

// Cached per request so a page and its metadata share one query.
export const getJob = cache(async (id: string) => {
  if (!isUuid(id)) return null;
  const [job] = await query<Job>(`select ${COLUMNS} from jobs where id = $1`, [id]);
  return job ?? null;
});

export async function createJob(userId: string, job: NewJob) {
  const [created] = await query<{ id: string }>(
    `insert into jobs (user_id, title, company, location, job_type, description, apply_url, logo_url)
     values ($1, $2, $3, $4, $5, $6, $7, $8) returning id`,
    [userId, job.title, job.company, job.location, job.jobType, job.description, job.applyUrl, job.logoUrl],
  );
  return created;
}
