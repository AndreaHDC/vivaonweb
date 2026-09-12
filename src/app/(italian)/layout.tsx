import { SiteDocument } from "@/components/site-document";

export default function Layout({ children }: { children: React.ReactNode }) {
  return <SiteDocument locale="it">{children}</SiteDocument>;
}
