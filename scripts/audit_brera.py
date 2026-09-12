from pathlib import Path
import json,re,urllib.parse,subprocess
R=Path(__file__).resolve().parents[1];D=R/'discovery';U=R/'backup/public/old/wp-content/uploads'
a=json.loads((D/'articles-audit.json').read_text());ids={r['id'] for r in a if r['destination']=='Brera' and r['language']!='en'}
posts=[p for p in json.loads((D/'contents.json').read_text()) if p['id'] in ids];media={m['id']:m for m in json.loads((D/'media.json').read_text())};files={};videos={}
for p in posts:
 s=p['raw_content']+' '+json.dumps(p['metadata']);refs={p['featured_image_id']}
 refs.update(re.findall(r'wp-image-(\d+)',s))
 refs.update(v for k,v in p['metadata'].items() if re.fullmatch('image[0-9]*',k) and v.isdigit())
 paths={media[i]['file'] for i in refs if i in media and media[i]['file']}
 paths.update(urllib.parse.unquote(x) for x in re.findall(r'wp-content/uploads/([^\s"<>\\]+)',s))
 for path in paths:
  if (U/path).is_file():files.setdefault(path,[]).append(p['id'])
 for id in re.findall(r'(?:player\.)?vimeo.com/(?:video/)?(\d+)',s):videos.setdefault(id,[]).append(p['id'])
rows=[]
for f,refs in sorted(files.items()):
 out=subprocess.run(['sips','-g','pixelWidth','-g','pixelHeight',str(U/f)],capture_output=True,text=True).stdout
 w=re.search(r'pixelWidth: (\d+)',out);h=re.search(r'pixelHeight: (\d+)',out)
 rows.append({'file':f,'width':int(w[1]) if w else None,'height':int(h[1]) if h else None,'source_posts':sorted(set(refs))})
(D/'brera-assets.json').write_text(json.dumps({'assets':rows,'vimeo_references':videos},ensure_ascii=False,indent=2))
lines=['# Brera — materiali recuperati e mancanti','','Verifica locale del backup; nessun controllo del sito attuale o della disponibilità online dei video. Ricerca nei testi, immagini in evidenza e metadati dei 27 record di base associati a Brera nel check editoriale. Non comprende ogni possibile file senza collegamenti o asset di slider globali.','','## Esito','','Per il sito 2024 è recuperato un mockup JPEG di 1400 × 1000 pixel, verificato visivamente, con homepage, collezioni e scheda opera. Due record media rimandano allo stesso file: non sono due immagini diverse. È utilizzabile come anteprima di lavoro; per una presentazione estesa servono schermate più grandi e immagini mobili.','','Per il sito precedente esiste un mockup di 500 × 375 pixel, verificato visivamente: adatto solo a una piccola testimonianza storica. Non usarlo come immagine del sito 2024. Verificata visivamente anche la composizione myBrera, che rappresenta un altro progetto storico.','','Il testo 2024 documenta design e sviluppo del sito e design della comunicazione del museo, ma non spiega scelte, obiettivi o risultati in dettaglio. I testi storici offrono più informazioni, che non vanno trasferite automaticamente alla versione recente.','',f'Nella ricerca sono stati risolti {len(rows)} file immagine distinti collegati e {len(videos)} riferimenti Vimeo distinti. Nessun file MP4, MOV o WebM trovato nella cartella uploads. Un riferimento Vimeo non equivale a un video recuperato o verificato.','','## Da integrare per la scheda principale','','- Schermate desktop e mobile del progetto 2024: home, collezioni, singola opera, informazioni di visita. Nel mockup appaiono alcune di queste viste, ma non come file separati ad alta risoluzione.','- Obiettivi dell’incarico e principali scelte di navigazione, design e sviluppo.','- Materiali della comunicazione legati al medesimo incarico, con date e attribuzioni.','- Crediti e collaboratori; eventuali dati di risultato disponibili. Nessuna metrica nel breve articolo 2024.','- Per eventuali approfondimenti storici: scegliere video o materiali, confermare i crediti ed evitare una cronologia troppo estesa.','','## Struttura suggerita','','Aprire con il sito 2024: mockup, sintesi del lavoro, schermate commentate e competenze. Inserire eventualmente una breve sezione sulla collaborazione nel tempo, con pochi materiali di progetti precedenti chiaramente datati. Non creare un articolo per ogni vecchia notizia.','','## Immagini collegate','','| File nel backup uploads | Dimensioni | Articoli fonte |','|---|---|---|']
for r in rows:lines.append(f"| {r['file']} | {r['width']} × {r['height']} | {', '.join(r['source_posts'])} |")
lines+=['','## Video: riferimenti da verificare','']
for id,refs in videos.items():lines.append(f'- https://vimeo.com/{id} — articoli {", ".join(sorted(set(refs)))}')
(D/'brera-materials.md').write_text('\n'.join(lines)+'\n');print(len(rows),'immagini',len(videos),'video referenziati')
