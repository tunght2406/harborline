import type { Metadata } from "next";
import { Fraunces, Outfit } from "next/font/google";
import { company } from "@/lib/content";
import "./globals.css";

const outfit = Outfit({
  subsets: ["latin"],
  variable: "--font-outfit",
});

const fraunces = Fraunces({
  subsets: ["latin"],
  variable: "--font-fraunces",
});

export const metadata: Metadata = {
  title: {
    default: "Harborline Warehousing | Tampa Warehouse Services",
    template: "%s · Harborline",
  },
  description:
    "Dock-high warehousing in Tampa for container unloading, restacks, transloading, storage, and 3PL fulfillment. Appointments required.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" className={`${outfit.variable} ${fraunces.variable} h-full antialiased`}>
      <body className="flex min-h-full flex-col">
        {children}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "LocalBusiness",
              name: company.legal,
              telephone: company.phoneTel,
              address: {
                "@type": "PostalAddress",
                streetAddress: company.address[0],
                addressLocality: "Tampa",
                addressRegion: "FL",
                postalCode: "33605",
              },
            }),
          }}
        />
      </body>
    </html>
  );
}
