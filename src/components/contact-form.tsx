"use client";

import { useState, type FormEvent } from "react";
import { site } from "@/lib/site";

const interests = [
  "Website",
  "Design",
  "Brand",
  "Hosting / domain",
  "Growth",
  "Retainer",
];

export function ContactForm() {
  const [sent, setSent] = useState(false);

  function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const name = String(data.get("name") ?? "").trim();
    const email = String(data.get("email") ?? "").trim();
    const company = String(data.get("company") ?? "").trim();
    const interest = String(data.get("interest") ?? "").trim();
    const message = String(data.get("message") ?? "").trim();

    const body = [
      `Name: ${name}`,
      `Email: ${email}`,
      company ? `Company: ${company}` : null,
      interest ? `Interest: ${interest}` : null,
      "",
      message,
    ]
      .filter((line) => line !== null)
      .join("\n");

    const href = `mailto:${site.email}?subject=${encodeURIComponent(
      `Project inquiry — ${name || company || "Cactus Wave"}`,
    )}&body=${encodeURIComponent(body)}`;

    window.location.href = href;
    setSent(true);
  }

  if (sent) {
    return (
      <div className="border border-line bg-ink-2 p-8">
        <p className="font-serif text-3xl text-bone">Your mail client is opening.</p>
        <p className="mt-4 text-sm leading-relaxed text-sand">
          If it doesn’t, write directly to{" "}
          <a className="text-copper underline-offset-4 hover:underline" href={`mailto:${site.email}`}>
            {site.email}
          </a>
          .
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={onSubmit} className="grid gap-6">
      <div className="grid gap-6 sm:grid-cols-2">
        <Field label="Name" name="name" required autoComplete="name" />
        <Field label="Email" name="email" type="email" required autoComplete="email" />
      </div>
      <div className="grid gap-6 sm:grid-cols-2">
        <Field label="Company" name="company" autoComplete="organization" />
        <label className="block">
          <span className="text-[11px] tracking-[0.18em] uppercase text-sand">
            What do you need
          </span>
          <select
            name="interest"
            className="mt-2 w-full border-0 border-b border-line-strong bg-transparent py-3 text-bone outline-none focus:border-copper"
            defaultValue="Website"
          >
            {interests.map((item) => (
              <option key={item} value={item} className="bg-ink text-bone">
                {item}
              </option>
            ))}
          </select>
        </label>
      </div>
      <label className="block">
        <span className="text-[11px] tracking-[0.18em] uppercase text-sand">
          Tell us about the work
        </span>
        <textarea
          name="message"
          required
          rows={5}
          className="mt-2 w-full resize-y border-0 border-b border-line-strong bg-transparent py-3 text-bone outline-none focus:border-copper"
        />
      </label>
      <button
        type="submit"
        className="justify-self-start rounded-full bg-copper px-8 py-3 text-[13px] font-medium tracking-[0.14em] uppercase text-ink transition-colors hover:bg-bone"
      >
        Send the note
      </button>
    </form>
  );
}

function Field({
  label,
  name,
  type = "text",
  required,
  autoComplete,
}: {
  label: string;
  name: string;
  type?: string;
  required?: boolean;
  autoComplete?: string;
}) {
  return (
    <label className="block">
      <span className="text-[11px] tracking-[0.18em] uppercase text-sand">
        {label}
      </span>
      <input
        name={name}
        type={type}
        required={required}
        autoComplete={autoComplete}
        className="mt-2 w-full border-0 border-b border-line-strong bg-transparent py-3 text-bone outline-none focus:border-copper"
      />
    </label>
  );
}
