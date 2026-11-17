import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { formatDate } from "@/lib/format";
import { getPost } from "@/lib/repositories/posts";

type Props = { params: Promise<{ id: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const post = await getPost((await params).id);
  return { title: post?.title ?? "Post not found" };
}

export default async function PostPage({ params }: Props) {
  const post = await getPost((await params).id);
  if (!post) notFound();

  return (
    <article className="wrap max-w-3xl py-12">
      <Link href="/posts" className="text-sm font-medium text-muted hover:text-ink">
        ← All posts
      </Link>
      <time dateTime={post.createdAt.toISOString()} className="mt-6 block text-sm text-muted">
        {formatDate(post.createdAt)}
      </time>
      <h1 className="mt-2 font-display text-4xl font-semibold tracking-tight sm:text-5xl">{post.title}</h1>
      {post.coverUrl && (
        <div className="relative mt-8 aspect-[16/9] overflow-hidden rounded-2xl border border-line">
          <Image src={post.coverUrl} alt="" fill priority sizes="(min-width: 768px) 768px, 100vw" className="object-cover" />
        </div>
      )}
      <div className="mt-8 whitespace-pre-line text-lg leading-relaxed">{post.body}</div>
    </article>
  );
}
