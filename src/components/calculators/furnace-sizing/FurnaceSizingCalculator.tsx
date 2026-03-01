'use client';

import { useState } from 'react';
import CalculatorWrapper from '../CalculatorWrapper';
import CalculatorInput from '../CalculatorInput';
import { CalculatorResult, ResultsGrid, ResultsTable } from '../CalculatorResult';
import ResultsContainer from '../ResultsContainer';
import FurnaceSizingSVG from './FurnaceSizingSVG';

// Heating Degree Days (HDD) by climate zone - annual totals
// Source: NOAA Climate Data, ASHRAE Climate Design Data
const CLIMATE_ZONES: Record<string, { label: string; hdd: number; designTemp: number }> = {
  zone_1: { label: 'Zone 1: Miami, FL (Very Hot)', hdd: 150, designTemp: 52 },
  zone_2: { label: 'Zone 2: Houston, TX (Hot-Humid)', hdd: 1500, designTemp: 35 },
  zone_3: { label: 'Zone 3: Atlanta, GA (Warm)', hdd: 2800, designTemp: 25 },
  zone_4: { label: 'Zone 4: Baltimore, MD (Mixed)', hdd: 4500, designTemp: 15 },
  zone_5: { label: 'Zone 5: Chicago, IL (Cool)', hdd: 6200, designTemp: 0 },
  zone_6: { label: 'Zone 6: Minneapolis, MN (Cold)', hdd: 7500, designTemp: -10 },
  zone_7: { label: 'Zone 7: Duluth, MN (Very Cold)', hdd: 9500, designTemp: -20 },
};

// BTU per square foot factors based on construction quality
// Source: ACCA Manual J simplified rules, Energy Star
const CONSTRUCTION_FACTORS: Record<string, { label: string; btuPerSqFt: number }> = {
  excellent: { label: 'Excellent (New, Energy Star)', btuPerSqFt: 20 },
  good: { label: 'Good (2000+ construction)', btuPerSqFt: 30 },
  average: { label: 'Average (1980-2000)', btuPerSqFt: 40 },
  poor: { label: 'Poor (Pre-1980, no upgrades)', btuPerSqFt: 50 },
};

// Standard furnace sizes (BTU output)
const FURNACE_SIZES = [40000, 60000, 80000, 100000, 120000, 140000];

interface FurnaceSizingResults {
  baseLoad: number;
  adjustedLoad: number;
  recommendedSize: number;
  inputBTU80: number;
  inputBTU90: number;
  inputBTU95: number;
  oversizePercent: number;
  adjustments: Array<{ factor: string; multiplier: number; impact: string }>;
  fuelComparison: Array<{ fuel: string; annualCost: string; efficiency: string }>;
  recommendations: string[];
}

