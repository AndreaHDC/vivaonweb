import { copy, type Locale } from "@/content/translations";
import type { Project } from "@/content/projects";

const base = "https://vivaonweb.com";
export function StructuredData({ locale, page, project }: { locale: Locale; page: "home" | "studio" | "contact" | "project"; project?: Project }) {
  const t = copy[locale];
  const root = locale === "it" ? "" : "/en";
  const path = page === "home" ? "" : page === "studio" ? "/studio" : page === "contact" ? "/contatti" : `/progetti/${project!.slug}`;
  const url = `${base}${root}${path || (root ? "" : "/")}`;
  const org = { "@id": `${base}/#organization` };
  const name = project?.title ?? (page === "home" ? t.title : page === "studio" ? "Studio — Viva!" : locale === "it" ? "Contatti — Viva!" : "Contact — Viva!");
  const graph: Record<string, unknown>[] = [
    { "@type": "Organization", ...org, name: "Viva!", url: `${base}/`, logo: `${base}/brand/viva-original.png`, description: t.about, sameAs: ["https://instagram.com/viva_on_ig/", "https://vimeo.com/user45261607", "https://open.spotify.com/user/uj7f66jodolgw1zrzcvcvd3r7"], founder: [{ "@type": "Person", name: "Barbara Vitale" }, { "@type": "Person", name: "Valentina Pagani Donadelli" }] },
    { "@type": "WebSite", "@id": `${base}/#website`, url: `${base}/`, name: "Viva!", publisher: org, inLanguage: ["it", "en"] },
    { "@type": page === "studio" ? "AboutPage" : page === "contact" ? "ContactPage" : "WebPage", "@id": `${url}#page`, url, name, inLanguage: locale, isPartOf: { "@id": `${base}/#website` }, about: org, description: project?.description ?? t.about },
  ];
  if (page === "home" || page === "studio") {
    t.services.forEach((service, index) => graph.push({ "@type": "Service", "@id": `${base}${root}/#service-${index + 1}`, name: service.title, description: service.text, provider: org, mainEntityOfPage: { "@id": `${url}#page` } }));
  }
  if (project) graph.push({ "@type": "CreativeWork", "@id": `${url}#project`, name: project.title, description: project.description, creator: org, inLanguage: locale, keywords: project.discipline, image: `${base}${project.slug === "palazzo-citterio" ? "/projects/citterio-website.jpg" : project.image}`, mainEntityOfPage: { "@id": `${url}#page` } });
  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({ "@context": "https://schema.org", "@graph": graph }).replace(/</g, "\\u003c") }} />;
}
