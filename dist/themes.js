/* Complete palettes and bounded, WCAG contrast-aware color derivation. No storage. */
export const themeNames={sand:'رمل هادئ',cocoa:'قهوة وورق',olive:'زيتون وورق',ink:'حبر الأرشيف',ivory:'حبر وعاج',midnight:'منتصف الليل'};
export const darkNames={ink:'ليل حبري',cocoa:'قهوة ليلية',olive:'زيتون ليلي',midnight:'منتصف الليل',sand:'ليل رملي',ivory:'حبر ليلي'};
const seeds={
 sand:{light:['#f8f4ed','#fffdf9','#302820','#77685b','#e7ddcf','#865438','#f0e3d3','#8a6444'],dark:['#1c1d1e','#252729','#eee9e2','#bdb6ae','#424241','#dfb58f','#35322e','#d9b894'],nav:'#3b332b'},
 cocoa:{light:['#f4f0ed','#fffcfa','#332824','#78665e','#e4d8d1','#734c3d','#ede1d9','#8e6b54'],dark:['#211b19','#2d2420','#f2e8df','#c6b3a7','#4e3c33','#dfb9a2','#3d2d25','#e2bd9f'],nav:'#382b26'},
 olive:{light:['#f6f4ea','#fffef8','#313226','#70715d','#dfdfca','#5b6040','#e9eadb','#7b7450'],dark:['#202118','#2a2d20','#eeeede','#bec1a5','#474b35','#c4ce99','#363e27','#d3cb99'],nav:'#303525'},
 ink:{light:['#f7f5f0','#fffdfa','#252f40','#626f82','#dce2e7','#405d83','#e6edf3','#687e97'],dark:['#1c2530','#263240','#e6edf5','#b5c4d4','#41546a','#a9c7ed','#304157','#b5c8e0'],nav:'#2c3b4d'},
 ivory:{light:['#f7f5ef','#fffef9','#292926','#69685f','#deded4','#59584d','#ecebdf','#777254'],dark:['#222321','#2a2c28','#eeeede','#bcbfb2','#464941','#cecdb2','#393c32','#cbc4a0'],nav:'#373831'},
 midnight:{dark:['#1b1e28','#252936','#e9e9f1','#bcbecf','#44495d','#bdc1df','#353a50','#c4b8d8'],nav:'#242735'}
};
export const lightThemes=['sand','cocoa','olive','ink','ivory'];export const darkThemes=['ink','cocoa','olive','midnight'];
const valid=c=>/^#[0-9a-f]{6}$/i.test(c||'');const channels=c=>c.slice(1).match(/../g).map(v=>parseInt(v,16));
export function mix(a,b,t){const x=channels(a),y=channels(b);return '#'+x.map((v,i)=>Math.round(v+(y[i]-v)*t).toString(16).padStart(2,'0')).join('')}
export function luminance(c){return channels(c).map(v=>v/255).map(v=>v<=.04045?v/12.92:((v+.055)/1.055)**2.4).reduce((s,v,i)=>s+v*[.2126,.7152,.0722][i],0)}
export function contrast(a,b){const x=luminance(a),y=luminance(b);return (Math.max(x,y)+.05)/(Math.min(x,y)+.05)}
export function onColor(bg){const ink=contrast(bg,'#251d17')>=contrast(bg,'#fffdf9')?'#251d17':'#fffdf9';return contrast(bg,ink)>=4.5?ink:contrast(bg,'#000000')>=contrast(bg,'#ffffff')?'#000000':'#ffffff'}
export function readable(color,backgrounds,min=4.5){if(backgrounds.every(bg=>contrast(color,bg)>=min))return color;const options=['#171717','#f7f4ed','#000000','#ffffff'];const target=options.sort((a,b)=>Math.min(...backgrounds.map(bg=>contrast(b,bg)))-Math.min(...backgrounds.map(bg=>contrast(a,bg))))[0];for(let i=1;i<=100;i++){const next=mix(color,target,i/100);if(backgrounds.every(bg=>contrast(next,bg)>=min))return next}return target}
export function resolveTheme(p={},mode='light'){
 const dark=mode==='dark';const palette=lightThemes.includes(p.palette)?p.palette:'sand';const id=dark&&darkThemes.includes(p.darkPalette)?p.darkPalette:palette;const seed=seeds[id];const [paper,surface,ink,muted,line,accent,soft,gold]=seed[dark?'dark':'light'];
 let bg=paper,canvas=surface,requested=accent;
 if(p.palette==='custom'){
  requested=valid(p.customAccent)?p.customAccent:'#8a593e';const custom=valid(p.customBackground)?p.customBackground:'#f8f4ed';bg=dark?(luminance(custom)>.18?mix(custom,'#131517',.87):custom):custom;canvas=mix(bg,onColor(bg)==='#251d17'?'#ffffff':'#b9b6ae',dark?.04:.35);
 }
 const text=readable(ink,[bg,canvas]),secondary=readable(muted,[bg,canvas]),subtle=p.palette==='custom'?mix(canvas,requested,.12):soft;
 const primary=readable(requested,[bg,canvas,subtle]);const border=p.palette==='custom'?mix(canvas,text,.18):line;
 const nav=p.sidebarTone==='light'?mix(bg,primary,dark?.07:.035):dark?mix(bg,primary,.07):seed.nav;
 const navText=onColor(nav),navMuted=readable(mix(navText,nav,.78),[nav]);
 const selection=mix(canvas,primary,.2),selectionInk=readable(text,[selection]);
 const success=readable(dark?'#accab1':'#426c50',[bg,canvas]),warning=readable(dark?'#ddbf90':'#806130',[bg,canvas]),danger=readable(dark?'#e3aaa2':'#963e37',[bg,canvas]);
 return {'paper':bg,'surface':canvas,'ink':text,'muted':secondary,'line':border,'green':primary,'soft':subtle,'gold':readable(gold,[bg,canvas]),'on-accent':onColor(primary),'nav-bg':nav,'nav-ink':navText,'background':bg,'journal-canvas':canvas,'foreground':text,'foreground-secondary':secondary,'surface-raised':mix(canvas,onColor(canvas)==='#251d17'?'#ffffff':'#eee9e2',dark?.025:.3),'surface-muted':subtle,'border':border,'border-subtle':mix(canvas,text,.1),'control-border':readable(border,[canvas],3),'primary':primary,'primary-hover':mix(primary,luminance(onColor(primary))<.2?'#ffffff':'#171717',.12),'primary-subtle':subtle,'selected-background':subtle,'selected-foreground':readable(primary,[subtle]),'hover-background':mix(canvas,primary,.06),'focus':primary,'selection':selection,'selection-foreground':selectionInk,'success':success,'warning':warning,'danger':danger,'sidebar-background':nav,'sidebar-foreground':navText,'sidebar-secondary':navMuted,'sidebar-hover':mix(nav,navText,.07),'sidebar-selected':mix(nav,navText,.12),'sidebar-selected-foreground':readable(navText,[mix(nav,navText,.12)]),'sidebar-border':mix(nav,navText,.14),'custom-adjusted':primary!==requested?'true':'false'};
}
export function themePreviewStyle(t){return ['paper','surface','ink','muted','green','on-accent','nav-bg','nav-ink'].map(k=>`--preview-${k}:${t[k]}`).join(';')}
