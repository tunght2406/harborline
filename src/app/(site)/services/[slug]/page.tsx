import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { CtaBand } from "@/components/CtaBand";
import { getService, services, servicesByGroup } from "@/lib/content";

type Props = {
  params: Promise<{ slug: string }>;
};

export function generateStaticParams() {
  return services.map((service) => ({ slug: service.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const service = getService(slug);
  if (!service) return { title: "Service" };
  return {
    title: service.title,
    description: service.summary,
  };
}

export default async function ServicePage({ params }: Props) {
  const { slug } = await params;
  const service = getService(slug);
  if (!service) notFound();

  const related = servicesByGroup(service.group).filter((item) => item.slug !== service.slug).slice(0, 3);

  return (
    <>
      <article>
        <section className="grid md:grid-cols-2">
          <div className="flex flex-col justify-center px-5 py-16 sm:px-8 lg:px-12">
            <p className="text-[11px] uppercase tracking-[0.22em] text-copper">
              <Link href="/services" className="hover:text-ink">Services</Link>
              <span className="px-2 text-line">/</span>
              {service.title}
            </p>
            <h1 className="mt-4 font-display text-4xl tracking-tight sm:text-5xl">{service.title}</h1>
            <p className="mt-5 max-w-lg text-lg leading-8 text-stone">{service.lead}</p>
            <Link href="/contact" className="mt-8 inline-flex h-12 w-fit items-center bg-ink px-5 text-sm text-sand">
              Quote this work
            </Link>
          </div>
          <div className="relative min-h-[320px] bg-navy md:min-h-[520px]">
            <Image
              src={service.image}
              alt=""
              fill
              priority
              className="object-cover"
              sizes="(min-width: 1024px) 50vw, 100vw"
            />
          </div>
        </section>
        <section className="border-t border-line bg-paper">
          <div className="mx-auto grid max-w-6xl gap-10 px-5 py-16 sm:px-8 lg:grid-cols-[1fr_1fr]">
            <div>
              <h2 className="font-display text-3xl">How the work usually goes</h2>
              <p className="mt-4 text-sm leading-7 text-stone">{service.summary}</p>
            </div>
            <ul className="space-y-4">
              {service.bullets.map((bullet) => (
                <li key={bullet} className="border-b border-line pb-4 text-sm leading-6">
                  {bullet}
                </li>
              ))}
            </ul>
          </div>
        </section>
        {related.length > 0 ? (
          <section>
            <div className="mx-auto max-w-6xl px-5 py-16 sm:px-8">
              <h2 className="font-display text-3xl">Related</h2>
              <div className="mt-6 grid gap-4 sm:grid-cols-3">
                {related.map((item) => (
                  <Link key={item.slug} href={`/services/${item.slug}`} className="border border-line bg-paper p-5 hover:border-ink">
                    <h3 className="font-display text-2xl">{item.title}</h3>
                    <p className="mt-2 text-sm text-stone">{item.summary}</p>
                  </Link>
                ))}
              </div>
            </div>
          </section>
        ) : null}
      </article>
      <CtaBand />
    </>
  );
}
