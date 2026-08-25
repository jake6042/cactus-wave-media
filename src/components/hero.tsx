import { ButtonLink } from "@/components/button-link";
import { HeroMark } from "@/components/hero-mark";
import { Tide } from "@/components/tide";

export function Hero() {
  return (
    <section className="relative isolate flex flex-col overflow-x-clip overflow-y-hidden heat">
      <div className="relative z-10 mx-auto w-full max-w-7xl px-5 pb-12 pt-24 sm:px-8 sm:pb-16 sm:pt-32 lg:pb-20">
        <div className="flex flex-col items-start gap-8 min-[1100px]:flex-row min-[1100px]:items-center min-[1100px]:justify-between min-[1100px]:gap-10 xl:gap-16">
          <div className="min-w-0 w-full flex-1">
            <p className="hero-rise text-[11px] tracking-[0.28em] uppercase text-copper">
              Web · Hosting · Campaigns
            </p>
            <h1 className="hero-rise hero-rise-2 display-xl mt-5 max-w-5xl font-serif tracking-tight text-bone sm:mt-6">
              Presence
              <br />
              <span className="italic text-bone-dim">that holds.</span>
            </h1>
            <p className="hero-rise hero-rise-3 mt-6 max-w-xl text-[0.95rem] leading-relaxed text-sand sm:mt-8 sm:text-lg">
              Sites that look expensive. Hosting and domains handled. Campaigns
              when you need them.
            </p>
            <div className="hero-rise hero-rise-4 mt-8 flex flex-wrap items-center gap-3 sm:mt-10 sm:gap-4">
              <ButtonLink href="/#contact">Start a project</ButtonLink>
              {/* Hidden until the Work / Selected work section is shown again */}
              {/* <ButtonLink href="/#work" variant="ghost">
                Selected work
              </ButtonLink> */}
            </div>
          </div>

          <HeroMark />
        </div>
      </div>

      <Tide />

      <div className="relative z-10 border-t border-line">
        <div className="mx-auto flex max-w-7xl flex-col gap-2 px-5 py-4 text-[10px] tracking-[0.12em] uppercase text-sand sm:flex-row sm:flex-wrap sm:justify-between sm:gap-3 sm:px-8 sm:text-[11px] sm:tracking-[0.16em]">
          <span>Desert-born studio</span>
          <span>Web · Hosting · Campaigns</span>
          <span>Working worldwide</span>
        </div>
      </div>
    </section>
  );
}
