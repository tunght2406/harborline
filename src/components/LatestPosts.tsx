import Link from "next/link";
import { formatPostDate, listPublishedPosts } from "@/lib/posts";

export async function LatestPosts() {
  const posts = (await listPublishedPosts()).slice(0, 3);
  if (posts.length === 0) return null;

  return (
    <section className="border-y border-line bg-paper">
      <div className="mx-auto max-w-6xl px-5 py-20 sm:px-8">
        <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
          <div>
            <p className="text-[11px] uppercase tracking-[0.22em] text-copper">Insights</p>
            <h2 className="mt-3 font-display text-4xl tracking-tight">Notes from the warehouse.</h2>
          </div>
          <Link href="/insights" className="text-sm underline decoration-line underline-offset-4">
            All articles
          </Link>
        </div>
        <div className="mt-10 grid gap-6 lg:grid-cols-3">
          {posts.map((post) => (
            <Link key={post.id} href={`/insights/${post.slug}`} className="group border border-line bg-sand">
              {post.cover_image ? (
                // User-supplied cover URLs are not limited to the image optimizer allowlist.
                // eslint-disable-next-line @next/next/no-img-element
                <img src={post.cover_image} alt="" className="h-48 w-full object-cover" />
              ) : null}
              <div className="p-5">
                <p className="text-[11px] uppercase tracking-[0.16em] text-copper">{formatPostDate(post.updated_at)}</p>
                <h3 className="mt-2 font-display text-2xl leading-snug group-hover:text-copper">{post.title}</h3>
                {post.excerpt ? <p className="mt-2 text-sm leading-6 text-stone">{post.excerpt}</p> : null}
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
