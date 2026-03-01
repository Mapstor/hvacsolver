'use client';

import { useState } from 'react';
import CalculatorWrapper from '../CalculatorWrapper';
import CalculatorInput from '../CalculatorInput';
import { CalculatorResult, ResultsGrid, ResultsTable } from '../CalculatorResult';
import ResultsContainer from '../ResultsContainer';
import DuctSizingSVG from './DuctSizingSVG';

// Standard round duct sizes (inches)
const standardRoundSizes = [4, 5, 6, 7, 8, 9, 10, 12, 14, 16, 18, 20, 24];

// Standard rectangular duct sizes (width x height in inches)
const standardRectSizes = [
  { w: 8, h: 6 },
  { w: 10, h: 6 },
  { w: 10, h: 8 },
  { w: 12, h: 8 },
  { w: 14, h: 8 },
  { w: 12, h: 10 },
  { w: 14, h: 10 },
  { w: 16, h: 10 },
  { w: 16, h: 12 },
  { w: 18, h: 12 },
  { w: 20, h: 12 },
  { w: 20, h: 14 },
  { w: 24, h: 12 },
  { w: 24, h: 14 },
  { w: 24, h: 16 },
];

// Duct type friction loss multipliers
// Source: ACCA Manual D
interface DuctType {
  id: string;
  name: string;
  frictionMultiplier: number;
  description: string;
}

const ductTypes: DuctType[] = [
  {
    id: 'sheet_metal',
    name: 'Sheet Metal (Galvanized)',
    frictionMultiplier: 1.0,
    description: 'Smooth sheet metal duct - baseline friction',
  },
  {
    id: 'flex_duct',
    name: 'Flexible Duct (Fully Extended)',
    frictionMultiplier: 1.5,
    description: 'Insulated flex duct stretched properly',
  },
  {
    id: 'flex_compressed',
    name: 'Flexible Duct (Compressed)',
    frictionMultiplier: 3.0,
    description: 'Flex duct not fully extended - high friction',
  },
  {
    id: 'fiberglass',
    name: 'Fiberglass Duct Board',
    frictionMultiplier: 1.2,
    description: 'Rigid fiberglass duct board',
  },
];

// Fitting equivalent lengths (in feet)
// Source: ACCA Manual D Table 7
interface FittingType {
  id: string;
  name: string;
  equivalentLength: number;
  hint: string;
}

const fittingTypes: FittingType[] = [
  { id: 'elbow_90_round', name: '90° Round Elbow', equivalentLength: 15, hint: 'Sharp turn in round duct' },
  { id: 'elbow_90_rect', name: '90° Rectangular Elbow', equivalentLength: 20, hint: 'Sharp turn in rectangular duct' },
  { id: 'elbow_45', name: '45° Elbow', equivalentLength: 8, hint: 'Gentle angled turn' },
  { id: 'tee_branch', name: 'Tee (Branch)', equivalentLength: 30, hint: 'Air turns 90° off main duct' },
  { id: 'tee_straight', name: 'Tee (Straight Through)', equivalentLength: 5, hint: 'Air continues straight at tee' },
  { id: 'wye', name: 'Wye Fitting', equivalentLength: 10, hint: 'Y-shaped split (45° branches)' },
  { id: 'transition', name: 'Transition/Reducer', equivalentLength: 5, hint: 'Changes duct size or shape' },
  { id: 'boot', name: 'Register Boot', equivalentLength: 25, hint: 'Connects duct to ceiling/wall register' },
  { id: 'damper', name: 'Damper', equivalentLength: 10, hint: 'Adjustable airflow control' },
];

interface FittingCount {
  id: string;
  count: number;
}

interface CalculationResult {
  cfm: number;
  recommendedRoundSize: number;
  recommendedRectSize: { w: number; h: number };
  actualVelocityRound: number;
  actualVelocityRect: number;
  frictionLossPerFoot: number;
  totalEquivalentLength: number;
  totalPressureDrop: number;
  equivalentDiameter: number;
  velocityRating: 'good' | 'warning' | 'bad';
}

