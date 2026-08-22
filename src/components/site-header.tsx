"use client";

import Link from "next/link";
import { useEffect, useState, type MouseEvent } from "react";
import { Wordmark } from "@/components/brand";
import { nav } from "@/lib/site";

function scrollHomeSection(
  event: MouseEvent<HTMLAnchorElement>,
  href: string,
) {
  const id = href.includes("#") ? href.slice(href.indexOf("#") + 1) : "";
  if (!id || window.location.pathname !== "/") return;
  event.preventDefault();
  document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  window.history.replaceState(null, "", href);
}

export function SiteHeader() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 16);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-colors duration-500 ${
        scrolled || open ? "bg-ink/85 backdrop-blur-md" : "bg-transparent"
      }`}
    >
      <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-5 sm:px-8">
        <Wordmark href="/" markSize="sm" />

        <nav className="hidden items-center gap-9 md:flex" aria-label="Primary">
          {nav.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              onClick={(event) => scrollHomeSection(event, item.href)}
              className="text-[12px] tracking-[0.18em] uppercase text-bone-dim transition-colors hover:text-bone"
            >
              {item.label}
            </Link>
          ))}
          <Link
            href="/#contact"
            onClick={(event) => scrollHomeSection(event, "/#contact")}
            className="rounded-full bg-copper px-4 py-2 text-[11px] font-medium tracking-[0.16em] uppercase text-ink transition-colors hover:bg-bone"
          >
            Start a project
          </Link>
        </nav>

        <button
          type="button"
          className="relative z-50 flex h-11 w-11 items-center justify-center md:hidden"
          aria-expanded={open}
          aria-controls="mobile-nav"
          aria-label={open ? "Close menu" : "Open menu"}
          onClick={() => setOpen((value) => !value)}
        >
          <span className="sr-only">Menu</span>
          <span className="flex w-6 flex-col gap-1.5">
            <span
              className={`h-px w-full bg-bone transition-transform duration-300 ${
                open ? "translate-y-[3.5px] rotate-45" : ""
              }`}
            />
            <span
              className={`h-px w-full bg-bone transition-transform duration-300 ${
                open ? "-translate-y-[3.5px] -rotate-45" : ""
              }`}
            />
          </span>
        </button>
      </div>

      <div
        id="mobile-nav"
        className={`fixed inset-0 z-40 bg-ink px-5 pt-28 md:hidden ${
          open ? "block" : "hidden"
        }`}
      >
        <nav className="flex flex-col gap-2" aria-label="Mobile">
          {nav.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              onClick={(event) => {
                setOpen(false);
                scrollHomeSection(event, item.href);
              }}
              className="font-serif text-5xl text-bone"
            >
              {item.label}
            </Link>
          ))}
          <Link
            href="/#contact"
            onClick={(event) => {
              setOpen(false);
              scrollHomeSection(event, "/#contact");
            }}
            className="mt-8 text-[13px] tracking-[0.18em] uppercase text-copper"
          >
            Start a project
          </Link>
        </nav>
      </div>
    </header>
  );
}
