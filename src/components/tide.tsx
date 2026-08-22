export function Tide() {
  return (
    <div className="pointer-events-none absolute inset-x-0 bottom-0 h-40 overflow-hidden sm:h-52">
      <svg
        viewBox="0 0 1440 200"
        className="absolute inset-x-0 bottom-0 h-full w-[110%]"
        preserveAspectRatio="none"
        aria-hidden="true"
      >
        <path
          className="tide-path text-tide/25"
          fill="currentColor"
          d="M0 120 C 180 70, 280 170, 480 120 S 820 70, 980 130 1280 80, 1440 120 V 200 H 0 Z"
        />
        <path
          className="tide-path-b text-sage/20"
          fill="currentColor"
          d="M0 140 C 200 90, 340 180, 540 130 S 880 90, 1040 145 1300 100, 1440 140 V 200 H 0 Z"
        />
        <path
          className="tide-path-c text-copper/15"
          fill="currentColor"
          d="M0 155 C 160 120, 300 185, 500 150 S 860 120, 1020 160 1260 130, 1440 158 V 200 H 0 Z"
        />
      </svg>
    </div>
  );
}
