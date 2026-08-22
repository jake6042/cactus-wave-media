import type { MetadataRoute } from "next";
import { site } from "@/lib/site";
import { works } from "@/lib/work";

export default function sitemap(): MetadataRoute.Sitemap {
  const routes = ["", "/work", "/services", "/studio", "/contact", "/brand"].map(
    (path) => ({
      url: `${site.url}${path}`,
      lastModified: new Date(),
    }),
  );

  const workRoutes = works.map((work) => ({
    url: `${site.url}/work/${work.slug}`,
    lastModified: new Date(),
  }));

  return [...routes, ...workRoutes];
}
