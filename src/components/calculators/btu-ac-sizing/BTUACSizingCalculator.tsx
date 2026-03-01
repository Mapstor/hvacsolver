'use client';

import { useState } from 'react';
import CalculatorWrapper from '../CalculatorWrapper';
import CalculatorInput from '../CalculatorInput';
import { ResultsTable } from '../CalculatorResult';
import ResultsContainer from '../ResultsContainer';
import BTUACSizingSVG from './BTUACSizingSVG';

// Room AC sizing methodology
// Source: Energy Star, ASHRAE simplified residential cooling load calculations
// Base rule: 20 BTU per square foot, then apply adjustment factors

interface ClimateZone {
  id: string;
  name: string;
  description: string;
  multiplier: number;
}

const climateZones: ClimateZone[] = [
  {
    id: 'hot_humid',
    name: 'Hot-Humid (Zone 1-2)',
    description: 'Miami, Houston, Phoenix summer',
    multiplier: 1.15,
  },
  {
    id: 'hot_dry',
    name: 'Hot-Dry (Zone 2-3)',
    description: 'Las Vegas, Tucson, desert SW',
    multiplier: 1.10,
  },
  {
    id: 'mixed_humid',
    name: 'Mixed-Humid (Zone 4)',
    description: 'Atlanta, Charlotte, Oklahoma City',
    multiplier: 1.0,
  },
  {
    id: 'mixed_dry',
    name: 'Mixed-Dry (Zone 4-5)',
    description: 'Denver, Albuquerque, Salt Lake',
    multiplier: 0.95,
  },
  {
    id: 'cool',
    name: 'Cool (Zone 5-6)',
    description: 'Chicago, Boston, Minneapolis',
    multiplier: 0.90,
  },
  {
    id: 'cold',
    name: 'Cold (Zone 7)',
    description: 'Northern states, Alaska',
    multiplier: 0.85,
  },
];

interface RoomType {
  id: string;
  name: string;
  baseMultiplier: number;
  description: string;
}

const roomTypes: RoomType[] = [
  {
    id: 'bedroom',
    name: 'Bedroom',
    baseMultiplier: 1.0,
    description: 'Standard bedroom',
  },
  {
    id: 'living_room',
    name: 'Living Room',
    baseMultiplier: 1.0,
    description: 'Main living space',
  },
  {
    id: 'kitchen',
    name: 'Kitchen',
    baseMultiplier: 1.2,
    description: 'Cooking adds heat load',
  },
  {
    id: 'office',
    name: 'Home Office',
    baseMultiplier: 1.05,
    description: 'Computers and equipment',
  },
  {
    id: 'sunroom',
    name: 'Sunroom/Conservatory',
    baseMultiplier: 1.3,
    description: 'High glass content',
  },
  {
    id: 'garage',
    name: 'Garage/Workshop',
    baseMultiplier: 1.15,
    description: 'Often poorly insulated',
  },
  {
    id: 'basement',
    name: 'Basement',
    baseMultiplier: 0.85,
    description: 'Naturally cooler',
  },
  {
    id: 'attic',
    name: 'Finished Attic',
    baseMultiplier: 1.25,
    description: 'Roof heat gain',
  },
];

interface SunExposure {
  id: string;
  name: string;
  adjustment: number;
  description: string;
}

const sunExposures: SunExposure[] = [
  {
    id: 'heavy_shade',
    name: 'Heavy Shade',
    adjustment: -10,
    description: 'Trees block sun most of day',
  },
  {
    id: 'partial_shade',
    name: 'Partial Shade',
    adjustment: -5,
    description: 'Some shade, north-facing',
  },
  {
    id: 'average',
    name: 'Average',
    adjustment: 0,
    description: 'Typical sun exposure',
  },
  {
    id: 'sunny',
    name: 'Sunny',
    adjustment: 10,
    description: 'South/west-facing, limited shade',
  },
  {
    id: 'very_sunny',
    name: 'Very Sunny',
    adjustment: 15,
    description: 'Full sun exposure, lots of windows',
  },
];

interface InsulationLevel {
  id: string;
  name: string;
  multiplier: number;
  description: string;
}

