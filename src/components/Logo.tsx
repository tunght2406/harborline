import Link from "next/link";

export function Logo({ tone = "dark" }: { tone?: "dark" | "light" }) {
  const mark = tone === "light" ? "bg-sand text-ink" : "bg-ink text-sand";
  const word = tone === "light" ? "text-sand" : "text-ink";
  const sub = tone === "light" ? "text-sand/60" : "text-stone";

  return (
    <Link href="/" className="flex items-center gap-2.5">
      <span className={`grid h-9 w-9 place-items-center rounded-sm ${mark}`}>
        <svg viewBox="0 0 32 32" className="h-5 w-5" aria-hidden="true">
          <path
            d="M4 14.5 16 5l12 9.5V27H4V14.5Z"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.7"
          />
          <path d="M13 27V18h6v9" fill="none" stroke="currentColor" strokeWidth="1.7" />
        </svg>
      </span>
      <span className="leading-none">
        <span className={`block font-display text-[1.35rem] tracking-tight ${word}`}>
          Harborline
        </span>
        <span className={`mt-1 block text-[10px] uppercase tracking-[0.22em] ${sub}`}>
          Warehousing
        </span>
      </span>
    </Link>
  );
}
