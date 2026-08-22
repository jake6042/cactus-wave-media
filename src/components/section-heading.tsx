export function SectionHeading({
  eyebrow,
  title,
  body,
  light = false,
}: {
  eyebrow: string;
  title: string;
  body?: string;
  light?: boolean;
}) {
  return (
    <div className="max-w-3xl">
      <p
        className={`text-[11px] tracking-[0.28em] uppercase ${
          light ? "text-copper-deep" : "text-copper"
        }`}
      >
        {eyebrow}
      </p>
      <h2
        className={`display-md mt-4 font-serif tracking-tight ${
          light ? "text-ink" : "text-bone"
        }`}
      >
        {title}
      </h2>
      {body ? (
        <p
          className={`mt-5 max-w-xl text-base leading-relaxed ${
            light ? "text-ink/70" : "text-sand"
          }`}
        >
          {body}
        </p>
      ) : null}
    </div>
  );
}
