import { HeroArtwork } from "./hero-artwork";
import { StructuredData } from "./structured-data";
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
      <StructuredData locale={locale} page="home" /><main tabIndex={-1} id="main">
        <section className="hero hero-video" aria-labelledby="hero-title">
          <HeroArtwork src="/hero/viva-home-v2.png" />
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
          <Reveal className="home-studio-portrait"><Image src="/studio/founders-home.png" alt={locale === "it" ? "Barbara e Valentina, fondatrici di Viva!, al museo" : "Barbara and Valentina, founders of Viva!, at the museum"} width={1696} height={2120} sizes="(max-width:700px) 92vw, 30vw" /></Reveal>
          <Reveal className="home-studio-copy"><span className="section-kicker">{t.studioLabel}</span><h2 id="studio-title">{t.values[0]}<br />{t.values[1]}<br /><span className="orange">{t.values[2]}</span></h2><p>{t.founders}</p><p className="studio-secondary">{t.about}</p><a className="studio-more" href={locale === "it" ? "/studio" : "/en/studio"}>{locale === "it" ? "Conosci lo studio" : "Meet the studio"} ↗</a></Reveal>
        </section>
        <section className="services shell" aria-labelledby="services-title">
          <div className="section-label"><h2 id="services-title">{t.servicesTitle}</h2><span>{t.expertise}</span></div>
          <div className="services-grid">{t.services.map((service, index) => <Reveal key={service.title}><div className="service-row"><Image className="service-art" src={`/services/${["identity-v2", "web", "content"][index]}.png`} alt="" width={320} height={320} sizes="(max-width:700px) 92vw, 30vw" /><h3>{(locale === "it" ? [["Identità e", "comunicazione"], ["Web design e", "sviluppo web"], ["Contenuti e", "campagne digitali"]] : [["Identity and", "communication"], ["Web design and", "development"], ["Content and", "digital campaigns"]])[index].map((line) => <span className="service-title-line" key={line}>{line}</span>)}</h3><p>{service.text}</p></div></Reveal>)}</div>
        </section>
      </main>
      <SiteFooter locale={locale} />
    </>
  );
}
