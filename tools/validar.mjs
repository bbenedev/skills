// Revisa que cada skill tenga lo mínimo para que un agente la use sin inventar.
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { listSkills } from './skills.mjs';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const skills = listSkills(root), errs = [], names = new Map();
for (const s of skills) {
  const where = s.rel + '/SKILL.md';
  if (!/^[a-z0-9]+(-[a-z0-9]+)*$/.test(s.meta.name || '')) errs.push(`${where}: falta name en kebab-case`);
  if ((s.meta.description || '').length < 60) errs.push(`${where}: la description tiene que decir en qué situación exacta usarla`);
  if (names.has(s.meta.name)) errs.push(`${where}: name repetido con ${names.get(s.meta.name)}`); else names.set(s.meta.name, where);
  if (!/^## Cómo saber si salió bien/m.test(s.text)) errs.push(`${where}: falta la sección "Cómo saber si salió bien"`);
  if (s.rel.startsWith('negocios/') && !/^## Fuentes/m.test(s.text)) errs.push(`${where}: las skills de negocios necesitan "## Fuentes"`);
}
if (errs.length) { console.error(errs.join('\n')); process.exit(1); }
console.log(`✓ ${skills.length} skills válidas`);
