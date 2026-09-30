import test from 'node:test';
import assert from 'node:assert/strict';
import { handleApi, readKey } from '../worker/gateway.js';
import { localDatabase } from '../scripts/local-db.mjs';
import { randomBytes, createCipheriv } from 'node:crypto';
const ORIGIN = 'https://workshop.example';
function setup(t) {
 const DB = localDatabase(); t.after(() => DB.close());
 const env = { DB, OPENAI_API_KEY: 'fixture-provider-secret' };
 const calls = [];
 const fetcher = async (url, init) => { calls.push({ url, init }); return Response.json({ id: 'resp_test', status: 'completed', output: [{ type: 'message', content: [{ type: 'output_text', text: 'Ready' }] }], data: [{ b64_json: 'aW1hZ2U=' }], session: { id: 'live_example' }, transport: { type: 'webrtc', sdp: 'answer' } }); };
 const request = async (path, data = {}, token, options = {}) => handleApi(new Request(ORIGIN + '/api/workshop' + path, { method: 'POST', headers: { 'Content-Type': 'application/json', ...(token ? { Authorization: 'Bearer ' + token } : {}) }, body: JSON.stringify(data) }), env, { fetcher, ...options });
 const connect = async () => (await (await request('/connections')).json()).token;
 return { env, calls, request, connect, fetcher };
}
test('mint returns only a scoped token, with only its hash persisted', async t => {
 const { env, request, calls } = setup(t);
 const r = await request('/connections'); assert.equal(r.status, 201); const body = await r.json();
 assert.match(body.token, /^ws_[a-f0-9]{64}$/); assert.equal(body.baseUrl, ORIGIN + '/api/workshop');
 assert(!JSON.stringify(body).includes(env.OPENAI_API_KEY)); assert.equal(calls.length, 0);
 const rows = await env.DB.prepare('SELECT token_hash FROM workshop_connections').all(); assert.equal(rows.results.length, 1); assert.notEqual(rows.results[0].token_hash, body.token);
});
test('missing, invalid, expired and previous-event connections never call provider', async t => {
 const { request, connect, env, calls } = setup(t);
 assert.equal((await request('/responses', { input: 'hello' })).status, 401);
 assert.equal((await request('/responses', { input: 'hello' }, 'ws_' + 'a'.repeat(64))).status, 401);
 const token = await connect();
 assert.equal((await request('/responses', { input: 'hello' }, token, { now: Date.now() + 7*3600000 })).status, 401);
 env.WORKSHOP_EVENT_ID = 'next-event'; assert.equal((await request('/responses', { input: 'hello' }, token)).status, 401);
 assert.equal(calls.length, 0);
});
test('concurrent calls cannot overrun per-connection or shared quota', async t => {
 const { request, connect, env, calls } = setup(t); const token = await connect();
 const rs = await Promise.all(Array.from({ length: 40 }, () => request('/responses', { input: 'hello' }, token)));
 assert.equal(rs.filter(r => r.status === 200).length, 30); assert.equal(calls.length, 30);
 await env.DB.prepare('INSERT INTO workshop_quotas(scope, used) VALUES (?, ?) ON CONFLICT(scope) DO UPDATE SET used = excluded.used').bind('workshop-2026-09:total:responses', 999).run();
 const a = await connect(), b = await connect();
 const shared = await Promise.all([a,b].map(key => request('/responses', { input: 'hello' }, key)));
 assert.deepEqual(shared.map(r=>r.status).sort(), [200,429]); assert.equal(calls.length, 31);
});
test('rejects oversized input, arbitrary models, tools, URLs and malformed body', async t => {
 const { request, connect, calls } = setup(t); const token = await connect();
 assert.equal((await request('/responses', { input: 'x'.repeat(70000) }, token)).status, 413);
 assert.equal((await request('/responses', { input: 'x'.repeat(25000) }, token)).status, 400);
 for (const additional of [{ model:'unbounded' }, { tools:[] }, { stream:true }, { previous_response_id:'other' }]) assert.equal((await request('/responses', { input: 'hello', ...additional }, token)).status, 400);
 assert.equal((await request('/images', { prompt:'test',image:'https://private.example' }, token)).status, 400);
 assert.equal((await request('/responses', [], token)).status, 400); assert.equal(calls.length, 0);
});
test('locks provider destination, request size, model and storage policy', async t => {
 const { request, connect, calls, env } = setup(t); const token = await connect();
 const response = await request('/responses', { input: 'hello' }, token); assert.equal(response.status, 200);
 assert.equal((await response.json()).output_text, 'Ready');
 const call=calls[0], payload=JSON.parse(call.init.body);
 assert.equal(call.url,'https://api.openai.com/v1/responses'); assert.equal(payload.model,'gpt-5-mini'); assert.equal(payload.max_output_tokens,2000); assert.equal(payload.store,false); assert.equal(call.init.headers.Authorization,'Bearer '+env.OPENAI_API_KEY);
});
test('image generation/edit and voice creation use bounded server-owned configurations', async t => {
 const { request, connect, calls } = setup(t); const token=await connect();
 assert.equal((await request('/images',{prompt:'A help card'},token)).status,200);
 assert.equal(JSON.parse(calls[0].init.body).n,1);
 assert.equal((await request('/images',{prompt:'Improve',image:'data:image/png;base64,aW1hZ2U='},token)).status,200);
 assert(calls[1].init.body instanceof FormData); assert.equal(calls[1].init.body.get('quality'),'low');
 assert.equal((await request('/images',{prompt:'Another'},token)).status,429);
 const live=await request('/live/sessions',{sdp:'v=0\r\nexample'},token); assert.equal(live.status,201);
 assert.deepEqual(JSON.parse(calls[2].init.body).session.delegation,{type:'client'});
 assert.equal((await request('/live/sessions',{sdp:'v=0\r\nexample'},token)).status,429);
});
test('provider errors do not expose secrets or retry a paid request', async t => {
 const { request, connect, env } = setup(t); const token=await connect();let calls=0;
 const response=await request('/responses',{input:'test'},token,{fetcher:async()=>{calls++;return Response.json({error:{message:env.OPENAI_API_KEY}},{status:401});}});
 assert.equal(response.status,502);assert(!(await response.text()).includes(env.OPENAI_API_KEY));assert.equal(calls,1);
});
test('CORS preflight is available and disabled configuration fails closed', async t => {
 const { env, request, calls }=setup(t);delete env.OPENAI_API_KEY;
 assert.equal((await request('/connections')).status,503);assert.equal(calls.length,0);
 const r=await handleApi(new Request(ORIGIN+'/api/workshop/responses',{method:'OPTIONS'}),env);assert.equal(r.status,204);assert.equal(r.headers.get('Access-Control-Allow-Origin'),'*');
 const status=await handleApi(new Request(ORIGIN+'/api/workshop/status'),env);assert.equal((await status.json()).available,false);
});
test('server decrypts a protected runtime credential',async()=>{
 const secret='fixture-only-provider-secret', key=randomBytes(32),iv=randomBytes(12),cipher=createCipheriv('aes-256-gcm',key,iv);
 const ciphertext=Buffer.concat([cipher.update(secret,'utf8'),cipher.final(),cipher.getAuthTag()]);
 const env={OPENAI_KEY_ENVELOPE:JSON.stringify({iv:iv.toString('base64'),data:ciphertext.toString('base64')}),OPENAI_KEY_WRAPPING_KEY:key.toString('base64')};
 assert.equal(await readKey(env),secret);
 await assert.rejects(readKey({...env,OPENAI_KEY_WRAPPING_KEY:randomBytes(32).toString('base64')}));
});
