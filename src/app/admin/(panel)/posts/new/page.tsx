import { PostForm } from "@/components/PostForm";

export const instant = false;

export default function NewPostPage() {
  return (
    <div>
      <p className="text-[11px] uppercase tracking-[0.22em] text-copper">Bài mới</p>
      <h1 className="mt-2 font-display text-4xl">Viết bài</h1>
      <div className="mt-8">
        <PostForm />
      </div>
    </div>
  );
}
