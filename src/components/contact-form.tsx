"use client";

import { useState, type FormEvent } from "react";
import { site } from "@/lib/site";

export function ContactForm() {
  const [sent, setSent] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [pending, setPending] = useState(false);

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError(null);
    setPending(true);

    const data = new FormData(event.currentTarget);
    const payload = {
      name: String(data.get("name") ?? "").trim(),
      email: String(data.get("email") ?? "").trim(),
      company: String(data.get("company") ?? "").trim(),
      message: String(data.get("message") ?? "").trim(),
    };

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const result = (await response.json().catch(() => ({}))) as { error?: string };
      if (!response.ok) {
        setError(result.error ?? "Could not send the note.");
        return;
      }
      setSent(true);
    } catch {
      setError("Could not send the note.");
    } finally {
      setPending(false);
    }
  }

  if (sent) {
    return (
      <div>
        <p className="font-serif text-2xl leading-tight text-ink">
          Received. We’ll write back.
        </p>
        <p className="mt-3 text-[13px] leading-relaxed text-ink/55">
          It lands in{" "}
          <a
            className="text-brass underline-offset-4 hover:underline"
            href={`mailto:${site.email}`}
          >
            {site.email}
          </a>
          .
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={onSubmit} className="grid gap-5">
      <div className="grid gap-5 sm:grid-cols-2">
        <Field label="Name" name="name" required autoComplete="name" />
        <Field
          label="Email"
          name="email"
          type="email"
          required
          autoComplete="email"
        />
      </div>
      <Field label="Company" name="company" autoComplete="organization" optional />
      <label className="block">
        <span className="text-[10px] tracking-[0.2em] uppercase text-sage">
          What you need
        </span>
        <textarea
          name="message"
          required
          rows={3}
          placeholder="A site, a domain, a campaign — a sentence is enough."
          className="mt-1.5 w-full resize-none border-0 border-b border-ink/15 bg-transparent py-2 text-[15px] leading-relaxed text-ink outline-none placeholder:text-ink/30 focus:border-brass"
        />
      </label>
      {error ? (
        <p className="text-[13px] leading-relaxed text-ink/70">{error}</p>
      ) : null}
      <button
        type="submit"
        disabled={pending}
        className="mt-1 min-h-11 justify-self-start rounded-full bg-brass px-7 py-2.5 text-[11px] font-medium tracking-[0.16em] uppercase text-ink transition-colors hover:bg-ink hover:text-bone disabled:opacity-50"
      >
        {pending ? "Sending…" : "Send the note"}
      </button>
    </form>
  );
}

function Field({
  label,
  name,
  type = "text",
  required,
  optional,
  autoComplete,
}: {
  label: string;
  name: string;
  type?: string;
  required?: boolean;
  optional?: boolean;
  autoComplete?: string;
}) {
  return (
    <label className="block">
      <span className="text-[10px] tracking-[0.2em] uppercase text-sage">
        {label}
        {optional ? (
          <span className="ml-2 tracking-[0.12em] text-ink/35">Optional</span>
        ) : null}
      </span>
      <input
        name={name}
        type={type}
        required={required}
        autoComplete={autoComplete}
        className="mt-1.5 w-full border-0 border-b border-ink/15 bg-transparent py-2 text-[15px] text-ink outline-none focus:border-brass"
      />
    </label>
  );
}
