'use client';

import { useState } from 'react';
import CalculatorWrapper from '../CalculatorWrapper';
import CalculatorInput from '../CalculatorInput';
import { CalculatorResult, ResultsGrid, ResultsTable } from '../CalculatorResult';
import ResultsContainer from '../ResultsContainer';
import SEERRatingSVG from './SEERRatingSVG';

// Regional average electricity rates (cents per kWh)
// Source: EIA Electric Power Monthly, 2024 data
const ELECTRICITY_RATES = [
  { id: 'national', name: 'National Average', rate: 0.16 },
  { id: 'northeast', name: 'Northeast (CT, MA, NH, RI)', rate: 0.25 },
  { id: 'midatlantic', name: 'Mid-Atlantic (NY, NJ, PA)', rate: 0.19 },
  { id: 'south', name: 'South (FL, GA, TX)', rate: 0.14 },
  { id: 'midwest', name: 'Midwest (IL, OH, MI)', rate: 0.15 },
  { id: 'mountain', name: 'Mountain (CO, AZ, NV)', rate: 0.13 },
  { id: 'pacific', name: 'Pacific (CA)', rate: 0.28 },
  { id: 'northwest', name: 'Pacific NW (WA, OR)', rate: 0.11 },
  { id: 'hawaii', name: 'Hawaii', rate: 0.42 },
  { id: 'custom', name: 'Custom Rate', rate: 0 },
];

// Common SEER ratings and efficiency tiers
// Source: DOE minimum standards, Energy Star specifications
const SEER_TIERS = [
  { seer: 10, label: 'Old (pre-2006)', tier: 'minimum' },
  { seer: 13, label: 'Old minimum (2006-2014)', tier: 'minimum' },
  { seer: 14, label: 'Previous minimum (2015-2022)', tier: 'minimum' },
  { seer: 15, label: 'Current minimum (2023+ North)', tier: 'standard' },
  { seer: 16, label: 'Standard efficiency', tier: 'standard' },
  { seer: 17, label: 'Energy Star minimum', tier: 'efficient' },
  { seer: 18, label: 'High efficiency', tier: 'efficient' },
  { seer: 20, label: 'Very high efficiency', tier: 'premium' },
  { seer: 22, label: 'Premium efficiency', tier: 'premium' },
  { seer: 25, label: 'Ultra high efficiency', tier: 'premium' },
];

// Annual cooling hours by climate
// Source: DOE, ASHRAE climate zone data
const COOLING_HOURS = [
  { id: 'light', name: 'Light use (North, PNW)', hours: 400, description: '~400 hours/year' },
  { id: 'moderate', name: 'Moderate (Midwest, Northeast)', hours: 800, description: '~800 hours/year' },
  { id: 'heavy', name: 'Heavy (Southeast, Southwest)', hours: 1200, description: '~1,200 hours/year' },
  { id: 'extreme', name: 'Extreme (FL, AZ, TX)', hours: 1800, description: '~1,800 hours/year' },
  { id: 'custom', name: 'Custom', hours: 0, description: 'Enter your own' },
];

interface SEERResults {
  currentAnnualCost: number;
  newAnnualCost: number;
  annualSavings: number;
  tenYearSavings: number;
  lifetimeSavings: number;
  energyReduction: number;
  co2Reduction: number;
  paybackYears: number | null;
  comparisonTable: Array<{
    seer: number;
    label: string;
    annualCost: number;
    savingsVsCurrent: number;
    savingsPercent: number;
  }>;
  seerExplanation: {
    currentEfficiency: string;
    newEfficiency: string;
    improvement: number;
  };
}

