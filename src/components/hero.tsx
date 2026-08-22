import { BrandMark } from "@/components/brand";
import { ButtonLink } from "@/components/button-link";
import { Tide } from "@/components/tide";

export function Hero() {
  return (
    <section className="relative isolate flex flex-col overflow-hidden heat">
      <p className="pointer-events-none absolute top-28 left-5 hidden text-[10px] tracking-[0.42em] uppercase text-sand [writing-mode:vertical-rl] rotate-180 sm:left-8 lg:block">
        Cactus Wave Media
      </p>

      <div className="relative z-10 mx-auto w-full max-w-7xl px-5 pb-16 pt-28 sm:px-8 sm:pb-20 sm:pt-32">
        <div className="flex flex-col gap-10 lg:flex-row lg:items-center lg:justify-between lg:gap-16">
          <div className="min-w-0 flex-1">
            <p className="hero-rise text-[11px] tracking-[0.28em] uppercase text-copper">
              Web · Hosting · Campaigns
            </p>
            <h1 className="hero-rise hero-rise-2 mt-6 max-w-5xl font-serif text-[clamp(3.6rem,12vw,8.6rem)] leading-[0.86] tracking-tight text-bone">
              Presence
              <br />
              <span className="italic text-bone-dim">that holds.</span>
            </h1>
            <p className="hero-rise hero-rise-3 mt-8 max-w-xl text-base leading-relaxed text-sand sm:text-lg">
              Sites that look expensive. Hosting and domains handled. Campaigns
              when you need them.
            </p>
            <div className="hero-rise hero-rise-4 mt-10 flex flex-wrap items-center gap-4">
              <ButtonLink href="/contact">Start a project</ButtonLink>
              <ButtonLink href="/work" variant="ghost">
                Selected work
              </ButtonLink>
            </div>
          </div>

          <BrandMark
            surface="ink"
            size={448}
            className="hero-rise hero-rise-3 mx-auto shrink-0 !h-[264px] !w-[264px] sm:!h-[360px] sm:!w-[360px] lg:-my-8 lg:-mr-12 lg:mx-0 lg:!h-[448px] lg:!w-[448px]"
          />
        </div>
      </div>

      <Tide />

      <div className="relative z-10 border-t border-line">
        <div className="mx-auto flex max-w-7xl flex-col gap-3 px-5 py-4 text-[11px] tracking-[0.16em] uppercase text-sand sm:flex-row sm:justify-between sm:px-8">
          <span>Desert-born studio</span>
          <span>Web · Hosting · Campaigns</span>
          <span>Working worldwide</span>
        </div>
      </div>
    </section>
  );
}
