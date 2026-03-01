'use client';

import { useState } from 'react';
import CalculatorWrapper from '../CalculatorWrapper';
import CalculatorInput from '../CalculatorInput';
import { CalculatorResult, ResultsGrid, ResultsTable } from '../CalculatorResult';
import ResultsContainer from '../ResultsContainer';
import CFMCalculatorSVG from './CFMCalculatorSVG';

type CalculationMode = 'room_ach' | 'duct_velocity' | 'hvac_tonnage' | 'exhaust_hood';

// Room type ACH requirements
// Source: ASHRAE 62.1 and 62.2 ventilation standards
interface RoomType {
  id: string;
  name: string;
  achMin: number;
  achMax: number;
  achTypical: number;
}

const roomTypes: RoomType[] = [
  { id: 'bedroom', name: 'Bedroom', achMin: 2, achMax: 4, achTypical: 3 },
  { id: 'living_room', name: 'Living Room', achMin: 3, achMax: 6, achTypical: 4 },
  { id: 'kitchen', name: 'Kitchen', achMin: 7, achMax: 12, achTypical: 8 },
  { id: 'bathroom', name: 'Bathroom', achMin: 6, achMax: 10, achTypical: 8 },
  { id: 'office', name: 'Office/Study', achMin: 4, achMax: 8, achTypical: 6 },
  { id: 'basement', name: 'Basement', achMin: 3, achMax: 6, achTypical: 4 },
  { id: 'garage', name: 'Garage', achMin: 4, achMax: 8, achTypical: 6 },
  { id: 'warehouse', name: 'Warehouse', achMin: 6, achMax: 12, achTypical: 8 },
  { id: 'gym', name: 'Gym/Exercise Room', achMin: 8, achMax: 15, achTypical: 10 },
  { id: 'server_room', name: 'Server Room', achMin: 15, achMax: 30, achTypical: 20 },
  { id: 'custom', name: 'Custom ACH', achMin: 1, achMax: 60, achTypical: 6 },
];

// Duct shapes
interface DuctShape {
  id: string;
  name: string;
}

const ductShapes: DuctShape[] = [
  { id: 'round', name: 'Round Duct' },
  { id: 'rectangular', name: 'Rectangular Duct' },
];

// Hood types for exhaust calculation
// Source: IMC (International Mechanical Code) and ASHRAE
interface HoodType {
  id: string;
  name: string;
  cfmPerLinearFt: number;
  description: string;
}

const hoodTypes: HoodType[] = [
  {
    id: 'light_duty',
    name: 'Light Duty (Residential)',
    cfmPerLinearFt: 100,
    description: 'Electric stoves, residential cooking',
  },
  {
    id: 'medium_duty',
    name: 'Medium Duty (Commercial)',
    cfmPerLinearFt: 200,
    description: 'Gas ranges, light grilling',
  },
  {
    id: 'heavy_duty',
    name: 'Heavy Duty (Commercial)',
    cfmPerLinearFt: 350,
    description: 'Fryers, charbroilers, woks',
  },
  {
    id: 'extra_heavy',
    name: 'Extra Heavy Duty',
    cfmPerLinearFt: 500,
    description: 'Solid fuel cooking, high-heat applications',
  },
];

interface CalculationResult {
  mode: CalculationMode;
  cfm: number;
  details: Record<string, string | number>;
}

function calculateRoomACH(
  lengthFt: number,
  widthFt: number,
  heightFt: number,
  ach: number
): CalculationResult {
  // Formula: CFM = (Volume × ACH) / 60
  // Source: ASHRAE Handbook of Fundamentals
  const volume = lengthFt * widthFt * heightFt;
  const cfm = Math.ceil((volume * ach) / 60);

  return {
    mode: 'room_ach',
    cfm,
    details: {
      'Room Volume': `${volume.toLocaleString()} cu ft`,
      'Air Changes Per Hour': ach,
      'Air Volume Per Hour': `${(volume * ach).toLocaleString()} cu ft`,
      Formula: 'CFM = (Volume × ACH) ÷ 60',
    },
  };
}

