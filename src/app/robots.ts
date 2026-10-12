import type { MetadataRoute } from "next";
export default function robots(): MetadataRoute.Robots {
  // Keep pages crawlable so crawlers can read the pre-launch noindex metadata.
  return { rules: { userAgent: "*", allow: "/", disallow: "/api/" }, sitemap: "https://www.vivaonweb.com/sitemap.xml" };
}
