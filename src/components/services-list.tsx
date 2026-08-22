import { Reveal } from "@/components/reveal";
import { SectionHeading } from "@/components/section-heading";
import { services } from "@/lib/site";

export function ServicesList({
  heading = true,
}: {
  heading?: boolean;
}) {
  return (
    <section className="mx-auto max-w-7xl px-5 py-28 sm:px-8">
      {heading ? (
        <Reveal>
          <SectionHeading
            eyebrow="Services"
            title="The whole job, designed as one."
            body="Heavier on the build. Also the brand, the hosting, and the campaigns that follow."
          />
        </Reveal>
      ) : null}

      <div className={heading ? "mt-16" : ""}>
        {services.map((service, index) => (
          <Reveal key={service.id} delay={(Math.min(index, 4) as 0 | 1 | 2 | 3 | 4)}>
            <article className="grid gap-4 border-t border-line py-10 md:grid-cols-12 md:gap-8">
              <p className="text-[12px] tracking-[0.2em] uppercase text-copper md:col-span-2">
                {service.id}
              </p>
              <div className="md:col-span-4">
                <h3 className="font-serif text-3xl text-bone sm:text-4xl">
                  {service.title}
                </h3>
                <p className="mt-2 text-sm text-sage">{service.lede}</p>
              </div>
              <p className="text-sm leading-relaxed text-sand md:col-span-6 md:pt-2">
                {service.body}
              </p>
            </article>
          </Reveal>
        ))}
        <div className="border-t border-line" />
      </div>
    </section>
  );
}
