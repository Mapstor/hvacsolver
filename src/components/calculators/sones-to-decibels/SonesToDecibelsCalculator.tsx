'use client';

import { useState, useCallback, useMemo } from 'react';
import CalculatorWrapper from '../CalculatorWrapper';
import CalculatorInput from '../CalculatorInput';
import { CalculatorResult, ResultsTable } from '../CalculatorResult';
import ResultsContainer from '../ResultsContainer';
import SonesToDecibelsSVG from './SonesToDecibelsSVG';

// Loudness reference points
const LOUDNESS_MARKERS = [
  { dba: 20, label: 'Whisper', icon: '🤫' },
  { dba: 30, label: 'Quiet library', icon: '📚' },
  { dba: 40, label: 'Refrigerator hum', icon: '🧊' },
  { dba: 50, label: 'Quiet conversation', icon: '💬' },
  { dba: 60, label: 'Normal conversation', icon: '🗣️' },
  { dba: 70, label: 'Vacuum cleaner', icon: '🧹' },
  { dba: 80, label: 'City traffic', icon: '🚗' },
];

// HVAC equipment typical ratings
const HVAC_RATINGS = [
  { sones: 0.3, equipment: 'Ultra-quiet bathroom fan' },
  { sones: 0.5, equipment: 'Premium bathroom fan' },
  { sones: 1.0, equipment: 'Standard bathroom fan' },
  { sones: 1.5, equipment: 'Budget bathroom fan' },
  { sones: 2.0, equipment: 'Range hood (low)' },
  { sones: 3.0, equipment: 'Kitchen exhaust fan' },
  { sones: 4.0, equipment: 'Range hood (high)' },
  { sones: 6.0, equipment: 'Whole-house fan' },
];

function sonesToDecibels(sones: number): number {
  // Formula for sones ≥ 1: dBA = 33.22 × log₁₀(sones) + 40
  // For sones < 1: dBA = 40 + 33.22 × log₁₀(sones) (same formula works)
  // Source: ISO 532-1:2017, ASTM E1130
  if (sones <= 0) return 0;
  return 33.22 * Math.log10(sones) + 40;
}

function decibelsToSones(dba: number): number {
  // Reverse formula: sones = 10^((dBA - 40) / 33.22)
  // Alternative form: sones = 2^((dBA - 40) / 10) for approximate conversion
  // Source: ISO 532-1:2017
  if (dba < 0) return 0;
  return Math.pow(10, (dba - 40) / 33.22);
}

function getLoudnessDescription(dba: number): string {
  if (dba < 25) return 'Barely audible — exceptionally quiet';
  if (dba < 35) return 'Very quiet — will not disturb sleep';
  if (dba < 45) return 'Quiet — noticeable but not intrusive';
  if (dba < 55) return 'Moderate — audible during normal activities';
  if (dba < 65) return 'Noticeable — may interfere with conversation';
  if (dba < 75) return 'Loud — clearly audible throughout the room';
  return 'Very loud — uncomfortably noisy for indoor use';
}

function getSonesRating(sones: number): 'good' | 'warning' | 'bad' {
  if (sones <= 1) return 'good';
  if (sones <= 3) return 'warning';
  return 'bad';
}

