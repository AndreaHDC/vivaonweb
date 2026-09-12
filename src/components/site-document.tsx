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
      <body><SmoothScroll />{children}</body>
    </html>
  );
}
