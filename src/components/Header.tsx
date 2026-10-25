"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { Logo } from "@/components/Logo";
import { company, groupLabels, servicesByGroup, type ServiceGroup } from "@/lib/content";

const links = [
  { href: "/services", label: "Services" },
  { href: "/about", label: "About" },
  { href: "/work", label: "Work" },
  { href: "/insights", label: "Insights" },
  { href: "/faq", label: "FAQ" },
  { href: "/contact", label: "Contact" },
];

const groups: ServiceGroup[] = ["on-demand", "storage", "3pl"];

function isActive(pathname: string, href: string) {
  return pathname === href || pathname.startsWith(`${href}/`);
}

export function Header() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [servicesOpen, setServicesOpen] = useState(false);

  useEffect(() => {
    setOpen(false);
    setServicesOpen(false);
  }, [pathname]);

  return (
    <header className="sticky top-0 z-40">
      <div className="hidden bg-deep text-[12px] text-sand/75 sm:block">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-5 py-2 sm:px-8">
          <p>Dock appointments required · Tampa, Florida</p>
          <p>
            {company.hours}
            <span className="px-2 text-sand/30">/</span>
            <a className="text-sand hover:text-white" href={`tel:${company.phoneTel}`}>
              {company.phoneDisplay}
            </a>
          </p>
        </div>
      </div>

      <div className="border-b border-line bg-sand">
        <div className="mx-auto flex h-16 max-w-6xl items-center justify-between gap-4 px-5 sm:px-8">
          <Logo />

          <nav className="hidden items-center gap-5 min-[900px]:flex" aria-label="Primary">
            <div className="group relative">
              <Link
                href="/services"
                className={`text-sm ${isActive(pathname, "/services") ? "text-ink" : "text-stone hover:text-ink"}`}
              >
                Services
              </Link>
              <div className="invisible absolute left-1/2 top-full z-20 w-[680px] -translate-x-1/2 pt-4 opacity-0 transition group-hover:visible group-hover:opacity-100 group-focus-within:visible group-focus-within:opacity-100">
                <div className="grid grid-cols-3 gap-6 border border-line bg-paper p-6 shadow-xl">
                  {groups.map((group) => (
                    <div key={group}>
                      <p className="text-[11px] uppercase tracking-[0.18em] text-copper">
                        {groupLabels[group]}
                      </p>
                      <ul className="mt-3 space-y-2">
                        {servicesByGroup(group).map((service) => (
                          <li key={service.slug}>
                            <Link
                              href={`/services/${service.slug}`}
                              className="text-sm text-ink/80 hover:text-ink"
                            >
                              {service.title}
                            </Link>
                          </li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>
              </div>
            </div>
            {links.slice(1).map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={`text-sm ${isActive(pathname, link.href) ? "text-ink" : "text-stone hover:text-ink"}`}
              >
                {link.label}
              </Link>
            ))}
          </nav>

          <div className="flex items-center gap-3">
            <Link
              href="/contact"
              className="hidden h-10 items-center bg-ink px-4 text-sm text-sand hover:bg-navy sm:inline-flex"
            >
              Get a quote
            </Link>
            <button
              type="button"
              className="grid h-10 w-10 place-items-center border border-line min-[900px]:hidden"
              aria-expanded={open}
              aria-controls="mobile-nav"
              onClick={() => setOpen((value) => !value)}
            >
              <span className="sr-only">Menu</span>
              <svg viewBox="0 0 24 24" className="h-5 w-5" aria-hidden="true">
                {open ? (
                  <path d="M6 6l12 12M18 6 6 18" stroke="currentColor" strokeWidth="1.6" />
                ) : (
                  <path d="M4 7h16M4 12h16M4 17h16" stroke="currentColor" strokeWidth="1.6" />
                )}
              </svg>
            </button>
          </div>
        </div>
      </div>

      {open ? (
        <div id="mobile-nav" className="border-b border-line bg-paper min-[900px]:hidden">
          <nav className="mx-auto flex max-w-6xl flex-col px-5 py-4 sm:px-8" aria-label="Mobile">
            <button
              type="button"
              className="flex items-center justify-between py-3 text-left text-base"
              aria-expanded={servicesOpen}
              onClick={() => setServicesOpen((value) => !value)}
            >
              Services
              <span aria-hidden="true">{servicesOpen ? "–" : "+"}</span>
            </button>
            {servicesOpen ? (
              <div className="space-y-4 pb-3 pl-3">
                {groups.map((group) => (
                  <div key={group}>
                    <p className="text-[11px] uppercase tracking-[0.16em] text-copper">
                      {groupLabels[group]}
                    </p>
                    <ul className="mt-2 space-y-2">
                      {servicesByGroup(group).map((service) => (
                        <li key={service.slug}>
                          <Link href={`/services/${service.slug}`} className="text-sm text-stone">
                            {service.title}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            ) : null}
            {links.slice(1).map((link) => (
              <Link key={link.href} href={link.href} className="border-t border-line py-3">
                {link.label}
              </Link>
            ))}
            <Link href="/contact" className="mt-3 inline-flex h-11 items-center justify-center bg-ink text-sand">
              Get a quote
            </Link>
            <a href={`tel:${company.phoneTel}`} className="py-3 text-sm text-stone">
              Call {company.phoneDisplay}
            </a>
          </nav>
        </div>
      ) : null}
    </header>
  );
}
