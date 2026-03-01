'use client';

import { useState } from 'react';
import CalculatorWrapper from '../CalculatorWrapper';
import CalculatorInput from '../CalculatorInput';
import { CalculatorResult, ResultsGrid, ResultsTable } from '../CalculatorResult';
import ResultsContainer from '../ResultsContainer';
import HeatPumpSizingSVG from './HeatPumpSizingSVG';

// Climate data with design temperatures and HDD
// Source: ASHRAE Handbook of Fundamentals, DOE climate zones
const CLIMATE_ZONES = [
  { id: 'zone1', name: 'Zone 1 - Hot Humid (FL, Gulf Coast)', designTemp: 35, coolDesign: 95, hdd: 500 },
  { id: 'zone2', name: 'Zone 2 - Hot Dry (AZ, Southern CA, TX)', designTemp: 30, coolDesign: 105, hdd: 1500 },
  { id: 'zone3', name: 'Zone 3 - Mixed Humid (SE states)', designTemp: 25, coolDesign: 95, hdd: 3000 },
  { id: 'zone4', name: 'Zone 4 - Mixed Dry (OK, NM)', designTemp: 15, coolDesign: 100, hdd: 4000 },
  { id: 'zone5', name: 'Zone 5 - Cool Humid (Northeast, PNW)', designTemp: 10, coolDesign: 90, hdd: 5500 },
  { id: 'zone6', name: 'Zone 6 - Cold (Upper Midwest)', designTemp: 0, coolDesign: 90, hdd: 7000 },
  { id: 'zone7', name: 'Zone 7 - Very Cold (MN, WI, ME)', designTemp: -10, coolDesign: 85, hdd: 8500 },
];

// Heat pump capacity vs outdoor temperature (typical air-source)
// Source: AHRI, manufacturer performance data
// Capacity as percentage of rated capacity at 47°F
const CAPACITY_CURVE = [
  { temp: 47, capacity: 100, cop: 3.5 },
  { temp: 35, capacity: 85, cop: 3.0 },
  { temp: 25, capacity: 72, cop: 2.5 },
  { temp: 17, capacity: 62, cop: 2.2 },
  { temp: 5, capacity: 48, cop: 1.8 },
  { temp: -5, capacity: 35, cop: 1.5 },
  { temp: -15, capacity: 25, cop: 1.2 },
];

// Heat pump types with performance characteristics
const HP_TYPES = [
  { id: 'standard', name: 'Standard Air-Source', minTemp: 25, capacityFactor: 1.0 },
  { id: 'cold-climate', name: 'Cold Climate (Hyper-Heat)', minTemp: -15, capacityFactor: 1.15 },
  { id: 'geothermal', name: 'Geothermal (Ground-Source)', minTemp: -30, capacityFactor: 1.0, constantCOP: 4.0 },
];

// Backup heat types
const BACKUP_TYPES = [
  { id: 'electric', name: 'Electric Resistance', efficiency: 1.0, costPerBTU: 0.0000293 },
  { id: 'gas', name: 'Natural Gas Furnace', efficiency: 0.95, costPerBTU: 0.0000103 },
  { id: 'propane', name: 'Propane Furnace', efficiency: 0.92, costPerBTU: 0.0000261 },
  { id: 'oil', name: 'Oil Furnace', efficiency: 0.85, costPerBTU: 0.0000218 },
];

interface HeatPumpResults {
  heatingLoad: number;
  coolingLoad: number;
  recommendedSize: number;
  balancePoint: number;
  supplementalBTU: number;
  supplementalHours: number;
  annualHeatPumpHours: number;
  annualBackupHours: number;
  capacityAtDesign: number;
  copAtDesign: number;
  sizingMethod: string;
  recommendations: string[];
  temperatureTable: Array<{
    temp: number;
    load: number;
    hpCapacity: number;
    deficit: number;
    cop: number;
  }>;
}