// Calculate SEER-based energy costs and savings
// Source: DOE, Energy Star SEER savings methodology
// Formula: Annual kWh = (BTU capacity × Cooling Hours) / (SEER × 1000)
// Or: Annual kWh = (Tons × 12000 × Hours) / (SEER × 1000)
function calculateSEERSavings(
  acTons: number,
  currentSEER: number,
  newSEER: number,
  electricityRate: number,
  annualCoolingHours: number,
  upgradeCoast: number
): SEERResults {
  const btuCapacity = acTons * 12000;

  // Calculate annual kWh for each SEER
  // Formula: kWh = (BTU × Hours) / (SEER × 1000)
  // Source: DOE SEER methodology
  const currentKwh = (btuCapacity * annualCoolingHours) / (currentSEER * 1000);
  const newKwh = (btuCapacity * annualCoolingHours) / (newSEER * 1000);

  // Calculate costs
  const currentAnnualCost = Math.round(currentKwh * electricityRate * 100) / 100;
  const newAnnualCost = Math.round(newKwh * electricityRate * 100) / 100;
  const annualSavings = Math.round((currentAnnualCost - newAnnualCost) * 100) / 100;

  // Long-term savings (typical AC lifespan: 15-20 years)
  const tenYearSavings = Math.round(annualSavings * 10);
  const lifetimeSavings = Math.round(annualSavings * 15); // 15 year lifespan

  // Energy reduction percentage
  const energyReduction = Math.round((1 - newKwh / currentKwh) * 100);

  // CO2 reduction (average 0.855 lbs CO2 per kWh in US)
  // Source: EPA eGRID
  const co2Reduction = Math.round((currentKwh - newKwh) * 0.855);

  // Simple payback period
  let paybackYears: number | null = null;
  if (upgradeCoast > 0 && annualSavings > 0) {
    paybackYears = Math.round((upgradeCoast / annualSavings) * 10) / 10;
  }

  // Generate comparison table
  const comparisonTable = SEER_TIERS.map((tier) => {
    const tierKwh = (btuCapacity * annualCoolingHours) / (tier.seer * 1000);
    const tierCost = Math.round(tierKwh * electricityRate * 100) / 100;
    const savingsVsCurrent = Math.round((currentAnnualCost - tierCost) * 100) / 100;
    const savingsPercent = Math.round((1 - tierKwh / currentKwh) * 100);

    return {
      seer: tier.seer,
      label: tier.label,
      annualCost: tierCost,
      savingsVsCurrent,
      savingsPercent,
    };
  });

  // SEER efficiency descriptions
  const getEfficiencyLabel = (seer: number): string => {
    if (seer <= 12) return 'Very low efficiency';
    if (seer <= 14) return 'Low efficiency (outdated)';
    if (seer <= 16) return 'Standard efficiency';
    if (seer <= 18) return 'High efficiency';
    if (seer <= 22) return 'Very high efficiency';
    return 'Ultra-premium efficiency';
  };

  const seerExplanation = {
    currentEfficiency: getEfficiencyLabel(currentSEER),
    newEfficiency: getEfficiencyLabel(newSEER),
    improvement: Math.round((newSEER / currentSEER - 1) * 100),
  };

  return {
    currentAnnualCost,
    newAnnualCost,
    annualSavings,
    tenYearSavings,
    lifetimeSavings,
    energyReduction,
    co2Reduction,
    paybackYears,
    comparisonTable,
    seerExplanation,
  };
}

