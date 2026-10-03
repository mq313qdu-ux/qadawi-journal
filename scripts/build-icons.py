"""Bundle curated official Lucide SVGs. No runtime icon package/CDN."""
import hashlib,html,json,urllib.request,xml.etree.ElementTree as ET
from pathlib import Path
ROOT=Path(__file__).resolve().parent.parent
SHA='500620a2e8123f8d1db191538886dc0c223f69a9'
ALIASES={'book':'book-open','sun':'sun','calendar':'calendar-days','vault':'archive','chart':'chart-no-axes-column','search':'search','settings':'sliders-horizontal','plus':'plus','pen':'pen-line','lock':'lock-keyhole','close':'x','star':'star','mic':'mic','photo':'image','check':'check','download':'download','people':'users-round','place':'map-pin','chevron':'chevron-left','chevron-right':'chevron-right','trash':'trash','palette':'palette','reset':'rotate-ccw','menu':'menu','arrow':'arrow-right','spark':'sparkles','heart':'heart'}
def fetch(path):
 u='https://raw.githubusercontent.com/lucide-icons/lucide/'+SHA+'/'+path
 cache=ROOT/'tests/artifacts/icon-source'/SHA/path
 if cache.exists():return cache.read_bytes()
 raw=urllib.request.urlopen(urllib.request.Request(u,headers={'User-Agent':'Qadawi-icon-build'}),timeout=30).read()
 cache.parent.mkdir(parents=True,exist_ok=True);cache.write_bytes(raw);return raw
icons={};provenance=[]
for key,name in ALIASES.items():
 print('Bundling '+name,flush=True);raw=fetch('icons/'+name+'.svg');root=ET.fromstring(raw);parts=[]
 for e in root:
  tag=e.tag.split('}')[-1]
  if tag not in ['path','circle','rect','line','polyline','polygon','ellipse']:raise ValueError('Unexpected SVG node')
  if any(k.lower().startswith('on') or k in ['href','style'] for k in e.attrib):raise ValueError('Unsafe SVG attribute')
  parts.append('<'+tag+' '+ ' '.join(k+'="'+html.escape(v,quote=True)+'"' for k,v in e.attrib.items())+'/>')
 icons[key]=''.join(parts);provenance.append({'alias':key,'source':'icons/'+name+'.svg','sha256':hashlib.sha256(raw).hexdigest()})
logo='<path d="M43 18a19 19 0 1 0 1 27"/><path d="m35 37 14 15"/><path class="logo-detail" d="M23 25h12M23 32h8"/>'
source='/* Curated Lucide vectors; see licenses/LUCIDE-LICENSE.txt. Original Qadawi brand mark retained. */\nconst icons=Object.freeze('+json.dumps(icons,ensure_ascii=False,indent=2)+');\nconst logo='+json.dumps(logo)+';\n'
source+="""export function icon(name){if(name==='logo')return `<svg class="qadawi-symbol" viewBox="0 0 64 64" aria-hidden="true">${logo}</svg>`;const key=Object.hasOwn(icons,name)?name:'book';return `<svg data-icon="${key}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${icons[key]}</svg>`}\n"""

(ROOT/'dist/icons.js').write_text(source,encoding='utf-8')
(ROOT/'dist/licenses').mkdir(exist_ok=True)
(ROOT/'dist/licenses/LUCIDE-LICENSE.txt').write_bytes(fetch('LICENSE'))
(ROOT/'dist/licenses/LUCIDE-SOURCES.json').write_text(json.dumps({'commit':SHA,'source':'https://github.com/lucide-icons/lucide','icons':provenance},indent=2)+'\n',encoding='utf-8')
print('Bundled',len(icons),'official Lucide vectors with license/source hashes.')