// Interpolate heat pump capacity at a given temperature
function getCapacityAtTemp(
  temp: number,
  ratedCapacity: number,
  hpType: string
): { capacity: number; cop: number } {
  const hp = HP_TYPES.find((h) => h.id === hpType);

  // Geothermal has constant performance
  if (hpType === 'geothermal') {
    return { capacity: ratedCapacity, cop: 4.0 };
  }

  // Cold climate heat pumps maintain better capacity at low temps
  const capacityBoost = hp?.capacityFactor || 1.0;

  // Find surrounding data points and interpolate
  for (let i = 0; i < CAPACITY_CURVE.length - 1; i++) {
    const upper = CAPACITY_CURVE[i];
    const lower = CAPACITY_CURVE[i + 1];

    if (temp >= lower.temp && temp <= upper.temp) {
      const ratio = (temp - lower.temp) / (upper.temp - lower.temp);
      const capacityPercent = lower.capacity + ratio * (upper.capacity - lower.capacity);
      const cop = lower.cop + ratio * (upper.cop - lower.cop);
      return {
        capacity: (ratedCapacity * capacityPercent * capacityBoost) / 100,
        cop,
      };
    }
  }

  // Below lowest temp in curve
  if (temp < CAPACITY_CURVE[CAPACITY_CURVE.length - 1].temp) {
    const lowestPoint = CAPACITY_CURVE[CAPACITY_CURVE.length - 1];
    // Extrapolate decline: ~2% capacity loss per degree below -15°F
    const extraDrop = (lowestPoint.temp - temp) * 2;
    const capacityPercent = Math.max(10, lowestPoint.capacity - extraDrop);
    return {
      capacity: (ratedCapacity * capacityPercent * capacityBoost) / 100,
      cop: Math.max(1.0, lowestPoint.cop - (lowestPoint.temp - temp) * 0.02),
    };
  }

  // Above highest temp (47°F or higher)
  return { capacity: ratedCapacity * capacityBoost, cop: CAPACITY_CURVE[0].cop };
}

