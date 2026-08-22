import Link from "next/link";
import { Wordmark } from "@/components/brand";
import { nav, site } from "@/lib/site";

export function SiteFooter() {
  return (
    <footer className="border-t border-line bg-ink">
      <div className="mx-auto grid max-w-7xl gap-12 px-5 py-16 sm:px-8 md:grid-cols-12">
        <div className="md:col-span-5">
          <Wordmark href="/" markSize="sm" />
          <p className="mt-6 max-w-sm text-sm leading-relaxed text-sand">
            The site, the domain, the host — one author.
          </p>
        </div>
        <div className="md:col-span-3">
          <p className="text-[11px] tracking-[0.2em] uppercase text-sand">
            Navigate
          </p>
          <ul className="mt-4 space-y-2">
            {nav.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className="text-sm text-bone-dim transition-colors hover:text-bone"
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
        <div className="md:col-span-4">
          <p className="text-[11px] tracking-[0.2em] uppercase text-sand">
            Write
          </p>
          <a
            href={`mailto:${site.email}`}
            className="mt-4 inline-block text-sm text-bone transition-colors hover:text-copper"
          >
            {site.email}
          </a>
          <p className="mt-8 text-xs tracking-[0.16em] uppercase text-sand">
            Desert-born. Built for anywhere.
          </p>
        </div>
      </div>
      <div className="border-t border-line">
        <div className="mx-auto flex max-w-7xl flex-col gap-2 px-5 py-6 text-[11px] tracking-[0.14em] uppercase text-sand sm:flex-row sm:items-center sm:justify-between sm:px-8">
          <p className="flex flex-wrap items-center gap-x-4 gap-y-1">
            <span>
              © {new Date().getFullYear()} {site.name}
            </span>
            <Link
              href="/brand"
              className="tracking-[0.14em] text-sand/70 no-underline transition-colors hover:text-bone"
            >
              Brand
            </Link>
          </p>
          <p>All disciplines. One studio.</p>
        </div>
      </div>
    </footer>
  );
}
