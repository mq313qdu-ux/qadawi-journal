"""Local WOFF2 compression from pinned official sources of official SIL OFL fonts.
Build-only: fonttools==4.66.1, brotli==1.2.0. No runtime dependency.
PYTHONPATH=tests/artifacts/font-tools python scripts/build-fonts.py
"""
import hashlib, io, json, urllib.request
from pathlib import Path
from fontTools.ttLib import TTFont
from fontTools.varLib.instancer import instantiateVariableFont
ROOT=Path(__file__).resolve().parent.parent
OUT=ROOT/'dist/fonts'
SHA='9710da1eacb3be272583c3224dcb70f9da6eadbb'
FONTS={
 'alexandria':[('Alexandria[wght].ttf','alexandria.woff2')],
 'readexpro':[('ReadexPro[HEXP,wght].ttf','readex.woff2')],
 'tajawal':[('Tajawal-Regular.ttf','tajawal-regular.woff2'),('Tajawal-Medium.ttf','tajawal-medium.woff2'),('Tajawal-Bold.ttf','tajawal-bold.woff2')],
 'almarai':[('Almarai-Regular.ttf','almarai-regular.woff2'),('Almarai-Bold.ttf','almarai-bold.woff2')]
}
def fetch(path):
 url='https://raw.githubusercontent.com/google/fonts/'+SHA+'/ofl/'+path
 return urllib.request.urlopen(urllib.request.Request(url,headers={'User-Agent':'Qadawi-font-build'})).read(),url
manifest={'sourceCommit':SHA,'compression':'WOFF2 lossless outline/shaping compression; variable wght limited to 400–700; optional HEXP fixed at default','fonts':[]}
for family,files in FONTS.items():
 license_data,url=fetch(family+'/OFL.txt');(OUT/(family+'-OFL.txt')).write_text('\n'.join(line.rstrip() for line in license_data.decode('utf-8').splitlines())+'\n',encoding='utf-8')
 for name,target in files:
  raw,url=fetch(family+'/'+urllib.parse.quote(name));font=TTFont(io.BytesIO(raw))
  if 'fvar' in font:
   axes={a.axisTag:((400,700) if a.axisTag=='wght' else a.defaultValue) for a in font['fvar'].axes};font=instantiateVariableFont(font,axes,inplace=True)
  font.flavor='woff2';font.save(OUT/target)
  manifest['fonts'].append({'file':target,'source':url,'sourceSha256':hashlib.sha256(raw).hexdigest(),'sha256':hashlib.sha256((OUT/target).read_bytes()).hexdigest(),'bytes':(OUT/target).stat().st_size,'license':family+'-OFL.txt'})
for source,target,license in [('cairo.ttf','cairo.woff2','Cairo-OFL.txt'),('naskh.ttf','naskh.woff2','Naskh-OFL.txt')]:
 font=TTFont(ROOT/'scripts/font-sources'/source);font=instantiateVariableFont(font,{'wght':(400,700)},inplace=True);font.flavor='woff2';font.save(OUT/target)
 manifest['fonts'].append({'file':target,'source':'scripts/font-sources/'+source+' (preserved official source from previous Qadawi version)','sourceSha256':hashlib.sha256((ROOT/'scripts/font-sources'/source).read_bytes()).hexdigest(),'sha256':hashlib.sha256((OUT/target).read_bytes()).hexdigest(),'bytes':(OUT/target).stat().st_size,'license':license})
(OUT/'SOURCES.json').write_text(json.dumps(manifest,ensure_ascii=False,indent=2)+'\n',encoding='utf-8')
print(json.dumps({'bundledBytes':sum(x['bytes'] for x in manifest['fonts']),'files':[(x['file'],x['bytes']) for x in manifest['fonts']]}))
