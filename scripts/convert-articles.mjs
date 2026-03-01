#!/usr/bin/env node
/**
 * Converts all source articles (md, docx, html) to MDX with frontmatter
 * Uses article-mapping.json for metadata
 */

import fs from 'fs';
import path from 'path';
import { execSync } from 'child_process';

const SOURCE_DIR = path.join(process.cwd(), '..', 'source-articles');
const OUTPUT_DIR = path.join(process.cwd(), 'content', 'articles');
const MAPPING_FILE = path.join(process.cwd(), '..', 'article-mapping.json');

// Pillar to hub mapping
const PILLAR_HUBS = {
  'calculators': '/hvac-calculators',
  'troubleshooting': '/hvac-troubleshooting',
  'efficiency': '/hvac-efficiency',
  'installation': '/hvac-installation',
  'insulation': '/insulation',
  'energy-costs': '/energy-costs',
  'refrigerants': '/refrigerants',
  'indoor-climate': '/indoor-climate',
  'water-heaters': '/water-heaters',
  'standalone': null
};

// Calculator component mapping (slug -> component name)
const CALCULATOR_COMPONENTS = {
  'ac-tonnage-calculator': 'ACTonnageCalculator',
  'heating-btu-calculator': 'HeatingBTUCalculator',
  'furnace-sizing-calculator': 'FurnaceSizingCalculator',
  'heat-pump-sizing': 'HeatPumpSizingCalculator',
  'mini-split-sizing': 'MiniSplitSizingCalculator',
  'how-many-btu-ac': 'RoomACCalculator',
  'cfm-calculator': 'CFMCalculator',
  'cfm-duct-sizing': 'DuctSizingCalculator',
  'bathroom-fan-cfm': 'BathroomFanCFMCalculator',
  'air-changes-per-hour': 'ACHCalculator',
  'ceiling-fan-size': 'CeilingFanSizeCalculator',
  'generator-sizing': 'GeneratorSizingCalculator',
  'water-heater-sizing': 'WaterHeaterSizingCalculator',
  'tankless-water-heater-size': 'TanklessWaterHeaterCalculator',
  'dew-point-calculator': 'DewPointCalculator',
  'cost-to-run-air-conditioner': 'ACRunningCostCalculator',
  'cost-to-run-electric-heater': 'ElectricHeaterCostCalculator',
  'heat-pump-running-cost': 'HeatPumpCostCalculator',
  'dehumidifier-running-cost': 'DehumidifierCostCalculator',
  'heating-cost-calculator': 'HeatingCostCalculator',
  'btu-conversion-calculator': 'BTUConversionCalculator',
  'cop-calculator': 'COPCalculator',
  'sones-to-decibels': 'SonesToDecibelsCalculator',
  'seer-rating': 'SEERCalculator',
  'air-purifier-sizing': 'AirPurifierSizingCalculator',
  'refrigerant-pt-charts': 'RefrigerantPTChart'
};

function convertDocxToMarkdown(docxPath) {
  try {
    const result = execSync(`pandoc "${docxPath}" -t markdown --wrap=none`, {
      encoding: 'utf8',
      maxBuffer: 10 * 1024 * 1024
    });
    return result;
  } catch (e) {
    console.error(`Error converting ${docxPath}:`, e.message);
    return '';
  }
}

function convertHtmlToMarkdown(htmlPath) {
  try {
    const result = execSync(`pandoc "${htmlPath}" -f html -t markdown --wrap=none`, {
      encoding: 'utf8',
      maxBuffer: 10 * 1024 * 1024
    });
    return result;
  } catch (e) {
    console.error(`Error converting ${htmlPath}:`, e.message);
    return '';
  }
}

function cleanMarkdown(content) {
  // Remove excessive blank lines
  content = content.replace(/\n{4,}/g, '\n\n\n');

  // Clean up pandoc artifacts
  content = content.replace(/\{[^}]*\}/g, ''); // Remove curly brace attributes
  content = content.replace(/\\$/gm, ''); // Remove trailing backslashes
  content = content.replace(/\[\]{[^}]*}/g, ''); // Remove empty links with attributes

  // Clean up table formatting from pandoc
  content = content.replace(/:---/g, '---');
  content = content.replace(/---:/g, '---');

  return content.trim();
}

