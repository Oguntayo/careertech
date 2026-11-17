import Image from "next/image";
import Link from "next/link";
import { excerpt, formatDate } from "@/lib/format";
import type { Post } from "@/lib/repositories/posts";

export function PostCard({ post }: { post: Post }) {
  return (
    <Link
      href={`/posts/${post.id}`}
      className="card group flex flex-col overflow-hidden transition hover:-translate-y-0.5 hover:border-brand/50 hover:shadow-lg hover:shadow-brand/5"
    >
      <div className="relative aspect-[16/9] bg-brand-soft">
        {post.coverUrl && (
          <Image
            src={post.coverUrl}
            alt=""
            fill
            sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
            className="object-cover"
          />
        )}
      </div>
      <div className="flex flex-1 flex-col gap-2 p-5">
        <time dateTime={post.createdAt.toISOString()} className="text-xs text-muted">
          {formatDate(post.createdAt)}
        </time>
        <h3 className="font-display text-xl leading-snug group-hover:text-brand">{post.title}</h3>
        <p className="text-sm text-muted">{excerpt(post.body, 140)}</p>
      </div>
    </Link>
  );
}
