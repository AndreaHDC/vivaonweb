import Image from "next/image";
import imageSizes from "@/content/project-image-sizes.json";
function ProjectImage({src,alt,preload=false}:{src:string;alt:string;preload?:boolean}) {
 const size=imageSizes[src as keyof typeof imageSizes];
 return <Image src={src} alt={alt} width={size.width} height={size.height} style={{maxWidth:`min(100%, ${Math.round(size.width * 1.5)}px)`}} sizes="(max-width:700px) 92vw, 44vw" preload={preload}/>;
}
import { SiteHeader } from "./site-header";
import { SiteFooter } from "./site-footer";
import { Reveal } from "./reveal";
import { projects, type Project } from "@/content/projects";
import { englishProjects } from "@/content/projects-en";
import cases from "@/content/case-studies.json";
import { caseStudiesEn } from "@/content/case-studies-en";
import { copy, type Locale } from "@/content/translations";
const websites: Record<string,string> = {
 "pinacoteca-di-brera":"https://pinacotecabrera.org/", "palazzo-citterio":"https://www.palazzocitterio.org/", "cenacolo-vinciano":"https://cenacolovinciano.org/", "biblioteca-braidense":"https://www.bibliotecabraidense.org/", "poldi-pezzoli":"https://www.museopoldipezzoli.it/", "palazzo-boncompagni":"https://palazzoboncompagni.it/", "galleria-cavour":"https://galleriacavour.it/", "explora":"https://mdbr.it/",
};
export function ProjectPage({project,locale}:{project:Project;locale:Locale}){
 const it=locale === "it",root=it?"":"/en",t=copy[locale];
 const detail=cases[project.slug as keyof typeof cases];const text=it?detail:caseStudiesEn[project.slug];
 const list=it?projects:englishProjects;const next=list[(list.findIndex(p=>p.slug===project.slug)+1)%list.length];
 return <><a className="skip-link" href="#main">{t.skip}</a><SiteHeader locale={locale} current="projects"/><main id="main" className="case-page"><section className="shell case-opening"><a className="case-back" href={`${root}/#progetti`}>← {it?"Tutti i progetti":"All projects"}</a><h1>{project.title}</h1><p className="case-subtitle">{text.title}</p><p className="case-discipline">{project.discipline}</p></section><section className="shell case-pair case-intro-pair" aria-labelledby="overview-title"><figure className="case-cover"><ProjectImage src={project.slug === "palazzo-citterio" ? "/projects/citterio-website.jpg" : project.image} alt={project.slug === "palazzo-citterio" ? (it ? "Il sito di Palazzo Citterio su computer e telefono" : "Palazzo Citterio website on laptop and phone") : project.alt} preload /></figure><div className="case-overview"><h2 id="overview-title">{it?"Il progetto":"The project"}</h2><p>{project.description}</p></div></section><div className="shell case-story">{text.sections.map((section,i)=><Reveal key={section.title}><section className={`case-story-row ${detail.images[i] ? "case-pair" : "case-text-row"}`}><div className="case-section"><h2>{section.title}</h2><p>{section.text}</p></div>{detail.images[i] && <figure className="case-detail"><ProjectImage src={detail.images[i]} alt={`${project.title} — ${section.title}`} /></figure>}</section></Reveal>)}</div><nav className="shell case-next" aria-label={it?"Collegamenti progetto":"Project links"}><div><span>{it?"Il sito":"Website"}</span><a href={websites[project.slug]} target="_blank" rel="noopener noreferrer">{it?"Visita il sito":"Visit website"}<span aria-hidden="true">↗</span><span className="sr-only">{it?" (si apre in una nuova scheda)":" (opens in a new tab)"}</span></a></div><div><span>{it?"Progetto successivo":"Next project"}</span><a href={`${root}/progetti/${next.slug}`}>{next.title}<span aria-hidden="true">→</span></a></div></nav></main><SiteFooter locale={locale}/></>;
}
