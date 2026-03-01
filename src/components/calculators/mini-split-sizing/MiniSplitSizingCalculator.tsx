'use client';

import { useState } from 'react';
import CalculatorWrapper from '../CalculatorWrapper';
import CalculatorInput from '../CalculatorInput';
import { CalculatorResult, ResultsGrid, ResultsTable } from '../CalculatorResult';
import ResultsContainer from '../ResultsContainer';
import MiniSplitSizingSVG from './MiniSplitSizingSVG';

// Climate zone multipliers for BTU calculations
// Source: ACCA Manual J simplified factors, Energy Star guidelines
const CLIMATE_ZONES: Record<string, { label: string; multiplier: number }> = {
  hot_humid: { label: 'Hot & Humid (FL, Gulf Coast)', multiplier: 1.15 },
  hot_dry: { label: 'Hot & Dry (AZ, NV)', multiplier: 1.10 },
  mixed_humid: { label: 'Mixed Humid (Mid-Atlantic, Southeast)', multiplier: 1.0 },
  mixed_dry: { label: 'Mixed Dry (TX, OK)', multiplier: 1.0 },
  cold: { label: 'Cold (Northern US)', multiplier: 0.95 },
  very_cold: { label: 'Very Cold (MN, WI, New England)', multiplier: 0.90 },
};

// Standard mini-split head sizes (BTU)
const HEAD_SIZES = [6000, 9000, 12000, 15000, 18000, 24000];

// Standard multi-zone outdoor unit sizes (BTU)
const OUTDOOR_UNIT_SIZES = [18000, 24000, 30000, 36000, 42000, 48000, 60000];

interface Zone {
  id: number;
  name: string;
  squareFeet: number;
  ceilingHeight: number;
  sunExposure: string;
  insulation: string;
}

interface ZoneResult {
  id: number;
  name: string;
  baseBTU: number;
  adjustedBTU: number;
  recommendedHead: number;
  notes: string;
}

interface MiniSplitResults {
  zones: ZoneResult[];
  totalIndoorBTU: number;
  recommendedOutdoorUnit: number;
  systemType: string;
  oversizePercent: number;
  limitations: string[];
  recommendations: string[];
}

// Calculate BTU for a single zone
// Base: 25 BTU per sq ft (higher than central AC due to mini-split characteristics)
// Source: Mitsubishi, Fujitsu, Daikin sizing guides
function calculateZoneBTU(zone: Zone, climateMultiplier: number): ZoneResult {
  // Base calculation: 25 BTU per sq ft for mini-splits
  let baseBTU = zone.squareFeet * 25;

  // Ceiling height adjustment (base is 8 ft)
  const ceilingFactor = zone.ceilingHeight / 8;
  baseBTU *= ceilingFactor;

  // Sun exposure adjustment
  const sunMultipliers: Record<string, number> = {
    north: 0.95,
    east: 1.0,
    west: 1.1,
    south: 1.15,
    multiple: 1.1,
  };
  baseBTU *= sunMultipliers[zone.sunExposure] || 1.0;

  // Insulation adjustment
  const insulationMultipliers: Record<string, number> = {
    excellent: 0.85,
    good: 0.95,
    average: 1.0,
    poor: 1.15,
  };
  baseBTU *= insulationMultipliers[zone.insulation] || 1.0;

  // Climate zone adjustment
  baseBTU *= climateMultiplier;

  const adjustedBTU = Math.round(baseBTU);

  // Find appropriate head size
  const recommendedHead = findHeadSize(adjustedBTU);

  // Generate notes for this zone
  let notes = '';
  if (adjustedBTU > 24000) {
    notes = 'Consider splitting into two zones or using ducted mini-split.';
  } else if (adjustedBTU < 6000) {
    notes = 'Small zone - 6,000 BTU minimum head may provide excess capacity.';
  }

  return {
    id: zone.id,
    name: zone.name,
    baseBTU: Math.round(zone.squareFeet * 25),
    adjustedBTU,
    recommendedHead,
    notes,
  };
}

function findHeadSize(btu: number): number {
  // Find smallest head that meets or exceeds requirement
  for (const size of HEAD_SIZES) {
    if (size >= btu) {
      return size;
    }
  }
  // If exceeds largest, return largest with note
  return HEAD_SIZES[HEAD_SIZES.length - 1];
}

