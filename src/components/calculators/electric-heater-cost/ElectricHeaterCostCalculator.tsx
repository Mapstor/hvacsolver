'use client';

import { useState, useCallback, useMemo } from 'react';
import CalculatorWrapper from '../CalculatorWrapper';
import CalculatorInput from '../CalculatorInput';
import {
  CalculatorResult,
  ResultsGrid,
  ResultsTable,
} from '../CalculatorResult';
import ResultsContainer from '../ResultsContainer';
import ElectricHeaterCostSVG from './ElectricHeaterCostSVG';

interface Inputs {
  wattage: number;
  hoursPerDay: number;
  electricityRate: number;
}

interface Results {
  costPerHour: number;
  costPerDay: number;
  costPerMonth: number;
  costPerYear: number;
  costPerWinter: number;
  kWhPerHour: number;
  kWhPerMonth: number;
  costRating: 'good' | 'warning' | 'bad';
  comparedToLED: number;
  comparedToFridge: number;
  percentOfAverageBill: number;
}

const WATTAGE_PRESETS = [
  { value: '750', label: '750W (Small heater)' },
  { value: '1000', label: '1,000W (Medium heater)' },
  { value: '1500', label: '1,500W (Standard heater)' },
  { value: '2000', label: '2,000W (Large heater)' },
  { value: 'custom', label: 'Custom wattage' },
];

// US National average electricity rate as of 2024
const DEFAULT_RATE = 0.1648;

function calculate(inputs: Inputs): Results {
  // Formula: Cost = (Wattage ÷ 1,000) × Hours × Rate
  // Source: Basic electrical power calculation (P = W × t × rate)
  const { wattage, hoursPerDay, electricityRate } = inputs;

  const kWhPerHour = wattage / 1000;
  const costPerHour = kWhPerHour * electricityRate;
  const costPerDay = costPerHour * hoursPerDay;
  const costPerMonth = costPerDay * 30; // 30 days
  const costPerYear = costPerMonth * 12;
  const costPerWinter = costPerMonth * 5; // 5-month heating season
  const kWhPerMonth = kWhPerHour * hoursPerDay * 30;

  // Contextual comparisons
  // LED bulb: ~10W average, running same hours
  // Source: DOE - typical LED bulb uses 8-12W
  const ledWattage = 10;
  const comparedToLED = Math.round(wattage / ledWattage);

  // Refrigerator: ~150 kWh/month average (runs 24/7)
  // Source: Energy Star - average refrigerator uses 100-200 kWh/year
  const avgFridgeKWhMonth = 150;
  const comparedToFridge = parseFloat((kWhPerMonth / avgFridgeKWhMonth).toFixed(1));

  // Average US electricity bill: ~$137/month (EIA 2024 data)
  // Source: US Energy Information Administration
  const avgMonthlyBill = 137;
  const percentOfAverageBill = Math.round((costPerMonth / avgMonthlyBill) * 100);

  // Cost rating based on monthly cost
  // Good: < $30/month, Warning: $30-75/month, Bad: > $75/month
  let costRating: 'good' | 'warning' | 'bad';
  if (costPerMonth < 30) {
    costRating = 'good';
  } else if (costPerMonth < 75) {
    costRating = 'warning';
  } else {
    costRating = 'bad';
  }

  return {
    costPerHour,
    costPerDay,
    costPerMonth,
    costPerYear,
    costPerWinter,
    kWhPerHour,
    kWhPerMonth,
    costRating,
    comparedToLED,
    comparedToFridge,
    percentOfAverageBill,
  };
}

