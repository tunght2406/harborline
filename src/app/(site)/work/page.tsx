import type { Metadata } from "next";
import Image from "next/image";
import { CtaBand } from "@/components/CtaBand";
import { PageHeader } from "@/components/PageHeader";
import { studies } from "@/lib/content";

export const metadata: Metadata = {
  title: "Work",
  description: "Sample warehouse jobs: a shifted dry van, a port transload, and seasonal overflow fulfillment in Tampa.",
};

export default function WorkPage() {
  return (
    <>
      <PageHeader
        kicker="Work"
        title="Notes from jobs the crew has finished."
        lede="These are representative projects for this demonstration, written so you can see the kind of freight Harborline is built for."
      />
      <div className="mx-auto max-w-6xl px-5 py-16 sm:px-8">
        <div className="space-y-16">
          {studies.map((study) => (
            <article key={study.id} id={study.id} className="grid items-center gap-8 scroll-mt-28 lg:grid-cols-2">
              <div className="relative min-h-[280px] bg-navy">
                <Image src={study.image} alt="" fill className="object-cover" sizes="(min-width: 1024px) 50vw, 100vw" />
              </div>
              <div>
                <p className="text-[11px] uppercase tracking-[0.18em] text-copper">{study.meta}</p>
                <h2 className="mt-3 font-display text-3xl tracking-tight">{study.title}</h2>
                <p className="mt-4 text-sm leading-7 text-stone">{study.summary}</p>
                <p className="mt-4 text-sm leading-7">{study.body}</p>
              </div>
            </article>
          ))}
        </div>
      </div>
      <CtaBand />
    </>
  );
}
