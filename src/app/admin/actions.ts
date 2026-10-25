"use server";

import { mkdir, writeFile } from "node:fs/promises";
import path from "node:path";
import { revalidatePath } from "next/cache";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { credentialsMatch, createSessionValue, getSession, sessionCookie } from "@/lib/auth";
import { articlePlainText, sanitizeArticleHtml } from "@/lib/html";
import { deletePostById, getPost, insertPost, uniqueSlug, updatePost } from "@/lib/posts";

export type SaveState = { error: string };

async function requireAdmin() {
  const session = await getSession();
  if (!session) redirect("/admin/login");
}

function cleanUrl(value: string) {
  const trimmed = value.trim();
  if (!trimmed) return "";
  if (/^\/uploads\/[a-zA-Z0-9._-]+$/.test(trimmed)) return trimmed;
  if (/^https?:\/\//i.test(trimmed)) return trimmed;
  return null;
}

const imageTypes = new Map([
  ["image/jpeg", "jpg"],
  ["image/png", "png"],
  ["image/webp", "webp"],
  ["image/gif", "gif"],
]);

export async function uploadImage(formData: FormData): Promise<{ url: string } | { error: string }> {
  await requireAdmin();
  const file = formData.get("file");
  if (!(file instanceof File) || file.size === 0) return { error: "Chọn một file ảnh." };
  const extension = imageTypes.get(file.type);
  if (!extension) return { error: "Chỉ nhận ảnh JPG, PNG, WEBP hoặc GIF." };
  if (file.size > 5 * 1024 * 1024) return { error: "Ảnh lớn hơn 5 MB." };

  const name = `${Date.now()}-${Math.random().toString(36).slice(2, 8)}.${extension}`;
  const dir = path.join(process.cwd(), "public", "uploads");
  await mkdir(dir, { recursive: true });
  await writeFile(path.join(dir, name), Buffer.from(await file.arrayBuffer()));
  return { url: `/uploads/${name}` };
}

export async function login(formData: FormData) {
  const username = String(formData.get("username") ?? "");
  const password = String(formData.get("password") ?? "");
  if (!credentialsMatch(username, password)) {
    redirect("/admin/login?error=1");
  }
  const jar = await cookies();
  jar.set(sessionCookie.name, createSessionValue(), sessionCookie.options);
  redirect("/admin");
}

export async function logout() {
  const jar = await cookies();
  jar.delete(sessionCookie.name);
  redirect("/admin/login");
}

export async function savePost(_prev: SaveState, formData: FormData): Promise<SaveState> {
  await requireAdmin();
  const idValue = String(formData.get("id") ?? "");
  const id = idValue ? Number(idValue) : null;
  const title = String(formData.get("title") ?? "").trim();
  const excerpt = String(formData.get("excerpt") ?? "").trim();
  const body = sanitizeArticleHtml(String(formData.get("body") ?? ""));
  const requestedSlug = String(formData.get("slug") ?? "").trim();
  const cover = cleanUrl(String(formData.get("cover_image") ?? ""));
  const published = formData.get("published") === "1" ? 1 : 0;

  if (title.length < 3) return { error: "Tiêu đề cần ít nhất 3 ký tự." };
  if (articlePlainText(body).length < 20 && !/<img\s/i.test(body)) {
    return { error: "Nội dung cần ít nhất 20 ký tự, hoặc một ảnh trong bài." };
  }
  if (cover === null) return { error: "Ảnh bìa phải là liên kết http(s), ảnh đã tải lên, hoặc để trống." };
  if (id !== null && (!Number.isInteger(id) || !getPost(id))) return { error: "Không tìm thấy bài để sửa." };

  const slug = uniqueSlug(requestedSlug || title, id ?? undefined);
  const input = { title, slug, excerpt, body, cover_image: cover, published };
  if (id === null) insertPost(input);
  else updatePost(id, input);

  revalidatePath("/");
  revalidatePath("/insights");
  revalidatePath(`/insights/${slug}`);
  redirect("/admin");
}

export async function removePost(formData: FormData) {
  await requireAdmin();
  const id = Number(formData.get("id"));
  const existing = Number.isInteger(id) ? getPost(id) : null;
  if (existing) {
    deletePostById(existing.id);
    revalidatePath("/");
    revalidatePath("/insights");
    revalidatePath(`/insights/${existing.slug}`);
  }
  redirect("/admin");
}
