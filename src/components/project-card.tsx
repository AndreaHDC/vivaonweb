import Image from "next/image";
import { copy, type Locale } from "@/content/translations";
import type { Project } from "@/content/projects";

export function ProjectCard({ project, index, locale }: { project: Project; index: number; locale: Locale }) {
  return (
    <article className="project" id={project.slug}>
      <a className="project-card-link" href={`${locale === "it" ? "" : "/en"}/progetti/${project.slug}`}>
          <div className={`project-image image-${project.slug}`}>
            <Image src={project.image} alt={project.alt} fill sizes="(max-width: 700px) 92vw, 46vw" preload={index === 0} />
            <span className="project-action" aria-hidden="true">{copy[locale].read} <span>↗</span></span>
          </div>
          <div className="project-caption">
            <div><h3>{project.title}</h3><p>{project.discipline}</p></div>
            <span className="expand-icon" aria-hidden="true">↗</span>
          </div>
        </a>
    </article>
  );
}
