import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArticleBody } from "@/components/ArticleBody";
import { CtaBand } from "@/components/CtaBand";
import { formatPostDate, getPublishedPost } from "@/lib/posts";

export const instant = false;

type Props = { params: Promise<{ slug: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const post = await getPublishedPost(slug);
  if (!post) return { title: "Article" };
  return { title: post.title, description: post.excerpt || post.title };
}

export default async function InsightPage({ params }: Props) {
  const { slug } = await params;
  const post = await getPublishedPost(slug);
  if (!post) notFound();

  return (
    <>
      <article>
        <header className="border-b border-line bg-paper">
          <div className="mx-auto max-w-3xl px-5 py-16 sm:px-8">
            <p className="text-[11px] uppercase tracking-[0.22em] text-copper">
              <Link href="/insights" className="hover:text-ink">
                Insights
              </Link>
              <span className="px-2 text-stone">/</span>
              {formatPostDate(post.updated_at)}
            </p>
            <h1 className="mt-4 font-display text-4xl tracking-tight sm:text-5xl">{post.title}</h1>
            {post.excerpt ? <p className="mt-5 text-lg leading-8 text-stone">{post.excerpt}</p> : null}
          </div>
        </header>
        {post.cover_image ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img src={post.cover_image} alt="" className="max-h-[520px] w-full object-cover" />
        ) : null}
        <div className="mx-auto max-w-3xl px-5 py-12 sm:px-8">
          <ArticleBody markdown={post.body} />
        </div>
      </article>
      <CtaBand />
    </>
  );
}
