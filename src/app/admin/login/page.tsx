import type { Metadata } from "next";
import { redirect } from "next/navigation";
import { login } from "@/app/admin/actions";
import { getSession } from "@/lib/auth";

export const instant = false;

export const metadata: Metadata = {
  title: "Đăng nhập",
  robots: { index: false, follow: false },
};

export default async function LoginPage({
  searchParams,
}: {
  searchParams: Promise<{ error?: string }>;
}) {
  if (await getSession()) redirect("/admin");
  const { error } = await searchParams;

  return (
    <section className="flex flex-1 items-center justify-center px-5 py-20">
      <form action={login} className="w-full max-w-md border border-line bg-paper p-8">
        <p className="text-[11px] uppercase tracking-[0.22em] text-copper">Harborline</p>
        <h1 className="mt-3 font-display text-4xl">Đăng nhập</h1>
        <p className="mt-3 text-sm leading-6 text-stone">Dùng tài khoản quản trị để đăng và sửa bài.</p>
        <label className="mt-6 block text-sm">
          <span className="text-stone">Tên đăng nhập</span>
          <input
            name="username"
            autoComplete="username"
            required
            className="mt-1.5 h-11 w-full border border-line bg-sand/40 px-3 outline-none focus:border-ink"
          />
        </label>
        <label className="mt-4 block text-sm">
          <span className="text-stone">Mật khẩu</span>
          <input
            name="password"
            type="password"
            autoComplete="current-password"
            required
            className="mt-1.5 h-11 w-full border border-line bg-sand/40 px-3 outline-none focus:border-ink"
          />
        </label>
        {error ? (
          <p className="mt-4 text-sm text-copper" role="alert">
            Sai tên đăng nhập hoặc mật khẩu.
          </p>
        ) : null}
        <button type="submit" className="mt-6 inline-flex h-11 items-center bg-ink px-5 text-sm text-sand">
          Vào trang quản trị
        </button>
      </form>
    </section>
  );
}
