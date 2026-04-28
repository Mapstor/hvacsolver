// scripts/hand-tuned-descriptions.mjs
//
// Override the auto-fixed descriptions for articles where the auto-fix
// produced something too short or generic. These are hand-written from
// the article's actual subject matter, targeting 140-160 chars.

import fs from 'node:fs';
import path from 'node:path';

const articlesDir = 'content/articles';

const newDescriptions = {
  'seer-rating':
    "What SEER ratings mean for your AC's efficiency and electricity bill. SEER2 vs old SEER, regional minimums, and a calculator showing real dollar savings.",
  'refrigerant-pt-charts':
    'Interactive pressure-temperature charts for R-410A, R-22, R-32, R-454B, R-134a, and 3 more refrigerants. Lookup saturation pressures with NIST REFPROP data.',
  'how-many-btu-ac':
    'How many BTU your room AC needs. Calculate window or portable AC cooling capacity from room size, climate zone, sun exposure, and ceiling height.',
  'mini-split-sizing':
    'Mini split sizing made simple. Calculate required BTU for ductless heat pumps based on room size, climate zone, insulation, and zone count.',
  'furnace-sizing-calculator':
    'Furnace sizing calculator using ACCA Manual J methodology. Get the right BTU output for your home from climate zone, square footage, and insulation.',
  'cop-calculator':
    'Calculate Coefficient of Performance (COP) for heat pumps and HVAC equipment. Compare gas furnace vs heat pump efficiency and operating costs head-to-head.',
  'where-to-place-air-purifier':
    'Where to place your air purifier for maximum effectiveness. Best room positions, distance from walls, and why bedroom placement is usually the wrong choice.',
  'tankless-vs-tank':
    'Tankless vs tank water heaters compared by upfront cost, lifespan, energy efficiency, recovery rate, and installation. Which is right for your home and budget.',
  'outside-ac-not-running':
    'Outside AC unit not running while indoor blower works? Diagnose contactor, capacitor, breaker, and thermostat issues before calling an HVAC technician.',
  'furnace-filter-guide':
    'Furnace filter guide: how to read MERV ratings, install filters with the airflow arrow correct, and choose between 1-inch, 4-inch, and pleated filters.',
  'merv-rating-chart':
    'MERV rating chart explained: what each MERV level filters, MERV vs MPR vs FPR comparison, and what filter rating you actually need for your HVAC system.',
  'ac-drip-pan-overflowing':
    'AC drip pan overflowing? Quick fixes for clogged condensate drains, failed pumps, and float switch issues — before water damages your ceiling or floor.',
  'vent-portable-ac-without-window':
    'How to vent a portable AC without a window: through-the-wall, sliding door, dryer vent, drop ceiling, and casement window adapter options compared.',
  'refrigerant-types':
    'R-22, R-410A, R-32, R-454B compared: GWP, phase-out timelines, system compatibility, and what refrigerant your HVAC system uses or will need next.',
  'heat-pump-temperature-range':
    'Heat pump temperature range: at what outdoor temperature does a heat pump stop working? Standard, cold-climate, and dual-fuel system limits explained.',
  'how-long-do-ac-units-last':
    'How long do AC units last? Average lifespans for central AC, window units, mini splits, and heat pumps — plus the maintenance habits that add 5+ years.',
  'thermostat-not-reaching-temperature':
    'Thermostat not reaching set temperature? Diagnose undersized equipment, refrigerant issues, leaky ducts, and home envelope problems by symptom and timing.',
  'ac-short-cycling':
    'AC short cycling — turning on and off every few minutes — causes wear, high bills, and poor cooling. Top 7 causes (oversizing, low refrigerant, sensors).',
  'heating-cost-calculator':
    'Heating cost calculator comparing electric, natural gas, propane, oil, and heat pump systems. Estimate monthly winter heating bills for your home.',
};

let updated = 0, missing = 0, lengthFails = 0;

for (const [slug, newDesc] of Object.entries(newDescriptions)) {
  if (newDesc.length > 165) {
    console.log(`OVER 165 chars (${newDesc.length}): ${slug}`);
    lengthFails++;
    continue;
  }
  const filePath = path.join(articlesDir, `${slug}.mdx`);
  if (!fs.existsSync(filePath)) {
    missing++;
    console.log(`MISSING ${slug}`);
    continue;
  }

  const text = fs.readFileSync(filePath, 'utf8');
  const re = /^description:\s+"(?:[^"\\]|\\.)*"\s*$/m;
  if (!re.test(text)) {
    console.log(`NO DESCRIPTION LINE in ${slug}`);
    continue;
  }

  const yamlSafe = newDesc.replace(/"/g, '\\"');
  const newText = text.replace(re, `description: "${yamlSafe}"`);
  fs.writeFileSync(filePath, newText);
  updated++;
  console.log(`OK ${slug.padEnd(40)} (${newDesc.length} chars)`);
}

console.log(`\nUpdated: ${updated}, Missing: ${missing}, Length failures: ${lengthFails}`);
