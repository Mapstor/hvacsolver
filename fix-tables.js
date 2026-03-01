const fs = require('fs');
const path = require('path');

function parseSpaceTable(tableLines) {
  // Find the dash line to determine column positions
  const dashLineIdx = tableLines.findIndex(line => /^[\s-]+$/.test(line) && line.includes('---'));
  if (dashLineIdx === -1) return null;

  const dashLine = tableLines[dashLineIdx];

  // Find column boundaries from dash groups
  const columns = [];
  let inDash = false;
  let start = 0;

  for (let i = 0; i < dashLine.length; i++) {
    if (dashLine[i] === '-' && !inDash) {
      inDash = true;
      start = i;
    } else if (dashLine[i] !== '-' && inDash) {
      inDash = false;
      columns.push({ start, end: i });
    }
  }
  if (inDash) {
    columns.push({ start, end: dashLine.length });
  }

  if (columns.length < 2) return null;

  // Parse rows - find non-empty, non-dash lines
  const dataRows = tableLines.filter(line =>
    line.trim() &&
    !/^[\s-]+$/.test(line)
  );

  if (dataRows.length < 1) return null;

  // Extract cell values for each row
  const parsedRows = dataRows.map(line => {
    return columns.map(col => {
      const cell = line.substring(col.start, col.end).trim();
      // Remove ** bold markers
      return cell.replace(/\*\*/g, '');
    });
  });

  // Build markdown table
  const header = parsedRows[0];
  const separator = header.map(() => '---');
  const body = parsedRows.slice(1);

  let markdown = '| ' + header.join(' | ') + ' |\n';
  markdown += '| ' + separator.join(' | ') + ' |\n';
  body.forEach(row => {
    markdown += '| ' + row.join(' | ') + ' |\n';
  });

  return markdown;
}

function findAndReplaceTables(content) {
  const lines = content.split('\n');
  const result = [];
  let i = 0;
  let tablesFixed = 0;

  while (i < lines.length) {
    const line = lines[i];

    // Check if this is a dash border line (start of table)
    if (/^\s*-{3,}/.test(line) && /^[\s-]+$/.test(line)) {
      // Look for table pattern: dash line, content lines, dash line
      const tableLines = [line];
      let j = i + 1;
      let foundEnd = false;

      while (j < lines.length) {
        const nextLine = lines[j];
        tableLines.push(nextLine);

        // Check if this is the ending dash line
        if (/^\s*-{3,}/.test(nextLine) && /^[\s-]+$/.test(nextLine) && j > i + 1) {
          foundEnd = true;
          break;
        }
        j++;

        // Safety limit - tables shouldn't be more than 50 lines
        if (j - i > 50) break;
      }

      if (foundEnd) {
        const mdTable = parseSpaceTable(tableLines);
        if (mdTable) {
          result.push(mdTable);
          tablesFixed++;
          i = j + 1;
          continue;
        }
      }
    }

    result.push(line);
    i++;
  }

  return { content: result.join('\n'), tablesFixed };
}

function processFile(filePath, dryRun = false) {
  const content = fs.readFileSync(filePath, 'utf8');
  const { content: fixed, tablesFixed } = findAndReplaceTables(content);

  if (tablesFixed > 0) {
    if (!dryRun) {
      fs.writeFileSync(filePath, fixed);
    }
    return { file: path.basename(filePath), tablesFixed, changed: content !== fixed };
  }
  return null;
}

const mode = process.argv[2];
const file = process.argv[3];

if (mode === 'preview' && file) {
  const content = fs.readFileSync(file, 'utf8');
  const { content: fixed, tablesFixed } = findAndReplaceTables(content);

  console.log(`\n=== TABLE CONVERSION PREVIEW for ${path.basename(file)} ===\n`);
  console.log(`Tables found and converted: ${tablesFixed}\n`);

  // Show first converted table
  const lines = fixed.split('\n');
  for (let i = 0; i < lines.length; i++) {
    if (lines[i].startsWith('|') && lines[i].includes('|')) {
      console.log('First converted table:');
      while (i < lines.length && lines[i].includes('|')) {
        console.log(lines[i]);
        i++;
      }
      break;
    }
  }
} else if (mode === 'apply') {
  const articlesDir = './content/articles';
  const files = fs.readdirSync(articlesDir).filter(f => f.endsWith('.mdx'));
  let totalFixed = 0;

  files.forEach(f => {
    const result = processFile(path.join(articlesDir, f));
    if (result && result.changed) {
      console.log(`Fixed ${result.tablesFixed} tables in: ${result.file}`);
      totalFixed += result.tablesFixed;
    }
  });

  console.log(`\nTotal tables fixed: ${totalFixed}`);
}
