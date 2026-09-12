"""Read WordPress dump as data only; never execute SQL or PHP."""
import re,json,html
from pathlib import Path
from collections import Counter,defaultdict
ROOT=Path(__file__).resolve().parents[1]
sql=(ROOT/'backup/vivaonweb.sql').read_text(encoding='utf-8',errors='surrogateescape')
def table(name):
    schema=re.search(r'CREATE TABLE `'+name+r'` \((.*?)\n\) ENGINE',sql,re.S)
    if not schema:return []
    cols=re.findall(r'^  `([^`]+)`',schema[1],re.M)
    rows=[]
    for m in re.finditer(r'INSERT INTO `'+name+r'` VALUES\s*',sql):
        i=m.end()
        while sql[i]=='(':
            i+=1; vals=[]
            while True:
                if sql[i]=="'":
                    i+=1; out=[]
                    while True:
                        c=sql[i];i+=1
                        if c=='\\':
                            c=sql[i];i+=1;out.append({'n':'\n','r':'\r','t':'\t','0':'\0','Z':'\x1a'}.get(c,c))
                        elif c=="'":
                            if sql[i]=="'":out.append("'");i+=1
                            else:break
                        else:out.append(c)
                    vals.append(''.join(out))
                else:
                    end=i
                    while sql[i] not in ',)':i+=1
                    v=sql[end:i];vals.append(None if v=='NULL' else v)
                sep=sql[i];i+=1
                if sep==')':break
            assert len(cols)==len(vals),(name,len(cols),len(vals))
            rows.append(dict(zip(cols,vals)))
            if sql[i]!=',':break
            i+=1
            while sql[i].isspace():i+=1
    return rows
posts=table('wp_posts');meta=defaultdict(dict)
for r in table('wp_postmeta'):meta[r['post_id']][r['meta_key']]=r['meta_value']
opts={r['option_name']:r['option_value'] for r in table('wp_options')}
langs={r['element_id']:r for r in table('wp_icl_translations') if r['element_type'].startswith('post_')}
yoast={r['object_id']:r for r in table('wp_yoast_indexable') if r['object_type']=='post'}
terms={r['term_id']:r for r in table('wp_terms')};tax={r['term_taxonomy_id']:r for r in table('wp_term_taxonomy')};rels=defaultdict(list)
for r in table('wp_term_relationships'):
    t=tax.get(r['term_taxonomy_id'],{});term=terms.get(t.get('term_id'),{})
    rels[r['object_id']].append({'taxonomy':t.get('taxonomy'),'name':term.get('name'),'slug':term.get('slug')})
def clean(s):
    s=re.sub(r'<(script|style)\b.*?</\1>','',s,flags=re.S|re.I)
    s=re.sub(r'\[/?[a-zA-Z_][^\]]*\]','',s)
    s=re.sub(r'<(?:br\s*/?|/p|/div|/h[1-6])>','\n',s,flags=re.I)
    return re.sub(r'\n\s*\n+','\n\n',html.unescape(re.sub('<[^>]+>','',s))).strip()
public=[]
for p in posts:
    if p['post_status']!='publish' or p['post_type'] in ('nav_menu_item','revision','attachment'):continue
    id=p['ID'];m=meta[id];y=yoast.get(id,{})
    public.append({'id':id,'type':p['post_type'],'title':p['post_title'],'slug':p['post_name'],'parent':p['post_parent'],'date':p['post_date'],'language':langs.get(id,{}).get('language_code'),'translation_group':langs.get(id,{}).get('trid'),'url_recorded':y.get('permalink'),'guid_reference_only':p['guid'],'text':clean(p['post_content']),'raw_content':p['post_content'],'excerpt':p['post_excerpt'],'seo_title':m.get('_yoast_wpseo_title'),'seo_description':m.get('_yoast_wpseo_metadesc'),'noindex':m.get('_yoast_wpseo_meta-robots-noindex'),'featured_image_id':m.get('_thumbnail_id'),'terms':rels[id],'metadata':{k:v for k,v in m.items() if any(x in k.lower() for x in ('portfolio','gallery','image','video','url'))}})
