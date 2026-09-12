import Image from "next/image";
import { Reveal } from "./reveal";
import { copy, type Locale } from "@/content/translations";
export function SiteFooter({ locale, showContactCta = true }: { locale: Locale; showContactCta?: boolean }) {
const t = copy[locale];
return (      <footer id="contatti">
        <div className="shell"><div className="footer-heading"><span>{t.next}</span><span>{t.conversation}</span></div><Reveal><h2 className="contact-title">{t.contact[0]}<br />{t.contact[1]}<span className="orange">.</span></h2></Reveal>{showContactCta && <a className="contact-cta" href={locale === "it" ? "/contatti" : "/en/contatti"}>{locale === "it" ? "Parliamo del tuo progetto" : "Let’s talk about your project"}<span aria-hidden="true">↗</span></a>}<div className="footer-bottom"><a className="brand-logo footer-brand" href="#top" aria-label={`Viva! — ${t.top}`}><Image src="/brand/viva-original.png" alt="Viva! — Fresh Squeezed Ideas" width={849} height={574} className="brand-image" /></a><span>{t.footer}</span><a href="#top">{t.top} ↑</a></div><nav className="footer-socials" aria-label="Social"><a href="https://instagram.com/viva_on_ig/">Instagram</a><a href="https://vimeo.com/user45261607">Vimeo</a><a href="https://open.spotify.com/user/uj7f66jodolgw1zrzcvcvd3r7">Spotify</a></nav></div>
      </footer>);
}
