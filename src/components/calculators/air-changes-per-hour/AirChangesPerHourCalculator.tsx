'use client';

import { useState } from 'react';
import CalculatorWrapper from '../CalculatorWrapper';
import CalculatorInput from '../CalculatorInput';
import { CalculatorResult, ResultsGrid, ResultsTable } from '../CalculatorResult';
import ResultsContainer from '../ResultsContainer';
import AirChangesPerHourSVG from './AirChangesPerHourSVG';

// Room type ACH recommendations
// Source: ASHRAE 62.1/62.2, OSHA, CDC, and industry standards
interface RoomType {
  id: string;
  name: string;
  category: string;
  minAch: number;
  recommendedAch: number;
  maxAch: number;
  description: string;
}

const roomTypes: RoomType[] = [
  // Residential
  {
    id: 'bedroom',
    name: 'Bedroom',
    category: 'Residential',
    minAch: 4,
    recommendedAch: 6,
    maxAch: 8,
    description: 'Per ASHRAE 62.2 residential ventilation',
  },
  {
    id: 'living_room',
    name: 'Living Room',
    category: 'Residential',
    minAch: 4,
    recommendedAch: 6,
    maxAch: 8,
    description: 'Standard residential occupied space',
  },
  {
    id: 'kitchen_residential',
    name: 'Kitchen (Residential)',
    category: 'Residential',
    minAch: 7,
    recommendedAch: 10,
    maxAch: 15,
    description: 'Higher ACH for cooking odors and moisture',
  },
  {
    id: 'bathroom',
    name: 'Bathroom',
    category: 'Residential',
    minAch: 6,
    recommendedAch: 8,
    maxAch: 10,
    description: 'Per HVI guidelines for moisture control',
  },
  {
    id: 'garage',
    name: 'Garage',
    category: 'Residential',
    minAch: 4,
    recommendedAch: 6,
    maxAch: 10,
    description: 'For vehicle exhaust and fumes',
  },
  {
    id: 'basement',
    name: 'Basement',
    category: 'Residential',
    minAch: 3,
    recommendedAch: 4,
    maxAch: 6,
    description: 'For radon and moisture mitigation',
  },
  // Commercial
  {
    id: 'office',
    name: 'Office',
    category: 'Commercial',
    minAch: 4,
    recommendedAch: 6,
    maxAch: 10,
    description: 'Per ASHRAE 62.1 commercial ventilation',
  },
  {
    id: 'conference_room',
    name: 'Conference Room',
    category: 'Commercial',
    minAch: 6,
    recommendedAch: 8,
    maxAch: 12,
    description: 'Higher occupancy density',
  },
  {
    id: 'classroom',
    name: 'Classroom',
    category: 'Commercial',
    minAch: 6,
    recommendedAch: 8,
    maxAch: 12,
    description: 'Per ASHRAE 62.1 educational facilities',
  },
  {
    id: 'restaurant',
    name: 'Restaurant/Dining',
    category: 'Commercial',
    minAch: 8,
    recommendedAch: 12,
    maxAch: 15,
    description: 'For food odors and high occupancy',
  },
  {
    id: 'kitchen_commercial',
    name: 'Kitchen (Commercial)',
    category: 'Commercial',
    minAch: 15,
    recommendedAch: 20,
    maxAch: 30,
    description: 'Per IMC for commercial cooking',
  },
  {
    id: 'gym',
    name: 'Gym/Fitness',
    category: 'Commercial',
    minAch: 6,
    recommendedAch: 10,
    maxAch: 15,
    description: 'For body odor and CO2 control',
  },
  {
    id: 'retail',
    name: 'Retail Store',
    category: 'Commercial',
    minAch: 6,
    recommendedAch: 8,
    maxAch: 12,
    description: 'Per ASHRAE 62.1 retail spaces',
  },
  // Healthcare
  {
    id: 'patient_room',
    name: 'Patient Room',
    category: 'Healthcare',
    minAch: 4,
    recommendedAch: 6,
    maxAch: 8,
    description: 'Per ASHRAE 170 healthcare ventilation',
  },
  {
    id: 'exam_room',
    name: 'Exam/Treatment Room',
    category: 'Healthcare',
    minAch: 6,
    recommendedAch: 8,
    maxAch: 10,
    description: 'Per ASHRAE 170 standards',
  },
  {
    id: 'operating_room',
    name: 'Operating Room',
    category: 'Healthcare',
    minAch: 15,
    recommendedAch: 20,
    maxAch: 25,
    description: 'Strict infection control requirements',
  },
  {
    id: 'isolation_room',
    name: 'Isolation Room',
    category: 'Healthcare',
    minAch: 12,
    recommendedAch: 15,
    maxAch: 20,
    description: 'Negative pressure with high ACH',
  },
  // Industrial/Special
  {
    id: 'laboratory',
    name: 'Laboratory',
    category: 'Industrial',
    minAch: 6,
    recommendedAch: 10,
    maxAch: 15,
    description: 'Varies by hazard level',
  },
  {
    id: 'warehouse',
    name: 'Warehouse',
    category: 'Industrial',
    minAch: 1,
    recommendedAch: 2,
    maxAch: 4,
    description: 'Low occupancy storage spaces',
  },
  {
    id: 'cleanroom',
    name: 'Cleanroom (ISO 7)',
    category: 'Industrial',
    minAch: 30,
    recommendedAch: 60,
    maxAch: 100,
    description: 'Particle count controlled environment',
  },
];

