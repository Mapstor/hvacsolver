'use client';

import { useState } from 'react';
import CalculatorWrapper from '../CalculatorWrapper';
import CalculatorInput from '../CalculatorInput';
import { CalculatorResult, ResultsGrid, ResultsTable } from '../CalculatorResult';
import ResultsContainer from '../ResultsContainer';
import HeatingBTUSVG from './HeatingBTUSVG';

// U-values (BTU/hr·ft²·°F) for different components
// Source: ASHRAE Handbook of Fundamentals, typical values
const WALL_R_VALUES: Record<string, { label: string; rValue: number }> = {
  poor: { label: 'Uninsulated (R-4)', rValue: 4 },
  average: { label: 'R-11 Walls (2x4)', rValue: 11 },
  good: { label: 'R-13 Walls (2x4)', rValue: 13 },
  excellent: { label: 'R-19+ Walls (2x6)', rValue: 19 },
};

const CEILING_R_VALUES: Record<string, { label: string; rValue: number }> = {
  poor: { label: 'Minimal (R-11)', rValue: 11 },
  average: { label: 'Standard (R-30)', rValue: 30 },
  good: { label: 'Good (R-38)', rValue: 38 },
  excellent: { label: 'Excellent (R-49+)', rValue: 49 },
};

const FLOOR_TYPES: Record<string, { label: string; rValue: number }> = {
  slab: { label: 'Slab on Grade', rValue: 5 },
  crawl_uninsulated: { label: 'Crawl Space (Uninsulated)', rValue: 5 },
  crawl_insulated: { label: 'Crawl Space (Insulated)', rValue: 19 },
  basement_unheated: { label: 'Over Unheated Basement', rValue: 10 },
  basement_heated: { label: 'Over Heated Basement', rValue: 30 },
};

const WINDOW_TYPES: Record<string, { label: string; uValue: number }> = {
  single: { label: 'Single Pane', uValue: 1.1 },
  double_air: { label: 'Double Pane (Air)', uValue: 0.50 },
  double_argon: { label: 'Double Pane (Argon)', uValue: 0.35 },
  triple: { label: 'Triple Pane', uValue: 0.25 },
};

interface HeatLossComponent {
  name: string;
  area: number;
  rOrU: number;
  deltaT: number;
  heatLoss: number;
  percent: number;
}

interface HeatingBTUResults {
  components: HeatLossComponent[];
  totalHeatLoss: number;
  infiltrationLoss: number;
  grandTotal: number;
  recommendedCapacity: number;
  breakdown: Array<{ category: string; btu: number; percent: number }>;
}

// Calculate heat loss through a surface
// Formula: Q = A × U × ΔT or Q = A × (1/R) × ΔT
// Source: ASHRAE Handbook of Fundamentals, Chapter 25
function calculateSurfaceHeatLoss(
  area: number,
  rValue: number,
  deltaT: number
): number {
  const uValue = 1 / rValue;
  return area * uValue * deltaT;
}

