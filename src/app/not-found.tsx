import { BrandMark } from "@/components/brand";
import { ButtonLink } from "@/components/button-link";

export default function NotFound() {
  return (
    <div className="flex min-h-svh flex-col justify-center px-5 pt-20 sm:px-8">
      <BrandMark size="sm" />
      <p className="mt-8 text-[11px] tracking-[0.28em] uppercase text-copper">
        404
      </p>
      <h1 className="mt-4 font-serif text-6xl text-bone sm:text-8xl">
        Drifted off the map.
      </h1>
      <p className="mt-6 max-w-md text-sand">
        This page isn’t here. The rest of the studio still is.
      </p>
      <div className="mt-10">
        <ButtonLink href="/">Back to the studio</ButtonLink>
      </div>
    </div>
  );
}
