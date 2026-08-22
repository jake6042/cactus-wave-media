import { ButtonLink } from "@/components/button-link";
import { Reveal } from "@/components/reveal";
import { site } from "@/lib/site";

export function ContactBlock() {
  return (
    <section id="contact" className="scroll-mt-24 border-t border-line bg-ink-2">
      <div className="mx-auto max-w-7xl px-5 py-16 sm:px-8 sm:py-24 lg:py-28">
        <Reveal className="max-w-2xl">
          <p className="text-[11px] tracking-[0.28em] uppercase text-copper">
            Contact
          </p>
          <h2 className="display-lg mt-4 font-serif text-bone">
            Have a project?
          </h2>
          <p className="mt-6 text-base leading-relaxed text-sand">
            A new site, a catalog that needs to look expensive, a domain that
            should have been yours last year. A short note is enough.
          </p>
          <div className="mt-10 flex flex-wrap items-center gap-x-8 gap-y-4">
            <ButtonLink href="/#contact">Start a project</ButtonLink>
            <a
              href={`mailto:${site.email}`}
              className="break-words text-sm tracking-[0.08em] text-copper"
            >
              {site.email}
            </a>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
