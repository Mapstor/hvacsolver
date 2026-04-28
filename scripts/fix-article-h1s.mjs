// scripts/fix-article-h1s.mjs
//
// Fix multi-H1 problem in MDX articles:
//   - Keep the first ^# line (the article's primary H1)
//   - For every subsequent ^# line:
//       - If it looks like a formula (contains =/≈ AND a math operator),
//         demote to plain paragraph. The article template's markdown
//         components auto-detect formulas and apply .formula styling.
//       - Otherwise, demote to H2 (most likely the author wanted a
//         section heading and used `#` for visual emphasis).
//   - For files with ZERO body H1s, prepend the frontmatter title as H1.
//
// Idempotent.
//
// Run from repo root:   node scripts/fix-article-h1s.mjs

import fs from 'node:fs';
import path from 'node:path';

const articlesDir = 'content/articles';

function isFormula(text) {
  if (!text || text.length > 120) return false;
  // Look for an equality-ish marker AND at least one math operator.
  const hasEquality = /[=≈]/.test(text);
  const hasOperator = /[×÷+*\/\-]/.test(text);
  return hasEquality && hasOperator;
}

function extractTitle(text) {
  const m = text.match(/^title:\s+"((?:[^"\\]|\\.)*)"\s*$/m);
  return m ? m[1].replace(/\\"/g, '"') : null;
}

const files = fs.readdirSync(articlesDir).filter((f) => f.endsWith('.mdx'));
const stats = { multiH1Fixed: 0, addedH1: 0, untouched: 0, formulaDemoted: 0, h2Demoted: 0 };

for (const f of files) {
  const filePath = path.join(articlesDir, f);
  const text = fs.readFileSync(filePath, 'utf8');
  const lines = text.split('\n');

  let fmEnd = -1;
  if (lines[0] === '---') {
    for (let i = 1; i < lines.length; i++) {
      if (lines[i] === '---') { fmEnd = i; break; }
    }
  }
  if (fmEnd === -1) {
    console.log(`SKIP ${f}: no frontmatter`);
    continue;
  }

  let h1Count = 0;
  let changed = false;
  const transitions = [];

  for (let i = fmEnd + 1; i < lines.length; i++) {
    const line = lines[i];
    if (/^# /.test(line)) {
      h1Count++;
      if (h1Count === 1) continue; // keep first H1

      const headingText = line.replace(/^# /, '').trim();
      if (isFormula(headingText)) {
        lines[i] = headingText; // plain paragraph
        stats.formulaDemoted++;
        transitions.push(`formula: "${headingText.slice(0, 50)}"`);
      } else {
        lines[i] = `## ${headingText}`;
        stats.h2Demoted++;
        transitions.push(`H2: "${headingText.slice(0, 50)}"`);
      }
      changed = true;
    }
  }

  // Handle zero-H1 case
  if (h1Count === 0) {
    const title = extractTitle(text);
    if (!title) {
      console.log(`SKIP ${f}: no body H1 and no title`);
      stats.untouched++;
      continue;
    }
    let insertAt = fmEnd + 1;
    while (insertAt < lines.length && lines[insertAt].trim() === '') insertAt++;
    lines.splice(insertAt, 0, `# ${title}`, '');
    stats.addedH1++;
    changed = true;
    console.log(`H1+ ${f}: prepended title as H1`);
  }

  if (changed) {
    fs.writeFileSync(filePath, lines.join('\n'));
    if (h1Count > 1) {
      stats.multiH1Fixed++;
      console.log(`OK  ${f}: ${transitions.length} extra H1${transitions.length > 1 ? 's' : ''} demoted [${transitions.join(', ')}]`);
    }
  } else {
    stats.untouched++;
  }
}

console.log('');
console.log('=== Summary ===');
console.log(`Files processed         : ${files.length}`);
console.log(`Multi-H1 articles fixed : ${stats.multiH1Fixed}`);
console.log(`Missing-H1 articles fixed: ${stats.addedH1}`);
console.log(`Untouched (single H1)   : ${stats.untouched}`);
console.log(`  Demoted to formula    : ${stats.formulaDemoted}`);
console.log(`  Demoted to H2         : ${stats.h2Demoted}`);
