#!/usr/bin/env node
/**
 * Structural validation for the pattern library.
 *
 * Documentation repositories rot silently: a renamed file leaves dead links, a new
 * pattern never reaches the index, a stated count drifts from the real one. These
 * checks are the mechanical half of review, so humans can spend theirs on the prose.
 */

import { readFileSync, readdirSync, existsSync } from 'node:fs';
import { join, dirname, resolve, relative } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const errors = [];
const fail = (file, message) => errors.push(`${relative(root, file)}: ${message}`);

const patternsDir = join(root, 'patterns');
const patterns = readdirSync(patternsDir)
  .filter((f) => f.endsWith('.instructions.md'))
  .sort();

/* ---------- 1. Frontmatter ---------- */

for (const name of patterns) {
  const file = join(patternsDir, name);
  const text = readFileSync(file, 'utf8');
  const match = text.match(/^---\n([\s\S]*?)\n---\n/);

  if (!match) {
    fail(file, 'missing YAML frontmatter block');
    continue;
  }
  const front = match[1];
  if (!/^description:\s*\S/m.test(front)) fail(file, 'frontmatter missing a non-empty "description"');
  if (!/^applyTo:\s*\S/m.test(front)) fail(file, 'frontmatter missing a non-empty "applyTo" glob');

  const body = text.slice(match[0].length);
  if (!/^# .+/m.test(body)) fail(file, 'missing a top-level "# " heading');
  if (name !== 'accessibility.instructions.md' && !/^## WCAG References/m.test(body)) {
    fail(file, 'missing a "## WCAG References" section');
  }
  if (name !== 'accessibility.instructions.md' && !/^## Implementation Checklist/m.test(body)) {
    fail(file, 'missing an "## Implementation Checklist" section');
  }
  if (!/^[a-z0-9]+(-[a-z0-9]+)*\.instructions\.md$/.test(name)) {
    fail(file, 'filename is not kebab-case');
  }
}

/* ---------- 2. Relative links resolve ---------- */

const linkable = ['README.md', 'AGENTS.md', 'CLAUDE.md', 'CONTRIBUTING.md', 'CHANGELOG.md', 'ROADMAP.md']
  .map((f) => join(root, f))
  .filter(existsSync)
  .concat(
    readdirSync(join(root, 'docs')).map((f) => join(root, 'docs', f)),
    patterns.map((f) => join(patternsDir, f)),
    [join(patternsDir, 'INDEX.md'), join(root, 'skills', 'accessibility', 'SKILL.md')],
  );

for (const file of linkable) {
  if (!existsSync(file)) continue;
  const text = readFileSync(file, 'utf8');
  for (const [, target] of text.matchAll(/\]\((?!https?:|#|mailto:)([^)\s]+)\)/g)) {
    const [path] = target.split('#');
    if (!path) continue;
    const resolved = path.startsWith('/') ? join(root, path) : resolve(dirname(file), path);
    if (!existsSync(resolved)) fail(file, `broken relative link -> ${target}`);
  }
}

/* ---------- 3. Every pattern is routed and catalogued ---------- */

const index = readFileSync(join(patternsDir, 'INDEX.md'), 'utf8');
const readme = readFileSync(join(root, 'README.md'), 'utf8');
const quickRef = readFileSync(join(root, 'docs', 'quick-reference.md'), 'utf8');

for (const name of patterns) {
  if (name === 'accessibility.instructions.md') continue;
  if (!index.includes(name)) fail(join(patternsDir, 'INDEX.md'), `does not route to ${name}`);
  if (!readme.includes(name)) fail(join(root, 'README.md'), `does not list ${name}`);
  if (!quickRef.includes(name)) fail(join(root, 'docs', 'quick-reference.md'), `does not list ${name}`);
}

/* ---------- 4. Stated counts match reality ---------- */

const count = patterns.length;

/* The first version of this check looked only for "N pattern files", which matched
 * AGENTS.md and nothing else — README states its count four different ways, so the
 * file where the original 33-vs-40 drift happened was the one file left unguarded.
 * Enumerate the phrasings instead of trying to be clever about prose. */
const countClaims = [
  /(\d+)\s+(?:accessibility\s+)?(?:reference|pattern|markdown pattern)\s+files?/gi,
  /(?:all|of)\s+(\d+)\s+patterns?\b/gi,
  /^(\d+)\s+patterns\b/gim,
  /(?:all|The)\s+(\d+)\s+files\b/gi,
  /catalog of all\s+(\d+)/gi,
  /Loading all\s+(\d+)\s+costs/gi,
  /reference of\s+(\d+)/gi,
];

let claimsChecked = 0;
for (const rel of ['README.md', 'AGENTS.md', 'CLAUDE.md', 'skills/accessibility/SKILL.md',
                   '.github/copilot-instructions.md', '.cursor/rules/accessibility.mdc']) {
  const file = join(root, rel);
  if (!existsSync(file)) continue;
  const text = readFileSync(file, 'utf8');
  for (const re of countClaims) {
    for (const [match, stated] of text.matchAll(re)) {
      claimsChecked += 1;
      if (Number(stated) !== count) {
        fail(file, `claims ${stated} where the real pattern count is ${count} — "${match.trim()}"`);
      }
    }
  }
}
if (claimsChecked === 0) {
  fail(join(root, 'scripts/validate.mjs'), 'count check matched nothing — the regexes have drifted from the prose');
}

/* ---------- Report ---------- */

if (errors.length) {
  console.error(`\n✗ ${errors.length} validation error${errors.length === 1 ? '' : 's'}:\n`);
  for (const e of errors) console.error(`  ${e}`);
  console.error('');
  process.exit(1);
}
console.log(`✓ ${count} pattern files valid: frontmatter, structure, links, index and catalog coverage, ${claimsChecked} count claims.`);
