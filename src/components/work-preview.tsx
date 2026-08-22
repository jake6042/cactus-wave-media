import Link from "next/link";
import { ProjectVisual } from "@/components/project-visual";
import { Reveal } from "@/components/reveal";
import { SectionHeading } from "@/components/section-heading";
import { works } from "@/lib/work";

export function WorkPreview() {
  return (
    <section className="mx-auto max-w-7xl px-5 py-28 sm:px-8">
      <Reveal>
        <div className="flex flex-col justify-between gap-8 md:flex-row md:items-end">
          <SectionHeading
            eyebrow="Selected work"
            title="What we make."
            body="Sites, brand, and hosting treated as one. A few frames from the book."
          />
          <Link
            href="/work"
            className="text-[12px] tracking-[0.18em] uppercase text-copper transition-colors hover:text-bone"
          >
            All work →
          </Link>
        </div>
      </Reveal>

      <div className="mt-16 space-y-8">
        {works.map((work, index) => (
          <Reveal key={work.slug} delay={(Math.min(index + 1, 4) as 1 | 2 | 3 | 4)}>
            <Link
              href={`/work/${work.slug}`}
              className="group grid overflow-hidden border border-line transition-colors duration-500 hover:border-copper/50 md:grid-cols-12"
            >
              <div className="relative aspect-[16/11] md:col-span-7 md:aspect-auto md:min-h-[340px]">
                <ProjectVisual
                  variant={work.variant}
                  className="absolute inset-0 transition-transform duration-700 group-hover:scale-[1.03]"
                />
              </div>
              <div className="flex flex-col justify-between bg-ink-2 p-7 md:col-span-5 md:p-10">
                <div>
                  <p className="text-[11px] tracking-[0.22em] uppercase text-sand">
                    {String(index + 1).padStart(2, "0")} / {work.category}
                  </p>
                  <h3 className="mt-4 font-serif text-4xl text-bone group-hover:text-copper sm:text-5xl">
                    {work.title}
                  </h3>
                  <p className="mt-4 text-sm leading-relaxed text-sand">
                    {work.summary}
                  </p>
                </div>
                <div className="mt-8 flex flex-wrap gap-2">
                  {work.disciplines.map((item) => (
                    <span
                      key={item}
                      className="border border-line px-3 py-1 text-[10px] tracking-[0.16em] uppercase text-bone-dim"
                    >
                      {item}
                    </span>
                  ))}
                </div>
              </div>
            </Link>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