// Calculate furnace size using simplified Manual J methodology
// Base formula: BTU = Square Feet × BTU/sq ft factor × Climate multiplier
// Source: ACCA Manual J (simplified), ASHRAE Handbook of Fundamentals
function calculateFurnaceSize(
  squareFeet: number,
  climateZone: string,
  construction: string,
  stories: number,
  windowPercent: string,
  ceilingHeight: number,
  indoorTemp: number
): FurnaceSizingResults {
  const climate = CLIMATE_ZONES[climateZone];
  const constructionData = CONSTRUCTION_FACTORS[construction];

  // Base load calculation
  const baseLoad = squareFeet * constructionData.btuPerSqFt;

  const adjustments: Array<{ factor: string; multiplier: number; impact: string }> = [];

  // Climate zone adjustment (normalized to Zone 5)
  const baseHDD = 6200; // Zone 5 baseline
  const climateMultiplier = climate.hdd / baseHDD;
  const climateImpact = baseLoad * climateMultiplier - baseLoad;
  adjustments.push({
    factor: 'Climate Zone',
    multiplier: climateMultiplier,
    impact: `${climateImpact >= 0 ? '+' : ''}${Math.round(climateImpact).toLocaleString()} BTU`,
  });

  // Stories adjustment (multi-story homes lose more heat)
  const storyMultiplier = stories === 1 ? 1.0 : stories === 2 ? 1.1 : 1.15;
  adjustments.push({
    factor: 'Number of Stories',
    multiplier: storyMultiplier,
    impact: `${Math.round((storyMultiplier - 1) * 100)}% increase`,
  });

  // Window percentage adjustment
  const windowMultipliers: Record<string, number> = {
    minimal: 0.9,
    average: 1.0,
    above_average: 1.1,
    high: 1.2,
  };
  const windowMult = windowMultipliers[windowPercent] || 1.0;
  adjustments.push({
    factor: 'Window Coverage',
    multiplier: windowMult,
    impact: `${Math.round((windowMult - 1) * 100)}% adjustment`,
  });

  // Ceiling height adjustment (base is 8 ft)
  const ceilingMultiplier = ceilingHeight / 8;
  adjustments.push({
    factor: 'Ceiling Height',
    multiplier: ceilingMultiplier,
    impact: `${Math.round((ceilingMultiplier - 1) * 100)}% adjustment`,
  });

  // Design temperature difference adjustment
  // Indoor temp minus design outdoor temp
  const tempDiff = indoorTemp - climate.designTemp;
  const baseTempDiff = 70; // Assumes 70°F baseline diff
  const tempMultiplier = tempDiff / baseTempDiff;
  adjustments.push({
    factor: 'Temperature Difference',
    multiplier: tempMultiplier,
    impact: `${tempDiff}°F design ΔT`,
  });

  // Calculate adjusted load
  let adjustedLoad = baseLoad;
  adjustedLoad *= climateMultiplier;
  adjustedLoad *= storyMultiplier;
  adjustedLoad *= windowMult;
  adjustedLoad *= ceilingMultiplier;
  adjustedLoad *= tempMultiplier;

  adjustedLoad = Math.round(adjustedLoad);

  // Find appropriate furnace size
  const recommendedSize = findFurnaceSize(adjustedLoad);

  // Calculate oversizing percentage
  const oversizePercent = Math.round((recommendedSize / adjustedLoad - 1) * 100);

  // Calculate input BTU at different efficiencies
  // Output = Input × Efficiency (AFUE)
  const inputBTU80 = Math.round(adjustedLoad / 0.80);
  const inputBTU90 = Math.round(adjustedLoad / 0.90);
  const inputBTU95 = Math.round(adjustedLoad / 0.95);

  // Generate fuel comparison
  const fuelComparison = generateFuelComparison(adjustedLoad, climate.hdd);

  // Generate recommendations
  const recommendations = generateRecommendations(
    adjustedLoad,
    recommendedSize,
    construction,
    climate.hdd
  );

  return {
    baseLoad: Math.round(baseLoad),
    adjustedLoad,
    recommendedSize,
    inputBTU80,
    inputBTU90,
    inputBTU95,
    oversizePercent,
    adjustments,
    fuelComparison,
    recommendations,
  };
}

function findFurnaceSize(requiredBTU: number): number {
  // Add 10% safety factor
  const targetBTU = requiredBTU * 1.10;

  for (const size of FURNACE_SIZES) {
    if (size >= targetBTU) {
      return size;
    }
  }

  // If exceeds largest standard size
  return FURNACE_SIZES[FURNACE_SIZES.length - 1];
}

function generateFuelComparison(
  heatLoad: number,
  hdd: number
): Array<{ fuel: string; annualCost: string; efficiency: string }> {
  // Estimate annual heating hours based on HDD
  // Rough approximation: HDD × 24 / (design temp diff) gives heating hours
  const heatingHours = (hdd * 18) / 65; // Simplified formula

  // Annual BTU required
  const annualBTU = heatLoad * heatingHours * 0.5; // 50% average load factor

  // Fuel costs (approximate national averages per million BTU)
  const fuelCosts = [
    { fuel: 'Natural Gas (90% AFUE)', costPerMMBTU: 12, efficiency: 0.9 },
    { fuel: 'Natural Gas (80% AFUE)', costPerMMBTU: 12, efficiency: 0.8 },
    { fuel: 'Propane (90% AFUE)', costPerMMBTU: 28, efficiency: 0.9 },
    { fuel: 'Electric Heat Pump (HSPF 10)', costPerMMBTU: 15, efficiency: 2.93 },
    { fuel: 'Electric Resistance', costPerMMBTU: 35, efficiency: 1.0 },
  ];

  return fuelCosts.map((f) => {
    const annualCost = (annualBTU / 1000000 / f.efficiency) * f.costPerMMBTU;
    return {
      fuel: f.fuel,
      annualCost: `$${Math.round(annualCost).toLocaleString()}`,
      efficiency: f.efficiency >= 1 ? `${Math.round(f.efficiency * 100)}%` : `COP ${f.efficiency.toFixed(1)}`,
    };
  });
}

