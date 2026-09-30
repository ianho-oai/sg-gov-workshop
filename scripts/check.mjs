import {readFile,stat} from 'node:fs/promises';
import {resolve,sep} from 'node:path';
import {fileURLToPath} from 'node:url';
import {runInNewContext} from 'node:vm';
import assert from 'node:assert/strict';
const root=fileURLToPath(new URL('../public/',import.meta.url));
const context={window:{}};
runInNewContext(await readFile(resolve(root,'data.js'),'utf8'),context);
const files=new Set(['index.html','app.js','styles.css','data.js','assets/gmail-setup.png']);
const tracks=context.window.WORKSHOP_DATA.tracks;
assert.equal(tracks.filter(t=>t.group!=='experience').length,6,'Expected six workshop tracks');
assert.equal(tracks.filter(t=>t.group==='experience').length,9,'Expected nine standalone experiences');
for(const track of tracks){
 assert(track.steps.every((step,index)=>step.number===index),`${track.id}: step numbers must match their navigation positions`);
 if(track.stepLabels)assert.equal(track.stepLabels.length,track.steps.length,`${track.id}: every step needs a tab label`);
 for(const file of track.files||[])files.add(track.baseUrl+file);
 for(const step of track.steps)for(const resource of step.resources||[])files.add(track.baseUrl+resource.file);
 if(track.kind!=='prompt')files.add(`downloads/${track.id}.zip`);
}
for(const file of files){
 const path=resolve(root,file);
 assert(path.startsWith(resolve(root)+sep),`Resource must stay inside public/: ${file}`);
 assert((await stat(path)).size>0,`Empty file: ${file}`);
}
console.log(`Checked ${tracks.length} tracks and ${files.size} static files and resource downloads.`);