const insulationLevels: InsulationLevel[] = [
  {
    id: 'poor',
    name: 'Poor',
    multiplier: 1.15,
    description: 'Old home, single-pane windows, minimal insulation',
  },
  {
    id: 'average',
    name: 'Average',
    multiplier: 1.0,
    description: 'Standard construction, double-pane windows',
  },
  {
    id: 'good',
    name: 'Good',
    multiplier: 0.90,
    description: 'Well-insulated, modern construction',
  },
  {
    id: 'excellent',
    name: 'Excellent',
    multiplier: 0.80,
    description: 'High-efficiency home, triple-pane, foam insulation',
  },
];

// Standard room AC sizes
const standardACSizes = [5000, 6000, 8000, 10000, 12000, 14000, 15000, 18000, 20000, 22000, 24000, 25000];

interface CalculationResult {
  squareFeet: number;
  baseBtu: number;
  adjustments: { name: string; btuChange: number }[];
  totalBtu: number;
  recommendedSize: number;
  alternativeSize: number | null;
  tons: number;
  eerTarget: number;
  annualCost: number;
}

function calculateACSize(
  lengthFt: number,
  widthFt: number,
  ceilingHeightFt: number,
  roomTypeId: string,
  climateZoneId: string,
  sunExposureId: string,
  insulationId: string,
  occupants: number,
  electricityRate: number
): CalculationResult {
  // Base calculation: 20 BTU per square foot
  // Source: Energy Star room AC sizing guide
  // Adjusted for ceiling height (standard 8 ft baseline)

  const squareFeet = lengthFt * widthFt;
  const ceilingMultiplier = ceilingHeightFt / 8;
  const effectiveSquareFeet = squareFeet * ceilingMultiplier;

  const baseBtu = Math.round(effectiveSquareFeet * 20);

  const adjustments: { name: string; btuChange: number }[] = [];

  // Room type adjustment
  const roomType = roomTypes.find((r) => r.id === roomTypeId)!;
  const roomTypeAdjustment = Math.round(baseBtu * (roomType.baseMultiplier - 1));
  if (roomTypeAdjustment !== 0) {
    adjustments.push({ name: `${roomType.name} adjustment`, btuChange: roomTypeAdjustment });
  }

  // Climate zone adjustment
  const climateZone = climateZones.find((c) => c.id === climateZoneId)!;
  const climateAdjustment = Math.round(baseBtu * (climateZone.multiplier - 1));
  if (climateAdjustment !== 0) {
    adjustments.push({ name: `${climateZone.name} climate`, btuChange: climateAdjustment });
  }

  // Sun exposure adjustment (percentage of base)
  const sunExposure = sunExposures.find((s) => s.id === sunExposureId)!;
  const sunAdjustment = Math.round(baseBtu * (sunExposure.adjustment / 100));
  if (sunAdjustment !== 0) {
    adjustments.push({ name: `${sunExposure.name} sun exposure`, btuChange: sunAdjustment });
  }

  // Insulation adjustment
  const insulation = insulationLevels.find((i) => i.id === insulationId)!;
  const insulationAdjustment = Math.round(baseBtu * (insulation.multiplier - 1));
  if (insulationAdjustment !== 0) {
    adjustments.push({ name: `${insulation.name} insulation`, btuChange: insulationAdjustment });
  }

  // Occupant adjustment: 600 BTU per person above 2
  // Source: Energy Star guidelines
  if (occupants > 2) {
    const occupantAdjustment = (occupants - 2) * 600;
    adjustments.push({ name: `${occupants} occupants (+${occupants - 2} above baseline)`, btuChange: occupantAdjustment });
  }

  // Calculate total BTU
  const totalAdjustments = adjustments.reduce((sum, adj) => sum + adj.btuChange, 0);
  const totalBtu = Math.round(baseBtu + totalAdjustments);

  // Find recommended standard size (round up to nearest standard)
  const recommendedSize = standardACSizes.find((size) => size >= totalBtu) || standardACSizes[standardACSizes.length - 1];

  // Find alternative (next size up if close to boundary)
  let alternativeSize: number | null = null;
  const sizeIndex = standardACSizes.indexOf(recommendedSize);
  if (sizeIndex < standardACSizes.length - 1 && totalBtu > recommendedSize * 0.9) {
    alternativeSize = standardACSizes[sizeIndex + 1];
  }

  // Convert to tons (12,000 BTU = 1 ton)
  const tons = totalBtu / 12000;

  // Target EER for room AC (Energy Star minimum is ~10.7)
  const eerTarget = 12;

  // Estimate annual cost
  // Assume 8 hours/day, 120 days cooling season, EER of 12
  const wattsPerHour = totalBtu / eerTarget;
  const kwh = (wattsPerHour / 1000) * 8 * 120;
  const annualCost = kwh * electricityRate;

  return {
    squareFeet,
    baseBtu,
    adjustments,
    totalBtu,
    recommendedSize,
    alternativeSize,
    tons,
    eerTarget,
    annualCost,
  };
}

