import {
  brand,
  type BrandMarkSize,
  type BrandSurface,
} from "@/lib/brand";

const sizes: Record<BrandMarkSize, number> = {
  sm: 28,
  md: 40,
  lg: 72,
  xl: 160,
};

export type BrandMarkProps = {
  /** Ink = bone glyph (default, dark site). Bone = ink glyph on light plates. */
  surface?: BrandSurface;
  size?: BrandMarkSize | number;
  className?: string;
  decorative?: boolean;
};

export function BrandMark({
  surface = "ink",
  size = "md",
  className = "",
  decorative = true,
}: BrandMarkProps) {
  const dim = typeof size === "number" ? size : sizes[size];
  const tone = surface === "ink" ? "text-bone" : "text-ink";

  return (
    <span
      className={`brand-mark ${tone} ${className}`}
      style={{ width: dim, height: dim }}
      role={decorative ? "presentation" : "img"}
      aria-label={decorative ? undefined : `${brand.name} mark`}
      aria-hidden={decorative || undefined}
    />
  );
}
