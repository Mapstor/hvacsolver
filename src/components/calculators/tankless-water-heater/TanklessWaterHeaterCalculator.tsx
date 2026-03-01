'use client';

import { useState } from 'react';
import CalculatorWrapper from '../CalculatorWrapper';
import CalculatorInput from '../CalculatorInput';
import { CalculatorResult, ResultsGrid, ResultsTable } from '../CalculatorResult';
import ResultsContainer from '../ResultsContainer';
import TanklessWaterHeaterSVG from './TanklessWaterHeaterSVG';

// Flow rates per fixture type (GPM) - based on DOE standards and manufacturer data
// Source: DOE Energy Conservation Standards, ASPE Plumbing Engineering Design Handbook
const FIXTURES = [
  { id: 'shower_standard', name: 'Standard Shower', gpm: 2.0, category: 'Bathroom' },
  { id: 'shower_low_flow', name: 'Low-Flow Shower', gpm: 1.5, category: 'Bathroom' },
  { id: 'shower_rain', name: 'Rain/Luxury Shower', gpm: 2.5, category: 'Bathroom' },
  { id: 'bathtub', name: 'Bathtub Fill', gpm: 4.0, category: 'Bathroom' },
  { id: 'bathroom_faucet', name: 'Bathroom Faucet', gpm: 1.0, category: 'Bathroom' },
  { id: 'kitchen_faucet', name: 'Kitchen Faucet', gpm: 1.5, category: 'Kitchen' },
  { id: 'dishwasher', name: 'Dishwasher', gpm: 1.5, category: 'Kitchen' },
  { id: 'washing_machine', name: 'Washing Machine', gpm: 2.0, category: 'Laundry' },
  { id: 'utility_sink', name: 'Utility/Laundry Sink', gpm: 2.0, category: 'Laundry' },
];

// Groundwater temperatures by US region (°F)
// Source: USGS groundwater temperature data, DOE
const GROUNDWATER_TEMPS: Record<string, { temp: number; label: string }> = {
  'north': { temp: 45, label: 'Northern US (45°F)' },
  'midwest': { temp: 50, label: 'Midwest (50°F)' },
  'mid_atlantic': { temp: 55, label: 'Mid-Atlantic (55°F)' },
  'south': { temp: 65, label: 'Southern US (65°F)' },
  'southwest': { temp: 60, label: 'Southwest (60°F)' },
  'pacific': { temp: 55, label: 'Pacific Coast (55°F)' },
  'hawaii': { temp: 75, label: 'Hawaii (75°F)' },
  'custom': { temp: 0, label: 'Custom Temperature' },
};

interface FixtureCount {
  [key: string]: number;
}

interface TanklessResults {
  totalGPM: number;
  simultaneousGPM: number;
  temperatureRise: number;
  requiredBTU: number;
  requiredKW: number;
  gasUnitSize: string;
  electricUnitSize: string;
  fixtureBreakdown: Array<{ name: string; count: number; gpm: number; totalGPM: number }>;
  recommendation: string;
  fuelTypeNotes: string;
}

// Calculate required BTU/hr for tankless water heater
// Formula: BTU/hr = GPM × Temperature Rise × 500
// Source: DOE, AHRI (Air-Conditioning, Heating, & Refrigeration Institute)
// The constant 500 = 8.33 lbs/gallon × 60 min/hr (simplified)
function calculateTanklessSize(
  fixtures: FixtureCount,
  groundwaterTemp: number,
  desiredTemp: number,
  simultaneousFactor: number
): TanklessResults {
  // Calculate total GPM from all fixtures
  let totalGPM = 0;
  const fixtureBreakdown: Array<{ name: string; count: number; gpm: number; totalGPM: number }> = [];

  FIXTURES.forEach((fixture) => {
    const count = fixtures[fixture.id] || 0;
    if (count > 0) {
      const fixtureTotal = count * fixture.gpm;
      totalGPM += fixtureTotal;
      fixtureBreakdown.push({
        name: fixture.name,
        count,
        gpm: fixture.gpm,
        totalGPM: fixtureTotal,
      });
    }
  });

  // Apply simultaneity factor (not all fixtures run at once)
  // Typical factors: 70% for 2-3 fixtures, 50% for 4+ fixtures
  const simultaneousGPM = totalGPM * (simultaneousFactor / 100);

  // Calculate temperature rise
  const temperatureRise = desiredTemp - groundwaterTemp;

  // Calculate required BTU/hr
  // Formula: BTU/hr = GPM × ΔT × 500
  const requiredBTU = simultaneousGPM * temperatureRise * 500;

  // Convert to kW for electric units (1 kW = 3,412 BTU)
  const requiredKW = requiredBTU / 3412;

  // Determine recommended unit sizes
  const gasUnitSize = getGasUnitSize(requiredBTU);
  const electricUnitSize = getElectricUnitSize(requiredKW);

  // Generate recommendation
  const recommendation = generateRecommendation(simultaneousGPM, requiredBTU, temperatureRise);
  const fuelTypeNotes = generateFuelTypeNotes(requiredKW, requiredBTU);

  return {
    totalGPM,
    simultaneousGPM,
    temperatureRise,
    requiredBTU,
    requiredKW,
    gasUnitSize,
    electricUnitSize,
    fixtureBreakdown,
    recommendation,
    fuelTypeNotes,
  };
}

