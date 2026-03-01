'use client';

import { useState, useCallback, useMemo } from 'react';
import CalculatorWrapper from '../CalculatorWrapper';
import CalculatorInput from '../CalculatorInput';
import { CalculatorResult, ResultsTable } from '../CalculatorResult';
import ResultsContainer from '../ResultsContainer';
import HeatPumpCostSVG from './HeatPumpCostSVG';

// State electricity rates ($/kWh) - Source: EIA 2024
const STATE_RATES: Record<string, { name: string; rate: number }> = {
  'national': { name: 'National Average', rate: 0.16 },
  'AL': { name: 'Alabama', rate: 0.1549 },
  'AK': { name: 'Alaska', rate: 0.2657 },
  'AZ': { name: 'Arizona', rate: 0.1517 },
  'AR': { name: 'Arkansas', rate: 0.1332 },
  'CA': { name: 'California', rate: 0.3375 },
  'CO': { name: 'Colorado', rate: 0.1568 },
  'CT': { name: 'Connecticut', rate: 0.2784 },
  'DE': { name: 'Delaware', rate: 0.1588 },
  'FL': { name: 'Florida', rate: 0.1577 },
  'GA': { name: 'Georgia', rate: 0.1535 },
  'HI': { name: 'Hawaii', rate: 0.3989 },
  'ID': { name: 'Idaho', rate: 0.1251 },
  'IL': { name: 'Illinois', rate: 0.1711 },
  'IN': { name: 'Indiana', rate: 0.1598 },
  'IA': { name: 'Iowa', rate: 0.1354 },
  'KS': { name: 'Kansas', rate: 0.1567 },
  'KY': { name: 'Kentucky', rate: 0.1368 },
  'LA': { name: 'Louisiana', rate: 0.1244 },
  'ME': { name: 'Maine', rate: 0.2955 },
  'MD': { name: 'Maryland', rate: 0.1666 },
  'MA': { name: 'Massachusetts', rate: 0.3151 },
  'MI': { name: 'Michigan', rate: 0.1992 },
  'MN': { name: 'Minnesota', rate: 0.1577 },
  'MS': { name: 'Mississippi', rate: 0.1437 },
  'MO': { name: 'Missouri', rate: 0.1301 },
  'MT': { name: 'Montana', rate: 0.1443 },
  'NE': { name: 'Nebraska', rate: 0.1319 },
  'NV': { name: 'Nevada', rate: 0.1622 },
  'NH': { name: 'New Hampshire', rate: 0.2739 },
  'NJ': { name: 'New Jersey', rate: 0.1961 },
  'NM': { name: 'New Mexico', rate: 0.1589 },
  'NY': { name: 'New York', rate: 0.2707 },
  'NC': { name: 'North Carolina', rate: 0.1426 },
  'ND': { name: 'North Dakota', rate: 0.1287 },
  'OH': { name: 'Ohio', rate: 0.1541 },
  'OK': { name: 'Oklahoma', rate: 0.1369 },
  'OR': { name: 'Oregon', rate: 0.1401 },
  'PA': { name: 'Pennsylvania', rate: 0.1809 },
  'RI': { name: 'Rhode Island', rate: 0.3130 },
  'SC': { name: 'South Carolina', rate: 0.1512 },
  'SD': { name: 'South Dakota', rate: 0.1411 },
  'TN': { name: 'Tennessee', rate: 0.1312 },
  'TX': { name: 'Texas', rate: 0.1618 },
  'UT': { name: 'Utah', rate: 0.1375 },
  'VT': { name: 'Vermont', rate: 0.2489 },
  'VA': { name: 'Virginia', rate: 0.1526 },
  'WA': { name: 'Washington', rate: 0.1252 },
  'WV': { name: 'West Virginia', rate: 0.1496 },
  'WI': { name: 'Wisconsin', rate: 0.1730 },
  'WY': { name: 'Wyoming', rate: 0.1359 },
  'DC': { name: 'Washington D.C.', rate: 0.1705 },
};

