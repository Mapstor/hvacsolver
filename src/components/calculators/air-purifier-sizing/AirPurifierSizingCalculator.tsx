'use client';

import { useState } from 'react';
import CalculatorWrapper from '../CalculatorWrapper';
import CalculatorInput from '../CalculatorInput';
import { CalculatorResult, ResultsGrid, ResultsTable } from '../CalculatorResult';
import ResultsContainer from '../ResultsContainer';
import AirPurifierSizingSVG from './AirPurifierSizingSVG';

// AHAM CADR guidelines and pollutant types
// Source: AHAM AC-1 Standard, EPA Guide to Air Cleaners
const POLLUTANT_TYPES = [
  {
    id: 'smoke',
    name: 'Smoke',
    description: 'Smallest particles (0.09-1.0 μm) - tobacco, wildfire, cooking',
    achRecommended: 4.8,
  },
  {
    id: 'dust',
    name: 'Dust',
    description: 'Medium particles (0.5-3.0 μm) - dust mites, fibers, mold',
    achRecommended: 4.0,
  },
  {
    id: 'pollen',
    name: 'Pollen',
    description: 'Larger particles (5.0-11.0 μm) - seasonal allergens',
    achRecommended: 3.0,
  },
];

// Room types with typical sizes and priority pollutants
const ROOM_TYPES = [
  { id: 'bedroom', name: 'Bedroom', typicalSize: 150, priority: 'dust' },
  { id: 'living', name: 'Living Room', typicalSize: 350, priority: 'dust' },
  { id: 'office', name: 'Home Office', typicalSize: 120, priority: 'dust' },
  { id: 'nursery', name: 'Nursery/Baby Room', typicalSize: 120, priority: 'smoke' },
  { id: 'basement', name: 'Basement', typicalSize: 600, priority: 'dust' },
  { id: 'studio', name: 'Studio Apartment', typicalSize: 500, priority: 'smoke' },
  { id: 'openplan', name: 'Open Plan Living', typicalSize: 800, priority: 'dust' },
];

// Use case scenarios affecting ACH requirements
// Source: EPA, ASHRAE 62.2
const USE_CASES = [
  { id: 'general', name: 'General air quality', achMultiplier: 1.0 },
  { id: 'allergies', name: 'Allergies/Asthma', achMultiplier: 1.25 },
  { id: 'pets', name: 'Pet owners', achMultiplier: 1.15 },
  { id: 'smoker', name: 'Smoke exposure (indoor/outdoor)', achMultiplier: 1.5 },
  { id: 'immune', name: 'Immunocompromised', achMultiplier: 1.5 },
  { id: 'wildfire', name: 'Wildfire smoke area', achMultiplier: 1.5 },
];

// Standard CADR ranges for purifier sizes
// Source: AHAM certified product database typical ranges
const PURIFIER_SIZES = [
  { label: 'Small (tabletop)', minCADR: 50, maxCADR: 100 },
  { label: 'Medium (portable)', minCADR: 100, maxCADR: 200 },
  { label: 'Large (tower)', minCADR: 200, maxCADR: 350 },
  { label: 'Extra Large', minCADR: 350, maxCADR: 500 },
  { label: 'Whole Room', minCADR: 500, maxCADR: 800 },
];

interface AirPurifierResults {
  roomVolume: number;
  ahamMinCADR: number;
  achBasedCADR: number;
  recommendedCADR: number;
  achievedACH: number;
  maxRoomSize: number;
  purifierSize: string;
  pollutantRecommendations: Array<{
    pollutant: string;
    minCADR: number;
    achieved: boolean;
  }>;
  roomCoverageTable: Array<{
    cadr: number;
    maxRoom8ft: number;
    maxRoom10ft: number;
    ach4: number;
  }>;
  tips: string[];
  caution: string | null;
}

