import { Reveal } from "@/components/reveal";
import { SectionHeading } from "@/components/section-heading";
import { platforms } from "@/lib/site";

export function Platforms() {
  return (
    <section
      id="built-on"
      className="scroll-mt-24 border-y border-line bg-ink-2"
    >
      <div className="mx-auto max-w-7xl px-5 py-16 sm:px-8 sm:py-24 lg:py-28">
        <SectionHeading
          eyebrow="Built on"
          title="Custom. Or whatever you already have."
          body="From scratch when it should be. WordPress, Shopify, and the platforms people actually run — we meet you there."
        />

        <ul className="mt-12 grid gap-x-10 sm:mt-16 sm:grid-cols-2 xl:grid-cols-4">
          {platforms.map((platform, index) => (
            <li
              key={platform.name}
              className="border-t border-line py-7"
            >
              <Reveal delay={(Math.min(index % 4, 4) as 0 | 1 | 2 | 3 | 4)}>
                <p className="font-serif text-[clamp(1.7rem,3vw,2.15rem)] tracking-tight text-bone">
                  {platform.name}
                </p>
                <p className="mt-2 text-sm leading-relaxed text-sand">
                  {platform.note}
                </p>
              </Reveal>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