// Heat pump system types
const SYSTEM_TYPES = {
  central: {
    label: 'Central Heat Pump',
    sizeUnit: 'tons',
    defaultSeer: 16,
    defaultHspf: 9,
    sizes: [
      { value: 1.5, label: '1.5 Ton (18,000 BTU)' },
      { value: 2, label: '2 Ton (24,000 BTU)' },
      { value: 2.5, label: '2.5 Ton (30,000 BTU)' },
      { value: 3, label: '3 Ton (36,000 BTU)' },
      { value: 3.5, label: '3.5 Ton (42,000 BTU)' },
      { value: 4, label: '4 Ton (48,000 BTU)' },
      { value: 5, label: '5 Ton (60,000 BTU)' },
    ],
  },
  minisplit: {
    label: 'Mini Split',
    sizeUnit: 'BTU',
    defaultSeer: 20,
    defaultHspf: 10,
    sizes: [
      { value: 9000, label: '9,000 BTU (0.75 Ton)' },
      { value: 12000, label: '12,000 BTU (1 Ton)' },
      { value: 18000, label: '18,000 BTU (1.5 Ton)' },
      { value: 24000, label: '24,000 BTU (2 Ton)' },
      { value: 36000, label: '36,000 BTU (3 Ton)' },
    ],
  },
};

type SystemType = keyof typeof SYSTEM_TYPES;

interface ModeResult {
  watts: number;
  kwhPerHour: number;
  kwhPerDay: number;
  kwhPerMonth: number;
  kwhPerSeason: number;
  costPerHour: number;
  costPerDay: number;
  costPerMonth: number;
  costPerSeason: number;
}

interface CalculationResult {
  btu: number;
  cooling: ModeResult;
  heating: ModeResult;
  annualCost: number;
  annualKwh: number;
  electricResistanceCost: number;
  savingsVsResistance: number;
  cop: number;
}

function calculateHeatPumpCost(
  systemType: SystemType,
  sizeValue: number,
  seer: number,
  hspf: number,
  coolingHoursPerDay: number,
  heatingHoursPerDay: number,
  coolingMonths: number,
  heatingMonths: number,
  electricityRate: number
): CalculationResult {
  // Convert tons to BTU for central systems (1 ton = 12,000 BTU)
  // Source: DOE FEMP heat pump acquisition guidance
  const btu = systemType === 'central' ? sizeValue * 12000 : sizeValue;

  // Cooling calculations
  // Formula: Watts = BTU / SEER (Source: DOE)
  const coolingWatts = btu / seer;
  const coolingKwhPerHour = coolingWatts / 1000;
  const coolingKwhPerDay = coolingKwhPerHour * coolingHoursPerDay;
  const coolingKwhPerMonth = coolingKwhPerDay * 30;
  const coolingKwhPerSeason = coolingKwhPerMonth * coolingMonths;

  const coolingCostPerHour = coolingKwhPerHour * electricityRate;
  const coolingCostPerDay = coolingCostPerHour * coolingHoursPerDay;
  const coolingCostPerMonth = coolingCostPerDay * 30;
  const coolingCostPerSeason = coolingCostPerMonth * coolingMonths;

  // Heating calculations
  // Formula: Watts = BTU / HSPF (Source: DOE)
  const heatingWatts = btu / hspf;
  const heatingKwhPerHour = heatingWatts / 1000;
  const heatingKwhPerDay = heatingKwhPerHour * heatingHoursPerDay;
  const heatingKwhPerMonth = heatingKwhPerDay * 30;
  const heatingKwhPerSeason = heatingKwhPerMonth * heatingMonths;

  const heatingCostPerHour = heatingKwhPerHour * electricityRate;
  const heatingCostPerDay = heatingCostPerHour * heatingHoursPerDay;
  const heatingCostPerMonth = heatingCostPerDay * 30;
  const heatingCostPerSeason = heatingCostPerMonth * heatingMonths;

  // Annual totals
  const annualCost = coolingCostPerSeason + heatingCostPerSeason;
  const annualKwh = coolingKwhPerSeason + heatingKwhPerSeason;

  // COP from HSPF: COP = HSPF / 3.412 (Source: Engineering Toolbox)
  const cop = hspf / 3.412;

  // Electric resistance comparison (COP = 1.0)
  // Electric resistance watts = BTU / 3.412 (since COP = 1)
  const resistanceWatts = btu / 3.412;
  const resistanceKwhPerHour = resistanceWatts / 1000;
  const resistanceKwhPerSeason = resistanceKwhPerHour * heatingHoursPerDay * 30 * heatingMonths;
  const electricResistanceCost = resistanceKwhPerSeason * electricityRate;
  const savingsVsResistance = electricResistanceCost - heatingCostPerSeason;

  return {
    btu,
    cooling: {
      watts: coolingWatts,
      kwhPerHour: coolingKwhPerHour,
      kwhPerDay: coolingKwhPerDay,
      kwhPerMonth: coolingKwhPerMonth,
      kwhPerSeason: coolingKwhPerSeason,
      costPerHour: coolingCostPerHour,
      costPerDay: coolingCostPerDay,
      costPerMonth: coolingCostPerMonth,
      costPerSeason: coolingCostPerSeason,
    },
    heating: {
      watts: heatingWatts,
      kwhPerHour: heatingKwhPerHour,
      kwhPerDay: heatingKwhPerDay,
      kwhPerMonth: heatingKwhPerMonth,
      kwhPerSeason: heatingKwhPerSeason,
      costPerHour: heatingCostPerHour,
      costPerDay: heatingCostPerDay,
      costPerMonth: heatingCostPerMonth,
      costPerSeason: heatingCostPerSeason,
    },
    annualCost,
    annualKwh,
    electricResistanceCost,
    savingsVsResistance,
    cop,
  };
}

