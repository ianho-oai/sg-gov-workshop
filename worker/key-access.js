const encoder = new TextEncoder();
const decode64 = text => Uint8Array.from(atob(text), c => c.charCodeAt(0));
const hex = bytes => Array.from(new Uint8Array(bytes), b => b.toString(16).padStart(2, '0')).join('');
const response = (status, message, extra = {}) => Response.json({message, ...extra}, {status, headers: {
  'Cache-Control': 'no-store, private', 'Pragma': 'no-cache',
  'X-Content-Type-Options': 'nosniff', 'Referrer-Policy': 'no-referrer',
  'Vary': 'Origin', 'Content-Security-Policy': "default-src 'none'; frame-ancestors 'none'",
}});

async function boundedJson(request) {
  const reader = request.body?.getReader();
  if (!reader) throw new Error('body');
  let size = 0, chunks = [];
  for (;;) {
    const {value, done} = await reader.read();
    if (done) break;
    size += value.length;
    if (size > 1024) { await reader.cancel(); throw new Error('body'); }
    chunks.push(value);
  }
  const bytes = new Uint8Array(size); let offset = 0;
  for (const chunk of chunks) { bytes.set(chunk, offset); offset += chunk.length; }
  return JSON.parse(new TextDecoder().decode(bytes));
}

async function reserve(db, scope, limit) {
  const row = await db.prepare(`INSERT INTO workshop_key_attempts (scope, used) VALUES (?, 1)
    ON CONFLICT(scope) DO UPDATE SET used = used + 1 WHERE used < ? RETURNING used`).bind(scope, limit).first();
  return Boolean(row);
}

async function matchesPassword(password, env) {
  const material = await crypto.subtle.importKey('raw', encoder.encode(password), 'PBKDF2', false, ['deriveBits']);
  const bits = await crypto.subtle.deriveBits({name: 'PBKDF2', hash: 'SHA-256', iterations: 100000,
    salt: decode64(env.WORKSHOP_PASSWORD_SALT)}, material, 256);
  const actual = hex(bits), expected = env.WORKSHOP_PASSWORD_HASH;
  if (!/^[a-f0-9]{64}$/.test(expected)) throw new Error('configuration');
  let difference = 0;
  for (let i = 0; i < 64; i++) difference |= actual.charCodeAt(i) ^ expected.charCodeAt(i);
  return difference === 0;
}

async function readKey(env) {
  const envelope = JSON.parse(env.OPENAI_KEY_ENVELOPE);
  const wrappingKey = await crypto.subtle.importKey('raw', decode64(env.OPENAI_KEY_WRAPPING_KEY), 'AES-GCM', false, ['decrypt']);
  const bytes = await crypto.subtle.decrypt({name: 'AES-GCM', iv: decode64(envelope.iv)}, wrappingKey, decode64(envelope.data));
  const key = new TextDecoder().decode(bytes);
  if (!key.startsWith('sk-')) throw new Error('configuration');
  return key;
}

export async function handleApi(request, env) {
  const url = new URL(request.url);
  if (!url.pathname.startsWith('/api/')) return null;
  if (url.pathname !== '/api/workshop-key') return response(404, 'Not found.');
  if (request.method !== 'POST') return response(405, 'Use the password form to retrieve the key.');
  if (!env.SITE_ORIGIN || request.headers.get('origin') !== env.SITE_ORIGIN || url.origin !== env.SITE_ORIGIN ||
      ['cross-site', 'same-site'].includes(request.headers.get('sec-fetch-site'))) return response(403, 'Open the workshop site to retrieve the key.');
  if (request.headers.get('content-type')?.split(';')[0] !== 'application/json') return response(415, 'Expected a password submission.');
  const expires = Date.parse(env.WORKSHOP_KEY_EXPIRES_AT);
  if (!Number.isFinite(expires)) return response(503, 'Workshop key access is not configured.');
  if (Date.now() >= expires) return response(410, 'Workshop key access has ended. Ask the facilitator for help.');
  let body;
  try { body = await boundedJson(request); } catch { return response(400, 'Enter the workshop password.'); }
  if (typeof body?.password !== 'string' || !body.password || body.password.length > 128) return response(400, 'Enter the workshop password.');
  if (!env.DB || !env.WORKSHOP_PASSWORD_HASH || !env.WORKSHOP_PASSWORD_SALT || !env.OPENAI_KEY_ENVELOPE || !env.OPENAI_KEY_WRAPPING_KEY)
    return response(503, 'Workshop key access is not configured.');
  try {
    // Cloudflare supplies this header; never use client-selected X-Forwarded-For.
    const ip = request.headers.get('cf-connecting-ip') || 'unknown';
    const fingerprint = hex(await crypto.subtle.digest('SHA-256', encoder.encode(env.WORKSHOP_PASSWORD_SALT + ':' + ip)));
    const epoch = Math.floor(Date.now() / 900000), minute = Math.floor(Date.now() / 60000);
    const scope = `ip:${epoch}:${fingerprint}`;
    if (!await reserve(env.DB, `global:${minute}`, 1000) || !await reserve(env.DB, scope, 10))
      return response(429, 'Too many attempts. Please wait 15 minutes and try again.');
    if (!await matchesPassword(body.password, env)) return response(401, 'Incorrect workshop password.');
    // Successful participants sharing the venue network do not consume the failed-attempt allowance.
    await env.DB.prepare('UPDATE workshop_key_attempts SET used = max(0, used - 1) WHERE scope = ?').bind(scope).run();
    return response(200, 'Key unlocked. Copy it into your private API setup.', {key: await readKey(env), expiresAt: env.WORKSHOP_KEY_EXPIRES_AT});
  } catch {
    console.error('Workshop key retrieval unavailable.');
    return response(503, 'Key retrieval is temporarily unavailable. Please try again later.');
  }
}
