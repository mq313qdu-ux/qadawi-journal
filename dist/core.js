export const SCHEMA_VERSION=1;
export const KINDS=['day','event','capture','emotion','person','place','media','word','review','collection','letter','snapshot','revision','trash','settings'];
export const uid=()=>crypto.randomUUID();
export const now=()=>new Date().toISOString();
export const dateKey=(date=new Date())=>new Intl.DateTimeFormat('en-CA',{timeZone:'Asia/Baghdad',year:'numeric',month:'2-digit',day:'2-digit'}).format(date);
export const esc=value=>String(value??'').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
export const normalize=value=>String(value??'').toLocaleLowerCase().normalize('NFKC').replace(/[\u064B-\u065F\u0670]/g,'').replace(/[أإآ]/g,'ا').replace(/ى/g,'ي');
const encode=new TextEncoder(),decode=new TextDecoder();
const b64=bytes=>{let s='';for(let i=0;i<bytes.length;i+=8192)s+=String.fromCharCode(...bytes.subarray(i,i+8192));return btoa(s)};
const unb64=s=>Uint8Array.from(atob(s),c=>c.charCodeAt(0));
export async function deriveKey(passphrase,salt){const material=await crypto.subtle.importKey('raw',encode.encode(passphrase),'PBKDF2',false,['deriveKey']);return crypto.subtle.deriveKey({name:'PBKDF2',salt:unb64(salt),iterations:600000,hash:'SHA-256'},material,{name:'AES-GCM',length:256},false,['encrypt','decrypt'])}
export async function encrypt(value,key){const iv=crypto.getRandomValues(new Uint8Array(12));const cipher=await crypto.subtle.encrypt({name:'AES-GCM',iv},key,encode.encode(JSON.stringify(value)));return {iv:b64(iv),cipher:b64(new Uint8Array(cipher))}}
export async function decrypt(value,key){return JSON.parse(decode.decode(await crypto.subtle.decrypt({name:'AES-GCM',iv:unb64(value.iv)},key,unb64(value.cipher))))}
const request=req=>new Promise((resolve,reject)=>{req.onsuccess=()=>resolve(req.result);req.onerror=()=>reject(req.error)});
const completed=tx=>new Promise((resolve,reject)=>{tx.oncomplete=()=>resolve();tx.onerror=()=>reject(tx.error);tx.onabort=()=>reject(tx.error||new Error('Transaction aborted'))});
export class JournalDB{
  constructor(name='qadawi-journal'){this.name=name}
  key=null; protection=null; database=null; channel=null; invalidated=false;
  async open(){this.database=await new Promise((resolve,reject)=>{const r=indexedDB.open(this.name,SCHEMA_VERSION);r.onupgradeneeded=()=>{const db=r.result;const records=db.createObjectStore('records',{keyPath:'id'});records.createIndex('kind','kind');records.createIndex('kindDate',['kind','date']);db.createObjectStore('meta',{keyPath:'id'})};r.onsuccess=()=>resolve(r.result);r.onerror=()=>reject(r.error);r.onblocked=()=>reject(new Error('أغلق النسخ الأخرى من الدفتر ثم أعد المحاولة.'))});this.database.onversionchange=()=>this.database.close();this.protection=await this.meta('protection');if(globalThis.BroadcastChannel){this.channel=new BroadcastChannel(this.name);this.channel.onmessage=e=>{if(e.data==='protection-change'){this.key=null;this.invalidated=true;globalThis.dispatchEvent(new Event('journal-invalidated'))}else globalThis.dispatchEvent(new Event('journal-changed'))}}return this}
  get locked(){return this.invalidated||!!(this.protection&&!this.key)}
  assert(){if(this.locked)throw new Error('الدفتر مقفل. افتحه أولًا.')}
  async meta(id){return (await request(this.database.transaction('meta').objectStore('meta').get(id)))?.value??null}
  async setMeta(id,value){const tx=this.database.transaction('meta','readwrite');tx.objectStore('meta').put({id,value});await completed(tx)}
  async wrap(record){this.assert();return {id:record.id,kind:record.kind,date:record.date||record.timestamp?.slice(0,10)||'',payload:this.protection?await encrypt(record,this.key):record,encrypted:!!this.protection}}
  async unwrap(record){if(!record)return null;this.assert();return record.encrypted?decrypt(record.payload,this.key):record.payload}
  async get(id){this.assert();return this.unwrap(await request(this.database.transaction('records').objectStore('records').get(id)))}
  async put(record){return this.batch([record])}
  async batch(records,remove=[]){this.assert();const wrapped=await Promise.all(records.map(r=>this.wrap(r)));const tx=this.database.transaction('records','readwrite'),store=tx.objectStore('records');wrapped.forEach(r=>store.put(r));remove.forEach(id=>store.delete(id));await completed(tx);this.channel?.postMessage('changed')}
  async page(kind,{date,from='',to='\uffff',limit=40,offset=0,reverse=true}={}){this.assert();const tx=this.database.transaction('records'),index=tx.objectStore('records').index('kindDate'),range=IDBKeyRange.bound([kind,date??from],[kind,date??to]);const result=await new Promise((resolve,reject)=>{const rows=[];let skipped=0;const req=index.openCursor(range,reverse?'prev':'next');req.onerror=()=>reject(req.error);req.onsuccess=()=>{const cursor=req.result;if(!cursor||rows.length>=limit){resolve(rows);return}if(skipped++>=offset)rows.push(cursor.value);cursor.continue()}});return Promise.all(result.map(r=>this.unwrap(r)))}
  async *scan(kind,options={}){let offset=0;for(;;){const records=await this.page(kind,{...options,limit:100,offset});if(!records.length)return;yield records;offset+=records.length}}
  async all(kind){const result=[];for await(const batch of this.scan(kind))result.push(...batch);return result}
  async count(kind){this.assert();return request(this.database.transaction('records').objectStore('records').index('kind').count(IDBKeyRange.only(kind)))}
  async allRaw(){return request(this.database.transaction('records').objectStore('records').getAll())}
  async unlock(passphrase){if(!this.protection)return;const key=await deriveKey(passphrase,this.protection.salt);const check=await decrypt(this.protection.check,key);if(check!=='Qadawi Journal')throw new Error('Incorrect passphrase');this.key=key}
  lock(){this.key=null}
  async setProtection(passphrase){this.assert();const records=(await this.allRaw());const clear=await Promise.all(records.map(r=>this.unwrap(r)));const next=passphrase?{salt:b64(crypto.getRandomValues(new Uint8Array(16)))}:null;const key=next?await deriveKey(passphrase,next.salt):null;if(next)next.check=await encrypt('Qadawi Journal',key);const wrapped=await Promise.all(clear.map(async r=>({id:r.id,kind:r.kind,date:r.date||'',encrypted:!!next,payload:next?await encrypt(r,key):r})));const tx=this.database.transaction(['records','meta'],'readwrite');wrapped.forEach(r=>tx.objectStore('records').put(r));next?tx.objectStore('meta').put({id:'protection',value:next}):tx.objectStore('meta').delete('protection');await completed(tx);this.protection=next;this.key=key;this.channel?.postMessage('protection-change')}
  async backup(){this.assert();const records=[];for(const kind of KINDS)for await(const batch of this.scan(kind))records.push(...batch);const data={format:'qadawi-journal',schemaVersion:SCHEMA_VERSION,exportedAt:now(),records};if(this.protection)return {format:'qadawi-journal-encrypted',schemaVersion:SCHEMA_VERSION,salt:this.protection.salt,...await encrypt(data,this.key)};return data}
  async restore(data){validateBackup(data);this.assert();const revisions=[];for(const r of data.records){const existing=await this.get(r.id);if(existing&&r.kind!=='revision')revisions.push({id:uid(),kind:'revision',date:dateKey(),targetId:r.id,record:existing,createdAt:now(),reason:'قبل الاستيراد'})}await this.batch([...revisions,...data.records]);return data.records.length}
  async trash(record){const trash={id:uid(),kind:'trash',date:dateKey(),original:record,deletedAt:now()};await this.batch([trash],[record.id]);return trash}
  async restoreTrash(record){await this.batch([record.original],[record.id])}
  async clear(){this.assert();const tx=this.database.transaction(['records','meta'],'readwrite');tx.objectStore('records').clear();tx.objectStore('meta').clear();await completed(tx);this.protection=null;this.key=null;this.channel?.postMessage('protection-change')}
}
export function newDay(date=dateKey()){return {id:`day:${date}`,kind:'day',date,title:'',summary:'',createdAt:now(),updatedAt:now(),status:'draft',favorite:false,important:false,sensitive:false,revisit:false,difficult:false,tags:[],eventIds:[],entryContent:'',rawResponses:[],metadata:{},session:null}}
export function compose(day,events=[],strength='clean'){
  const lines=[];const answers=(day.rawResponses||[]).filter(r=>r.answer?.trim());const summary=answers.find(r=>r.category==='summary')?.answer||day.summary;
  if(summary)lines.push(`## يومي بجملة\n${summary}`);
  if(events.length){lines.push('## يومي');for(const e of [...events].sort((a,b)=>(a.approximateStartTime||'99').localeCompare(b.approximateStartTime||'99'))){const time=e.approximateStartTime?(e.timeConfidence==='certain'?'':e.timeConfidence==='unsure'?'مو متأكد من الوقت: ':'تقريبًا ')+e.approximateStartTime:'';lines.push([e.title?`### ${e.title}`:'',time,e.memoryConfidence==='unsure'?'أعتقد أن هذا حدث، لكني مو متأكد تمامًا.':e.memoryConfidence==='approximate'?'بعض التفاصيل تقريبية.':'',e.description,e.details,e.peopleNames?`كنت مع: ${e.peopleNames}`:'',e.locationName?`المكان: ${e.locationName}`:'',e.thoughts?`ما كان ببالي: ${e.thoughts}`:'',e.feelingText?`شعوري: ${e.feelingText}`:'',e.reactions?`رد فعلي: ${e.reactions}`:'',e.significance?`لماذا يهمني: ${e.significance}`:'',e.reflection?`تأمل: ${e.reflection}`:'',e.memorySentence?`أريد أن أتذكر: ${e.memorySentence}`:''].filter(Boolean).join('\n'))}}
  for(const r of answers.filter(r=>r.category!=='summary'&&r.category!=='event'))lines.push(`${strength==='original'?'':`## ${r.label}\n`}${r.confidence==='unsure'?'مو متأكد: ':r.confidence==='approximate'?'تقريبًا: ':''}${r.answer}`);
  if(!events.length){const factual=answers.filter(r=>r.category==='event');if(factual.length)lines.unshift(`## يومي\n${factual.map(r=>r.answer).join('\n')}`)}
  return lines.join('\n\n');
}
export function validateBackup(data){
  if(!data||data.format!=='qadawi-journal'||data.schemaVersion!==SCHEMA_VERSION||!Array.isArray(data.records)||data.records.length>200000)throw new Error('صيغة النسخة أو إصدارها غير مدعوم. لم تتغير بياناتك.');
  const ids=new Set();for(const record of data.records){if(!record||typeof record!=='object'||!KINDS.includes(record.kind)||typeof record.id!=='string'||record.id.length>200||ids.has(record.id))throw new Error('النسخة تحتوي على سجلات غير صالحة أو معرّفات مكررة.');ids.add(record.id);validateRecord(record);if(JSON.stringify(record).length>30e6)throw new Error('سجل كبير جدًا.');assertSafe(record)}return data;
}
function validateRecord(r,depth=0){
  const fail=()=>{throw new Error('بيانات سجل غير صالحة في النسخة. لم تتغير بياناتك.')};
  const text=(k,required=false)=>{if(required&&typeof r[k]!=='string'||r[k]!==undefined&&typeof r[k]!=='string')fail()};
  const strings=k=>{if(!Array.isArray(r[k])||r[k].some(v=>typeof v!=='string'))fail()};
  const date=d=>{if(typeof d!=='string'||!/^\d{4}-\d{2}-\d{2}$/.test(d)||new Date(d+'T12:00:00Z').toISOString().slice(0,10)!==d)fail()};
  if(depth>20||!r||typeof r.id!=='string'||!KINDS.includes(r.kind))fail();date(r.date);
  if(r.id.startsWith('day:')&&r.kind!=='day'||r.id==='settings:main'&&r.kind!=='settings')fail();
  for(const k of ['title','summary','content','description','details','thoughts','reactions','significance','memorySentence','locationName','peopleNames','optionalNote','notes','note','caption','createdAt','updatedAt'])text(k);
  if(r.kind==='day'){if(r.id!==`day:${r.date}`||!['draft','complete'].includes(r.status)||!r.metadata||typeof r.metadata!=='object'||Array.isArray(r.metadata))fail();text('entryContent',true);strings('tags');strings('eventIds');responses(r.rawResponses,fail);if(r.session){if(typeof r.session.mode!=='string'||!Number.isInteger(r.session.index)||r.session.index<0)fail();if(!Array.isArray(r.session.promptIds)||r.session.promptIds.some(p=>typeof p!=='string'))fail();responses(r.session.answers,fail)}}
  if(r.kind==='event'){text('description',true);text('journalDayId',true);for(const k of ['tags','peopleIds','emotionIds','mediaIds'])strings(k);if(r.rawResponses)responses(r.rawResponses,fail);if(r.timeConfidence&&!['certain','approximate','unsure'].includes(r.timeConfidence))fail();for(const k of ['approximateStartTime','approximateEndTime'])if(r[k]&&!/^([01]\d|2[0-3]):[0-5]\d$/.test(r[k]))fail()}
  if(r.kind==='capture'){text('content',true);text('type',true);text('timestamp',true);if(!Number.isFinite(Date.parse(r.timestamp)))fail()}
  if(r.kind==='emotion'){text('emotion',true);if(!Number.isInteger(r.intensity)||r.intensity<1||r.intensity>5)fail()}
  if(r.kind==='person')text('displayName',true);
  if(r.kind==='place')text('name',true);
  if(r.kind==='word')text('word',true);
  if(r.kind==='media'){if(!['image/jpeg','image/png','image/webp','image/gif','audio/webm','audio/ogg','audio/mp4','audio/mpeg','audio/wav'].includes(r.mime)||typeof r.data!=='string'||!r.data.startsWith(`data:${r.mime};base64,`)||r.data.length>28e6||!/^[A-Za-z0-9+/]*={0,2}$/.test(r.data.slice(r.data.indexOf(',')+1)))fail();text('targetId',true)}
  if(r.kind==='collection'){text('name',true);strings('dayIds')}
  if(r.kind==='letter'){text('content',true);date(r.revealDate)}
  if(r.kind==='snapshot'){if(!Array.isArray(r.answers)||r.answers.some(a=>!a||typeof a.question!=='string'||typeof a.answer!=='string'))fail()}
  if(r.kind==='review'){date(r.startDate);date(r.endDate);text('userReflection',true);if(!['week','month'].includes(r.periodType))fail()}
  if(r.kind==='settings'){if(r.id!=='settings:main'||!['light','dark','system'].includes(r.theme)||!Number.isFinite(r.textSize)||r.textSize<14||r.textSize>30||!/^([01]\d|2[0-3]):[0-5]\d$/.test(r.reminderTime)||!r.skips||typeof r.skips!=='object'||Object.values(r.skips).some(v=>!Number.isInteger(v)||v<0))fail()}
  if(r.kind==='revision'){text('targetId',true);validateRecord(r.record,depth+1)}
  if(r.kind==='trash'){validateRecord(r.original,depth+1);if(r.related){if(!Array.isArray(r.related))fail();r.related.forEach(v=>validateRecord(v,depth+1))}}
}
function responses(list,fail){if(!Array.isArray(list)||list.some(r=>!r||typeof r.promptId!=='string'||typeof r.category!=='string'||typeof r.label!=='string'||typeof r.answer!=='string'))fail()}
function assertSafe(value,depth=0){if(depth>30)throw new Error('بيانات متداخلة أكثر من الحد المسموح.');if(value&&typeof value==='object'){for(const [key,v] of Object.entries(value)){if(['__proto__','prototype','constructor'].includes(key))throw new Error('بنية غير صالحة.');assertSafe(v,depth+1)}}}
export function matchesSearch(record,filters){const text=normalize([record.title,record.summary,record.entryContent,record.content,record.description,record.thoughts,record.details,record.memorySentence,...(record.tags||[]),...(record.rawResponses||[]).map(r=>r.answer)].filter(Boolean).join('\n'));return (!filters.query||text.includes(normalize(filters.query)))&&(!filters.from||record.date>=filters.from)&&(!filters.to||record.date<=filters.to)&&(!filters.tag||(record.tags||[]).some(t=>normalize(t).includes(normalize(filters.tag))))&&(!filters.favorite||record.favorite)}
export function download(name,content,type='application/json'){const blob=new Blob([content],{type});const url=URL.createObjectURL(blob);const a=document.createElement('a');a.href=url;a.download=name;a.click();setTimeout(()=>URL.revokeObjectURL(url),10000)}
