# Viva! — nuovo sito

Scaffold Next.js App Router con TypeScript, Tailwind CSS ed ESLint. Node 22, npm e lockfile. La prima home è implementata: sans serif in stile Helvetica, griglia essenziale, otto progetti con dettagli espandibili, studio, competenze e contatti. Animazioni progressive con rispetto di prefers-reduced-motion.

## Sviluppo

```sh
npm ci
npm run dev
```

Verifiche: `npm run lint`, `npm run typecheck`, `npm run build`.

## Struttura

- `src/app`: layout, metadata, stili e home.
- `src/content`: dati dello studio e otto progetti selezionati. Solo i primi quattro hanno ordine confermato.
- `src/components`: componenti condivisi da sviluppare insieme alla home.
- `public`: solo asset selezionati per il nuovo sito.
- `discovery`: analisi e bozze editoriali interne, non importate nell'app.
- `backup`: archivio WordPress originale, escluso da Git e caricamenti Vercel.

Nessun CRM, database o CMS aggiunto. Blog e vecchi articoli non vengono pubblicati. Le schede locali in `discovery/case-studies.md` sono la base per le future pagine, non route già implementate.

## Vercel e pubblicazione futura

Progetto compatibile con il preset Next.js di Vercel, root directory del repository, comando `npm run build`. Nessun account collegato e nessun deploy eseguito. `.vercelignore` esclude backup, discovery e script di analisi dagli upload CLI; nessuno di questi contenuti è importato dal codice applicativo.

L’anteprima locale mantiene metadata `noindex`: prima del lancio impostare indicizzazione per la sola produzione, dominio/canonical, sitemap delle route reali, Open Graph e dati strutturati basati su dati aziendali confermati. Definire anche redirect e trattamento degli URL storici. Non sono ancora configurati SEO/AEO completi.

Riferimento: https://nextjs.org/docs/app/getting-started/installation

## Tipografia

Inter Variable 4.1 incluso localmente tramite next/font/local, scaricato dalla distribuzione ufficiale https://rsms.me/inter/. Licenza OFL conservata in src/app/fonts/INTER-LICENSE.txt. Nessuna richiesta al fornitore durante la visita.

## Italiano e inglese

Home italiana `/`, inglese `/en`. Due layout radice condividono `SiteDocument` per emettere la lingua HTML corretta già sul server. Copy e metadati sono tradotti; il selettore conserva il frammento della sezione corrente e usa navigazione completa tra le due lingue. I nomi propri delle istituzioni rimangono originali. Le future pagine devono esistere in entrambe le lingue prima di esporre i rispettivi link; gli slug possono restare comuni. Canonical e hreflang puntano al dominio di produzione previsto, ma l’anteprima resta noindex.
