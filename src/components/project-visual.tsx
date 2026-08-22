import type { WorkVariant } from "@/lib/work";

export function ProjectVisual({
  variant,
  className = "",
}: {
  variant: WorkVariant;
  className?: string;
}) {
  return (
    <div
      className={`relative overflow-hidden ${className}`}
      aria-hidden="true"
    >
      {variant === "solara" ? <SolaraArt /> : null}
      {variant === "marea" ? <MareaArt /> : null}
      {variant === "halcyon" ? <HalcyonArt /> : null}
    </div>
  );
}

function SolaraArt() {
  return (
    <div className="absolute inset-0 bg-[#2a2118]">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(196,165,116,0.35),transparent_50%)]" />
      <div className="absolute bottom-0 left-1/2 h-[70%] w-[38%] -translate-x-1/2 rounded-t-[999px] bg-gradient-to-b from-[#e8c9a0] to-[#a68b58] shadow-[0_0_80px_rgba(196,165,116,0.25)]" />
      <div className="absolute top-[18%] left-[18%] h-24 w-24 rounded-full border border-[#e8c9a0]/30" />
      <div className="absolute top-[22%] right-[16%] h-3 w-28 bg-[#c4a574]/70" />
      <div className="absolute top-[28%] right-[16%] h-3 w-16 bg-[#f4efe6]/40" />
      <p className="absolute bottom-6 left-6 font-serif text-3xl italic text-[#f4efe6]/80">
        Solara
      </p>
    </div>
  );
}

function MareaArt() {
  return (
    <div className="absolute inset-0 bg-[#152422]">
      <div className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-[#3d7a76] to-transparent" />
      <div className="absolute inset-x-0 top-[42%] h-px bg-[#f4efe6]/20" />
      <div className="absolute top-[12%] left-[12%] h-[48%] w-[22%] border border-[#f4efe6]/25 bg-[#f4efe6]/5" />
      <div className="absolute top-[12%] left-[36%] h-[48%] w-[22%] border border-[#f4efe6]/25 bg-[#f4efe6]/8" />
      <div className="absolute top-[12%] left-[60%] h-[48%] w-[22%] border border-[#f4efe6]/25 bg-[#f4efe6]/5" />
      <div className="absolute bottom-[8%] left-0 right-0 h-16 opacity-70">
        <svg viewBox="0 0 400 60" className="h-full w-full" preserveAspectRatio="none">
          <path
            d="M0 30 C 50 10, 90 50, 140 28 S 230 8, 280 32 360 18, 400 30 V 60 H 0 Z"
            fill="#6E7F6B"
            opacity="0.45"
          />
        </svg>
      </div>
      <p className="absolute bottom-6 left-6 font-serif text-3xl italic text-[#f4efe6]/80">
        Casa Marea
      </p>
    </div>
  );
}

function HalcyonArt() {
  return (
    <div className="absolute inset-0 bg-[#0B0F0E]">
      <div className="absolute inset-6 grid grid-cols-6 grid-rows-6 gap-px opacity-40">
        {Array.from({ length: 36 }, (_, i) => (
          <div key={i} className="border border-[#f4efe6]/15" />
        ))}
      </div>
      <div className="absolute top-[18%] left-[10%] right-[10%] h-px bg-copper/70" />
      <div className="absolute top-[18%] bottom-[18%] left-[10%] w-px bg-[#f4efe6]/20" />
      <p className="absolute top-[22%] left-[14%] font-serif text-[12vw] leading-none text-[#f4efe6] sm:text-7xl">
        H
      </p>
      <p className="absolute right-[12%] bottom-[20%] max-w-[40%] text-right text-[10px] tracking-[0.28em] uppercase text-sand">
        Practice
        <br />
        Monograph
      </p>
    </div>
  );
}
