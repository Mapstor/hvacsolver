'use client';

import { useState, useCallback, useMemo } from 'react';
import CalculatorWrapper from '../CalculatorWrapper';
import CalculatorInput from '../CalculatorInput';
import { CalculatorResult, ResultsTable } from '../CalculatorResult';
import ResultsContainer from '../ResultsContainer';
import BTUConversionSVG from './BTUConversionSVG';

// Conversion factors (all relative to BTU/hr or BTU)
// Source: ASHRAE Handbook of Fundamentals, Unit Conversions
const CONVERSIONS = {
  // Power conversions (BTU/hr based)
  kW: { factor: 3412.14, label: 'kW', fullLabel: 'Kilowatts', type: 'power' },
  watts: { factor: 3.41214, label: 'W', fullLabel: 'Watts', type: 'power' },
  tons: {
    factor: 12000,
    label: 'tons',
    fullLabel: 'Tons of Cooling',
    type: 'power',
  },
  hp: {
    factor: 2544.43,
    label: 'HP',
    fullLabel: 'Mechanical Horsepower',
    type: 'power',
  },
  // Energy conversions (BTU based)
  kWh: {
    factor: 3412.14,
    label: 'kWh',
    fullLabel: 'Kilowatt-hours',
    type: 'energy',
  },
  therms: {
    factor: 100000,
    label: 'therms',
    fullLabel: 'Therms',
    type: 'energy',
  },
  joules: {
    factor: 0.00094782,
    label: 'J',
    fullLabel: 'Joules',
    type: 'energy',
  },
  mj: {
    factor: 947.817,
    label: 'MJ',
    fullLabel: 'Megajoules',
    type: 'energy',
  },
} as const;

type ConversionUnit = keyof typeof CONVERSIONS;

const CONVERSION_OPTIONS = Object.entries(CONVERSIONS).map(([key, val]) => ({
  value: key,
  label: `${val.fullLabel} (${val.label})`,
}));

interface ConversionResult {
  btu: number;
  other: number;
  unit: string;
  label: string;
  factor: number;
}

function convertToBTU(value: number, unit: ConversionUnit): number {
  // Formula: BTU = value × conversion factor
  return value * CONVERSIONS[unit].factor;
}

function convertFromBTU(btu: number, unit: ConversionUnit): number {
  // Formula: other = BTU ÷ conversion factor
  return btu / CONVERSIONS[unit].factor;
}