function calculateHeatingBTU(
  squareFeet: number,
  ceilingHeight: number,
  wallRValue: string,
  ceilingRValue: string,
  floorType: string,
  windowType: string,
  windowArea: number,
  doorCount: number,
  indoorTemp: number,
  outdoorDesignTemp: number,
  infiltrationLevel: string
): HeatingBTUResults {
  const deltaT = indoorTemp - outdoorDesignTemp;

  // Calculate component areas
  const perimeter = 4 * Math.sqrt(squareFeet); // Approximate perimeter for square floor plan
  const grossWallArea = perimeter * ceilingHeight;
  const doorArea = doorCount * 20; // Assume 20 sq ft per door
  const netWallArea = grossWallArea - windowArea - doorArea;
  const ceilingArea = squareFeet;
  const floorArea = squareFeet;

  // Get R-values
  const wallR = WALL_R_VALUES[wallRValue].rValue;
  const ceilingR = CEILING_R_VALUES[ceilingRValue].rValue;
  const floorR = FLOOR_TYPES[floorType].rValue;
  const windowU = WINDOW_TYPES[windowType].uValue;
  const doorU = 0.5; // Typical insulated door U-value

  // Calculate heat loss for each component
  const wallLoss = calculateSurfaceHeatLoss(netWallArea, wallR, deltaT);
  const ceilingLoss = calculateSurfaceHeatLoss(ceilingArea, ceilingR, deltaT);
  const floorLoss = calculateSurfaceHeatLoss(floorArea, floorR, deltaT * 0.7); // Floor ΔT is typically less
  const windowLoss = windowArea * windowU * deltaT;
  const doorLoss = doorArea * doorU * deltaT;

  const totalEnvelopeLoss = wallLoss + ceilingLoss + floorLoss + windowLoss + doorLoss;

  // Calculate infiltration heat loss
  // Formula: Q = 0.018 × CFM × ΔT (for air)
  // Estimate CFM based on building tightness
  // Source: ASHRAE 62.2, typical infiltration rates
  const volume = squareFeet * ceilingHeight;
  const achRates: Record<string, number> = {
    tight: 0.2,
    average: 0.5,
    leaky: 1.0,
    very_leaky: 1.5,
  };
  const ach = achRates[infiltrationLevel] || 0.5;
  const cfm = (volume * ach) / 60;
  const infiltrationLoss = 1.08 * cfm * deltaT; // 1.08 = 0.018 × 60 (for BTU/hr)

  const grandTotal = totalEnvelopeLoss + infiltrationLoss;

  // Create component breakdown
  const components: HeatLossComponent[] = [
    {
      name: 'Walls',
      area: Math.round(netWallArea),
      rOrU: wallR,
      deltaT,
      heatLoss: Math.round(wallLoss),
      percent: 0,
    },
    {
      name: 'Ceiling/Roof',
      area: Math.round(ceilingArea),
      rOrU: ceilingR,
      deltaT,
      heatLoss: Math.round(ceilingLoss),
      percent: 0,
    },
    {
      name: 'Floor',
      area: Math.round(floorArea),
      rOrU: floorR,
      deltaT: Math.round(deltaT * 0.7),
      heatLoss: Math.round(floorLoss),
      percent: 0,
    },
    {
      name: 'Windows',
      area: windowArea,
      rOrU: 1 / windowU,
      deltaT,
      heatLoss: Math.round(windowLoss),
      percent: 0,
    },
    {
      name: 'Doors',
      area: doorArea,
      rOrU: 1 / doorU,
      deltaT,
      heatLoss: Math.round(doorLoss),
      percent: 0,
    },
  ];

  // Calculate percentages
  components.forEach((c) => {
    c.percent = Math.round((c.heatLoss / grandTotal) * 100);
  });

  // Create category breakdown
  const breakdown = [
    { category: 'Envelope (Walls, Ceiling, Floor)', btu: Math.round(wallLoss + ceilingLoss + floorLoss), percent: 0 },
    { category: 'Fenestration (Windows, Doors)', btu: Math.round(windowLoss + doorLoss), percent: 0 },
    { category: 'Infiltration (Air Leakage)', btu: Math.round(infiltrationLoss), percent: 0 },
  ];
  breakdown.forEach((b) => {
    b.percent = Math.round((b.btu / grandTotal) * 100);
  });

  // Recommended capacity with 10% safety factor
  const recommendedCapacity = Math.round(grandTotal * 1.1);

  return {
    components,
    totalHeatLoss: Math.round(totalEnvelopeLoss),
    infiltrationLoss: Math.round(infiltrationLoss),
    grandTotal: Math.round(grandTotal),
    recommendedCapacity,
    breakdown,
  };
}

