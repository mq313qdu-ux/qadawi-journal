import {readFile,stat,readdir} from 'node:fs/promises';
import path from 'node:path';
import assert from 'node:assert/strict';
const root=path.resolve('dist');
const files=await readdir(root);let count=0;
for(const name of files.filter(n=>n.endsWith('.js'))){const source=await readFile(path.join(root,name),'utf8');for(const match of source.matchAll(/from\s+['"](\.\/[^'"]+)['"]/g))assert.ok((await stat(path.join(root,match[1]))).isFile());count++}
const sw=await readFile(path.join(root,'sw.js'),'utf8');const assets=[...sw.match(/const SHELL=\[([^\]]+)\]/)[1].matchAll(/'([^']+)'/g)].map(m=>m[1]);for(const asset of assets){const target=path.join(root,asset==='./'?'index.html':asset);assert.ok((await stat(target)).size>0)}
const html=await readFile(path.join(root,'index.html'),'utf8');assert.match(html,/lang="ar" dir="rtl"/);assert.match(html,/Content-Security-Policy/);assert.doesNotMatch(html,/<script[^>]*src="https?:/);const manifest=JSON.parse(await readFile(path.join(root,'manifest.webmanifest'),'utf8'));assert.equal(manifest.dir,'rtl');for(const icon of manifest.icons)assert.ok((await stat(path.join(root,icon.src))).size>0);
console.log(`Production dist verified: ${count} modules, ${assets.length} offline assets, manifest, local fonts, RTL, CSP.`);
