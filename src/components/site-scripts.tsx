/* These scripts are shared by both root layouts and the standalone 404 document. */
import Script from "next/script";
import type { Locale } from "@/content/translations";

const googleTagId = "G-W5E3T9JZBS";

export function SiteScripts({ locale, standalone = false }: { locale: Locale; standalone?: boolean }) {
  // beforeInteractive requires a root layout; the global 404 bypasses layouts.
  const strategy = standalone ? "afterInteractive" : "beforeInteractive";
  const cookieConfiguration = {
    invalidateConsentWithoutLog: true,
    consentOnContinuedBrowsing: false,
    perPurposeConsent: true,
    lang: locale,
    siteId: 1511114,
    floatingPreferencesButtonDisplay: "bottom-right",
    cookiePolicyId: 46288755,
    banner: {
      acceptButtonDisplay: true,
      customizeButtonDisplay: true,
      acceptButtonColor: "#fb9100",
      acceptButtonCaptionColor: "white",
      customizeButtonColor: "#212121",
      customizeButtonCaptionColor: "white",
      rejectButtonDisplay: true,
      rejectButtonColor: "rgba(213.07, 156.89, 80.04, 0.72)",
      rejectButtonCaptionColor: "white",
      position: "top",
      textColor: "#dadada",
      backgroundColor: "#5A5A5A",
      closeButtonDisplay: false,
      listPurposes: true,
      explicitWithdrawal: true,
    },
  };

  const consentScript = `
    window._iub = window._iub || [];
    window._iub.csConfiguration = ${JSON.stringify(cookieConfiguration)};
    window['ga-disable-${googleTagId}'] = true;
    window._iub.csConfiguration.callback = {
      onPreferenceExpressed: function(preference) {
        var granted = !!(preference && (preference.purposes
          ? preference.purposes[4] === true
          : preference.consent === true));
        window['ga-disable-${googleTagId}'] = !granted;
        if (typeof window.gtag === 'function') {
          window.gtag('consent', 'update', {
            analytics_storage: granted ? 'granted' : 'denied'
          });
        }
      }
    };
  `;

  const googleTagScript = `
    window.dataLayer = window.dataLayer || [];
    function gtag(){dataLayer.push(arguments);}
    window['ga-disable-${googleTagId}'] = false;
    gtag('consent', 'default', {
      analytics_storage: 'granted',
      ad_storage: 'denied',
      ad_user_data: 'denied',
      ad_personalization: 'denied'
    });
    gtag('js', new Date());
    gtag('config', '${googleTagId}');
  `;

  return (
    <>
      <Script id="iubenda-config" strategy={strategy}>{consentScript}</Script>
      <Script src="https://cdn.iubenda.com/cs/iubenda_cs.js" strategy={strategy} />
      {/* Iubenda releases these inert scripts only after Measurement (purpose 4) consent.
          With saved consent, it may replace their attributes before hydration. */}
      <script id="google-tag-config" type="text/plain" className="_iub_cs_activate" data-iub-purposes="4" suppressHydrationWarning dangerouslySetInnerHTML={{ __html: googleTagScript }} />
      <script id="google-tag-loader" type="text/plain" className="_iub_cs_activate" data-iub-purposes="4" suppressHydrationWarning async data-suppressedsrc={`https://www.googletagmanager.com/gtag/js?id=${googleTagId}`} />
      <Script src="https://cdn.iubenda.com/iubenda.js" strategy="afterInteractive" />
    </>
  );
}