function calculateDuctSize(
  cfm: number,
  targetVelocity: number,
  ductLength: number,
  ductTypeId: string,
  fittings: FittingCount[]
): CalculationResult {
  // Calculate required area based on target velocity
  // Formula: Area (sq ft) = CFM / Velocity (FPM)
  // Source: ACCA Manual D, ASHRAE Fundamentals

  const requiredAreaSqFt = cfm / targetVelocity;
  const requiredAreaSqIn = requiredAreaSqFt * 144;

  // Calculate required round duct diameter
  // Area = π × (d/2)² → d = 2 × √(Area/π)
  const requiredDiameterIn = 2 * Math.sqrt(requiredAreaSqIn / Math.PI);

  // Find the next standard size up
  const recommendedRoundSize =
    standardRoundSizes.find((size) => size >= requiredDiameterIn) ||
    standardRoundSizes[standardRoundSizes.length - 1];

  // Calculate actual velocity for the recommended round size
  const actualRoundAreaSqFt = (Math.PI * Math.pow(recommendedRoundSize / 2, 2)) / 144;
  const actualVelocityRound = Math.round(cfm / actualRoundAreaSqFt);

  // Find equivalent rectangular duct
  // Using equal friction method (approximately equal area)
  // Equivalent diameter formula: De = 1.3 × (a×b)^0.625 / (a+b)^0.25
  // Source: ASHRAE Handbook of Fundamentals
  let recommendedRectSize = standardRectSizes[0];
  let minDifference = Infinity;

  for (const size of standardRectSizes) {
    const rectArea = size.w * size.h;
    const equivalentDiameter =
      (1.3 * Math.pow(size.w * size.h, 0.625)) / Math.pow(size.w + size.h, 0.25);

    const difference = Math.abs(equivalentDiameter - recommendedRoundSize);
    if (difference < minDifference && rectArea >= requiredAreaSqIn) {
      minDifference = difference;
      recommendedRectSize = size;
    }
  }

  // Calculate actual velocity for rectangular
  const actualRectAreaSqFt = (recommendedRectSize.w * recommendedRectSize.h) / 144;
  const actualVelocityRect = Math.round(cfm / actualRectAreaSqFt);

  // Calculate equivalent length from fittings
  let totalFittingLength = 0;
  for (const fitting of fittings) {
    const fittingType = fittingTypes.find((f) => f.id === fitting.id);
    if (fittingType) {
      totalFittingLength += fittingType.equivalentLength * fitting.count;
    }
  }

  const totalEquivalentLength = ductLength + totalFittingLength;

  // Calculate friction loss
  // Simplified friction loss formula: ΔP = f × (L/D) × (V²/4005)²
  // Using simplified ACCA Manual D method
  // Source: ACCA Manual D friction rate tables

  const ductType = ductTypes.find((d) => d.id === ductTypeId);
  const frictionMultiplier = ductType?.frictionMultiplier || 1.0;

  // Approximate friction rate (inches WC per 100 ft)
  // For 0.08 in. WC per 100 ft design friction rate (standard residential)
  const baseFrictionRate = 0.08;
  const frictionLossPerFoot = (baseFrictionRate / 100) * frictionMultiplier;

  const totalPressureDrop = frictionLossPerFoot * totalEquivalentLength;

  // Equivalent diameter for rectangular
  const equivalentDiameter =
    (1.3 * Math.pow(recommendedRectSize.w * recommendedRectSize.h, 0.625)) /
    Math.pow(recommendedRectSize.w + recommendedRectSize.h, 0.25);

  // Velocity rating
  let velocityRating: 'good' | 'warning' | 'bad' = 'good';
  if (actualVelocityRound > 900 || actualVelocityRect > 900) {
    velocityRating = 'warning'; // May cause noise
  }
  if (actualVelocityRound > 1100 || actualVelocityRect > 1100) {
    velocityRating = 'bad'; // Too high, will be noisy
  }

  return {
    cfm,
    recommendedRoundSize,
    recommendedRectSize,
    actualVelocityRound,
    actualVelocityRect,
    frictionLossPerFoot: Math.round(frictionLossPerFoot * 10000) / 10000,
    totalEquivalentLength: Math.round(totalEquivalentLength),
    totalPressureDrop: Math.round(totalPressureDrop * 1000) / 1000,
    equivalentDiameter: Math.round(equivalentDiameter * 10) / 10,
    velocityRating,
  };
}

