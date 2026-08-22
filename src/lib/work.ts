export type WorkVariant = "solara" | "marea" | "halcyon";

export type Work = {
  slug: string;
  title: string;
  category: string;
  disciplines: string[];
  summary: string;
  lede: string;
  challenge: string;
  approach: string;
  outcome: string;
  variant: WorkVariant;
};

export const works: Work[] = [
  {
    slug: "solara",
    title: "Solara",
    category: "Direct-to-consumer",
    disciplines: ["E-commerce", "Brand", "Custom sites"],
    summary: "A catalog that reads like a lookbook. Store and brand, designed as one.",
    lede: "Goods with weight, given a site that matches the shelf.",
    challenge:
      "The product was already excellent. The internet made it look interchangeable — a rented theme, a brand that vanished the moment you left the box.",
    approach:
      "We started from the object. Type, layout, and product pages were directed as one. The store is quiet on purpose: the goods talk, checkout is a straight line.",
    outcome:
      "A site that feels like the brand in your hands. Pages that work for ads, email, and wholesale without a remake.",
    variant: "solara",
  },
  {
    slug: "marea",
    title: "Casa Marea",
    category: "Hospitality",
    disciplines: ["Website", "Brand", "Booking"],
    summary:
      "A coastal house that needed a site as considered as the rooms — and a way to fill them.",
    lede: "The page should feel like the walk from the gate to the terrace.",
    challenge:
      "Beautiful rooms, forgettable web. Guests were deciding next to a chain hotel, and booking dumped them into an ugly third-party widget.",
    approach:
      "We built a look from limestone, tide, and late light — then put booking on the site, not beside it. Slow motion. Large type. Space that breathes. Every path ends in a date, a room, a name.",
    outcome:
      "A site that pre-sells the stay. Direct bookings. A brand that works on a matchbook and a billboard.",
    variant: "marea",
  },
  {
    slug: "halcyon",
    title: "Halcyon",
    category: "Practice",
    disciplines: ["Custom sites", "Design", "Motion"],
    summary:
      "A practice site built like a monograph — precise, unhurried, hard to skim past.",
    lede: "Work that asks for time should not live in a grid of identical cards.",
    challenge:
      "The portfolio was strong and the site was apologizing for it. Projects flattened into thumbnails. The firm looked like every other firm.",
    approach:
      "Case studies open like chapters. Type and a custom canvas replace stock mockups. A principal can publish a study without breaking the look.",
    outcome:
      "A site that wins the meeting before the meeting. Work shown at the resolution it was made.",
    variant: "halcyon",
  },
];

export function getWork(slug: string) {
  return works.find((work) => work.slug === slug);
}