type CalculationMode = 'ach_from_cfm' | 'cfm_from_ach';

interface CalculationResult {
  mode: CalculationMode;
  roomVolume: number;
  // ACH from CFM mode
  currentAch?: number;
  // CFM from ACH mode
  requiredCfm?: number;
  targetAch?: number;
  recommendedDuctSize?: string;
  // Room type comparison
  roomType?: RoomType;
  meetsMinimum?: boolean;
  meetsRecommended?: boolean;
  // Time metrics
  airTurnoverMinutes: number;
  completeExchangeTime: number;
}

// Duct sizing based on CFM and velocity
// Source: ACCA Manual D, typical supply duct velocity 700-900 FPM
function getRecommendedDuctSize(cfm: number): string {
  // Standard round duct sizes with typical CFM capacity at ~800 FPM
  const ductSizes = [
    { diameter: 4, maxCfm: 55 },
    { diameter: 5, maxCfm: 90 },
    { diameter: 6, maxCfm: 130 },
    { diameter: 7, maxCfm: 180 },
    { diameter: 8, maxCfm: 240 },
    { diameter: 9, maxCfm: 320 },
    { diameter: 10, maxCfm: 400 },
    { diameter: 12, maxCfm: 580 },
    { diameter: 14, maxCfm: 800 },
    { diameter: 16, maxCfm: 1050 },
    { diameter: 18, maxCfm: 1350 },
    { diameter: 20, maxCfm: 1700 },
  ];

  const suitable = ductSizes.find((d) => cfm <= d.maxCfm);
  if (suitable) {
    return `${suitable.diameter}" round duct`;
  }
  // For very high CFM, suggest multiple ducts or rectangular
  const numDucts = Math.ceil(cfm / 1700);
  return `${numDucts}× 20" round or equivalent rectangular duct`;
}

function calculateACH(
  lengthFt: number,
  widthFt: number,
  heightFt: number,
  mode: CalculationMode,
  cfm: number,
  targetAch: number,
  roomTypeId: string
): CalculationResult {
  // Formula: ACH = (CFM × 60) / Room Volume
  // Source: ASHRAE Handbook of Fundamentals, Chapter 16

  const roomVolume = lengthFt * widthFt * heightFt;
  const roomType = roomTypes.find((r) => r.id === roomTypeId);

  if (mode === 'ach_from_cfm') {
    // Calculate ACH from known CFM
    const currentAch = (cfm * 60) / roomVolume;
    const airTurnoverMinutes = 60 / currentAch;
    const completeExchangeTime = airTurnoverMinutes * 3; // ~95% air replaced after 3 ACH cycles

    return {
      mode,
      roomVolume,
      currentAch,
      roomType,
      meetsMinimum: roomType ? currentAch >= roomType.minAch : undefined,
      meetsRecommended: roomType ? currentAch >= roomType.recommendedAch : undefined,
      airTurnoverMinutes,
      completeExchangeTime,
    };
  } else {
    // Calculate CFM needed for target ACH
    const requiredCfm = (targetAch * roomVolume) / 60;
    const airTurnoverMinutes = 60 / targetAch;
    const completeExchangeTime = airTurnoverMinutes * 3;
    const recommendedDuctSize = getRecommendedDuctSize(requiredCfm);

    return {
      mode,
      roomVolume,
      requiredCfm,
      targetAch,
      recommendedDuctSize,
      roomType,
      airTurnoverMinutes,
      completeExchangeTime,
    };
  }
}