export default function SonesToDecibelsCalculator() {
  const [direction, setDirection] = useState<'sonesToDb' | 'dbToSones'>(
    'sonesToDb'
  );
  const [sones, setSones] = useState<number>(1.0);
  const [decibels, setDecibels] = useState<number>(40);
  const [result, setResult] = useState<{
    sones: number;
    decibels: number;
  } | null>(null);

  const handleCalculate = useCallback(() => {
    if (direction === 'sonesToDb') {
      const dba = sonesToDecibels(sones);
      setResult({ sones, decibels: dba });
    } else {
      const sonesResult = decibelsToSones(decibels);
      setResult({ sones: sonesResult, decibels });
    }
  }, [direction, sones, decibels]);

  // Find the position on the loudness scale (0-100%)
  const loudnessPosition = useMemo(() => {
    if (!result) return 0;
    const minDb = 20;
    const maxDb = 80;
    const clampedDb = Math.max(minDb, Math.min(maxDb, result.decibels));
    return ((clampedDb - minDb) / (maxDb - minDb)) * 100;
  }, [result]);

  // Find nearby HVAC equipment
  const nearbyEquipment = useMemo(() => {
    if (!result) return [];
    return HVAC_RATINGS.filter(
      (item) => Math.abs(item.sones - result.sones) < 0.5
    ).slice(0, 3);
  }, [result]);

  return (
    <CalculatorWrapper
      title="Sones to Decibels Converter"
      description="Convert between sones (perceived loudness) and decibels (dBA) for HVAC equipment ratings."
    >
      <div className="space-y-6">
        {/* Direction Toggle */}
        <div className="flex rounded-lg border border-slate-200 overflow-hidden">
          <button
            onClick={() => {
              setDirection('sonesToDb');
              setResult(null);
            }}
            className={`flex-1 px-4 py-2 text-sm font-medium transition-colors ${
              direction === 'sonesToDb'
                ? 'bg-[#1e3a5f] text-white'
                : 'bg-white text-slate-700 hover:bg-slate-50'
            }`}
          >
            Sones → Decibels
          </button>
          <button
            onClick={() => {
              setDirection('dbToSones');
              setResult(null);
            }}
            className={`flex-1 px-4 py-2 text-sm font-medium transition-colors ${
              direction === 'dbToSones'
                ? 'bg-[#1e3a5f] text-white'
                : 'bg-white text-slate-700 hover:bg-slate-50'
            }`}
          >
            Decibels → Sones
          </button>
        </div>

        {/* Input */}
        <div className="max-w-xs">
          {direction === 'sonesToDb' ? (
            <CalculatorInput
              type="number"
              id="sones"
              label="Loudness in Sones"
              value={sones}
              onChange={(e) => setSones(parseFloat(e.target.value) || 0)}
              min={0.1}
              max={20}
              step={0.1}
              helpText="Typical range: 0.3 to 6 sones for HVAC equipment"
            />
          ) : (
            <CalculatorInput
              type="number"
              id="decibels"
              label="Sound Level in dBA"
              unit="dBA"
              value={decibels}
              onChange={(e) => setDecibels(parseFloat(e.target.value) || 0)}
              min={20}
              max={100}
              step={1}
              helpText="A-weighted decibels"
            />
          )}
        </div>

        {/* Calculate Button */}
        <button
          onClick={handleCalculate}
          className="w-full sm:w-auto px-6 py-3 bg-[#c2410c] hover:bg-[#9a3412] text-white font-semibold rounded-md transition-colors"
        >
          Convert
        </button>

        {/* Results */}
        <ResultsContainer show={!!result}>
          {result && (
            <>
            <SonesToDecibelsSVG
              sones={result.sones}
              decibels={result.decibels}
              conversionDirection={direction === 'sonesToDb' ? 'sones-to-db' : 'db-to-sones'}
            />

            {/* Primary Results */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="bg-orange-50 rounded-lg p-4">
                <CalculatorResult
                  label="Sones (perceived loudness)"
                  value={result.sones.toFixed(2)}
                  unit="sones"
                  primary
                  highlight={getSonesRating(result.sones)}
                />
              </div>
              <div className="bg-slate-50 rounded-lg p-4">
                <CalculatorResult
                  label="Decibels (sound pressure)"
                  value={result.decibels.toFixed(1)}
                  unit="dBA"
                  primary
                />
              </div>
            </div>

            {/* Loudness Description */}
            <p className="text-sm text-slate-700">
              {getLoudnessDescription(result.decibels)}
            </p>

            {/* Visual Loudness Meter */}
            <div className="bg-slate-50 rounded-lg p-4">
              <h4 className="font-semibold text-slate-950 mb-4">
                Loudness Scale
              </h4>
              <div className="relative">
                {/* Scale Bar */}
                <div className="h-8 bg-gradient-to-r from-green-400 via-yellow-400 to-red-500 rounded-full relative">
                  {/* Current Position Marker */}
                  <div
                    className="absolute top-0 bottom-0 w-1 bg-slate-900 rounded-full transform -translate-x-1/2"
                    style={{ left: `${loudnessPosition}%` }}
                  >
                    <div className="absolute -top-6 left-1/2 transform -translate-x-1/2 bg-slate-900 text-white text-xs px-2 py-1 rounded whitespace-nowrap">
                      {result.decibels.toFixed(0)} dBA
                    </div>
                  </div>
                </div>

                {/* Scale Labels */}
                <div className="flex justify-between mt-2 text-xs text-slate-500">
                  <span>20 dBA</span>
                  <span>50 dBA</span>
                  <span>80 dBA</span>
                </div>
              </div>

              {/* Reference Points */}
              <div className="mt-4 grid grid-cols-2 sm:grid-cols-4 gap-2 text-xs">
                {LOUDNESS_MARKERS.slice(0, 4).map((marker) => (
                  <div
                    key={marker.dba}
                    className={`p-2 rounded ${
                      Math.abs(result.decibels - marker.dba) < 5
                        ? 'bg-orange-100 border border-orange-300'
                        : 'bg-white border border-slate-200'
                    }`}
                  >
                    <div className="font-medium">{marker.dba} dBA</div>
                    <div className="text-slate-500">{marker.label}</div>
                  </div>
                ))}
              </div>
            </div>

            {/* HVAC Equipment Comparison */}
            <div className="bg-slate-50 rounded-lg p-4">
              <h4 className="font-semibold text-slate-950 mb-3">
                Typical HVAC Equipment Ratings
              </h4>
              <ResultsTable
                rows={HVAC_RATINGS.map((item) => ({
                  label: item.equipment,
                  value: item.sones.toFixed(1),
                  unit: 'sones',
                }))}
              />
              {nearbyEquipment.length > 0 && (
                <p className="mt-3 text-sm text-slate-600">
                  Your value ({result.sones.toFixed(1)} sones) is similar to:{' '}
                  <strong>{nearbyEquipment.map((e) => e.equipment).join(', ')}</strong>
                </p>
              )}
            </div>

            {/* Formulas */}
            <div className="text-xs text-slate-500 space-y-1">
              <p>
                <strong>Sones to dBA:</strong> dBA = 33.22 × log₁₀(sones) + 40
              </p>
              <p>
                <strong>dBA to Sones:</strong> sones = 10^((dBA − 40) / 33.22)
              </p>
              <p className="mt-2">Source: ISO 532-1:2017, ASTM E1130</p>
            </div>
            </>
          )}
        </ResultsContainer>
      </div>
    </CalculatorWrapper>
  );
}
