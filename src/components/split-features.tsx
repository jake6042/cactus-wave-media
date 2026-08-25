import { Reveal } from "@/components/reveal";

export function InfraFeature() {
  return (
    <section className="bg-bone text-ink">
      <div className="mx-auto grid max-w-7xl gap-10 px-5 py-16 sm:gap-12 sm:px-8 sm:py-24 lg:grid-cols-12 lg:py-28">
        <div className="min-w-0 lg:col-span-5">
          <p className="text-[11px] tracking-[0.28em] uppercase text-copper-deep">
            Hosting & domains
          </p>
          <h2 className="display-lg mt-4 font-serif text-ink">
            Domain. Host. Inbox. Done.
          </h2>
        </div>
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