// Calculate air purifier sizing using AHAM 2/3 rule and ACH method
// Source: AHAM AC-1 Standard, EPA Guide to Air Cleaners in the Home
function calculateAirPurifierSize(
  roomSqFt: number,
  ceilingHeight: number,
  pollutantType: string,
  useCase: string,
  existingCADR: number | null
): AirPurifierResults {
  const pollutant = POLLUTANT_TYPES.find((p) => p.id === pollutantType) || POLLUTANT_TYPES[1];
  const scenario = USE_CASES.find((u) => u.id === useCase) || USE_CASES[0];

  // Calculate room volume
  const roomVolume = roomSqFt * ceilingHeight;

  // AHAM 2/3 Rule: CADR should be at least 2/3 of room square footage
  // Source: AHAM AC-1
  const ahamMinCADR = Math.ceil((roomSqFt * 2) / 3);

  // ACH-based CADR calculation
  // CADR (CFM) = (Room Volume × Desired ACH) / 60
  // Source: EPA Indoor Air Quality guidance
  const targetACH = pollutant.achRecommended * scenario.achMultiplier;
  const achBasedCADR = Math.ceil((roomVolume * targetACH) / 60);

  // Recommended CADR is the higher of the two methods
  const recommendedCADR = Math.max(ahamMinCADR, achBasedCADR);

  // Calculate achieved ACH with recommended CADR
  // ACH = (CADR × 60) / Room Volume
  const achievedACH = Math.round(((recommendedCADR * 60) / roomVolume) * 10) / 10;

  // Calculate max room size this CADR would cover (using 2/3 rule)
  const maxRoomSize = Math.floor(recommendedCADR * 1.5);

  // Determine purifier size category
  let purifierSize = 'Extra Large';
  for (const size of PURIFIER_SIZES) {
    if (recommendedCADR >= size.minCADR && recommendedCADR <= size.maxCADR) {
      purifierSize = size.label;
      break;
    }
  }
  if (recommendedCADR > 800) {
    purifierSize = 'Multiple units recommended';
  }

  // Check each pollutant type
  const pollutantRecommendations = POLLUTANT_TYPES.map((p) => {
    const minCADRForPollutant = Math.ceil((roomVolume * p.achRecommended) / 60);
    return {
      pollutant: p.name,
      minCADR: minCADRForPollutant,
      achieved: recommendedCADR >= minCADRForPollutant,
    };
  });

  // Generate room coverage table for reference
  const roomCoverageTable = [100, 150, 200, 250, 300, 400, 500].map((cadr) => ({
    cadr,
    maxRoom8ft: Math.floor(cadr * 1.5),
    maxRoom10ft: Math.floor((cadr * 1.5 * 8) / 10),
    ach4: Math.floor((cadr * 60) / (8 * 4)), // sq ft that achieves 4 ACH at 8ft ceiling
  }));

  // Generate tips
  const tips: string[] = [];

  if (recommendedCADR > 500) {
    tips.push(
      'For rooms this large, consider multiple purifiers strategically placed rather than one large unit.'
    );
  }

  if (pollutantType === 'smoke' || useCase === 'smoker' || useCase === 'wildfire') {
    tips.push(
      'For smoke, look for purifiers with activated carbon filters in addition to HEPA for odor removal.'
    );
  }

  if (useCase === 'allergies') {
    tips.push(
      'For allergies, ensure the purifier has a true HEPA filter (H13 or H14) that captures 99.97% of 0.3μm particles.'
    );
  }

  tips.push('Place the purifier away from walls and corners for optimal airflow.');
  tips.push('Run the purifier continuously on a lower setting rather than intermittently on high.');
  tips.push(
    'Check the filter replacement schedule - HEPA filters typically last 6-12 months, carbon filters 3-6 months.'
  );

  // Caution for very large spaces
  let caution: string | null = null;
  if (roomSqFt > 1000) {
    caution =
      'For spaces over 1,000 sq ft, consider whole-home air purification (HVAC-integrated) or multiple portable units.';
  } else if (ceilingHeight > 12) {
    caution =
      'High ceilings significantly increase required CADR. Consider units with strong vertical airflow.';
  }

  return {
    roomVolume,
    ahamMinCADR,
    achBasedCADR,
    recommendedCADR,
    achievedACH,
    maxRoomSize,
    purifierSize,
    pollutantRecommendations,
    roomCoverageTable,
    tips,
    caution,
  };
}

