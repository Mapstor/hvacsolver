'use client';

import { useState, useCallback } from 'react';
import CalculatorWrapper from '../CalculatorWrapper';
import CalculatorInput from '../CalculatorInput';
import { CalculatorResult, ResultsTable } from '../CalculatorResult';
import ResultsContainer from '../ResultsContainer';
import COPSVG from './COPSVG';

type CalculatorMode = 'outputInput' | 'eerToCop' | 'hspfToCop' | 'carnot';

interface ModeConfig {
  label: string;
  description: string;
}

const MODES: Record<CalculatorMode, ModeConfig> = {
  outputInput: {
    label: 'Output ÷ Input',
    description: 'Calculate COP from heat output and electrical input',
  },
  eerToCop: {
    label: 'EER to COP',
    description: 'Convert EER (Energy Efficiency Ratio) to COP',
  },
  hspfToCop: {
    label: 'HSPF to COP',
    description: 'Convert HSPF (Heating Seasonal Performance Factor) to COP',
  },
  carnot: {
    label: 'Carnot COP',
    description: 'Calculate maximum theoretical COP (ideal heat pump)',
  },
};

// Conversion factor: 1 BTU/hr per Watt = 3.412 BTU/Wh
// Source: ASHRAE Handbook of Fundamentals
const BTU_PER_WH = 3.412;

function getCOPRating(
  cop: number,
  mode: CalculatorMode
): 'good' | 'warning' | 'bad' {
  // Different thresholds for different modes
  if (mode === 'carnot') {
    // Carnot is theoretical max, any real value is lower
    return cop > 10 ? 'good' : cop > 5 ? 'warning' : 'bad';
  }
  // Real-world COP ratings
  if (cop >= 4) return 'good';
  if (cop >= 2.5) return 'warning';
  return 'bad';
}

function getCOPDescription(cop: number): string {
  if (cop >= 5) return 'Excellent efficiency (high-performance heat pump)';
  if (cop >= 4) return 'Very good efficiency (modern heat pump)';
  if (cop >= 3) return 'Good efficiency (standard heat pump)';
  if (cop >= 2) return 'Moderate efficiency (older equipment)';
  if (cop >= 1) return 'Low efficiency (resistance heating territory)';
  return 'Below unity (energy is being lost)';
}

