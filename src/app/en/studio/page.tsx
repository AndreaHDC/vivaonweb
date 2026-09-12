import { StudioPage } from "@/components/studio-page";
import { studioMetadata } from "@/content/metadata";
export const metadata = studioMetadata("en");
export default function Page() { return <StudioPage locale="en" />; }