function findOutdoorUnit(totalBTU: number, zoneCount: number): number {
  // Multi-zone systems can be sized for sum of indoor units
  // But typically sized at 75-100% of total indoor capacity due to diversity
  const diversityFactor = zoneCount <= 2 ? 1.0 : zoneCount <= 3 ? 0.9 : 0.85;
  const targetBTU = totalBTU * diversityFactor;

  for (const size of OUTDOOR_UNIT_SIZES) {
    if (size >= targetBTU) {
      return size;
    }
  }
  return OUTDOOR_UNIT_SIZES[OUTDOOR_UNIT_SIZES.length - 1];
}

function calculateMiniSplitSystem(zones: Zone[], climateZone: string): MiniSplitResults {
  const climateMultiplier = CLIMATE_ZONES[climateZone]?.multiplier || 1.0;

  // Calculate each zone
  const zoneResults = zones.map((zone) => calculateZoneBTU(zone, climateMultiplier));

  // Sum indoor BTU requirements
  const totalIndoorBTU = zoneResults.reduce((sum, z) => sum + z.recommendedHead, 0);

  // Find appropriate outdoor unit
  const recommendedOutdoorUnit = findOutdoorUnit(totalIndoorBTU, zones.length);

  // Calculate oversize percentage
  const oversizePercent = Math.round((totalIndoorBTU / recommendedOutdoorUnit - 1) * 100);

  // Determine system type
  let systemType = '';
  if (zones.length === 1) {
    systemType = 'Single-Zone Mini Split';
  } else if (zones.length <= 5) {
    systemType = `${zones.length}-Zone Multi-Split System`;
  } else {
    systemType = 'Multiple Systems Required';
  }

  // Check for limitations
  const limitations: string[] = [];
  if (zones.length > 5) {
    limitations.push('Most multi-zone systems support a maximum of 5 indoor units.');
  }
  if (totalIndoorBTU > recommendedOutdoorUnit * 1.3) {
    limitations.push(
      'Total indoor capacity exceeds 130% of outdoor unit - this may affect efficiency.'
    );
  }
  if (zoneResults.some((z) => z.adjustedBTU > 24000)) {
    limitations.push(
      'Some zones exceed 24,000 BTU - the maximum standard wall-mount head size.'
    );
  }
  if (zoneResults.some((z) => z.adjustedBTU < 4000)) {
    limitations.push('Very small zones may be overcooled with minimum 6,000 BTU heads.');
  }

  // Generate recommendations
  const recommendations: string[] = [];
  if (zones.length === 1) {
    recommendations.push(
      'Single-zone systems are most efficient. Match outdoor and indoor unit sizes.'
    );
  } else {
    recommendations.push(
      'Multi-zone systems share one outdoor unit. Consider individual units for better efficiency if zones have different usage patterns.'
    );
  }
  if (climateZone === 'very_cold' || climateZone === 'cold') {
    recommendations.push(
      'In cold climates, choose a cold-climate mini-split (Hyper Heat, H2i) rated for heating below 0°F.'
    );
  }
  if (totalIndoorBTU > 36000) {
    recommendations.push(
      'For large systems, ensure adequate electrical service (240V, 30-50 amp circuits).'
    );
  }

  return {
    zones: zoneResults,
    totalIndoorBTU,
    recommendedOutdoorUnit,
    systemType,
    oversizePercent,
    limitations,
    recommendations,
  };
}

