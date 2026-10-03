import {readFile,writeFile} from 'node:fs/promises';
const entry=await readFile('dist/app.js','utf8');
const obsolete=entry.indexOf("let chosen='normal';");
if(obsolete!==-1)await writeFile('dist/app.js',entry.slice(0,obsolete)+"import {boot} from './journal.js';\nboot({icon,nav});\n");
const html=await readFile('dist/index.html','utf8');
await writeFile('dist/index.html',html.replace("style-src 'self';","style-src 'self' 'unsafe-inline';"));