menus=[{'id':p['ID'],'title':p['post_title'],'order':p['menu_order'],'terms':rels[p['ID']],'properties':{k:v for k,v in meta[p['ID']].items() if k.startswith('_menu_item')}} for p in posts if p['post_type']=='nav_menu_item' and p['post_status']=='publish']
attachments=[{'id':p['ID'],'title':p['post_title'],'file':meta[p['ID']].get('_wp_attached_file'),'alt':meta[p['ID']].get('_wp_attachment_image_alt'),'guid':p['guid']} for p in posts if p['post_type']=='attachment']
out=ROOT/'discovery'
for name,data in [('contents',public),('menus',menus),('media',attachments),('galleries',{'galleries':table('wp_ngg_gallery'),'pictures':table('wp_ngg_pictures'),'albums':table('wp_ngg_album')})]:
    (out/(name+'.json')).write_text(json.dumps(data,ensure_ascii=True,indent=2))
settings={k:opts.get(k) for k in ('home','siteurl','blogname','blogdescription','permalink_structure','show_on_front','page_on_front','page_for_posts','template','stylesheet')}
(out/'settings.json').write_text(json.dumps(settings,ensure_ascii=True,indent=2))
print(json.dumps({'settings':settings,'status_counts':dict(Counter(p['post_type']+':'+p['post_status'] for p in posts)),'public':len(public),'media':len(attachments),'menus':len(menus)},ensure_ascii=True,indent=2))
for p in public:print(p['id'],p['type'],p['language'],p['title'],p['slug'],p['url_recorded'],len(p['text']))
# Human-readable inventory; recorded URLs are evidence, not a live crawl.
editorial=[p for p in public if p['type'] in ('page','post')]
core={'271','1978','746','1048','172','1227'}
def label(p):
    if p['id'] in core:return 'Pagina principale'
    if p['type']=='post':return 'Articolo / progetto'
    return 'Demo o pagina legacy da valutare'
lines=['# Inventario URL e contenuti del backup','', 'URL ricavati dall’indice Yoast nel database; non verificati sul sito online. Le righe rappresentano record: URL duplicati sono mantenuti per consentire la revisione.','', '| ID | Lingua | Tipo | Titolo | URL registrato |','|---|---|---|---|---|']
for p in editorial:
    title=html.unescape(re.sub('<[^>]+>','',p['title'])).replace('|','\\|')
    lines.append(f"| {p['id']} | {p['language'] or 'non assegnata'} | {label(p)} | {title} | {p['url_recorded'] or 'non disponibile'} |")
(out/'sitemap-inventory.md').write_text('\n'.join(lines))
lines=['# Testi recuperati','', 'Estrazione leggibile da post_content. HTML e shortcode originali sono conservati in contents.json: testi negli attributi, slider, gallerie e contenuti dinamici richiedono lettura separata.','']
for p in editorial:
    lines.extend([f"## {p['title']} — {p['language'] or '?'} (ID {p['id']})",'',p['url_recorded'] or '', '',p['text'] or '*Nessun testo nel corpo: verificare shortcode/layout dinamico.*',''])
(out/'recovered-content.md').write_text('\n'.join(lines))
archive=[]
for t in tax.values():
    if t['taxonomy'] in ('category','post_tag'):
        archive.append({**t,**terms.get(t['term_id'],{})})
(out/'taxonomies.json').write_text(json.dumps(archive,ensure_ascii=True,indent=2))
# Supplementary presentation data can contain text beyond the post body.
(out/'sliders.json').write_text(json.dumps({n:table('wp_revslider_'+n) for n in ('sliders','slides','static_slides')},ensure_ascii=True,indent=2))
