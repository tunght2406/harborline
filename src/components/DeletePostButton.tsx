"use client";

import { removePost } from "@/app/admin/actions";

export function DeletePostButton({ id }: { id: number }) {
  return (
    <form action={removePost}>
      <input type="hidden" name="id" value={id} />
      <button
        type="submit"
        className="text-sm text-copper hover:text-ink"
        onClick={(event) => {
          if (!window.confirm("Xóa bài này?")) event.preventDefault();
        }}
      >
        Xóa
      </button>
    </form>
  );
}
