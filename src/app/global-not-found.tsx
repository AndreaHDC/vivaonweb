import type { Metadata } from "next";
import { headers } from "next/headers";
import localFont from "next/font/local";
import { NotFoundPage } from "@/components/not-found-page";
import { notFoundCopy } from "@/content/not-found";
import { SiteScripts } from "@/components/site-scripts";
import "./globals.css";

const inter = localFont({
  src: "./fonts/InterVariable.woff2",
  variable: "--font-viva",
  weight: "100 900",
  display: "swap",
});

async function getLocale() {
  return (await headers()).get("x-viva-locale") === "en" ? "en" : "it";
}

export async function generateMetadata(): Promise<Metadata> {
  const locale = await getLocale();
  return { title: notFoundCopy[locale].title, robots: { index: false, follow: false } };
}

export default async function GlobalNotFound() {
  const locale = await getLocale();
  return <html lang={locale} className={inter.variable}><body><SiteScripts locale={locale} standalone /><NotFoundPage locale={locale} /></body></html>;
}
