import {readFile,writeFile} from 'node:fs/promises';
let source=await readFile('dist/journal.js','utf8');
source=source.replace('String(r.result).replace(/^data:[^;]+;/,`data:${mime};`)','String(r.result).replace(/^data:[^,]*,/,`data:${mime};base64,`)');
await writeFile('dist/journal.js',source);
