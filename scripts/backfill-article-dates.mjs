// scripts/backfill-article-dates.mjs
//
// One-shot: read each content/articles/*.mdx file's first-commit and
// last-commit dates from git, then inject `datePublished` and
// `dateModified` into the YAML frontmatter (before the closing `---`).
//
// Skips files that already have both keys. Idempotent.
//
// Run from repo root:   node scripts/backfill-article-dates.mjs

import fs from 'node:fs';
import path from 'node:path';
import { execSync } from 'node:child_process';

const articlesDir = 'content/articles';

function gitFirstCommitISO(file) {
  try {
    const out = execSync(
      `git log --diff-filter=A --follow --format=%aI -- "${file}"`,
      { encoding: 'utf8' }
    ).trim();
    if (!out) return null;
    const lines = out.split('\n').filter(Boolean);
    return lines[lines.length - 1] || null;
  } catch {
    return null;
  }
}

function gitLastCommitISO(file) {
  try {
    const out = execSync(
      `git log -1 --format=%aI -- "${file}"`,
      { encoding: 'utf8' }
    ).trim();
    return out || null;
  } catch {
    return null;
  }
}

function injectFrontmatterDates(filePath, datePublished, dateModified) {
  const text = fs.readFileSync(filePath, 'utf8');
  const lines = text.split('\n');

  if (lines[0] !== '---') {
    return { status: 'no-frontmatter' };
  }

  let end = -1;
  for (let i = 1; i < lines.length; i++) {
    if (lines[i] === '---') { end = i; break; }
  }
  if (end === -1) return { status: 'no-frontmatter-end' };

  const fmBlock = lines.slice(1, end);
  const hasPub = fmBlock.some((l) => /^datePublished\s*:/.test(l));
  const hasMod = fmBlock.some((l) => /^dateModified\s*:/.test(l));

  if (hasPub && hasMod) return { status: 'skip-already-present' };

  const additions = [];
  if (!hasPub) additions.push(`datePublished: "${datePublished}"`);
  if (!hasMod) additions.push(`dateModified: "${dateModified}"`);

  lines.splice(end, 0, ...additions);
  fs.writeFileSync(filePath, lines.join('\n'));
  return { status: 'ok', added: additions };
}

const files = fs.readdirSync(articlesDir).filter((f) => f.endsWith('.mdx'));
const counts = { ok: 0, skipped: 0, failed: 0 };
const fails = [];

for (const f of files) {
  const slug = f.replace(/\.mdx$/, '');
  const filePath = path.join(articlesDir, f);
  const firstISO = gitFirstCommitISO(filePath);
  const lastISO = gitLastCommitISO(filePath);

  if (!firstISO || !lastISO) {
    counts.failed++;
    fails.push({ slug, firstISO, lastISO });
    console.log(`FAIL ${slug}: first=${firstISO} last=${lastISO}`);
    continue;
  }

  const datePublished = firstISO.split('T')[0];
  const dateModified = lastISO.split('T')[0];
  const r = injectFrontmatterDates(filePath, datePublished, dateModified);

  if (r.status === 'ok') {
    counts.ok++;
    console.log(`OK   ${slug}: published=${datePublished} modified=${dateModified}`);
  } else if (r.status === 'skip-already-present') {
    counts.skipped++;
    console.log(`SKIP ${slug}: dates already present`);
  } else {
    counts.failed++;
    fails.push({ slug, ...r });
    console.log(`FAIL ${slug}: ${r.status}`);
  }
}

console.log('');
console.log(`=== Summary ===`);
console.log(`Files processed : ${files.length}`);
console.log(`Updated         : ${counts.ok}`);
console.log(`Skipped         : ${counts.skipped}`);
console.log(`Failed          : ${counts.failed}`);
if (fails.length) {
  console.log('Failures:');
  for (const f of fails) console.log(`  - ${JSON.stringify(f)}`);
}
