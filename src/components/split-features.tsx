import { Reveal } from "@/components/reveal";

export function InfraFeature() {
  return (
    <section className="bg-bone text-ink">
      <div className="mx-auto grid max-w-7xl gap-12 px-5 py-28 sm:px-8 lg:grid-cols-12">
        <Reveal className="lg:col-span-5">
          <p className="text-[11px] tracking-[0.28em] uppercase text-copper-deep">
            Hosting & domains
          </p>
          <h2 className="mt-4 font-serif text-4xl leading-tight sm:text-6xl">
            Domain. Host. Inbox. Done.
          </h2>
        </Reveal>
        <Reveal delay={2} className="lg:col-span-6 lg:col-start-7">
          <p className="text-lg leading-relaxed text-ink/70">
            The unglamorous part — handled with the same care as the homepage.
            We register the name, set up hosting and email, and keep the site
            fast after launch.
          </p>
          <ul className="mt-10 grid gap-4 sm:grid-cols-2">
            {[
              "Domains",
              "Hosting",
              "Email",
              "Uptime & updates",
            ].map((item) => (
              <li
                key={item}
                className="border-t border-ink/15 pt-3 text-sm tracking-[0.08em] uppercase"
              >
                {item}
              </li>
            ))}
          </ul>
        </Reveal>
      </div>
    </section>
  );
}