export default function AirChangesPerHourCalculator() {
  const [mode, setMode] = useState<CalculationMode>('ach_from_cfm');
  const [length, setLength] = useState<number>(20);
  const [width, setWidth] = useState<number>(15);
  const [height, setHeight] = useState<number>(9);
  const [cfm, setCfm] = useState<number>(400);
  const [targetAch, setTargetAch] = useState<number>(6);
  const [roomTypeId, setRoomTypeId] = useState<string>('office');

  const [result, setResult] = useState<CalculationResult | null>(null);

  const handleCalculate = () => {
    if (length <= 0 || width <= 0 || height <= 0) return;
    if (mode === 'ach_from_cfm' && cfm <= 0) return;
    if (mode === 'cfm_from_ach' && targetAch <= 0) return;

    const calculated = calculateACH(
      length,
      width,
      height,
      mode,
      cfm,
      targetAch,
      roomTypeId
    );
    setResult(calculated);
  };

  const roomVolume = length * width * height;
  const selectedRoomType = roomTypes.find((r) => r.id === roomTypeId);

  // Group room types by category
  const categories = [...new Set(roomTypes.map((r) => r.category))];

  return (
    <CalculatorWrapper
      title="Air Changes Per Hour (ACH) Calculator"
      description="Calculate room ACH from airflow rate or determine required CFM for target air change rate. Based on ASHRAE 62.1/62.2 ventilation standards."
    >
      <div className="space-y-6">
        {/* Mode Selection */}
        <div>
          <label className="block text-sm font-medium text-slate-700 mb-2">
            Calculation Mode
          </label>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <button
              type="button"
              onClick={() => setMode('ach_from_cfm')}
              className={`px-4 py-3 text-left border rounded-lg transition-colors ${
                mode === 'ach_from_cfm'
                  ? 'border-[#c2410c] bg-orange-50 text-slate-900'
                  : 'border-slate-200 bg-white text-slate-600 hover:border-slate-300'
              }`}
            >
              <div className="font-medium">Calculate ACH from CFM</div>
              <div className="text-sm text-slate-500">
                I know my airflow rate, calculate air changes per hour
              </div>
            </button>
            <button
              type="button"
              onClick={() => setMode('cfm_from_ach')}
              className={`px-4 py-3 text-left border rounded-lg transition-colors ${
                mode === 'cfm_from_ach'
                  ? 'border-[#c2410c] bg-orange-50 text-slate-900'
                  : 'border-slate-200 bg-white text-slate-600 hover:border-slate-300'
              }`}
            >
              <div className="font-medium">Calculate CFM from ACH</div>
              <div className="text-sm text-slate-500">
                I need a target ACH, calculate required airflow
              </div>
            </button>
          </div>
        </div>

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
              max={500}
              step={1}
            />
            <CalculatorInput
              type="number"
              id="width"
              label="Width"
              value={width}
              onChange={(e) => setWidth(parseFloat(e.target.value) || 0)}
              unit="feet"
              min={1}
              max={500}
              step={1}
            />
            <CalculatorInput
              type="number"
              id="height"
              label="Ceiling Height"
              value={height}
              onChange={(e) => setHeight(parseFloat(e.target.value) || 0)}
              unit="feet"
              min={6}
              max={50}
              step={0.5}
            />
          </div>
          <div className="mt-2 text-sm text-slate-600">
            Room volume: <span className="font-semibold">{roomVolume.toLocaleString()} cu ft</span>
          </div>
        </div>

        {/* Room Type Selection */}
        <div>
          <label className="block text-sm font-medium text-slate-700 mb-2">
            Room Type (for reference)
          </label>
          <select
            value={roomTypeId}
            onChange={(e) => setRoomTypeId(e.target.value)}
            className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-[#c2410c] focus:border-[#c2410c]"
          >
            {categories.map((category) => (
              <optgroup key={category} label={category}>
                {roomTypes
                  .filter((r) => r.category === category)
                  .map((room) => (
                    <option key={room.id} value={room.id}>
                      {room.name} ({room.minAch}-{room.recommendedAch} ACH)
                    </option>
                  ))}
              </optgroup>
            ))}
          </select>
          {selectedRoomType && (
            <div className="mt-2 text-sm text-slate-600">
              {selectedRoomType.description}
            </div>
          )}
        </div>

        {/* Mode-specific inputs */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {mode === 'ach_from_cfm' ? (
            <CalculatorInput
              type="number"
              id="cfm"
              label="Airflow Rate"
              value={cfm}
              onChange={(e) => setCfm(parseFloat(e.target.value) || 0)}
              unit="CFM"
              min={10}
              max={50000}
              step={10}
            />
          ) : (
            <CalculatorInput
              type="number"
              id="targetAch"
              label="Target Air Changes Per Hour"
              value={targetAch}
              onChange={(e) => setTargetAch(parseFloat(e.target.value) || 0)}
              unit="ACH"
              min={0.5}
              max={100}
              step={0.5}
            />
          )}
        </div>

        {/* Calculate Button */}
        <button
          onClick={handleCalculate}
          className="w-full sm:w-auto px-8 py-3 bg-[#c2410c] text-white font-semibold rounded-lg hover:bg-[#9a3409] transition-colors"
        >
          Calculate
        </button>

        {/* Results */}
        <ResultsContainer show={!!result}>
          {result && (
            <>
            <AirChangesPerHourSVG
              roomVolume={result.roomVolume}
              cfm={result.requiredCfm || cfm}
              ach={result.currentAch || result.targetAch}
              roomType={result.roomType?.name}
              recommendedACH={result.roomType?.recommendedAch}
            />
            {/* Primary Result */}
            <div className="bg-orange-50 border border-orange-200 rounded-lg p-4">
              {result.mode === 'ach_from_cfm' ? (
                <>
                  <div className="text-sm text-slate-600 mb-1">
                    Current Air Changes Per Hour
                  </div>
                  <div className="text-4xl font-bold text-[#c2410c]">
                    {result.currentAch?.toFixed(1)} ACH
                  </div>
                  <div className="text-sm text-slate-600 mt-2">
                    Complete air replacement every {result.airTurnoverMinutes.toFixed(1)} minutes
                  </div>
                </>
              ) : (
                <>
                  <div className="text-sm text-slate-600 mb-1">
                    Required Airflow Rate
                  </div>
                  <div className="text-4xl font-bold text-[#c2410c]">
                    {Math.ceil(result.requiredCfm || 0)} CFM
                  </div>
                  <div className="text-sm text-slate-600 mt-2">
                    To achieve {result.targetAch} air changes per hour
                  </div>
                  {result.recommendedDuctSize && (
                    <div className="mt-3 pt-3 border-t border-orange-200">
                      <div className="text-sm text-slate-600">Recommended Duct Size</div>
                      <div className="text-xl font-semibold text-slate-900">
                        {result.recommendedDuctSize}
                      </div>
                    </div>
                  )}
                </>
              )}
            </div>

            {/* Compliance Check */}
            {result.mode === 'ach_from_cfm' && result.roomType && (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div
                  className={`border rounded-lg p-4 ${
                    result.meetsMinimum
                      ? 'border-green-300 bg-green-50'
                      : 'border-red-300 bg-red-50'
                  }`}
                >
                  <div className="flex items-center gap-2 mb-1">
                    <span
                      className={`text-lg ${
                        result.meetsMinimum ? 'text-green-600' : 'text-red-600'
                      }`}
                    >
                      {result.meetsMinimum ? '✓' : '✗'}
                    </span>
                    <span className="font-medium text-slate-900">
                      Minimum Requirement ({result.roomType.minAch} ACH)
                    </span>
                  </div>
                  <div className="text-sm text-slate-600">
                    {result.meetsMinimum
                      ? 'Ventilation meets minimum standard'
                      : `Need ${Math.ceil(
                          (result.roomType.minAch * result.roomVolume) / 60
                        )} CFM to meet minimum`}
                  </div>
                </div>
                <div
                  className={`border rounded-lg p-4 ${
                    result.meetsRecommended
                      ? 'border-green-300 bg-green-50'
                      : 'border-amber-300 bg-amber-50'
                  }`}
                >
                  <div className="flex items-center gap-2 mb-1">
                    <span
                      className={`text-lg ${
                        result.meetsRecommended ? 'text-green-600' : 'text-amber-600'
                      }`}
                    >
                      {result.meetsRecommended ? '✓' : '△'}
                    </span>
                    <span className="font-medium text-slate-900">
                      Recommended ({result.roomType.recommendedAch} ACH)
                    </span>
                  </div>
                  <div className="text-sm text-slate-600">
                    {result.meetsRecommended
                      ? 'Ventilation meets recommended level'
                      : `Need ${Math.ceil(
                          (result.roomType.recommendedAch * result.roomVolume) / 60
                        )} CFM for recommended`}
                  </div>
                </div>
              </div>
            )}

            {/* Calculation Details */}
            <div className="bg-slate-50 border border-slate-200 rounded-lg p-4">
              <h4 className="font-semibold text-slate-900 mb-3">
                Calculation Details
              </h4>
              <ResultsTable
                rows={[
                  {
                    label: 'Room Volume',
                    value: result.roomVolume.toLocaleString(),
                    unit: 'cu ft',
                  },
                  ...(result.mode === 'ach_from_cfm'
                    ? [
                        { label: 'Input Airflow', value: cfm, unit: 'CFM' },
                        {
                          label: 'Calculated ACH',
                          value: result.currentAch?.toFixed(2) || '-',
                          unit: 'per hour',
                        },
                      ]
                    : [
                        {
                          label: 'Target ACH',
                          value: result.targetAch || 0,
                          unit: 'per hour',
                        },
                        {
                          label: 'Required Airflow',
                          value: Math.ceil(result.requiredCfm || 0),
                          unit: 'CFM',
                        },
                        {
                          label: 'Recommended Duct',
                          value: result.recommendedDuctSize || '-',
                          unit: '',
                        },
                      ]),
                  {
                    label: 'Single Air Change Time',
                    value: result.airTurnoverMinutes.toFixed(1),
                    unit: 'minutes',
                  },
                  {
                    label: '95% Air Replacement Time',
                    value: result.completeExchangeTime.toFixed(0),
                    unit: 'minutes',
                  },
                ]}
              />
            </div>

            {/* Room Type Reference */}
            {result.roomType && (
              <div className="bg-slate-50 border border-slate-200 rounded-lg p-4">
                <h4 className="font-semibold text-slate-900 mb-3">
                  {result.roomType.name} ACH Requirements
                </h4>
                <ResultsTable
                  rows={[
                    {
                      label: 'Minimum ACH',
                      value: result.roomType.minAch,
                      unit: 'ACH',
                    },
                    {
                      label: 'Recommended ACH',
                      value: result.roomType.recommendedAch,
                      unit: 'ACH',
                    },
                    {
                      label: 'Maximum ACH',
                      value: result.roomType.maxAch,
                      unit: 'ACH',
                    },
                    {
                      label: 'Minimum CFM Required',
                      value: Math.ceil(
                        (result.roomType.minAch * result.roomVolume) / 60
                      ),
                      unit: 'CFM',
                    },
                    {
                      label: 'Recommended CFM',
                      value: Math.ceil(
                        (result.roomType.recommendedAch * result.roomVolume) / 60
                      ),
                      unit: 'CFM',
                    },
                  ]}
                />
              </div>
            )}

            {/* ACH Reference Table */}
            <div>
              <h4 className="font-semibold text-slate-900 mb-3">
                Quick Reference: Recommended ACH by Room Type
              </h4>
              <div className="overflow-x-auto">
                <table className="w-full text-sm border border-slate-200 rounded-lg overflow-hidden">
                  <thead className="bg-slate-100">
                    <tr>
                      <th className="text-left px-3 py-2 font-medium text-slate-700">
                        Room Type
                      </th>
                      <th className="text-center px-3 py-2 font-medium text-slate-700">
                        Min ACH
                      </th>
                      <th className="text-center px-3 py-2 font-medium text-slate-700">
                        Recommended
                      </th>
                      <th className="text-center px-3 py-2 font-medium text-slate-700">
                        Max ACH
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {roomTypes.slice(0, 10).map((room, index) => (
                      <tr
                        key={room.id}
                        className={
                          index % 2 === 0 ? 'bg-white' : 'bg-slate-50'
                        }
                      >
                        <td className="px-3 py-2 text-slate-900">
                          {room.name}
                        </td>
                        <td className="text-center px-3 py-2 text-slate-600">
                          {room.minAch}
                        </td>
                        <td className="text-center px-3 py-2 font-medium text-slate-900">
                          {room.recommendedAch}
                        </td>
                        <td className="text-center px-3 py-2 text-slate-600">
                          {room.maxAch}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Formula Reference */}
            <div className="text-xs text-slate-500 border-t border-slate-200 pt-4">
              <p className="font-medium mb-1">Calculation Formula:</p>
              <p className="font-mono bg-slate-100 px-2 py-1 rounded inline-block">
                ACH = (CFM × 60) ÷ Room Volume (cu ft)
              </p>
              <p className="mt-2">
                Source: ASHRAE Handbook of Fundamentals, Chapter 16 &mdash; Ventilation and Infiltration.
                Room type requirements from ASHRAE 62.1 (commercial), 62.2 (residential), and 170 (healthcare).
              </p>
            </div>
            </>
          )}
        </ResultsContainer>
      </div>
    </CalculatorWrapper>
  );
}
