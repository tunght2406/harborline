"use client";

import { useState } from "react";
import { faqs } from "@/lib/content";

export function FaqList({ limit }: { limit?: number }) {
  const items = typeof limit === "number" ? faqs.slice(0, limit) : faqs;
  const [open, setOpen] = useState<number | null>(0);

  return (
    <div className="divide-y divide-line border-y border-line">
      {items.map((item, index) => {
        const expanded = open === index;
        return (
          <div key={item.q}>
            <button
              type="button"
              className="flex w-full items-center justify-between gap-6 py-5 text-left"
              aria-expanded={expanded}
              onClick={() => setOpen(expanded ? null : index)}
            >
              <span className="font-display text-xl sm:text-2xl">{item.q}</span>
              <span className="text-copper" aria-hidden="true">
                {expanded ? "–" : "+"}
              </span>
            </button>
            {expanded ? <p className="max-w-3xl pb-5 text-sm leading-7 text-stone">{item.a}</p> : null}
          </div>
        );
      })}
    </div>
  );
}