function getEfficiencyRating(value: number, type: 'seer' | 'hspf'): 'good' | 'warning' | 'bad' {
  if (type === 'seer') {
    if (value >= 18) return 'good';
    if (value >= 14) return 'warning';
    return 'bad';
  } else {
    if (value >= 9.5) return 'good';
    if (value >= 8) return 'warning';
    return 'bad';
  }
}

export default function HeatPumpCostCalculator() {
  const [systemType, setSystemType] = useState<SystemType>('central');
  const [sizeIndex, setSizeIndex] = useState<number>(3); // Default to 3-ton
  const [seer, setSeer] = useState<number>(16);
  const [hspf, setHspf] = useState<number>(9);
  const [coolingHoursPerDay, setCoolingHoursPerDay] = useState<number>(8);
  const [heatingHoursPerDay, setHeatingHoursPerDay] = useState<number>(8);
  const [coolingMonths, setCoolingMonths] = useState<number>(5);
  const [heatingMonths, setHeatingMonths] = useState<number>(4);
  const [stateCode, setStateCode] = useState<string>('national');
  const [customRate, setCustomRate] = useState<number>(0.16);
  const [useCustomRate, setUseCustomRate] = useState<boolean>(false);
  const [result, setResult] = useState<CalculationResult | null>(null);

  const currentSystemType = SYSTEM_TYPES[systemType];
  const electricityRate = useCustomRate ? customRate : STATE_RATES[stateCode].rate;

  const handleSystemTypeChange = useCallback((newType: SystemType) => {
    setSystemType(newType);
    setSeer(SYSTEM_TYPES[newType].defaultSeer);
    setHspf(SYSTEM_TYPES[newType].defaultHspf);
    setSizeIndex(Math.floor(SYSTEM_TYPES[newType].sizes.length / 2));
    setResult(null);
  }, []);

  const handleCalculate = useCallback(() => {
    const sizeValue = currentSystemType.sizes[sizeIndex].value;
    const calcResult = calculateHeatPumpCost(
      systemType,
      sizeValue,
      seer,
      hspf,
      coolingHoursPerDay,
      heatingHoursPerDay,
      coolingMonths,
      heatingMonths,
      electricityRate
    );
    setResult(calcResult);
  }, [systemType, sizeIndex, seer, hspf, coolingHoursPerDay, heatingHoursPerDay, coolingMonths, heatingMonths, electricityRate, currentSystemType.sizes]);

  const stateOptions = useMemo(() => {
    return Object.entries(STATE_RATES)
      .sort((a, b) => {
        if (a[0] === 'national') return -1;
        if (b[0] === 'national') return 1;
        return a[1].name.localeCompare(b[1].name);
      })
      .map(([code, data]) => ({
        value: code,
        label: `${data.name} ($${data.rate.toFixed(4)}/kWh)`,
      }));
  }, []);

  return (
    <CalculatorWrapper
      title="Heat Pump Running Cost Calculator"
      description="Calculate your heat pump's operating cost for both heating and cooling modes, including annual totals and comparisons."
    >
      <div className="space-y-6">
        {/* System Type Selector */}
        <div className="flex rounded-lg border border-slate-200 overflow-hidden">
          {(Object.keys(SYSTEM_TYPES) as SystemType[]).map((type) => (
            <button
              key={type}
              onClick={() => handleSystemTypeChange(type)}
              className={`flex-1 px-4 py-2 text-sm font-medium transition-colors ${
                systemType === type
                  ? 'bg-[#1e3a5f] text-white'
                  : 'bg-white text-slate-700 hover:bg-slate-50'
              }`}
            >
              {SYSTEM_TYPES[type].label}
            </button>
          ))}
        </div>

        {/* Input Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {/* Size Selection */}
          <CalculatorInput
            type="select"
            id="system-size"
            label={`${currentSystemType.label} Size`}
            options={currentSystemType.sizes.map((size, idx) => ({
              value: idx.toString(),
              label: size.label,
            }))}
            value={sizeIndex.toString()}
            onChange={(e) => setSizeIndex(parseInt(e.target.value))}
          />

          {/* Electricity Rate */}
          <div className="space-y-2">
            <div className="flex items-center gap-2 mb-1">
              <label className="text-sm font-medium text-slate-700">
                Electricity Rate
              </label>
              <button
                onClick={() => setUseCustomRate(!useCustomRate)}
                className="text-xs text-[#1e3a5f] underline hover:text-[#c2410c]"
              >
                {useCustomRate ? 'Use state average' : 'Enter custom rate'}
              </button>
            </div>
            {useCustomRate ? (
              <CalculatorInput
                type="number"
                id="custom-rate"
                label=""
                unit="$/kWh"
                value={customRate}
                onChange={(e) => setCustomRate(parseFloat(e.target.value) || 0.16)}
                min={0.01}
                max={1}
                step={0.01}
              />
            ) : (
              <CalculatorInput
                type="select"
                id="state"
                label=""
                options={stateOptions}
                value={stateCode}
                onChange={(e) => setStateCode(e.target.value)}
              />
            )}
          </div>

          {/* SEER Rating */}
          <CalculatorInput
            type="number"
            id="seer"
            label="SEER Rating (Cooling)"
            value={seer}
            onChange={(e) => setSeer(parseFloat(e.target.value) || currentSystemType.defaultSeer)}
            min={10}
            max={30}
            step={1}
            helpText="Higher = more efficient"
          />

          {/* HSPF Rating */}
          <CalculatorInput
            type="number"
            id="hspf"
            label="HSPF Rating (Heating)"
            value={hspf}
            onChange={(e) => setHspf(parseFloat(e.target.value) || currentSystemType.defaultHspf)}
            min={6}
            max={14}
            step={0.1}
            helpText="Higher = more efficient"
          />

          {/* Cooling Hours Per Day */}
          <CalculatorInput
            type="number"
            id="cooling-hours"
            label="Cooling Hours Per Day"
            value={coolingHoursPerDay}
            onChange={(e) => setCoolingHoursPerDay(parseFloat(e.target.value) || 8)}
            min={0}
            max={24}
            step={1}
          />

          {/* Heating Hours Per Day */}
          <CalculatorInput
            type="number"
            id="heating-hours"
            label="Heating Hours Per Day"
            value={heatingHoursPerDay}
            onChange={(e) => setHeatingHoursPerDay(parseFloat(e.target.value) || 8)}
            min={0}
            max={24}
            step={1}
          />

          {/* Cooling Months */}
          <CalculatorInput
            type="number"
            id="cooling-months"
            label="Cooling Season (Months)"
            value={coolingMonths}
            onChange={(e) => setCoolingMonths(parseFloat(e.target.value) || 5)}
            min={0}
            max={12}
            step={1}
          />

          {/* Heating Months */}
          <CalculatorInput
            type="number"
            id="heating-months"
            label="Heating Season (Months)"
            value={heatingMonths}
            onChange={(e) => setHeatingMonths(parseFloat(e.target.value) || 4)}
            min={0}
            max={12}
            step={1}
          />
        </div>

        {/* Calculate Button */}
        <button
          onClick={handleCalculate}
          className="w-full sm:w-auto px-6 py-3 bg-[#c2410c] hover:bg-[#9a3412] text-white font-semibold rounded-md transition-colors"
        >
          Calculate Running Cost
        </button>

        {/* Results */}
        <ResultsContainer show={!!result}>
          {result && (
            <>
            <HeatPumpCostSVG
              cop={result.cop}
              btuCapacity={result.btu}
              hoursPerDay={coolingHoursPerDay}
              electricityRate={useCustomRate ? customRate : STATE_RATES[stateCode]?.rate || 0.16}
              dailyCost={result.cooling.costPerDay}
              monthlyCost={result.cooling.costPerMonth}
              seasonalCost={result.cooling.costPerSeason}
              mode="cooling"
            />

            {/* Annual Summary */}
            <div className="bg-orange-50 rounded-lg p-4">
              <h4 className="font-semibold text-slate-950 mb-3">Annual Summary</h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <CalculatorResult
                  label="Total Annual Cost"
                  value={`$${result.annualCost.toFixed(2)}`}
                  primary
                />
                <CalculatorResult
                  label="Total Annual Usage"
                  value={result.annualKwh.toFixed(0)}
                  unit="kWh"
                  primary
                />
              </div>
            </div>

            {/* Cooling Results */}
            <div className="bg-blue-50 rounded-lg p-4">
              <h4 className="font-semibold text-slate-950 mb-3">
                Cooling Mode ({coolingMonths} months at {coolingHoursPerDay} hrs/day)
              </h4>
              <ResultsTable
                rows={[
                  { label: 'Power Draw', value: Math.round(result.cooling.watts).toLocaleString(), unit: 'Watts' },
                  { label: 'SEER Rating', value: seer.toString(), highlight: getEfficiencyRating(seer, 'seer') },
                  { label: 'Cost Per Hour', value: `$${result.cooling.costPerHour.toFixed(2)}` },
                  { label: 'Cost Per Day', value: `$${result.cooling.costPerDay.toFixed(2)}` },
                  { label: 'Cost Per Month', value: `$${result.cooling.costPerMonth.toFixed(2)}` },
                  { label: 'Cooling Season Cost', value: `$${result.cooling.costPerSeason.toFixed(2)}` },
                ]}
              />
            </div>

            {/* Heating Results */}
            <div className="bg-amber-50 rounded-lg p-4">
              <h4 className="font-semibold text-slate-950 mb-3">
                Heating Mode ({heatingMonths} months at {heatingHoursPerDay} hrs/day)
              </h4>
              <ResultsTable
                rows={[
                  { label: 'Power Draw', value: Math.round(result.heating.watts).toLocaleString(), unit: 'Watts' },
                  { label: 'HSPF Rating', value: hspf.toString(), highlight: getEfficiencyRating(hspf, 'hspf') },
                  { label: 'Equivalent COP', value: result.cop.toFixed(2) },
                  { label: 'Cost Per Hour', value: `$${result.heating.costPerHour.toFixed(2)}` },
                  { label: 'Cost Per Day', value: `$${result.heating.costPerDay.toFixed(2)}` },
                  { label: 'Cost Per Month', value: `$${result.heating.costPerMonth.toFixed(2)}` },
                  { label: 'Heating Season Cost', value: `$${result.heating.costPerSeason.toFixed(2)}` },
                ]}
              />
            </div>

            {/* Comparison to Electric Resistance */}
            <div className="bg-green-50 rounded-lg p-4">
              <h4 className="font-semibold text-slate-950 mb-3">
                Comparison to Electric Resistance Heating
              </h4>
              <ResultsTable
                rows={[
                  { label: 'Electric Resistance Season Cost', value: `$${result.electricResistanceCost.toFixed(2)}` },
                  { label: 'Heat Pump Season Cost', value: `$${result.heating.costPerSeason.toFixed(2)}` },
                  { label: 'Your Savings', value: `$${result.savingsVsResistance.toFixed(2)}`, highlight: 'good' },
                ]}
              />
              <p className="mt-3 text-sm text-slate-600">
                With a COP of {result.cop.toFixed(2)}, your heat pump delivers {result.cop.toFixed(1)}x the heat
                per unit of electricity compared to electric resistance heating (COP 1.0).
              </p>
            </div>

            {/* System Details */}
            <div className="bg-slate-50 rounded-lg p-4">
              <h4 className="font-semibold text-slate-950 mb-3">System Details</h4>
              <ResultsTable
                rows={[
                  { label: 'System Type', value: currentSystemType.label },
                  { label: 'Capacity', value: result.btu.toLocaleString(), unit: 'BTU/hr' },
                  { label: 'Electricity Rate', value: `$${electricityRate.toFixed(4)}`, unit: '/kWh' },
                ]}
              />
            </div>

            {/* Formula Reference */}
            <div className="text-xs text-slate-500 space-y-1">
              <p>
                <strong>Cooling:</strong> Watts = BTU / SEER
              </p>
              <p>
                <strong>Heating:</strong> Watts = BTU / HSPF
              </p>
              <p>
                <strong>COP:</strong> COP = HSPF / 3.412
              </p>
              <p className="mt-2">
                Source: DOE FEMP heat pump acquisition guidance, Engineering Toolbox
              </p>
            </div>
            </>
          )}
        </ResultsContainer>
      </div>
    </CalculatorWrapper>
  );
}