export default function COPCalculator() {
  const [mode, setMode] = useState<CalculatorMode>('outputInput');
  const [heatOutput, setHeatOutput] = useState<number>(3.5); // kW
  const [electricInput, setElectricInput] = useState<number>(1); // kW
  const [eer, setEer] = useState<number>(12);
  const [hspf, setHspf] = useState<number>(10);
  const [hotTemp, setHotTemp] = useState<number>(35); // °C
  const [coldTemp, setColdTemp] = useState<number>(0); // °C
  const [result, setResult] = useState<{
    cop: number;
    mode: CalculatorMode;
  } | null>(null);

  const handleCalculate = useCallback(() => {
    let cop: number;

    switch (mode) {
      case 'outputInput':
        // COP = Heat Output (kW) ÷ Electrical Input (kW)
        // Source: Basic thermodynamic definition of COP
        cop = heatOutput / electricInput;
        break;

      case 'eerToCop':
        // COP = EER ÷ 3.412
        // Source: AHRI Standard 210/240
        cop = eer / BTU_PER_WH;
        break;

      case 'hspfToCop':
        // COP = HSPF ÷ 3.412
        // Source: AHRI Standard 210/240
        cop = hspf / BTU_PER_WH;
        break;

      case 'carnot':
        // COP_heating = T_hot / (T_hot - T_cold) where T is in Kelvin
        // Source: Carnot's theorem (thermodynamics)
        const tHotK = hotTemp + 273.15;
        const tColdK = coldTemp + 273.15;
        if (tHotK <= tColdK) {
          cop = Infinity; // Temperature difference must be positive
        } else {
          cop = tHotK / (tHotK - tColdK);
        }
        break;
    }

    setResult({ cop, mode });
  }, [mode, heatOutput, electricInput, eer, hspf, hotTemp, coldTemp]);

  const renderInputs = () => {
    switch (mode) {
      case 'outputInput':
        return (
          <>
            <CalculatorInput
              type="number"
              id="heatOutput"
              label="Heat Output"
              unit="kW"
              value={heatOutput}
              onChange={(e) => setHeatOutput(parseFloat(e.target.value) || 0)}
              min={0}
              step={0.1}
              helpText="Heat delivered to the space"
            />
            <CalculatorInput
              type="number"
              id="electricInput"
              label="Electrical Input"
              unit="kW"
              value={electricInput}
              onChange={(e) => setElectricInput(parseFloat(e.target.value) || 0)}
              min={0.01}
              step={0.1}
              helpText="Power consumed by compressor"
            />
          </>
        );

      case 'eerToCop':
        return (
          <CalculatorInput
            type="number"
            id="eer"
            label="EER Value"
            unit="BTU/Wh"
            value={eer}
            onChange={(e) => setEer(parseFloat(e.target.value) || 0)}
            min={0}
            step={0.1}
            helpText="Energy Efficiency Ratio (cooling mode rating)"
          />
        );

      case 'hspfToCop':
        return (
          <CalculatorInput
            type="number"
            id="hspf"
            label="HSPF Value"
            unit="BTU/Wh"
            value={hspf}
            onChange={(e) => setHspf(parseFloat(e.target.value) || 0)}
            min={0}
            step={0.1}
            helpText="Heating Seasonal Performance Factor"
          />
        );

      case 'carnot':
        return (
          <>
            <CalculatorInput
              type="number"
              id="hotTemp"
              label="Hot Side Temperature"
              unit="°C"
              value={hotTemp}
              onChange={(e) => setHotTemp(parseFloat(e.target.value) || 0)}
              step={1}
              helpText="Indoor temperature (heating mode)"
            />
            <CalculatorInput
              type="number"
              id="coldTemp"
              label="Cold Side Temperature"
              unit="°C"
              value={coldTemp}
              onChange={(e) => setColdTemp(parseFloat(e.target.value) || 0)}
              step={1}
              helpText="Outdoor temperature (heating mode)"
            />
          </>
        );
    }
  };

  const renderAdditionalResults = () => {
    if (!result || !isFinite(result.cop)) return null;

    switch (result.mode) {
      case 'outputInput':
        return (
          <ResultsTable
            rows={[
              { label: 'Heat output', value: heatOutput, unit: 'kW' },
              { label: 'Electrical input', value: electricInput, unit: 'kW' },
              {
                label: 'Equivalent EER',
                value: (result.cop * BTU_PER_WH).toFixed(1),
                unit: 'BTU/Wh',
              },
              {
                label: 'Efficiency vs resistance heat',
                value: `${(result.cop * 100).toFixed(0)}%`,
                unit: '',
              },
            ]}
          />
        );

      case 'eerToCop':
        return (
          <ResultsTable
            rows={[
              { label: 'EER input', value: eer, unit: 'BTU/Wh' },
              { label: 'COP result', value: result.cop.toFixed(2), unit: '' },
              { label: 'Conversion factor', value: BTU_PER_WH, unit: '' },
            ]}
          />
        );

      case 'hspfToCop':
        return (
          <ResultsTable
            rows={[
              { label: 'HSPF input', value: hspf, unit: 'BTU/Wh' },
              { label: 'COP result', value: result.cop.toFixed(2), unit: '' },
              { label: 'Conversion factor', value: BTU_PER_WH, unit: '' },
            ]}
          />
        );

      case 'carnot':
        return (
          <ResultsTable
            rows={[
              { label: 'Hot side (indoor)', value: hotTemp, unit: '°C' },
              { label: 'Cold side (outdoor)', value: coldTemp, unit: '°C' },
              {
                label: 'Temperature difference',
                value: hotTemp - coldTemp,
                unit: '°C',
              },
              {
                label: 'Theoretical max COP',
                value: result.cop.toFixed(2),
                unit: '',
              },
              {
                label: 'Realistic COP (50-60% of Carnot)',
                value: `${(result.cop * 0.5).toFixed(1)} – ${(result.cop * 0.6).toFixed(1)}`,
                unit: '',
              },
            ]}
          />
        );
    }
  };

  return (
    <CalculatorWrapper
      title="COP Calculator (Coefficient of Performance)"
      description="Calculate heat pump efficiency using COP, or convert from EER/HSPF ratings."
    >
      <div className="space-y-6">
        {/* Mode Tabs */}
        <div className="flex flex-wrap gap-2">
          {(Object.entries(MODES) as [CalculatorMode, ModeConfig][]).map(
            ([key, config]) => (
              <button
                key={key}
                onClick={() => {
                  setMode(key);
                  setResult(null);
                }}
                className={`px-3 py-2 text-sm font-medium rounded-md transition-colors ${
                  mode === key
                    ? 'bg-[#1e3a5f] text-white'
                    : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                }`}
              >
                {config.label}
              </button>
            )
          )}
        </div>

        {/* Mode Description */}
        <p className="text-sm text-slate-600">{MODES[mode].description}</p>

        {/* Inputs */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {renderInputs()}
        </div>

        {/* Calculate Button */}
        <button
          onClick={handleCalculate}
          className="w-full sm:w-auto px-6 py-3 bg-[#c2410c] hover:bg-[#9a3412] text-white font-semibold rounded-md transition-colors"
        >
          Calculate COP
        </button>

        {/* Results */}
        <ResultsContainer show={!!result}>
          {result && (
            <>
            {/* COP Visualization */}
            <COPSVG
              cop={result.cop}
              heatingOutput={mode === 'outputInput' ? heatOutput : undefined}
              electricInput={mode === 'outputInput' ? electricInput : undefined}
              efficiency={isFinite(result.cop) ? (result.cop / 5) * 100 : undefined}
            />

            {/* Primary Result */}
            <div className="bg-orange-50 rounded-lg p-4">
              <CalculatorResult
                label="Coefficient of Performance (COP)"
                value={
                  isFinite(result.cop) ? result.cop.toFixed(2) : 'Undefined'
                }
                primary
                highlight={
                  isFinite(result.cop)
                    ? getCOPRating(result.cop, result.mode)
                    : undefined
                }
              />
              {isFinite(result.cop) && (
                <p className="mt-2 text-sm text-slate-600">
                  {getCOPDescription(result.cop)}
                </p>
              )}
            </div>

            {/* Additional Results */}
            {isFinite(result.cop) && (
              <div className="bg-slate-50 rounded-lg p-4">
                <h4 className="font-semibold text-slate-950 mb-3">
                  Calculation Details
                </h4>
                {renderAdditionalResults()}
              </div>
            )}

            {/* Interpretation */}
            {isFinite(result.cop) && (
              <div className="text-sm text-slate-600 space-y-2">
                <p>
                  <strong>What COP means:</strong> A COP of {result.cop.toFixed(1)}{' '}
                  means the heat pump delivers {result.cop.toFixed(1)} units of
                  heat for every 1 unit of electricity consumed.
                </p>
                {result.mode !== 'carnot' && result.cop > 1 && (
                  <p>
                    Compared to electric resistance heating (COP = 1), this
                    system is{' '}
                    <strong>{((result.cop - 1) * 100).toFixed(0)}% more efficient</strong>.
                  </p>
                )}
              </div>
            )}

            {/* Source Note */}
            <p className="text-xs text-slate-500">
              {mode === 'carnot'
                ? 'Formula: COP = T_hot / (T_hot − T_cold), using absolute temperature (Kelvin)'
                : mode === 'outputInput'
                ? 'Formula: COP = Heat Output (kW) ÷ Electrical Input (kW)'
                : `Formula: COP = ${mode === 'eerToCop' ? 'EER' : 'HSPF'} ÷ 3.412 (AHRI Standard 210/240)`}
            </p>
            </>
          )}
        </ResultsContainer>
      </div>
    </CalculatorWrapper>
  );
}
