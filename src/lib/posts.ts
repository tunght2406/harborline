import fs from "node:fs";
import path from "node:path";
import { DatabaseSync } from "node:sqlite";
import { connection } from "next/server";
import { photos } from "@/lib/content";

export type Post = {
  id: number;
  title: string;
  slug: string;
  excerpt: string;
  body: string;
  cover_image: string;
  published: number;
  created_at: string;
  updated_at: string;
};

const globalForDb = globalThis as unknown as { harborlineDb?: DatabaseSync };

function database() {
  if (!globalForDb.harborlineDb) {
    const dir = path.join(process.cwd(), "data");
    fs.mkdirSync(dir, { recursive: true });
    const db = new DatabaseSync(path.join(dir, "harborline.db"));
    db.exec(`
      CREATE TABLE IF NOT EXISTS posts (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        title TEXT NOT NULL,
        slug TEXT NOT NULL UNIQUE,
        excerpt TEXT NOT NULL DEFAULT '',
        body TEXT NOT NULL DEFAULT '',
        cover_image TEXT NOT NULL DEFAULT '',
        published INTEGER NOT NULL DEFAULT 0,
        created_at TEXT NOT NULL,
        updated_at TEXT NOT NULL
      );
    `);
    const count = db.prepare("SELECT COUNT(*) AS count FROM posts").get() as { count: number };
    if (Number(count.count) === 0) {
      const now = new Date().toISOString();
      const insert = db.prepare(
        `INSERT INTO posts (title, slug, excerpt, body, cover_image, published, created_at, updated_at)
         VALUES (?, ?, ?, ?, ?, 1, ?, ?)`,
      );
      insert.run(
        "When a shifted trailer is cheaper to restack",
        "when-a-shifted-trailer-is-cheaper-to-restack",
        "A rejected dry van does not always need a new truck. Sometimes it needs two hours on a dock.",
        `A receiver turns a trailer around because the nose has walked. The broker's first instinct is often to refuse the whole load and rebook the lane.

## What the dock actually does

- Photograph the damage before anyone touches it
- Strip the unstable rows and rebuild to a height the receiver will take
- Film, recount, and send the driver back out the same day

The cost is labor and a door, not another linehaul. If the product is intact and the appointment can still be saved, a restack is the shorter path.`,
        photos.truck,
        now,
        now,
      );
      insert.run(
        "Transload or store: a short guide for Tampa arrivals",
        "transload-or-store-tampa-arrivals",
        "A container at the port does not automatically belong on a pallet for a month.",
        `When a box is available at Port Tampa Bay, the next move is a choice: hold it, or put it on the trailer that finishes the trip.

## Store it when

- The outbound appointment is still days away
- Product needs to be sorted, labeled, or palletized first
- You want a buffer before wholesale orders firm up

## Transload it when

- A dry van or flatbed is already booked
- The consignee wants the freight moving, not dwelling
- You would rather pay for a transfer than for weeks of storage

Tell the warehouse which one you mean before the container is dispatched. The crew, the door, and the quote all change.`,
        photos.port,
        now,
        now,
      );
    }
    globalForDb.harborlineDb = db;
  }
  return globalForDb.harborlineDb;
}

function asPost(row: unknown): Post {
  const record = row as Record<string, unknown>;
  return {
    id: Number(record.id),
    title: String(record.title ?? ""),
    slug: String(record.slug ?? ""),
    excerpt: String(record.excerpt ?? ""),
    body: String(record.body ?? ""),
    cover_image: String(record.cover_image ?? ""),
    published: Number(record.published),
    created_at: String(record.created_at ?? ""),
    updated_at: String(record.updated_at ?? ""),
  };
}

export async function listPublishedPosts() {
  await connection();
  return database()
    .prepare("SELECT * FROM posts WHERE published = 1 ORDER BY datetime(updated_at) DESC")
    .all()
    .map(asPost);
}

export async function getPublishedPost(slug: string) {
  await connection();
  const row = database()
    .prepare("SELECT * FROM posts WHERE slug = ? AND published = 1")
    .get(slug);
  return row ? asPost(row) : null;
}

export function listAllPosts() {
  return database()
    .prepare("SELECT * FROM posts ORDER BY datetime(updated_at) DESC")
    .all()
    .map(asPost);
}

export function getPost(id: number) {
  const row = database().prepare("SELECT * FROM posts WHERE id = ?").get(id);
  return row ? asPost(row) : null;
}

export function slugify(input: string) {
  const base = input
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .replace(/đ/g, "d")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, 80);
  return base || "post";
}

export function uniqueSlug(title: string, ignoreId?: number) {
  const base = slugify(title);
  let slug = base;
  let n = 2;
  const lookup = database().prepare("SELECT id FROM posts WHERE slug = ?");
  while (true) {
    const row = lookup.get(slug) as { id: number } | undefined;
    if (!row || row.id === ignoreId) return slug;
    slug = `${base}-${n}`;
    n += 1;
  }
}

export function insertPost(input: Omit<Post, "id" | "created_at" | "updated_at">) {
  const now = new Date().toISOString();
  const result = database()
    .prepare(
      `INSERT INTO posts (title, slug, excerpt, body, cover_image, published, created_at, updated_at)
       VALUES (?, ?, ?, ?, ?, ?, ?, ?)`,
    )
    .run(input.title, input.slug, input.excerpt, input.body, input.cover_image, input.published, now, now);
  return Number(result.lastInsertRowid);
}

export function updatePost(id: number, input: Omit<Post, "id" | "created_at" | "updated_at">) {
  const now = new Date().toISOString();
  database()
    .prepare(
      `UPDATE posts
       SET title = ?, slug = ?, excerpt = ?, body = ?, cover_image = ?, published = ?, updated_at = ?
       WHERE id = ?`,
    )
    .run(input.title, input.slug, input.excerpt, input.body, input.cover_image, input.published, now, id);
}

export function deletePostById(id: number) {
  database().prepare("DELETE FROM posts WHERE id = ?").run(id);
}

export function formatPostDate(iso: string) {
  const date = new Date(iso);
  const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
  return `${months[date.getUTCMonth()]} ${date.getUTCDate()}, ${date.getUTCFullYear()}`;
}
