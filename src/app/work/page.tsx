import type { Metadata } from "next";
import Link from "next/link";
import { ProjectVisual } from "@/components/project-visual";
import { Reveal } from "@/components/reveal";
import { works } from "@/lib/work";

export const metadata: Metadata = {
  title: "Work",
  description:
    "Selected work from Cactus Wave Media — websites, brand, and hosting.",
};

export default function WorkPage() {
  return (
    <div className="pt-28">
      <section className="mx-auto max-w-7xl px-5 pb-16 pt-16 sm:px-8">
        <Reveal>
          <p className="text-[11px] tracking-[0.28em] uppercase text-copper">
            Selected work
          </p>
          <h1 className="mt-4 max-w-3xl font-serif text-5xl leading-[0.95] text-bone sm:text-7xl">
            Work that holds.
          </h1>
          <p className="mt-6 max-w-xl text-base leading-relaxed text-sand">
            The page, the brand, and the host — made together. Hover is not
            the work. The work is what holds in six months.
          </p>
        </Reveal>
      </section>

      <section className="mx-auto max-w-7xl px-5 pb-28 sm:px-8">
        <div className="grid gap-8 lg:grid-cols-2">
          {works.map((work, index) => (
            <Reveal key={work.slug} delay={(index % 2 === 0 ? 1 : 2) as 1 | 2}>
              <Link href={`/work/${work.slug}`} className="group block">
                <div className="relative aspect-[5/4] overflow-hidden border border-line">
                  <ProjectVisual
                    variant={work.variant}
                    className="absolute inset-0 transition-transform duration-700 group-hover:scale-[1.04]"
                  />
                </div>
                <div className="mt-5 flex items-start justify-between gap-4">
                  <div>
                    <p className="text-[11px] tracking-[0.2em] uppercase text-sand">
                      {String(index + 1).padStart(2, "0")} / {work.category}
                    </p>
                    <h2 className="mt-2 font-serif text-4xl text-bone group-hover:text-copper">
                      {work.title}
                    </h2>
                  </div>
                  <span className="pt-8 text-sm text-copper">→</span>
                </div>
                <p className="mt-3 max-w-md text-sm leading-relaxed text-sand">
                  {work.summary}
                </p>
              </Link>
            </Reveal>
          ))}
        </div>
      </section>
    </div>
  );
}
