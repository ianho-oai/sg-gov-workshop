import { readFile } from 'node:fs/promises';

// Only this explicitly selected workshop credential is distributed to participants.
// Never fall back to a different key from the host's environment.
export async function readWorkshopKey() {
  const contents = await readFile(new URL('../.env.local', import.meta.url), 'utf8');
  const match = contents.match(/^OPENAI_API_KEY\s*=\s*["']?(sk-[A-Za-z0-9_-]+)["']?\s*$/m);
  if (!match) throw new Error('The workshop key is missing from .env.local.');
  return match[1];
}
