import type { Metadata } from "next";
import { QuoteForm } from "@/components/QuoteForm";
import { company } from "@/lib/content";

export const metadata: Metadata = {
  title: "Contact",
  description: "Request a Tampa warehousing quote. Call Harborline or send the freight details. Appointments are required.",
};

export default function ContactPage() {
  return (
    <section className="border-b border-line bg-paper">
      <div className="mx-auto grid max-w-6xl gap-12 px-5 py-16 sm:px-8 lg:grid-cols-[0.8fr_1.2fr] lg:py-20">
        <div>
          <p className="text-[11px] uppercase tracking-[0.22em] text-copper">Contact</p>
          <h1 className="mt-3 font-display text-4xl tracking-tight sm:text-5xl">Send the freight. We will tell you if the dock can take it.</h1>
          <div className="mt-8 space-y-4 text-sm leading-6">
            <p>
              <a className="text-lg text-ink" href={`tel:${company.phoneTel}`}>
                {company.phoneDisplay}
              </a>
              <span className="mt-1 block text-stone">{company.hours}</span>
              <span className="block text-stone">{company.afterHours}</span>
            </p>
            <p className="text-stone">
              {company.address[0]}
              <br />
              {company.address[1]}
            </p>
            <p className="text-stone">Appointments are required. We do not accept unscheduled live unloads.</p>
          </div>
        </div>
        <QuoteForm />
      </div>
    </section>
  );
}
