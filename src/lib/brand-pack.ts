/** Canva brand pack — designs live in the folder linked below. */
export const brandPackBase = "/brand/pack/canva";

export const brandPackFolderUrl =
  "https://www.canva.com/folder/FAHS_hqG6KE";

export type BrandPackItem = {
  file: string;
  use: string;
  canva?: string;
};

export type BrandPackGroup = {
  title: string;
  lede: string;
  items: BrandPackItem[];
};

export const brandPackGroups: BrandPackGroup[] = [
  {
    title: "Mark",
    lede: "The official ribbed stamp. Canva Free cannot export transparent PNG — plates only.",
    items: [
      {
        file: "mark-on-bone.png",
        use: "Ink stamp on bone. The plate they already loved. Print, light fields.",
        canva: "https://www.canva.com/d/xMct3lWSjEanV9O",
      },
      {
        file: "mark-on-ink.png",
        use: "Official geometry on ink. Low contrast until the glyph is recolored bone.",
        canva: "https://www.canva.com/d/NaYtSP5iFE2jma1",
      },
      {
        file: "mark-on-sage.png",
        use: "Ink stamp on sage. Accent only — sage is not a system fill.",
        canva: "https://www.canva.com/d/zPyfYgNL8x-wD1j",
      },
      {
        file: "favicon-512.png",
        use: "512 crop of the bone plate. Favicon, app icon.",
        canva: "https://www.canva.com/d/YjSerHYRxMDMlvR",
      },
    ],
  },
  {
    title: "Wordmark",
    lede: "Same hierarchy as the site: mark left, CACTUS WAVE / MEDIA right. Geist energy, wide tracking.",
    items: [
      {
        file: "wordmark-horizontal-on-ink.png",
        use: "Site header lockup on ink.",
        canva: "https://www.canva.com/d/xUGkyN_XVP8pxEI",
      },
      {
        file: "wordmark-horizontal-on-bone.png",
        use: "Same lockup, reverse. Highest-contrast wordmark.",
        canva: "https://www.canva.com/d/bv786FJC5RKb4fk",
      },
      {
        file: "wordmark-stacked-on-ink.png",
        use: "Matches <Wordmark stacked />.",
        canva: "https://www.canva.com/d/YsN2WRsYzEFZSOT",
      },
      {
        file: "wordmark-compact-on-ink.png",
        use: "Matches <Wordmark compact />. No Media line.",
        canva: "https://www.canva.com/d/1bunhfsUJYg5CCv",
      },
      {
        file: "email-signature-on-bone.png",
        use: "Bone lockup for email. Resize quota ran out before a thin strip.",
        canva: "https://www.canva.com/d/T9eHIJcZRDFNu8k",
      },
    ],
  },
  {
    title: "Social",
    lede: "Official stamp on a bone plate, type on ink.",
    items: [
      {
        file: "og-1200x630.png",
        use: "Open Graph 1200×630.",
        canva: "https://www.canva.com/d/KCfFPPAr3_qfEx9",
      },
      {
        file: "twitter-1200x600.png",
        use: "Twitter / X 1200×600.",
        canva: "https://www.canva.com/d/obpjGPbZcWC5L4Q",
      },
      {
        file: "avatar-circle-on-ink.png",
        use: "Profile crop. Prefer the bone-plate stamp if the circle feels busy.",
        canva: "https://www.canva.com/d/IceEn5Bt5_-OT2v",
      },
    ],
  },
];
