from pathlib import Path
import json,collections,re
root=Path(__file__).resolve().parents[1];d=root/'discovery'
posts=[p for p in json.loads((d/'contents.json').read_text()) if p['type']=='post']
# Editorial classifications based on recovered text; not WordPress categories.
diary=set('76 261 513 608 638 648 965 990 1079 1091 1185 1341 1509 1591'.split())
press=set('1432 1529 1545'.split())
excluded={'2057','2284'}
selected={}
for name,ids in {'Brera':'127 366 549 573 1122 1153 1191 1196 1301 1321 1352 1363 1387 1443 1503 1520 1553 1583 1595 1599 2013 2016 2040 2050 2293 2308 2516','Palazzo Citterio':'170 2508 2529','Cenacolo':'2218 2230','Braidense':'2411 2422','Poldi Pezzoli':'2477 2493 2499','Palazzo Boncompagni':'2426 2440 2504','Galleria Cavour':'2473 2481','Explora':'2466'}.items():
 for id in ids.split():selected[id]=name
base={p['translation_group']:p for p in posts if p['language']!='en'}
rows=[]
for p in posts:
 src=base.get(p['translation_group'],p) if p['language']=='en' else p
 id=src['id'];dest='';note=''
 if p['id'] in {'1115','1119'}:kind='Duplicato URL';action='Non creare una pagina aggiuntiva';note='Stesso permalink di 1112; confrontare le varianti prima della migrazione.'
 elif id in excluded:kind='Progetto escluso';action='Non ripubblicare';note='Esclusione esplicita dell’utente.'
 elif id in press:kind='Rassegna stampa';action='Valutare come fonte nella scheda Brera';note='Verificare fonte originale e pertinenza; non ripubblicare automaticamente gli estratti.'
 elif id in diary:kind='Diario / ispirazioni / vita dello studio';action='Conservare nel backup';note='Non prioritario per il nuovo sito.'
 elif id in selected:kind='Materiale per progetti selezionati';dest=selected[id];action='Integrare nella scheda, se pertinente';note='Non confondere fasi storiche e incarico attuale; nessun nuovo caso studio automatico.'
 else:kind='Altri lavori / annunci storici';action='Conservare nel backup, valutare singolarmente';note='Fuori dalla selezione attuale; può essere annuncio o materiale breve, non necessariamente un caso completo.'
 if p['language']=='en':note+=' Versione EN collegata tramite WPML; non un progetto aggiuntivo.'
 if p['id']=='2411':note+=' Testo EN classificato IT, sovrapposto a 2422 e con affermazioni da verificare.'
 rows.append({'id':p['id'],'title':re.sub('<[^>]+>',' ',p['title']),'language':p['language'] or 'non assegnata','date':p['date'][:10],'url':p['url_recorded'],'kind':kind,'destination':dest,'action':action,'note':note})
counts=collections.Counter(r['kind'] for r in rows)
main=collections.Counter(r['kind'] for r in rows if r['language']!='en')
lines=['# Check dei 122 articoli','', 'Analisi editoriale del backup. Le classificazioni sono proposte basate sui testi; non sono misure di valore SEO né decisioni di cancellazione.','', '## Che cosa rappresentano i numeri','', '- 122 record pubblicati: 93 marcati IT, 28 EN e 1 senza lingua.','- Le 28 versioni EN hanno tutte un record non EN nel rispettivo gruppo WPML. Alcune non sono traduzioni complete o corrette.','- Escludendo le 28 versioni EN restano 94 record; tre condividono lo stesso URL del Castello di San Giorgio Monferrato. Togliendo le due righe duplicate restano 92 record di base con URL distinti. Questo non equivale a 92 progetti: più articoli raccontano lo stesso lavoro o la stessa istituzione.','- Su tutte le lingue ci sono 120 URL registrati distinti.','- Presente anche un articolo scritto in inglese ma marcato IT sulla Braidense; si sovrappone a un altro articolo sul sito della biblioteca.','', '## Ripartizione editoriale','', '| Tipo | Record totali, incluse versioni EN | Record senza le versioni EN |','|---|---:|---:|']
for k,n in counts.items():lines.append(f'| {k} | {n} | {main[k]} |')
lines+=['','## Indicazione per il nuovo sito','','Suggerisco di non importare automaticamente un blog o un archivio pubblico. Molti testi sono annunci di lancio, brevi racconti di eventi, lavorazioni e notizie ormai storiche. Recuperiamo invece testi e materiali utili per gli otto progetti selezionati. Questa è una proposta, non una decisione già approvata.','','Esempi: gli articoli sul sito, sui video e sui dialoghi di Brera diventano materiale da selezionare nella scheda Brera, distinguendo periodi e interventi. I due articoli su Palazzo Citterio raccontano sito/materiali e wayfinding. Per la Braidense conviene partire dal testo italiano specifico. “A caccia di energia”, il ricordo di una visita o il cambio sede non richiedono pagine nel nuovo portfolio.','','Gli altri lavori, come Duomo, Brixia Sacra, Fondazione Rovati, Idroscalo e Museo di Luni, rimangono documentazione storica interna, non nuove proposte di inserimento. Terre Borromeo e Ambrosiana restano esclusi come richiesto.','','Separare la scelta editoriale dalla gestione degli URL: senza dati di traffico e backlink non possiamo stabilire quali indirizzi storici abbiano valore da conservare. Nessun redirect o eliminazione è stato eseguito; non associare tutti gli URL alla home per comodità.','','## Inventario completo','','| ID | Data | Lingua | Titolo | Classificazione | Destinazione possibile |','|---|---|---|---|---|---|']
for r in rows:lines.append('| '+' | '.join(str(r[k]).replace('|','\\|') for k in ('id','date','language','title','kind','destination'))+' |')
(d/'articles-audit.md').write_text('\n'.join(lines)+'\n')
(d/'articles-audit.json').write_text(json.dumps(rows,ensure_ascii=False,indent=2))
assert len(rows)==122
print(dict(counts));print('Non EN:',dict(main))
p=d/'content-direction.md';s=p.read_text().replace('## Posizionamento proposto','## Posizionamento confermato')
s=s.replace('Confermare se arte e cultura devono guidare il posizionamento, lasciando spazio anche alle imprese. Poi selezionare i materiali visivi dei progetti selezionati e integrare le informazioni mancanti. Non occorre riscrivere tutti i 122 articoli per definire la direzione del nuovo sito.','Il posizionamento è confermato: arte e cultura al centro, con apertura alle imprese. Il check dei 122 articoli è disponibile in articles-audit.md. Proposta da valutare: usare i contenuti utili nelle schede progetto senza importare automaticamente il vecchio blog. Poi selezionare i materiali visivi e integrare le informazioni mancanti.')
p.write_text(s)
