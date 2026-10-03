import {pathToFileURL} from 'node:url';
let chromium;try{({chromium}=await import('playwright'))}catch{({chromium}=await import(pathToFileURL('C:/Users/QDU/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/node_modules/playwright/index.mjs')))}
const browser=await chromium.launch({headless:true,channel:'msedge'});
try{const page=await browser.newPage();await page.goto('http://127.0.0.1:4174/icon.svg');for(const size of [192,512]){await page.setViewportSize({width:size,height:size});await page.locator('svg').evaluate((svg,size)=>{svg.style.width=size+'px';svg.style.height=size+'px'},size);await page.locator('svg').screenshot({path:`dist/icon-${size}.png`})}}finally{await browser.close()}
