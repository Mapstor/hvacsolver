'use client';

import { useState, useCallback, useMemo } from 'react';
import CalculatorWrapper from '../CalculatorWrapper';
import CalculatorInput from '../CalculatorInput';
import { CalculatorResult, ResultsGrid, ResultsTable } from '../CalculatorResult';
import ResultsContainer from '../ResultsContainer';
import ACRunningCostSVG from './ACRunningCostSVG';

// State electricity rates (cents per kWh) - Source: EIA 2024
const STATE_RATES: Record<string, { name: string; rate: number }> = {
  'national': { name: 'National Average', rate: 0.18 },
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

// AC type presets
const AC_TYPES = {
  central: {
    label: 'Central AC',
    sizeUnit: 'tons',
    efficiencyLabel: 'SEER',
    defaultEfficiency: 16,
    efficiencyRange: { min: 10, max: 25 },
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
  window: {
    label: 'Window AC',
    sizeUnit: 'BTU',
    efficiencyLabel: 'EER',
    defaultEfficiency: 10,
    efficiencyRange: { min: 8, max: 15 },
    sizes: [
      { value: 5000, label: '5,000 BTU (up to 150 sq ft)' },
      { value: 6000, label: '6,000 BTU (150-250 sq ft)' },
      { value: 8000, label: '8,000 BTU (250-350 sq ft)' },
      { value: 10000, label: '10,000 BTU (350-450 sq ft)' },
      { value: 12000, label: '12,000 BTU (450-550 sq ft)' },
      { value: 14000, label: '14,000 BTU (550-700 sq ft)' },
      { value: 15000, label: '15,000 BTU (700-800 sq ft)' },
      { value: 18000, label: '18,000 BTU (800-1,000 sq ft)' },
      { value: 25000, label: '25,000 BTU (1,000-1,400 sq ft)' },
    ],
  },
  portable: {
    label: 'Portable AC',
    sizeUnit: 'BTU',
    efficiencyLabel: 'EER',
    defaultEfficiency: 8,
    efficiencyRange: { min: 6, max: 12 },
    sizes: [
      { value: 8000, label: '8,000 BTU' },
      { value: 10000, label: '10,000 BTU' },
      { value: 12000, label: '12,000 BTU' },
      { value: 14000, label: '14,000 BTU' },
    ],
  },
  minisplit: {
    label: 'Mini Split',
    sizeUnit: 'BTU',
    efficiencyLabel: 'SEER',
    defaultEfficiency: 20,
    efficiencyRange: { min: 15, max: 30 },
    sizes: [
      { value: 9000, label: '9,000 BTU (0.75 Ton)' },
      { value: 12000, label: '12,000 BTU (1 Ton)' },
      { value: 18000, label: '18,000 BTU (1.5 Ton)' },
      { value: 24000, label: '24,000 BTU (2 Ton)' },
      { value: 36000, label: '36,000 BTU (3 Ton)' },
    ],
  },
};

type ACType = keyof typeof AC_TYPES;

interface CalculationResult {
  watts: number;
  kwhPerHour: number;
  kwhPerDay: number;
  kwhPerMonth: number;
  costPerHour: number;
  costPerDay: number;
  costPerMonth: number;
  costPerSeason: number;
  btu: number;
  efficiency: number;
}

function calculateACCost(
  acType: ACType,
  sizeValue: number,
  efficiency: number,
  hoursPerDay: number,
  electricityRate: number
): CalculationResult {
  // Formula: Watts = BTU / Efficiency (SEER or EER)
  // Source: DOE standard formula - https://www.energy.gov/femp/purchasing-energy-efficient-residential-central-air-conditioners

  // Convert tons to BTU for central AC (1 ton = 12,000 BTU)
  const btu = acType === 'central' ? sizeValue * 12000 : sizeValue;

  // Calculate watts: BTU / efficiency rating
  const watts = btu / efficiency;

  // Calculate kWh consumption
  const kwhPerHour = watts / 1000;
  const kwhPerDay = kwhPerHour * hoursPerDay;
  const kwhPerMonth = kwhPerDay * 30;

  // Calculate costs
  const costPerHour = kwhPerHour * electricityRate;
  const costPerDay = costPerHour * hoursPerDay;
  const costPerMonth = costPerDay * 30;

  // Cooling season: DOE standard is 1,000 hours per season
  // With 8 hours/day, that's ~125 days (about 4 months)
  const seasonHours = 1000;
  const costPerSeason = kwhPerHour * seasonHours * electricityRate;

  return {
    watts,
    kwhPerHour,
    kwhPerDay,
    kwhPerMonth,
    costPerHour,
    costPerDay,
    costPerMonth,
    costPerSeason,
    btu,
    efficiency,
  };
}

function getEfficiencyRating(efficiency: number, acType: ACType): 'good' | 'warning' | 'bad' {
  if (acType === 'central' || acType === 'minisplit') {
    // SEER ratings
    if (efficiency >= 18) return 'good';
    if (efficiency >= 14) return 'warning';
    return 'bad';
  } else {
    // EER ratings
    if (efficiency >= 11) return 'good';
    if (efficiency >= 9) return 'warning';
    return 'bad';
  }
}

export default function ACRunningCostCalculator() {
  const [acType, setAcType] = useState<ACType>('central');
  const [sizeIndex, setSizeIndex] = useState<number>(3); // Default to 3-ton for central
  const [efficiency, setEfficiency] = useState<number>(16);
  const [hoursPerDay, setHoursPerDay] = useState<number>(8);
  const [stateCode, setStateCode] = useState<string>('national');
  const [customRate, setCustomRate] = useState<number>(0.18);
  const [useCustomRate, setUseCustomRate] = useState<boolean>(false);
  const [result, setResult] = useState<CalculationResult | null>(null);

  const currentACType = AC_TYPES[acType];
  const electricityRate = useCustomRate ? customRate : STATE_RATES[stateCode].rate;

  // Update efficiency when AC type changes
  const handleACTypeChange = useCallback((newType: ACType) => {
    setAcType(newType);
    setEfficiency(AC_TYPES[newType].defaultEfficiency);
    setSizeIndex(Math.floor(AC_TYPES[newType].sizes.length / 2));
    setResult(null);
  }, []);

  const handleCalculate = useCallback(() => {
    const sizeValue = currentACType.sizes[sizeIndex].value;
    const calcResult = calculateACCost(
      acType,
      sizeValue,
      efficiency,
      hoursPerDay,
      electricityRate
    );
    setResult(calcResult);
  }, [acType, sizeIndex, efficiency, hoursPerDay, electricityRate, currentACType.sizes]);

  // State dropdown options sorted alphabetically
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
      title="Air Conditioner Running Cost Calculator"
      description="Calculate how much it costs to run your AC per hour, day, month, and cooling season based on your unit's efficiency and local electricity rate."
    >
      <div className="space-y-6">
        {/* AC Type Selector */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
          {(Object.keys(AC_TYPES) as ACType[]).map((type) => (
            <button
              key={type}
              onClick={() => handleACTypeChange(type)}
              className={`px-3 py-2 text-sm font-medium rounded-md transition-colors ${
                acType === type
                  ? 'bg-[#1e3a5f] text-white'
                  : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
              }`}
            >
              {AC_TYPES[type].label}
            </button>
          ))}
        </div>

        {/* Input Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {/* Size Selection */}
          <CalculatorInput
            type="select"
            id="ac-size"
            label={`${currentACType.label} Size`}
            options={currentACType.sizes.map((size, idx) => ({
              value: idx.toString(),
              label: size.label,
            }))}
            value={sizeIndex.toString()}
            onChange={(e) => setSizeIndex(parseInt(e.target.value))}
          />

          {/* Efficiency Rating */}
          <CalculatorInput
            type="number"
            id="efficiency"
            label={`${currentACType.efficiencyLabel} Rating`}
            value={efficiency}
            onChange={(e) => setEfficiency(parseFloat(e.target.value) || currentACType.defaultEfficiency)}
            min={currentACType.efficiencyRange.min}
            max={currentACType.efficiencyRange.max}
            step={1}
            helpText={`Higher ${currentACType.efficiencyLabel} = lower cost`}
          />

          {/* Hours Per Day */}
          <CalculatorInput
            type="number"
            id="hours"
            label="Hours Per Day"
            value={hoursPerDay}
            onChange={(e) => setHoursPerDay(parseFloat(e.target.value) || 8)}
            min={1}
            max={24}
            step={1}
            helpText="Average daily runtime"
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
                onChange={(e) => setCustomRate(parseFloat(e.target.value) || 0.18)}
                min={0.01}
                max={1}
                step={0.01}
                helpText="Check your utility bill"
              />
            ) : (
              <CalculatorInput
                type="select"
                id="state"
                label=""
                options={stateOptions}
                value={stateCode}
                onChange={(e) => setStateCode(e.target.value)}
                helpText="State average residential rate"
              />
            )}
          </div>
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
            <ACRunningCostSVG
              btuCapacity={result.btu}
              seerRating={result.efficiency}
              hoursPerDay={hoursPerDay}
              electricityRate={useCustomRate ? customRate : STATE_RATES[stateCode]?.rate || 0.18}
              dailyCost={result.costPerDay}
              monthlyCost={result.costPerMonth}
              seasonalCost={result.costPerSeason}
              acType={acType}
            />

            {/* Primary Cost Results */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div className="bg-orange-50 rounded-lg p-4">
                <CalculatorResult
                  label="Cost Per Hour"
                  value={`$${result.costPerHour.toFixed(2)}`}
                  primary
                />
              </div>
              <div className="bg-orange-50 rounded-lg p-4">
                <CalculatorResult
                  label="Cost Per Day"
                  value={`$${result.costPerDay.toFixed(2)}`}
                  primary
                />
              </div>
              <div className="bg-orange-50 rounded-lg p-4">
                <CalculatorResult
                  label="Cost Per Month"
                  value={`$${result.costPerMonth.toFixed(2)}`}
                  primary
                />
              </div>
            </div>

            {/* Detailed Breakdown */}
            <div className="bg-slate-50 rounded-lg p-4">
              <h4 className="font-semibold text-slate-950 mb-3">
                Detailed Breakdown
              </h4>
              <ResultsTable
                rows={[
                  { label: 'AC Cooling Output', value: result.btu.toLocaleString(), unit: 'BTU/hr' },
                  { label: 'Power Consumption', value: Math.round(result.watts).toLocaleString(), unit: 'Watts' },
                  { label: `Efficiency (${currentACType.efficiencyLabel})`, value: result.efficiency.toString(), highlight: getEfficiencyRating(result.efficiency, acType) },
                  { label: 'Electricity Rate', value: `$${electricityRate.toFixed(4)}`, unit: '/kWh' },
                ]}
              />
            </div>

            {/* kWh Usage */}
            <div className="bg-slate-50 rounded-lg p-4">
              <h4 className="font-semibold text-slate-950 mb-3">
                Electricity Consumption
              </h4>
              <ResultsTable
                rows={[
                  { label: 'kWh Per Hour', value: result.kwhPerHour.toFixed(2), unit: 'kWh' },
                  { label: 'kWh Per Day', value: result.kwhPerDay.toFixed(1), unit: 'kWh' },
                  { label: 'kWh Per Month', value: result.kwhPerMonth.toFixed(0), unit: 'kWh' },
                ]}
              />
            </div>

            {/* Seasonal Cost */}
            <div className="bg-slate-50 rounded-lg p-4">
              <h4 className="font-semibold text-slate-950 mb-3">
                Cooling Season Cost
              </h4>
              <p className="text-sm text-slate-600 mb-3">
                Based on DOE standard of 1,000 cooling hours per season:
              </p>
              <div className="text-2xl font-bold text-[#1e3a5f]">
                ${result.costPerSeason.toFixed(2)}
                <span className="text-sm font-normal text-slate-500 ml-2">per season</span>
              </div>
            </div>

            {/* Comparison Note */}
            {acType === 'portable' && (
              <div className="bg-amber-50 border border-amber-200 rounded-lg p-4 text-sm text-amber-800">
                <strong>Note:</strong> Portable ACs are 25-40% less efficient than window ACs of the same BTU rating.
                Consider a window unit or mini split for lower operating costs.
              </div>
            )}

            {acType === 'minisplit' && result.efficiency >= 20 && (
              <div className="bg-green-50 border border-green-200 rounded-lg p-4 text-sm text-green-800">
                <strong>Great choice!</strong> Mini splits with SEER 20+ cost 50-60% less to run
                than window or portable ACs for the same cooling output.
              </div>
            )}

            {/* Formula Reference */}
            <div className="text-xs text-slate-500 space-y-1">
              <p>
                <strong>Formula:</strong> Cost = (BTU / {currentACType.efficiencyLabel}) x Hours x Rate / 1,000
              </p>
              <p>Source: DOE/FEMP residential air conditioner standards</p>
            </div>
            </>
          )}
        </ResultsContainer>
      </div>
    </CalculatorWrapper>
  );
}
