import Image from "next/image";
import { LanguageSwitch } from "./language-switch";
import { copy, type Locale } from "@/content/translations";
export function SiteHeader({ locale, overlay = false, current = "studio" }: { locale: Locale; overlay?: boolean; current?: "studio" | "contact" | "projects" }) {
  const t = copy[locale];
  const home = locale === "it" ? "/" : "/en";
  return <header className={`site-header shell ${overlay ? "" : "interior-header"}`} id="top">
    <a className="brand-logo" href={home} aria-label="Viva! — Home"><Image src="/brand/viva-original.png" alt={t.logo} width={849} height={574} className="brand-image" preload /></a>
    <nav aria-label={t.nav}><a href={`${home}#progetti`} aria-current={!overlay && current === "projects" ? "page" : undefined}>{t.projects}</a><a href={`${home === "/" ? "" : home}/studio`} aria-current={!overlay && current === "studio" ? "page" : undefined}>{t.studio}</a><a href={`${home === "/" ? "" : home}/contatti`} aria-current={!overlay && current === "contact" ? "page" : undefined}>{t.talk} <span aria-hidden="true">↗</span></a></nav><LanguageSwitch locale={locale} />
  </header>;
}
