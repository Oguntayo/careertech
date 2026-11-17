import { cache } from "react";
import { isUuid, query } from "@/lib/db";
import { PAGE_SIZE, offsetFor, paginate } from "@/lib/pagination";

export type Post = {
  id: string;
  title: string;
  body: string;
  coverUrl: string | null;
  createdAt: Date;
};

type NewPost = Omit<Post, "id" | "createdAt">;

const COLUMNS = `id, title, body, cover_url as "coverUrl", created_at as "createdAt"`;

export async function listPosts(page: number, pageSize = PAGE_SIZE) {
  const [items, [{ count }]] = await Promise.all([
    query<Post>(`select ${COLUMNS} from posts order by created_at desc limit $1 offset $2`, [
      pageSize,
      offsetFor(page, pageSize),
    ]),
    query<{ count: number }>(`select count(*)::int as count from posts`),
  ]);
  return paginate(items, count, page, pageSize);
}

// Cached per request so a page and its metadata share one query.
export const getPost = cache(async (id: string) => {
  if (!isUuid(id)) return null;
  const [post] = await query<Post>(`select ${COLUMNS} from posts where id = $1`, [id]);
  return post ?? null;
});

export async function createPost(userId: string, post: NewPost) {
  const [created] = await query<{ id: string }>(
    `insert into posts (user_id, title, body, cover_url) values ($1, $2, $3, $4) returning id`,
    [userId, post.title, post.body, post.coverUrl],
  );
  return created;
}
