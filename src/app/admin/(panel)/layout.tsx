import type { Metadata } from "next";
import Link from "next/link";
import { redirect } from "next/navigation";
import type { ReactNode } from "react";
import { logout } from "@/app/admin/actions";
import { getSession } from "@/lib/auth";

export const instant = false;

export const metadata: Metadata = {
  title: "Quản trị",
  robots: { index: false, follow: false },
};

export default async function AdminLayout({ children }: { children: ReactNode }) {
  if (!(await getSession())) redirect("/admin/login");

  return (
    <div className="flex flex-1 flex-col">
      <header className="border-b border-line bg-paper">
        <div className="mx-auto flex h-16 max-w-5xl items-center justify-between px-5">
          <Link href="/admin" className="font-display text-2xl">
            Bài viết
          </Link>
          <div className="flex items-center gap-4 text-sm">
            <Link href="/insights" className="text-stone hover:text-ink">
              Xem trang
            </Link>
            <form action={logout}>
              <button type="submit" className="text-stone hover:text-ink">
                Đăng xuất
              </button>
            </form>
          </div>
        </div>
      </header>
      <div className="mx-auto w-full max-w-5xl flex-1 px-5 py-10">{children}</div>
    </div>
  );
}
