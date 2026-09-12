"use client";

import { usePathname } from "next/navigation";
import type { Locale } from "@/content/translations";

export function LanguageSwitch({ locale }: { locale: Locale }) {
  const pathname = usePathname();
  const basePath = pathname.replace(/^\/en(?=\/|$)/, "") || "/";
  return (
    <div className="language-switch" role="group" aria-label={locale === "it" ? "Lingua" : "Language"}>
      {(["it", "en"] as const).map((language) => {
        const href = language === "it" ? basePath : `/en${basePath === "/" ? "" : basePath}`;
        return <a key={language} href={href} hrefLang={language} lang={language} aria-current={locale === language ? "page" : undefined} aria-label={language === "it" ? "Italiano" : "English"} onClick={(event) => { event.currentTarget.href = href + window.location.hash; }}>{language.toUpperCase()}</a>;
      })}
    </div>
  );
}