export default function BTUACSizingCalculator() {
  const [length, setLength] = useState<number>(15);
  const [width, setWidth] = useState<number>(12);
  const [ceilingHeight, setCeilingHeight] = useState<number>(8);
  const [roomTypeId, setRoomTypeId] = useState<string>('living_room');
  const [climateZoneId, setClimateZoneId] = useState<string>('mixed_humid');
  const [sunExposureId, setSunExposureId] = useState<string>('average');
  const [insulationId, setInsulationId] = useState<string>('average');
  const [occupants, setOccupants] = useState<number>(2);
  const [electricityRate, setElectricityRate] = useState<number>(0.15);

  const [result, setResult] = useState<CalculationResult | null>(null);

  const handleCalculate = () => {
    if (length <= 0 || width <= 0 || ceilingHeight <= 0) return;

    const calculated = calculateACSize(
      length,
      width,
      ceilingHeight,
      roomTypeId,
      climateZoneId,
      sunExposureId,
      insulationId,
      occupants,
      electricityRate
    );
    setResult(calculated);
  };

  return (
    <CalculatorWrapper
      title="Room AC BTU Calculator"
      description="Calculate the correct BTU capacity for a window or portable AC unit. Based on Energy Star guidelines with adjustments for room conditions."
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
              min={5}
              max={100}
              step={1}
            />
            <CalculatorInput
              type="number"
              id="width"
              label="Width"
              value={width}
              onChange={(e) => setWidth(parseFloat(e.target.value) || 0)}
              unit="feet"
              min={5}
              max={100}
              step={1}
            />
            <CalculatorInput
              type="number"
              id="ceilingHeight"
              label="Ceiling Height"
              value={ceilingHeight}
              onChange={(e) => setCeilingHeight(parseFloat(e.target.value) || 0)}
              unit="feet"
              min={7}
              max={20}
              step={0.5}
            />
          </div>
          <div className="mt-2 text-sm text-slate-600">
            Room size: <span className="font-semibold">{length * width} sq ft</span>
          </div>
        </div>

        {/* Room Type */}
        <div>
          <label className="block text-sm font-medium text-slate-700 mb-2">
            Room Type
          </label>
          <select
            value={roomTypeId}
            onChange={(e) => setRoomTypeId(e.target.value)}
            className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-[#c2410c] focus:border-[#c2410c]"
          >
            {roomTypes.map((room) => (
              <option key={room.id} value={room.id}>
                {room.name} - {room.description}
              </option>
            ))}
          </select>
        </div>

        {/* Climate and Conditions */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-2">
              Climate Zone
            </label>
            <select
              value={climateZoneId}
              onChange={(e) => setClimateZoneId(e.target.value)}
              className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-[#c2410c] focus:border-[#c2410c]"
            >
              {climateZones.map((zone) => (
                <option key={zone.id} value={zone.id}>
                  {zone.name}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-2">
              Sun Exposure
            </label>
            <select
              value={sunExposureId}
              onChange={(e) => setSunExposureId(e.target.value)}
              className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-[#c2410c] focus:border-[#c2410c]"
            >
              {sunExposures.map((sun) => (
                <option key={sun.id} value={sun.id}>
                  {sun.name} - {sun.description}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Insulation and Occupants */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-2">
              Insulation Level
            </label>
            <select
              value={insulationId}
              onChange={(e) => setInsulationId(e.target.value)}
              className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-[#c2410c] focus:border-[#c2410c]"
            >
              {insulationLevels.map((ins) => (
                <option key={ins.id} value={ins.id}>
                  {ins.name} - {ins.description}
                </option>
              ))}
            </select>
          </div>
          <CalculatorInput
            type="number"
            id="occupants"
            label="Typical Occupants"
            value={occupants}
            onChange={(e) => setOccupants(parseInt(e.target.value) || 1)}
            unit="people"
            min={1}
            max={20}
            step={1}
          />
        </div>

        {/* Electricity Rate */}
        <CalculatorInput
          type="number"
          id="electricityRate"
          label="Electricity Rate (for cost estimate)"
          value={electricityRate}
          onChange={(e) => setElectricityRate(parseFloat(e.target.value) || 0.15)}
          unit="$/kWh"
          min={0.05}
          max={0.50}
          step={0.01}
        />

        {/* Calculate Button */}
        <button
          onClick={handleCalculate}
          className="w-full sm:w-auto px-8 py-3 bg-[#c2410c] text-white font-semibold rounded-lg hover:bg-[#9a3409] transition-colors"
        >
          Calculate AC Size
        </button>

        {/* Results */}
        <ResultsContainer show={!!result}>
          {result && (
            <>
            <BTUACSizingSVG
              roomSqFt={result.squareFeet}
              baseBTU={result.baseBtu}
              adjustedBTU={result.totalBtu}
              roomType={roomTypes.find(r => r.id === roomTypeId)?.name || 'Room'}
            />
            {/* Primary Recommendation */}
            <div className="bg-orange-50 border border-orange-200 rounded-lg p-4">
              <div className="text-sm text-slate-600 mb-1">
                Recommended AC Capacity
              </div>
              <div className="text-4xl font-bold text-[#c2410c]">
                {result.recommendedSize.toLocaleString()} BTU
              </div>
              <div className="text-sm text-slate-600 mt-2">
                {result.tons.toFixed(2)} tons | Calculated need: {result.totalBtu.toLocaleString()} BTU
              </div>
            </div>

            {/* Alternative Size */}
            {result.alternativeSize && (
              <div className="bg-slate-50 border border-slate-200 rounded-lg p-4">
                <div className="text-sm text-slate-600 mb-1">
                  Consider Also
                </div>
                <div className="text-2xl font-bold text-slate-900">
                  {result.alternativeSize.toLocaleString()} BTU
                </div>
                <div className="text-sm text-slate-500">
                  Next size up if room conditions are challenging
                </div>
              </div>
            )}

            {/* BTU Calculation Breakdown */}
            <div className="bg-slate-50 border border-slate-200 rounded-lg p-4">
              <h4 className="font-semibold text-slate-900 mb-3">
                Calculation Breakdown
              </h4>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-slate-600">
                    Base BTU ({result.squareFeet} sq ft × 20 BTU/sq ft)
                  </span>
                  <span className="font-medium text-slate-900">
                    {result.baseBtu.toLocaleString()} BTU
                  </span>
                </div>
                {result.adjustments.map((adj, index) => (
                  <div key={index} className="flex justify-between">
                    <span className="text-slate-600">{adj.name}</span>
                    <span
                      className={`font-medium ${
                        adj.btuChange > 0 ? 'text-red-600' : 'text-green-600'
                      }`}
                    >
                      {adj.btuChange > 0 ? '+' : ''}
                      {adj.btuChange.toLocaleString()} BTU
                    </span>
                  </div>
                ))}
                <div className="border-t border-slate-300 pt-2 flex justify-between">
                  <span className="font-semibold text-slate-900">Total Required</span>
                  <span className="font-bold text-slate-900">
                    {result.totalBtu.toLocaleString()} BTU
                  </span>
                </div>
              </div>
            </div>

            {/* Cost Estimate */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="border border-slate-200 rounded-lg p-4 bg-white">
                <div className="text-sm text-slate-600 mb-1">
                  Estimated Annual Cost
                </div>
                <div className="text-2xl font-bold text-slate-900">
                  ${result.annualCost.toFixed(0)}
                </div>
                <div className="text-xs text-slate-500 mt-1">
                  8 hrs/day, 120-day season, EER {result.eerTarget}
                </div>
              </div>
              <div className="border border-slate-200 rounded-lg p-4 bg-white">
                <div className="text-sm text-slate-600 mb-1">
                  Target EER Rating
                </div>
                <div className="text-2xl font-bold text-slate-900">
                  {result.eerTarget}+ EER
                </div>
                <div className="text-xs text-slate-500 mt-1">
                  Energy Star minimum: 10.7 EER
                </div>
              </div>
            </div>

            {/* Size Guide */}
            <div>
              <h4 className="font-semibold text-slate-900 mb-3">
                Room AC Size Guide
              </h4>
              <div className="overflow-x-auto">
                <table className="w-full text-sm border border-slate-200 rounded-lg overflow-hidden">
                  <thead className="bg-slate-100">
                    <tr>
                      <th className="text-left px-3 py-2 font-medium text-slate-700">
                        Room Size (sq ft)
                      </th>
                      <th className="text-center px-3 py-2 font-medium text-slate-700">
                        BTU Capacity
                      </th>
                      <th className="text-left px-3 py-2 font-medium text-slate-700">
                        Room Type
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {[
                      { sqft: '100-150', btu: '5,000', type: 'Small bedroom' },
                      { sqft: '150-250', btu: '6,000', type: 'Bedroom' },
                      { sqft: '250-350', btu: '8,000', type: 'Large bedroom' },
                      { sqft: '350-450', btu: '10,000', type: 'Small living room' },
                      { sqft: '450-550', btu: '12,000', type: 'Living room' },
                      { sqft: '550-700', btu: '14,000', type: 'Large living room' },
                      { sqft: '700-1000', btu: '18,000', type: 'Open concept' },
                      { sqft: '1000-1200', btu: '22,000-24,000', type: 'Very large room' },
                    ].map((row, index) => (
                      <tr
                        key={index}
                        className={index % 2 === 0 ? 'bg-white' : 'bg-slate-50'}
                      >
                        <td className="px-3 py-2 text-slate-900">{row.sqft}</td>
                        <td className="text-center px-3 py-2 font-medium text-slate-900">
                          {row.btu}
                        </td>
                        <td className="px-3 py-2 text-slate-600">{row.type}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Tips */}
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
              <h4 className="font-semibold text-slate-900 mb-2">
                Sizing Tips
              </h4>
              <ul className="text-sm text-slate-700 space-y-1 list-disc list-inside">
                <li>
                  An oversized AC cools quickly but doesn&apos;t dehumidify well &mdash;
                  leads to clammy air
                </li>
                <li>
                  An undersized AC runs constantly and won&apos;t reach setpoint on hot
                  days
                </li>
                <li>
                  For kitchens, consider 4,000 BTU additional capacity above
                  calculation
                </li>
                <li>
                  Each additional person beyond 2 adds ~600 BTU load
                </li>
                <li>
                  Look for Energy Star rated units (EER 10.7+) for best efficiency
                </li>
                <li>
                  Portable ACs are typically 30-40% less efficient than window units
                </li>
              </ul>
            </div>

            {/* Warning */}
            <div className="bg-amber-50 border border-amber-200 rounded-lg p-4">
              <h4 className="font-semibold text-amber-800 mb-2">
                Important Notes
              </h4>
              <p className="text-sm text-amber-700">
                This calculator is for room/window AC units only. For central AC
                or whole-house cooling, use our{' '}
                <span className="font-medium">AC Tonnage Calculator</span> which
                uses Manual J methodology with detailed load calculations.
              </p>
            </div>

            {/* Methodology */}
            <div className="text-xs text-slate-500 border-t border-slate-200 pt-4">
              <p className="font-medium mb-1">Calculation Method:</p>
              <p>
                Base calculation: 20 BTU per square foot (Energy Star guideline).
                Adjustments applied for ceiling height, room type, climate zone,
                sun exposure, insulation level, and occupancy. Standard 8-foot
                ceilings used as baseline.
              </p>
              <p className="mt-2">
                Source: Energy Star Room Air Conditioner Sizing Guide, ASHRAE
                simplified residential cooling load methodology.
              </p>
            </div>
            </>
          )}
        </ResultsContainer>
      </div>
    </CalculatorWrapper>
  );
}