export default function HeatingBTUCalculator() {
  const [squareFeet, setSquareFeet] = useState(2000);
  const [ceilingHeight, setCeilingHeight] = useState(8);
  const [wallRValue, setWallRValue] = useState('average');
  const [ceilingRValue, setCeilingRValue] = useState('average');
  const [floorType, setFloorType] = useState('basement_unheated');
  const [windowType, setWindowType] = useState('double_air');
  const [windowArea, setWindowArea] = useState(200);
  const [doorCount, setDoorCount] = useState(2);
  const [indoorTemp, setIndoorTemp] = useState(70);
  const [outdoorDesignTemp, setOutdoorDesignTemp] = useState(10);
  const [infiltrationLevel, setInfiltrationLevel] = useState('average');
  const [results, setResults] = useState<HeatingBTUResults | null>(null);

  const handleCalculate = () => {
    const result = calculateHeatingBTU(
      squareFeet,
      ceilingHeight,
      wallRValue,
      ceilingRValue,
      floorType,
      windowType,
      windowArea,
      doorCount,
      indoorTemp,
      outdoorDesignTemp,
      infiltrationLevel
    );
    setResults(result);
  };

  return (
    <CalculatorWrapper
      title="Heating BTU Calculator"
      description="Calculate detailed heating load with component-by-component heat loss analysis using simplified Manual J methodology."
    >
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="space-y-4">
          <h3 className="font-semibold text-slate-800">Building Dimensions</h3>

          <CalculatorInput
            id="squareFeet"
            label="Floor Area"
            type="number"
            value={squareFeet}
            onChange={(e) => setSquareFeet(parseFloat(e.target.value) || 0)}
            min={500}
            max={10000}
            unit="sq ft"
          />

          <CalculatorInput
            id="ceilingHeight"
            label="Ceiling Height"
            type="select"
            value={ceilingHeight.toString()}
            onChange={(e) => setCeilingHeight(parseInt(e.target.value))}
            options={[
              { value: '8', label: '8 ft' },
              { value: '9', label: '9 ft' },
              { value: '10', label: '10 ft' },
              { value: '12', label: '12 ft' },
            ]}
          />

          <CalculatorInput
            id="windowArea"
            label="Total Window Area"
            type="number"
            value={windowArea}
            onChange={(e) => setWindowArea(parseFloat(e.target.value) || 0)}
            min={0}
            max={1000}
            unit="sq ft"
          />

          <CalculatorInput
            id="doorCount"
            label="Number of Exterior Doors"
            type="number"
            value={doorCount}
            onChange={(e) => setDoorCount(parseInt(e.target.value) || 0)}
            min={1}
            max={10}
          />

          <h3 className="font-semibold text-slate-800 pt-4">Design Temperatures</h3>

          <CalculatorInput
            id="indoorTemp"
            label="Indoor Temperature"
            type="number"
            value={indoorTemp}
            onChange={(e) => setIndoorTemp(parseFloat(e.target.value) || 0)}
            min={60}
            max={75}
            unit="°F"
          />

          <CalculatorInput
            id="outdoorDesignTemp"
            label="Outdoor Design Temperature"
            type="number"
            value={outdoorDesignTemp}
            onChange={(e) => setOutdoorDesignTemp(parseFloat(e.target.value) || 0)}
            min={-30}
            max={50}
            unit="°F"
            helpText="99% heating design temp for your area. Chicago: 0°F, Atlanta: 22°F, Minneapolis: -12°F"
          />
        </div>

        <div className="space-y-4">
          <h3 className="font-semibold text-slate-800">Insulation Levels</h3>

          <CalculatorInput
            id="wallRValue"
            label="Wall Insulation"
            type="select"
            value={wallRValue}
            onChange={(e) => setWallRValue(e.target.value)}
            options={Object.entries(WALL_R_VALUES).map(([key, value]) => ({
              value: key,
              label: value.label,
            }))}
          />

          <CalculatorInput
            id="ceilingRValue"
            label="Ceiling/Attic Insulation"
            type="select"
            value={ceilingRValue}
            onChange={(e) => setCeilingRValue(e.target.value)}
            options={Object.entries(CEILING_R_VALUES).map(([key, value]) => ({
              value: key,
              label: value.label,
            }))}
          />

          <CalculatorInput
            id="floorType"
            label="Floor Type"
            type="select"
            value={floorType}
            onChange={(e) => setFloorType(e.target.value)}
            options={Object.entries(FLOOR_TYPES).map(([key, value]) => ({
              value: key,
              label: value.label,
            }))}
          />

          <CalculatorInput
            id="windowType"
            label="Window Type"
            type="select"
            value={windowType}
            onChange={(e) => setWindowType(e.target.value)}
            options={Object.entries(WINDOW_TYPES).map(([key, value]) => ({
              value: key,
              label: value.label,
            }))}
          />

          <CalculatorInput
            id="infiltrationLevel"
            label="Air Tightness"
            type="select"
            value={infiltrationLevel}
            onChange={(e) => setInfiltrationLevel(e.target.value)}
            options={[
              { value: 'tight', label: 'Tight (New construction, air sealed)' },
              { value: 'average', label: 'Average (Standard construction)' },
              { value: 'leaky', label: 'Leaky (Older home, some drafts)' },
              { value: 'very_leaky', label: 'Very Leaky (Old home, no air sealing)' },
            ]}
          />

          <button
            onClick={handleCalculate}
            className="w-full mt-4 px-6 py-3 bg-orange-600 text-white font-semibold rounded-lg hover:bg-orange-700 transition-colors"
          >
            Calculate Heating Load
          </button>
        </div>
      </div>

      <ResultsContainer show={!!results} variant="margin">
        {results && (
          <>
          {/* Heat Loss Visualization */}
          <HeatingBTUSVG
            totalBTU={results.grandTotal}
            climateZone={outdoorDesignTemp <= 0 ? 'Very Cold' : outdoorDesignTemp <= 20 ? 'Cold' : outdoorDesignTemp <= 35 ? 'Cool' : 'Mixed'}
            breakdown={results.breakdown.map(b => ({ label: b.category, btu: b.btu, percentage: b.percent }))}
          />

          <ResultsGrid>
            <CalculatorResult
              label="Total Heating Load"
              value={results.grandTotal.toLocaleString()}
              unit="BTU/hr"
              primary
            />
            <CalculatorResult
              label="Recommended Capacity"
              value={results.recommendedCapacity.toLocaleString()}
              unit="BTU/hr"
              subtitle="Includes 10% safety factor"
            />
            <CalculatorResult
              label="Envelope Losses"
              value={results.totalHeatLoss.toLocaleString()}
              unit="BTU/hr"
            />
            <CalculatorResult
              label="Infiltration Loss"
              value={results.infiltrationLoss.toLocaleString()}
              unit="BTU/hr"
            />
          </ResultsGrid>

          {/* Category Breakdown */}
          <div>
            <h3 className="font-semibold text-slate-800 mb-3">Heat Loss by Category</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {results.breakdown.map((b) => (
                <div key={b.category} className="bg-slate-50 rounded-lg p-4">
                  <div className="text-sm text-slate-600">{b.category}</div>
                  <div className="text-xl font-semibold text-slate-900">
                    {b.btu.toLocaleString()} BTU/hr
                  </div>
                  <div className="w-full bg-slate-200 rounded-full h-2 mt-2">
                    <div
                      className="bg-orange-500 h-2 rounded-full"
                      style={{ width: `${b.percent}%` }}
                    ></div>
                  </div>
                  <div className="text-xs text-slate-500 mt-1">{b.percent}% of total</div>
                </div>
              ))}
            </div>
          </div>

          {/* Component Breakdown */}
          <div>
            <h3 className="font-semibold text-slate-800 mb-3">Component-by-Component Analysis</h3>
            <ResultsTable
              headers={['Component', 'Area (sq ft)', 'R-Value', 'ΔT (°F)', 'Heat Loss', '% Total']}
              rows={results.components.map((c) => [
                c.name,
                c.area.toString(),
                `R-${c.rOrU.toFixed(1)}`,
                c.deltaT.toString(),
                `${c.heatLoss.toLocaleString()} BTU/hr`,
                `${c.percent}%`,
              ])}
            />
          </div>

          {/* Improvement suggestions based on breakdown */}
          <div className="bg-orange-50 border border-orange-200 rounded-lg p-4">
            <h3 className="font-semibold text-orange-800 mb-2">Improvement Opportunities</h3>
            <ul className="text-sm text-orange-900 list-disc list-inside space-y-1">
              {results.components
                .sort((a, b) => b.percent - a.percent)
                .slice(0, 3)
                .map((c) => (
                  <li key={c.name}>
                    <strong>{c.name}:</strong> {c.percent}% of heat loss (
                    {c.heatLoss.toLocaleString()} BTU/hr)
                    {c.name === 'Windows' && c.percent > 20 && ' - Consider upgrading to triple pane'}
                    {c.name === 'Walls' && c.percent > 25 && ' - Consider adding wall insulation'}
                    {c.name === 'Ceiling/Roof' && c.percent > 15 && ' - Add attic insulation to R-49+'}
                  </li>
                ))}
            </ul>
          </div>

          {/* Formula explanation */}
          <div className="text-sm text-slate-600 bg-slate-50 p-4 rounded-lg">
            <h4 className="font-semibold mb-2">Calculation Method</h4>
            <p>
              <strong>Surface heat loss:</strong> Q = A × U × ΔT, where U = 1/R-value
            </p>
            <p className="mt-1">
              <strong>Infiltration heat loss:</strong> Q = 1.08 × CFM × ΔT
            </p>
            <p className="mt-1">
              <strong>Design temperature difference:</strong> ΔT = Indoor temp - 99% outdoor design
              temperature
            </p>
            <p className="mt-1">
              <strong>Sources:</strong> ASHRAE Handbook of Fundamentals Chapter 25, ACCA Manual J
              methodology
            </p>
          </div>
          </>
        )}
      </ResultsContainer>
    </CalculatorWrapper>
  );
}
