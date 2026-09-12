/* Shared document rendered exclusively by the App Router root layouts. */
/* eslint-disable @next/next/no-before-interactive-script-outside-document */
import Script from "next/script";
import { SmoothScroll } from "@/components/smooth-scroll";
import "lenis/dist/lenis.css";
import localFont from "next/font/local";
import type { Locale } from "@/content/translations";
import "@/app/globals.css";

const inter = localFont({
  src: "../app/fonts/InterVariable.woff2",
  variable: "--font-viva",
  weight: "100 900",
  style: "normal",
  display: "swap",
});

export function SiteDocument({ children, locale }: Readonly<{ children: React.ReactNode; locale: Locale }>) {
  // Browser privacy extensions may add attributes to html before hydration.
  // Suppression is limited to this element; descendants remain checked.
  return (
    <html lang={locale} className={inter.variable} suppressHydrationWarning>
      <body>
        <Script id="iubenda-config" strategy="beforeInteractive">{"window._iub = window._iub || []; window._iub.csConfiguration = {\"invalidateConsentWithoutLog\":true,\"consentOnContinuedBrowsing\":false,\"perPurposeConsent\":true,\"lang\":\"it\",\"siteId\":1511114,\"floatingPreferencesButtonDisplay\":\"bottom-right\",\"cookiePolicyId\":46288755,\"banner\":{\"acceptButtonDisplay\":true,\"customizeButtonDisplay\":true,\"acceptButtonColor\":\"#fb9100\",\"acceptButtonCaptionColor\":\"white\",\"customizeButtonColor\":\"#212121\",\"customizeButtonCaptionColor\":\"white\",\"rejectButtonDisplay\":true,\"rejectButtonColor\":\"rgba(213.07, 156.89, 80.04, 0.72)\",\"rejectButtonCaptionColor\":\"white\",\"position\":\"top\",\"textColor\":\"#dadada\",\"backgroundColor\":\"#5A5A5A\",\"closeButtonDisplay\":false,\"listPurposes\":true,\"explicitWithdrawal\":true}};"}</Script>
        <Script src="https://cdn.iubenda.com/cs/iubenda_cs.js" strategy="beforeInteractive" />
        <SmoothScroll />{children}
      </body>
    </html>
  );
}
