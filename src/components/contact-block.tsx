import { ContactForm } from "@/components/contact-form";
import { Reveal } from "@/components/reveal";
import { site } from "@/lib/site";

export function ContactBlock() {
  return (
    <section id="contact" className="scroll-mt-24 border-t border-line bg-ink-2">
      <div className="mx-auto grid max-w-7xl gap-14 px-5 py-28 sm:px-8 lg:grid-cols-12">
        <Reveal className="lg:col-span-5">
          <p className="text-[11px] tracking-[0.28em] uppercase text-copper">
            Start a project
          </p>
          <h2 className="mt-4 font-serif text-4xl leading-tight text-bone sm:text-6xl">
            Tell us what you’re building.
          </h2>
          <p className="mt-6 text-base leading-relaxed text-sand">
            A new site, a catalog that needs to look expensive, a domain that
            should have been yours last year — write it down. We reply like
            humans.
          </p>
          <a
            href={`mailto:${site.email}`}
            className="mt-8 inline-block text-sm tracking-[0.08em] text-copper"
          >
            {site.email}
          </a>
        </Reveal>
        <Reveal delay={2} className="lg:col-span-6 lg:col-start-7">
          <ContactForm />
        </Reveal>
      </div>
    </section>
  );
}
