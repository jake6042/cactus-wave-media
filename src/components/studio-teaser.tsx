import { ButtonLink } from "@/components/button-link";
import { Reveal } from "@/components/reveal";

export function StudioTeaser() {
  return (
    <section id="studio" className="scroll-mt-24 mx-auto max-w-7xl px-5 py-16 sm:px-8 sm:py-24 lg:py-28">
      <Reveal>
        <p className="text-[11px] tracking-[0.28em] uppercase text-copper">
          The studio
        </p>
        <h2 className="display-lg mt-6 max-w-4xl font-serif text-bone">
          One studio. Site, host, campaign.
        </h2>
        <p className="mt-8 max-w-2xl text-base leading-relaxed text-sand sm:text-lg">
          Cactus Wave Media is for companies that want to look expensive on the
          internet. We make the site, handle the host, and stay after launch.
          No handoffs. No seven-vendor pile.
        </p>
        <div className="mt-10">
          <ButtonLink href="/#studio" variant="ghost">
            Meet the studio
          </ButtonLink>
        </div>
      </Reveal>
    </section>
  );
}
