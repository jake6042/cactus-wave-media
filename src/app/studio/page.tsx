import type { Metadata } from "next";
import { ContactBlock } from "@/components/contact-block";
import { Reveal } from "@/components/reveal";

export const metadata: Metadata = {
  title: "Studio",
  description:
    "Cactus Wave Media is a desert-born studio. Sites, hosting, and campaigns — one author.",
};

const values = [
  {
    title: "One author",
    body: "The type, the site, and the host should feel like they were made by the same hand.",
  },
  {
    title: "Build it for real",
    body: "Templates are for someone else. We build the site you actually need — fast, and ready to grow.",
  },
  {
    title: "Stay after launch",
    body: "A site is not something you throw over a wall. It is a living presence. We remain on the work.",
  },
];

export default function StudioPage() {
  return (
    <div className="pt-28">
      <section className="mx-auto max-w-7xl px-5 pb-20 pt-16 sm:px-8">
        <Reveal>
          <p className="text-[11px] tracking-[0.28em] uppercase text-copper">
            The studio
          </p>
          <h1 className="display-xl mt-4 max-w-4xl font-serif text-bone">
            Desert-born.
            <br />
            <span className="italic text-bone-dim">Built for anywhere.</span>
          </h1>
          <p className="mt-8 max-w-2xl text-base leading-relaxed text-sand sm:text-lg">
            Cactus Wave Media is for companies that want to look expensive on
            the internet. We make the site, handle hosting and domains, and
            run the campaigns that follow.
          </p>
        </Reveal>
      </section>

      <section className="border-y border-line bg-ink-2">
        <div className="mx-auto grid max-w-7xl gap-12 px-5 py-24 sm:px-8 lg:grid-cols-3">
          {values.map((value, index) => (
            <Reveal key={value.title} delay={(index + 1) as 1 | 2 | 3}>
              <p className="text-[11px] tracking-[0.22em] uppercase text-copper">
                {String(index + 1).padStart(2, "0")}
              </p>
              <h2 className="mt-3 font-serif text-3xl text-bone">{value.title}</h2>
              <p className="mt-4 text-sm leading-relaxed text-sand">{value.body}</p>
            </Reveal>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-5 py-28 sm:px-8">
        <Reveal>
          <h2 className="display-lg max-w-3xl font-serif text-bone">
            How we like to work.
          </h2>
        </Reveal>
        <div className="mt-14 grid gap-10 md:grid-cols-2">
          <Reveal>
            <p className="text-base leading-relaxed text-sand">
              Directly. A few engagements at a time, so the work never becomes
              a ticket. You talk to the person designing and shipping — not
              an account layer.
            </p>
          </Reveal>
          <Reveal delay={2}>
            <p className="text-base leading-relaxed text-sand">
              The name is the brief. A cactus holds. A wave moves. We build
              presence that does both.
            </p>
          </Reveal>
        </div>
      </section>

      <ContactBlock />
    </div>
  );
}
