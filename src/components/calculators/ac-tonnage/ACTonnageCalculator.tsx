'use client';

import { useState } from 'react';
import CalculatorWrapper from '../CalculatorWrapper';
import CalculatorInput from '../CalculatorInput';
import { CalculatorResult, ResultsGrid, ResultsTable } from '../CalculatorResult';
import ResultsContainer from '../ResultsContainer';
import ACTonnageSVG from './ACTonnageSVG';

// Climate zones with base BTU per square foot
// Source: ACCA Manual J simplified methodology, DOE climate zone data
const CLIMATE_ZONES = [
  { id: 'hot-humid', name: 'Hot-Humid (FL, Gulf Coast, HI)', baseBTU: 30, coolingMultiplier: 1.15 },
  { id: 'hot-dry', name: 'Hot-Dry (AZ, NV, Southern CA)', baseBTU: 28, coolingMultiplier: 1.10 },
  { id: 'mixed-humid', name: 'Mixed-Humid (Southeast, Mid-Atlantic)', baseBTU: 25, coolingMultiplier: 1.0 },
  { id: 'mixed-dry', name: 'Mixed-Dry (Southwest interior)', baseBTU: 24, coolingMultiplier: 0.95 },
  { id: 'cool-humid', name: 'Cool-Humid (Northeast, Pacific NW)', baseBTU: 22, coolingMultiplier: 0.90 },
  { id: 'cool-dry', name: 'Cool-Dry (Mountain regions)', baseBTU: 20, coolingMultiplier: 0.85 },
  { id: 'cold', name: 'Cold (Upper Midwest, Northern states)', baseBTU: 18, coolingMultiplier: 0.80 },
];

// Insulation quality factors
// Source: ASHRAE 90.1, DOE insulation guidelines
const INSULATION_FACTORS = [
  { id: 'poor', name: 'Poor (older home, minimal insulation)', factor: 1.25 },
  { id: 'average', name: 'Average (standard 2x4 walls, R-13)', factor: 1.0 },
  { id: 'good', name: 'Good (2x6 walls, R-19+, modern)', factor: 0.85 },
  { id: 'excellent', name: 'Excellent (spray foam, R-30+ walls)', factor: 0.70 },
];

// Window factors based on area and type
// Source: ASHRAE Handbook of Fundamentals, fenestration tables
const WINDOW_TYPES = [
  { id: 'single', name: 'Single pane', solarGainFactor: 1.0 },
  { id: 'double', name: 'Double pane', solarGainFactor: 0.70 },
  { id: 'double-low-e', name: 'Double pane Low-E', solarGainFactor: 0.55 },
  { id: 'triple-low-e', name: 'Triple pane Low-E', solarGainFactor: 0.40 },
];

// Sun exposure factors
const SUN_EXPOSURE = [
  { id: 'heavy-shade', name: 'Heavy shade (trees, buildings)', factor: 0.85 },
  { id: 'partial-shade', name: 'Partial shade', factor: 0.92 },
  { id: 'average', name: 'Average exposure', factor: 1.0 },
  { id: 'full-sun', name: 'Full sun exposure', factor: 1.10 },
  { id: 'west-facing', name: 'Heavy west-facing windows', factor: 1.20 },
];

// Standard AC sizes in tons
const AC_SIZES = [1.5, 2, 2.5, 3, 3.5, 4, 4.5, 5];

interface ACTonnageResults {
  totalBTU: number;
  requiredTons: number;
  recommendedTons: number;
  breakdown: {
    label: string;
    btu: number;
    percentage: number;
  }[];
  sizeAnalysis: string;
  efficiencyNote: string;
  oversizedWarning: boolean;
  undersizedWarning: boolean;
}

