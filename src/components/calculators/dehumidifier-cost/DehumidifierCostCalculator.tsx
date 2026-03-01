'use client';

import { useState } from 'react';
import CalculatorWrapper from '../CalculatorWrapper';
import CalculatorInput from '../CalculatorInput';
import { CalculatorResult, ResultsGrid, ResultsTable } from '../CalculatorResult';
import ResultsContainer from '../ResultsContainer';
import DehumidifierCostSVG from './DehumidifierCostSVG';

// Dehumidifier size presets based on capacity
// Source: AHAM (Association of Home Appliance Manufacturers) standards
// Energy consumption ranges from Energy Star certified products
interface DehumidifierType {
  id: string;
  name: string;
  pintsPerDay: number;
  wattsMin: number;
  wattsMax: number;
  defaultWatts: number;
  typicalSquareFeet: string;
}

const dehumidifierTypes: DehumidifierType[] = [
  {
    id: 'small',
    name: 'Small (20-30 pints/day)',
    pintsPerDay: 25,
    wattsMin: 200,
    wattsMax: 350,
    defaultWatts: 280,
    typicalSquareFeet: '500-1,000',
  },
  {
    id: 'medium',
    name: 'Medium (40-50 pints/day)',
    pintsPerDay: 45,
    wattsMin: 350,
    wattsMax: 550,
    defaultWatts: 450,
    typicalSquareFeet: '1,000-2,000',
  },
  {
    id: 'large',
    name: 'Large (60-70 pints/day)',
    pintsPerDay: 65,
    wattsMin: 500,
    wattsMax: 750,
    defaultWatts: 620,
    typicalSquareFeet: '2,000-2,500',
  },
  {
    id: 'whole_home',
    name: 'Whole-Home (70+ pints/day)',
    pintsPerDay: 90,
    wattsMin: 700,
    wattsMax: 1000,
    defaultWatts: 850,
    typicalSquareFeet: '2,500+',
  },
  {
    id: 'custom',
    name: 'Custom / Enter Manually',
    pintsPerDay: 50,
    wattsMin: 100,
    wattsMax: 2000,
    defaultWatts: 500,
    typicalSquareFeet: 'Varies',
  },
];

// State electricity rates (same as other calculators)
const stateElectricityRates: Record<string, { name: string; rate: number }> = {
  AL: { name: 'Alabama', rate: 0.132 },
  AK: { name: 'Alaska', rate: 0.229 },
  AZ: { name: 'Arizona', rate: 0.131 },
  AR: { name: 'Arkansas', rate: 0.114 },
  CA: { name: 'California', rate: 0.267 },
  CO: { name: 'Colorado', rate: 0.139 },
  CT: { name: 'Connecticut', rate: 0.255 },
  DE: { name: 'Delaware', rate: 0.138 },
  FL: { name: 'Florida', rate: 0.136 },
  GA: { name: 'Georgia', rate: 0.132 },
  HI: { name: 'Hawaii', rate: 0.387 },
  ID: { name: 'Idaho', rate: 0.103 },
  IL: { name: 'Illinois', rate: 0.148 },
  IN: { name: 'Indiana', rate: 0.137 },
  IA: { name: 'Iowa', rate: 0.131 },
  KS: { name: 'Kansas', rate: 0.138 },
  KY: { name: 'Kentucky', rate: 0.118 },
  LA: { name: 'Louisiana', rate: 0.116 },
  ME: { name: 'Maine', rate: 0.213 },
  MD: { name: 'Maryland', rate: 0.150 },
  MA: { name: 'Massachusetts', rate: 0.271 },
  MI: { name: 'Michigan', rate: 0.173 },
  MN: { name: 'Minnesota', rate: 0.143 },
  MS: { name: 'Mississippi', rate: 0.123 },
  MO: { name: 'Missouri', rate: 0.125 },
  MT: { name: 'Montana', rate: 0.117 },
  NE: { name: 'Nebraska', rate: 0.118 },
  NV: { name: 'Nevada', rate: 0.131 },
  NH: { name: 'New Hampshire', rate: 0.245 },
  NJ: { name: 'New Jersey', rate: 0.178 },
  NM: { name: 'New Mexico', rate: 0.137 },
  NY: { name: 'New York', rate: 0.214 },
  NC: { name: 'North Carolina', rate: 0.123 },
  ND: { name: 'North Dakota', rate: 0.116 },
  OH: { name: 'Ohio', rate: 0.137 },
  OK: { name: 'Oklahoma', rate: 0.115 },
  OR: { name: 'Oregon', rate: 0.118 },
  PA: { name: 'Pennsylvania', rate: 0.161 },
  RI: { name: 'Rhode Island', rate: 0.265 },
  SC: { name: 'South Carolina', rate: 0.131 },
  SD: { name: 'South Dakota', rate: 0.127 },
  TN: { name: 'Tennessee', rate: 0.119 },
  TX: { name: 'Texas', rate: 0.133 },
  UT: { name: 'Utah', rate: 0.107 },
  VT: { name: 'Vermont', rate: 0.205 },
  VA: { name: 'Virginia', rate: 0.132 },
  WA: { name: 'Washington', rate: 0.103 },
  WV: { name: 'West Virginia', rate: 0.126 },
  WI: { name: 'Wisconsin', rate: 0.152 },
  WY: { name: 'Wyoming', rate: 0.111 },
  US: { name: 'US Average', rate: 0.155 },
};