function generateRecommendations(
  heatLoad: number,
  furnaceSize: number,
  construction: string,
  hdd: number
): string[] {
  const recs: string[] = [];

  // Efficiency recommendation based on climate
  if (hdd > 5000) {
    recs.push(
      'In cold climates, a 90%+ AFUE condensing furnace typically pays back the extra cost within 3-5 years.'
    );
  } else if (hdd > 3000) {
    recs.push(
      'In moderate climates, a 90% AFUE furnace is recommended. The payback period is typically 5-7 years.'
    );
  } else {
    recs.push(
      'In mild climates with low heating demand, an 80% AFUE furnace may be most cost-effective.'
    );
  }

  // Construction-based recommendations
  if (construction === 'poor' || construction === 'average') {
    recs.push(
      'Consider air sealing and insulation upgrades. Improving the building envelope can reduce the required furnace size by 20-40%.'
    );
  }

  // Sizing recommendation
  const oversizePercent = (furnaceSize / heatLoad - 1) * 100;
  if (oversizePercent > 25) {
    recs.push(
      'Consider a two-stage or modulating furnace for better comfort and efficiency at this size.'
    );
  }

  // Variable speed blower recommendation
  if (heatLoad > 60000) {
    recs.push(
      'A variable-speed blower motor improves comfort and can reduce electricity usage by 30-40%.'
    );
  }

  return recs;
}

