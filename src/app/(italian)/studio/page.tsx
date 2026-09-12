import { StudioPage } from "@/components/studio-page";
import { studioMetadata } from "@/content/metadata";
export const metadata = studioMetadata("it");
export default function Page() { return <StudioPage locale="it" />; }
