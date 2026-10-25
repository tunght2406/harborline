import Link from "next/link";
import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";

export default function NotFound() {
  return (
    <>
      <Header />
      <section className="mx-auto max-w-3xl flex-1 px-5 py-24 sm:px-8">
      <p className="text-[11px] uppercase tracking-[0.22em] text-copper">404</p>
      <h1 className="mt-3 font-display text-4xl">That page is not on the floor.</h1>
      <p className="mt-4 text-stone">The link may be old. The services list is a better place to start.</p>
      <Link href="/services" className="mt-8 inline-flex h-11 items-center bg-ink px-5 text-sm text-sand">
        View services
      </Link>
      </section>
      <Footer />
    </>
  );
}
