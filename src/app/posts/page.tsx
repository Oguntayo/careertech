import { notFound } from "next/navigation";
import { EmptyState, PageHeader } from "@/components/page-header";
import { Pagination } from "@/components/pagination";
import { PostCard } from "@/components/post-card";
import { parsePage } from "@/lib/pagination";
import { listPosts } from "@/lib/repositories/posts";

export const metadata = { title: "Posts" };

export default async function PostsPage({ searchParams }: { searchParams: Promise<{ page?: string }> }) {
  const page = parsePage((await searchParams).page);
  const { items, pageCount } = await listPosts(page);
  if (page > pageCount) notFound();

  return (
    <div className="wrap pb-8">
      <PageHeader
        title="Posts"
        subtitle="Career advice, hiring news and stories from the community."
        action={{ href: "/posts/new", label: "Write a post" }}
      />
      {items.length === 0 ? (
        <EmptyState
          title="No posts yet"
          text="Share something useful with the community."
          action={{ href: "/posts/new", label: "Write a post" }}
        />
      ) : (
        <>
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {items.map((post) => (
              <PostCard key={post.id} post={post} />
            ))}
          </div>
          <Pagination page={page} pageCount={pageCount} basePath="/posts" />
        </>
      )}
    </div>
  );
}