// Calculate AC tonnage using Manual J simplified methodology
// Source: ACCA Manual J 8th Edition (simplified), ASHRAE Handbook of Fundamentals
function calculateACTonnage(
  squareFeet: number,
  climateZone: string,
  insulation: string,
  windowPercent: number,
  windowType: string,
  sunExposure: string,
  occupants: number,
  ceilingHeight: number,
  kitchenType: string,
  ductLocation: string
): ACTonnageResults {
  const climate = CLIMATE_ZONES.find((c) => c.id === climateZone) || CLIMATE_ZONES[2];
  const insulationFactor = INSULATION_FACTORS.find((i) => i.id === insulation)?.factor || 1.0;
  const windowTypeData = WINDOW_TYPES.find((w) => w.id === windowType) || WINDOW_TYPES[1];
  const sunFactor = SUN_EXPOSURE.find((s) => s.id === sunExposure)?.factor || 1.0;

  // Ceiling height adjustment (standard is 8 ft)
  const ceilingFactor = ceilingHeight / 8;

  // Base envelope load (walls + ceiling + floor)
  // Formula: Area × BaseBTU × Insulation Factor × Ceiling Factor
  const envelopeLoad = squareFeet * climate.baseBTU * insulationFactor * ceilingFactor;

  // Window solar gain
  // Source: ASHRAE solar heat gain methodology
  // Average solar gain for south-facing window: 150 BTU/hr/sq ft
  const windowArea = (squareFeet * windowPercent) / 100;
  const baseSolarGain = 150; // BTU/hr per sq ft for average conditions
  const windowLoad = windowArea * baseSolarGain * windowTypeData.solarGainFactor * sunFactor * climate.coolingMultiplier;

  // Occupant load
  // Source: ASHRAE 90.1: 400 BTU/hr sensible + 200 BTU/hr latent per person
  const occupantLoad = occupants * 600;

  // Appliance/internal loads
  // Source: ASHRAE Handbook of Fundamentals
  let applianceLoad = 1200; // Base: lighting + misc
  if (kitchenType === 'open') {
    applianceLoad += 1200; // Additional for open kitchen
  } else if (kitchenType === 'closed') {
    applianceLoad += 400; // Closed kitchen, less impact on main space
  }

  // Duct losses (if in unconditioned space)
  // Source: DOE studies show 20-30% losses for attic/crawl ducts
  let ductLossFactor = 1.0;
  if (ductLocation === 'attic') {
    ductLossFactor = 1.25; // 25% loss for attic
  } else if (ductLocation === 'crawl') {
    ductLossFactor = 1.15; // 15% loss for crawlspace
  } else if (ductLocation === 'garage') {
    ductLossFactor = 1.10; // 10% loss for garage
  }

  // Infiltration load (simplified)
  // Based on 0.5 ACH for average home
  const volume = squareFeet * ceilingHeight;
  const infiltrationCFM = (volume * 0.5) / 60;
  // Q = 1.08 × CFM × ΔT, assume 15°F average indoor/outdoor temp diff for cooling
  const infiltrationLoad = 1.08 * infiltrationCFM * 15;

  // Calculate subtotals
  const baseLoad = envelopeLoad + windowLoad + occupantLoad + applianceLoad + infiltrationLoad;
  const totalBTU = Math.round(baseLoad * ductLossFactor);

  // Convert to tons (12,000 BTU = 1 ton)
  const requiredTons = totalBTU / 12000;

  // Find recommended standard size
  let recommendedTons = AC_SIZES[0];
  for (const size of AC_SIZES) {
    if (size >= requiredTons) {
      recommendedTons = size;
      break;
    }
  }
  // If larger than 5 tons, round up to nearest 0.5
  if (requiredTons > 5) {
    recommendedTons = Math.ceil(requiredTons * 2) / 2;
  }

  // Build breakdown
  const breakdown = [
    {
      label: 'Building Envelope',
      btu: Math.round(envelopeLoad),
      percentage: Math.round((envelopeLoad / baseLoad) * 100),
    },
    {
      label: 'Window Solar Gain',
      btu: Math.round(windowLoad),
      percentage: Math.round((windowLoad / baseLoad) * 100),
    },
    {
      label: 'Occupants',
      btu: Math.round(occupantLoad),
      percentage: Math.round((occupantLoad / baseLoad) * 100),
    },
    {
      label: 'Appliances/Lights',
      btu: Math.round(applianceLoad),
      percentage: Math.round((applianceLoad / baseLoad) * 100),
    },
    {
      label: 'Infiltration',
      btu: Math.round(infiltrationLoad),
      percentage: Math.round((infiltrationLoad / baseLoad) * 100),
    },
  ];

  if (ductLossFactor > 1) {
    const ductLoss = Math.round(baseLoad * (ductLossFactor - 1));
    breakdown.push({
      label: 'Duct Losses',
      btu: ductLoss,
      percentage: Math.round((ductLoss / totalBTU) * 100),
    });
  }

  // Generate size analysis
  const oversizePercent = ((recommendedTons * 12000) / totalBTU - 1) * 100;
  let sizeAnalysis = '';
  const oversizedWarning = oversizePercent > 25;
  const undersizedWarning = recommendedTons < requiredTons;

  if (oversizePercent < 5) {
    sizeAnalysis =
      'The recommended size closely matches your calculated load. This is ideal for efficiency and dehumidification.';
  } else if (oversizePercent < 15) {
    sizeAnalysis =
      'The recommended unit provides a small safety margin. This is acceptable for standard installations.';
  } else if (oversizePercent < 25) {
    sizeAnalysis =
      'This size includes a moderate safety margin. Consider the next size down if energy efficiency is a priority.';
  } else {
    sizeAnalysis =
      'Warning: This size may be oversized for your needs. Oversized AC units cycle frequently, reducing efficiency and dehumidification. Consider a smaller unit or variable-speed system.';
  }

  // Efficiency note
  let efficiencyNote = '';
  if (requiredTons <= 2) {
    efficiencyNote =
      'For this cooling load, consider a high-efficiency mini-split system (SEER 20+) for optimal performance.';
  } else if (requiredTons <= 3.5) {
    efficiencyNote =
      'Look for SEER 16+ rated units. Variable-speed compressors provide better humidity control.';
  } else {
    efficiencyNote =
      'For larger systems, two-stage or variable-speed units significantly improve comfort and efficiency.';
  }

  return {
    totalBTU,
    requiredTons: Math.round(requiredTons * 100) / 100,
    recommendedTons,
    breakdown,
    sizeAnalysis,
    efficiencyNote,
    oversizedWarning,
    undersizedWarning,
  };
}

