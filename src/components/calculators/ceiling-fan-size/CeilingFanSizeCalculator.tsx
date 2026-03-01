'use client';

import { useState } from 'react';
import CalculatorWrapper from '../CalculatorWrapper';
import CalculatorInput from '../CalculatorInput';
import { ResultsTable } from '../CalculatorResult';
import ResultsContainer from '../ResultsContainer';
import CeilingFanSizeSVG from './CeilingFanSizeSVG';

// Ceiling fan sizing guide
// Source: Energy Star, AMCA (Air Movement and Control Association), manufacturer guidelines
interface FanSizeRange {
  minSqFt: number;
  maxSqFt: number;
  bladeDiameter: number;
  bladeSpan: string;
  cfmRange: { min: number; max: number };
  roomExamples: string;
}

const fanSizeRanges: FanSizeRange[] = [
  {
    minSqFt: 0,
    maxSqFt: 75,
    bladeDiameter: 29,
    bladeSpan: '29" or smaller',
    cfmRange: { min: 1000, max: 2500 },
    roomExamples: 'Small bathroom, walk-in closet',
  },
  {
    minSqFt: 76,
    maxSqFt: 100,
    bladeDiameter: 36,
    bladeSpan: '36"',
    cfmRange: { min: 2000, max: 3500 },
    roomExamples: 'Large bathroom, utility room',
  },
  {
    minSqFt: 101,
    maxSqFt: 150,
    bladeDiameter: 42,
    bladeSpan: '42"',
    cfmRange: { min: 3000, max: 4500 },
    roomExamples: 'Small bedroom, home office',
  },
  {
    minSqFt: 151,
    maxSqFt: 225,
    bladeDiameter: 44,
    bladeSpan: '44"',
    cfmRange: { min: 4000, max: 5500 },
    roomExamples: 'Standard bedroom, small living room',
  },
  {
    minSqFt: 226,
    maxSqFt: 300,
    bladeDiameter: 52,
    bladeSpan: '50"-54"',
    cfmRange: { min: 5000, max: 7000 },
    roomExamples: 'Master bedroom, dining room, medium living room',
  },
  {
    minSqFt: 301,
    maxSqFt: 400,
    bladeDiameter: 60,
    bladeSpan: '56"-60"',
    cfmRange: { min: 6500, max: 9000 },
    roomExamples: 'Large living room, great room',
  },
  {
    minSqFt: 401,
    maxSqFt: 500,
    bladeDiameter: 72,
    bladeSpan: '62"-72"',
    cfmRange: { min: 8000, max: 12000 },
    roomExamples: 'Very large room, open concept',
  },
  {
    minSqFt: 501,
    maxSqFt: 1000,
    bladeDiameter: 84,
    bladeSpan: '72"+ or multiple fans',
    cfmRange: { min: 10000, max: 20000 },
    roomExamples: 'Great room, commercial space',
  },
];

// Ceiling height mount type recommendations
interface MountType {
  heightRange: { min: number; max: number };
  mountName: string;
  description: string;
  bladeHeight: string;
}

const mountTypes: MountType[] = [
  {
    heightRange: { min: 0, max: 7.5 },
    mountName: 'Hugger/Flush Mount',
    description: 'Fan mounts directly to ceiling with no downrod',
    bladeHeight: '7-8 feet from floor',
  },
  {
    heightRange: { min: 7.5, max: 9 },
    mountName: 'Standard Mount',
    description: 'Short 3-6" downrod included with most fans',
    bladeHeight: '7-8 feet from floor',
  },
  {
    heightRange: { min: 9, max: 10 },
    mountName: 'Extended Downrod',
    description: '12" downrod recommended',
    bladeHeight: '8-9 feet from floor',
  },
  {
    heightRange: { min: 10, max: 12 },
    mountName: 'Long Downrod',
    description: '18-24" downrod recommended',
    bladeHeight: '8-9 feet from floor',
  },
  {
    heightRange: { min: 12, max: 15 },
    mountName: 'Extra Long Downrod',
    description: '36-48" downrod recommended',
    bladeHeight: '8-9 feet from floor',
  },
  {
    heightRange: { min: 15, max: 100 },
    mountName: 'Custom/Commercial',
    description: 'Custom downrod length required, calculate for 8-9 ft blade height',
    bladeHeight: '8-9 feet from floor',
  },
];

