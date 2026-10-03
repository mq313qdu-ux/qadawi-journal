/* Presentation only: no journal data, database access, or network requests. */
const normal = value => value.normalize('NFKC').replace(/[إأآ]/g,'ا').replace(/ى/g,'ي').toLocaleLowerCase();
let observedNavigation, navigationObserver;
export function polishView(root, route) {
  const navigation=document.querySelector('.mobile-nav');if(navigation&&navigation!==observedNavigation){navigationObserver?.disconnect();observedNavigation=navigation;navigationObserver=new ResizeObserver(()=>document.documentElement.style.setProperty('--mobile-nav-height',`${navigation.getBoundingClientRect().height}px`));navigationObserver.observe(navigation)}
  root.querySelectorAll('input:not([type]), input[type=text], textarea').forEach(el=>{el.dir='auto'});
  root.querySelectorAll('.page-heading').forEach(el=>{el.dataset.section=route});
  if(route==='free') {
    const note=root.querySelector('.composition-note');
    if(note){const details=document.createElement('details');details.className='composition-help';const summary=document.createElement('summary');summary.textContent='كيف نرتّب كلماتك؟';note.before(details);details.append(summary,note)}
    const title=root.querySelector('[name=entry-title]');if(title)title.placeholder='عنوان بسيط، إذا تحب';
  }
  if(route==='calendar'){for(const [action,symbol,label] of [['month-prev','›','الشهر السابق'],['month-next','‹','الشهر التالي']]){const control=root.querySelector(`[data-action=${action}]`);if(control){control.textContent=symbol;control.setAttribute('aria-label',label);control.title=label}}}
  if(route==='settings') {
    const sections=[...root.querySelectorAll('.settings-section')];const nav=document.createElement('nav');nav.className='settings-index';nav.setAttribute('aria-label','أقسام الإعدادات');
    sections.forEach((section,i)=>{section.id=`settings-group-${i}`;const link=document.createElement('a');link.href=`#${section.id}`;link.textContent=section.querySelector('h2').textContent;nav.append(link)});root.querySelector('.reading')?.prepend(nav);
  }
  if(route==='free') {
    const meta=root.querySelector('[name=day-tags]')?.closest('.reading-section');if(meta){const fold=document.createElement('details');fold.className='editor-metadata';const summary=document.createElement('summary');summary.textContent='وسوم وتفاصيل هذا اليوم';meta.before(fold);fold.append(summary,meta)}
  }
  root.querySelectorAll('.media-item img').forEach(prepareImage);
  root.querySelectorAll('button[aria-pressed=true]').forEach(el=>el.classList.add('is-selected'));
}
export function polishDialog(dialog) {
  dialog.querySelectorAll('input[type=text], textarea').forEach(el=>el.dir='auto');
  dialog.querySelectorAll('.media-item img').forEach(prepareImage);
  const search=dialog.querySelector('#emotion-query');
  if(search) {
    const words=[...dialog.querySelectorAll('.emotion-word')];const initial=new Map(words.map(w=>[w,!w.hidden]));
    const status=document.createElement('p');status.className='emotion-search-status muted';status.role='status';search.parentElement.after(status);
    search.addEventListener('input',()=>{
      const query=normal(search.value.trim());let count=0;
      for(const word of words){word.hidden=query?!normal(word.textContent).includes(query):!initial.get(word);if(!word.hidden)count++}
      status.textContent=query?(count?`${count} كلمات قريبة`:'ما لقينا كلمة هنا. جرّب كلمة ثانية أو «مو متأكد شنو أحس».'):'';
    });
  }
}
function prepareImage(img) {
  if(img.parentElement.classList.contains('media-preview'))return;
  const button=document.createElement('button');button.type='button';button.className='media-preview';button.setAttribute('aria-label',`عرض الصورة: ${img.alt}`);img.before(button);button.append(img);
  button.addEventListener('click',()=>{
    const viewer=document.createElement('dialog');viewer.className='image-viewer';viewer.setAttribute('aria-label','عرض الصورة');
    const close=document.createElement('button');close.className='viewer-close';close.textContent='إغلاق';
    const image=img.cloneNode();image.loading='eager';const caption=document.createElement('p');caption.textContent=img.alt;
    viewer.append(close,image,caption);document.body.append(viewer);close.addEventListener('click',()=>viewer.close());viewer.addEventListener('close',()=>{viewer.remove();button.focus()});viewer.addEventListener('click',e=>{if(e.target===viewer)viewer.close()});viewer.showModal();close.focus();
  });
}
export function polishSearch(root, filters, matches) {
  root.querySelectorAll('.entry-row').forEach((row,i)=>{
    const preview=row.querySelector('.entry-preview');
    const reason=document.createElement('small');reason.className='search-match';reason.textContent=matches[i]?.source||'مطابقة في دفتري';preview?.append(reason);
    const query=filters.query?.replace(/^"|"$/g,'').trim();if(!query)return;
    row.querySelectorAll('h2,p').forEach(el=>{
      const text=el.textContent;const index=normal(text).indexOf(normal(query));if(index<0)return;
      const mark=document.createElement('mark');mark.textContent=text.slice(index,index+query.length);el.replaceChildren(document.createTextNode(text.slice(0,index)),mark,document.createTextNode(text.slice(index+query.length)));
    });
  });
}
