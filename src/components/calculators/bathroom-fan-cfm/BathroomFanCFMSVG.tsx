'use client';

import CalculatorSVG, { SVG_COLORS } from '../CalculatorSVG';

interface BathroomFanCFMSVGProps {
  roomCubicFeet?: number;
  recommendedCFM?: number;
  airChangesPerHour?: number;
  fixtures?: string[];
  soneRating?: number;
}

/**
 * SVG visualization for Bathroom Fan CFM Calculator
 * Shows bathroom layout with ventilation airflow - clean two-column layout
 */
export default function BathroomFanCFMSVG({
  roomCubicFeet,
  recommendedCFM,
  airChangesPerHour = 8,
  fixtures = [],
  soneRating,
}: BathroomFanCFMSVGProps) {
  const hasResults = recommendedCFM !== undefined;

  return (
    <CalculatorSVG
      title="Bathroom Ventilation"
      description="Required airflow to properly ventilate your bathroom"
      aspectRatio="wide"
    >
      <svg
        viewBox="0 0 400 180"
        className="w-full h-full"
        preserveAspectRatio="xMidYMid meet"
      >
        {/* Background */}
        <rect width="400" height="180" fill="#f8fafc" />

        {/* LEFT COLUMN: Bathroom floor plan */}
        <g transform="translate(15, 12)">
          {/* Room outline */}
          <rect
            x={0}
            y={0}
            width={175}
            height={130}
            fill="#e0f2fe"
            stroke={SVG_COLORS.stroke}
            strokeWidth={2}
          />

          {/* Tile pattern */}
          {[...Array(8)].map((_, i) => (
            <line
              key={`h-${i}`}
              x1={0}
              y1={i * 16 + 16}
              x2={175}
              y2={i * 16 + 16}
              stroke="#bae6fd"
              strokeWidth={0.5}
            />
          ))}
          {[...Array(11)].map((_, i) => (
            <line
              key={`v-${i}`}
              x1={i * 16 + 16}
              y1={0}
              x2={i * 16 + 16}
              y2={130}
              stroke="#bae6fd"
              strokeWidth={0.5}
            />
          ))}

          {/* Toilet */}
          <g transform="translate(12, 80)">
            <ellipse cx={18} cy={22} rx={16} ry={20} fill="white" stroke={SVG_COLORS.stroke} strokeWidth={1.5} />
            <rect x={5} y={-5} width={26} height={22} rx={3} fill="white" stroke={SVG_COLORS.stroke} strokeWidth={1.5} />
          </g>

          {/* Sink/Vanity */}
          <g transform="translate(60, 90)">
            <rect x={0} y={0} width={45} height={32} rx={3} fill="#f1f5f9" stroke={SVG_COLORS.stroke} strokeWidth={1.5} />
            <ellipse cx={22} cy={14} rx={13} ry={9} fill="white" stroke={SVG_COLORS.strokeLight} strokeWidth={1} />
            <circle cx={22} cy={14} r={2.5} fill={SVG_COLORS.strokeLight} />
          </g>

          {/* Shower/Tub */}
          <g transform="translate(125, 10)">
            <rect x={0} y={0} width={42} height={85} rx={3} fill="white" stroke={SVG_COLORS.stroke} strokeWidth={1.5} />
            <rect x={4} y={4} width={34} height={77} fill="#e0f2fe" stroke={SVG_COLORS.cold} strokeWidth={0.5} />
            <circle cx={35} cy={18} r={7} fill={SVG_COLORS.strokeLight} />
          </g>

          {/* Exhaust Fan */}
          <g transform="translate(75, 5)">
            <rect x={0} y={-15} width={38} height={18} fill="#64748b" stroke={SVG_COLORS.stroke} strokeWidth={1.5} rx={3} />
            <rect x={4} y={-12} width={30} height={12} fill="#475569" rx={2} />
            {/* Fan grille */}
            {[0, 1, 2].map((i) => (
              <rect key={i} x={7} y={-10 + i * 4} width={24} height={2} fill="#94a3b8" rx={1} />
            ))}
            <text x={19} y={16} fontSize="8" fill={SVG_COLORS.primary} fontWeight="bold" textAnchor="middle">
              Fan
            </text>
          </g>

          {/* Airflow arrows (moisture rising to fan) */}
          <g opacity={hasResults ? 1 : 0.4}>
            {/* From toilet area */}
            <path
              d="M30,75 Q50,45 94,-5"
              fill="none"
              stroke={SVG_COLORS.cold}
              strokeWidth={1.5}
              strokeDasharray="4,2"
              opacity={0.6}
            >
              {hasResults && (
                <animate
                  attributeName="stroke-dashoffset"
                  from="0"
                  to="-12"
                  dur="1s"
                  repeatCount="indefinite"
                />
              )}
            </path>

            {/* From shower */}
            <path
              d="M145,75 Q125,40 94,-5"
              fill="none"
              stroke={SVG_COLORS.cold}
              strokeWidth={2}
              strokeDasharray="4,2"
              opacity={0.8}
            >
              {hasResults && (
                <animate
                  attributeName="stroke-dashoffset"
                  from="0"
                  to="-12"
                  dur="0.8s"
                  repeatCount="indefinite"
                />
              )}
            </path>
          </g>

          {/* Door */}
          <rect x={0} y={45} width={5} height={35} fill="#92400e" />
        </g>

        {/* Legend - below bathroom */}
        <g transform="translate(15, 152)">
          <line x1={0} y1={5} x2={18} y2={5} stroke={SVG_COLORS.cold} strokeWidth={2} strokeDasharray="4,2" />
          <text x={24} y={8} fontSize="8" fill={SVG_COLORS.text}>Moisture/Air Flow</text>
        </g>

        {/* RIGHT COLUMN: Results Panel */}
        <g transform="translate(210, 12)">
          {/* Main results card */}
          <rect x={0} y={0} width={175} height={110} fill="white" stroke={SVG_COLORS.strokeLight} strokeWidth={1} rx={6} />

          <text x={87} y={18} fontSize="10" fill={SVG_COLORS.text} fontWeight="bold" textAnchor="middle">
            Fan Requirements
          </text>
          <line x1={10} y1={26} x2={165} y2={26} stroke={SVG_COLORS.strokeLight} />

          {/* Primary CFM result */}
          <text x={87} y={42} fontSize="8" fill={SVG_COLORS.textLight} textAnchor="middle">
            Minimum CFM
          </text>
          <text x={87} y={68} fontSize="28" fill={SVG_COLORS.accent} fontWeight="bold" textAnchor="middle">
            {recommendedCFM ?? '—'}
          </text>
          <text x={87} y={82} fontSize="9" fill={SVG_COLORS.textLight} textAnchor="middle">
            cubic feet/min
          </text>

          {/* Room volume and sone rating */}
          <line x1={10} y1={90} x2={165} y2={90} stroke={SVG_COLORS.strokeLight} />
          <text x={15} y={103} fontSize="8" fill={SVG_COLORS.textLight}>Volume:</text>
          <text x={55} y={103} fontSize="8" fill={SVG_COLORS.primary} fontWeight="bold">
            {roomCubicFeet ? `${roomCubicFeet} cu ft` : '—'}
          </text>
          <text x={105} y={103} fontSize="8" fill={SVG_COLORS.textLight}>Noise:</text>
          <text x={130} y={103} fontSize="8" fill={SVG_COLORS.primary} fontWeight="bold">
            ≤{soneRating || 1.0} sones
          </text>
        </g>

        {/* Air changes info card */}
        <g transform="translate(210, 130)">
          <rect x={0} y={0} width={175} height={38} fill="#f1f5f9" stroke={SVG_COLORS.strokeLight} strokeWidth={1} rx={4} />
          <text x={87} y={16} fontSize="8" fill={SVG_COLORS.textLight} textAnchor="middle">
            Based on {airChangesPerHour} air changes/hour
          </text>
          <text x={87} y={30} fontSize="7" fill={SVG_COLORS.textLight} textAnchor="middle">
            HVI recommends 8 ACH for bathrooms
          </text>
        </g>
      </svg>
    </CalculatorSVG>
  );
}