function generateDescription(title, content) {
  // Extract first paragraph that isn't a blockquote or header
  const lines = content.split('\n');
  for (const line of lines) {
    const trimmed = line.trim();
    if (trimmed &&
        !trimmed.startsWith('#') &&
        !trimmed.startsWith('>') &&
        !trimmed.startsWith('|') &&
        !trimmed.startsWith('-') &&
        !trimmed.startsWith('*') &&
        trimmed.length > 50) {
      // Clean and truncate
      let desc = trimmed.replace(/\[([^\]]+)\]\([^)]+\)/g, '$1'); // Remove links
      desc = desc.replace(/\*\*([^*]+)\*\*/g, '$1'); // Remove bold
      desc = desc.replace(/\*([^*]+)\*/g, '$1'); // Remove italic
      desc = desc.replace(/\\'/g, "'"); // Remove escaped apostrophes (invalid in YAML double-quoted strings)
      desc = desc.replace(/\\/g, ''); // Remove remaining backslashes
      if (desc.length > 155) {
        desc = desc.substring(0, 152) + '...';
      }
      return desc;
    }
  }
  return title;
}

function generateFrontmatter(metadata, content) {
  const pillarHub = PILLAR_HUBS[metadata.pillar] || null;
  const calculatorComponent = metadata.hasCalculator ? (CALCULATOR_COMPONENTS[metadata.slug] || null) : null;
  const description = generateDescription(metadata.title, content);

  // Clean strings for YAML: escape double quotes, remove invalid backslash escapes
  const cleanForYaml = (str) => str.replace(/\\'/g, "'").replace(/\\/g, '').replace(/"/g, '\\"');
  const cleanTitle = cleanForYaml(metadata.title);
  const cleanDescription = cleanForYaml(description);

  let frontmatter = `---
title: "${cleanTitle}"
slug: "${metadata.slug}"
description: "${cleanDescription}"
pillar: "${metadata.pillar}"`;

  if (pillarHub) {
    frontmatter += `\npillarHub: "${pillarHub}"`;
  }

  frontmatter += `\nhasCalculator: ${metadata.hasCalculator}`;

  if (calculatorComponent) {
    frontmatter += `\ncalculatorComponent: "${calculatorComponent}"`;
  }

  frontmatter += `\nseoTitle: "${cleanTitle}"
---`;

  return frontmatter;
}

async function main() {
  // Read mapping
  const mapping = JSON.parse(fs.readFileSync(MAPPING_FILE, 'utf8'));

  // Ensure output dir exists
  if (!fs.existsSync(OUTPUT_DIR)) {
    fs.mkdirSync(OUTPUT_DIR, { recursive: true });
  }

  let converted = 0;
  let failed = 0;

  for (const [filename, metadata] of Object.entries(mapping)) {
    const sourcePath = path.join(SOURCE_DIR, filename);
    const outputPath = path.join(OUTPUT_DIR, `${metadata.slug}.mdx`);

    if (!fs.existsSync(sourcePath)) {
      console.error(`Source file not found: ${filename}`);
      failed++;
      continue;
    }

    let content = '';
    const ext = path.extname(filename).toLowerCase();

    try {
      if (ext === '.md') {
        content = fs.readFileSync(sourcePath, 'utf8');
      } else if (ext === '.docx') {
        content = convertDocxToMarkdown(sourcePath);
      } else if (ext === '.html') {
        content = convertHtmlToMarkdown(sourcePath);
      } else {
        console.error(`Unknown extension for ${filename}`);
        failed++;
        continue;
      }

      if (!content) {
        console.error(`Empty content for ${filename}`);
        failed++;
        continue;
      }

      // Clean up the markdown
      content = cleanMarkdown(content);

      // Generate frontmatter
      const frontmatter = generateFrontmatter(metadata, content);

      // Combine frontmatter and content
      const mdxContent = `${frontmatter}\n\n${content}`;

      // Write to output
      fs.writeFileSync(outputPath, mdxContent);
      console.log(`Converted: ${metadata.slug}.mdx`);
      converted++;

    } catch (e) {
      console.error(`Failed to convert ${filename}:`, e.message);
      failed++;
    }
  }

  console.log(`\nDone! Converted: ${converted}, Failed: ${failed}`);
}

main().catch(console.error);
