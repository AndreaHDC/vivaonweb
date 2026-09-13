import { HeroArtwork } from "./hero-artwork";
import { StructuredData } from "./structured-data";
import { SiteHeader } from "./site-header";
import { SiteFooter } from "./site-footer";
import { ContactForm } from "./contact-form";
import { copy, type Locale } from "@/content/translations";
export function ContactPage({locale}:{locale:Locale}){
 const it=locale === "it",t=copy[locale];
 return <><a href="#main" className="skip-link">{t.skip}</a><SiteHeader locale={locale} current="contact" overlay/><StructuredData locale={locale} page="contact" /><main tabIndex={-1} id="main" className="studio-page"><section className="hero hero-video" aria-labelledby="contact-page-title"><HeroArtwork src="/hero/viva-contact-v3.png" /><div className="hero-content shell"><div className="eyebrow"><span>{it?"Contatti / Viva!":"Contact / Viva!"}</span><span>{t.city}</span></div><h1 id="contact-page-title"><span className="hero-line">{it?"Cominciamo":"Let’s start"}</span><span className="hero-line">{it?"da un’idea":"with an idea"}<span className="orange">.</span></span></h1><div className="hero-bottom"><a className="text-link" href="#scrivici">{it ? "Parliamo del tuo progetto" : "Let’s talk about your project"} <span aria-hidden="true">↓</span></a></div></div></section><section className="contact-body shell" id="scrivici" aria-labelledby="write-title"><div><span className="section-kicker">{it?"Parliamone":"Let’s talk"}</span><h2 id="write-title">{it?"Diamo forma alla tua idea.":"Let’s shape your idea."}</h2><p>{it?"Un progetto da immaginare, una storia da raccontare, un’identità da ripensare. Raccontaci da dove vuoi partire.":"A project to imagine, a story to tell, an identity to rethink. Tell us where you would like to start."}</p><p className="contact-city">{it?"Viva! — Comunicazione e design. Milano.":"Viva! — Communication and design. Milan."}</p></div><ContactForm locale={locale}/></section></main><SiteFooter locale={locale} showContactCta={false}/></>;
}