export default function BTUConversionCalculator() {
  const [direction, setDirection] = useState<'toBTU' | 'fromBTU'>('toBTU');
  const [selectedUnit, setSelectedUnit] = useState<ConversionUnit>('kW');
  const [inputValue, setInputValue] = useState<number>(1);
  const [result, setResult] = useState<ConversionResult | null>(null);

  const unitInfo = CONVERSIONS[selectedUnit];
  const btuLabel = unitInfo.type === 'power' ? 'BTU/hr' : 'BTU';

  const handleCalculate = useCallback(() => {
    const conversion = CONVERSIONS[selectedUnit];

    if (direction === 'toBTU') {
      const btu = convertToBTU(inputValue, selectedUnit);
      setResult({
        btu,
        other: inputValue,
        unit: conversion.label,
        label: conversion.fullLabel,
        factor: conversion.factor,
      });
    } else {
      const other = convertFromBTU(inputValue, selectedUnit);
      setResult({
        btu: inputValue,
        other,
        unit: conversion.label,
        label: conversion.fullLabel,
        factor: conversion.factor,
      });
    }
  }, [direction, selectedUnit, inputValue]);

  const commonConversions = useMemo(() => {
    if (!result) return [];

    const btuValue = direction === 'toBTU' ? result.btu : inputValue;

    return Object.entries(CONVERSIONS)
      .filter(([key]) => key !== selectedUnit)
      .map(([key, conv]) => ({
        label: conv.fullLabel,
        value: convertFromBTU(btuValue, key as ConversionUnit),
        unit: conv.label,
      }));
  }, [result, direction, inputValue, selectedUnit]);

  return (
    <CalculatorWrapper
      title="BTU Conversion Calculator"
      description="Convert between BTU/hr and other power/energy units used in HVAC."
    >
      <div className="space-y-6">
        {/* Direction Toggle */}
        <div className="flex rounded-lg border border-slate-200 overflow-hidden">
          <button
            onClick={() => setDirection('toBTU')}
            className={`flex-1 px-4 py-2 text-sm font-medium transition-colors ${
              direction === 'toBTU'
                ? 'bg-[#1e3a5f] text-white'
                : 'bg-white text-slate-700 hover:bg-slate-50'
            }`}
          >
            Convert to BTU
          </button>
          <button
            onClick={() => setDirection('fromBTU')}
            className={`flex-1 px-4 py-2 text-sm font-medium transition-colors ${
              direction === 'fromBTU'
                ? 'bg-[#1e3a5f] text-white'
                : 'bg-white text-slate-700 hover:bg-slate-50'
            }`}
          >
            Convert from BTU
          </button>
        </div>

        {/* Inputs */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <CalculatorInput
            type="number"
            id="inputValue"
            label={direction === 'toBTU' ? 'Value to Convert' : 'BTU Value'}
            unit={direction === 'toBTU' ? unitInfo.label : btuLabel}
            value={inputValue}
            onChange={(e) => setInputValue(parseFloat(e.target.value) || 0)}
            min={0}
            step="any"
          />

          <CalculatorInput
            type="select"
            id="unit"
            label={direction === 'toBTU' ? 'Convert From' : 'Convert To'}
            value={selectedUnit}
            onChange={(e) => setSelectedUnit(e.target.value as ConversionUnit)}
            options={CONVERSION_OPTIONS}
          />
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
            {/* BTU Conversion Visualization */}
            <BTUConversionSVG
              fromValue={direction === 'toBTU' ? result.other : inputValue}
              fromUnit={direction === 'toBTU' ? result.unit : btuLabel}
              toValue={direction === 'toBTU' ? result.btu : result.other}
              toUnit={direction === 'toBTU' ? btuLabel : result.unit}
              conversionFactor={result.factor}
            />

            {/* Primary Result */}
            <div className="bg-orange-50 rounded-lg p-4">
              {direction === 'toBTU' ? (
                <CalculatorResult
                  label={`${result.other.toLocaleString()} ${result.unit} equals`}
                  value={result.btu.toLocaleString(undefined, {
                    maximumFractionDigits: 2,
                  })}
                  unit={btuLabel}
                  primary
                />
              ) : (
                <CalculatorResult
                  label={`${inputValue.toLocaleString()} ${btuLabel} equals`}
                  value={result.other.toLocaleString(undefined, {
                    maximumFractionDigits: 4,
                  })}
                  unit={result.unit}
                  primary
                />
              )}
            </div>

            {/* Other Conversions */}
            <div className="bg-slate-50 rounded-lg p-4">
              <h4 className="font-semibold text-slate-950 mb-3">
                All Conversions
              </h4>
              <ResultsTable
                rows={[
                  {
                    label: btuLabel,
                    value:
                      direction === 'toBTU'
                        ? result.btu.toLocaleString(undefined, {
                            maximumFractionDigits: 2,
                          })
                        : inputValue.toLocaleString(),
                    unit: '',
                  },
                  ...commonConversions.map((c) => ({
                    label: c.label,
                    value:
                      c.value < 0.01
                        ? c.value.toExponential(4)
                        : c.value.toLocaleString(undefined, {
                            maximumFractionDigits: 4,
                          }),
                    unit: c.unit,
                  })),
                ]}
              />
            </div>

            {/* Conversion Factor Reference */}
            <div className="text-sm text-slate-600 space-y-1">
              <p className="font-medium">Conversion Factor:</p>
              <p>
                1 {result.label} = {result.factor.toLocaleString()} {btuLabel}
              </p>
            </div>

            {/* Source Note */}
            <p className="text-xs text-slate-500">
              Conversion factors from ASHRAE Handbook of Fundamentals
            </p>
            </>
          )}
        </ResultsContainer>
      </div>
    </CalculatorWrapper>
  );
}
