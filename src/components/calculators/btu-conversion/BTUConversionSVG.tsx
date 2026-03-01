'use client';

import CalculatorSVG, { SVG_COLORS } from '../CalculatorSVG';

interface BTUConversionSVGProps {
  fromValue?: number;
  fromUnit?: string;
  toValue?: number;
  toUnit?: string;
  conversionFactor?: number;
}

/**
 * SVG visualization for BTU Conversion Calculator
 * Shows energy unit conversion with visual comparison bars
 */
export default function BTUConversionSVG({
  fromValue,
  fromUnit = 'BTU',
  toValue,
  toUnit = 'kWh',
  conversionFactor,
}: BTUConversionSVGProps) {
  const hasResults = fromValue !== undefined && toValue !== undefined;

  // Energy unit icons/representations
  const getUnitIcon = (unit: string): string => {
    const lower = unit.toLowerCase();
    if (lower.includes('btu')) return '🔥';
    if (lower.includes('kwh') || lower.includes('watt')) return '⚡';
    if (lower.includes('joule') || lower.includes('kj')) return '💫';
    if (lower.includes('therm')) return '🌡️';
    if (lower.includes('calorie') || lower.includes('kcal')) return '🍎';
    return '⚡';
  };

  // Scale for bar visualization (normalize to BTU)
  const normalizedFromValue = fromValue || 1000;
  const normalizedToValue = toValue || 0.293;

  return (
    <CalculatorSVG
      title="Energy Conversion"
      description="Visual comparison of energy units"
      aspectRatio="wide"
    >
      <svg
        viewBox="0 0 400 180"
        className="w-full h-full"
        preserveAspectRatio="xMidYMid meet"
      >
        {/* Background */}
        <rect width="400" height="180" fill="#f8fafc" />

        {/* From unit section */}
        <g transform="translate(30, 30)">
          <text x={0} y={0} fontSize="12" fill={SVG_COLORS.text} fontWeight="bold">
            Input
          </text>

          {/* Energy icon */}
          <text x={0} y={40} fontSize="32">
            {getUnitIcon(fromUnit)}
          </text>

          {/* Value display */}
          <rect x={50} y={15} width={100} height={45} fill="white" stroke={SVG_COLORS.accent} strokeWidth={2} rx={6} />
          <text x={100} y={38} fontSize="14" fill={SVG_COLORS.accent} fontWeight="bold" textAnchor="middle">
            {fromValue ? fromValue.toLocaleString() : '—'}
          </text>
          <text x={100} y={52} fontSize="10" fill={SVG_COLORS.textLight} textAnchor="middle">
            {fromUnit}
          </text>
        </g>

        {/* Conversion arrow */}
        <g transform="translate(170, 50)">
          <defs>
            <marker
              id="conversion-arrow"
              markerWidth="10"
              markerHeight="10"
              refX="9"
              refY="3"
              orient="auto"
              markerUnits="strokeWidth"
            >
              <path d="M0,0 L0,6 L9,3 z" fill={SVG_COLORS.primary} />
            </marker>
          </defs>

          <line
            x1={0}
            y1={20}
            x2={50}
            y2={20}
            stroke={SVG_COLORS.primary}
            strokeWidth={3}
            markerEnd="url(#conversion-arrow)"
          />

          {/* Conversion factor */}
          {conversionFactor && (
            <g>
              <rect x={5} y={-5} width={40} height={18} fill="white" stroke={SVG_COLORS.strokeLight} rx={3} />
              <text x={25} y={8} fontSize="8" fill={SVG_COLORS.primary} textAnchor="middle">
                ×{conversionFactor < 0.01 ? conversionFactor.toExponential(2) : conversionFactor.toFixed(4)}
              </text>
            </g>
          )}
        </g>

        {/* To unit section */}
        <g transform="translate(230, 30)">
          <text x={0} y={0} fontSize="12" fill={SVG_COLORS.text} fontWeight="bold">
            Output
          </text>

          {/* Energy icon */}
          <text x={0} y={40} fontSize="32">
            {getUnitIcon(toUnit)}
          </text>

          {/* Value display */}
          <rect x={50} y={15} width={110} height={45} fill="white" stroke={SVG_COLORS.primary} strokeWidth={2} rx={6} />
          <text x={105} y={38} fontSize="14" fill={SVG_COLORS.primary} fontWeight="bold" textAnchor="middle">
            {toValue ? (toValue < 0.001 ? toValue.toExponential(3) : toValue.toLocaleString(undefined, { maximumFractionDigits: 4 })) : '—'}
          </text>
          <text x={105} y={52} fontSize="10" fill={SVG_COLORS.textLight} textAnchor="middle">
            {toUnit}
          </text>
        </g>

        {/* Visual comparison bars */}
        <g transform="translate(30, 100)">
          <text x={0} y={0} fontSize="10" fill={SVG_COLORS.textLight}>
            Energy Equivalence
          </text>

          {/* From bar */}
          <rect x={0} y={15} width={160} height={20} fill={SVG_COLORS.accent} rx={4} />
          <text x={80} y={29} fontSize="9" fill="white" fontWeight="bold" textAnchor="middle">
            {fromValue ? `${fromValue.toLocaleString()} ${fromUnit}` : `Input ${fromUnit}`}
          </text>

          {/* Equals sign */}
          <text x={175} y={29} fontSize="16" fill={SVG_COLORS.text} fontWeight="bold">
            =
          </text>

          {/* To bar */}
          <rect x={190} y={15} width={160} height={20} fill={SVG_COLORS.primary} rx={4} />
          <text x={270} y={29} fontSize="9" fill="white" fontWeight="bold" textAnchor="middle">
            {toValue ? `${toValue < 0.001 ? toValue.toExponential(2) : toValue.toFixed(4)} ${toUnit}` : `Output ${toUnit}`}
          </text>
        </g>

        {/* Common conversions reference */}
        <g transform="translate(30, 150)">
          <text x={0} y={0} fontSize="8" fill={SVG_COLORS.textLight}>
            Common: 1 kWh = 3,412 BTU | 1 Therm = 100,000 BTU | 1 BTU = 1,055 Joules
          </text>
        </g>
      </svg>
    </CalculatorSVG>
  );
}