export default function SEERRatingCalculator() {
  const [acTons, setAcTons] = useState(3);
  const [currentSEER, setCurrentSEER] = useState(13);
  const [newSEER, setNewSEER] = useState(18);
  const [rateRegion, setRateRegion] = useState('national');
  const [customRate, setCustomRate] = useState(0.16);
  const [coolingUsage, setCoolingUsage] = useState('moderate');
  const [customHours, setCustomHours] = useState(800);
  const [upgradeCost, setUpgradeCost] = useState(0);
  const [results, setResults] = useState<SEERResults | null>(null);

  const selectedRate = ELECTRICITY_RATES.find((r) => r.id === rateRegion);
  const effectiveRate = rateRegion === 'custom' ? customRate : selectedRate?.rate || 0.16;

  const selectedHours = COOLING_HOURS.find((h) => h.id === coolingUsage);
  const effectiveHours = coolingUsage === 'custom' ? customHours : selectedHours?.hours || 800;

  const handleCalculate = () => {
    const result = calculateSEERSavings(
      acTons,
      currentSEER,
      newSEER,
      effectiveRate,
      effectiveHours,
      upgradeCost
    );
    setResults(result);
  };

  return (
    <CalculatorWrapper
      title="SEER Rating Calculator"
      description="Calculate energy costs and savings when upgrading your AC based on SEER efficiency ratings. Compare costs across different SEER levels."
    >
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="space-y-4">
          <h3 className="font-semibold text-slate-800">AC System</h3>

          <CalculatorInput
            id="acTons"
            label="AC Size (tons)"
            type="number"
            value={acTons}
            onChange={(e) => setAcTons(parseFloat(e.target.value) || 0)}
            min={1}
            max={10}
            step={0.5}
            helpText="1 ton = 12,000 BTU/hr"
          />

          <CalculatorInput
            id="currentSEER"
            label="Current/Old SEER Rating"
            type="number"
            value={currentSEER}
            onChange={(e) => setCurrentSEER(parseFloat(e.target.value) || 0)}
            min={8}
            max={30}
            step={1}
            helpText="Check your outdoor unit label"
          />

          <CalculatorInput
            id="newSEER"
            label="New/Target SEER Rating"
            type="number"
            value={newSEER}
            onChange={(e) => setNewSEER(parseFloat(e.target.value) || 0)}
            min={14}
            max={30}
            step={1}
          />

          <CalculatorInput
            id="upgradeCost"
            label="Upgrade Cost (optional, for payback)"
            type="number"
            value={upgradeCost}
            onChange={(e) => setUpgradeCost(parseFloat(e.target.value) || 0)}
            min={0}
            max={50000}
            helpText="Total cost of new system installation"
          />
        </div>

        <div className="space-y-4">
          <h3 className="font-semibold text-slate-800">Energy Costs & Usage</h3>

          <CalculatorInput
            id="rateRegion"
            label="Electricity Rate Region"
            type="select"
            value={rateRegion}
            onChange={(e) => setRateRegion(e.target.value)}
            options={ELECTRICITY_RATES.map((r) => ({
              value: r.id,
              label: r.id === 'custom' ? r.name : `${r.name} ($${r.rate}/kWh)`,
            }))}
          />

          {rateRegion === 'custom' && (
            <CalculatorInput
              id="customRate"
              label="Custom Electricity Rate ($/kWh)"
              type="number"
              value={customRate}
              onChange={(e) => setCustomRate(parseFloat(e.target.value) || 0)}
              min={0.05}
              max={1}
              step={0.01}
            />
          )}

          <CalculatorInput
            id="coolingUsage"
            label="Annual Cooling Usage"
            type="select"
            value={coolingUsage}
            onChange={(e) => setCoolingUsage(e.target.value)}
            options={COOLING_HOURS.map((h) => ({
              value: h.id,
              label: `${h.name}${h.description ? ` - ${h.description}` : ''}`,
            }))}
          />

          {coolingUsage === 'custom' && (
            <CalculatorInput
              id="customHours"
              label="Custom Cooling Hours/Year"
              type="number"
              value={customHours}
              onChange={(e) => setCustomHours(parseInt(e.target.value) || 0)}
              min={100}
              max={3000}
            />
          )}
        </div>
      </div>

      <button
        onClick={handleCalculate}
        className="w-full mt-6 px-6 py-3 bg-orange-600 text-white font-semibold rounded-lg hover:bg-orange-700 transition-colors"
      >
        Calculate Savings
      </button>

      <ResultsContainer show={!!results} variant="margin">
        {results && (
          <>
          <SEERRatingSVG
            seerRating={newSEER}
            annualCost={results.newAnnualCost}
            savingsVsOld={results.annualSavings}
            oldSEER={currentSEER}
          />
          <ResultsGrid>
            <CalculatorResult
              label="Annual Savings"
              value={`$${results.annualSavings}`}
              primary
              subtitle={`${results.energyReduction}% energy reduction`}
            />
            <CalculatorResult
              label="Current Annual Cost"
              value={`$${results.currentAnnualCost}`}
              subtitle={`SEER ${currentSEER}`}
            />
            <CalculatorResult
              label="New Annual Cost"
              value={`$${results.newAnnualCost}`}
              subtitle={`SEER ${newSEER}`}
            />
            <CalculatorResult
              label="10-Year Savings"
              value={`$${results.tenYearSavings.toLocaleString()}`}
              subtitle="Estimated cumulative"
            />
          </ResultsGrid>

          {/* Savings Summary */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="bg-green-50 border border-green-200 rounded-lg p-4">
              <h4 className="font-semibold text-green-800">Lifetime Savings</h4>
              <p className="text-2xl font-bold text-green-900 mt-1">
                ${results.lifetimeSavings.toLocaleString()}
              </p>
              <p className="text-sm text-green-600">Over 15-year lifespan</p>
            </div>
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
              <h4 className="font-semibold text-blue-800">CO2 Reduction</h4>
              <p className="text-2xl font-bold text-blue-900 mt-1">
                {results.co2Reduction.toLocaleString()} lbs/yr
              </p>
              <p className="text-sm text-blue-600">Lower carbon footprint</p>
            </div>
            {results.paybackYears !== null && (
              <div className="bg-amber-50 border border-amber-200 rounded-lg p-4">
                <h4 className="font-semibold text-amber-800">Simple Payback</h4>
                <p className="text-2xl font-bold text-amber-900 mt-1">
                  {results.paybackYears} years
                </p>
                <p className="text-sm text-amber-600">Time to recover upgrade cost</p>
              </div>
            )}
          </div>

          {/* Efficiency Comparison */}
          <div className="bg-slate-50 border border-slate-200 rounded-lg p-4">
            <h3 className="font-semibold text-slate-800 mb-3">Efficiency Comparison</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <p className="text-sm text-slate-600">Current System (SEER {currentSEER})</p>
                <p className="font-semibold text-slate-800">{results.seerExplanation.currentEfficiency}</p>
              </div>
              <div>
                <p className="text-sm text-slate-600">New System (SEER {newSEER})</p>
                <p className="font-semibold text-slate-800">{results.seerExplanation.newEfficiency}</p>
              </div>
            </div>
            <p className="mt-3 text-sm text-slate-700">
              Upgrading from SEER {currentSEER} to SEER {newSEER} is a{' '}
              <strong>{results.seerExplanation.improvement}% efficiency improvement</strong>.
            </p>
          </div>

          {/* SEER Comparison Table */}
          <div>
            <h3 className="font-semibold text-slate-800 mb-3">All SEER Levels Compared</h3>
            <ResultsTable
              headers={['SEER', 'Description', 'Annual Cost', 'Savings vs Current', '% Savings']}
              rows={results.comparisonTable.map((row) => [
                row.seer.toString(),
                row.label,
                `$${row.annualCost}`,
                row.savingsVsCurrent > 0 ? `$${row.savingsVsCurrent}` : '—',
                row.savingsPercent > 0 ? `${row.savingsPercent}%` : '—',
              ])}
            />
          </div>

          {/* SEER vs SEER2 Explanation */}
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
            <h3 className="font-semibold text-blue-800 mb-2">SEER vs SEER2</h3>
            <p className="text-sm text-blue-900">
              <strong>SEER2</strong> is the updated testing standard effective January 2023. SEER2
              values are typically 4-5% lower than SEER for the same equipment because testing
              conditions more closely match real-world installation with external static pressure.
            </p>
            <p className="text-sm text-blue-900 mt-2">
              <strong>Conversion:</strong> SEER2 ≈ SEER × 0.95. A SEER 16 unit would be rated
              approximately SEER2 15.2.
            </p>
          </div>

          {/* Formula explanation */}
          <div className="text-sm text-slate-600 bg-slate-50 p-4 rounded-lg">
            <h4 className="font-semibold mb-2">How SEER Affects Energy Use</h4>
            <p>
              <strong>SEER (Seasonal Energy Efficiency Ratio)</strong> = Total cooling output
              (BTU) ÷ Total electrical input (Wh) over a typical cooling season.
            </p>
            <p className="mt-2">
              <strong>Annual kWh</strong> = (BTU Capacity × Cooling Hours) ÷ (SEER × 1000)
            </p>
            <p className="mt-2">
              Higher SEER = less electricity used for the same cooling. Doubling your SEER
              rating cuts energy use in half.
            </p>
            <p className="mt-1">
              <strong>Sources:</strong> DOE 10 CFR 430 (SEER methodology), Energy Star, AHRI
            </p>
          </div>
          </>
        )}
      </ResultsContainer>
    </CalculatorWrapper>
  );
}
