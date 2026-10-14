import Image from "next/image";
import type { Project } from "@/content/projects";

export function ProjectWebsiteCover({ project, preload = false, sizes = "(max-width:700px) 92vw, (max-width:1100px) 46vw, 30vw" }: { project: Project; preload?: boolean; sizes?: string }) {
  return (
    <div className="project-image project-website-cover">
      <Image src={project.image} alt={project.alt} fill sizes={sizes} preload={preload} />
    </div>
  );
}
