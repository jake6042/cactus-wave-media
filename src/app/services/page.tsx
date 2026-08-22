import type { Metadata } from "next";
import { ContactBlock } from "@/components/contact-block";
import { Process } from "@/components/process";
import { Reveal } from "@/components/reveal";
import { ServicesList } from "@/components/services-list";
import { InfraFeature } from "@/components/split-features";

export const metadata: Metadata = {
  title: "Services",
  description:
    "Websites, brand, hosting, domains, and campaigns from Cactus Wave Media.",
};

export default function ServicesPage() {
  return (
    <div className="pt-28">
      <section className="mx-auto max-w-7xl px-5 pb-8 pt-16 sm:px-8">
        <Reveal>
          <p className="text-[11px] tracking-[0.28em] uppercase text-copper">
            Services
          </p>
          <h1 className="display-lg mt-4 max-w-4xl font-serif text-bone">
            The site, the brand, the host.
          </h1>
          <p className="mt-6 max-w-2xl text-base leading-relaxed text-sand">
            We build the site, handle the host, and run the campaigns. Same
            room. Same hand.
          </p>
        </Reveal>
      </section>
      <ServicesList heading={false} />
      <InfraFeature />
      <Process />
      <ContactBlock />
    </div>
  );
}
