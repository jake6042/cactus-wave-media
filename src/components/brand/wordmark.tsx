import Link from "next/link";
import { BrandMark, type BrandMarkProps } from "@/components/brand/brand-mark";
import { brand, type BrandSurface } from "@/lib/brand";

export type WordmarkProps = {
  surface?: BrandSurface;
  /** Hide the “MEDIA” line. */
  compact?: boolean;
  /** Stamp only — no Cactus Wave / Media type. */
  markOnly?: boolean;
  /** Mark above type, centered. Default is mark left, type right. */
  stacked?: boolean;
  /** If set, the lockup is the home (or given) link. */
  href?: string;
  markSize?: BrandMarkProps["size"];
  className?: string;
};

export function Wordmark({
  surface = "ink",
  compact = false,
  markOnly = false,
  stacked = false,
  href,
  markSize,
  className = "",
}: WordmarkProps) {
  const typeColor = surface === "ink" ? "text-bone" : "text-ink";
  const unitColor = surface === "ink" ? "text-sand" : "text-ink/55";
  const size = markSize ?? (stacked ? "lg" : "md");

  const lockup = (
    <span
      className={`group inline-flex items-center no-underline ${
        stacked ? "flex-col gap-5 text-center" : "gap-3"
      } ${typeColor} ${className}`}
    >
      <BrandMark
        surface={surface}
        size={size}
        className="transition-transform duration-500 group-hover:-translate-y-0.5"
      />
      {markOnly ? null : (
        <span className={`flex flex-col leading-none ${stacked ? "items-center" : ""}`}>
          <span className="text-[11px] font-medium tracking-[0.22em] uppercase">
            {brand.shortName}
          </span>
          {compact ? null : (
            <span
              className={`mt-1 text-[10px] tracking-[0.28em] uppercase ${unitColor}`}
            >
              {brand.unit}
            </span>
          )}
        </span>
      )}
    </span>
  );

  if (!href) return lockup;

  return (
    <Link href={href} aria-label={`${brand.name} home`}>
      {lockup}
    </Link>
  );
}
