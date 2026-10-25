import type { Metadata } from "next";
import Link from "next/link";
import { Suspense } from "react";
import { PageHeader } from "@/components/PageHeader";
import { formatPostDate, listPublishedPosts } from "@/lib/posts";

export const metadata: Metadata = {
  title: "Insights",
  description: "Articles from the Harborline warehouse team on restacks, transloads, and Tampa freight.",
};

export default function InsightsPage() {
  return (
    <>
      <PageHeader
        kicker="Insights"
        title="Notes from the people on the floor."
        lede="Short articles about restacks, transloads, storage, and the calls that actually come into a Tampa dock."
      />
      <Suspense fallback={<p className="mx-auto max-w-6xl px-5 py-16 text-stone sm:px-8">Loading articles...</p>}>
        <InsightList />
      </Suspense>
    </>
  );
}

async function InsightList() {
  const posts = await listPublishedPosts();
  if (posts.length === 0) {
    return <p className="mx-auto max-w-6xl px-5 py-16 text-stone sm:px-8">No articles published yet.</p>;
  }

  return (
    <div className="mx-auto grid max-w-6xl gap-8 px-5 py-16 sm:px-8">
      {posts.map((post) => (
        <article key={post.id} className="grid gap-6 border-b border-line pb-8 md:grid-cols-[240px_1fr]">
          {post.cover_image ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img src={post.cover_image} alt="" className="h-44 w-full object-cover md:h-full" />
          ) : (
            <div className="hidden bg-navy md:block" />
          )}
          <div>
            <p className="text-[11px] uppercase tracking-[0.16em] text-copper">{formatPostDate(post.updated_at)}</p>
            <h2 className="mt-2 font-display text-3xl">
              <Link href={`/insights/${post.slug}`} className="hover:text-copper">
                {post.title}
              </Link>
            </h2>
            {post.excerpt ? <p className="mt-3 max-w-2xl text-sm leading-7 text-stone">{post.excerpt}</p> : null}
          </div>
        </article>
      ))}
    </div>
  );
}
