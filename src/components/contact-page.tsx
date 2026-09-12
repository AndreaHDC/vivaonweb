import { StructuredData } from "./structured-data";
import Image from "next/image";
import { SiteHeader } from "./site-header";
import { SiteFooter } from "./site-footer";
import { ContactForm } from "./contact-form";
import { copy, type Locale } from "@/content/translations";
export function ContactPage({locale}:{locale:Locale}){
 const it=locale === "it",t=copy[locale];
 return <><a href="#main" className="skip-link">{t.skip}</a><SiteHeader locale={locale} current="contact"/><StructuredData locale={locale} page="contact" /><main tabIndex={-1} id="main" className="studio-page"><section className="studio-opening studio-image-opening" aria-labelledby="contact-page-title"><Image src="/hero/viva-contact-v2.png" alt="" fill sizes="100vw" preload className="studio-hero-image"/><div className="shell studio-hero-content"><div className="eyebrow"><span>{it?"Contatti / Viva!":"Contact / Viva!"}</span><span>{t.city}</span></div><h1 id="contact-page-title">{it?"Cominciamo":"Let’s start"}<br/>{it?"da un’idea.":"with an idea."}</h1></div></section><section className="contact-body shell" id="scrivici" aria-labelledby="write-title"><div><span className="section-kicker">{it?"Parliamone":"Let’s talk"}</span><h2 id="write-title">{it?"Diamo forma alla tua idea.":"Let’s shape your idea."}</h2><p>{it?"Un progetto da immaginare, una storia da raccontare, un’identità da ripensare. Raccontaci da dove vuoi partire.":"A project to imagine, a story to tell, an identity to rethink. Tell us where you would like to start."}</p><p className="contact-city">{it?"Viva! — Comunicazione e design. Milano.":"Viva! — Communication and design. Milan."}</p></div><ContactForm locale={locale}/></section></main><SiteFooter locale={locale} showContactCta={false}/></>;
}