// Calculate heat pump sizing with balance point analysis
// Source: ASHRAE Handbook, ACCA Manual S, NEEP cold climate heat pump guidelines
function calculateHeatPumpSize(
  squareFeet: number,
  climateZone: string,
  insulationQuality: string,
  hpType: string,
  backupType: string,
  indoorTemp: number
): HeatPumpResults {
  const climate = CLIMATE_ZONES.find((c) => c.id === climateZone) || CLIMATE_ZONES[2];
  const hp = HP_TYPES.find((h) => h.id === hpType) || HP_TYPES[0];

  // Insulation factors (BTU/hr per sq ft per degree F)
  // Source: ASHRAE Handbook, simplified UA calculation
  const insulationFactors: Record<string, number> = {
    poor: 0.8,
    average: 0.55,
    good: 0.4,
    excellent: 0.28,
  };
  const uaFactor = insulationFactors[insulationQuality] || 0.55;

  // Calculate heating load at design temperature
  // Q = UA × ΔT (simplified whole-house UA method)
  const designDeltaT = indoorTemp - climate.designTemp;
  const heatingLoad = Math.round(squareFeet * uaFactor * designDeltaT);

  // Calculate cooling load (using simplified rule: typically 400-600 sq ft per ton)
  // Adjusted for climate
  const coolingBTUperSqFt = climate.coolDesign > 100 ? 30 : climate.coolDesign > 95 ? 25 : 22;
  const coolingLoad = Math.round(squareFeet * coolingBTUperSqFt);

  // Size the heat pump
  // Strategy: Size to cooling load first, then check heating coverage
  // ACCA Manual S recommends sizing to 90-125% of sensible cooling load
  const coolingTons = coolingLoad / 12000;
  let recommendedSize = Math.ceil(coolingTons * 2) / 2; // Round up to nearest 0.5 ton
  recommendedSize = Math.max(1.5, recommendedSize); // Minimum 1.5 tons

  const ratedCapacity = recommendedSize * 12000;

  // Calculate balance point (where heat pump capacity = heating load)
  // Heat load decreases linearly with rising outdoor temp
  // HP capacity increases with rising outdoor temp
  let balancePoint = climate.designTemp;
  for (let temp = climate.designTemp; temp <= 65; temp += 1) {
    const deltaT = indoorTemp - temp;
    const loadAtTemp = squareFeet * uaFactor * deltaT;
    const { capacity } = getCapacityAtTemp(temp, ratedCapacity, hpType);

    if (capacity >= loadAtTemp) {
      balancePoint = temp;
      break;
    }
  }

  // Get capacity and COP at design temperature
  const designPerformance = getCapacityAtTemp(climate.designTemp, ratedCapacity, hpType);
  const capacityAtDesign = Math.round(designPerformance.capacity);
  const copAtDesign = Math.round(designPerformance.cop * 10) / 10;

  // Calculate supplemental heat required at design temp
  const deficitAtDesign = Math.max(0, heatingLoad - capacityAtDesign);
  const supplementalBTU = deficitAtDesign;

  // Estimate annual hours for heat pump vs backup
  // Simplified bin method based on typical heating season distribution
  // Source: ASHRAE Handbook, bin data
  const heatingDegreeDays = climate.hdd;
  const totalHeatingHours = heatingDegreeDays * 24 / (indoorTemp - 32); // Approximate

  // Hours below balance point (need backup) - simplified estimate
  const tempSpread = balancePoint - climate.designTemp;
  const belowBalanceHours = tempSpread > 0 ? totalHeatingHours * (tempSpread / 50) : 0;
  const supplementalHours = Math.round(Math.min(belowBalanceHours, totalHeatingHours * 0.15));
  const annualHeatPumpHours = Math.round(totalHeatingHours - supplementalHours);
  const annualBackupHours = supplementalHours;

  // Generate temperature table showing capacity vs load
  const temperatureTable: HeatPumpResults['temperatureTable'] = [];
  for (let temp = climate.designTemp; temp <= 47; temp += 5) {
    const deltaT = indoorTemp - temp;
    const load = Math.round(squareFeet * uaFactor * deltaT);
    const perfAtTemp = getCapacityAtTemp(temp, ratedCapacity, hpType);
    const hpCapacity = Math.round(perfAtTemp.capacity);
    const deficit = Math.max(0, load - hpCapacity);

    temperatureTable.push({
      temp,
      load,
      hpCapacity,
      deficit,
      cop: Math.round(perfAtTemp.cop * 10) / 10,
    });
  }

  // Determine sizing method description
  let sizingMethod = '';
  if (coolingLoad > heatingLoad * 0.9) {
    sizingMethod =
      'Sized to cooling load. Heat pump meets most heating needs with supplemental backup for coldest conditions.';
  } else if (hpType === 'cold-climate') {
    sizingMethod =
      'Cold climate heat pump sized for heating dominance. May exceed cooling needs but provides better cold weather performance.';
  } else if (hpType === 'geothermal') {
    sizingMethod =
      'Geothermal system maintains consistent capacity regardless of outdoor temperature. Minimal supplemental heat needed.';
  } else {
    sizingMethod =
      'Balanced sizing approach. Consider cold climate heat pump to reduce supplemental heat needs.';
  }

  // Generate recommendations
  const recommendations: string[] = [];

  if (balancePoint > 35 && hpType === 'standard') {
    recommendations.push(
      'Consider a cold climate heat pump to lower the balance point and reduce backup heat needs.'
    );
  }

  if (supplementalHours > totalHeatingHours * 0.2) {
    recommendations.push(
      'Significant backup heat hours expected. A larger heat pump or cold climate model may be more cost-effective.'
    );
  }

  if (backupType === 'electric' && climate.hdd > 5000) {
    recommendations.push(
      'Electric backup in cold climates can be expensive. Consider a dual-fuel system with gas backup.'
    );
  }

  if (hpType === 'geothermal') {
    recommendations.push(
      'Geothermal systems have higher upfront costs but lowest operating costs. Typical payback is 5-10 years.'
    );
  }

  if (climate.designTemp < 0 && hpType !== 'cold-climate' && hpType !== 'geothermal') {
    recommendations.push(
      'Standard heat pumps struggle below 0°F. A cold climate model is strongly recommended for this zone.'
    );
  }

  recommendations.push(
    'Heat pump sizing should be confirmed with a full Manual J/S calculation by an HVAC professional.'
  );

  return {
    heatingLoad,
    coolingLoad,
    recommendedSize,
    balancePoint,
    supplementalBTU,
    supplementalHours,
    annualHeatPumpHours,
    annualBackupHours,
    capacityAtDesign,
    copAtDesign,
    sizingMethod,
    recommendations,
    temperatureTable,
  };
}

