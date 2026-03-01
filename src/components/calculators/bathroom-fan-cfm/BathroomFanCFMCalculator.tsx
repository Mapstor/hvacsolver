'use client';

import { useState } from 'react';
import CalculatorWrapper from '../CalculatorWrapper';
import CalculatorInput from '../CalculatorInput';
import { CalculatorResult, ResultsGrid, ResultsTable } from '../CalculatorResult';
import ResultsContainer from '../ResultsContainer';
import BathroomFanCFMSVG from './BathroomFanCFMSVG';

// Bathroom fixture CFM requirements
// Source: ASHRAE 62.2 and HVI (Home Ventilating Institute) guidelines
interface FixtureType {
  id: string;
  name: string;
  cfmRequirement: number;
  description: string;
}

const fixtureTypes: FixtureType[] = [
  {
    id: 'toilet',
    name: 'Toilet',
    cfmRequirement: 50,
    description: 'Standard toilet requires minimum 50 CFM',
  },
  {
    id: 'shower',
    name: 'Shower (Standard)',
    cfmRequirement: 50,
    description: 'Standard shower stall',
  },
  {
    id: 'shower_large',
    name: 'Shower (Large/Steam)',
    cfmRequirement: 100,
    description: 'Large walk-in or steam shower',
  },
  {
    id: 'bathtub',
    name: 'Bathtub',
    cfmRequirement: 50,
    description: 'Standard bathtub',
  },
  {
    id: 'jetted_tub',
    name: 'Jetted/Whirlpool Tub',
    cfmRequirement: 100,
    description: 'Jetted or whirlpool tub generates more moisture',
  },
  {
    id: 'enclosed_toilet',
    name: 'Enclosed Toilet Room',
    cfmRequirement: 70,
    description: 'Separate enclosed toilet compartment',
  },
];

interface CalculationResult {
  roomMethod: {
    cfm: number;
    airChangesPerHour: number;
  };
  fixtureMethod: {
    cfm: number;
    fixtures: { name: string; cfm: number }[];
  };
  recommendedCfm: number;
  method: 'room' | 'fixture';
  fanSize: string;
  sonesRecommendation: string;
  ductSize: string;
}

function calculateBathroomFanCFM(
  lengthFt: number,
  widthFt: number,
  ceilingHeightFt: number,
  selectedFixtures: string[]
): CalculationResult {
  // Room Method Calculation
  // Formula: CFM = (Room Volume × ACH) / 60
  // ASHRAE recommends 8 ACH for bathrooms
  // Simplified: 1 CFM per square foot for standard 8' ceilings
  // Source: HVI (Home Ventilating Institute) Ventilation Guidelines

  const squareFeet = lengthFt * widthFt;
  const cubicFeet = squareFeet * ceilingHeightFt;

  // Standard 8 air changes per hour for bathrooms
  const targetAch = 8;
  const roomMethodCfm = Math.ceil((cubicFeet * targetAch) / 60);

  // Simplified room method: 1 CFM per sq ft (minimum 50 CFM)
  const simplifiedRoomCfm = Math.max(50, Math.ceil(squareFeet * 1));

  // Fixture Method Calculation
  // Sum CFM requirements for all fixtures
  const fixtureDetails: { name: string; cfm: number }[] = [];
  let fixtureMethodCfm = 0;

  for (const fixtureId of selectedFixtures) {
    const fixture = fixtureTypes.find((f) => f.id === fixtureId);
    if (fixture) {
      fixtureDetails.push({ name: fixture.name, cfm: fixture.cfmRequirement });
      fixtureMethodCfm += fixture.cfmRequirement;
    }
  }

  // Use the higher of the two methods
  // Most building codes require the higher value
  const recommendedCfm = Math.max(roomMethodCfm, fixtureMethodCfm, 50);
  const method = roomMethodCfm >= fixtureMethodCfm ? 'room' : 'fixture';

  // Fan size recommendation (round up to standard sizes)
  const standardSizes = [50, 70, 80, 100, 110, 130, 150, 180, 200, 250, 300];
  const fanSize = standardSizes.find((size) => size >= recommendedCfm) ||
    `${recommendedCfm}+ (may need multiple fans)`;

  // Sones recommendation based on CFM
  // Source: HVI guidelines
  let sonesRecommendation: string;
  if (recommendedCfm <= 80) {
    sonesRecommendation = '0.3-1.0 sones (very quiet)';
  } else if (recommendedCfm <= 110) {
    sonesRecommendation = '1.0-2.0 sones (quiet)';
  } else if (recommendedCfm <= 150) {
    sonesRecommendation = '1.5-3.0 sones (moderate)';
  } else {
    sonesRecommendation = '2.0-4.0+ sones (noticeable)';
  }

  // Duct size recommendation
  // Rule of thumb: 1 sq inch of duct per CFM for round ducts
  // Source: ASHRAE duct sizing guidelines
  let ductSize: string;
  if (recommendedCfm <= 50) {
    ductSize = '4" round (or 3x10" rectangular)';
  } else if (recommendedCfm <= 80) {
    ductSize = '4" round minimum, 5" preferred';
  } else if (recommendedCfm <= 100) {
    ductSize = '5" round (or 3.25x10" rectangular)';
  } else if (recommendedCfm <= 150) {
    ductSize = '6" round (or 3.25x14" rectangular)';
  } else {
    ductSize = '6"+ round (consider 7" or 8")';
  }

  return {
    roomMethod: {
      cfm: roomMethodCfm,
      airChangesPerHour: targetAch,
    },
    fixtureMethod: {
      cfm: fixtureMethodCfm,
      fixtures: fixtureDetails,
    },
    recommendedCfm,
    method,
    fanSize: typeof fanSize === 'number' ? `${fanSize} CFM` : fanSize,
    sonesRecommendation,
    ductSize,
  };
}