interface CalculationResult {
  watts: number;
  dutyCycle: number;
  effectiveWatts: number;
  kwhPerDay: number;
  kwhPerMonth: number;
  kwhPerSeason: number;
  costPerDay: number;
  costPerMonth: number;
  costPerSeason: number;
  costPerYear: number;
  pintsPerDay: number;
  gallonsPerDay: number;
  costPerPint: number;
  integratedEnergyFactor: number; // L/kWh (liters per kWh)
}

function calculateDehumidifierCost(
  watts: number,
  pintsPerDay: number,
  dutyCyclePercent: number,
  hoursPerDay: number,
  electricityRate: number,
  monthsPerYear: number
): CalculationResult {
  // Duty cycle calculation
  // Formula: A dehumidifier cycles on/off based on humidity levels
  // Typical duty cycles range from 30-80% depending on humidity levels
  // Source: Energy Star dehumidifier guidelines
  const dutyCycle = dutyCyclePercent / 100;

  // Effective wattage accounting for duty cycle
  const effectiveWatts = watts * dutyCycle;

  // Energy consumption
  // Formula: kWh = (Watts × Hours per day × Duty Cycle) / 1000
  const kwhPerDay = (watts * hoursPerDay * dutyCycle) / 1000;
  const kwhPerMonth = kwhPerDay * 30;
  const kwhPerSeason = kwhPerMonth * monthsPerYear;

  // Cost calculations
  // Formula: Cost = kWh × Rate
  const costPerDay = kwhPerDay * electricityRate;
  const costPerMonth = kwhPerMonth * electricityRate;
  const costPerSeason = kwhPerSeason * electricityRate;
  const costPerYear = costPerSeason; // Assuming "season" is yearly usage

  // Moisture removal calculations
  // 1 pint = 0.125 gallons
  const gallonsPerDay = pintsPerDay / 8;

  // Cost per pint removed
  const costPerPint = costPerDay / pintsPerDay;

  // Integrated Energy Factor (IEF) - liters removed per kWh
  // Formula: IEF = (Pints/day × 0.473 liters/pint) / (kWh/day)
  // Higher IEF = more efficient
  // Source: DOE dehumidifier test procedure
  const litersPerDay = pintsPerDay * 0.473176;
  const integratedEnergyFactor = litersPerDay / kwhPerDay;

  return {
    watts,
    dutyCycle: dutyCyclePercent,
    effectiveWatts: Math.round(effectiveWatts),
    kwhPerDay: Math.round(kwhPerDay * 100) / 100,
    kwhPerMonth: Math.round(kwhPerMonth * 100) / 100,
    kwhPerSeason: Math.round(kwhPerSeason * 100) / 100,
    costPerDay: Math.round(costPerDay * 100) / 100,
    costPerMonth: Math.round(costPerMonth * 100) / 100,
    costPerSeason: Math.round(costPerSeason * 100) / 100,
    costPerYear: Math.round(costPerYear * 100) / 100,
    pintsPerDay,
    gallonsPerDay: Math.round(gallonsPerDay * 100) / 100,
    costPerPint: Math.round(costPerPint * 1000) / 1000,
    integratedEnergyFactor: Math.round(integratedEnergyFactor * 100) / 100,
  };
}

