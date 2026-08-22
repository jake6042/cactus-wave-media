import type { Metadata } from "next";
import { ButtonLink } from "@/components/button-link";
import { Reveal } from "@/components/reveal";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Contact",
  description: "Start a project with Cactus Wave Media.",
};

export default function ContactPage() {
  return (
    <div className="pt-28">
      <section className="mx-auto max-w-7xl px-5 pb-28 pt-16 sm:px-8">
        <Reveal className="max-w-2xl">
          <p className="text-[11px] tracking-[0.28em] uppercase text-copper">
            Contact
          </p>
          <h1 className="display-lg mt-4 font-serif text-bone">
            Have a project?
          </h1>
          <p className="mt-6 text-base leading-relaxed text-sand">
            A new site, a domain that should already be yours — or all of it.
            A short note is enough. We reply like humans.
          </p>
          <div className="mt-10 flex flex-wrap items-center gap-x-8 gap-y-4">
            <ButtonLink href="/#contact">Start a project</ButtonLink>
            <a
              href={`mailto:${site.email}`}
              className="break-words text-sm text-copper"
            >
              {site.email}
            </a>
          </div>
        </Reveal>
      </section>
    </div>
  );
}
