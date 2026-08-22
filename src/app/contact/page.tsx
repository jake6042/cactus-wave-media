import type { Metadata } from "next";
import { ContactForm } from "@/components/contact-form";
import { Reveal } from "@/components/reveal";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Contact",
  description: "Start a project with Cactus Wave Media.",
};

export default function ContactPage() {
  return (
    <div className="pt-28">
      <section className="mx-auto grid max-w-7xl gap-16 px-5 pb-28 pt-16 sm:px-8 lg:grid-cols-12">
        <Reveal className="lg:col-span-5">
          <p className="text-[11px] tracking-[0.28em] uppercase text-copper">
            Contact
          </p>
          <h1 className="mt-4 font-serif text-5xl leading-[0.95] text-bone sm:text-7xl">
            Let’s make the expensive thing.
          </h1>
          <p className="mt-6 text-base leading-relaxed text-sand">
            A new site, a domain that should already be yours — or all of
            it. Tell us what you need.
          </p>
          <a
            href={`mailto:${site.email}`}
            className="mt-8 inline-block text-sm text-copper"
          >
            {site.email}
          </a>
        </Reveal>
        <Reveal delay={2} className="lg:col-span-6 lg:col-start-7">
          <ContactForm />
        </Reveal>
      </section>
    </div>
  );
}
