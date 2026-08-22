"use client";

import Link from "next/link";
import { useEffect, useState, type MouseEvent } from "react";
import { Wordmark } from "@/components/brand";
import { ContactTrigger, useContactDialog } from "@/components/contact-dialog";
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
  const { open: contactOpen } = useContactDialog();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 16);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (contactOpen) return;
    const previous = document.body.style.overflow;
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = previous;
    };
  }, [open, contactOpen]);

  useEffect(() => {
    const collapse = () => {
      if (window.matchMedia("(min-width: 1024px)").matches) setOpen(false);
    };
    window.addEventListener("resize", collapse);
    return () => window.removeEventListener("resize", collapse);
  }, []);

  useEffect(() => {
    if (!open) return;
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 pt-[env(safe-area-inset-top)] transition-colors duration-500 ${
        scrolled || open ? "bg-ink/85 backdrop-blur-md" : "bg-transparent"
      }`}
    >
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-5 sm:h-20 sm:px-8">
        <Wordmark href="/" markSize={36} />

        <nav
          className="hidden items-center gap-6 xl:gap-9 lg:flex"
          aria-label="Primary"
        >
          {nav.map((item) =>
            "opensContact" in item && item.opensContact ? (
              <ContactTrigger
                key={item.href}
                href={item.href}
                className="inline-flex min-h-11 items-center text-[12px] tracking-[0.18em] uppercase text-bone-dim transition-colors hover:text-bone"
              >
                {item.label}
              </ContactTrigger>
            ) : (
              <Link
                key={item.href}
                href={item.href}
                onClick={(event) => scrollHomeSection(event, item.href)}
                className="inline-flex min-h-11 items-center text-[12px] tracking-[0.18em] uppercase text-bone-dim transition-colors hover:text-bone"
              >
                {item.label}
              </Link>
            ),
          )}
          <ContactTrigger
            href="/#contact"
            className="inline-flex min-h-11 items-center rounded-full bg-copper px-4 py-2 text-[11px] font-medium tracking-[0.16em] uppercase text-ink transition-colors hover:bg-bone"
          >
            Start a project
          </ContactTrigger>
        </nav>

        <button
          type="button"
          className="relative z-50 flex h-11 w-11 items-center justify-center lg:hidden"
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
        className={`fixed inset-0 z-40 bg-ink/97 backdrop-blur-md transition-[opacity,visibility] duration-300 lg:hidden ${
          open
            ? "visible opacity-100"
            : "invisible pointer-events-none opacity-0"
        }`}
      >
        <nav
          className="flex h-full flex-col overflow-y-auto px-5 pb-10 pt-28 sm:px-8"
          aria-label="Mobile"
        >
          {nav.map((item) =>
            "opensContact" in item && item.opensContact ? (
              <ContactTrigger
                key={item.href}
                href={item.href}
                onClick={() => setOpen(false)}
                className="flex min-h-14 items-center font-serif text-[clamp(2.15rem,9vw,3.25rem)] text-bone"
              >
                {item.label}
              </ContactTrigger>
            ) : (
              <Link
                key={item.href}
                href={item.href}
                onClick={(event) => {
                  setOpen(false);
                  scrollHomeSection(event, item.href);
                }}
                className="flex min-h-14 items-center font-serif text-[clamp(2.15rem,9vw,3.25rem)] text-bone"
              >
                {item.label}
              </Link>
            ),
          )}
          <ContactTrigger
            href="/#contact"
            onClick={() => setOpen(false)}
            className="mt-8 inline-flex min-h-11 items-center text-[13px] tracking-[0.18em] uppercase text-copper"
          >
            Start a project
          </ContactTrigger>
        </nav>
      </div>
    </header>
  );
}
