'use client';

import { useState } from 'react';
import CalculatorWrapper from '../CalculatorWrapper';
import CalculatorInput from '../CalculatorInput';
import { CalculatorResult, ResultsGrid, ResultsTable } from '../CalculatorResult';
import ResultsContainer from '../ResultsContainer';
import HeatingCostSVG from './HeatingCostSVG';

// Fuel types with their heat content and typical efficiency ranges
// Source: EIA - Energy Information Administration
// https://www.eia.gov/energyexplained/units-and-calculators/
interface FuelType {
  id: string;
  name: string;
  unit: string;
  btuPerUnit: number;
  defaultEfficiency: number;
  efficiencyRange: { min: number; max: number };
  defaultPrice: number;
  priceUnit: string;
}

const fuelTypes: FuelType[] = [
  {
    id: 'natural_gas',
    name: 'Natural Gas',
    unit: 'therm',
    btuPerUnit: 100000, // 1 therm = 100,000 BTU
    defaultEfficiency: 92,
    efficiencyRange: { min: 80, max: 98 },
    defaultPrice: 1.50,
    priceUnit: '$/therm',
  },
  {
    id: 'propane',
    name: 'Propane (LP Gas)',
    unit: 'gallon',
    btuPerUnit: 91500, // BTU per gallon
    defaultEfficiency: 90,
    efficiencyRange: { min: 80, max: 96 },
    defaultPrice: 2.75,
    priceUnit: '$/gallon',
  },
  {
    id: 'heating_oil',
    name: 'Heating Oil (#2)',
    unit: 'gallon',
    btuPerUnit: 138500, // BTU per gallon
    defaultEfficiency: 85,
    efficiencyRange: { min: 78, max: 95 },
    defaultPrice: 3.50,
    priceUnit: '$/gallon',
  },
  {
    id: 'electricity',
    name: 'Electricity (Resistance)',
    unit: 'kWh',
    btuPerUnit: 3412, // BTU per kWh
    defaultEfficiency: 100, // Electric resistance is 100% efficient
    efficiencyRange: { min: 100, max: 100 },
    defaultPrice: 0.15,
    priceUnit: '$/kWh',
  },
  {
    id: 'heat_pump',
    name: 'Heat Pump (Electric)',
    unit: 'kWh',
    btuPerUnit: 3412, // BTU per kWh, but COP multiplies effective output
    defaultEfficiency: 250, // COP of 2.5 = 250% effective efficiency
    efficiencyRange: { min: 150, max: 400 }, // COP 1.5 to 4.0
    defaultPrice: 0.15,
    priceUnit: '$/kWh',
  },
  {
    id: 'wood_pellets',
    name: 'Wood Pellets',
    unit: 'ton',
    btuPerUnit: 16500000, // BTU per ton (approximately)
    defaultEfficiency: 80,
    efficiencyRange: { min: 70, max: 90 },
    defaultPrice: 280,
    priceUnit: '$/ton',
  },
  {
    id: 'cordwood',
    name: 'Cordwood (Hardwood)',
    unit: 'cord',
    btuPerUnit: 24000000, // BTU per cord (dry hardwood average)
    defaultEfficiency: 70,
    efficiencyRange: { min: 50, max: 85 },
    defaultPrice: 300,
    priceUnit: '$/cord',
  },
];

interface FuelInput {
  enabled: boolean;
  efficiency: number;
  price: number;
}

interface FuelResult {
  fuelType: FuelType;
  costPerMillionBtu: number;
  annualCost: number;
  annualUnitsNeeded: number;
  monthlyCost: number;
  rank: number;
}

interface CalculationResult {
  heatingNeed: number; // BTU per year
  results: FuelResult[];
  cheapestFuel: FuelResult;
  mostExpensiveFuel: FuelResult;
}

