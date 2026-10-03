/* Local presentation helpers. No database access, telemetry, or network requests. */
import {normalize} from './core.js';
let settingsCategory='appearance',statusObserver;
export const copy={capture:'لقطة سريعة',journal:'دفتر الأيام',vault:'خزنة الذكريات',saved:'محفوظ على جهازك'};

export function enhanceWorkspace(root,route,icon){
  statusObserver?.disconnect();
  if(route==='settings')organizeSettings(root,icon);
  if(route==='free'){
    const editor=root.querySelector('.entry-editor');
    if(editor){
      const grow=()=>{editor.style.height='auto';editor.style.height=`${Math.max(380,editor.scrollHeight+4)}px`};
      editor.addEventListener('input',grow);requestAnimationFrame(grow);
      const status=document.createElement('div');status.className='editor-status';status.setAttribute('role','status');
      const update=()=>{const text=editor.value.trim();status.textContent=`${text?text.split(/\s+/u).length:0} كلمة · ${document.querySelector('#save-state')?.textContent||copy.saved}`};
      editor.after(status);editor.addEventListener('input',update);update();
      const observer=new MutationObserver(()=>{if(!status.isConnected){observer.disconnect();return}update()});statusObserver=observer;observer.observe(document.querySelector('#save-state'),{childList:true,characterData:true,subtree:true});
    }
  }
  if(route==='calendar'){
    const cells=[...root.querySelectorAll('[data-action=calendar-select]')];
    cells.forEach((cell,index)=>{if(cell.dataset.keyboardReady)return;cell.dataset.keyboardReady='true';cell.addEventListener('keydown',e=>{
      let next=index;const delta={ArrowRight:-1,ArrowLeft:1,ArrowDown:7,ArrowUp:-7};
      if(e.key in delta)next=index+delta[e.key];else if(e.key==='Home')next=0;else if(e.key==='End')next=cells.length-1;else return;
      e.preventDefault();const target=cells[Math.min(cells.length-1,Math.max(0,next))];target.focus();target.click();
    })});
  }
  if(route!=='reading')root.querySelectorAll('.event-actions').forEach(el=>el.open=true);
  if(route==='reading')root.querySelectorAll('.timeline-event .row').forEach(el=>el.classList.add('no-print'));
}

function organizeSettings(root,icon){
  const container=root.querySelector('.reading');if(!container)return;
  container.className='settings-workspace';
  const sections=[...container.querySelectorAll(':scope > .settings-section')];
  const appearance=sections.shift();const panels=[];
  const add=(id,title,section,symbol)=>{section.dataset.settingsPanel=id;section.classList.add('settings-panel');panels.push({id,title,section,symbol})};
  if(appearance){
    const groups=[['appearance','المظهر والألوان','palette'],['writing','الخطوط والكتابة','pen'],['layout','ترتيب الواجهة','menu'],['today','صفحة اليوم','sun'],['accessibility','سهولة الاستخدام','settings']];
    let current=document.createElement('section');current.className='settings-section';add(...groups[0].slice(0,2),current,groups[0][2]);
    let group=0;
    for(const node of [...appearance.children]){
      if(node.tagName==='H3'&&node.textContent.includes('الخطوط'))group=1;
      else if(node.tagName==='H3'&&node.textContent.includes('ترتيب'))group=2;
      else if(node.tagName==='H3'&&node.textContent.includes('ما يظهر'))group=3;
      else if(node.matches('label.preference-toggle')&&node.textContent.includes('تقليل'))group=4;
      if(current.dataset.settingsPanel!==groups[group][0]){current=document.createElement('section');current.className='settings-section';add(...groups[group].slice(0,2),current,groups[group][2]);const title=document.createElement('h2');title.textContent=groups[group][1];current.append(title)}
      current.append(node);
    }
    const sample=document.createElement('div');sample.className='typography-preview';sample.innerHTML='<span class="eyebrow">خط يومياتك</span><p dir="auto">تفصيل صغير، ذكرى كبيرة.<br>My words, my memories.</p>';panels.find(p=>p.id==='writing').section.append(sample);
    const help=document.createElement('p');help.className='muted';help.textContent='كل الأفعال متاحة بلوحة المفاتيح. يمكن تكبير النص من قسم الخطوط. الحركة تتبع تفضيل الجهاز أيضًا.';panels.find(p=>p.id==='accessibility').section.append(help);
  }
  const names=[['reminders','الوقت والتذكير','calendar'],['memories','الذكريات والأسئلة','vault'],['privacy','الخصوصية والقفل','lock'],['data','النسخ والبيانات','download'],['offline','التخزين والتثبيت','book'],['assistant','مساعد الكتابة والصوت','mic']];
  sections.forEach((section,i)=>add(names[i][0],names[i][1],section,names[i][2]));
  container.replaceChildren();const nav=document.createElement('nav');nav.className='settings-index';nav.setAttribute('aria-label','أقسام الإعدادات');
  const select=document.createElement('select');select.className='settings-mobile-select';select.setAttribute('aria-label','قسم الإعدادات');
  const content=document.createElement('div');content.className='settings-content';
  const activate=id=>{settingsCategory=id;panels.forEach(p=>{p.section.hidden=p.id!==id;const b=nav.querySelector(`[data-category="${p.id}"]`);b.setAttribute('aria-current',p.id===id?'page':'false')});select.value=id};
  panels.forEach(p=>{const button=document.createElement('button');button.type='button';button.dataset.category=p.id;button.innerHTML=icon(p.symbol);const label=document.createElement('span');label.textContent=p.title;button.append(label);button.addEventListener('click',()=>activate(p.id));nav.append(button);const option=document.createElement('option');option.value=p.id;option.textContent=p.title;select.append(option);content.append(p.section)});
  select.addEventListener('change',()=>activate(select.value));container.append(nav,select,content);activate(panels.some(p=>p.id===settingsCategory)?settingsCategory:'appearance');
}

export function excerpt(text,query,limit=180){
  const source=String(text||'').replace(/^#+ /gm,'');if(!query)return source.slice(0,limit);
  const clean=normalize(query);let normalized='',positions=[];
  for(let i=0;i<source.length;i++){const value=normalize(source[i]);for(const char of value){normalized+=char;positions.push(i)}}
  const at=normalized.indexOf(clean);if(at<0)return source.slice(0,limit);
  const start=Math.max(0,positions[at]-50),end=Math.min(source.length,start+limit);
  return (start?'…':'')+source.slice(start,end)+(end<source.length?'…':'');
}

export function highlightText(element,query){
  if(!query)return;const text=element.textContent;let normalized='',positions=[];
  for(let i=0;i<text.length;i++)for(const char of normalize(text[i])){normalized+=char;positions.push(i)}
  const at=normalized.indexOf(normalize(query));if(at<0)return;const start=positions[at],end=positions[at+normalize(query).length-1]+1;
  const mark=document.createElement('mark');mark.textContent=text.slice(start,end);element.replaceChildren(document.createTextNode(text.slice(0,start)),mark,document.createTextNode(text.slice(end)));
}
