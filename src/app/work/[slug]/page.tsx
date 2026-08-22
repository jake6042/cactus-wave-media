import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ButtonLink } from "@/components/button-link";
import { ProjectVisual } from "@/components/project-visual";
import { getWork, works } from "@/lib/work";

export function generateStaticParams() {
  return works.map((work) => ({ slug: work.slug }));
}

export async function generateMetadata({
  params,
}: PageProps<"/work/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const work = getWork(slug);
  if (!work) return {};
  return {
    title: work.title,
    description: work.summary,
  };
}

export default async function WorkDetailPage({
  params,
}: PageProps<"/work/[slug]">) {
  const { slug } = await params;
  const work = getWork(slug);
  if (!work) notFound();

  const next =
    works[(works.findIndex((item) => item.slug === work.slug) + 1) % works.length];

  return (
    <article className="pt-28">
      <header className="mx-auto max-w-7xl px-5 pb-12 pt-16 sm:px-8">
        <p className="text-[11px] tracking-[0.28em] uppercase text-copper">
          {work.category}
        </p>
        <h1 className="display-xl mt-4 font-serif text-bone">
          {work.title}
        </h1>
        <p className="mt-6 max-w-2xl text-lg leading-relaxed text-sand">
          {work.lede}
        </p>
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
      </header>

      <div className="relative mx-auto aspect-[16/9] max-w-7xl overflow-hidden border-y border-line sm:aspect-[2/1]">
        <ProjectVisual variant={work.variant} className="absolute inset-0" />
      </div>

      <div className="mx-auto grid max-w-7xl gap-16 px-5 py-24 sm:px-8 lg:grid-cols-12">
        <section className="lg:col-span-4">
          <p className="text-[11px] tracking-[0.22em] uppercase text-copper">
            The brief
          </p>
          <p className="mt-4 text-base leading-relaxed text-sand">{work.challenge}</p>
        </section>
        <section className="lg:col-span-4">
          <p className="text-[11px] tracking-[0.22em] uppercase text-copper">
            The work
          </p>
          <p className="mt-4 text-base leading-relaxed text-sand">{work.approach}</p>
        </section>
        <section className="lg:col-span-4">
          <p className="text-[11px] tracking-[0.22em] uppercase text-copper">
            What holds
          </p>
          <p className="mt-4 text-base leading-relaxed text-sand">{work.outcome}</p>
        </section>
      </div>

      <div className="border-t border-line">
        <div className="mx-auto flex max-w-7xl flex-col justify-between gap-8 px-5 py-16 sm:flex-row sm:items-end sm:px-8">
          <div>
            <p className="text-[11px] tracking-[0.22em] uppercase text-sand">
              Next study
            </p>
            <Link
              href={`/work/${next.slug}`}
              className="mt-2 block font-serif text-[clamp(1.75rem,5vw,2.5rem)] text-bone hover:text-copper"
            >
              {next.title}
            </Link>
          </div>
          <ButtonLink href="/#contact">Start a project</ButtonLink>
        </div>
      </div>
    </article>
  );
}
