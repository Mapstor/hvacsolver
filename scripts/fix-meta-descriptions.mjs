// scripts/fix-meta-descriptions.mjs
//
// Detect frontmatter `description:` fields that end in `...` (truncated
// mid-sentence) and rewrite each so it ends at the last complete
// sentence boundary within ~160 characters. Idempotent.
//
// Run from repo root:   node scripts/fix-meta-descriptions.mjs
//
// This is a mechanical fix. Hand-tuned descriptions will always be
// better; this just makes 65 broken descriptions presentable.

import fs from 'node:fs';
import path from 'node:path';

const articlesDir = 'content/articles';
const TARGET_MAX = 160;

function fixDescription(desc) {
  if (!desc.endsWith('...')) return null; // not truncated, leave it

  // Strip trailing whitespace + partial last word + the ellipsis itself.
  // Examples:
  //   "...electricity bi..."     -> "...electricity"
  //   "...bi..."                  -> "..."   (after strip: "")
  //   "...electricity bill..."    -> "...electricity"
  let s = desc.replace(/\s*\S*\.{3,}\s*$/, '').trim();
  if (!s) return null;

  // Walk backward from min(len, TARGET_MAX) to find a sentence-ending punctuation.
  const max = Math.min(s.length, TARGET_MAX);
  let cut = -1;
  for (let i = max - 1; i >= 0; i--) {
    if (/[.!?]/.test(s[i])) {
      cut = i + 1;
      break;
    }
  }

  let result;
  if (cut > 20) {
    // Found a sentence boundary at a reasonable length.
    result = s.substring(0, cut).trim();
  } else {
    // No good sentence end — trim at word boundary within max and add a period.
    let truncated = s.substring(0, max);
    truncated = truncated.replace(/\s+\S*$/, '').trim();
    if (!/[.!?]$/.test(truncated)) truncated += '.';
    result = truncated;
  }

  return result;
}

const files = fs.readdirSync(articlesDir).filter((f) => f.endsWith('.mdx'));
const stats = { fixed: 0, untouched: 0, missing: 0 };
const samples = [];

for (const f of files) {
  const filePath = path.join(articlesDir, f);
  const text = fs.readFileSync(filePath, 'utf8');

  // Match description: "..." (handles escaped quotes inside)
  const re = /^description:\s+"((?:[^"\\]|\\.)*)"\s*$/m;
  const m = text.match(re);
  if (!m) {
    stats.missing++;
    console.log(`MISSING description in ${f}`);
    continue;
  }

  const original = m[1];
  const fixed = fixDescription(original);
  if (fixed === null) {
    stats.untouched++;
    continue;
  }

  // Re-escape any embedded double-quotes for YAML
  const yamlSafe = fixed.replace(/"/g, '\\"');
  const newLine = `description: "${yamlSafe}"`;
  const newText = text.replace(re, newLine);

  fs.writeFileSync(filePath, newText);
  stats.fixed++;
  if (samples.length < 8) samples.push({ slug: f.replace(/\.mdx$/, ''), before: original, after: fixed });
  console.log(`OK ${f.padEnd(45)} (${original.length} -> ${fixed.length} chars)`);
}

console.log('');
console.log('=== Summary ===');
console.log(`Files processed : ${files.length}`);
console.log(`Truncated -> fixed : ${stats.fixed}`);
console.log(`Already complete  : ${stats.untouched}`);
console.log(`Missing description : ${stats.missing}`);

if (samples.length) {
  console.log('');
  console.log('=== First 8 transformations ===');
  for (const s of samples) {
    console.log(`\n[${s.slug}]`);
    console.log(`BEFORE: ${s.before}`);
    console.log(`AFTER:  ${s.after}`);
  }
}
