import { Reveal } from "@/components/reveal";
import { SectionHeading } from "@/components/section-heading";
import { services } from "@/lib/site";

export function ServicesList({
  heading = true,
}: {
  heading?: boolean;
}) {
  return (
    <section id="services" className="scroll-mt-24 mx-auto max-w-7xl px-5 py-16 sm:px-8 sm:py-24 lg:py-28">
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
            <article className="grid gap-4 border-t border-line py-8 sm:py-10 lg:grid-cols-12 lg:gap-8">
              <p className="text-[12px] tracking-[0.2em] uppercase text-copper lg:col-span-2">
                {service.id}
              </p>
              <div className="min-w-0 lg:col-span-4">
                <h3 className="font-serif text-[clamp(1.65rem,4vw,2.25rem)] text-bone">
                  {service.title}
                </h3>
                <p className="mt-2 text-sm text-sage">{service.lede}</p>
              </div>
              <p className="text-sm leading-relaxed text-sand lg:col-span-6 lg:pt-2">
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