export default function HeatPumpSizingCalculator() {
  const [squareFeet, setSquareFeet] = useState(2000);
  const [climateZone, setClimateZone] = useState('zone4');
  const [insulationQuality, setInsulationQuality] = useState('average');
  const [hpType, setHpType] = useState('standard');
  const [backupType, setBackupType] = useState('electric');
  const [indoorTemp, setIndoorTemp] = useState(70);
  const [results, setResults] = useState<HeatPumpResults | null>(null);

  const handleCalculate = () => {
    const result = calculateHeatPumpSize(
      squareFeet,
      climateZone,
      insulationQuality,
      hpType,
      backupType,
      indoorTemp
    );
    setResults(result);
  };

  const selectedClimate = CLIMATE_ZONES.find((c) => c.id === climateZone);

  return (
    <CalculatorWrapper
      title="Heat Pump Sizing Calculator"
      description="Calculate the right heat pump size with balance point analysis. Includes supplemental heat requirements and performance at your design temperature."
    >
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="space-y-4">
          <h3 className="font-semibold text-slate-800">Home Details</h3>

          <CalculatorInput
            id="squareFeet"
            label="Conditioned Square Footage"
            type="number"
            value={squareFeet}
            onChange={(e) => setSquareFeet(parseInt(e.target.value) || 0)}
            min={500}
            max={10000}
          />

          <CalculatorInput
            id="climateZone"
            label="Climate Zone"
            type="select"
            value={climateZone}
            onChange={(e) => setClimateZone(e.target.value)}
            options={CLIMATE_ZONES.map((c) => ({ value: c.id, label: c.name }))}
          />

          <CalculatorInput
            id="insulationQuality"
            label="Insulation Quality"
            type="select"
            value={insulationQuality}
            onChange={(e) => setInsulationQuality(e.target.value)}
            options={[
              { value: 'poor', label: 'Poor (older home, minimal insulation)' },
              { value: 'average', label: 'Average (standard 2x4 walls, R-13)' },
              { value: 'good', label: 'Good (2x6 walls, R-19+)' },
              { value: 'excellent', label: 'Excellent (spray foam, R-30+ walls)' },
            ]}
          />

          <CalculatorInput
            id="indoorTemp"
            label="Indoor Temperature Setpoint (°F)"
            type="number"
            value={indoorTemp}
            onChange={(e) => setIndoorTemp(parseInt(e.target.value) || 70)}
            min={60}
            max={78}
          />
        </div>

        <div className="space-y-4">
          <h3 className="font-semibold text-slate-800">System Type</h3>

          <CalculatorInput
            id="hpType"
            label="Heat Pump Type"
            type="select"
            value={hpType}
            onChange={(e) => setHpType(e.target.value)}
            options={HP_TYPES.map((h) => ({ value: h.id, label: h.name }))}
            helpText="Cold climate models maintain capacity at lower temps"
          />

          <CalculatorInput
            id="backupType"
            label="Backup/Supplemental Heat"
            type="select"
            value={backupType}
            onChange={(e) => setBackupType(e.target.value)}
            options={BACKUP_TYPES.map((b) => ({ value: b.id, label: b.name }))}
          />

          {selectedClimate && (
            <div className="bg-slate-50 rounded-lg p-3 text-sm">
              <p className="text-slate-600">
                <strong>Design Temperature:</strong> {selectedClimate.designTemp}°F
              </p>
              <p className="text-slate-600">
                <strong>Cooling Design:</strong> {selectedClimate.coolDesign}°F
              </p>
              <p className="text-slate-600">
                <strong>Heating Degree Days:</strong> {selectedClimate.hdd.toLocaleString()}
              </p>
            </div>
          )}
        </div>
      </div>

      <button
        onClick={handleCalculate}
        className="w-full mt-6 px-6 py-3 bg-orange-600 text-white font-semibold rounded-lg hover:bg-orange-700 transition-colors"
      >
        Calculate Heat Pump Size
      </button>

      <ResultsContainer show={!!results} variant="margin">
        {results && (
          <>
          <HeatPumpSizingSVG
            heatingBTU={results.heatingLoad}
            coolingBTU={results.coolingLoad}
            recommendedTons={results.recommendedSize}
            balancePointTemp={results.balancePoint}
            supplementalBTU={results.supplementalBTU}
            homeSqFt={squareFeet}
            climateZone={parseInt(climateZone.replace('zone', '')) || 5}
          />
          <ResultsGrid>
            <CalculatorResult
              label="Recommended Size"
              value={results.recommendedSize}
              unit="tons"
              primary
              subtitle={`${(results.recommendedSize * 12000).toLocaleString()} BTU/hr rated`}
            />
            <CalculatorResult
              label="Balance Point"
              value={results.balancePoint}
              unit="°F"
              subtitle="Temp where backup kicks in"
            />
            <CalculatorResult
              label="Heating Load"
              value={results.heatingLoad.toLocaleString()}
              unit="BTU/hr"
              subtitle="At design temperature"
            />
            <CalculatorResult
              label="Cooling Load"
              value={results.coolingLoad.toLocaleString()}
              unit="BTU/hr"
              subtitle="Peak cooling demand"
            />
          </ResultsGrid>

          {/* Performance at Design Temp */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
              <h4 className="font-semibold text-blue-800">HP Capacity @ {selectedClimate?.designTemp}°F</h4>
              <p className="text-2xl font-bold text-blue-900 mt-1">
                {results.capacityAtDesign.toLocaleString()} BTU/hr
              </p>
              <p className="text-sm text-blue-700">
                COP: {results.copAtDesign}
              </p>
            </div>
            <div className="bg-amber-50 border border-amber-200 rounded-lg p-4">
              <h4 className="font-semibold text-amber-800">Supplemental Heat Needed</h4>
              <p className="text-2xl font-bold text-amber-900 mt-1">
                {results.supplementalBTU.toLocaleString()} BTU/hr
              </p>
              <p className="text-sm text-amber-700">
                Deficit at design temp
              </p>
            </div>
            <div className="bg-green-50 border border-green-200 rounded-lg p-4">
              <h4 className="font-semibold text-green-800">Annual Backup Hours</h4>
              <p className="text-2xl font-bold text-green-900 mt-1">
                ~{results.annualBackupHours} hrs
              </p>
              <p className="text-sm text-green-700">
                Heat pump covers ~{results.annualHeatPumpHours} hrs
              </p>
            </div>
          </div>

          {/* Capacity vs Load Table */}
          <div>
            <h3 className="font-semibold text-slate-800 mb-3">Capacity vs Load by Temperature</h3>
            <ResultsTable
              headers={['Outdoor Temp', 'Heat Load', 'HP Capacity', 'Deficit', 'COP']}
              rows={results.temperatureTable.map((row) => [
                `${row.temp}°F`,
                `${row.load.toLocaleString()} BTU`,
                `${row.hpCapacity.toLocaleString()} BTU`,
                row.deficit > 0 ? `${row.deficit.toLocaleString()} BTU` : '—',
                row.cop.toString(),
              ])}
            />
          </div>

          {/* Sizing Method */}
          <div className="bg-slate-50 border border-slate-200 rounded-lg p-4">
            <h3 className="font-semibold text-slate-800 mb-2">Sizing Approach</h3>
            <p className="text-sm text-slate-700">{results.sizingMethod}</p>
          </div>

          {/* Recommendations */}
          <div className="bg-orange-50 border border-orange-200 rounded-lg p-4">
            <h3 className="font-semibold text-orange-800 mb-2">Recommendations</h3>
            <ul className="space-y-1">
              {results.recommendations.map((rec, idx) => (
                <li key={idx} className="text-sm text-orange-900 flex items-start gap-2">
                  <span className="text-orange-500 mt-0.5">•</span>
                  {rec}
                </li>
              ))}
            </ul>
          </div>

          {/* Formula explanation */}
          <div className="text-sm text-slate-600 bg-slate-50 p-4 rounded-lg">
            <h4 className="font-semibold mb-2">About Balance Point</h4>
            <p>
              The balance point is the outdoor temperature where the heat pump&apos;s capacity
              exactly matches your home&apos;s heat loss. Below this temperature, supplemental
              heat is required.
            </p>
            <p className="mt-2">
              <strong>Key concept:</strong> Heat pump capacity decreases as outdoor temperature
              drops, while heating load increases. Cold climate heat pumps maintain higher
              capacity at low temperatures.
            </p>
            <p className="mt-1">
              <strong>Sources:</strong> ASHRAE Handbook of Fundamentals, ACCA Manual S, NEEP
              Cold Climate Heat Pump Product List
            </p>
          </div>
          </>
        )}
      </ResultsContainer>
    </CalculatorWrapper>
  );
}