export default function FurnaceSizingCalculator() {
  const [squareFeet, setSquareFeet] = useState(2000);
  const [climateZone, setClimateZone] = useState('zone_5');
  const [construction, setConstruction] = useState('average');
  const [stories, setStories] = useState(2);
  const [windowPercent, setWindowPercent] = useState('average');
  const [ceilingHeight, setCeilingHeight] = useState(8);
  const [indoorTemp, setIndoorTemp] = useState(70);
  const [results, setResults] = useState<FurnaceSizingResults | null>(null);

  const handleCalculate = () => {
    const result = calculateFurnaceSize(
      squareFeet,
      climateZone,
      construction,
      stories,
      windowPercent,
      ceilingHeight,
      indoorTemp
    );
    setResults(result);
  };

  return (
    <CalculatorWrapper
      title="Furnace Sizing Calculator"
      description="Calculate the right furnace size based on climate zone, home construction, and building envelope characteristics."
    >
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-4">
          <CalculatorInput
            id="squareFeet"
            label="Heated Square Footage"
            type="number"
            value={squareFeet}
            onChange={(e) => setSquareFeet(parseFloat(e.target.value) || 0)}
            min={500}
            max={10000}
            unit="sq ft"
          />

          <CalculatorInput
            id="climateZone"
            label="Climate Zone"
            type="select"
            value={climateZone}
            onChange={(e) => setClimateZone(e.target.value)}
            options={Object.entries(CLIMATE_ZONES).map(([key, value]) => ({
              value: key,
              label: value.label,
            }))}
          />

          <CalculatorInput
            id="construction"
            label="Construction Quality"
            type="select"
            value={construction}
            onChange={(e) => setConstruction(e.target.value)}
            options={Object.entries(CONSTRUCTION_FACTORS).map(([key, value]) => ({
              value: key,
              label: value.label,
            }))}
          />

          <CalculatorInput
            id="stories"
            label="Number of Stories"
            type="select"
            value={stories.toString()}
            onChange={(e) => setStories(parseInt(e.target.value))}
            options={[
              { value: '1', label: '1 Story' },
              { value: '2', label: '2 Stories' },
              { value: '3', label: '3+ Stories' },
            ]}
          />
        </div>

        <div className="space-y-4">
          <CalculatorInput
            id="windowPercent"
            label="Window Coverage"
            type="select"
            value={windowPercent}
            onChange={(e) => setWindowPercent(e.target.value)}
            options={[
              { value: 'minimal', label: 'Minimal (< 10% of wall area)' },
              { value: 'average', label: 'Average (10-15%)' },
              { value: 'above_average', label: 'Above Average (15-20%)' },
              { value: 'high', label: 'High (> 20%)' },
            ]}
          />

          <CalculatorInput
            id="ceilingHeight"
            label="Average Ceiling Height"
            type="select"
            value={ceilingHeight.toString()}
            onChange={(e) => setCeilingHeight(parseInt(e.target.value))}
            options={[
              { value: '8', label: '8 ft (Standard)' },
              { value: '9', label: '9 ft' },
              { value: '10', label: '10 ft' },
              { value: '12', label: '12 ft (Vaulted)' },
            ]}
          />

          <CalculatorInput
            id="indoorTemp"
            label="Indoor Temperature Setpoint"
            type="number"
            value={indoorTemp}
            onChange={(e) => setIndoorTemp(parseFloat(e.target.value) || 0)}
            min={60}
            max={75}
            unit="°F"
          />

          <button
            onClick={handleCalculate}
            className="w-full mt-4 px-6 py-3 bg-orange-600 text-white font-semibold rounded-lg hover:bg-orange-700 transition-colors"
          >
            Calculate Furnace Size
          </button>
        </div>
      </div>

      <ResultsContainer show={!!results} variant="margin">
        {results && (
          <>
          <FurnaceSizingSVG
            btuRequired={results.adjustedLoad}
            homeSqFt={squareFeet}
            climateZone={parseInt(climateZone.replace('zone_', '')) || 4}
            insulationLevel={construction}
            recommendedSize={results.recommendedSize}
            efficiency={95}
          />
          <ResultsGrid>
            <CalculatorResult
              label="Calculated Heat Load"
              value={results.adjustedLoad.toLocaleString()}
              unit="BTU/hr"
              primary
            />
            <CalculatorResult
              label="Recommended Furnace"
              value={`${(results.recommendedSize / 1000).toFixed(0)}k`}
              unit="BTU/hr output"
              subtitle={`${results.oversizePercent}% above calculated load`}
            />
            <CalculatorResult
              label="Input @ 80% AFUE"
              value={results.inputBTU80.toLocaleString()}
              unit="BTU/hr"
            />
            <CalculatorResult
              label="Input @ 95% AFUE"
              value={results.inputBTU95.toLocaleString()}
              unit="BTU/hr"
            />
          </ResultsGrid>

          {/* Load Adjustments */}
          <div>
            <h3 className="font-semibold text-slate-800 mb-3">Load Calculation Factors</h3>
            <ResultsTable
              headers={['Factor', 'Multiplier', 'Impact']}
              rows={results.adjustments.map((a) => [
                a.factor,
                a.multiplier.toFixed(2),
                a.impact,
              ])}
            />
            <div className="mt-2 text-sm text-slate-600 bg-slate-50 p-3 rounded">
              <strong>Base load:</strong> {results.baseLoad.toLocaleString()} BTU/hr →{' '}
              <strong>Adjusted load:</strong> {results.adjustedLoad.toLocaleString()} BTU/hr
            </div>
          </div>

          {/* Fuel Cost Comparison */}
          <div>
            <h3 className="font-semibold text-slate-800 mb-3">
              Estimated Annual Heating Cost by Fuel Type
            </h3>
            <ResultsTable
              headers={['Fuel Type', 'Est. Annual Cost', 'Efficiency']}
              rows={results.fuelComparison.map((f) => [f.fuel, f.annualCost, f.efficiency])}
            />
            <p className="mt-2 text-xs text-slate-500">
              Based on national average fuel prices. Your actual costs will vary by location and
              utility rates.
            </p>
          </div>

          {/* Recommendations */}
          <div className="bg-orange-50 border border-orange-200 rounded-lg p-4">
            <h3 className="font-semibold text-orange-800 mb-2">Recommendations</h3>
            <ul className="text-sm text-orange-900 list-disc list-inside space-y-1">
              {results.recommendations.map((rec, i) => (
                <li key={i}>{rec}</li>
              ))}
            </ul>
          </div>

          {/* Formula explanation */}
          <div className="text-sm text-slate-600 bg-slate-50 p-4 rounded-lg">
            <h4 className="font-semibold mb-2">Calculation Method</h4>
            <p>
              <strong>Base formula:</strong> Heat Load = Square Feet × BTU/sq ft (based on
              construction quality) × Climate Factor × Adjustment Factors
            </p>
            <p className="mt-1">
              <strong>Climate factor:</strong> Based on Heating Degree Days (HDD) normalized to IECC
              Zone 5 (Chicago, 6,200 HDD)
            </p>
            <p className="mt-1">
              <strong>Sources:</strong> ACCA Manual J (simplified), ASHRAE Handbook of Fundamentals,
              IECC Climate Zone definitions
            </p>
          </div>
          </>
        )}
      </ResultsContainer>
    </CalculatorWrapper>
  );
}
