"use client";

import Link from "next/link";
import type { ReactNode } from "react";
import { ContactTrigger } from "@/components/contact-dialog";

const variants = {
  copper: "bg-copper text-ink hover:bg-bone",
  ghost:
    "border border-line-strong text-bone hover:border-copper hover:text-copper",
  bone: "bg-ink text-bone hover:bg-copper hover:text-ink",
} as const;

function isContactHref(href: string) {
  return href === "/#contact" || href === "#contact";
}

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
  const classNames = `inline-flex items-center justify-center gap-2 rounded-full px-6 py-3 text-[13px] font-medium tracking-[0.14em] uppercase transition-colors duration-300 ${variants[variant]} ${className}`;

  if (isContactHref(href)) {
    return (
      <ContactTrigger href={href} className={classNames}>
        {children}
      </ContactTrigger>
    );
  }

  if (href.includes("#")) {
    return (
      <a href={href} className={classNames}>
        {children}
      </a>
    );
  }

  return (
    <Link href={href} className={classNames}>
      {children}
    </Link>
  );
}