export default function ACTonnageCalculator() {
  const [squareFeet, setSquareFeet] = useState(2000);
  const [climateZone, setClimateZone] = useState('mixed-humid');
  const [insulation, setInsulation] = useState('average');
  const [windowPercent, setWindowPercent] = useState(15);
  const [windowType, setWindowType] = useState('double');
  const [sunExposure, setSunExposure] = useState('average');
  const [occupants, setOccupants] = useState(4);
  const [ceilingHeight, setCeilingHeight] = useState(8);
  const [kitchenType, setKitchenType] = useState('open');
  const [ductLocation, setDuctLocation] = useState('conditioned');
  const [results, setResults] = useState<ACTonnageResults | null>(null);

  const handleCalculate = () => {
    const result = calculateACTonnage(
      squareFeet,
      climateZone,
      insulation,
      windowPercent,
      windowType,
      sunExposure,
      occupants,
      ceilingHeight,
      kitchenType,
      ductLocation
    );
    setResults(result);
  };

  return (
    <CalculatorWrapper
      title="AC Tonnage Calculator"
      description="Calculate the correct air conditioner size for your home using ACCA Manual J simplified methodology. Accounts for climate, insulation, windows, and more."
    >
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Home Size & Climate */}
        <div className="space-y-4">
          <h3 className="font-semibold text-slate-800">Home Details</h3>

          <CalculatorInput
            id="squareFeet"
            label="Conditioned Square Footage"
            type="number"
            value={squareFeet}
            onChange={(e) => setSquareFeet(parseInt(e.target.value) || 0)}
            min={100}
            max={10000}
            helpText="Total cooled floor area"
          />

          <CalculatorInput
            id="climateZone"
            label="Climate Zone"
            type="select"
            value={climateZone}
            onChange={(e) => setClimateZone(e.target.value)}
            options={CLIMATE_ZONES.map((c) => ({ value: c.id, label: c.name }))}
          />

          <CalculatorInput
            id="insulation"
            label="Insulation Quality"
            type="select"
            value={insulation}
            onChange={(e) => setInsulation(e.target.value)}
            options={INSULATION_FACTORS.map((i) => ({ value: i.id, label: i.name }))}
          />

          <CalculatorInput
            id="ceilingHeight"
            label="Ceiling Height (feet)"
            type="number"
            value={ceilingHeight}
            onChange={(e) => setCeilingHeight(parseFloat(e.target.value) || 8)}
            min={7}
            max={20}
            step={0.5}
          />
        </div>

        {/* Windows & Solar */}
        <div className="space-y-4">
          <h3 className="font-semibold text-slate-800">Windows & Solar Gain</h3>

          <CalculatorInput
            id="windowPercent"
            label="Window Area (% of floor area)"
            type="number"
            value={windowPercent}
            onChange={(e) => setWindowPercent(parseInt(e.target.value) || 0)}
            min={5}
            max={50}
            helpText="Typical homes: 10-20%"
          />

          <CalculatorInput
            id="windowType"
            label="Window Type"
            type="select"
            value={windowType}
            onChange={(e) => setWindowType(e.target.value)}
            options={WINDOW_TYPES.map((w) => ({ value: w.id, label: w.name }))}
          />

          <CalculatorInput
            id="sunExposure"
            label="Sun Exposure"
            type="select"
            value={sunExposure}
            onChange={(e) => setSunExposure(e.target.value)}
            options={SUN_EXPOSURE.map((s) => ({ value: s.id, label: s.name }))}
          />
        </div>

        {/* Internal Loads */}
        <div className="space-y-4">
          <h3 className="font-semibold text-slate-800">Internal Loads</h3>

          <CalculatorInput
            id="occupants"
            label="Number of Occupants"
            type="number"
            value={occupants}
            onChange={(e) => setOccupants(parseInt(e.target.value) || 1)}
            min={1}
            max={20}
            helpText="Regular daytime occupants"
          />

          <CalculatorInput
            id="kitchenType"
            label="Kitchen Layout"
            type="select"
            value={kitchenType}
            onChange={(e) => setKitchenType(e.target.value)}
            options={[
              { value: 'open', label: 'Open to living areas' },
              { value: 'closed', label: 'Closed/separate kitchen' },
              { value: 'minimal', label: 'Minimal cooking (apartment)' },
            ]}
          />
        </div>

        {/* Duct System */}
        <div className="space-y-4">
          <h3 className="font-semibold text-slate-800">Duct System</h3>

          <CalculatorInput
            id="ductLocation"
            label="Duct Location"
            type="select"
            value={ductLocation}
            onChange={(e) => setDuctLocation(e.target.value)}
            options={[
              { value: 'conditioned', label: 'Inside conditioned space' },
              { value: 'attic', label: 'Attic (unconditioned)' },
              { value: 'crawl', label: 'Crawlspace' },
              { value: 'garage', label: 'Garage' },
            ]}
            helpText="Ducts outside conditioned space increase load"
          />
        </div>
      </div>

      <button
        onClick={handleCalculate}
        className="w-full mt-6 px-6 py-3 bg-orange-600 text-white font-semibold rounded-lg hover:bg-orange-700 transition-colors"
      >
        Calculate AC Size
      </button>

      <ResultsContainer show={!!results} variant="margin">
        {results && (
          <>
          {/* Heat Gain Visualization */}
          <ACTonnageSVG
            breakdown={results.breakdown}
            totalBTU={results.totalBTU}
            recommendedTons={results.recommendedTons}
          />

          <ResultsGrid>
            <CalculatorResult
              label="Cooling Load"
              value={results.totalBTU.toLocaleString()}
              unit="BTU/hr"
              subtitle="Total calculated heat gain"
            />
            <CalculatorResult
              label="Required Tonnage"
              value={results.requiredTons}
              unit="tons"
              subtitle="Calculated size"
            />
            <CalculatorResult
              label="Recommended Size"
              value={results.recommendedTons}
              unit="tons"
              primary
              subtitle="Standard AC size"
              highlight={results.oversizedWarning ? 'warning' : undefined}
            />
            <CalculatorResult
              label="BTU Capacity"
              value={(results.recommendedTons * 12000).toLocaleString()}
              unit="BTU/hr"
              subtitle="Nominal cooling capacity"
            />
          </ResultsGrid>

          {/* Load Breakdown */}
          <div>
            <h3 className="font-semibold text-slate-800 mb-3">Heat Gain Breakdown</h3>
            <ResultsTable
              headers={['Component', 'BTU/hr', 'Percentage']}
              rows={results.breakdown.map((b) => [b.label, b.btu.toLocaleString(), `${b.percentage}%`])}
            />
          </div>

          {/* Visual Breakdown */}
          <div>
            <h3 className="font-semibold text-slate-800 mb-3">Load Distribution</h3>
            <div className="space-y-2">
              {results.breakdown.map((item) => (
                <div key={item.label} className="flex items-center gap-3">
                  <span className="w-36 text-sm text-slate-600">{item.label}</span>
                  <div className="flex-1 bg-slate-100 rounded-full h-4 overflow-hidden">
                    <div
                      className="h-full bg-orange-500 rounded-full transition-all duration-300"
                      style={{ width: `${item.percentage}%` }}
                    />
                  </div>
                  <span className="w-12 text-sm text-slate-700 text-right">{item.percentage}%</span>
                </div>
              ))}
            </div>
          </div>

          {/* Sizing Analysis */}
          <div
            className={`p-4 rounded-lg border ${
              results.oversizedWarning
                ? 'bg-amber-50 border-amber-200'
                : 'bg-blue-50 border-blue-200'
            }`}
          >
            <h3
              className={`font-semibold mb-2 ${
                results.oversizedWarning ? 'text-amber-800' : 'text-blue-800'
              }`}
            >
              Sizing Analysis
            </h3>
            <p
              className={`text-sm ${
                results.oversizedWarning ? 'text-amber-900' : 'text-blue-900'
              }`}
            >
              {results.sizeAnalysis}
            </p>
          </div>

          {/* Efficiency Note */}
          <div className="bg-green-50 border border-green-200 rounded-lg p-4">
            <h3 className="font-semibold text-green-800 mb-2">Efficiency Recommendation</h3>
            <p className="text-sm text-green-900">{results.efficiencyNote}</p>
          </div>

          {/* Standard Sizes Reference */}
          <div>
            <h3 className="font-semibold text-slate-800 mb-3">Standard AC Sizes</h3>
            <div className="grid grid-cols-4 sm:grid-cols-8 gap-2">
              {AC_SIZES.map((size) => (
                <div
                  key={size}
                  className={`text-center p-2 rounded ${
                    size === results.recommendedTons
                      ? 'bg-orange-100 border-2 border-orange-500 font-semibold'
                      : 'bg-slate-50 border border-slate-200'
                  }`}
                >
                  <div className="text-lg">{size}</div>
                  <div className="text-xs text-slate-500">tons</div>
                </div>
              ))}
            </div>
          </div>

          {/* Formula explanation */}
          <div className="text-sm text-slate-600 bg-slate-50 p-4 rounded-lg">
            <h4 className="font-semibold mb-2">About This Calculator</h4>
            <p>
              This calculator uses a simplified version of ACCA Manual J methodology. It accounts
              for building envelope, window solar gain, internal loads, infiltration, and duct
              losses. Results are estimates; a full Manual J calculation by an HVAC professional
              is recommended for final sizing.
            </p>
            <p className="mt-2">
              <strong>Rule of thumb:</strong> Avoid oversizing by more than 15-25%. Oversized AC
              units cycle too frequently, reducing dehumidification and increasing wear.
            </p>
            <p className="mt-1">
              <strong>Sources:</strong> ACCA Manual J 8th Edition, ASHRAE Handbook of
              Fundamentals, DOE Climate Zone Data
            </p>
          </div>
          </>
        )}
      </ResultsContainer>
    </CalculatorWrapper>
  );
}
