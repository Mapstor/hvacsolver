const fs = require('fs');
const path = require('path');

function fixMdxContent(content) {
  // Split into frontmatter and body
  const frontmatterMatch = content.match(/^(---\n[\s\S]*?\n---\n)([\s\S]*)$/);
  if (!frontmatterMatch) return content;

  const frontmatter = frontmatterMatch[1];
  let body = frontmatterMatch[2];

  // Process line by line to handle tables correctly
  const lines = body.split('\n');
  const fixedLines = lines.map((line, idx) => {
    // Skip table border lines (lines that are only dashes, spaces, and pipes)
    if (/^[\s\-|]+$/.test(line)) {
      return line;
    }

    // Remove stray "HVACSolver.com" byline (standalone line)
    if (/^\s*HVACSolver\.com\s*$/.test(line)) {
      return null; // Mark for removal
    }

    // Remove HTML comments
    line = line.replace(/<!--[\s\S]*?-->/g, '');

    // Fix triple hyphens to em dash in text: " --- " or "word---word"
    line = line.replace(/ --- /g, ' — ');
    line = line.replace(/(\w)---(\w)/g, '$1—$2');
    line = line.replace(/(\w)--- /g, '$1— ');
    line = line.replace(/ ---(\w)/g, ' —$1');

    // Fix double hyphens in number ranges to single hyphen: 500--700 → 500-700
    line = line.replace(/(\d+)--(\d+)/g, '$1-$2');

    // Fix remaining double hyphens to em dash in text
    line = line.replace(/ -- /g, ' — ');
    line = line.replace(/(\w)--(\w)/g, '$1—$2');
    line = line.replace(/(\w)-- /g, '$1— ');
    line = line.replace(/ --(\w)/g, ' —$1');

    return line;
  });

  // Remove null entries (deleted lines) and rejoin
  body = fixedLines.filter(line => line !== null).join('\n');

  // Clean up multiple consecutive blank lines
  body = body.replace(/\n{3,}/g, '\n\n');

  return frontmatter + body;
}

function showDiff(original, fixed) {
  const origLines = original.split('\n');
  const fixedLines = fixed.split('\n');
  const diffs = [];

  // Simple line-by-line comparison
  const maxLen = Math.max(origLines.length, fixedLines.length);
  let origIdx = 0;
  let fixIdx = 0;

  while (origIdx < origLines.length || fixIdx < fixedLines.length) {
    const orig = origLines[origIdx] || '';
    const fix = fixedLines[fixIdx] || '';

    if (orig === fix) {
      origIdx++;
      fixIdx++;
    } else if (orig.trim() === 'HVACSolver.com') {
      // This line was removed
      diffs.push({ type: 'removed', line: origIdx + 1, text: orig });
      origIdx++;
    } else if (orig !== fix) {
      diffs.push({ type: 'changed', line: origIdx + 1, before: orig, after: fix });
      origIdx++;
      fixIdx++;
    }
  }

  return diffs;
}

const mode = process.argv[2];
const file = process.argv[3];

if (mode === 'preview' && file) {
  const content = fs.readFileSync(file, 'utf8');
  const fixed = fixMdxContent(content);
  const diffs = showDiff(content, fixed);

  console.log(`\n=== DIFF PREVIEW for ${path.basename(file)} ===\n`);

  diffs.forEach(d => {
    if (d.type === 'removed') {
      console.log(`Line ${d.line} REMOVED:`);
      console.log(`  - ${d.text}`);
    } else {
      console.log(`Line ${d.line} CHANGED:`);
      console.log(`  BEFORE: ${d.before.substring(0, 100)}${d.before.length > 100 ? '...' : ''}`);
      console.log(`  AFTER:  ${d.after.substring(0, 100)}${d.after.length > 100 ? '...' : ''}`);
    }
    console.log('');
  });

  console.log(`Total: ${diffs.length} changes`);
} else if (mode === 'apply') {
  const articlesDir = './content/articles';
  const files = fs.readdirSync(articlesDir).filter(f => f.endsWith('.mdx'));
  let totalFixed = 0;

  files.forEach(f => {
    const filePath = path.join(articlesDir, f);
    const content = fs.readFileSync(filePath, 'utf8');
    const fixed = fixMdxContent(content);

    if (content !== fixed) {
      fs.writeFileSync(filePath, fixed);
      totalFixed++;
      console.log(`Fixed: ${f}`);
    }
  });

  console.log(`\nTotal files fixed: ${totalFixed}`);
}
