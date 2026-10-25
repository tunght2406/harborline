"use client";

import { useState, type FormEvent } from "react";
import { services } from "@/lib/content";

const fields = [
  { name: "first", label: "First name", type: "text", autoComplete: "given-name" },
  { name: "last", label: "Last name", type: "text", autoComplete: "family-name" },
  { name: "email", label: "Email", type: "email", autoComplete: "email" },
  { name: "phone", label: "Phone", type: "tel", autoComplete: "tel" },
] as const;

export function QuoteForm() {
  const [selected, setSelected] = useState<string[]>([]);
  const [sent, setSent] = useState(false);
  const [error, setError] = useState("");

  function toggle(slug: string) {
    setSelected((current) =>
      current.includes(slug) ? current.filter((item) => item !== slug) : [...current, slug],
    );
  }

  function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const email = String(data.get("email") ?? "");
    const first = String(data.get("first") ?? "");
    const message = String(data.get("message") ?? "");
    if (!first.trim() || !email.includes("@") || message.trim().length < 8 || selected.length === 0) {
      setError("Add your name, a valid email, at least one service, and a short note about the freight.");
      return;
    }
    setError("");
    setSent(true);
  }

  if (sent) {
    return (
      <div className="border border-line bg-paper p-8">
        <p className="text-[11px] uppercase tracking-[0.18em] text-copper">Request received</p>
        <h3 className="mt-3 font-display text-3xl">We have the details.</h3>
        <p className="mt-3 text-sm leading-6 text-stone">
          On a live site this form would reach the dock office. This demonstration confirms on screen only — connect it to email or your CRM before you publish.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={onSubmit} className="border border-line bg-paper p-6 sm:p-8" noValidate>
      <div className="grid gap-4 sm:grid-cols-2">
        {fields.map((field) => (
          <label key={field.name} className="block text-sm">
            <span className="text-stone">{field.label}</span>
            <input
              name={field.name}
              type={field.type}
              autoComplete={field.autoComplete}
              required
              className="mt-1.5 h-11 w-full border border-line bg-sand/40 px-3 outline-none focus:border-ink"
            />
          </label>
        ))}
      </div>

      <fieldset className="mt-5">
        <legend className="text-sm text-stone">Services needed</legend>
        <div className="mt-2 flex flex-wrap gap-2">
          {services.map((service) => {
            const on = selected.includes(service.slug);
            return (
              <button
                key={service.slug}
                type="button"
                aria-pressed={on}
                onClick={() => toggle(service.slug)}
                className={`border px-3 py-1.5 text-left text-xs ${on ? "border-ink bg-ink text-sand" : "border-line bg-white text-ink hover:border-ink"}`}
              >
                {service.title}
              </button>
            );
          })}
        </div>
      </fieldset>

      <label className="mt-5 block text-sm">
        <span className="text-stone">What is moving, and when?</span>
        <textarea
          name="message"
          required
          rows={5}
          placeholder="Equipment, pallet or carton count, photos you can send, and the timing."
          className="mt-1.5 w-full border border-line bg-sand/40 px-3 py-3 outline-none focus:border-ink"
        />
      </label>

      {error ? (
        <p className="mt-3 text-sm text-copper" role="alert">
          {error}
        </p>
      ) : null}

      <button type="submit" className="mt-5 inline-flex h-11 items-center bg-ink px-5 text-sm text-sand hover:bg-navy">
        Request a quote
      </button>
    </form>
  );
}
