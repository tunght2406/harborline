import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { CtaBand } from "@/components/CtaBand";
import { PageHeader } from "@/components/PageHeader";
import { groupLabels, servicesByGroup, type ServiceGroup } from "@/lib/content";

export const metadata: Metadata = {
  title: "Warehousing services",
  description:
    "On-demand dock work, warehouse storage, and recurring 3PL from a Tampa facility. Container unloading, restacks, transloads, and fulfillment.",
};

const order: ServiceGroup[] = ["on-demand", "storage", "3pl"];

export default function ServicesPage() {
  return (
    <>
      <PageHeader
        kicker="Services"
        title="Dock work, storage, and a 3PL program when you are ready for one."
        lede="Start with the job in front of you. Harborline can unload a container this week or run receiving and fulfillment as a standing account."
      />
      {order.map((group) => (
        <section key={group} className="border-b border-line">
          <div className="mx-auto max-w-6xl px-5 py-16 sm:px-8">
            <h2 className="font-display text-3xl">{groupLabels[group]}</h2>
            <div className="mt-8 grid gap-5 md:grid-cols-2">
              {servicesByGroup(group).map((service) => (
                <Link
                  key={service.slug}
                  href={`/services/${service.slug}`}
                  className="group grid grid-cols-[140px_1fr] overflow-hidden border border-line bg-paper sm:grid-cols-[180px_1fr]"
                >
                  <div className="relative min-h-36 bg-navy">
                    <Image src={service.image} alt="" fill className="object-cover" sizes="180px" />
                  </div>
                  <div className="p-5">
                    <h3 className="font-display text-2xl group-hover:text-copper">{service.title}</h3>
                    <p className="mt-2 text-sm leading-6 text-stone">{service.summary}</p>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>
      ))}
      <CtaBand />
    </>
  );
}
