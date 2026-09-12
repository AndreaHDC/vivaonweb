export type Project = {
  slug: string;
  title: string;
  confirmedPosition: number | null;
  image: string;
  alt: string;
  discipline: string;
  year: string;
  description: string;
};

// Only the first four positions are confirmed. Remaining order is provisional.
export const projects: readonly Project[] = [
  { slug: "pinacoteca-di-brera", title: "Pinacoteca di Brera", confirmedPosition: 1, image: "/projects/brera.jpg", alt: "Mockup del sito di Brera con homepage, collezioni e scheda opera", discipline: "Web design, sviluppo, comunicazione", year: "2024", description: "Nel 2024 abbiamo progettato e sviluppato il nuovo sito della Pinacoteca di Brera. Un nuovo capitolo di un percorso che nel tempo ha intrecciato esperienze digitali, contenuti e comunicazione visiva." },
  { slug: "palazzo-citterio", title: "Palazzo Citterio", confirmedPosition: 2, image: "/projects/citterio.jpg", alt: "Sale di Palazzo Citterio con grafica museale accanto alle opere", discipline: "Web design, grafica museale, wayfinding", year: "2024–2025", description: "Dall’apertura del nuovo sito ai materiali di comunicazione, fino alla grafica museale e al wayfinding. Per Palazzo Citterio abbiamo lavorato sull’incontro con il museo, online e lungo il percorso espositivo." },
  { slug: "cenacolo-vinciano", title: "Museo del Cenacolo Vinciano", confirmedPosition: 3, image: "/projects/cenacolo.jpg", alt: "Il sito del Cenacolo Vinciano su desktop, tablet e telefono", discipline: "Web design, storytelling, video", year: "2019–2023", description: "Abbiamo progettato e sviluppato il sito del Museo del Cenacolo Vinciano, affiancando informazioni di visita, storytelling e immagini ad alta definizione. Il progetto comprende un video teaser; un successivo lavoro sui social estende il racconto del museo." },
  { slug: "biblioteca-braidense", title: "Biblioteca Nazionale Braidense", confirmedPosition: 4, image: "/projects/braidense.jpeg", alt: "Le pagine del sito della Biblioteca Braidense su dispositivi diversi", discipline: "Web design, contenuti, calendario eventi", year: "2023", description: "Collezioni, fondi e attività in una struttura pensata per una consultazione chiara. Per la Biblioteca Nazionale Braidense abbiamo lavorato al nuovo sito e a un calendario per esplorare la programmazione e pianificare la visita." },
  { slug: "poldi-pezzoli", title: "Museo Poldi Pezzoli", confirmedPosition: null, image: "/projects/poldi.jpg", alt: "Presentazione del sito Poldi Pezzoli con un dettaglio pittorico e un drappo rosso", discipline: "Web, materiali di visita, visual identity", year: "2023–2024", description: "Una nuova mappa e brochure per accompagnare il pubblico, un nuovo sito e la comunicazione della mostra sul Polittico agostiniano di Piero della Francesca. Interventi distinti, tra digitale, grafica e racconto del museo." },
  { slug: "palazzo-boncompagni", title: "Palazzo Boncompagni", confirmedPosition: null, image: "/projects/boncompagni.jpg", alt: "Visual blu e oro della mostra Mimmo Paladino a Palazzo Boncompagni", discipline: "Identità, editoria, campagne", year: "2023–2024", description: "Per le mostre di Aldo Mondino e Mimmo Paladino a Palazzo Boncompagni abbiamo curato logo e visual, cataloghi, advertising e social. Due progetti che uniscono comunicazione visiva, editoria e promozione culturale." },
  { slug: "galleria-cavour", title: "Galleria Cavour 1959", confirmedPosition: null, image: "/projects/cavour.jpg", alt: "Manifesto giallo e nero This is the Place per Galleria Cavour 1959", discipline: "Visual identity, advertising, video", year: "2023", description: "Visual identity, design e advertising digitale per Galleria Cavour 1959. Il lavoro comprende anche comunicazione digitale e video dedicati all’intervento dell’artista Pietro Terzini sulla facciata della galleria." },
  { slug: "explora", title: "Explora — Il museo dei bambini di Roma", confirmedPosition: null, image: "/projects/explora.jpeg", alt: "Il museo Explora di Roma", discipline: "Progettazione, web design, sviluppo", year: "2023", description: "Per Explora, il museo dei bambini di Roma, abbiamo studiato, disegnato e sviluppato il nuovo sito web. Un progetto dedicato a un luogo in cui gioco e apprendimento si incontrano, rivolto ai bambini e agli adulti che li accompagnano." },
];
