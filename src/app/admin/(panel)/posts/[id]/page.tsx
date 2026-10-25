import { notFound } from "next/navigation";
import { PostForm } from "@/components/PostForm";
import { getPost } from "@/lib/posts";

export const instant = false;

export default async function EditPostPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const post = getPost(Number(id));
  if (!post) notFound();

  return (
    <div>
      <p className="text-[11px] uppercase tracking-[0.22em] text-copper">Sửa bài</p>
      <h1 className="mt-2 font-display text-4xl">{post.title}</h1>
      <div className="mt-8">
        <PostForm post={post} />
      </div>
    </div>
  );
}
