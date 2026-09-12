import Image from "next/image";
import { ProjectCard } from "@/components/project-card";
import { Reveal } from "@/components/reveal";
import { projects as italianProjects } from "@/content/projects";
import { englishProjects } from "@/content/projects-en";
import { copy, type Locale } from "@/content/translations";
import { SiteHeader } from "./site-header";
import { SiteFooter } from "./site-footer";

export function HomePage({ locale }: { locale: Locale }) {
  const t = copy[locale];
  const projects = locale === "en" ? englishProjects : italianProjects;
  return (
    <>
      <a href="#main" className="skip-link">{t.skip}</a>
      <SiteHeader locale={locale} overlay />
      <main tabIndex={-1} id="main">
        <section className="hero hero-video" aria-labelledby="hero-title">
          <div className="hero-artwork" aria-hidden="true"><Image src="/hero/viva-sculptural-v1.png" alt="" fill sizes="100vw" preload /></div>
          <div className="hero-content shell">
          <div className="eyebrow"><span>{t.ideas}</span><span>{t.city}</span></div>
          <h1 id="hero-title"><span className="hero-line">{t.headline[0]}</span><span className="hero-line">{t.headline[1]}<span className="orange">.</span></span></h1>
          <div className="hero-bottom"><a className="text-link" href="#progetti">{t.explore} <span aria-hidden="true">↓</span></a><p>{t.intro[0]}<br />{t.intro[1]}</p></div>
        </div>
        </section>
        <section className="work shell" id="progetti" aria-labelledby="work-title">
          <Reveal><div className="work-intro"><h2 id="work-title">{t.workTitle}</h2><p>{t.workIntro}</p></div></Reveal>
          <div className="project-grid">
            {projects.map((project, index) => <Reveal className="project-slot" key={project.slug}><ProjectCard project={project} index={index} locale={locale} /></Reveal>)}
          </div>
        </section>
        <section className="studio shell" id="studio" aria-labelledby="studio-title">
          <span className="section-kicker">{t.studioLabel}</span>
          <Reveal><h2 id="studio-title">{t.values[0]}<br />{t.values[1]}<br /><span className="orange">{t.values[2]}</span></h2><p>{t.founders}</p><p className="studio-secondary">{t.about}</p><a className="studio-more" href={locale === "it" ? "/studio" : "/en/studio"}>{locale === "it" ? "Conosci lo studio" : "Meet the studio"} ↗</a></Reveal>
        </section>
        <section className="services shell" aria-labelledby="services-title">
          <div className="section-label"><h2 id="services-title">{t.servicesTitle}</h2><span>{t.expertise}</span></div>
          {t.services.map((service, index) => <Reveal key={service.title}><div className="service-row"><span className="service-number">0{index + 1}</span><h3>{service.title}</h3><p>{service.text}</p></div></Reveal>)}
        </section>
      </main>
      <SiteFooter locale={locale} />
    </>
  );
}
