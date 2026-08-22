import { capabilities } from "@/lib/site";

export function Marquee() {
  const items = [...capabilities, ...capabilities];

  return (
    <div className="overflow-hidden border-y border-line bg-ink-2 py-4">
      <div className="marquee-track flex w-max gap-10 pr-10">
        {items.map((item, index) => (
          <span
            key={`${item}-${index}`}
            className="flex items-center gap-10 text-[12px] tracking-[0.28em] uppercase text-bone-dim"
          >
            {item}
            <span className="text-copper" aria-hidden="true">
              ✶
            </span>
          </span>
        ))}
      </div>
    </div>
  );
}
