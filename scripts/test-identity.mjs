import {spawnSync} from 'node:child_process';
const commands=[['tests/identity.mjs'],['tests/identity-themes.mjs'],['tests/identity-shell.mjs'],['tests/identity-voice.mjs'],['tests/identity-calendar.mjs'],['tests/identity-settings.mjs'],['tests/identity-fonts.mjs'],...['mobile','navigation','dark','performance','accessibility','matrix'].map(phase=>['tests/identity-final.mjs',phase])];
for(const args of commands){const result=spawnSync(process.execPath,args,{stdio:'inherit'});if(result.status!==0)process.exit(result.status||1)}