function calculateHeatingCosts(
  heatingNeedBtu: number,
  fuelInputs: Record<string, FuelInput>
): CalculationResult {
  // Formula: Cost per million BTU = (Price per unit / BTU per unit) × 1,000,000 / (Efficiency / 100)
  // Source: EIA Heating Fuel Comparison Methodology

  const results: FuelResult[] = [];

  for (const fuel of fuelTypes) {
    const input = fuelInputs[fuel.id];
    if (!input?.enabled) continue;

    const efficiency = input.efficiency / 100;
    const effectiveBtuPerUnit = fuel.btuPerUnit * efficiency;

    // Cost per million BTU delivered
    // Formula: (Price / BTU per unit) × 1,000,000 / efficiency
    const costPerMillionBtu = (input.price / fuel.btuPerUnit) * 1000000 / efficiency;

    // Annual units needed = Annual BTU need / Effective BTU per unit
    const annualUnitsNeeded = heatingNeedBtu / effectiveBtuPerUnit;

    // Annual cost
    const annualCost = annualUnitsNeeded * input.price;

    results.push({
      fuelType: fuel,
      costPerMillionBtu: Math.round(costPerMillionBtu * 100) / 100,
      annualCost: Math.round(annualCost * 100) / 100,
      annualUnitsNeeded: Math.round(annualUnitsNeeded * 100) / 100,
      monthlyCost: Math.round((annualCost / 12) * 100) / 100,
      rank: 0,
    });
  }

  // Sort by cost per million BTU and assign ranks
  results.sort((a, b) => a.costPerMillionBtu - b.costPerMillionBtu);
  results.forEach((r, i) => (r.rank = i + 1));

  return {
    heatingNeed: heatingNeedBtu,
    results,
    cheapestFuel: results[0],
    mostExpensiveFuel: results[results.length - 1],
  };
}

