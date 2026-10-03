import {esc} from './core.js';
export const fontNames={alexandria:'AlexandriaArabic',plex:'JournalArabic',readex:'ReadexArabic',cairo:'CairoArabic',tajawal:'TajawalArabic',almarai:'AlmaraiArabic',naskh:'NaskhArabic',system:'Tahoma'};
export const interfaceFonts=[['alexandria','Alexandria','الإسكندرية · حديث وواضح'],['plex','IBM Plex Sans Arabic','عملي ومتوازن'],['readex','Readex Pro','ناعم وسهل القراءة'],['cairo','Cairo','كايرو · مألوف'],['tajawal','Tajawal','تجوّل · خفيف'],['almarai','Almarai','المراعي · واضح']];
export const readingFonts=[['naskh','Noto Naskh Arabic','نسخي · أقرب إلى الكتاب'],...interfaceFonts.filter(([id])=>['alexandria','readex','plex','cairo'].includes(id))];
export function fontOptions(p,key,fonts){return `<div class="font-choice"><label for="appearance-${key}">${key==='uiFont'?'خط الواجهة':'خط صفحات اليوميات'}</label><select id="appearance-${key}" data-pref="${key}">${[...fonts,['system','خط الجهاز','']].map(([id,name])=>`<option value="${id}" ${p[key]===id?'selected':''}>${esc(name)}</option>`).join('')}</select><fieldset class="font-grid"><legend class="sr-only">${key==='uiFont'?'معاينة واختيار خط الواجهة':'معاينة واختيار خط القراءة'}</legend>${fonts.map(([id,name,detail])=>`<label class="font-card"><input type="radio" name="font-${key}" data-pref="${key}" value="${id}" ${p[key]===id?'checked':''}><span class="font-name" dir="ltr">${name}</span><span class="font-sample" style="font-family:${fontNames[id]},Tahoma,sans-serif">تفصيل صغير، ذكرى كبيرة.<br><span dir="ltr">My words, my memories.</span></span><small>${detail}</small><span class="font-check" aria-hidden="true">✓</span></label>`).join('')}</fieldset></div>`}

/* Warm only the two selected roles before displaying private content. Bounded
   wait preserves startup if a browser cannot load a font; swap remains fallback. */
export async function prepareTypography(p){
 if(!document.fonts?.load)return;
 const weight=['400','500','600'].includes(String(p.fontWeight))?p.fontWeight:'500';
 const fonts=[[p.uiFont,weight],[p.readingFont,400]].map(([id,w])=>`${w} 18px ${Object.hasOwn(fontNames,id)?fontNames[id]:'CairoArabic'}`);
 await Promise.race([Promise.all([...new Set(fonts)].map(font=>document.fonts.load(font))).catch(()=>{}),new Promise(resolve=>setTimeout(resolve,1200))]);
}
