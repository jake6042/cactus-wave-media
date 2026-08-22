import { ContactBlock } from "@/components/contact-block";
import { Hero } from "@/components/hero";
// import { Marquee } from "@/components/marquee";
import { Process } from "@/components/process";
import { ServicesList } from "@/components/services-list";
import { InfraFeature } from "@/components/split-features";
import { StudioTeaser } from "@/components/studio-teaser";
import { WorkPreview } from "@/components/work-preview";

export default function Home() {
  return (
    <>
      <Hero />
      {/* Capabilities ticker — restore when the carousel copy is wanted again */}
      {/* <Marquee /> */}
      <WorkPreview />
      <ServicesList />
      <InfraFeature />
      <Process />
      <StudioTeaser />
      <ContactBlock />
    </>
  );
}
