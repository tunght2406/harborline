import Image from "next/image";
import Link from "next/link";
import { Suspense } from "react";
import { FaqList } from "@/components/FaqList";
import { LatestPosts } from "@/components/LatestPosts";
import { QuoteForm } from "@/components/QuoteForm";
import { company, reviews, services, studies } from "@/lib/content";

const reasons = [
  {
    title: "Speed is part of the service",
    text: "We answer the same day and book labor around the driver's clock. When the window is tight, the schedule is the product.",
  },
  {
    title: "You reach the warehouse",
    text: "No call center and no ticket layer. The people confirming your door are the people working the freight.",
  },
  {
    title: "Built for imperfect loads",
    text: "Rejected deliveries, shifted pallets, hot transloads, and floor-loaded containers are ordinary work here, not exceptions.",
  },
  {
    title: "A floor you could walk",
    text: "Dock-high doors, equipment staged before the truck arrives, and aisles kept clear enough to find the freight.",
  },
];

const problems = [
  "High-priority turns",
  "Rejected loads",
  "Shifted pallets",
  "Container-to-van transfers",
  "Sort and consolidate",
  "Urgent transloads",
];

export default function HomePage() {
  const featured = services.filter((service) => service.featured);

  return (
    <>
      <section className="grid md:grid-cols-2">
        <div className="flex flex-col justify-center px-5 py-16 sm:px-8 lg:px-12 lg:py-24">
          <p className="text-[11px] uppercase tracking-[0.22em] text-copper">
            Tampa Bay · Since {company.since}
          </p>
          <h1 className="mt-4 max-w-xl font-display text-4xl leading-[1.08] tracking-tight md:text-5xl xl:text-6xl">
            Warehouse services built around the load in front of you.
          </h1>
          <p className="mt-6 max-w-lg text-lg leading-8 text-stone">
            Harborline receives, restacks, stores, and ships freight for importers, carriers, brokers, and growing brands. One container or a standing 3PL account — handled on our dock.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Link href="/contact" className="inline-flex h-12 items-center bg-ink px-5 text-sm text-sand hover:bg-navy">
              Get a quote
            </Link>
            <a href={`tel:${company.phoneTel}`} className="inline-flex h-12 items-center border border-ink/15 px-5 text-sm hover:border-ink">
              Call {company.phoneDisplay}
            </a>
          </div>
          <dl className="mt-10 grid grid-cols-3 gap-4 border-t border-line pt-6 text-sm">
            <div>
              <dt className="text-stone">Google rating</dt>
              <dd className="mt-1 font-display text-2xl">4.9</dd>
            </div>
            <div>
              <dt className="text-stone">Dock-high doors</dt>
              <dd className="mt-1 font-display text-2xl">6</dd>
            </div>
            <div>
              <dt className="text-stone">Since</dt>
              <dd className="mt-1 font-display text-2xl">{company.since}</dd>
            </div>
          </dl>
        </div>
        <div className="relative min-h-[420px] bg-navy md:min-h-[640px]">
          <Image
            src="https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&w=1800&q=80"
            alt="Pallet racking inside a working warehouse"
            fill
            priority
            className="object-cover"
            sizes="(min-width: 1024px) 50vw, 100vw"
          />
          <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-deep/80 to-transparent px-6 pb-5 pt-16">
            <p className="max-w-sm text-sm leading-6 text-sand">
              Serving freight tied to Port Tampa Bay, I-4, and I-75. Ambient storage. Non-hazardous goods.
            </p>
          </div>
        </div>
      </section>

      <section className="bg-paper">
        <div className="mx-auto max-w-6xl px-5 py-20 sm:px-8">
          <div className="flex flex-col justify-between gap-6 sm:flex-row sm:items-end">
            <div>
              <p className="text-[11px] uppercase tracking-[0.22em] text-copper">What we handle</p>
              <h2 className="mt-3 max-w-xl font-display text-4xl tracking-tight">Tell us the job. We will put a crew on it.</h2>
            </div>
            <Link href="/services" className="text-sm underline decoration-line underline-offset-4 hover:decoration-ink">
              All services
            </Link>
          </div>
          <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {featured.map((service) => (
              <Link key={service.slug} href={`/services/${service.slug}`} className="group border border-line bg-sand">
                <div className="relative h-48 overflow-hidden bg-navy">
                  <Image
                    src={service.image}
                    alt=""
                    fill
                    className="object-cover transition duration-700 group-hover:scale-105"
                    sizes="(min-width: 1024px) 30vw, 100vw"
                  />
                </div>
                <div className="p-5">
                  <h3 className="font-display text-2xl">{service.title}</h3>
                  <p className="mt-2 text-sm leading-6 text-stone">{service.summary}</p>
                  <p className="mt-4 text-xs uppercase tracking-[0.16em] text-copper">Read more</p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section>
        <div className="mx-auto max-w-6xl px-5 py-20 sm:px-8">
          <p className="text-[11px] uppercase tracking-[0.22em] text-copper">Why crews come back</p>
          <h2 className="mt-3 max-w-2xl font-display text-4xl tracking-tight">A warehouse that behaves like an operator, not a storefront.</h2>
          <div className="mt-12 grid gap-px bg-line sm:grid-cols-2">
            {reasons.map((reason, index) => (
              <article key={reason.title} className="bg-sand p-7">
                <p className="font-display text-sm text-copper">0{index + 1}</p>
                <h3 className="mt-3 font-display text-2xl">{reason.title}</h3>
                <p className="mt-3 text-sm leading-7 text-stone">{reason.text}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-deep text-sand">
        <div className="mx-auto grid max-w-6xl gap-10 px-5 py-20 sm:px-8 lg:grid-cols-2 lg:items-center">
          <div>
            <p className="text-[11px] uppercase tracking-[0.22em] text-sand/50">On the floor</p>
            <h2 className="mt-3 font-display text-4xl tracking-tight">The loads that do not fit a rate card.</h2>
            <p className="mt-4 max-w-md text-sm leading-7 text-sand/70">
              If the freight is messy, late, or already rejected, say so in the first call. We would rather scope it honestly than discover it at the door.
            </p>
          </div>
          <ul className="grid gap-3 sm:grid-cols-2">
            {problems.map((item) => (
              <li key={item} className="border border-white/15 px-4 py-4 text-sm">
                {item}
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="bg-paper">
        <div className="mx-auto grid max-w-6xl gap-12 px-5 py-20 sm:px-8 lg:grid-cols-2">
          <div>
            <p className="text-[11px] uppercase tracking-[0.22em] text-copper">Project & on-demand</p>
            <h2 className="mt-3 font-display text-3xl">One move, then you are gone.</h2>
            <ul className="mt-6 space-y-3 text-sm">
              {services
                .filter((service) => service.group === "on-demand")
                .map((service) => (
                  <li key={service.slug}>
                    <Link href={`/services/${service.slug}`} className="hover:text-copper">
                      {service.title}
                    </Link>
                  </li>
                ))}
            </ul>
          </div>
          <div>
            <p className="text-[11px] uppercase tracking-[0.22em] text-copper">Recurring 3PL</p>
            <h2 className="mt-3 font-display text-3xl">A program that stays.</h2>
            <ul className="mt-6 space-y-3 text-sm">
              {services
                .filter((service) => service.group === "3pl" || service.group === "storage")
                .map((service) => (
                  <li key={service.slug}>
                    <Link href={`/services/${service.slug}`} className="hover:text-copper">
                      {service.title}
                    </Link>
                  </li>
                ))}
            </ul>
          </div>
        </div>
      </section>

      <section>
        <div className="mx-auto max-w-6xl px-5 py-20 sm:px-8">
          <p className="text-[11px] uppercase tracking-[0.22em] text-copper">From the dock</p>
          <h2 className="mt-3 font-display text-4xl tracking-tight">What shippers say after the truck leaves.</h2>
          <div className="mt-10 grid gap-5 lg:grid-cols-3">
            {reviews.map((review) => (
              <figure key={review.name} className="flex flex-col border border-line bg-paper p-6">
                <p className="text-copper" aria-label="5 out of 5 stars">★★★★★</p>
                <blockquote className="mt-4 flex-1 font-display text-xl leading-snug">{review.quote}</blockquote>
                <figcaption className="mt-6 text-sm text-stone">
                  <span className="block text-ink">{review.name}</span>
                  {review.role}
                </figcaption>
              </figure>
            ))}
          </div>
          <p className="mt-4 text-xs text-stone">Sample quotes for this demonstration, not live Google reviews.</p>
        </div>
      </section>

      <section className="border-y border-line bg-paper">
        <div className="mx-auto max-w-6xl px-5 py-20 sm:px-8">
          <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
            <div>
              <p className="text-[11px] uppercase tracking-[0.22em] text-copper">Recent work</p>
              <h2 className="mt-3 font-display text-4xl tracking-tight">Jobs the Tampa crew actually finished.</h2>
            </div>
            <Link href="/work" className="text-sm underline decoration-line underline-offset-4">
              All case notes
            </Link>
          </div>
          <div className="mt-10 grid gap-6 lg:grid-cols-3">
            {studies.map((study) => (
              <Link key={study.id} href={`/work#${study.id}`} className="group">
                <div className="relative h-52 overflow-hidden bg-navy">
                  <Image
                    src={study.image}
                    alt=""
                    fill
                    className="object-cover transition duration-700 group-hover:scale-105"
                    sizes="(min-width: 1024px) 30vw, 100vw"
                  />
                </div>
                <p className="mt-4 text-[11px] uppercase tracking-[0.16em] text-copper">{study.meta}</p>
                <h3 className="mt-2 font-display text-2xl leading-snug">{study.title}</h3>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <Suspense fallback={null}>
        <LatestPosts />
      </Suspense>

      <section>
        <div className="mx-auto max-w-6xl px-5 py-20 sm:px-8">
          <div className="grid gap-10 lg:grid-cols-[0.8fr_1.2fr] lg:items-start">
            <div>
              <p className="text-[11px] uppercase tracking-[0.22em] text-copper">FAQ</p>
              <h2 className="mt-3 font-display text-4xl tracking-tight">Before you book the door.</h2>
              <Link href="/faq" className="mt-4 inline-block text-sm underline decoration-line underline-offset-4">
                Full list
              </Link>
            </div>
            <FaqList limit={5} />
          </div>
        </div>
      </section>

      <section className="border-t border-line bg-paper" id="quote">
        <div className="mx-auto grid max-w-6xl gap-10 px-5 py-20 sm:px-8 lg:grid-cols-[0.85fr_1.15fr]">
          <div>
            <p className="text-[11px] uppercase tracking-[0.22em] text-copper">Free quote</p>
            <h2 className="mt-3 font-display text-4xl tracking-tight">Call {company.phoneDisplay} or send the freight.</h2>
            <ol className="mt-8 space-y-5">
              {[
                "A warehouse specialist calls you back.",
                "We learn the freight and say if we are the right building.",
                "You receive a written quote.",
                "You book the door and we receive.",
              ].map((step, index) => (
                <li key={step} className="flex gap-4">
                  <span className="font-display text-copper">0{index + 1}</span>
                  <span className="text-sm leading-6">{step}</span>
                </li>
              ))}
            </ol>
          </div>
          <QuoteForm />
        </div>
      </section>
    </>
  );
}
