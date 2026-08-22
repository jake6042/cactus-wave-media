import { Reveal } from "@/components/reveal";
import { SectionHeading } from "@/components/section-heading";
import { process } from "@/lib/site";

export function Process() {
  return (
    <section className="border-y border-line bg-ink-2">
      <div className="mx-auto max-w-7xl px-5 py-28 sm:px-8">
        <Reveal>
          <SectionHeading
            eyebrow="Process"
            title="Listen. Frame. Build. Launch. Tend."
            body="A short path, held tightly. You always know what happens next."
          />
        </Reveal>
        <ol className="mt-16 grid gap-10 sm:grid-cols-2 lg:grid-cols-5">
          {process.map((step, index) => (
            <li key={step.id}>
              <Reveal delay={(Math.min(index + 1, 4) as 1 | 2 | 3 | 4)}>
                <p className="text-[11px] tracking-[0.22em] uppercase text-copper">
                  {step.id}
                </p>
                <h3 className="mt-3 font-serif text-3xl text-bone">{step.title}</h3>
                <p className="mt-3 text-sm leading-relaxed text-sand">{step.body}</p>
              </Reveal>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
