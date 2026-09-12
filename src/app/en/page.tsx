import { HomePage } from "@/components/home-page";
import { homeMetadata } from "@/content/metadata";

export const metadata = homeMetadata("en");

export default function Page() { return <HomePage locale="en" />; }
