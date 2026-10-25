import Link from "next/link";
import { DeletePostButton } from "@/components/DeletePostButton";
import { formatPostDate, listAllPosts } from "@/lib/posts";

export const instant = false;

export default function AdminHomePage() {
  const posts = listAllPosts();

  return (
    <div>
      <div className="flex items-end justify-between gap-4">
        <div>
          <p className="text-[11px] uppercase tracking-[0.22em] text-copper">Quản trị</p>
          <h1 className="mt-2 font-display text-4xl">Tất cả bài</h1>
        </div>
        <Link href="/admin/posts/new" className="inline-flex h-11 items-center bg-ink px-4 text-sm text-sand">
          Bài mới
        </Link>
      </div>
      {posts.length === 0 ? (
        <p className="mt-10 text-stone">Chưa có bài nào.</p>
      ) : (
        <ul className="mt-8 divide-y divide-line border-y border-line">
          {posts.map((post) => (
            <li key={post.id} className="flex flex-col gap-3 py-5 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <Link href={`/admin/posts/${post.id}`} className="font-display text-2xl hover:text-copper">
                  {post.title}
                </Link>
                <p className="mt-1 text-sm text-stone">
                  {post.published ? "Đã đăng" : "Nháp"} · {formatPostDate(post.updated_at)}
                  {post.published ? ` · /insights/${post.slug}` : ""}
                </p>
              </div>
              <div className="flex items-center gap-4">
                <Link href={`/admin/posts/${post.id}`} className="text-sm">
                  Sửa
                </Link>
                <DeletePostButton id={post.id} />
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
