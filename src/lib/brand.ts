export const brand = {
  name: "Cactus Wave Media",
  shortName: "Cactus Wave",
  unit: "Media",
  tagline: "Presence that holds.",
  idea: "A cactus holds. A wave moves. The mark is both — ribs and swell as one stamp.",
} as const;

export const brandColors = {
  ink: {
    name: "Ink",
    hex: "#0B0F0E",
    role: "Primary field. Night desert. The default surface of the studio.",
  },
  bone: {
    name: "Bone",
    hex: "#F4EFE6",
    role: "Primary figure. Parchment, not white. The color the mark takes on ink.",
  },
  sage: {
    name: "Sage",
    hex: "#6E7F6B",
    role: "Single restrained accent. Mineral, not mint. Never a fill.",
  },
  brass: {
    name: "Brass",
    hex: "#C4A574",
    role: "Hairline metal. Eyebrows, selection, a door left slightly open.",
  },
} as const;

/** Supporting tones derived from the four primaries — not a second palette. */
export const brandSupports = {
  ink2: { name: "Ink 2", hex: "#141918", role: "Recessed panels on ink." },
  ink3: { name: "Ink 3", hex: "#1C2320", role: "Raised plates, image wells." },
  boneDim: { name: "Bone dim", hex: "#C9C2B6", role: "Secondary type on ink." },
  sand: { name: "Sand", hex: "#9A9183", role: "Body ledes, captions." },
  brassDeep: { name: "Brass deep", hex: "#A88852", role: "Brass on bone surfaces." },
  tide: { name: "Tide", hex: "#5B6F6C", role: "Atmospheric motion only. Not a brand color." },
} as const;

export const brandType = {
  sans: {
    name: "Geist",
    css: "var(--font-sans)",
    role: "UI, wordmark, labels. Geometric, tightly tracked when all-caps.",
    specimen: "Cactus Wave Media",
  },
  serif: {
    name: "Instrument Serif",
    css: "var(--font-serif)",
    role: "Display. Titles that should feel inevitable, not loud.",
    specimen: "Presence that holds.",
  },
  mono: {
    name: "Geist Mono",
    css: "var(--font-mono)",
    role: "Specimens, hex, technical asides. Never headlines.",
    specimen: "#0B0F0E",
  },
} as const;

export const brandAssets = {
  source: "/brand/cactus-wave-media-mark-abstract.png",
  mark: "/brand/mark.png",
  markBone: "/brand/mark-bone.png",
  avatar: "/brand/avatar.png",
} as const;

export const brandUsage = {
  clearSpace:
    "Keep a quiet margin around the mark equal to the height of the wave band — roughly one-eighth of the glyph. Do not lock it to a rule or a box.",
  surfaces: [
    "Bone mark on ink. Default. The site, social, the favicon field.",
    "Ink mark on bone. Reverse. Print, light plates, the occasional inverted panel.",
    "One-color only. Never sage or brass as the glyph.",
  ],
  wordmark:
    "The lockup is the mark plus type — not a second PNG. “CACTUS WAVE” in Geist, tracked. “MEDIA” smaller, wider, beneath or beside.",
} as const;

export const brandDos = [
  "Give the mark air. It is a stamp, not a sticker.",
  "Reverse it cleanly: bone on ink, or ink on bone.",
  "Set the name in type. The PNG is the glyph only.",
  "Keep sage and brass as accents — a line, a word, a door.",
] as const;

export const brandDonts = [
  "Do not show the Canva bone plate as a rectangle.",
  "Do not draw a cartoon cactus, a surf wave, or a sunset.",
  "Do not recolor the mark teal, gold-fill, or gradient.",
  "Do not add drop shadows, glows, outlines, or a holding box.",
] as const;

export const brandVoice = {
  weAre: [
    "Quiet, specific, and finished.",
    "Desert-born. Built for anywhere.",
    "One author — site, host, campaign.",
  ],
  weAreNot: [
    "A vibe deck with no build.",
    "Surf, cactus clip-art, or “digital agency” teal.",
    "Loud. We do not announce the luxury. We assume it.",
  ],
  tone: "Editorial. Short sentences. No exclamation. The work should sound like the rooms it enters.",
} as const;

export type BrandSurface = "ink" | "bone";
export type BrandMarkSize = "sm" | "md" | "lg" | "xl";
