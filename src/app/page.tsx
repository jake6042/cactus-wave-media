import { ContactBlock } from "@/components/contact-block";
import { Hero } from "@/components/hero";
// import { Marquee } from "@/components/marquee";
import { Platforms } from "@/components/platforms";
import { Process } from "@/components/process";
import { ServicesList } from "@/components/services-list";
import { InfraFeature } from "@/components/split-features";
import { StudioTeaser } from "@/components/studio-teaser";
// Hidden until the Work / Selected work section is shown again
// import { WorkPreview } from "@/components/work-preview";

export default function Home() {
  return (
    <>
      <Hero />
      {/* Capabilities ticker — restore when the carousel copy is wanted again */}
      {/* <Marquee /> */}
      {/* Work preview (#work, Selected work, All work →) — restore with the import above */}
      {/* <WorkPreview /> */}
      <ServicesList />
      <Platforms />
      <InfraFeature />
      <Process />
      <StudioTeaser />
      <ContactBlock />
    </>
  );
}
