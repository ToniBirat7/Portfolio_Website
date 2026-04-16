import { cp, mkdir } from 'node:fs/promises';
import { resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const scriptDir = resolve(fileURLToPath(new URL('.', import.meta.url)));
const root = resolve(scriptDir, '..');
const srcDir = resolve(root, 'src/content/pages');
const publicDir = resolve(root, 'public/content/pages');

await mkdir(publicDir, { recursive: true });
await cp(srcDir, publicDir, { recursive: true, force: true });

console.log('Synced static pages to public/content/pages');
