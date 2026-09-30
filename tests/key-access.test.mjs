import {test} from 'node:test';
import assert from 'node:assert/strict';
import {handleApi} from '../worker/key-access.js';
import {fixture,testPassword,testKey} from './key-fixture.mjs';
const origin='https://workshop.example';
function request(password=testPassword, headers={}, method='POST'){
 return new Request(origin+'/api/workshop-key',{method,headers:{origin,'content-type':'application/json','cf-connecting-ip':'192.0.2.1',...headers},...(method==='POST'?{body:JSON.stringify({password})}:{})});
}
test('key is only released after valid password; responses never cache',async()=>{
 const {env}=fixture();
 for(const password of ['',null,'wrong']){const r=await handleApi(request(password),env);assert.ok([400,401].includes(r.status));assert.ok(!(await r.text()).includes(testKey));}
 const r=await handleApi(request(),env);assert.equal(r.status,200);assert.match(r.headers.get('cache-control'),/no-store/);assert.equal(r.headers.get('access-control-allow-origin'),null);assert.equal((await r.json()).key,testKey);
});
test('rejects GET, cross-origin, missing origin, malformed and oversized bodies',async()=>{
 const {env}=fixture();
 assert.equal((await handleApi(request(undefined,{},'GET'),env)).status,405);
 for(const headers of [{origin:'https://other.example'},{origin:''},{'sec-fetch-site':'cross-site'},{'content-type':'text/plain'}])assert.ok((await handleApi(request(testPassword,headers),env)).status>=400);
 assert.equal((await handleApi(request('x'.repeat(2000)),env)).status,400);
 assert.equal((await handleApi(new Request(origin+'/api/workshop-key',{method:'POST',headers:{origin,'content-type':'application/json'},body:'{' }),env)).status,400);
});
test('fails closed after expiry, missing secrets, storage failures and corrupt envelope',async()=>{
 for(const changes of [{WORKSHOP_KEY_EXPIRES_AT:'2000-01-01'},{WORKSHOP_KEY_EXPIRES_AT:''},{WORKSHOP_PASSWORD_HASH:''},{DB:null},{OPENAI_KEY_ENVELOPE:'broken'}]){
  const {env}=fixture();const r=await handleApi(request(),{...env,...changes});assert.ok([410,503].includes(r.status));assert.ok(!(await r.text()).includes(testKey));
 }
});
test('persistent limits survive new handlers; successful users do not use failure allowance',async()=>{
 const {env}=fixture();
 for(let i=0;i<12;i++)assert.equal((await handleApi(request(),env)).status,200);
 for(let i=0;i<10;i++)assert.equal((await handleApi(request('wrong'),env)).status,401);
 assert.equal((await handleApi(request(),{...env})).status,429);
 assert.equal((await handleApi(request(testPassword,{'cf-connecting-ip':'192.0.2.2'}),env)).status,200);
});
test('atomic counter rejects concurrent excess attempts and global excess',async()=>{
 const {env,sqlite}=fixture();
 const attempts=await Promise.all(Array.from({length:20},()=>handleApi(request('wrong'),env)));
 assert.equal(attempts.filter(r=>r.status===401).length,10);assert.equal(attempts.filter(r=>r.status===429).length,10);
 sqlite.prepare('INSERT OR REPLACE INTO workshop_key_attempts(scope,used) VALUES (?,?)').run(`global:${Math.floor(Date.now()/60000)}`,1000);
 assert.equal((await handleApi(request(testPassword,{'cf-connecting-ip':'192.0.2.3'}),env)).status,429);
});
