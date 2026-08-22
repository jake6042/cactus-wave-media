import Link from "next/link";
import type { ReactNode } from "react";

const variants = {
  copper:
    "bg-copper text-ink hover:bg-bone",
  ghost:
    "border border-line-strong text-bone hover:border-copper hover:text-copper",
  bone:
    "bg-ink text-bone hover:bg-copper hover:text-ink",
} as const;

export function ButtonLink({
  href,
  children,
  variant = "copper",
  className = "",
}: {
  href: string;
  children: ReactNode;
  variant?: keyof typeof variants;
  className?: string;
}) {
  return (
    <Link
      href={href}
      className={`inline-flex items-center justify-center gap-2 rounded-full px-6 py-3 text-[13px] font-medium tracking-[0.14em] uppercase transition-colors duration-300 ${variants[variant]} ${className}`}
    >
      {children}
    </Link>
  );
}