export default function ElectricHeaterCostCalculator() {
  const [wattagePreset, setWattagePreset] = useState('1500');
  const [customWattage, setCustomWattage] = useState(1500);
  const [inputs, setInputs] = useState<Inputs>({
    wattage: 1500,
    hoursPerDay: 8,
    electricityRate: DEFAULT_RATE,
  });
  const [results, setResults] = useState<Results | null>(null);

  const handleWattagePresetChange = useCallback(
    (e: React.ChangeEvent<HTMLSelectElement>) => {
      const value = e.target.value;
      setWattagePreset(value);
      if (value !== 'custom') {
        const wattage = parseInt(value, 10);
        setInputs((prev) => ({ ...prev, wattage }));
        setCustomWattage(wattage);
      }
    },
    []
  );

  const handleCustomWattageChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const wattage = parseFloat(e.target.value) || 0;
      setCustomWattage(wattage);
      setInputs((prev) => ({ ...prev, wattage }));
    },
    []
  );

  const handleInputChange = useCallback(
    (field: keyof Inputs) => (e: React.ChangeEvent<HTMLInputElement>) => {
      const value = parseFloat(e.target.value) || 0;
      setInputs((prev) => ({ ...prev, [field]: value }));
    },
    []
  );

  const handleCalculate = useCallback(() => {
    if (inputs.wattage > 0 && inputs.hoursPerDay > 0 && inputs.electricityRate > 0) {
      setResults(calculate(inputs));
    }
  }, [inputs]);

  const formatCurrency = (value: number) => {
    return `$${value.toFixed(2)}`;
  };

  return (
    <CalculatorWrapper
      title="Electric Heater Running Cost Calculator"
      description="Calculate the hourly, daily, monthly, and seasonal cost of running an electric space heater."
    >
      <div className="space-y-6">
        {/* Inputs */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <CalculatorInput
            type="select"
            id="wattagePreset"
            label="Heater Wattage"
            value={wattagePreset}
            onChange={handleWattagePresetChange}
            options={WATTAGE_PRESETS}
          />

          {wattagePreset === 'custom' && (
            <CalculatorInput
              type="number"
              id="customWattage"
              label="Custom Wattage"
              unit="W"
              value={customWattage}
              onChange={handleCustomWattageChange}
              min={0}
              max={10000}
              step={100}
            />
          )}

          <CalculatorInput
            type="number"
            id="hoursPerDay"
            label="Hours Used Per Day"
            unit="hours"
            value={inputs.hoursPerDay}
            onChange={handleInputChange('hoursPerDay')}
            min={0}
            max={24}
            step={0.5}
          />

          <CalculatorInput
            type="number"
            id="electricityRate"
            label="Electricity Rate"
            unit="$/kWh"
            value={inputs.electricityRate}
            onChange={handleInputChange('electricityRate')}
            min={0}
            step={0.01}
            helpText={`US average: $${DEFAULT_RATE}/kWh`}
          />
        </div>

        {/* Calculate Button */}
        <button
          onClick={handleCalculate}
          className="w-full sm:w-auto px-6 py-3 bg-[#c2410c] hover:bg-[#9a3412] text-white font-semibold rounded-md transition-colors"
        >
          Calculate Cost
        </button>

        {/* Results */}
        <ResultsContainer show={!!results}>
          {results && (
            <>
            {/* SVG Visualization */}
            <ElectricHeaterCostSVG
              wattage={inputs.wattage}
              hoursPerDay={inputs.hoursPerDay}
              electricityRate={inputs.electricityRate}
              dailyCost={results.costPerDay}
              monthlyCost={results.costPerMonth}
              annualCost={results.costPerYear}
            />

            {/* Primary Result with Rating */}
            <div className={`rounded-lg p-4 ${
              results.costRating === 'good' ? 'bg-green-50 border border-green-200' :
              results.costRating === 'warning' ? 'bg-amber-50 border border-amber-200' :
              'bg-red-50 border border-red-200'
            }`}>
              <CalculatorResult
                label="Monthly Cost (30 days)"
                value={formatCurrency(results.costPerMonth)}
                primary
                highlight={results.costRating}
              />
              <p className={`text-sm mt-2 ${
                results.costRating === 'good' ? 'text-green-700' :
                results.costRating === 'warning' ? 'text-amber-700' :
                'text-red-700'
              }`}>
                {results.costRating === 'good' && '✓ Relatively affordable heating cost'}
                {results.costRating === 'warning' && '⚠ Moderate heating cost — consider supplemental heating'}
                {results.costRating === 'bad' && '⚠ High heating cost — space heaters are expensive for extended use'}
              </p>
            </div>

            {/* Cost Breakdown */}
            <ResultsGrid columns={2}>
              <CalculatorResult
                label="Cost Per Hour"
                value={formatCurrency(results.costPerHour)}
              />
              <CalculatorResult
                label="Cost Per Day"
                value={formatCurrency(results.costPerDay)}
              />
              <CalculatorResult
                label="5-Month Winter Season"
                value={formatCurrency(results.costPerWinter)}
              />
              <CalculatorResult
                label="Annual Cost (12 months)"
                value={formatCurrency(results.costPerYear)}
              />
            </ResultsGrid>

            {/* Energy Use */}
            <div className="bg-slate-50 rounded-lg p-4">
              <h4 className="font-semibold text-slate-950 mb-3">
                Energy Consumption
              </h4>
              <ResultsGrid columns={2}>
                <CalculatorResult
                  label="Power Draw"
                  value={results.kWhPerHour.toFixed(2)}
                  unit="kW"
                />
                <CalculatorResult
                  label="Monthly Energy"
                  value={results.kWhPerMonth.toFixed(0)}
                  unit="kWh"
                />
              </ResultsGrid>
            </div>

            {/* Contextual Comparisons */}
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
              <h4 className="font-semibold text-slate-950 mb-3">
                What This Means
              </h4>
              <div className="space-y-2 text-sm text-slate-700">
                <p>
                  <span className="font-medium">💡 Equivalent to:</span> Running{' '}
                  <span className="font-semibold text-slate-950">{results.comparedToLED} LED bulbs</span> for the same hours
                </p>
                <p>
                  <span className="font-medium">🧊 Refrigerator comparison:</span> Uses{' '}
                  <span className="font-semibold text-slate-950">{results.comparedToFridge}x</span> more energy than an average fridge
                </p>
                <p>
                  <span className="font-medium">📊 Bill impact:</span> Adds{' '}
                  <span className="font-semibold text-slate-950">{results.percentOfAverageBill}%</span> to the average US electricity bill
                </p>
              </div>
            </div>

            {/* Detailed Table */}
            <div className="bg-slate-50 rounded-lg p-4">
              <h4 className="font-semibold text-slate-950 mb-3">
                Calculation Details
              </h4>
              <ResultsTable
                rows={[
                  {
                    label: 'Heater wattage',
                    value: inputs.wattage.toLocaleString(),
                    unit: 'W',
                  },
                  {
                    label: 'Power consumption',
                    value: results.kWhPerHour.toFixed(2),
                    unit: 'kWh/hr',
                  },
                  {
                    label: 'Daily usage',
                    value: inputs.hoursPerDay,
                    unit: 'hours',
                  },
                  {
                    label: 'Electricity rate',
                    value: `$${inputs.electricityRate.toFixed(4)}`,
                    unit: '/kWh',
                  },
                  {
                    label: 'Daily energy use',
                    value: (results.kWhPerHour * inputs.hoursPerDay).toFixed(1),
                    unit: 'kWh',
                  },
                ]}
              />
            </div>

            {/* Formula Note */}
            <p className="text-xs text-slate-500">
              Formula: Cost = (Wattage ÷ 1,000) × Hours × Electricity Rate.
              Sources: DOE LED wattage data, Energy Star refrigerator consumption, EIA average electricity bill.
            </p>
            </>
          )}
        </ResultsContainer>
      </div>
    </CalculatorWrapper>
  );
}
