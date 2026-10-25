"use client";

import { useRef, useState } from "react";
import { useActionState } from "react";
import { savePost, uploadImage, type SaveState } from "@/app/admin/actions";
import { RichEditor } from "@/components/RichEditor";
import type { Post } from "@/lib/posts";

const initial: SaveState = { error: "" };

export function PostForm({ post }: { post?: Post }) {
  const [state, action, pending] = useActionState(savePost, initial);
  const [cover, setCover] = useState(post?.cover_image ?? "");
  const [coverNote, setCoverNote] = useState("");
  const coverFile = useRef<HTMLInputElement>(null);

  async function uploadCover(file: File) {
    setCoverNote("Đang tải ảnh bìa...");
    const data = new FormData();
    data.set("file", file);
    const result = await uploadImage(data);
    if ("error" in result) setCoverNote(result.error);
    else {
      setCover(result.url);
      setCoverNote("");
    }
  }

  return (
    <form id="post-form" action={action} className="space-y-5 border border-line bg-paper p-6 sm:p-8">
      {post ? <input type="hidden" name="id" value={post.id} /> : null}
      <label className="block text-sm">
        <span className="text-stone">Tiêu đề</span>
        <input
          name="title"
          required
          defaultValue={post?.title ?? ""}
          className="mt-1.5 h-11 w-full border border-line bg-sand/40 px-3 outline-none focus:border-ink"
        />
      </label>
      <label className="block text-sm">
        <span className="text-stone">Đường dẫn</span>
        <input
          name="slug"
          defaultValue={post?.slug ?? ""}
          placeholder="Để trống để tạo từ tiêu đề"
          className="mt-1.5 h-11 w-full border border-line bg-sand/40 px-3 outline-none focus:border-ink"
        />
      </label>
      <label className="block text-sm">
        <span className="text-stone">Tóm tắt</span>
        <textarea
          name="excerpt"
          rows={3}
          defaultValue={post?.excerpt ?? ""}
          className="mt-1.5 w-full border border-line bg-sand/40 px-3 py-3 outline-none focus:border-ink"
        />
      </label>
      <div className="block text-sm">
        <span className="text-stone">Ảnh bìa</span>
        <div className="mt-1.5 flex gap-2">
          <input
            name="cover_image"
            value={cover}
            onChange={(event) => setCover(event.target.value)}
            placeholder="https:// hoặc tải ảnh lên"
            className="h-11 min-w-0 flex-1 border border-line bg-sand/40 px-3 outline-none focus:border-ink"
          />
          <button
            type="button"
            onClick={() => coverFile.current?.click()}
            className="h-11 shrink-0 border border-line px-3 text-sm"
          >
            Tải ảnh
          </button>
          <input
            ref={coverFile}
            type="file"
            accept="image/jpeg,image/png,image/webp,image/gif"
            className="hidden"
            onChange={(event) => {
              const file = event.target.files?.[0];
              event.target.value = "";
              if (file) void uploadCover(file);
            }}
          />
        </div>
        {coverNote ? <span className="mt-2 block text-xs text-copper">{coverNote}</span> : null}
        {cover ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img src={cover} alt="" className="mt-3 max-h-44 w-full object-cover" />
        ) : null}
      </div>
      <div className="block text-sm">
        <span className="text-stone">Nội dung</span>
        <div className="mt-1.5">
          <RichEditor initial={post?.body ?? ""} />
        </div>
        <span className="mt-2 block text-xs text-stone">
          Dùng thanh công cụ để chọn kiểu chữ, in đậm, danh sách, liên kết và chèn ảnh. Phím tắt: Ctrl+B, Ctrl+I.
        </span>
      </div>
      <label className="flex items-center gap-2 text-sm">
        <input type="checkbox" name="published" value="1" defaultChecked={post ? post.published === 1 : true} />
        Xuất bản trên trang Insights
      </label>
      {state.error ? (
        <p className="text-sm text-copper" role="alert">
          {state.error}
        </p>
      ) : null}
      <button type="submit" disabled={pending} className="inline-flex h-11 items-center bg-ink px-5 text-sm text-sand disabled:opacity-60">
        {pending ? "Đang lưu..." : "Lưu bài"}
      </button>
    </form>
  );
}
