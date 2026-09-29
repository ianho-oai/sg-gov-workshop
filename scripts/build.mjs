import { cp, rm, writeFile } from 'node:fs/promises';
import { readWorkshopKey } from './workshop-key.mjs';

const key = await readWorkshopKey();
const output = new URL('../dist/', import.meta.url);
await rm(output, { recursive: true, force: true });
await cp(new URL('../public/', import.meta.url), output, { recursive: true });
// Intentionally public workshop handout, generated only in ignored build output.
await writeFile(new URL('workshop-key.json', output), JSON.stringify({ key }) + '\n');
console.log('Copied workshop static files to dist/.');
