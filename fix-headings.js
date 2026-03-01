const fs = require('fs');
const path = require('path');

function fixHeadings(content) {
  // Split into frontmatter and body
  const frontmatterMatch = content.match(/^(---\n[\s\S]*?\n---\n)([\s\S]*)$/);
  if (!frontmatterMatch) return { content, changes: 0 };

  const frontmatter = frontmatterMatch[1];
  let body = frontmatterMatch[2];
  let changes = 0;
  let isFirstBoldLine = true; // Track the first bold line (article title)

  // Process line by line
  const lines = body.split('\n');
  const fixedLines = lines.map((line, idx) => {
    // Skip lines that are part of tables
    if (line.includes('|')) return line;

    // Skip lines that are part of lists (but not **bold** lines)
    // List items have format: "- text", "* text", "1. text"
    if (/^\s*[-*]\s/.test(line) || /^\s*\d+\.\s/.test(line)) return line;

    // Match standalone bold lines that look like headings
    // Pattern: line starts with **, ends with **, and is a "heading-like" phrase
    const boldHeadingMatch = line.match(/^\*\*([^*]+)\*\*$/);
    if (boldHeadingMatch) {
      const text = boldHeadingMatch[1].trim();

      // Skip if it looks like a note/important marker
      if (text.startsWith('Important:') || text.startsWith('Note:') || text.startsWith('Recommendation:')) {
        return line;
      }

      // Skip if it's a question/answer inline (short phrases)
      if (text.length < 15 && !text.includes('?')) return line;

      // Skip formulas (contain = sign in the middle)
      if (text.includes(' = ') || text.includes(' ÷ ')) return line;

      // Skip sentence-like text that ends with a period (not a heading)
      if (text.endsWith('.') && !text.endsWith('?') && text.split(' ').length > 6) return line;

      // Check if next line is empty (typical heading pattern)
      const nextLine = lines[idx + 1];
      const prevLine = lines[idx - 1];

      // If prev line is empty and next line is empty or content, it's likely a heading
      if ((prevLine === '' || prevLine === undefined) &&
          (nextLine === '' || (nextLine && !nextLine.startsWith('**')))) {

        // Determine heading level based on context
        changes++;

        // First bold line is the article title (H1)
        if (isFirstBoldLine) {
          isFirstBoldLine = false;
          return `# ${text}`;
        }

        // Check for sub-section indicators (H3)
        const isSubSection = text.includes('Example') ||
                            text.includes('Case') ||
                            text.includes('Step') ||
                            /^\d+\./.test(text);

        if (isSubSection) {
          return `### ${text}`;
        }
        return `## ${text}`;
      }
    }

    return line;
  });

  body = fixedLines.join('\n');
  return { content: frontmatter + body, changes };
}

const mode = process.argv[2];
const file = process.argv[3];

if (mode === 'preview' && file) {
  const content = fs.readFileSync(file, 'utf8');
  const { content: fixed, changes } = fixHeadings(content);

  console.log(`\n=== HEADING CONVERSION PREVIEW for ${path.basename(file)} ===\n`);
  console.log(`Headings converted: ${changes}\n`);

  // Show converted headings
  const lines = fixed.split('\n');
  lines.forEach((line, i) => {
    if (line.startsWith('# ') || line.startsWith('## ') || line.startsWith('### ')) {
      console.log(`Line ${i + 1}: ${line}`);
    }
  });
} else if (mode === 'apply') {
  const articlesDir = './content/articles';
  const files = fs.readdirSync(articlesDir).filter(f => f.endsWith('.mdx'));
  let totalChanges = 0;

  files.forEach(f => {
    const filePath = path.join(articlesDir, f);
    const content = fs.readFileSync(filePath, 'utf8');
    const { content: fixed, changes } = fixHeadings(content);

    if (changes > 0) {
      fs.writeFileSync(filePath, fixed);
      console.log(`Fixed ${changes} headings in: ${f}`);
      totalChanges += changes;
    }
  });

  console.log(`\nTotal headings fixed: ${totalChanges}`);
}
