import { cp, rm, mkdir, readFile, readdir, writeFile } from 'node:fs/promises';
import { extname } from 'node:path';
const output = new URL('../dist/', import.meta.url);
const source = new URL('../public/', import.meta.url);
const types = { '.html': 'text/html; charset=utf-8', '.js': 'text/javascript; charset=utf-8', '.css': 'text/css; charset=utf-8', '.png': 'image/png', '.md': 'text/markdown; charset=utf-8', '.csv': 'text/csv; charset=utf-8', '.zip': 'application/zip', '.docx': 'application/vnd.openxmlformats-officedocument.wordprocessingml.document', '.xlsx': 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' };
const assets = {};
async function collect(dir, prefix = '') {
  for (const file of await readdir(dir, { withFileTypes: true })) {
    if (file.name.startsWith('.')) throw new Error('Hidden files cannot be published.');
    const path = prefix + file.name;
    if (file.isDirectory()) await collect(new URL(file.name + '/', dir), path + '/');
    else if (file.isFile()) assets['/' + path] = [types[extname(file.name)] || 'application/octet-stream', (await readFile(new URL(file.name, dir))).toString('base64')];
    else throw new Error('Only regular public files are allowed.');
  }
}
await collect(source);
await rm(output, { recursive: true, force: true });
await mkdir(new URL('server/', output), { recursive: true });
await mkdir(new URL('.openai/', output), { recursive: true });
const hosting = JSON.parse(await readFile(new URL('../.openai/hosting.json', import.meta.url), 'utf8'));
if (hosting.static || hosting.d1 !== 'DB') throw new Error('Workshop password gate requires the DB Worker binding.');
await writeFile(new URL('.openai/hosting.json', output), JSON.stringify(hosting, null, 2));
await cp(new URL('../drizzle/', import.meta.url), new URL('drizzle/', output), { recursive: true });
const gateway = await readFile(new URL('../worker/key-access.js', import.meta.url), 'utf8');
const entry = `${gateway}\nconst ASSETS = ${JSON.stringify(assets)};\nexport default {async fetch(request,env){
 const api = await handleApi(request,env); if(api) return api;
 if(!['GET','HEAD'].includes(request.method)) return new Response('Method not allowed',{status:405});
 const path = new URL(request.url).pathname;
 const asset = ASSETS[path==='/'?'/index.html':path];
 if(!asset) return new Response('Not found',{status:404});
 return new Response(request.method==='HEAD'?null:Uint8Array.from(atob(asset[1]),c=>c.charCodeAt(0)),{headers:{'Content-Type':asset[0],'Cache-Control':'no-cache','X-Content-Type-Options':'nosniff','Referrer-Policy':'no-referrer','X-Frame-Options':'DENY','Content-Security-Policy':"frame-ancestors 'none'"}});
}};\n`;
await writeFile(new URL('server/index.js', output), entry);
console.log(`Built Worker with ${Object.keys(assets).length} embedded public assets and D1 migrations.`);
