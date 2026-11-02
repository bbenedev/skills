// Copia todas las skills (o las que coincidan con un prefijo) a una carpeta, una por name.
// Uso: node tools/instalar.mjs <destino> [prefijo...]   ej.: node tools/instalar.mjs .claude/skills negocios/ventas
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { listSkills } from './skills.mjs';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const [dest, ...prefixes] = process.argv.slice(2);
if (!dest) { console.error('Uso: node tools/instalar.mjs <destino> [prefijo...]'); process.exit(1); }
const pick = listSkills(root).filter(s => !prefixes.length || prefixes.some(p => s.rel === p || s.rel.startsWith(p.replace(/\/$/, '') + '/')));
for (const s of pick) {
  const to = path.join(dest, s.meta.name);
  fs.rmSync(to, { recursive: true, force: true });
  fs.cpSync(s.dir, to, { recursive: true });
}
console.log(`✓ ${pick.length} skills copiadas a ${dest}`);
