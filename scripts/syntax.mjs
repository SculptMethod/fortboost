import {readdirSync} from 'node:fs';import {join} from 'node:path';import {spawnSync} from 'node:child_process';
const roots=['netlify/functions','scripts','tests'];let count=0;
for(const root of roots)for(const file of readdirSync(root)){if(!file.endsWith('.mjs'))continue;const path=join(root,file);const r=spawnSync(process.execPath,['--check',path],{encoding:'utf8'});if(r.status!==0){console.error(path,r.stderr);process.exitCode=1;}else count++;}
if(!process.exitCode)console.log(`PASS ${count} JS modules parse`);
