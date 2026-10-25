import Link from "next/link";
import { company } from "@/lib/content";

export function CtaBand() {
  return (
    <section className="bg-ink text-sand">
      <div className="mx-auto flex max-w-6xl flex-col gap-6 px-5 py-14 sm:px-8 md:flex-row md:items-end md:justify-between">
        <div>
          <p className="text-[11px] uppercase tracking-[0.2em] text-sand/50">Appointments required</p>
          <h2 className="mt-3 max-w-xl font-display text-3xl sm:text-4xl">Need the dock this week?</h2>
          <p className="mt-3 max-w-lg text-sm leading-6 text-sand/70">
            Call the warehouse or send the freight details. We confirm fit, then quote the work in writing.
          </p>
        </div>
        <div className="flex flex-wrap gap-3">
          <a href={`tel:${company.phoneTel}`} className="inline-flex h-11 items-center border border-sand/30 px-5 text-sm hover:border-sand">
            {company.phoneDisplay}
          </a>
          <Link href="/contact" className="inline-flex h-11 items-center bg-sand px-5 text-sm text-ink hover:bg-white">
            Get a quote
          </Link>
        </div>
      </div>
    </section>
  );
}