interface CalculationResult {
  squareFeet: number;
  recommendedSize: FanSizeRange;
  alternativeSize: FanSizeRange | null;
  mountType: MountType;
  downrodLength: number;
  bladeHeightFromFloor: number;
  energyStarCfm: number;
  multipleFansNeeded: boolean;
  numberOfFans: number;
}

function calculateCeilingFanSize(
  lengthFt: number,
  widthFt: number,
  ceilingHeight: number
): CalculationResult {
  // Ceiling fan sizing based on room square footage
  // Source: Energy Star, ceiling fan manufacturer guidelines

  const squareFeet = lengthFt * widthFt;

  // Find recommended fan size
  let recommendedSize = fanSizeRanges.find(
    (range) => squareFeet >= range.minSqFt && squareFeet <= range.maxSqFt
  );

  // Default to largest if room exceeds table
  if (!recommendedSize) {
    recommendedSize = fanSizeRanges[fanSizeRanges.length - 1];
  }

  // Find alternative size (one size up if available and room is in upper half of range)
  let alternativeSize: FanSizeRange | null = null;
  const rangeIndex = fanSizeRanges.indexOf(recommendedSize);
  if (rangeIndex < fanSizeRanges.length - 1) {
    const rangeMidpoint =
      (recommendedSize.minSqFt + recommendedSize.maxSqFt) / 2;
    if (squareFeet > rangeMidpoint) {
      alternativeSize = fanSizeRanges[rangeIndex + 1];
    }
  }

  // Find mount type based on ceiling height
  let mountType = mountTypes.find(
    (mount) =>
      ceilingHeight >= mount.heightRange.min &&
      ceilingHeight < mount.heightRange.max
  );

  if (!mountType) {
    mountType = mountTypes[mountTypes.length - 1];
  }

  // Calculate optimal downrod length
  // Optimal blade height: 7-9 feet from floor
  // Typical fan housing height: 12-18 inches (using 14" average)
  const fanHousingHeight = 14 / 12; // Convert to feet
  const targetBladeHeight = 8; // 8 feet from floor is optimal
  let downrodLength = (ceilingHeight - targetBladeHeight - fanHousingHeight) * 12; // Convert to inches

  // Adjust for low ceilings
  if (downrodLength < 0) {
    downrodLength = 0; // Hugger mount
  }

  const bladeHeightFromFloor = ceilingHeight - (downrodLength / 12) - fanHousingHeight;

  // Energy Star minimum CFM per watt requirements
  // Large fans (52"+): 75 CFM/watt at high speed
  const energyStarCfm = recommendedSize.cfmRange.min;

  // Check if multiple fans needed for large/long rooms
  const roomLongestDimension = Math.max(lengthFt, widthFt);
  const aspectRatio = Math.max(lengthFt, widthFt) / Math.min(lengthFt, widthFt);
  const multipleFansNeeded = squareFeet > 400 || (aspectRatio > 2 && squareFeet > 225);

  let numberOfFans = 1;
  if (multipleFansNeeded) {
    // Rule of thumb: one fan per 400 sq ft for optimal coverage
    numberOfFans = Math.ceil(squareFeet / 400);
    // For long narrow rooms, space fans along the length
    if (aspectRatio > 2) {
      numberOfFans = Math.max(numberOfFans, Math.ceil(roomLongestDimension / 20));
    }
  }

  return {
    squareFeet,
    recommendedSize,
    alternativeSize,
    mountType,
    downrodLength: Math.round(downrodLength),
    bladeHeightFromFloor: Math.round(bladeHeightFromFloor * 10) / 10,
    energyStarCfm,
    multipleFansNeeded,
    numberOfFans,
  };
}