function getGasUnitSize(btu: number): string {
  // Standard gas tankless sizes
  if (btu <= 120000) return '120,000 BTU (Small - 1-2 bathrooms)';
  if (btu <= 160000) return '160,000 BTU (Medium - 2-3 bathrooms)';
  if (btu <= 199000) return '199,000 BTU (Large - 3-4 bathrooms)';
  return '199,000+ BTU (Consider multiple units)';
}

function getElectricUnitSize(kw: number): string {
  // Standard electric tankless sizes
  if (kw <= 11) return '11 kW (Point-of-use)';
  if (kw <= 18) return '18 kW (1-2 bathrooms)';
  if (kw <= 24) return '24 kW (2-3 bathrooms)';
  if (kw <= 27) return '27 kW (3+ bathrooms)';
  if (kw <= 36) return '36 kW (Large home - may need 200A service)';
  return '36+ kW (Consider multiple units or gas)';
}

function generateRecommendation(gpm: number, btu: number, tempRise: number): string {
  if (tempRise > 70) {
    return 'High temperature rise required. In cold climates, gas tankless is strongly recommended for adequate hot water delivery. Electric units may struggle to maintain temperature at higher flow rates.';
  }
  if (gpm > 6) {
    return 'High simultaneous demand. Consider a larger gas unit or multiple smaller units for whole-house applications.';
  }
  if (gpm <= 2.5) {
    return 'Low to moderate demand. Either gas or electric tankless will work well. Electric may be more cost-effective for smaller applications.';
  }
  return 'Moderate demand. Both gas and electric tankless options are viable. Gas offers higher flow capacity; electric has lower installation cost.';
}

function generateFuelTypeNotes(kw: number, btu: number): string {
  const notes: string[] = [];

  if (kw > 24) {
    notes.push('Electric units above 24 kW typically require 200-amp electrical service upgrade.');
  }
  if (kw > 18) {
    notes.push('Electric units 18+ kW require dedicated 240V circuits with 100+ amp breakers.');
  }
  if (btu > 150000) {
    notes.push('Gas units above 150,000 BTU require 3/4" gas line minimum.');
  }

  if (notes.length === 0) {
    notes.push('Standard installation requirements for both gas and electric options.');
  }

  return notes.join(' ');
}