export default function DehumidifierCostCalculator() {
  const [dehumidifierType, setDehumidifierType] = useState<string>('medium');
  const [watts, setWatts] = useState<number>(450);
  const [pintsPerDay, setPintsPerDay] = useState<number>(45);
  const [dutyCycle, setDutyCycle] = useState<number>(50);
  const [hoursPerDay, setHoursPerDay] = useState<number>(24);
  const [state, setState] = useState<string>('US');
  const [customRate, setCustomRate] = useState<string>('');
  const [monthsPerYear, setMonthsPerYear] = useState<number>(6);

  const [result, setResult] = useState<CalculationResult | null>(null);

  const handleDehumidifierTypeChange = (typeId: string) => {
    setDehumidifierType(typeId);
    const selected = dehumidifierTypes.find((t) => t.id === typeId);
    if (selected && typeId !== 'custom') {
      setWatts(selected.defaultWatts);
      setPintsPerDay(selected.pintsPerDay);
    }
  };

  const handleCalculate = () => {
    const rate = customRate ? parseFloat(customRate) : stateElectricityRates[state].rate;

    if (watts <= 0 || pintsPerDay <= 0 || isNaN(rate) || rate <= 0) return;

    const calculated = calculateDehumidifierCost(
      watts,
      pintsPerDay,
      dutyCycle,
      hoursPerDay,
      rate,
      monthsPerYear
    );
    setResult(calculated);
  };

  const currentRate = customRate ? parseFloat(customRate) : stateElectricityRates[state].rate;
  const selectedType = dehumidifierTypes.find((t) => t.id === dehumidifierType);

  // Duty cycle guidance
  const getDutyCycleDescription = (dc: number): string => {
    if (dc < 30) return 'Very low (dry climate or oversized unit)';
    if (dc < 50) return 'Low to moderate humidity';
    if (dc < 70) return 'Moderate to high humidity';
    return 'High humidity (humid climate or damp space)';
  };

  // IEF rating guidance
  const getIefRating = (ief: number): { text: string; highlight: 'good' | 'warning' | 'bad' } => {
    // Energy Star minimum IEF for 35.01-45 pint/day: 1.77 L/kWh
    // Energy Star minimum IEF for >45 pint/day: 2.09 L/kWh
    if (ief >= 2.0) return { text: 'Excellent efficiency', highlight: 'good' };
    if (ief >= 1.5) return { text: 'Good efficiency', highlight: 'warning' };
    return { text: 'Below average efficiency', highlight: 'bad' };
  };

  return (
    <CalculatorWrapper
      title="Dehumidifier Running Cost Calculator"
      description="Calculate the electricity cost to run a dehumidifier based on wattage, duty cycle, and local electricity rates. Includes energy efficiency analysis."
    >
      <div className="space-y-6">
        {/* Dehumidifier Selection */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <CalculatorInput
            type="select"
            id="dehumidifierType"
            label="Dehumidifier Size"
            value={dehumidifierType}
            onChange={(e) => handleDehumidifierTypeChange(e.target.value)}
            options={dehumidifierTypes.map((t) => ({
              value: t.id,
              label: t.name,
            }))}
          />

          {selectedType && dehumidifierType !== 'custom' && (
            <div className="bg-slate-50 rounded-lg p-3 text-sm">
              <div className="text-slate-600">Typical coverage</div>
              <div className="font-semibold text-slate-900">
                {selectedType.typicalSquareFeet} sq ft
              </div>
              <div className="text-xs text-slate-500 mt-1">
                Wattage range: {selectedType.wattsMin}-{selectedType.wattsMax}W
              </div>
            </div>
          )}
        </div>

        {/* Wattage and Capacity */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <CalculatorInput
            type="number"
            id="watts"
            label="Power Consumption"
            value={watts}
            onChange={(e) => setWatts(parseFloat(e.target.value) || 0)}
            unit="watts"
            min={100}
            max={2000}
            step={10}
            helpText="Check the label on your dehumidifier"
          />
          <CalculatorInput
            type="number"
            id="pintsPerDay"
            label="Moisture Removal Capacity"
            value={pintsPerDay}
            onChange={(e) => setPintsPerDay(parseFloat(e.target.value) || 0)}
            unit="pints/day"
            min={10}
            max={150}
            step={5}
            helpText="Rated capacity at AHAM test conditions"
          />
        </div>

        {/* Duty Cycle */}
        <div className="border border-slate-200 rounded-lg p-4 bg-slate-50">
          <div className="flex justify-between items-center mb-2">
            <label className="text-sm font-medium text-slate-700">
              Duty Cycle: {dutyCycle}%
            </label>
            <span className="text-xs text-slate-500">
              {getDutyCycleDescription(dutyCycle)}
            </span>
          </div>
          <input
            type="range"
            min={10}
            max={100}
            step={5}
            value={dutyCycle}
            onChange={(e) => setDutyCycle(parseInt(e.target.value))}
            className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-[#c2410c]"
          />
          <div className="flex justify-between text-xs text-slate-500 mt-1">
            <span>10% (rarely runs)</span>
            <span>50% (typical)</span>
            <span>100% (continuous)</span>
          </div>
          <p className="text-xs text-slate-600 mt-2">
            Duty cycle represents what percentage of the time the compressor runs.
            In humid conditions, expect 60-80%. In moderate conditions, 30-50%.
          </p>
        </div>

        {/* Usage Hours and Season */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <CalculatorInput
            type="number"
            id="hoursPerDay"
            label="Hours Running Per Day"
            value={hoursPerDay}
            onChange={(e) => setHoursPerDay(parseFloat(e.target.value) || 0)}
            unit="hours"
            min={1}
            max={24}
            step={1}
            helpText="Most dehumidifiers run 24/7 when needed"
          />
          <CalculatorInput
            type="number"
            id="monthsPerYear"
            label="Months of Use Per Year"
            value={monthsPerYear}
            onChange={(e) => setMonthsPerYear(parseFloat(e.target.value) || 0)}
            unit="months"
            min={1}
            max={12}
            step={1}
            helpText="Seasonal use: 4-6 months; Year-round: 12 months"
          />
        </div>

        {/* Electricity Rate */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <CalculatorInput
            type="select"
            id="state"
            label="State (for electricity rate)"
            value={state}
            onChange={(e) => {
              setState(e.target.value);
              setCustomRate('');
            }}
            options={Object.entries(stateElectricityRates).map(([code, data]) => ({
              value: code,
              label: `${data.name} ($${data.rate.toFixed(3)}/kWh)`,
            }))}
          />
          <CalculatorInput
            type="number"
            id="customRate"
            label="Custom Rate (optional)"
            value={customRate ? parseFloat(customRate) : 0}
            onChange={(e) => setCustomRate(e.target.value)}
            unit="$/kWh"
            min={0}
            max={1}
            step={0.001}
            helpText="Override state average with your actual rate"
          />
        </div>

        {/* Calculate Button */}
        <button
          onClick={handleCalculate}
          className="w-full sm:w-auto px-8 py-3 bg-[#c2410c] text-white font-semibold rounded-lg hover:bg-[#9a3409] transition-colors"
        >
          Calculate Running Cost
        </button>

        {/* Results */}
        <ResultsContainer show={!!result}>
          {result && (
            <>
            <DehumidifierCostSVG
              wattage={result.watts}
              hoursPerDay={hoursPerDay}
              electricityRate={currentRate}
              dailyCost={result.costPerDay}
              monthlyCost={result.costPerMonth}
              pintsPerDay={result.pintsPerDay}
              energyFactor={result.integratedEnergyFactor}
            />

            {/* Primary Results */}
            <div className="bg-orange-50 border border-orange-200 rounded-lg p-4">
              <ResultsGrid columns={3}>
                <CalculatorResult
                  label="Monthly Cost"
                  value={`$${result.costPerMonth.toFixed(2)}`}
                  primary
                />
                <CalculatorResult
                  label="Daily Cost"
                  value={`$${result.costPerDay.toFixed(2)}`}
                />
                <CalculatorResult
                  label="Seasonal Cost"
                  value={`$${result.costPerSeason.toFixed(2)}`}
                  unit={`(${monthsPerYear} months)`}
                />
              </ResultsGrid>
            </div>

            {/* Energy Consumption */}
            <div>
              <h4 className="font-semibold text-slate-900 mb-3">Energy Consumption</h4>
              <ResultsTable
                rows={[
                  { label: 'Rated Wattage', value: result.watts, unit: 'W' },
                  { label: 'Effective Wattage (with duty cycle)', value: result.effectiveWatts, unit: 'W' },
                  { label: 'Daily Energy Use', value: result.kwhPerDay, unit: 'kWh' },
                  { label: 'Monthly Energy Use', value: result.kwhPerMonth, unit: 'kWh' },
                  { label: 'Seasonal Energy Use', value: result.kwhPerSeason, unit: 'kWh' },
                ]}
              />
            </div>

            {/* Moisture Removal */}
            <div>
              <h4 className="font-semibold text-slate-900 mb-3">Moisture Removal</h4>
              <ResultsTable
                rows={[
                  { label: 'Rated Capacity', value: result.pintsPerDay, unit: 'pints/day' },
                  { label: 'Gallons Removed Per Day', value: result.gallonsPerDay, unit: 'gallons' },
                  { label: 'Cost Per Pint Removed', value: `$${result.costPerPint.toFixed(3)}`, unit: '' },
                ]}
              />
            </div>

            {/* Efficiency Rating */}
            <div className="bg-slate-50 border border-slate-200 rounded-lg p-4">
              <h4 className="font-semibold text-slate-900 mb-3">Efficiency Analysis</h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <div className="text-sm text-slate-600">Integrated Energy Factor (IEF)</div>
                  <div className="text-2xl font-bold text-slate-900">
                    {result.integratedEnergyFactor} L/kWh
                  </div>
                  <div
                    className={`text-sm font-medium mt-1 ${
                      getIefRating(result.integratedEnergyFactor).highlight === 'good'
                        ? 'text-green-700'
                        : getIefRating(result.integratedEnergyFactor).highlight === 'warning'
                        ? 'text-amber-600'
                        : 'text-red-700'
                    }`}
                  >
                    {getIefRating(result.integratedEnergyFactor).text}
                  </div>
                </div>
                <div className="text-sm text-slate-600">
                  <p className="mb-2">
                    IEF measures liters of water removed per kWh of electricity.
                    Higher is better.
                  </p>
                  <p>
                    Energy Star minimum: 1.77-2.09 L/kWh depending on capacity.
                  </p>
                </div>
              </div>
            </div>

            {/* Cost breakdown */}
            <div>
              <h4 className="font-semibold text-slate-900 mb-3">Annual Projection</h4>
              <ResultsTable
                rows={[
                  {
                    label: `${monthsPerYear} months of operation`,
                    value: `$${result.costPerSeason.toFixed(2)}`,
                    unit: '',
                  },
                  {
                    label: 'Electricity rate used',
                    value: `$${currentRate.toFixed(3)}`,
                    unit: '/kWh',
                  },
                  {
                    label: 'Assumed duty cycle',
                    value: result.dutyCycle,
                    unit: '%',
                  },
                ]}
              />
            </div>

            {/* Methodology note */}
            <div className="text-xs text-slate-500 border-t border-slate-200 pt-4">
              <p className="font-medium mb-1">Calculation Methodology:</p>
              <p>
                Daily kWh = (Watts × Hours × Duty Cycle) ÷ 1,000. Integrated Energy Factor (IEF) =
                Liters removed per day ÷ kWh per day. IEF is the DOE standard efficiency metric for
                dehumidifiers. Duty cycle accounts for compressor cycling based on humidity levels.
              </p>
            </div>
            </>
          )}
        </ResultsContainer>
      </div>
    </CalculatorWrapper>
  );
}