export default function DuctSizingCalculator() {
  const [cfm, setCfm] = useState<number>(400);
  const [targetVelocity, setTargetVelocity] = useState<number>(700);
  const [ductLength, setDuctLength] = useState<number>(25);
  const [ductType, setDuctType] = useState<string>('sheet_metal');
  const [fittings, setFittings] = useState<FittingCount[]>([
    { id: 'elbow_90_round', count: 2 },
    { id: 'boot', count: 1 },
  ]);

  const [result, setResult] = useState<CalculationResult | null>(null);

  const updateFittingCount = (id: string, count: number) => {
    setFittings((prev) => {
      const existing = prev.find((f) => f.id === id);
      if (existing) {
        if (count === 0) {
          return prev.filter((f) => f.id !== id);
        }
        return prev.map((f) => (f.id === id ? { ...f, count } : f));
      } else if (count > 0) {
        return [...prev, { id, count }];
      }
      return prev;
    });
  };

  const getFittingCount = (id: string): number => {
    return fittings.find((f) => f.id === id)?.count || 0;
  };

  const handleCalculate = () => {
    if (cfm <= 0 || targetVelocity <= 0 || ductLength < 0) return;
    const calculated = calculateDuctSize(cfm, targetVelocity, ductLength, ductType, fittings);
    setResult(calculated);
  };

  const totalFittingEL = fittings.reduce((sum, f) => {
    const fittingType = fittingTypes.find((ft) => ft.id === f.id);
    return sum + (fittingType?.equivalentLength || 0) * f.count;
  }, 0);

  return (
    <CalculatorWrapper
      title="Duct Sizing Calculator"
      description="Calculate the correct duct size for your HVAC system using ACCA Manual D methodology. Includes friction loss, equivalent length, and pressure drop calculations."
    >
      <div className="space-y-6">
        {/* Airflow Input */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <CalculatorInput
            type="number"
            id="cfm"
            label="Required Airflow"
            value={cfm}
            onChange={(e) => setCfm(parseFloat(e.target.value) || 0)}
            unit="CFM"
            min={50}
            max={5000}
            step={25}
            helpText="Airflow needed for this duct run"
          />
          <CalculatorInput
            type="number"
            id="targetVelocity"
            label="Target Velocity"
            value={targetVelocity}
            onChange={(e) => setTargetVelocity(parseFloat(e.target.value) || 0)}
            unit="FPM"
            min={300}
            max={1500}
            step={50}
            helpText="600-900 FPM for branch ducts"
          />
        </div>

        {/* Duct Type and Length */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <CalculatorInput
            type="select"
            id="ductType"
            label="Duct Material"
            value={ductType}
            onChange={(e) => setDuctType(e.target.value)}
            options={ductTypes.map((d) => ({
              value: d.id,
              label: d.name,
            }))}
          />
          <CalculatorInput
            type="number"
            id="ductLength"
            label="Straight Duct Length"
            value={ductLength}
            onChange={(e) => setDuctLength(parseFloat(e.target.value) || 0)}
            unit="feet"
            min={0}
            max={500}
            step={5}
          />
        </div>

        {ductTypes.find((d) => d.id === ductType) && (
          <div className="text-sm text-slate-600 bg-slate-50 rounded-lg p-3">
            {ductTypes.find((d) => d.id === ductType)?.description}
            {ductType !== 'sheet_metal' && (
              <span className="text-amber-600 ml-2">
                (Friction multiplier: {ductTypes.find((d) => d.id === ductType)?.frictionMultiplier}×)
              </span>
            )}
          </div>
        )}

        {/* Fittings */}
        <div>
          <h3 className="text-lg font-semibold text-slate-900 mb-3">
            Fittings & Transitions
          </h3>
          <p className="text-sm text-slate-600 mb-2">
            Elbows, boots, and transitions add airflow resistance. Count each fitting in your duct run from the trunk line to the register.
          </p>
          <p className="text-xs text-slate-500 mb-4 bg-slate-50 rounded p-2">
            <strong>Typical residential run:</strong> 2 elbows + 1 register boot. If unsure, use these defaults — they&apos;re already set below. <span className="hidden sm:inline">Hover over a fitting for description.</span>
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
            {fittingTypes.map((fitting) => (
              <div
                key={fitting.id}
                className={`flex items-center gap-3 p-3 border rounded-lg ${
                  getFittingCount(fitting.id) > 0
                    ? 'border-[#c2410c] bg-orange-50'
                    : 'border-slate-200 bg-white'
                }`}
              >
                <div className="flex-1 min-w-0 pr-1" title={fitting.hint}>
                  <div className="text-sm font-medium text-slate-900 truncate">
                    {fitting.name}
                  </div>
                  <div className="text-xs text-slate-500">
                    {fitting.equivalentLength} ft EL
                  </div>
                </div>
                <div className="flex items-center gap-2 flex-shrink-0">
                  <button
                    onClick={() =>
                      updateFittingCount(
                        fitting.id,
                        Math.max(0, getFittingCount(fitting.id) - 1)
                      )
                    }
                    className="w-7 h-7 flex items-center justify-center rounded border border-slate-300 text-slate-600 hover:bg-slate-100"
                  >
                    -
                  </button>
                  <span className="w-6 text-center font-medium">
                    {getFittingCount(fitting.id)}
                  </span>
                  <button
                    onClick={() =>
                      updateFittingCount(fitting.id, getFittingCount(fitting.id) + 1)
                    }
                    className="w-7 h-7 flex items-center justify-center rounded border border-slate-300 text-slate-600 hover:bg-slate-100"
                  >
                    +
                  </button>
                </div>
              </div>
            ))}
          </div>
          <div className="mt-3 text-sm text-slate-600">
            Total equivalent length from fittings:{' '}
            <span className="font-semibold">{totalFittingEL} feet</span>
          </div>
        </div>

        {/* Calculate Button */}
        <button
          onClick={handleCalculate}
          className="w-full sm:w-auto px-8 py-3 bg-[#c2410c] text-white font-semibold rounded-lg hover:bg-[#9a3409] transition-colors"
        >
          Calculate Duct Size
        </button>

        {/* Results */}
        <ResultsContainer show={!!result}>
          {result && (
            <>
            {/* Duct Visualization */}
            <DuctSizingSVG
              cfm={result.cfm}
              ductDiameter={result.recommendedRoundSize}
              velocity={result.actualVelocityRound}
              frictionLoss={result.frictionLossPerFoot}
              ductType="round"
              width={result.recommendedRectSize.w}
              height={result.recommendedRectSize.h}
            />

            {/* Primary Recommendations */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="bg-orange-50 border border-orange-200 rounded-lg p-4">
                <div className="text-sm text-slate-600 mb-1">Round Duct</div>
                <div className="text-4xl font-bold text-[#c2410c]">
                  {result.recommendedRoundSize}&quot;
                </div>
                <div className="text-sm text-slate-600 mt-2">
                  Velocity: {result.actualVelocityRound.toLocaleString()} FPM
                </div>
              </div>
              <div className="bg-slate-50 border border-slate-200 rounded-lg p-4">
                <div className="text-sm text-slate-600 mb-1">Rectangular Duct</div>
                <div className="text-4xl font-bold text-slate-900">
                  {result.recommendedRectSize.w}&quot; × {result.recommendedRectSize.h}&quot;
                </div>
                <div className="text-sm text-slate-600 mt-2">
                  Velocity: {result.actualVelocityRect.toLocaleString()} FPM
                  <span className="text-slate-400 ml-2">
                    (De = {result.equivalentDiameter}&quot;)
                  </span>
                </div>
              </div>
            </div>

            {/* Velocity Assessment */}
            <div
              className={`border rounded-lg p-4 ${
                result.velocityRating === 'good'
                  ? 'bg-green-50 border-green-200'
                  : result.velocityRating === 'warning'
                  ? 'bg-amber-50 border-amber-200'
                  : 'bg-red-50 border-red-200'
              }`}
            >
              <div
                className={`font-semibold ${
                  result.velocityRating === 'good'
                    ? 'text-green-700'
                    : result.velocityRating === 'warning'
                    ? 'text-amber-700'
                    : 'text-red-700'
                }`}
              >
                {result.velocityRating === 'good' && 'Velocity is within acceptable range'}
                {result.velocityRating === 'warning' &&
                  'Velocity may cause some noise — consider larger duct'}
                {result.velocityRating === 'bad' &&
                  'Velocity too high — will cause noise, use larger duct'}
              </div>
              <div className="text-sm text-slate-600 mt-1">
                Recommended branch duct velocity: 600-900 FPM. Main ducts: 700-1000 FPM.
              </div>
            </div>

            {/* Pressure Drop */}
            <div>
              <h4 className="font-semibold text-slate-900 mb-3">
                Pressure Drop Analysis
              </h4>
              <ResultsTable
                rows={[
                  {
                    label: 'Straight Duct Length',
                    value: ductLength,
                    unit: 'ft',
                  },
                  {
                    label: 'Equivalent Length (Fittings)',
                    value: totalFittingEL,
                    unit: 'ft',
                  },
                  {
                    label: 'Total Equivalent Length',
                    value: result.totalEquivalentLength,
                    unit: 'ft',
                  },
                  {
                    label: 'Friction Loss Rate',
                    value: `${result.frictionLossPerFoot * 100}`,
                    unit: 'in. WC / 100 ft',
                  },
                  {
                    label: 'Total Pressure Drop',
                    value: result.totalPressureDrop,
                    unit: 'in. WC',
                    highlight:
                      result.totalPressureDrop > 0.1
                        ? 'warning'
                        : result.totalPressureDrop > 0.15
                        ? 'bad'
                        : undefined,
                  },
                ]}
              />
            </div>

            {/* Duct Size Reference Table */}
            <div className="bg-slate-50 border border-slate-200 rounded-lg p-4">
              <h4 className="font-semibold text-slate-900 mb-3">
                Quick Reference — CFM Capacity
              </h4>
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="bg-[#1e3a5f] text-white">
                      <th className="py-2 px-3 text-left">Round Duct</th>
                      <th className="py-2 px-3 text-right">CFM @ 700 FPM</th>
                      <th className="py-2 px-3 text-right">CFM @ 900 FPM</th>
                    </tr>
                  </thead>
                  <tbody>
                    {[6, 7, 8, 9, 10, 12, 14, 16].map((size, i) => {
                      const areaSqFt = (Math.PI * Math.pow(size / 2, 2)) / 144;
                      const cfm700 = Math.round(areaSqFt * 700);
                      const cfm900 = Math.round(areaSqFt * 900);
                      const isRecommended = size === result.recommendedRoundSize;
                      return (
                        <tr
                          key={size}
                          className={`${i % 2 === 0 ? 'bg-white' : 'bg-slate-100'} ${
                            isRecommended ? 'bg-orange-100 font-semibold' : ''
                          }`}
                        >
                          <td className="py-2 px-3">{size}&quot; diameter</td>
                          <td className="py-2 px-3 text-right font-mono">{cfm700}</td>
                          <td className="py-2 px-3 text-right font-mono">{cfm900}</td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Methodology note */}
            <div className="text-xs text-slate-500 border-t border-slate-200 pt-4">
              <p className="font-medium mb-1">Calculation Standards:</p>
              <p>
                Duct sizing follows ACCA Manual D methodology. Friction rate based on 0.08 in. WC
                per 100 ft design standard. Rectangular equivalent diameter uses ASHRAE formula:
                De = 1.3 × (a×b)^0.625 / (a+b)^0.25. Fitting equivalent lengths from ACCA Manual D
                Table 7.
              </p>
            </div>
            </>
          )}
        </ResultsContainer>
      </div>
    </CalculatorWrapper>
  );
}