export default function TanklessWaterHeaterCalculator() {
  const [fixtures, setFixtures] = useState<FixtureCount>({
    shower_standard: 2,
    bathroom_faucet: 2,
    kitchen_faucet: 1,
    dishwasher: 1,
    washing_machine: 1,
  });
  const [region, setRegion] = useState('midwest');
  const [customGroundwaterTemp, setCustomGroundwaterTemp] = useState(50);
  const [desiredTemp, setDesiredTemp] = useState(120);
  const [simultaneousFactor, setSimultaneousFactor] = useState(70);
  const [results, setResults] = useState<TanklessResults | null>(null);

  const handleFixtureChange = (fixtureId: string, count: number) => {
    setFixtures((prev) => ({
      ...prev,
      [fixtureId]: Math.max(0, count),
    }));
  };

  const handleCalculate = () => {
    const groundwaterTemp =
      region === 'custom' ? customGroundwaterTemp : GROUNDWATER_TEMPS[region].temp;
    const result = calculateTanklessSize(fixtures, groundwaterTemp, desiredTemp, simultaneousFactor);
    setResults(result);
  };

  // Group fixtures by category
  const fixturesByCategory = FIXTURES.reduce((acc, fixture) => {
    if (!acc[fixture.category]) acc[fixture.category] = [];
    acc[fixture.category].push(fixture);
    return acc;
  }, {} as Record<string, typeof FIXTURES>);

  return (
    <CalculatorWrapper
      title="Tankless Water Heater Size Calculator"
      description="Calculate the right size tankless water heater based on fixture count, flow rates, and temperature rise requirements."
    >
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Fixture Selection */}
        <div className="space-y-4">
          <h3 className="font-semibold text-slate-800">Hot Water Fixtures</h3>
          {Object.entries(fixturesByCategory).map(([category, categoryFixtures]) => (
            <div key={category} className="space-y-2">
              <h4 className="text-sm font-medium text-slate-600">{category}</h4>
              <div className="grid grid-cols-2 gap-2">
                {categoryFixtures.map((fixture) => (
                  <div key={fixture.id} className="flex items-center gap-2">
                    <input
                      type="number"
                      min="0"
                      max="10"
                      value={fixtures[fixture.id] || 0}
                      onChange={(e) =>
                        handleFixtureChange(fixture.id, parseInt(e.target.value) || 0)
                      }
                      className="w-16 px-2 py-1 text-center border border-slate-300 rounded focus:outline-none focus:ring-2 focus:ring-orange-500"
                    />
                    <span className="text-sm text-slate-700">
                      {fixture.name} ({fixture.gpm} GPM)
                    </span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Settings */}
        <div className="space-y-4">
          <h3 className="font-semibold text-slate-800">Water Temperatures</h3>

          <CalculatorInput
            id="region"
            label="Region (Groundwater Temperature)"
            type="select"
            value={region}
            onChange={(e) => setRegion(e.target.value)}
            options={Object.entries(GROUNDWATER_TEMPS).map(([key, value]) => ({
              value: key,
              label: value.label,
            }))}
          />

          {region === 'custom' && (
            <CalculatorInput
              id="customGroundwaterTemp"
              label="Custom Groundwater Temperature"
              type="number"
              value={customGroundwaterTemp}
              onChange={(e) => setCustomGroundwaterTemp(parseFloat(e.target.value) || 0)}
              min={35}
              max={80}
              unit="°F"
            />
          )}

          <CalculatorInput
            id="desiredTemp"
            label="Desired Hot Water Temperature"
            type="number"
            value={desiredTemp}
            onChange={(e) => setDesiredTemp(parseFloat(e.target.value) || 0)}
            min={100}
            max={140}
            unit="°F"
            helpText="Most households use 110-120°F. Higher temps increase energy use."
          />

          <CalculatorInput
            id="simultaneousFactor"
            label="Simultaneous Use Factor"
            type="number"
            value={simultaneousFactor}
            onChange={(e) => setSimultaneousFactor(parseFloat(e.target.value) || 0)}
            min={30}
            max={100}
            unit="%"
            helpText="Percentage of fixtures that might run at the same time. 70% is typical."
          />

          <button
            onClick={handleCalculate}
            className="w-full mt-4 px-6 py-3 bg-orange-600 text-white font-semibold rounded-lg hover:bg-orange-700 transition-colors"
          >
            Calculate Tankless Size
          </button>
        </div>
      </div>

      <ResultsContainer show={!!results} variant="margin">
        {results && (
          <>
          <TanklessWaterHeaterSVG
            requiredGPM={results.simultaneousGPM}
            temperatureRise={results.temperatureRise}
            requiredBTU={results.requiredBTU}
            fixtureCount={results.fixtureBreakdown.reduce((sum, f) => sum + f.count, 0)}
            inletTemp={desiredTemp - results.temperatureRise}
            outletTemp={desiredTemp}
          />
          <ResultsGrid>
            <CalculatorResult
              label="Required Flow Rate"
              value={`${results.simultaneousGPM.toFixed(1)} GPM`}
              subtitle={`${results.totalGPM.toFixed(1)} GPM total capacity`}
            />
            <CalculatorResult
              label="Temperature Rise"
              value={`${results.temperatureRise}°F`}
              subtitle={`From ${desiredTemp - results.temperatureRise}°F to ${desiredTemp}°F`}
            />
            <CalculatorResult
              label="Gas Unit Required"
              value={`${Math.round(results.requiredBTU / 1000)}k BTU/hr`}
              subtitle={results.gasUnitSize}
            />
            <CalculatorResult
              label="Electric Unit Required"
              value={`${results.requiredKW.toFixed(1)} kW`}
              subtitle={results.electricUnitSize}
            />
          </ResultsGrid>

          {/* Fixture Breakdown */}
          <div>
            <h3 className="font-semibold text-slate-800 mb-3">Fixture Flow Rate Breakdown</h3>
            <ResultsTable
              headers={['Fixture', 'Count', 'Flow Rate', 'Total GPM']}
              rows={results.fixtureBreakdown.map((f) => [
                f.name,
                f.count.toString(),
                `${f.gpm} GPM`,
                `${f.totalGPM.toFixed(1)} GPM`,
              ])}
            />
            <div className="mt-2 text-sm text-slate-600 bg-slate-50 p-3 rounded">
              <strong>Total fixture capacity:</strong> {results.totalGPM.toFixed(1)} GPM |{' '}
              <strong>Simultaneous demand ({simultaneousFactor}%):</strong>{' '}
              {results.simultaneousGPM.toFixed(1)} GPM
            </div>
          </div>

          {/* Recommendations */}
          <div className="bg-orange-50 border border-orange-200 rounded-lg p-4">
            <h3 className="font-semibold text-orange-800 mb-2">Sizing Recommendation</h3>
            <p className="text-sm text-orange-900">{results.recommendation}</p>
          </div>

          <div className="bg-slate-50 border border-slate-200 rounded-lg p-4">
            <h3 className="font-semibold text-slate-800 mb-2">Installation Notes</h3>
            <p className="text-sm text-slate-700">{results.fuelTypeNotes}</p>
          </div>

          {/* Formula explanation */}
          <div className="text-sm text-slate-600 bg-slate-50 p-4 rounded-lg">
            <h4 className="font-semibold mb-2">Calculation Method</h4>
            <p>
              <strong>Formula:</strong> BTU/hr = GPM × Temperature Rise × 500
            </p>
            <p className="mt-1">
              <strong>Sources:</strong> DOE Energy Conservation Standards, AHRI Standard 900, ASPE
              Plumbing Engineering Design Handbook
            </p>
          </div>
          </>
        )}
      </ResultsContainer>
    </CalculatorWrapper>
  );
}