export default function MiniSplitSizingCalculator() {
  const [zones, setZones] = useState<Zone[]>([
    {
      id: 1,
      name: 'Living Room',
      squareFeet: 400,
      ceilingHeight: 8,
      sunExposure: 'south',
      insulation: 'average',
    },
    {
      id: 2,
      name: 'Master Bedroom',
      squareFeet: 250,
      ceilingHeight: 8,
      sunExposure: 'east',
      insulation: 'average',
    },
  ]);
  const [climateZone, setClimateZone] = useState('mixed_humid');
  const [results, setResults] = useState<MiniSplitResults | null>(null);

  const addZone = () => {
    if (zones.length < 8) {
      setZones([
        ...zones,
        {
          id: Date.now(),
          name: `Zone ${zones.length + 1}`,
          squareFeet: 200,
          ceilingHeight: 8,
          sunExposure: 'north',
          insulation: 'average',
        },
      ]);
    }
  };

  const removeZone = (id: number) => {
    if (zones.length > 1) {
      setZones(zones.filter((z) => z.id !== id));
    }
  };

  const updateZone = (id: number, field: keyof Zone, value: string | number) => {
    setZones(zones.map((z) => (z.id === id ? { ...z, [field]: value } : z)));
  };

  const handleCalculate = () => {
    const result = calculateMiniSplitSystem(zones, climateZone);
    setResults(result);
  };

  return (
    <CalculatorWrapper
      title="Mini Split Sizing Calculator"
      description="Calculate the right mini-split system size for single or multi-zone installations based on room characteristics and climate."
    >
      <div className="space-y-6">
        {/* Climate Zone Selection */}
        <CalculatorInput
          id="climateZone"
          label="Climate Zone"
          type="select"
          value={climateZone}
          onChange={(e) => setClimateZone(e.target.value)}
          options={Object.entries(CLIMATE_ZONES).map(([key, value]) => ({
            value: key,
            label: value.label,
          }))}
        />

        {/* Zone Configuration */}
        <div>
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-semibold text-slate-800">Zones ({zones.length})</h3>
            <button
              onClick={addZone}
              disabled={zones.length >= 8}
              className="px-3 py-1 text-sm bg-slate-100 text-slate-700 rounded hover:bg-slate-200 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              + Add Zone
            </button>
          </div>

          <div className="space-y-4">
            {zones.map((zone, index) => (
              <div
                key={zone.id}
                className="bg-slate-50 border border-slate-200 rounded-lg p-4"
              >
                <div className="flex items-center justify-between mb-3">
                  <input
                    type="text"
                    value={zone.name}
                    onChange={(e) => updateZone(zone.id, 'name', e.target.value)}
                    className="font-medium text-slate-800 bg-transparent border-b border-slate-300 focus:outline-none focus:border-orange-500"
                  />
                  {zones.length > 1 && (
                    <button
                      onClick={() => removeZone(zone.id)}
                      className="text-sm text-red-600 hover:text-red-800"
                    >
                      Remove
                    </button>
                  )}
                </div>

                <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                  <div>
                    <label className="block text-xs text-slate-600 mb-1">Square Feet</label>
                    <input
                      type="number"
                      value={zone.squareFeet}
                      onChange={(e) =>
                        updateZone(zone.id, 'squareFeet', parseInt(e.target.value) || 0)
                      }
                      min={50}
                      max={2000}
                      className="w-full px-2 py-1 text-sm border border-slate-300 rounded focus:outline-none focus:ring-2 focus:ring-orange-500"
                    />
                  </div>
                  <div>
                    <label className="block text-xs text-slate-600 mb-1">Ceiling Height</label>
                    <select
                      value={zone.ceilingHeight}
                      onChange={(e) =>
                        updateZone(zone.id, 'ceilingHeight', parseInt(e.target.value))
                      }
                      className="w-full px-2 py-1 text-sm border border-slate-300 rounded focus:outline-none focus:ring-2 focus:ring-orange-500"
                    >
                      <option value={8}>8 ft</option>
                      <option value={9}>9 ft</option>
                      <option value={10}>10 ft</option>
                      <option value={12}>12 ft</option>
                      <option value={14}>14+ ft</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-xs text-slate-600 mb-1">Sun Exposure</label>
                    <select
                      value={zone.sunExposure}
                      onChange={(e) => updateZone(zone.id, 'sunExposure', e.target.value)}
                      className="w-full px-2 py-1 text-sm border border-slate-300 rounded focus:outline-none focus:ring-2 focus:ring-orange-500"
                    >
                      <option value="north">North (least sun)</option>
                      <option value="east">East (morning)</option>
                      <option value="west">West (afternoon)</option>
                      <option value="south">South (most sun)</option>
                      <option value="multiple">Multiple exposures</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-xs text-slate-600 mb-1">Insulation</label>
                    <select
                      value={zone.insulation}
                      onChange={(e) => updateZone(zone.id, 'insulation', e.target.value)}
                      className="w-full px-2 py-1 text-sm border border-slate-300 rounded focus:outline-none focus:ring-2 focus:ring-orange-500"
                    >
                      <option value="excellent">Excellent (new construction)</option>
                      <option value="good">Good</option>
                      <option value="average">Average</option>
                      <option value="poor">Poor (older home)</option>
                    </select>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <button
          onClick={handleCalculate}
          className="w-full px-6 py-3 bg-orange-600 text-white font-semibold rounded-lg hover:bg-orange-700 transition-colors"
        >
          Calculate Mini Split Size
        </button>
      </div>

      <ResultsContainer show={!!results} variant="margin">
        {results && (
          <>
          <MiniSplitSizingSVG
            totalBTU={results.totalIndoorBTU}
            roomCount={results.zones.length}
            zones={results.zones.map(z => ({ name: z.name, btu: z.recommendedHead }))}
            outdoorUnitSize={results.recommendedOutdoorUnit}
          />
          <ResultsGrid>
            <CalculatorResult
              label="System Type"
              value={results.systemType}
              subtitle={`${results.zones.length} indoor unit${results.zones.length > 1 ? 's' : ''}`}
            />
            <CalculatorResult
              label="Total Indoor Capacity"
              value={`${(results.totalIndoorBTU / 1000).toFixed(0)}k BTU`}
              subtitle="Sum of all indoor heads"
            />
            <CalculatorResult
              label="Outdoor Unit"
              value={`${(results.recommendedOutdoorUnit / 1000).toFixed(0)}k BTU`}
              subtitle={`${results.recommendedOutdoorUnit / 12000} ton capacity`}
            />
            <CalculatorResult
              label="Indoor/Outdoor Ratio"
              value={`${Math.round((results.totalIndoorBTU / results.recommendedOutdoorUnit) * 100)}%`}
              subtitle={
                results.oversizePercent > 0
                  ? `${results.oversizePercent}% above outdoor capacity`
                  : 'Within capacity limits'
              }
            />
          </ResultsGrid>

          {/* Zone Breakdown */}
          <div>
            <h3 className="font-semibold text-slate-800 mb-3">Zone-by-Zone Sizing</h3>
            <ResultsTable
              headers={['Zone', 'Sq Ft', 'Calculated BTU', 'Recommended Head']}
              rows={results.zones.map((z) => [
                z.name,
                zones.find((zone) => zone.id === z.id)?.squareFeet.toString() || '',
                `${z.adjustedBTU.toLocaleString()} BTU`,
                `${(z.recommendedHead / 1000).toFixed(0)}k BTU`,
              ])}
            />
          </div>

          {/* Zone Notes */}
          {results.zones.some((z) => z.notes) && (
            <div className="bg-amber-50 border border-amber-200 rounded-lg p-4">
              <h3 className="font-semibold text-amber-800 mb-2">Zone Notes</h3>
              <ul className="text-sm text-amber-900 space-y-1">
                {results.zones
                  .filter((z) => z.notes)
                  .map((z) => (
                    <li key={z.id}>
                      <strong>{z.name}:</strong> {z.notes}
                    </li>
                  ))}
              </ul>
            </div>
          )}

          {/* Limitations */}
          {results.limitations.length > 0 && (
            <div className="bg-red-50 border border-red-200 rounded-lg p-4">
              <h3 className="font-semibold text-red-800 mb-2">System Limitations</h3>
              <ul className="text-sm text-red-900 list-disc list-inside space-y-1">
                {results.limitations.map((limitation, i) => (
                  <li key={i}>{limitation}</li>
                ))}
              </ul>
            </div>
          )}

          {/* Recommendations */}
          <div className="bg-orange-50 border border-orange-200 rounded-lg p-4">
            <h3 className="font-semibold text-orange-800 mb-2">Recommendations</h3>
            <ul className="text-sm text-orange-900 list-disc list-inside space-y-1">
              {results.recommendations.map((rec, i) => (
                <li key={i}>{rec}</li>
              ))}
            </ul>
          </div>

          {/* Formula explanation */}
          <div className="text-sm text-slate-600 bg-slate-50 p-4 rounded-lg">
            <h4 className="font-semibold mb-2">Calculation Method</h4>
            <p>
              <strong>Base formula:</strong> 25 BTU per square foot, adjusted for ceiling height,
              sun exposure, insulation, and climate zone.
            </p>
            <p className="mt-1">
              <strong>Multi-zone sizing:</strong> Diversity factor of 85-100% applied based on zone
              count, as not all zones typically run simultaneously at full capacity.
            </p>
            <p className="mt-1">
              <strong>Sources:</strong> ACCA Manual J (simplified), Mitsubishi/Fujitsu/Daikin
              sizing guidelines, Energy Star specifications
            </p>
          </div>
          </>
        )}
      </ResultsContainer>
    </CalculatorWrapper>
  );
}
