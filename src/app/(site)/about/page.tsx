import type { Metadata } from "next";
import Image from "next/image";
import { CtaBand } from "@/components/CtaBand";
import { PageHeader } from "@/components/PageHeader";
import { company, photos } from "@/lib/content";

export const metadata: Metadata = {
  title: "About",
  description:
    "Harborline is a Tampa warehouse team for importers, carriers, brokers, and brands. Dock-high doors, ambient storage, and direct access to the people on the floor.",
};

const facts = [
  ["Location", "Tampa, near Port Tampa Bay, I-4, and I-75"],
  ["Building", "Dock-high doors, ambient storage"],
  ["Freight", "Non-hazardous goods. No climate control."],
  ["Handling", "Pallets typically 8 ft and under, 5,000 lb or less"],
  ["Equipment", "Dry van, flatbed, cargo van, pickup, container"],
  ["Since", company.since],
];

export default function AboutPage() {
  return (
    <>
      <PageHeader
        kicker="About"
        title="A Tampa warehouse you can actually get on the phone."
        lede="Harborline exists for freight that needs a door, a crew, and a straight answer. We are not a marketplace and we do not hide the building behind a call center."
      />
      <section>
        <div className="mx-auto grid max-w-6xl items-center gap-12 px-5 py-16 sm:px-8 md:grid-cols-2">
          <div className="relative min-h-[360px] bg-navy">
            <Image
              src={photos.crew}
              alt="Warehouse associate moving cartons"
              fill
              className="object-cover"
              sizes="(min-width: 1024px) 50vw, 100vw"
            />
          </div>
          <div>
            <h2 className="font-display text-3xl">How we work</h2>
            <p className="mt-4 text-sm leading-7 text-stone">
              Importers, manufacturers, distributors, brokers, and brands use the same dock. Some need one restack before a receiver will take the trailer. Others need a Florida node for inventory they are not ready to lease a building for.
            </p>
            <p className="mt-4 text-sm leading-7 text-stone">
              Either way the sequence is the same: understand the freight, say whether we are the right fit, quote it, and book the door. You keep running the business. We keep the floor moving.
            </p>
            <dl className="mt-8 divide-y divide-line border-y border-line">
              {facts.map(([label, value]) => (
                <div key={label} className="grid grid-cols-[120px_1fr] gap-4 py-3 text-sm">
                  <dt className="text-stone">{label}</dt>
                  <dd>{value}</dd>
                </div>
              ))}
            </dl>
          </div>
        </div>
      </section>
      <CtaBand />
    </>
  );
}