export default function HeatingCostCalculator() {
  // Heating need estimation inputs
  const [squareFootage, setSquareFootage] = useState<number>(2000);
  const [heatingDegreesDays, setHeatingDegreeDays] = useState<number>(5000);
  const [customBtu, setCustomBtu] = useState<string>('');
  const [useCustomBtu, setUseCustomBtu] = useState<boolean>(false);

  // Fuel inputs
  const [fuelInputs, setFuelInputs] = useState<Record<string, FuelInput>>(() => {
    const initial: Record<string, FuelInput> = {};
    for (const fuel of fuelTypes) {
      initial[fuel.id] = {
        enabled: ['natural_gas', 'propane', 'electricity', 'heat_pump'].includes(fuel.id),
        efficiency: fuel.defaultEfficiency,
        price: fuel.defaultPrice,
      };
    }
    return initial;
  });

  const [result, setResult] = useState<CalculationResult | null>(null);

  const updateFuelInput = (fuelId: string, field: keyof FuelInput, value: number | boolean) => {
    setFuelInputs((prev) => ({
      ...prev,
      [fuelId]: {
        ...prev[fuelId],
        [field]: value,
      },
    }));
  };

  const handleCalculate = () => {
    // Estimate annual heating BTU if not using custom
    // Formula: BTU = Square footage × HDD × Heat Loss Factor
    // Heat loss factor typically 15-30 BTU/sq.ft/HDD, using 20 as average
    // Source: ASHRAE Handbook of Fundamentals - Residential Load Calculation
    const heatingLoadFactor = 20; // BTU per sq.ft per HDD

    let heatingNeed: number;
    if (useCustomBtu && customBtu) {
      heatingNeed = parseFloat(customBtu);
    } else {
      heatingNeed = squareFootage * heatingDegreesDays * heatingLoadFactor;
    }

    if (isNaN(heatingNeed) || heatingNeed <= 0) return;

    const enabledCount = Object.values(fuelInputs).filter((f) => f.enabled).length;
    if (enabledCount === 0) return;

    const calculated = calculateHeatingCosts(heatingNeed, fuelInputs);
    setResult(calculated);
  };

  // Heating Degree Days reference values by region
  const hddReference = [
    { region: 'Miami, FL', hdd: 200 },
    { region: 'Houston, TX', hdd: 1500 },
    { region: 'Atlanta, GA', hdd: 2800 },
    { region: 'Baltimore, MD', hdd: 4600 },
    { region: 'Boston, MA', hdd: 5600 },
    { region: 'Chicago, IL', hdd: 6300 },
    { region: 'Minneapolis, MN', hdd: 7900 },
    { region: 'Fairbanks, AK', hdd: 13900 },
  ];

  return (
    <CalculatorWrapper
      title="Heating Cost Calculator"
      description="Compare heating costs across different fuel types including natural gas, propane, heating oil, electricity, heat pumps, and wood. Find the most economical heating option for your home."
    >
      <div className="space-y-6">
        {/* Heating Need Estimation */}
        <div className="border-b border-slate-200 pb-6">
          <h3 className="text-lg font-semibold text-slate-900 mb-4">
            Annual Heating Need
          </h3>

          <div className="flex items-center gap-4 mb-4">
            <label className="flex items-center gap-2">
              <input
                type="radio"
                checked={!useCustomBtu}
                onChange={() => setUseCustomBtu(false)}
                className="text-[#c2410c]"
              />
              <span className="text-sm text-slate-700">Estimate from home size</span>
            </label>
            <label className="flex items-center gap-2">
              <input
                type="radio"
                checked={useCustomBtu}
                onChange={() => setUseCustomBtu(true)}
                className="text-[#c2410c]"
              />
              <span className="text-sm text-slate-700">Enter annual BTU directly</span>
            </label>
          </div>

          {!useCustomBtu ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <CalculatorInput
                type="number"
                id="squareFootage"
                label="Home Size"
                value={squareFootage}
                onChange={(e) => setSquareFootage(parseFloat(e.target.value) || 0)}
                unit="sq ft"
                min={100}
                max={50000}
                step={100}
              />
              <div>
                <CalculatorInput
                  type="number"
                  id="heatingDegreeDays"
                  label="Heating Degree Days (HDD)"
                  value={heatingDegreesDays}
                  onChange={(e) => setHeatingDegreeDays(parseFloat(e.target.value) || 0)}
                  unit="HDD"
                  min={0}
                  max={20000}
                  step={100}
                />
                <details className="mt-2">
                  <summary className="text-xs text-slate-500 cursor-pointer hover:text-slate-700">
                    HDD reference by region
                  </summary>
                  <div className="mt-2 text-xs text-slate-600 space-y-1">
                    {hddReference.map((ref) => (
                      <div key={ref.region} className="flex justify-between">
                        <span>{ref.region}</span>
                        <span className="font-mono">{ref.hdd.toLocaleString()}</span>
                      </div>
                    ))}
                  </div>
                </details>
              </div>
            </div>
          ) : (
            <CalculatorInput
              type="number"
              id="customBtu"
              label="Annual Heating BTU Required"
              value={customBtu ? parseFloat(customBtu) : 0}
              onChange={(e) => setCustomBtu(e.target.value)}
              unit="BTU/year"
              min={0}
              max={500000000}
              step={1000000}
            />
          )}

          {!useCustomBtu && (
            <div className="mt-3 text-sm text-slate-600">
              Estimated annual heating need:{' '}
              <span className="font-semibold">
                {(squareFootage * heatingDegreesDays * 20).toLocaleString()} BTU
              </span>{' '}
              ({((squareFootage * heatingDegreesDays * 20) / 1000000).toFixed(1)} million BTU)
            </div>
          )}
        </div>

        {/* Fuel Type Selection and Pricing */}
        <div>
          <h3 className="text-lg font-semibold text-slate-900 mb-4">
            Fuel Types & Prices
          </h3>
          <p className="text-sm text-slate-600 mb-4">
            Select fuels to compare and enter your local prices. Default prices are national averages.
          </p>

          <div className="space-y-4">
            {fuelTypes.map((fuel) => (
              <div
                key={fuel.id}
                className={`border rounded-lg p-4 transition-colors ${
                  fuelInputs[fuel.id].enabled
                    ? 'border-[#c2410c] bg-orange-50/50'
                    : 'border-slate-200 bg-slate-50'
                }`}
              >
                <div className="flex items-start gap-3">
                  <input
                    type="checkbox"
                    checked={fuelInputs[fuel.id].enabled}
                    onChange={(e) =>
                      updateFuelInput(fuel.id, 'enabled', e.target.checked)
                    }
                    className="mt-1 h-4 w-4 text-[#c2410c] rounded"
                  />
                  <div className="flex-1">
                    <div className="flex items-center justify-between">
                      <span className="font-medium text-slate-900">{fuel.name}</span>
                      <span className="text-xs text-slate-500">
                        {fuel.btuPerUnit.toLocaleString()} BTU/{fuel.unit}
                      </span>
                    </div>

                    {fuelInputs[fuel.id].enabled && (
                      <div className="grid grid-cols-2 gap-4 mt-3">
                        <div>
                          <label className="block text-xs text-slate-600 mb-1">
                            Price ({fuel.priceUnit})
                          </label>
                          <input
                            type="number"
                            value={fuelInputs[fuel.id].price}
                            onChange={(e) =>
                              updateFuelInput(fuel.id, 'price', parseFloat(e.target.value) || 0)
                            }
                            step={0.01}
                            min={0}
                            className="w-full px-3 py-2 border border-slate-300 rounded-md text-sm"
                          />
                        </div>
                        <div>
                          <label className="block text-xs text-slate-600 mb-1">
                            Efficiency (%)
                            {fuel.id === 'heat_pump' && (
                              <span className="text-slate-400 ml-1">(COP × 100)</span>
                            )}
                          </label>
                          <input
                            type="number"
                            value={fuelInputs[fuel.id].efficiency}
                            onChange={(e) =>
                              updateFuelInput(
                                fuel.id,
                                'efficiency',
                                parseFloat(e.target.value) || fuel.defaultEfficiency
                              )
                            }
                            min={fuel.efficiencyRange.min}
                            max={fuel.efficiencyRange.max}
                            className="w-full px-3 py-2 border border-slate-300 rounded-md text-sm"
                          />
                          <div className="text-xs text-slate-400 mt-1">
                            Range: {fuel.efficiencyRange.min}% - {fuel.efficiencyRange.max}%
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Calculate Button */}
        <button
          onClick={handleCalculate}
          className="w-full sm:w-auto px-8 py-3 bg-[#c2410c] text-white font-semibold rounded-lg hover:bg-[#9a3409] transition-colors"
        >
          Compare Heating Costs
        </button>

        {/* Results */}
        <ResultsContainer show={!!result && result.results.length > 0}>
          {result && (
            <>
            <HeatingCostSVG
              fuelType={result.cheapestFuel.fuelType.name}
              btuRequired={result.heatingNeed}
              efficiency={fuelInputs[result.cheapestFuel.fuelType.id].efficiency}
              fuelPrice={fuelInputs[result.cheapestFuel.fuelType.id].price}
              monthlyCost={result.cheapestFuel.monthlyCost}
              annualCost={result.cheapestFuel.annualCost}
              fuelUsage={result.cheapestFuel.annualUnitsNeeded / 12}
              fuelUnit={result.cheapestFuel.fuelType.unit}
            />

            <div>
              <h3 className="text-lg font-semibold text-slate-900 mb-2">
                Cost Comparison Results
              </h3>
              <p className="text-sm text-slate-600">
                Based on {(result.heatingNeed / 1000000).toFixed(1)} million BTU annual heating need
              </p>
            </div>

            {/* Winner highlight */}
            <div className="bg-green-50 border border-green-200 rounded-lg p-4">
              <div className="flex items-center gap-2 mb-2">
                <span className="text-green-700 font-semibold text-lg">
                  Most Economical: {result.cheapestFuel.fuelType.name}
                </span>
              </div>
              <ResultsGrid columns={3}>
                <CalculatorResult
                  label="Cost per Million BTU"
                  value={`$${result.cheapestFuel.costPerMillionBtu.toFixed(2)}`}
                  primary
                />
                <CalculatorResult
                  label="Estimated Annual Cost"
                  value={`$${result.cheapestFuel.annualCost.toLocaleString()}`}
                />
                <CalculatorResult
                  label="Monthly Average"
                  value={`$${result.cheapestFuel.monthlyCost.toFixed(2)}`}
                />
              </ResultsGrid>
            </div>

            {/* Comparison table */}
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="bg-[#1e3a5f] text-white">
                    <th className="py-3 px-4 text-left font-semibold">Rank</th>
                    <th className="py-3 px-4 text-left font-semibold">Fuel Type</th>
                    <th className="py-3 px-4 text-right font-semibold">$/Million BTU</th>
                    <th className="py-3 px-4 text-right font-semibold">Annual Cost</th>
                    <th className="py-3 px-4 text-right font-semibold">Monthly Cost</th>
                    <th className="py-3 px-4 text-right font-semibold">Units/Year</th>
                  </tr>
                </thead>
                <tbody>
                  {result.results.map((r, index) => (
                    <tr
                      key={r.fuelType.id}
                      className={`${
                        index % 2 === 0 ? 'bg-white' : 'bg-slate-50'
                      } ${r.rank === 1 ? 'bg-green-50' : ''}`}
                    >
                      <td className="py-3 px-4">
                        <span
                          className={`inline-flex items-center justify-center w-6 h-6 rounded-full text-xs font-bold ${
                            r.rank === 1
                              ? 'bg-green-600 text-white'
                              : r.rank === result.results.length
                              ? 'bg-red-100 text-red-700'
                              : 'bg-slate-200 text-slate-700'
                          }`}
                        >
                          {r.rank}
                        </span>
                      </td>
                      <td className="py-3 px-4 font-medium text-slate-900">
                        {r.fuelType.name}
                      </td>
                      <td className="py-3 px-4 text-right font-mono">
                        ${r.costPerMillionBtu.toFixed(2)}
                      </td>
                      <td className="py-3 px-4 text-right font-mono font-semibold">
                        ${r.annualCost.toLocaleString()}
                      </td>
                      <td className="py-3 px-4 text-right font-mono">
                        ${r.monthlyCost.toFixed(2)}
                      </td>
                      <td className="py-3 px-4 text-right font-mono text-slate-600">
                        {r.annualUnitsNeeded.toLocaleString()} {r.fuelType.unit}s
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Savings comparison */}
            {result.results.length > 1 && (
              <div className="bg-slate-50 border border-slate-200 rounded-lg p-4">
                <h4 className="font-semibold text-slate-900 mb-3">Potential Savings</h4>
                <ResultsTable
                  rows={result.results.slice(1).map((r) => ({
                    label: `Switching from ${r.fuelType.name} to ${result.cheapestFuel.fuelType.name}`,
                    value: Math.round(r.annualCost - result.cheapestFuel.annualCost),
                    unit: '/year',
                    highlight:
                      r.annualCost - result.cheapestFuel.annualCost > 500
                        ? 'good'
                        : r.annualCost - result.cheapestFuel.annualCost > 100
                        ? 'warning'
                        : undefined,
                  }))}
                />
              </div>
            )}

            {/* Methodology note */}
            <div className="text-xs text-slate-500 border-t border-slate-200 pt-4">
              <p className="font-medium mb-1">Methodology:</p>
              <p>
                Cost per million BTU = (Fuel price ÷ BTU content) × 1,000,000 ÷ Equipment efficiency.
                Annual cost = (Annual BTU need ÷ BTU per unit ÷ Efficiency) × Price per unit.
                Heating BTU estimated using 20 BTU/sq.ft/HDD based on ASHRAE residential load methodology.
              </p>
            </div>
            </>
          )}
        </ResultsContainer>
      </div>
    </CalculatorWrapper>
  );
}
