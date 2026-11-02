// Lee la biblioteca: cada SKILL.md con su name, description y carpeta.
import fs from 'node:fs';
import path from 'node:path';

export function frontmatter(text) {
  const m = /^---\n([\s\S]*?)\n---\n/.exec(text); if (!m) return null;
  const out = {};
  for (const line of m[1].split('\n')) { const i = line.indexOf(':'); if (i > 0) out[line.slice(0, i).trim()] = line.slice(i + 1).trim(); }
  return out;
}

export function listSkills(root) {
  const out = [];
  const walk = dir => {
    for (const e of fs.readdirSync(dir, { withFileTypes: true })) {
      if (e.name.startsWith('.') || e.name === 'node_modules' || e.name === 'tools') continue;
      const p = path.join(dir, e.name);
      if (e.isDirectory()) walk(p);
      else if (e.name === 'SKILL.md') { const text = fs.readFileSync(p, 'utf8'); out.push({ dir: path.dirname(p), rel: path.relative(root, path.dirname(p)).replace(/\\/g, '/'), text, meta: frontmatter(text) || {} }); }
    }
  };
  walk(root);
  return out.sort((a, b) => a.rel.localeCompare(b.rel));
}