export default function AirPurifierSizingCalculator() {
  const [roomSqFt, setRoomSqFt] = useState(300);
  const [ceilingHeight, setCeilingHeight] = useState(8);
  const [pollutantType, setPollutantType] = useState('dust');
  const [useCase, setUseCase] = useState('general');
  const [results, setResults] = useState<AirPurifierResults | null>(null);

  const handleCalculate = () => {
    const result = calculateAirPurifierSize(
      roomSqFt,
      ceilingHeight,
      pollutantType,
      useCase,
      null
    );
    setResults(result);
  };

  const selectedPollutant = POLLUTANT_TYPES.find((p) => p.id === pollutantType);

  return (
    <CalculatorWrapper
      title="Air Purifier Sizing Calculator"
      description="Calculate the right air purifier CADR rating for your room using the AHAM 2/3 rule and Air Changes per Hour (ACH) method."
    >
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-4">
          <h3 className="font-semibold text-slate-800">Room Details</h3>

          <CalculatorInput
            id="roomSqFt"
            label="Room Size (square feet)"
            type="number"
            value={roomSqFt}
            onChange={(e) => setRoomSqFt(parseInt(e.target.value) || 0)}
            min={50}
            max={2000}
          />

          <CalculatorInput
            id="ceilingHeight"
            label="Ceiling Height (feet)"
            type="number"
            value={ceilingHeight}
            onChange={(e) => setCeilingHeight(parseFloat(e.target.value) || 8)}
            min={7}
            max={20}
            step={0.5}
          />

          {/* Quick room presets */}
          <div>
            <p className="text-sm text-slate-600 mb-2">Quick presets:</p>
            <div className="flex flex-wrap gap-2">
              {ROOM_TYPES.slice(0, 4).map((room) => (
                <button
                  key={room.id}
                  onClick={() => setRoomSqFt(room.typicalSize)}
                  className="px-3 py-1 text-sm bg-slate-100 hover:bg-slate-200 rounded transition-colors"
                >
                  {room.name} (~{room.typicalSize} sf)
                </button>
              ))}
            </div>
          </div>
        </div>

        <div className="space-y-4">
          <h3 className="font-semibold text-slate-800">Air Quality Needs</h3>

          <CalculatorInput
            id="pollutantType"
            label="Primary Concern"
            type="select"
            value={pollutantType}
            onChange={(e) => setPollutantType(e.target.value)}
            options={POLLUTANT_TYPES.map((p) => ({ value: p.id, label: p.name }))}
          />

          {selectedPollutant && (
            <p className="text-sm text-slate-600 -mt-2">{selectedPollutant.description}</p>
          )}

          <CalculatorInput
            id="useCase"
            label="Usage Scenario"
            type="select"
            value={useCase}
            onChange={(e) => setUseCase(e.target.value)}
            options={USE_CASES.map((u) => ({ value: u.id, label: u.name }))}
          />
        </div>
      </div>

      <button
        onClick={handleCalculate}
        className="w-full mt-6 px-6 py-3 bg-orange-600 text-white font-semibold rounded-lg hover:bg-orange-700 transition-colors"
      >
        Calculate CADR Requirements
      </button>

      <ResultsContainer show={!!results} variant="margin">
        {results && (
          <>
          <AirPurifierSizingSVG
            roomSqFt={roomSqFt}
            ceilingHeight={ceilingHeight}
            recommendedCADR={results.recommendedCADR}
            airChangesPerHour={results.achievedACH}
          />

          <ResultsGrid>
            <CalculatorResult
              label="Recommended CADR"
              value={results.recommendedCADR}
              unit="CFM"
              primary
              subtitle="Look for this rating or higher"
            />
            <CalculatorResult
              label="AHAM 2/3 Rule"
              value={results.ahamMinCADR}
              unit="CFM"
              subtitle="Minimum per AHAM standard"
            />
            <CalculatorResult
              label="ACH-Based CADR"
              value={results.achBasedCADR}
              unit="CFM"
              subtitle={`For ${results.achievedACH} air changes/hr`}
            />
            <CalculatorResult
              label="Purifier Size"
              value={results.purifierSize}
              subtitle="Typical category"
            />
          </ResultsGrid>

          {/* Room volume info */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="bg-slate-50 border border-slate-200 rounded-lg p-4">
              <h4 className="font-semibold text-slate-800">Room Volume</h4>
              <p className="text-2xl font-bold text-slate-900 mt-1">
                {results.roomVolume.toLocaleString()} cu ft
              </p>
              <p className="text-sm text-slate-600">
                {roomSqFt} sq ft × {ceilingHeight} ft ceiling
              </p>
            </div>
            <div className="bg-green-50 border border-green-200 rounded-lg p-4">
              <h4 className="font-semibold text-green-800">Achieved ACH</h4>
              <p className="text-2xl font-bold text-green-900 mt-1">
                {results.achievedACH} ACH
              </p>
              <p className="text-sm text-green-600">
                Air cleaned {results.achievedACH}× per hour
              </p>
            </div>
          </div>

          {/* Pollutant coverage */}
          <div>
            <h3 className="font-semibold text-slate-800 mb-3">Pollutant Coverage</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
              {results.pollutantRecommendations.map((rec) => (
                <div
                  key={rec.pollutant}
                  className={`p-3 rounded-lg border ${
                    rec.achieved
                      ? 'bg-green-50 border-green-200'
                      : 'bg-amber-50 border-amber-200'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span className="font-medium">{rec.pollutant}</span>
                    <span
                      className={`text-sm ${
                        rec.achieved ? 'text-green-700' : 'text-amber-700'
                      }`}
                    >
                      {rec.achieved ? 'Covered' : 'Marginal'}
                    </span>
                  </div>
                  <p className="text-sm text-slate-600 mt-1">
                    Needs {rec.minCADR} CADR
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Caution if applicable */}
          {results.caution && (
            <div className="bg-amber-50 border border-amber-200 rounded-lg p-4">
              <h3 className="font-semibold text-amber-800 mb-1">Note</h3>
              <p className="text-sm text-amber-900">{results.caution}</p>
            </div>
          )}

          {/* CADR Reference Table */}
          <div>
            <h3 className="font-semibold text-slate-800 mb-3">CADR Reference Chart</h3>
            <ResultsTable
              headers={['CADR (CFM)', 'Max Room (8ft)', 'Max Room (10ft)', 'Room for 4 ACH']}
              rows={results.roomCoverageTable.map((row) => [
                row.cadr.toString(),
                `${row.maxRoom8ft} sq ft`,
                `${row.maxRoom10ft} sq ft`,
                `${row.ach4} sq ft`,
              ])}
            />
            <p className="text-xs text-slate-500 mt-2">
              Max room size uses AHAM 2/3 rule. &quot;Room for 4 ACH&quot; shows size that
              achieves 4 air changes per hour.
            </p>
          </div>

          {/* Tips */}
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
            <h3 className="font-semibold text-blue-800 mb-2">Tips</h3>
            <ul className="space-y-1">
              {results.tips.map((tip, idx) => (
                <li key={idx} className="text-sm text-blue-900 flex items-start gap-2">
                  <span className="text-blue-500 mt-0.5">•</span>
                  {tip}
                </li>
              ))}
            </ul>
          </div>

          {/* Formula explanation */}
          <div className="text-sm text-slate-600 bg-slate-50 p-4 rounded-lg">
            <h4 className="font-semibold mb-2">About CADR Ratings</h4>
            <p>
              <strong>CADR (Clean Air Delivery Rate)</strong> measures cubic feet of filtered
              air per minute. It&apos;s tested separately for smoke (smallest), dust (medium),
              and pollen (largest) particles.
            </p>
            <p className="mt-2">
              <strong>AHAM 2/3 Rule:</strong> CADR ≥ (Room Area × 2/3). A 300 sq ft room needs
              at least 200 CADR.
            </p>
            <p className="mt-2">
              <strong>ACH Method:</strong> CADR = (Room Volume × Target ACH) ÷ 60. Higher ACH
              means more complete air cleaning.
            </p>
            <p className="mt-1">
              <strong>Sources:</strong> AHAM AC-1 Standard, EPA Guide to Air Cleaners in the
              Home, ASHRAE Position Document on Filtration and Air Cleaning
            </p>
          </div>
          </>
        )}
      </ResultsContainer>
    </CalculatorWrapper>
  );
}
