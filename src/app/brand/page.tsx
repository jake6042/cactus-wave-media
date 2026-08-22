import type { Metadata } from "next";
import { BrandMark } from "@/components/brand/brand-mark";
import { Wordmark } from "@/components/brand/wordmark";
import { Reveal } from "@/components/reveal";
import {
  brand,
  brandColors,
  brandDonts,
  brandDos,
  brandSupports,
  brandType,
  brandUsage,
  brandVoice,
} from "@/lib/brand";
import {
  brandPackBase,
  brandPackFolderUrl,
  brandPackGroups,
} from "@/lib/brand-pack";

export const metadata: Metadata = {
  title: "Brand",
  description: `The Cactus Wave Media identity — the mark, the field, the type. ${brand.idea}`,
};

const primaries = Object.values(brandColors);
const supports = [brandSupports.ink2, brandSupports.boneDim, brandSupports.sand];

function Eyebrow({ children }: { children: string }) {
  return (
    <p className="text-[11px] tracking-[0.28em] uppercase text-copper">
      {children}
    </p>
  );
}

export default function BrandPage() {
  return (
    <div className="pt-28">
      <section className="mx-auto max-w-7xl px-5 pb-20 pt-16 sm:px-8">
        <Reveal>
          <div className="flex flex-col gap-10 lg:flex-row lg:items-end lg:justify-between">
            <div className="max-w-3xl">
              <Eyebrow>Identity</Eyebrow>
              <h1 className="display-xl mt-4 font-serif text-bone">
                The mark
                <br />
                <span className="italic text-bone-dim">holds still.</span>
              </h1>
              <p className="mt-8 max-w-xl text-lg leading-relaxed text-sand">
                {brand.idea} Not a mascot. A jeweler&apos;s stamp for a studio
                that writes the site, the brand, and the host.
              </p>
            </div>
            <BrandMark size="xl" className="self-start lg:self-end" />
          </div>
        </Reveal>
      </section>

      <section className="border-y border-line">
        <div className="mx-auto grid max-w-7xl md:grid-cols-2">
          <div className="flex min-h-[28rem] flex-col justify-between bg-ink px-5 py-12 sm:px-8">
            <Eyebrow>On ink</Eyebrow>
            <div className="flex flex-1 items-center justify-center py-10">
              <BrandMark
                surface="ink"
                fluid
                className="size-[min(46vw,12.5rem)]"
              />
            </div>
            <p className="font-mono text-[11px] tracking-[0.16em] uppercase text-sand">
              Bone on {brandColors.ink.hex}
            </p>
          </div>
          <div className="flex min-h-[28rem] flex-col justify-between bg-bone px-5 py-12 text-ink sm:px-8">
            <p className="text-[11px] tracking-[0.28em] uppercase text-copper-deep">
              On bone
            </p>
            <div className="flex flex-1 items-center justify-center py-10">
              <BrandMark
                surface="bone"
                fluid
                className="size-[min(46vw,12.5rem)]"
              />
            </div>
            <p className="font-mono text-[11px] tracking-[0.16em] uppercase text-ink/45">
              Ink on {brandColors.bone.hex}
            </p>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-5 py-28 sm:px-8">
        <Reveal>
          <Eyebrow>Lockup</Eyebrow>
          <h2 className="display-lg mt-4 max-w-3xl font-serif text-bone">
            The name is set in type.
          </h2>
          <p className="mt-5 max-w-xl text-base leading-relaxed text-sand">
            {brandUsage.wordmark}
          </p>
        </Reveal>
        <div className="mt-16 grid gap-6 md:grid-cols-3">
          <Reveal className="border border-line bg-ink-2 px-8 py-10">
            <p className="text-[11px] tracking-[0.2em] uppercase text-sand">
              Horizontal
            </p>
            <div className="mt-10">
              <Wordmark />
            </div>
          </Reveal>
          <Reveal delay={1} className="border border-line bg-ink-2 px-8 py-10">
            <p className="text-[11px] tracking-[0.2em] uppercase text-sand">
              Compact
            </p>
            <div className="mt-10">
              <Wordmark compact />
            </div>
          </Reveal>
          <Reveal delay={2} className="border border-line bg-ink-2 px-8 py-10">
            <p className="text-[11px] tracking-[0.2em] uppercase text-sand">
              Stacked
            </p>
            <div className="mt-10 flex justify-center">
              <Wordmark stacked markSize="lg" />
            </div>
          </Reveal>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-5 py-28 sm:px-8">
          <Reveal>
            <Eyebrow>The kit</Eyebrow>
            <h2 className="display-lg mt-4 max-w-3xl font-serif text-bone">
              Files, not a second mark.
            </h2>
            <p className="mt-5 max-w-xl text-base leading-relaxed text-sand">
              The lockup on this page is type plus the stamp. The downloadable
              plates were made in Canva from that same stamp. Free still
              blocks transparent PNG — use ink and bone fields, or the site
              mask.{" "}
              <a
                href={brandPackFolderUrl}
                className="text-bone underline-offset-4 hover:underline"
              >
                Open the Canva folder
              </a>
              .
            </p>
          </Reveal>
          <div className="mt-16 space-y-14">
            {brandPackGroups.map((group) => {
              const items = group.items.filter((item) => !item.file.includes("-1x."));
              return (
                <div key={group.title}>
                  <p className="text-[11px] tracking-[0.22em] uppercase text-copper">
                    {group.title}
                  </p>
                  <p className="mt-2 max-w-xl text-sm text-sand">{group.lede}</p>
                  <ul className="mt-5 divide-y divide-line border-y border-line">
                    {items.map((item) => (
                      <li key={item.file}>
                        <a
                          href={`${brandPackBase}/${item.file}`}
                          download
                          className="flex flex-col gap-1 py-4 no-underline transition-colors hover:text-bone sm:flex-row sm:items-baseline sm:justify-between sm:gap-8"
                        >
                          <span className="font-mono text-[12px] tracking-[0.04em] text-bone">
                            {item.file.split("/").pop()}
                          </span>
                          <span className="text-sm text-sand sm:text-right">
                            {item.use}
                          </span>
                        </a>
                      </li>
                    ))}
                  </ul>
                </div>
              );
            })}
          </div>
      </section>

      <section className="border-y border-line bg-ink-2">
        <div className="mx-auto max-w-7xl px-5 py-28 sm:px-8">
          <Reveal>
            <Eyebrow>Clear space</Eyebrow>
            <h2 className="display-lg mt-4 max-w-3xl font-serif text-bone">
              Air around the stamp.
            </h2>
            <p className="mt-5 max-w-xl text-base leading-relaxed text-sand">
              {brandUsage.clearSpace}
            </p>
          </Reveal>
          <Reveal delay={2}>
            <div className="mt-16 flex justify-center overflow-hidden border border-line bg-ink px-5 py-10 sm:px-20 sm:py-16">
              <div className="relative border border-dashed border-line-strong p-[10%] sm:p-[12.5%]">
                <BrandMark
                  fluid
                  className="size-[min(40vw,10rem)]"
                />
              </div>
            </div>
            <p className="mt-6 text-center font-mono text-[11px] tracking-[0.16em] uppercase text-sand">
              Margin ≈ ⅛ of the glyph — the height of the wave
            </p>
          </Reveal>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-5 py-28 sm:px-8">
        <Reveal>
          <Eyebrow>Palette</Eyebrow>
          <h2 className="display-lg mt-4 max-w-3xl font-serif text-bone">
            Four colors. Then silence.
          </h2>
        </Reveal>
        <div className="mt-14 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {primaries.map((color, index) => (
            <Reveal key={color.hex} delay={Math.min(index, 3) as 0 | 1 | 2 | 3}>
              <div className="border border-line">
                <div
                  className={`h-36 ${color.name === "Bone" ? "border-b border-line" : ""}`}
                  style={{ background: color.hex }}
                />
                <div className="px-5 py-5">
                  <p className="text-sm text-bone">{color.name}</p>
                  <p className="mt-1 font-mono text-[12px] tracking-[0.08em] text-copper">
                    {color.hex}
                  </p>
                  <p className="mt-3 text-sm leading-relaxed text-sand">
                    {color.role}
                  </p>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
        <div className="mt-6 grid gap-4 md:grid-cols-3">
          {supports.map((color) => (
            <div key={color.hex} className="flex items-center gap-4 border border-line px-5 py-4">
              <span
                className="size-10 shrink-0 border border-line"
                style={{ background: color.hex }}
              />
              <div>
                <p className="text-sm text-bone">
                  {color.name}{" "}
                  <span className="font-mono text-[11px] text-sand">{color.hex}</span>
                </p>
                <p className="mt-1 text-xs text-sand">{color.role}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="border-y border-line bg-ink-2">
        <div className="mx-auto max-w-7xl px-5 py-28 sm:px-8">
          <Reveal>
            <Eyebrow>Type</Eyebrow>
            <h2 className="display-lg mt-4 font-serif text-bone">
              Sans for the stamp.
              <br />
              Serif for the room.
            </h2>
          </Reveal>
          <div className="mt-16 grid gap-16 lg:grid-cols-2">
            <Reveal>
              <p className="text-[11px] tracking-[0.22em] uppercase text-sand">
                {brandType.sans.name} — {brandType.sans.role.split(".")[0]}
              </p>
              <p className="mt-6 text-[11px] font-medium tracking-[0.22em] uppercase text-bone">
                Cactus Wave
              </p>
              <p className="mt-2 text-[10px] tracking-[0.28em] uppercase text-sand">
                Media
              </p>
              <p className="mt-8 text-4xl tracking-tight text-bone sm:text-5xl">
                {brandType.sans.specimen}
              </p>
              <p className="mt-6 max-w-md text-sm leading-relaxed text-sand">
                {brandType.sans.role}
              </p>
            </Reveal>
            <Reveal delay={2}>
              <p className="text-[11px] tracking-[0.22em] uppercase text-sand">
                {brandType.serif.name}
              </p>
              <p className="display-lg mt-6 font-serif text-bone">
                Presence
                <br />
                <span className="italic text-bone-dim">that holds.</span>
              </p>
              <p className="mt-6 max-w-md text-sm leading-relaxed text-sand">
                {brandType.serif.role}
              </p>
              <p className="mt-10 font-mono text-[12px] tracking-[0.12em] text-copper">
                {brandType.mono.name} · {brandType.mono.specimen}
              </p>
            </Reveal>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-5 py-28 sm:px-8">
        <Reveal>
          <Eyebrow>Discipline</Eyebrow>
          <h2 className="display-lg mt-4 font-serif text-bone">
            Do this. Not that.
          </h2>
        </Reveal>
        <div className="mt-16 grid gap-12 md:grid-cols-2">
          <Reveal>
            <p className="text-[11px] tracking-[0.22em] uppercase text-copper">
              Yes
            </p>
            <ul className="mt-6 space-y-5">
              {brandDos.map((item) => (
                <li
                  key={item}
                  className="border-t border-line pt-5 text-base leading-relaxed text-bone"
                >
                  {item}
                </li>
              ))}
            </ul>
          </Reveal>
          <Reveal delay={2}>
            <p className="text-[11px] tracking-[0.22em] uppercase text-sand">
              No
            </p>
            <ul className="mt-6 space-y-5">
              {brandDonts.map((item) => (
                <li
                  key={item}
                  className="border-t border-line pt-5 text-base leading-relaxed text-sand"
                >
                  {item}
                </li>
              ))}
            </ul>
          </Reveal>
        </div>
      </section>

      <section className="border-t border-line bg-bone text-ink">
        <div className="mx-auto max-w-7xl px-5 py-28 sm:px-8">
          <Reveal>
            <p className="text-[11px] tracking-[0.28em] uppercase text-copper-deep">
              Voice
            </p>
            <h2 className="display-lg mt-4 max-w-3xl font-serif">
              {brandVoice.tone}
            </h2>
          </Reveal>
          <div className="mt-16 grid gap-14 md:grid-cols-2">
            <Reveal>
              <p className="text-[11px] tracking-[0.22em] uppercase text-ink/45">
                We are
              </p>
              <ul className="mt-5 space-y-4">
                {brandVoice.weAre.map((item) => (
                  <li key={item} className="text-lg leading-relaxed">
                    {item}
                  </li>
                ))}
              </ul>
            </Reveal>
            <Reveal delay={2}>
              <p className="text-[11px] tracking-[0.22em] uppercase text-ink/45">
                We are not
              </p>
              <ul className="mt-5 space-y-4">
                {brandVoice.weAreNot.map((item) => (
                  <li key={item} className="text-lg leading-relaxed text-ink/70">
                    {item}
                  </li>
                ))}
              </ul>
            </Reveal>
          </div>
        </div>
      </section>
    </div>
  );
}
