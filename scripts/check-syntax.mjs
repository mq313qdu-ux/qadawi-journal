import {readdir} from 'node:fs/promises';
import {spawnSync} from 'node:child_process';
const files=(await readdir('dist')).filter(name=>name.endsWith('.js'));
for(const file of files){const result=spawnSync(process.execPath,['--check','dist/'+file],{stdio:'inherit'});if(result.status!==0)process.exit(result.status||1)}
console.log(`Syntax verified: ${files.length} application modules.`);
