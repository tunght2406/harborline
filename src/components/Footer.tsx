import Link from "next/link";
import { Logo } from "@/components/Logo";
import { company, services } from "@/lib/content";

export function Footer() {
  return (
    <footer className="bg-deep text-sand">
      <div className="mx-auto grid max-w-6xl gap-12 px-5 py-16 sm:px-8 md:grid-cols-12">
        <div className="md:col-span-4">
          <Logo tone="light" />
          <p className="mt-5 max-w-xs text-sm leading-6 text-sand/70">
            Dock-high warehousing in Tampa for importers, carriers, brokers, and brands that need the freight handled properly.
          </p>
        </div>

        <div className="md:col-span-3">
          <p className="text-[11px] uppercase tracking-[0.18em] text-sand/45">Visit</p>
          <address className="mt-3 text-sm not-italic leading-6 text-sand/80">
            {company.address.map((line) => (
              <span key={line} className="block">
                {line}
              </span>
            ))}
          </address>
          <a className="mt-3 block text-sm text-sand hover:text-white" href={`tel:${company.phoneTel}`}>
            {company.phoneDisplay}
          </a>
          <p className="mt-2 text-sm text-sand/60">{company.hours}</p>
          <p className="text-sm text-sand/50">{company.afterHours}</p>
        </div>

        <div className="md:col-span-2">
          <p className="text-[11px] uppercase tracking-[0.18em] text-sand/45">Explore</p>
          <ul className="mt-3 space-y-2 text-sm text-sand/80">
            <li><Link href="/services" className="hover:text-white">Services</Link></li>
            <li><Link href="/about" className="hover:text-white">About</Link></li>
            <li><Link href="/work" className="hover:text-white">Work</Link></li>
            <li><Link href="/insights" className="hover:text-white">Insights</Link></li>
            <li><Link href="/faq" className="hover:text-white">FAQ</Link></li>
            <li><Link href="/contact" className="hover:text-white">Contact</Link></li>
          </ul>
        </div>

        <div className="md:col-span-3">
          <p className="text-[11px] uppercase tracking-[0.18em] text-sand/45">Services</p>
          <ul className="mt-3 space-y-2 text-sm text-sand/80">
            {services.filter((service) => service.featured).map((service) => (
              <li key={service.slug}>
                <Link href={`/services/${service.slug}`} className="hover:text-white">
                  {service.title}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
      <div className="border-t border-white/10">
        <div className="mx-auto flex max-w-6xl flex-col gap-2 px-5 py-5 text-xs text-sand/45 sm:flex-row sm:items-center sm:justify-between sm:px-8">
          <p>© 2026 {company.legal}. All rights reserved.</p>
          <p>
            Demonstration site. Name, reviews, address, and phone are placeholders.{" "}
            <Link href="/admin" className="underline hover:text-sand">Staff</Link>
          </p>
        </div>
      </div>
    </footer>
  );
}
