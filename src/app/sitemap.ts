import type { MetadataRoute } from "next";
import { projects } from "@/content/projects";
export default function sitemap(): MetadataRoute.Sitemap {
  return ["", "/studio", "/contatti", ...projects.map(p => `/progetti/${p.slug}`)].flatMap(path => {
    const it = `https://vivaonweb.com${path || "/"}`;
    const en = `https://vivaonweb.com/en${path}`;
    return [it, en].map(url => ({ url, alternates: { languages: { it, en, "x-default": it } } }));
  });
}
