import assert from 'node:assert/strict';
import {mkdir,writeFile} from 'node:fs/promises';
import {pathToFileURL} from 'node:url';
const {chromium}=await import(pathToFileURL('C:/Users/QDU/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/node_modules/playwright/index.mjs'));

async function setting(key){const map={readingFont:'writing',uiFont:'writing',fontWeight:'writing',readingWidth:'writing',readingLineHeight:'writing',density:'layout',corners:'layout',sidebarTone:'layout',sidebarSide:'layout',navigationStyle:'layout',defaultMode:'layout',showWeek:'today',showOnThisDay:'today',showEmotionHelper:'today',showDailyModes:'today',reduceMotion:'accessibility'};const category=map[key]||(['data','privacy','accessibility'].includes(key)?key:'appearance');const select=page.locator('.settings-mobile-select');if(await select.isVisible())await select.selectOption(category);else await page.locator(`[data-category="${category}"]`).click()}
const browser=await chromium.launch({headless:true,channel:'msedge'});
const context=await browser.newContext();const page=await context.newPage();const errors=[];page.on('pageerror',e=>errors.push(e.message));
const idle=()=>page.waitForFunction(()=>document.querySelector('#app').getAttribute('aria-busy')!=='true');
const click=async action=>{await idle();await page.locator(`[data-action="${action}"]:visible`).first().click();await idle()};
const nav=async route=>{await idle();if(route==='search')await click('search');else await page.locator(`[data-nav="${route}"]:visible`).first().click();await idle()};
await mkdir('tests/artifacts/redesign',{recursive:true});const checks=[];
async function verify(label,shot=false){await page.evaluate(()=>document.fonts.ready);const result=await page.evaluate(()=>({width:innerWidth,scroll:document.documentElement.scrollWidth,rtl:document.documentElement.dir,missing:[...document.querySelectorAll('button')].filter(b=>b.checkVisibility()&&!b.textContent.trim()&&!b.getAttribute('aria-label')).length}));assert.ok(result.scroll<=result.width,`${label}: overflow ${result.scroll}/${result.width}`);assert.equal(result.rtl,'rtl');assert.equal(result.missing,0);checks.push(label);if(shot)await page.screenshot({path:`tests/artifacts/redesign/${label}.png`,fullPage:true})}
try{
 await page.goto('http://127.0.0.1:4174');await click('finish-onboarding');await page.locator('[name=answer]').fill('اختبار واجهة معزول — Arabic and English');await click('end-session');await click('complete');
 const routes=['today','journal','calendar','memories','insights','search','settings'];
 for(const theme of ['light','dark']){
   await page.setViewportSize({width:1440,height:1000});await nav('settings');await setting('theme');await page.locator('[data-pref=theme]').selectOption(theme);await idle();
   for(const route of routes){await nav(route);await verify(`${theme}-desktop-${route}`,true)}
   await nav('today');await click('free');await verify(`${theme}-desktop-editor`,true);await click('reading');await verify(`${theme}-desktop-reading`,true);
   await nav('today');await click('free');await click('back-rebuild');await verify(`${theme}-desktop-rebuild`,true);await click('recall-start');await verify(`${theme}-desktop-recall-dialog`,true);await click('close-dialog');await nav('today');await click('start-mode');await verify(`${theme}-desktop-guided`,true);await nav('today');await click('explore-emotion');await page.locator('[data-action=emotion-family]').first().click();await verify(`${theme}-desktop-emotions`,true);await page.locator('#emotion-query').fill('zzzz');assert.equal(await page.locator('.emotion-word:visible').count(),0);await page.locator('#emotion-query').fill('');assert.ok(await page.locator('.emotion-word:visible').count()>0);await click('close-dialog');
   for(const width of [360,390,430,768,1024,1280,1440,1920]){await page.setViewportSize({width,height:width<700?844:width===1024?768:1000});for(const route of routes){await nav(route);await verify(`${theme}-${width}-${route}`,width===390)}await nav('today');await click('free');await verify(`${theme}-${width}-editor`,width===390);await click('reading');await verify(`${theme}-${width}-reading`,width===390);await nav('today');await click('capture');await verify(`${theme}-${width}-capture`,width===390);await click('close-dialog');await click('explore-emotion');await verify(`${theme}-${width}-emotions`,width===390);await click('close-dialog')}
 }
 await page.setViewportSize({width:390,height:844});await page.evaluate(()=>document.documentElement.style.setProperty('--font-size','34px'));for(const route of routes){await nav(route);await verify(`200percent-${route}`,true)}
 assert.deepEqual(errors,[]);await writeFile('tests/artifacts/redesign/results.json',JSON.stringify({checks,errors},null,2));console.log(`PASS ${checks.length} responsive/RTL/label checks, both themes, emotion search, 200% text`);
}finally{await browser.close()}
