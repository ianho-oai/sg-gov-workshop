import {DatabaseSync} from 'node:sqlite';
import {readFileSync} from 'node:fs';
import {randomBytes, pbkdf2Sync, createCipheriv} from 'node:crypto';
export const testPassword='test-password-only';
export const testKey='sk-test-fixture-not-a-real-key';
export function fixture(origin='https://workshop.example') {
  const sqlite=new DatabaseSync(':memory:');
  sqlite.exec(readFileSync(new URL('../drizzle/0001_workshop_key_attempts.sql',import.meta.url),'utf8'));
  const salt=randomBytes(16), wrapping=randomBytes(32),iv=randomBytes(12);
  const cipher=createCipheriv('aes-256-gcm',wrapping,iv);
  const encrypted=Buffer.concat([cipher.update(testKey),cipher.final(),cipher.getAuthTag()]);
  return {sqlite,env:{SITE_ORIGIN:origin,WORKSHOP_KEY_EXPIRES_AT:new Date(Date.now()+3600000).toISOString(),
    WORKSHOP_PASSWORD_SALT:salt.toString('base64'),WORKSHOP_PASSWORD_HASH:pbkdf2Sync(testPassword,salt,100000,32,'sha256').toString('hex'),
    OPENAI_KEY_WRAPPING_KEY:wrapping.toString('base64'),OPENAI_KEY_ENVELOPE:JSON.stringify({iv:iv.toString('base64'),data:encrypted.toString('base64')}),
    DB: {prepare(sql) {
      return {bind(...args) {
        return {async first() {return sqlite.prepare(sql).get(...args)||null;}, async run() {return sqlite.prepare(sql).run(...args);}};
      }};
    }},
  }};
}