function calculateDuctVelocity(
  shape: string,
  dimension1: number,
  dimension2: number,
  velocityFpm: number
): CalculationResult {
  // Formula: CFM = Area (sq ft) × Velocity (fpm)
  // Source: ASHRAE Duct Fitting Database
  let areaSquareFeet: number;
  let areaDescription: string;

  if (shape === 'round') {
    // Area = π × r² (convert diameter in inches to radius in feet)
    const radiusFeet = dimension1 / 2 / 12;
    areaSquareFeet = Math.PI * radiusFeet * radiusFeet;
    areaDescription = `π × (${dimension1}/2)² = ${(areaSquareFeet * 144).toFixed(2)} sq in`;
  } else {
    // Rectangular: Area = width × height (convert inches to feet)
    areaSquareFeet = (dimension1 * dimension2) / 144;
    areaDescription = `${dimension1}" × ${dimension2}" = ${(areaSquareFeet * 144).toFixed(2)} sq in`;
  }

  const cfm = Math.round(areaSquareFeet * velocityFpm);

  return {
    mode: 'duct_velocity',
    cfm,
    details: {
      'Duct Shape': shape === 'round' ? 'Round' : 'Rectangular',
      'Cross-sectional Area': areaDescription,
      'Area (sq ft)': areaSquareFeet.toFixed(4),
      'Air Velocity': `${velocityFpm.toLocaleString()} FPM`,
      Formula: 'CFM = Area (sq ft) × Velocity (FPM)',
    },
  };
}

function calculateHVACTonnage(
  tons: number,
  cfmPerTon: number
): CalculationResult {
  // Formula: CFM = Tons × CFM per Ton
  // Standard: 400 CFM per ton (typical range 350-450)
  // Source: ACCA Manual S
  const cfm = Math.round(tons * cfmPerTon);

  return {
    mode: 'hvac_tonnage',
    cfm,
    details: {
      'System Capacity': `${tons} tons (${tons * 12000} BTU/hr)`,
      'CFM per Ton': cfmPerTon,
      'Typical Range': '350-450 CFM/ton',
      Formula: 'CFM = Tons × CFM per Ton',
    },
  };
}

function calculateExhaustHood(
  hoodLength: number,
  hoodType: string,
  heightAboveCooking: number
): CalculationResult {
  // Formula: CFM = Hood Length (ft) × CFM per Linear Foot × Height Factor
  // Height factor increases CFM for hoods mounted higher
  // Source: IMC and ASHRAE Kitchen Ventilation Guidelines
  const hood = hoodTypes.find((h) => h.id === hoodType);
  const baseCfmPerFt = hood?.cfmPerLinearFt || 100;

  // Height adjustment: Add 10% for each 6" above 18" mounting height
  const heightInches = heightAboveCooking;
  const heightFactor = heightInches > 18 ? 1 + ((heightInches - 18) / 6) * 0.1 : 1;

  const cfm = Math.round(hoodLength * baseCfmPerFt * heightFactor);

  return {
    mode: 'exhaust_hood',
    cfm,
    details: {
      'Hood Length': `${hoodLength} feet`,
      'Hood Type': hood?.name || 'Unknown',
      'Base CFM/ft': baseCfmPerFt,
      'Height Above Cooking': `${heightAboveCooking} inches`,
      'Height Factor': heightFactor.toFixed(2),
      Formula: 'CFM = Length × CFM/ft × Height Factor',
    },
  };
}

