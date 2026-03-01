'use client';

import CalculatorSVG, { SVG_COLORS } from '../CalculatorSVG';

interface FurnaceSizingSVGProps {
  btuRequired?: number;
  homeSqFt?: number;
  climateZone?: number;
  insulationLevel?: string;
  recommendedSize?: number;
  efficiency?: number;
}

/**
 * SVG visualization for Furnace Sizing Calculator
 * Shows house with heat loss factors and furnace sizing
 */
export default function FurnaceSizingSVG({
  btuRequired,
  homeSqFt,
  climateZone,
  insulationLevel = 'Average',
  recommendedSize,
  efficiency = 95,
}: FurnaceSizingSVGProps) {
  const hasResults = btuRequired !== undefined;

  // Climate zone severity color
  const getClimateColor = () => {
    if (!climateZone) return SVG_COLORS.textLight;
    if (climateZone >= 6) return '#1e40af'; // Very cold - dark blue
    if (climateZone >= 4) return '#3b82f6'; // Cold - blue
    if (climateZone >= 3) return '#6366f1'; // Moderate - indigo
    return '#f59e0b'; // Warm - amber
  };

  const getClimateLabel = () => {
    if (!climateZone) return '';
    if (climateZone >= 6) return 'Very Cold';
    if (climateZone >= 4) return 'Cold';
    if (climateZone >= 3) return 'Moderate';
    return 'Warm';
  };

  // Insulation color
  const getInsulationColor = () => {
    const lower = insulationLevel.toLowerCase();
    if (lower.includes('excellent') || lower.includes('high')) return SVG_COLORS.good;
    if (lower.includes('good') || lower.includes('average')) return SVG_COLORS.primary;
    if (lower.includes('fair')) return SVG_COLORS.warning;
    return SVG_COLORS.danger;
  };

  return (
    <CalculatorSVG
      title="Furnace Sizing"
      description="Heat load calculation for furnace selection"
      aspectRatio="wide"
    >
      <svg
        viewBox="0 0 400 220"
        className="w-full h-full"
        preserveAspectRatio="xMidYMid meet"
      >
        {/* Background */}
        <rect width="400" height="220" fill="#f8fafc" />

        {/* House cross-section */}
        <g transform="translate(30, 25)">
          {/* Climate zone indicator (background) */}
          <rect
            x={-10}
            y={-10}
            width={160}
            height={140}
            fill={getClimateColor()}
            opacity={0.1}
            rx={4}
          />

          {/* Roof */}
          <polygon
            points="70,0 0,45 140,45"
            fill="#94a3b8"
            stroke={SVG_COLORS.stroke}
            strokeWidth={2}
          />

          {/* Walls */}
          <rect
            x={10}
            y={45}
            width={120}
            height={75}
            fill="#e2e8f0"
            stroke={SVG_COLORS.stroke}
            strokeWidth={2}
          />

          {/* Insulation layer indication */}
          <rect
            x={12}
            y={47}
            width={6}
            height={71}
            fill={getInsulationColor()}
            opacity={0.5}
          />
          <rect
            x={122}
            y={47}
            width={6}
            height={71}
            fill={getInsulationColor()}
            opacity={0.5}
          />

          {/* Windows */}
          <rect x={25} y={60} width={25} height={30} fill="#bfdbfe" stroke={SVG_COLORS.stroke} strokeWidth={1} />
          <rect x={90} y={60} width={25} height={30} fill="#bfdbfe" stroke={SVG_COLORS.stroke} strokeWidth={1} />
          <line x1={37.5} y1={60} x2={37.5} y2={90} stroke={SVG_COLORS.stroke} strokeWidth={1} />
          <line x1={25} y1={75} x2={50} y2={75} stroke={SVG_COLORS.stroke} strokeWidth={1} />
          <line x1={102.5} y1={60} x2={102.5} y2={90} stroke={SVG_COLORS.stroke} strokeWidth={1} />
          <line x1={90} y1={75} x2={115} y2={75} stroke={SVG_COLORS.stroke} strokeWidth={1} />

          {/* Door */}
          <rect x={58} y={85} width={24} height={35} fill="#78716c" stroke={SVG_COLORS.stroke} strokeWidth={1} />
          <circle cx={77} cy={102} r={2} fill="#d4d4d8" />

          {/* Heat loss arrows (when results available) */}
          {hasResults && (
            <g opacity={0.7}>
              {/* Through roof */}
              <path d="M70,0 L70,-15" stroke={SVG_COLORS.heat} strokeWidth={2} markerEnd="url(#heat-loss-arrow)" />
              <text x={80} y={-8} fontSize="7" fill={SVG_COLORS.heat}>Roof</text>

              {/* Through walls */}
              <path d="M0,70 L-15,70" stroke={SVG_COLORS.heat} strokeWidth={2} markerEnd="url(#heat-loss-arrow)" />
              <path d="M140,70 L155,70" stroke={SVG_COLORS.heat} strokeWidth={2} markerEnd="url(#heat-loss-arrow)" />

              {/* Through windows */}
              <path d="M37,50 L37,40" stroke={SVG_COLORS.cold} strokeWidth={1.5} markerEnd="url(#heat-loss-arrow)" />
              <path d="M102,50 L102,40" stroke={SVG_COLORS.cold} strokeWidth={1.5} markerEnd="url(#heat-loss-arrow)" />
            </g>
          )}

          {/* Furnace in basement/utility */}
          <g transform="translate(55, 95)">
            <rect x={0} y={0} width={30} height={25} fill="#475569" stroke={SVG_COLORS.stroke} strokeWidth={1} rx={2} />
            {hasResults && (
              <g>
                {/* Flame */}
                <text x={15} y={18} fontSize="12" textAnchor="middle">🔥</text>
              </g>
            )}
          </g>

          {/* Climate zone label */}
          <g transform="translate(0, 130)">
            <rect x={0} y={0} width={70} height={20} fill={getClimateColor()} rx={3} opacity={0.8} />
            <text x={35} y={14} fontSize="9" fill="white" fontWeight="bold" textAnchor="middle">
              Zone {climateZone ?? '—'}: {getClimateLabel()}
            </text>
          </g>

          {/* Home size label */}
          <g transform="translate(75, 130)">
            <text x={0} y={14} fontSize="9" fill={SVG_COLORS.text}>
              {homeSqFt ? `${homeSqFt.toLocaleString()} sq ft` : '— sq ft'}
            </text>
          </g>
        </g>

        {/* Results panel */}
        <g transform="translate(210, 20)">
          <rect x={0} y={0} width={170} height={155} fill="white" stroke={SVG_COLORS.strokeLight} rx={6} />

          <text x={85} y={18} fontSize="11" fill={SVG_COLORS.text} fontWeight="bold" textAnchor="middle">
            Furnace Recommendation
          </text>
          <line x1={10} y1={26} x2={160} y2={26} stroke={SVG_COLORS.strokeLight} />

          {/* Required BTU */}
          <text x={85} y={46} fontSize="9" fill={SVG_COLORS.textLight} textAnchor="middle">
            Heat Load
          </text>
          <text x={85} y={68} fontSize="20" fill={SVG_COLORS.accent} fontWeight="bold" textAnchor="middle">
            {btuRequired ? `${(btuRequired / 1000).toFixed(0)}k` : '—'}
          </text>
          <text x={85} y={82} fontSize="10" fill={SVG_COLORS.textLight} textAnchor="middle">
            BTU/hr required
          </text>

          {/* Recommended furnace size */}
          <g transform="translate(10, 95)">
            <text x={0} y={0} fontSize="9" fill={SVG_COLORS.textLight}>Furnace Size</text>
            <text x={150} y={0} fontSize="12" fill={SVG_COLORS.primary} fontWeight="bold" textAnchor="end">
              {recommendedSize ? `${(recommendedSize / 1000).toFixed(0)}k BTU` : '—'}
            </text>
          </g>

          {/* Efficiency */}
          <g transform="translate(10, 115)">
            <text x={0} y={0} fontSize="9" fill={SVG_COLORS.textLight}>Target Efficiency</text>
            <text x={150} y={0} fontSize="10" fill={SVG_COLORS.good} fontWeight="bold" textAnchor="end">
              {efficiency}% AFUE
            </text>
          </g>

          {/* Insulation */}
          <g transform="translate(10, 135)">
            <text x={0} y={0} fontSize="9" fill={SVG_COLORS.textLight}>Insulation</text>
            <text x={150} y={0} fontSize="10" fill={getInsulationColor()} fontWeight="bold" textAnchor="end">
              {insulationLevel}
            </text>
          </g>
        </g>

        {/* Sizing note */}
        <g transform="translate(210, 180)">
          <text x={0} y={0} fontSize="7" fill={SVG_COLORS.textLight}>
            Size furnace 10-20% above heat load
          </text>
        </g>

        {/* Arrow marker */}
        <defs>
          <marker
            id="heat-loss-arrow"
            markerWidth="6"
            markerHeight="6"
            refX="5"
            refY="3"
            orient="auto"
          >
            <path d="M0,0 L0,6 L6,3 z" fill={SVG_COLORS.heat} />
          </marker>
        </defs>
      </svg>
    </CalculatorSVG>
  );
}
