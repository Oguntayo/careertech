import { PageHeader } from "@/components/page-header";
import { PostForm } from "@/components/post-form";

export const metadata = { title: "Write a post" };

export default function NewPostPage() {
  return (
    <div className="wrap max-w-3xl pb-8">
      <PageHeader title="Write a post" subtitle="Share advice, news or a story with the community." />
      <PostForm />
    </div>
  );
}
