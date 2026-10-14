import type { Locale } from "@/content/translations";
import type { Project } from "@/content/projects";
import { ProjectWebsiteCover } from "./project-website-cover";

export function ProjectCard({ project, index, locale }: { project: Project; index: number; locale: Locale }) {
  return (
    <article className="project" id={project.slug}>
      <a className="project-card-link" href={`${locale === "it" ? "" : "/en"}/progetti/${project.slug}`}>
          <ProjectWebsiteCover project={project} preload={index === 0} />
          <div className="project-caption">
            <div><h3>{project.title}</h3><p>{project.discipline}</p></div>
            <span className="expand-icon" aria-hidden="true">↗</span>
          </div>
        </a>
    </article>
  );
}