export default function CFMCalculator() {
  const [mode, setMode] = useState<CalculationMode>('room_ach');

  // Room ACH inputs
  const [roomLength, setRoomLength] = useState<number>(20);
  const [roomWidth, setRoomWidth] = useState<number>(15);
  const [roomHeight, setRoomHeight] = useState<number>(8);
  const [roomType, setRoomType] = useState<string>('living_room');
  const [customAch, setCustomAch] = useState<number>(4);

  // Duct velocity inputs
  const [ductShape, setDuctShape] = useState<string>('round');
  const [ductDiameter, setDuctDiameter] = useState<number>(8);
  const [ductWidth, setDuctWidth] = useState<number>(12);
  const [ductHeight, setDuctHeight] = useState<number>(8);
  const [velocity, setVelocity] = useState<number>(900);

  // HVAC tonnage inputs
  const [tonnage, setTonnage] = useState<number>(3);
  const [cfmPerTon, setCfmPerTon] = useState<number>(400);

  // Exhaust hood inputs
  const [hoodLength, setHoodLength] = useState<number>(4);
  const [hoodType, setHoodType] = useState<string>('light_duty');
  const [hoodHeight, setHoodHeight] = useState<number>(24);

  const [result, setResult] = useState<CalculationResult | null>(null);

  const handleCalculate = () => {
    let calculated: CalculationResult;

    switch (mode) {
      case 'room_ach':
        const selectedRoom = roomTypes.find((r) => r.id === roomType);
        const ach = roomType === 'custom' ? customAch : selectedRoom?.achTypical || 4;
        calculated = calculateRoomACH(roomLength, roomWidth, roomHeight, ach);
        break;

      case 'duct_velocity':
        if (ductShape === 'round') {
          calculated = calculateDuctVelocity(ductShape, ductDiameter, 0, velocity);
        } else {
          calculated = calculateDuctVelocity(ductShape, ductWidth, ductHeight, velocity);
        }
        break;

      case 'hvac_tonnage':
        calculated = calculateHVACTonnage(tonnage, cfmPerTon);
        break;

      case 'exhaust_hood':
        calculated = calculateExhaustHood(hoodLength, hoodType, hoodHeight);
        break;

      default:
        return;
    }

    setResult(calculated);
  };

  const selectedRoomType = roomTypes.find((r) => r.id === roomType);

  const modeLabels: Record<CalculationMode, string> = {
    room_ach: 'Room Ventilation (ACH)',
    duct_velocity: 'Duct Airflow',
    hvac_tonnage: 'HVAC System',
    exhaust_hood: 'Exhaust Hood',
  };

  return (
    <CalculatorWrapper
      title="CFM Calculator"
      description="Calculate cubic feet per minute (CFM) airflow using four different methods: room air changes, duct velocity, HVAC tonnage, or exhaust hood requirements."
    >
      <div className="space-y-6">
        {/* Mode Selection */}
        <div>
          <label className="block text-sm font-medium text-slate-700 mb-2">
            Calculation Method
          </label>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
            {(Object.keys(modeLabels) as CalculationMode[]).map((m) => (
              <button
                key={m}
                onClick={() => {
                  setMode(m);
                  setResult(null);
                }}
                className={`px-3 py-2 text-sm font-medium rounded-lg border transition-colors ${
                  mode === m
                    ? 'bg-[#c2410c] text-white border-[#c2410c]'
                    : 'bg-white text-slate-700 border-slate-300 hover:border-slate-400'
                }`}
              >
                {modeLabels[m]}
              </button>
            ))}
          </div>
        </div>

        {/* Mode-specific inputs */}
        <div className="border border-slate-200 rounded-lg p-4 bg-slate-50">
          {/* Room ACH Mode */}
          {mode === 'room_ach' && (
            <div className="space-y-4">
              <h3 className="font-semibold text-slate-900">
                Room Ventilation (Air Changes Per Hour)
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <CalculatorInput
                  type="number"
                  id="roomLength"
                  label="Length"
                  value={roomLength}
                  onChange={(e) => setRoomLength(parseFloat(e.target.value) || 0)}
                  unit="feet"
                  min={1}
                  max={500}
                />
                <CalculatorInput
                  type="number"
                  id="roomWidth"
                  label="Width"
                  value={roomWidth}
                  onChange={(e) => setRoomWidth(parseFloat(e.target.value) || 0)}
                  unit="feet"
                  min={1}
                  max={500}
                />
                <CalculatorInput
                  type="number"
                  id="roomHeight"
                  label="Ceiling Height"
                  value={roomHeight}
                  onChange={(e) => setRoomHeight(parseFloat(e.target.value) || 0)}
                  unit="feet"
                  min={6}
                  max={50}
                />
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <CalculatorInput
                  type="select"
                  id="roomType"
                  label="Room Type"
                  value={roomType}
                  onChange={(e) => setRoomType(e.target.value)}
                  options={roomTypes.map((r) => ({
                    value: r.id,
                    label: `${r.name} (${r.achMin}-${r.achMax} ACH)`,
                  }))}
                />
                {roomType === 'custom' && (
                  <CalculatorInput
                    type="number"
                    id="customAch"
                    label="Custom ACH"
                    value={customAch}
                    onChange={(e) => setCustomAch(parseFloat(e.target.value) || 1)}
                    unit="ACH"
                    min={1}
                    max={60}
                  />
                )}
              </div>
              {selectedRoomType && roomType !== 'custom' && (
                <div className="text-sm text-slate-600">
                  Using typical ACH of {selectedRoomType.achTypical} for{' '}
                  {selectedRoomType.name.toLowerCase()} (range:{' '}
                  {selectedRoomType.achMin}-{selectedRoomType.achMax})
                </div>
              )}
            </div>
          )}

          {/* Duct Velocity Mode */}
          {mode === 'duct_velocity' && (
            <div className="space-y-4">
              <h3 className="font-semibold text-slate-900">
                Duct Airflow (Velocity Method)
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <CalculatorInput
                  type="select"
                  id="ductShape"
                  label="Duct Shape"
                  value={ductShape}
                  onChange={(e) => setDuctShape(e.target.value)}
                  options={ductShapes.map((s) => ({
                    value: s.id,
                    label: s.name,
                  }))}
                />
                <CalculatorInput
                  type="number"
                  id="velocity"
                  label="Air Velocity"
                  value={velocity}
                  onChange={(e) => setVelocity(parseFloat(e.target.value) || 0)}
                  unit="FPM"
                  min={100}
                  max={6000}
                  helpText="Typical: 600-1200 FPM for main ducts"
                />
              </div>
              {ductShape === 'round' ? (
                <CalculatorInput
                  type="number"
                  id="ductDiameter"
                  label="Duct Diameter"
                  value={ductDiameter}
                  onChange={(e) => setDuctDiameter(parseFloat(e.target.value) || 0)}
                  unit="inches"
                  min={3}
                  max={60}
                />
              ) : (
                <div className="grid grid-cols-2 gap-4">
                  <CalculatorInput
                    type="number"
                    id="ductWidth"
                    label="Duct Width"
                    value={ductWidth}
                    onChange={(e) => setDuctWidth(parseFloat(e.target.value) || 0)}
                    unit="inches"
                    min={3}
                    max={60}
                  />
                  <CalculatorInput
                    type="number"
                    id="ductHeight"
                    label="Duct Height"
                    value={ductHeight}
                    onChange={(e) => setDuctHeight(parseFloat(e.target.value) || 0)}
                    unit="inches"
                    min={3}
                    max={60}
                  />
                </div>
              )}
            </div>
          )}

          {/* HVAC Tonnage Mode */}
          {mode === 'hvac_tonnage' && (
            <div className="space-y-4">
              <h3 className="font-semibold text-slate-900">
                HVAC System Airflow
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <CalculatorInput
                  type="number"
                  id="tonnage"
                  label="System Tonnage"
                  value={tonnage}
                  onChange={(e) => setTonnage(parseFloat(e.target.value) || 0)}
                  unit="tons"
                  min={0.5}
                  max={25}
                  step={0.5}
                  helpText="1 ton = 12,000 BTU/hr"
                />
                <CalculatorInput
                  type="number"
                  id="cfmPerTon"
                  label="CFM per Ton"
                  value={cfmPerTon}
                  onChange={(e) => setCfmPerTon(parseFloat(e.target.value) || 0)}
                  unit="CFM/ton"
                  min={300}
                  max={500}
                  helpText="Standard: 400 CFM/ton"
                />
              </div>
              <div className="text-sm text-slate-600">
                <strong>CFM per ton guidance:</strong>
                <ul className="list-disc list-inside mt-1">
                  <li>Standard cooling: 400 CFM/ton</li>
                  <li>High humidity climates: 350 CFM/ton</li>
                  <li>Dry climates: 450 CFM/ton</li>
                </ul>
              </div>
            </div>
          )}

          {/* Exhaust Hood Mode */}
          {mode === 'exhaust_hood' && (
            <div className="space-y-4">
              <h3 className="font-semibold text-slate-900">
                Kitchen Exhaust Hood
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <CalculatorInput
                  type="number"
                  id="hoodLength"
                  label="Hood Length"
                  value={hoodLength}
                  onChange={(e) => setHoodLength(parseFloat(e.target.value) || 0)}
                  unit="feet"
                  min={1}
                  max={20}
                  step={0.5}
                />
                <CalculatorInput
                  type="select"
                  id="hoodType"
                  label="Hood/Cooking Type"
                  value={hoodType}
                  onChange={(e) => setHoodType(e.target.value)}
                  options={hoodTypes.map((h) => ({
                    value: h.id,
                    label: `${h.name} (${h.cfmPerLinearFt} CFM/ft)`,
                  }))}
                />
              </div>
              <CalculatorInput
                type="number"
                id="hoodHeight"
                label="Height Above Cooking Surface"
                value={hoodHeight}
                onChange={(e) => setHoodHeight(parseFloat(e.target.value) || 0)}
                unit="inches"
                min={18}
                max={48}
                helpText="Standard: 18-30 inches"
              />
              {hoodTypes.find((h) => h.id === hoodType) && (
                <div className="text-sm text-slate-600">
                  {hoodTypes.find((h) => h.id === hoodType)?.description}
                </div>
              )}
            </div>
          )}
        </div>

        {/* Calculate Button */}
        <button
          onClick={handleCalculate}
          className="w-full sm:w-auto px-8 py-3 bg-[#c2410c] text-white font-semibold rounded-lg hover:bg-[#9a3409] transition-colors"
        >
          Calculate CFM
        </button>

        {/* Results */}
        <ResultsContainer show={!!result}>
          {result && (
            <>
            <CFMCalculatorSVG
              cfm={result.cfm}
              velocity={mode === 'duct_velocity' ? velocity : undefined}
              ductDiameter={mode === 'duct_velocity' && ductShape === 'round' ? ductDiameter : undefined}
              ductWidth={mode === 'duct_velocity' && ductShape === 'rectangular' ? ductWidth : undefined}
              ductHeight={mode === 'duct_velocity' && ductShape === 'rectangular' ? ductHeight : undefined}
              calculationMode={mode}
              roomVolume={mode === 'room_ach' ? roomLength * roomWidth * roomHeight : undefined}
              ach={mode === 'room_ach' ? (roomType === 'custom' ? customAch : selectedRoomType?.achTypical || 4) : undefined}
              roomType={mode === 'room_ach' ? roomType : undefined}
              tons={mode === 'hvac_tonnage' ? tonnage : undefined}
              hoodLength={mode === 'exhaust_hood' ? hoodLength : undefined}
              hoodType={mode === 'exhaust_hood' ? hoodType : undefined}
            />

            {/* Primary Result */}
            <div className="bg-orange-50 border border-orange-200 rounded-lg p-6 text-center">
              <div className="text-sm text-slate-600 mb-1">Required Airflow</div>
              <div className="text-5xl font-bold text-[#c2410c]">
                {result.cfm.toLocaleString()}
              </div>
              <div className="text-lg text-slate-600 mt-1">
                CFM (cubic feet per minute)
              </div>
            </div>

            {/* Calculation Details */}
            <div>
              <h4 className="font-semibold text-slate-900 mb-3">
                Calculation Details
              </h4>
              <ResultsTable
                rows={Object.entries(result.details).map(([key, value]) => ({
                  label: key,
                  value: value,
                  unit: '',
                }))}
              />
            </div>

            {/* Conversions */}
            <div className="bg-slate-50 border border-slate-200 rounded-lg p-4">
              <h4 className="font-semibold text-slate-900 mb-3">
                Unit Conversions
              </h4>
              <ResultsGrid columns={3}>
                <CalculatorResult
                  label="Cubic Meters/Hour"
                  value={Math.round(result.cfm * 1.699)}
                  unit="m³/hr"
                />
                <CalculatorResult
                  label="Liters/Second"
                  value={Math.round(result.cfm * 0.4719)}
                  unit="L/s"
                />
                <CalculatorResult
                  label="Cubic Feet/Hour"
                  value={(result.cfm * 60).toLocaleString()}
                  unit="CFH"
                />
              </ResultsGrid>
            </div>

            {/* Methodology note */}
            <div className="text-xs text-slate-500 border-t border-slate-200 pt-4">
              <p className="font-medium mb-1">Methodology:</p>
              <p>
                {mode === 'room_ach' &&
                  'Room ventilation uses ASHRAE 62.1/62.2 air changes per hour (ACH) standards. CFM = (Room Volume × ACH) ÷ 60.'}
                {mode === 'duct_velocity' &&
                  'Duct airflow is calculated from cross-sectional area and velocity: CFM = Area (sq ft) × Velocity (FPM).'}
                {mode === 'hvac_tonnage' &&
                  'HVAC airflow uses ACCA Manual S standard of 400 CFM per ton of cooling capacity. Adjust based on climate and humidity.'}
                {mode === 'exhaust_hood' &&
                  'Kitchen hood exhaust follows IMC and ASHRAE guidelines based on cooking type and hood configuration.'}
              </p>
            </div>
            </>
          )}
        </ResultsContainer>
      </div>
    </CalculatorWrapper>
  );
}