export default function BathroomFanCFMCalculator() {
  const [length, setLength] = useState<number>(10);
  const [width, setWidth] = useState<number>(8);
  const [ceilingHeight, setCeilingHeight] = useState<number>(8);
  const [selectedFixtures, setSelectedFixtures] = useState<string[]>([
    'toilet',
    'shower',
  ]);

  const [result, setResult] = useState<CalculationResult | null>(null);

  const toggleFixture = (fixtureId: string) => {
    setSelectedFixtures((prev) =>
      prev.includes(fixtureId)
        ? prev.filter((id) => id !== fixtureId)
        : [...prev, fixtureId]
    );
  };

  const handleCalculate = () => {
    if (length <= 0 || width <= 0 || ceilingHeight <= 0) return;
    const calculated = calculateBathroomFanCFM(
      length,
      width,
      ceilingHeight,
      selectedFixtures
    );
    setResult(calculated);
  };

  const squareFeet = length * width;
  const cubicFeet = squareFeet * ceilingHeight;

  return (
    <CalculatorWrapper
      title="Bathroom Fan CFM Calculator"
      description="Calculate the correct exhaust fan size for your bathroom using both the room size method and fixture method per ASHRAE 62.2 and HVI guidelines."
    >
      <div className="space-y-6">
        {/* Room Dimensions */}
        <div>
          <h3 className="text-lg font-semibold text-slate-900 mb-3">
            Room Dimensions
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <CalculatorInput
              type="number"
              id="length"
              label="Length"
              value={length}
              onChange={(e) => setLength(parseFloat(e.target.value) || 0)}
              unit="feet"
              min={1}
              max={50}
              step={0.5}
            />
            <CalculatorInput
              type="number"
              id="width"
              label="Width"
              value={width}
              onChange={(e) => setWidth(parseFloat(e.target.value) || 0)}
              unit="feet"
              min={1}
              max={50}
              step={0.5}
            />
            <CalculatorInput
              type="number"
              id="ceilingHeight"
              label="Ceiling Height"
              value={ceilingHeight}
              onChange={(e) => setCeilingHeight(parseFloat(e.target.value) || 0)}
              unit="feet"
              min={6}
              max={20}
              step={0.5}
            />
          </div>
          <div className="mt-2 text-sm text-slate-600">
            Room size: <span className="font-semibold">{squareFeet} sq ft</span> |
            Volume: <span className="font-semibold">{cubicFeet} cu ft</span>
          </div>
        </div>

        {/* Fixture Selection */}
        <div>
          <h3 className="text-lg font-semibold text-slate-900 mb-3">
            Bathroom Fixtures
          </h3>
          <p className="text-sm text-slate-600 mb-4">
            Select all fixtures in the bathroom. The fixture method calculates
            CFM based on total fixture requirements.
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {fixtureTypes.map((fixture) => (
              <label
                key={fixture.id}
                className={`flex items-start gap-3 p-3 border rounded-lg cursor-pointer transition-colors ${
                  selectedFixtures.includes(fixture.id)
                    ? 'border-[#c2410c] bg-orange-50'
                    : 'border-slate-200 bg-white hover:border-slate-300'
                }`}
              >
                <input
                  type="checkbox"
                  checked={selectedFixtures.includes(fixture.id)}
                  onChange={() => toggleFixture(fixture.id)}
                  className="mt-1 h-4 w-4 text-[#c2410c] rounded"
                />
                <div>
                  <div className="font-medium text-slate-900">
                    {fixture.name}
                    <span className="ml-2 text-sm font-normal text-slate-500">
                      {fixture.cfmRequirement} CFM
                    </span>
                  </div>
                  <div className="text-xs text-slate-500">
                    {fixture.description}
                  </div>
                </div>
              </label>
            ))}
          </div>
        </div>

        {/* Calculate Button */}
        <button
          onClick={handleCalculate}
          className="w-full sm:w-auto px-8 py-3 bg-[#c2410c] text-white font-semibold rounded-lg hover:bg-[#9a3409] transition-colors"
        >
          Calculate Fan Size
        </button>

        {/* Results */}
        <ResultsContainer show={!!result}>
          {result && (
            <>
            <BathroomFanCFMSVG
              roomCubicFeet={length * width * ceilingHeight}
              recommendedCFM={result.recommendedCfm}
              airChangesPerHour={result.roomMethod.airChangesPerHour}
              fixtures={result.fixtureMethod.fixtures.map(f => f.name)}
            />

            {/* Primary Recommendation */}
            <div className="bg-orange-50 border border-orange-200 rounded-lg p-4">
              <div className="text-sm text-slate-600 mb-1">
                Recommended Exhaust Fan Size
              </div>
              <div className="text-4xl font-bold text-[#c2410c]">
                {result.recommendedCfm} CFM
              </div>
              <div className="text-sm text-slate-600 mt-2">
                Based on {result.method === 'room' ? 'room size' : 'fixture'} method
                (using the higher of the two calculations)
              </div>
            </div>

            {/* Method Comparison */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div
                className={`border rounded-lg p-4 ${
                  result.method === 'room'
                    ? 'border-green-300 bg-green-50'
                    : 'border-slate-200 bg-white'
                }`}
              >
                <h4 className="font-semibold text-slate-900 mb-2 flex items-center gap-2">
                  Room Size Method
                  {result.method === 'room' && (
                    <span className="text-xs bg-green-600 text-white px-2 py-0.5 rounded">
                      Used
                    </span>
                  )}
                </h4>
                <div className="text-3xl font-bold text-slate-900">
                  {result.roomMethod.cfm} CFM
                </div>
                <div className="text-sm text-slate-600 mt-2">
                  Based on {result.roomMethod.airChangesPerHour} air changes per hour
                </div>
                <div className="text-xs text-slate-500 mt-1">
                  Formula: (Volume × ACH) ÷ 60
                </div>
              </div>

              <div
                className={`border rounded-lg p-4 ${
                  result.method === 'fixture'
                    ? 'border-green-300 bg-green-50'
                    : 'border-slate-200 bg-white'
                }`}
              >
                <h4 className="font-semibold text-slate-900 mb-2 flex items-center gap-2">
                  Fixture Method
                  {result.method === 'fixture' && (
                    <span className="text-xs bg-green-600 text-white px-2 py-0.5 rounded">
                      Used
                    </span>
                  )}
                </h4>
                <div className="text-3xl font-bold text-slate-900">
                  {result.fixtureMethod.cfm} CFM
                </div>
                <div className="text-sm text-slate-600 mt-2">
                  Based on {result.fixtureMethod.fixtures.length} fixtures
                </div>
                <div className="text-xs text-slate-500 mt-1">
                  {result.fixtureMethod.fixtures.map((f) => f.name).join(' + ')}
                </div>
              </div>
            </div>

            {/* Fixture Breakdown */}
            {result.fixtureMethod.fixtures.length > 0 && (
              <div>
                <h4 className="font-semibold text-slate-900 mb-3">
                  Fixture CFM Breakdown
                </h4>
                <ResultsTable
                  rows={[
                    ...result.fixtureMethod.fixtures.map((f) => ({
                      label: f.name,
                      value: f.cfm,
                      unit: 'CFM',
                    })),
                    {
                      label: 'Total (Fixture Method)',
                      value: result.fixtureMethod.cfm,
                      unit: 'CFM',
                    },
                  ]}
                />
              </div>
            )}

            {/* Fan Selection Guide */}
            <div className="bg-slate-50 border border-slate-200 rounded-lg p-4">
              <h4 className="font-semibold text-slate-900 mb-3">
                Fan Selection Guide
              </h4>
              <ResultsTable
                rows={[
                  { label: 'Minimum Fan Size', value: result.fanSize, unit: '' },
                  { label: 'Noise Level Target', value: result.sonesRecommendation, unit: '' },
                  { label: 'Duct Size', value: result.ductSize, unit: '' },
                ]}
              />
            </div>

            {/* Tips */}
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
              <h4 className="font-semibold text-slate-900 mb-2">
                Installation Tips
              </h4>
              <ul className="text-sm text-slate-700 space-y-1 list-disc list-inside">
                <li>
                  Always duct exhaust fans to the outside, never into an attic or
                  crawl space
                </li>
                <li>
                  Use smooth, rigid metal duct when possible (reduce by 25% for
                  flex duct)
                </li>
                <li>
                  Keep duct runs as short and straight as possible
                </li>
                <li>
                  Add 10% CFM for each 90-degree elbow in the duct run
                </li>
                <li>
                  Consider a fan with a humidity sensor for automatic operation
                </li>
              </ul>
            </div>

            {/* Methodology note */}
            <div className="text-xs text-slate-500 border-t border-slate-200 pt-4">
              <p className="font-medium mb-1">Calculation Standards:</p>
              <p>
                Room method uses ASHRAE 62.2 recommendation of 8 air changes per
                hour for bathrooms. Fixture method uses HVI (Home Ventilating
                Institute) guidelines for CFM per fixture type. Building codes
                typically require the higher of the two calculations, with a
                minimum of 50 CFM for any bathroom.
              </p>
            </div>
            </>
          )}
        </ResultsContainer>
      </div>
    </CalculatorWrapper>
  );
}
