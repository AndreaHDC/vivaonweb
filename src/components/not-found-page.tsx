import Image from "next/image";
import { notFoundCopy } from "@/content/not-found";
import { copy, type Locale } from "@/content/translations";

export function NotFoundPage({ locale }: { locale: Locale }) {
  const t = notFoundCopy[locale];
  const home = locale === "en" ? "/en" : "/";

  return (
    <div className="not-found-scene">
      <a className="skip-link" href="#not-found-main">{t.skip}</a>
      <header className="not-found-header shell">
        <a className="brand-logo" href={home} aria-label={`Viva! — ${t.home}`}>
          <Image src="/brand/viva-original.png" alt={copy[locale].logo} width={849} height={574} className="brand-image" />
        </a>
        <span className="not-found-header-note">Fresh Squeezed Ideas</span>
        <nav className="not-found-languages" aria-label={t.language}>
          <a href="/404" lang="it" hrefLang="it" aria-label="Italiano" aria-current={locale === "it" ? "page" : undefined}>IT</a>
          <a href="/en/404" lang="en" hrefLang="en" aria-label="English" aria-current={locale === "en" ? "page" : undefined}>EN</a>
        </nav>
      </header>
      <main id="not-found-main" tabIndex={-1} className="not-found-main shell">
        <div className="not-found-copy">
          <p className="not-found-code"><span>404</span><span aria-hidden="true"> / </span>{t.code}</p>
          <h1 className="not-found-title"><span>{t.exclamation}</span><span>{t.question}</span></h1>
          <p className="not-found-description">{t.description}</p>
          <div className="not-found-actions">
            <a className="not-found-home" href={home}>{t.home}<span aria-hidden="true">↗</span></a>
            <a className="not-found-projects" href={`${home}#progetti`}>{t.projects}<span aria-hidden="true">→</span></a>
          </div>
        </div>
        <div className="not-found-visual">
          <Image src="/hero/viva-orange-404-v1.png" alt={t.image} fill sizes="100vw" preload />
        </div>
      </main>
    </div>
  );
}
