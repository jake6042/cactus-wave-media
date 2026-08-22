export const site = {
  name: "Cactus Wave Media",
  shortName: "Cactus Wave",
  email: "hello@cactuswavemedia.com",
  url: "https://cactuswavemedia.com",
  description:
    "Sites that look expensive. Hosting and domains handled. Campaigns when you need them. A desert-born studio for web, design, and growth.",
  tagline: "Presence that holds.",
} as const;

export const nav = [
  { href: "/work", label: "Work" },
  { href: "/services", label: "Services" },
  { href: "/studio", label: "Studio" },
  { href: "/contact", label: "Contact" },
] as const;

export const services = [
  {
    id: "01",
    title: "Sites & apps",
    lede: "Built from scratch. Fast on a phone.",
    body: "Marketing sites, shops, booking, and tools — written for you, not dressed up from a template. Ready to grow without a rebuild.",
  },
  {
    id: "02",
    title: "Brand & art direction",
    lede: "A look, not a logo file in a vacuum.",
    body: "Identity, type, color, voice, and the rules that keep every surface consistent. From the first mark to the last landing page, it should feel like one author.",
  },
  {
    id: "03",
    title: "Hosting, domains & email",
    lede: "The unglamorous part, handled.",
    body: "We register the name, set up hosting and email, and keep the site fast. You get a presence that stays on the internet.",
  },
  {
    id: "04",
    title: "Growth & campaigns",
    lede: "Campaigns that convert.",
    body: "Search, landing pages, content, and paid ads. Marketing built with the site — not bolted on after.",
  },
  {
    id: "05",
    title: "Ongoing partnership",
    lede: "A studio on retainer, not a ticket queue.",
    body: "New pages, seasonal campaigns, and the quiet upkeep that keeps a presence sharp. Most of our best work happens after launch.",
  },
] as const;

export const process = [
  {
    id: "01",
    title: "Listen",
    body: "Goals, constraints, audience, and the work that already exists. We get specific before we get clever.",
  },
  {
    id: "02",
    title: "Frame",
    body: "Positioning, sitemap, and art direction. You see the shape of the thing before a pixel is final.",
  },
  {
    id: "03",
    title: "Build",
    body: "Design and build in the same room. Type, layout, and motion land together — not in sequence from three vendors.",
  },
  {
    id: "04",
    title: "Launch",
    body: "Domain, hosting, and a site that is fast on a phone in the sun. We ship it like we mean it.",
  },
  {
    id: "05",
    title: "Tend",
    body: "Measure, refine, add, campaign. A presence is living. We stay on it.",
  },
] as const;

export const capabilities = [
  "Custom websites",
  "Web apps",
  "Design",
  "Brand",
  "E-commerce",
  "Hosting",
  "Domains",
  "Email",
  "SEO",
  "Campaigns",
  "Motion",
  "Retainers",
] as const;