export default function CeilingFanSizeCalculator() {
  const [length, setLength] = useState<number>(16);
  const [width, setWidth] = useState<number>(14);
  const [ceilingHeight, setCeilingHeight] = useState<number>(9);

  const [result, setResult] = useState<CalculationResult | null>(null);

  const handleCalculate = () => {
    if (length <= 0 || width <= 0 || ceilingHeight <= 0) return;
    const calculated = calculateCeilingFanSize(length, width, ceilingHeight);
    setResult(calculated);
  };

  const squareFeet = length * width;

  return (
    <CalculatorWrapper
      title="Ceiling Fan Size Calculator"
      description="Determine the correct ceiling fan blade span for your room size, plus mounting recommendations based on ceiling height. Based on Energy Star and AMCA guidelines."
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
              label="Room Length"
              value={length}
              onChange={(e) => setLength(parseFloat(e.target.value) || 0)}
              unit="feet"
              min={3}
              max={100}
              step={1}
            />
            <CalculatorInput
              type="number"
              id="width"
              label="Room Width"
              value={width}
              onChange={(e) => setWidth(parseFloat(e.target.value) || 0)}
              unit="feet"
              min={3}
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
              max={30}
              step={0.5}
            />
          </div>
          <div className="mt-2 text-sm text-slate-600">
            Room size: <span className="font-semibold">{squareFeet} sq ft</span>
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
            {/* Ceiling Fan Visualization */}
            <CeilingFanSizeSVG
              roomWidth={width}
              roomLength={length}
              recommendedSize={result.recommendedSize.bladeDiameter}
              roomSqFt={result.squareFeet}
              mountType={result.mountType.mountName.toLowerCase().includes('flush') ? 'flush' :
                        result.mountType.mountName.toLowerCase().includes('extended') ? 'extended' : 'standard'}
            />

            {/* Primary Recommendation */}
            <div className="bg-orange-50 border border-orange-200 rounded-lg p-4">
              <div className="text-sm text-slate-600 mb-1">
                Recommended Ceiling Fan Size
              </div>
              <div className="text-4xl font-bold text-[#c2410c]">
                {result.recommendedSize.bladeSpan}
              </div>
              <div className="text-sm text-slate-600 mt-2">
                {result.recommendedSize.roomExamples}
              </div>
            </div>

            {/* Multiple Fans Warning */}
            {result.multipleFansNeeded && (
              <div className="bg-amber-50 border border-amber-200 rounded-lg p-4">
                <h4 className="font-semibold text-amber-800 mb-2">
                  Consider Multiple Fans
                </h4>
                <p className="text-sm text-amber-700">
                  Your room is large or has an irregular shape. For optimal air
                  circulation, consider installing{' '}
                  <span className="font-bold">{result.numberOfFans} fans</span>{' '}
                  instead of one larger fan. Space them evenly throughout the
                  room.
                </p>
              </div>
            )}

            {/* Size Comparison */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="border border-green-300 bg-green-50 rounded-lg p-4">
                <h4 className="font-semibold text-slate-900 mb-2 flex items-center gap-2">
                  Recommended
                  <span className="text-xs bg-green-600 text-white px-2 py-0.5 rounded">
                    Best Fit
                  </span>
                </h4>
                <div className="text-2xl font-bold text-slate-900">
                  {result.recommendedSize.bladeSpan}
                </div>
                <div className="text-sm text-slate-600 mt-2">
                  {result.recommendedSize.cfmRange.min.toLocaleString()} -{' '}
                  {result.recommendedSize.cfmRange.max.toLocaleString()} CFM
                </div>
                <div className="text-xs text-slate-500 mt-1">
                  For rooms {result.recommendedSize.minSqFt}-
                  {result.recommendedSize.maxSqFt} sq ft
                </div>
              </div>

              {result.alternativeSize && (
                <div className="border border-slate-200 bg-white rounded-lg p-4">
                  <h4 className="font-semibold text-slate-900 mb-2">
                    Alternative (Size Up)
                  </h4>
                  <div className="text-2xl font-bold text-slate-900">
                    {result.alternativeSize.bladeSpan}
                  </div>
                  <div className="text-sm text-slate-600 mt-2">
                    {result.alternativeSize.cfmRange.min.toLocaleString()} -{' '}
                    {result.alternativeSize.cfmRange.max.toLocaleString()} CFM
                  </div>
                  <div className="text-xs text-slate-500 mt-1">
                    Better for rooms with high ceilings or furniture obstructions
                  </div>
                </div>
              )}
            </div>

            {/* Mount Type */}
            <div className="bg-slate-50 border border-slate-200 rounded-lg p-4">
              <h4 className="font-semibold text-slate-900 mb-3">
                Mounting Recommendation
              </h4>
              <ResultsTable
                rows={[
                  {
                    label: 'Mount Type',
                    value: result.mountType.mountName,
                    unit: '',
                  },
                  {
                    label: 'Description',
                    value: result.mountType.description,
                    unit: '',
                  },
                  {
                    label: 'Recommended Downrod',
                    value: result.downrodLength === 0 ? 'None (hugger mount)' : result.downrodLength,
                    unit: result.downrodLength === 0 ? '' : 'inches',
                  },
                  {
                    label: 'Blade Height from Floor',
                    value: result.bladeHeightFromFloor,
                    unit: 'feet',
                  },
                ]}
              />
              <div className="mt-3 text-xs text-slate-500">
                Optimal blade height: 7-9 feet from floor. For safety, blades
                should be at least 7 feet from the floor.
              </div>
            </div>

            {/* Fan Size Guide */}
            <div>
              <h4 className="font-semibold text-slate-900 mb-3">
                Ceiling Fan Size Guide
              </h4>
              <div className="overflow-x-auto">
                <table className="w-full text-sm border border-slate-200 rounded-lg overflow-hidden">
                  <thead className="bg-slate-100">
                    <tr>
                      <th className="text-left px-3 py-2 font-medium text-slate-700">
                        Room Size
                      </th>
                      <th className="text-center px-3 py-2 font-medium text-slate-700">
                        Fan Size
                      </th>
                      <th className="text-center px-3 py-2 font-medium text-slate-700">
                        CFM Range
                      </th>
                      <th className="text-left px-3 py-2 font-medium text-slate-700">
                        Room Type
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {fanSizeRanges.map((range, index) => (
                      <tr
                        key={index}
                        className={`${
                          index % 2 === 0 ? 'bg-white' : 'bg-slate-50'
                        } ${
                          result.squareFeet >= range.minSqFt &&
                          result.squareFeet <= range.maxSqFt
                            ? 'ring-2 ring-[#c2410c] ring-inset'
                            : ''
                        }`}
                      >
                        <td className="px-3 py-2 text-slate-900">
                          {range.minSqFt}-{range.maxSqFt} sq ft
                        </td>
                        <td className="text-center px-3 py-2 font-medium text-slate-900">
                          {range.bladeSpan}
                        </td>
                        <td className="text-center px-3 py-2 text-slate-600">
                          {range.cfmRange.min.toLocaleString()}-
                          {range.cfmRange.max.toLocaleString()}
                        </td>
                        <td className="px-3 py-2 text-slate-600 text-xs">
                          {range.roomExamples}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Tips */}
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
              <h4 className="font-semibold text-slate-900 mb-2">
                Selection Tips
              </h4>
              <ul className="text-sm text-slate-700 space-y-1 list-disc list-inside">
                <li>
                  When in doubt, size up &mdash; a larger fan can run slower and
                  quieter while moving the same air
                </li>
                <li>
                  For rooms with high ceilings (10&apos;+), consider sizing up one
                  category for better air movement at floor level
                </li>
                <li>
                  Look for Energy Star certified fans &mdash; they are 60% more
                  efficient than standard fans
                </li>
                <li>
                  Minimum 18&quot; clearance between blade tips and walls/furniture
                </li>
                <li>
                  For sleeping areas, prioritize quiet operation (DC motors are
                  quieter than AC)
                </li>
                <li>
                  Reverse function (clockwise in winter) helps distribute warm
                  air from ceiling
                </li>
              </ul>
            </div>

            {/* CFM/Watt Reference */}
            <div className="text-xs text-slate-500 border-t border-slate-200 pt-4">
              <p className="font-medium mb-1">Energy Star Requirements:</p>
              <p>
                Large fans (52&quot;+): minimum 75 CFM/watt at high speed. Small fans
                (under 52&quot;): minimum 155 CFM/watt. Look for fans exceeding these
                minimums for maximum efficiency.
              </p>
              <p className="mt-2">
                Source: Energy Star ceiling fan specifications, AMCA (Air
                Movement and Control Association) standards.
              </p>
            </div>
            </>
          )}
        </ResultsContainer>
      </div>
    </CalculatorWrapper>
  );
}
