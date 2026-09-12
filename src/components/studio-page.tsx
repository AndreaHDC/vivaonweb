import Image from "next/image";
import { SiteHeader } from "./site-header";
import { SiteFooter } from "./site-footer";
import { Reveal } from "./reveal";
import { copy, type Locale } from "@/content/translations";
const studioCopy = {
  it: {
    title: ["Occhi nuovi.", "Idee condivise."],
    intro: "Comunicazione, design e cultura. Per dare alle storie una forma che le persone possano riconoscere, esplorare e vivere.",
    people: "Due nomi, uno studio.",
    approach: "Il nostro approccio", question: "Ogni storia merita la sua forma.",
    text: "Un sito, l’identità di una mostra, una campagna o un percorso museale sono occasioni diverse per affrontare la stessa domanda: come rendere una storia comprensibile, riconoscibile e capace di suscitare interesse?",
    collaboration: "Uniamo progettazione visiva, sviluppo e contenuti, lavorando insieme ai committenti e ai professionisti coinvolti per dare coerenza alle diverse parti del progetto.",
    principles: [
      { title: "Ascoltare.", text: "Partire dalle storie, dal contesto e dalle persone a cui ci rivolgiamo. Capire cosa conta, prima di scegliere come raccontarlo." },
      { title: "Dare forma.", text: "Mettere in relazione parole, immagini e strumenti. Cercare un linguaggio chiaro, capace di esprimere l’identità di ogni progetto." },
      { title: "Connettere.", text: "Tenere insieme i diversi punti di incontro con il pubblico: un sito, una pagina stampata, uno spazio, una campagna." },
    ], proof: "Le idee, messe in pratica.", projects: "Guarda i progetti",
  },
  en: {
    title: ["Fresh eyes.", "Shared ideas."],
    intro: "Communication, design and culture. Giving stories a form that people can recognise, explore and experience.",
    people: "Two names, one studio.",
    approach: "Our approach", question: "Every story deserves its own form.",
    text: "A website, an exhibition identity, a campaign or a museum trail: different opportunities to explore the same question. How can we make a story clear, distinctive and engaging?",
    collaboration: "We bring visual design, development and content together, working with clients and the professionals involved to make the different parts of a project feel coherent.",
    principles: [
      { title: "Listen.", text: "Start with the stories, the context and the people we want to reach. Understand what matters before deciding how to tell it." },
      { title: "Shape.", text: "Connect words, images and tools. Find a clear language that expresses the identity of each project." },
      { title: "Connect.", text: "Bring together the different ways people encounter a story: a website, a printed page, a space or a campaign." },
    ], proof: "Ideas, put into practice.", projects: "Explore the projects",
  },
};
export function StudioPage({ locale }: { locale: Locale }) {
  const t = copy[locale]; const s = studioCopy[locale];
  return <>
    <a href="#main" className="skip-link">{t.skip}</a><SiteHeader locale={locale} />
    <main tabIndex={-1} id="main" className="studio-page">
      <section className="studio-opening studio-image-opening" aria-labelledby="studio-page-title">
        <Image src="/hero/viva-studio-v1.png" alt="" fill sizes="100vw" preload className="studio-hero-image" />
        <div className="shell studio-hero-content">
        <div className="eyebrow"><span>{t.studioLabel}</span><span>{t.city}</span></div>
        <h1 id="studio-page-title">{s.title[0]}<br /><span className="orange">{s.title[1]}</span></h1>
        </div>
      </section>
      <div className="shell studio-introduction"><p className="studio-lead">{s.intro}</p></div>
      <section className="studio-people shell" aria-labelledby="people-title"><figure className="founders-photo"><Image src="/studio/barbara-valentina.png" alt={locale === "it" ? "Barbara Vitale e Valentina Pagani Donadelli insieme in una sala museale" : "Barbara Vitale and Valentina Pagani Donadelli together in a museum gallery"} width={1592} height={1700} sizes="(max-width: 700px) 92vw, 40vw" /></figure><Reveal><h2 id="people-title">{s.people}</h2><p className="studio-lead">{t.founders}</p><p>{t.about}</p></Reveal></section>
      <section className="studio-method" aria-labelledby="method-title"><div className="shell"><span className="section-kicker">{s.approach}</span><Reveal><h2 id="method-title">{s.question}</h2><div className="method-copy"><p>{s.text}</p><p>{s.collaboration}</p></div></Reveal><div className="studio-principles">{s.principles.map(p => <Reveal key={p.title}><h3>{p.title}</h3><p>{p.text}</p></Reveal>)}</div></div></section>
      <section className="services shell studio-expertise" aria-labelledby="services-title"><div className="section-label"><h2 id="services-title">{t.servicesTitle}</h2><span>{t.expertise}</span></div>{t.services.map(service => <Reveal key={service.title}><div className="studio-service"><h3>{service.title}</h3><p>{service.text}</p></div></Reveal>)}<div className="studio-proof"><h2>{s.proof}</h2><a className="studio-more" href={`${locale === "it" ? "/" : "/en"}#progetti`}>{s.projects} ↗</a></div></section>
    </main><SiteFooter locale={locale} />
  </>;
}
