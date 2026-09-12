import type { Metadata } from "next";
import { copy, type Locale } from "./translations";

export function homeMetadata(locale: Locale): Metadata {
  const text = copy[locale];
  const url = locale === "it" ? "https://vivaonweb.com/" : "https://vivaonweb.com/en";
  return {
    icons: { icon: [{ url: "/brand/favicon.png", type: "image/png", sizes: "64x64" }], apple: [{ url: "/brand/apple-touch-icon.png", sizes: "180x180" }] },
    twitter: { card: "summary_large_image", images: ["https://vivaonweb.com/hero/viva-og.jpg"] },
    title: text.title,
    description: text.description,
    robots: { index: false, follow: false },
    alternates: {
      canonical: url,
      languages: { it: "https://vivaonweb.com/", en: "https://vivaonweb.com/en", "x-default": "https://vivaonweb.com/" },
    },
    openGraph: { images: [{ url: "https://vivaonweb.com/hero/viva-og.jpg", width: 1200, height: 630, alt: "Viva! — Comunicazione, design e sviluppo web" }], title: text.title, description: text.description, url, siteName: "Viva!", type: "website", locale: locale === "it" ? "it_IT" : "en_US", alternateLocale: locale === "it" ? "en_US" : "it_IT" },
  };
}

export function studioMetadata(locale: Locale): Metadata {
  const title = locale === "it" ? "Studio — Viva! | Comunicazione, design e sviluppo web" : "Studio — Viva! | Communication, design and web development";
  const description = copy[locale].about;
  const it = "https://vivaonweb.com/studio";
  const en = "https://vivaonweb.com/en/studio";
  const url = locale === "it" ? it : en;
  return { ...homeMetadata(locale), title, description,
    alternates: { canonical: url, languages: { it, en, "x-default": it } },
    openGraph: { ...homeMetadata(locale).openGraph, title, description, url, images: [{ url: "https://vivaonweb.com/hero/viva-studio-v1.png" }] },
    twitter: { card: "summary_large_image", images: ["https://vivaonweb.com/hero/viva-studio-v1.png"] },
  };
}

export function contactMetadata(locale: Locale): Metadata {
 const title=locale === "it" ? "Contatti — Viva! | Parliamo del tuo progetto" : "Contact — Viva! | Let’s talk about your project";
 const description=locale === "it" ? "Raccontaci la tua idea. Contatta Viva!, studio di comunicazione, design e sviluppo web a Milano." : "Tell us about your idea. Contact Viva!, a communication, design and web development studio in Milan.";
 const it="https://vivaonweb.com/contatti",en="https://vivaonweb.com/en/contatti",url=locale === "it" ? it : en;
 return {...homeMetadata(locale),title,description,alternates:{canonical:url,languages:{it,en,"x-default":it}},openGraph:{...homeMetadata(locale).openGraph,title,description,url,images:[{url:"https://vivaonweb.com/hero/viva-contact-v2.png"}]},twitter:{card:"summary_large_image",images:["https://vivaonweb.com/hero/viva-contact-v2.png"]}};
}

export function projectMetadata(project: import("./projects").Project, locale: Locale): Metadata {
 const title=`${project.title} — Viva!`;
 const description=project.description;
 const it=`https://vivaonweb.com/progetti/${project.slug}`,en=`https://vivaonweb.com/en/progetti/${project.slug}`,url=locale === "it" ? it : en;
 return {...homeMetadata(locale),title,description,alternates:{canonical:url,languages:{it,en,"x-default":it}},openGraph:{...homeMetadata(locale).openGraph,title,description,url}};
}
