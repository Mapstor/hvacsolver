'use client';

import CalculatorSVG, { SVG_COLORS } from '../CalculatorSVG';

interface BTUACSizingSVGProps {
  roomSqFt?: number;
  baseBTU?: number;
  adjustedBTU?: number;
  adjustments?: {
    sunExposure?: number;
    occupants?: number;
    kitchen?: number;
    ceilingHeight?: number;
  };
  roomType?: string;
}

/**
 * SVG visualization for Room AC BTU Sizing Calculator
 * Shows room with heat gain factors and BTU requirement
 */
export default function BTUACSizingSVG({
  roomSqFt,
  baseBTU,
  adjustedBTU,
  adjustments,
  roomType = 'Room',
}: BTUACSizingSVGProps) {
  const hasResults = adjustedBTU !== undefined;

  // Calculate adjustment factors for visualization
  const sunFactor = adjustments?.sunExposure ?? 0;
  const occupantFactor = adjustments?.occupants ?? 0;
  const kitchenFactor = adjustments?.kitchen ?? 0;
  const ceilingFactor = adjustments?.ceilingHeight ?? 0;

  return (
    <CalculatorSVG
      title="Room AC Sizing"
      description="BTU calculation with adjustment factors"
      aspectRatio="wide"
    >
      <svg
        viewBox="0 0 400 220"
        className="w-full h-full"
        preserveAspectRatio="xMidYMid meet"
      >
        {/* Background */}
        <rect width="400" height="220" fill="#f8fafc" />

        {/* Room visualization */}
        <g transform="translate(25, 25)">
          {/* Room box */}
          <rect
            x={0}
            y={0}
            width={150}
            height={120}
            fill="white"
            stroke={SVG_COLORS.stroke}
            strokeWidth={2}
            rx={4}
          />

          {/* Room label */}
          <text x={75} y={-8} fontSize="10" fill={SVG_COLORS.text} fontWeight="bold" textAnchor="middle">
            {roomType}
          </text>

          {/* Sun exposure (window on left) */}
          <g transform="translate(-5, 30)">
            <rect x={0} y={0} width={8} height={40} fill="#fef3c7" stroke={SVG_COLORS.warning} strokeWidth={1} />
            {sunFactor > 0 && hasResults && (
              <g>
                <text x={-15} y={10} fontSize="16">☀️</text>
                {/* Sun rays */}
                {[0, 1, 2].map((i) => (
                  <path
                    key={i}
                    d={`M8,${10 + i * 12} L25,${15 + i * 10}`}
                    fill="none"
                    stroke={SVG_COLORS.warning}
                    strokeWidth={1.5}
                    opacity={0.6}
                    strokeDasharray="3,2"
                  >
                    <animate
                      attributeName="stroke-dashoffset"
                      from="0"
                      to="-10"
                      dur="1s"
                      repeatCount="indefinite"
                    />
                  </path>
                ))}
              </g>
            )}
          </g>

          {/* Occupants */}
          {occupantFactor > 0 && (
            <g transform="translate(30, 70)">
              <text x={0} y={0} fontSize="24">👤</text>
              {occupantFactor > 600 && <text x={25} y={0} fontSize="24">👤</text>}
              <text x={12} y={35} fontSize="7" fill={SVG_COLORS.textLight}>
                +{occupantFactor} BTU
              </text>
            </g>
          )}

          {/* Kitchen indicator */}
          {kitchenFactor > 0 && (
            <g transform="translate(90, 70)">
              <text x={0} y={0} fontSize="20">🍳</text>
              <text x={10} y={25} fontSize="7" fill={SVG_COLORS.heat}>
                +{kitchenFactor} BTU
              </text>
            </g>
          )}

          {/* Ceiling height indicator */}
          {ceilingFactor !== 0 && (
            <g transform="translate(130, 5)">
              <line x1={10} y1={0} x2={10} y2={110} stroke={SVG_COLORS.primary} strokeWidth={1} strokeDasharray="3,2" />
              <text x={15} y={55} fontSize="7" fill={SVG_COLORS.primary} transform="rotate(90, 15, 55)">
                {ceilingFactor > 0 ? 'High' : 'Std'} Ceiling
              </text>
            </g>
          )}

          {/* AC unit on wall */}
          <g transform="translate(45, 0)">
            <rect x={0} y={-5} width={60} height={15} fill="#94a3b8" stroke={SVG_COLORS.stroke} strokeWidth={1.5} rx={2} />
            <rect x={5} y={10} width={50} height={5} fill="#64748b" rx={1} />

            {/* Cold air flow */}
            {hasResults && (
              <g>
                {[0, 1, 2].map((i) => (
                  <path
                    key={i}
                    d={`M${15 + i * 15},18 L${15 + i * 15},35`}
                    fill="none"
                    stroke={SVG_COLORS.cold}
                    strokeWidth={1.5}
                    strokeDasharray="3,3"
                    opacity={0.6}
                  >
                    <animate
                      attributeName="stroke-dashoffset"
                      from="0"
                      to="-12"
                      dur="0.7s"
                      repeatCount="indefinite"
                    />
                  </path>
                ))}
                <text x={30} y={50} fontSize="12" textAnchor="middle">❄️</text>
              </g>
            )}
          </g>

          {/* Room size */}
          <text x={75} y={135} fontSize="9" fill={SVG_COLORS.text} textAnchor="middle">
            {roomSqFt ? `${roomSqFt} sq ft` : '— sq ft'}
          </text>
        </g>

        {/* BTU calculation breakdown */}
        <g transform="translate(200, 20)">
          <rect x={0} y={0} width={180} height={155} fill="white" stroke={SVG_COLORS.strokeLight} rx={6} />

          <text x={90} y={18} fontSize="11" fill={SVG_COLORS.text} fontWeight="bold" textAnchor="middle">
            BTU Calculation
          </text>
          <line x1={10} y1={26} x2={170} y2={26} stroke={SVG_COLORS.strokeLight} />

          {/* Base BTU */}
          <g transform="translate(10, 42)">
            <text x={0} y={0} fontSize="9" fill={SVG_COLORS.textLight}>Base (20 BTU/sq ft)</text>
            <text x={155} y={0} fontSize="10" fill={SVG_COLORS.text} textAnchor="end">
              {baseBTU?.toLocaleString() ?? '—'}
            </text>
          </g>

          {/* Sun adjustment */}
          {sunFactor !== 0 && (
            <g transform="translate(10, 58)">
              <text x={0} y={0} fontSize="8" fill={SVG_COLORS.textLight}>☀️ Sun Exposure</text>
              <text x={155} y={0} fontSize="9" fill={sunFactor > 0 ? SVG_COLORS.heat : SVG_COLORS.cold} textAnchor="end">
                {sunFactor > 0 ? '+' : ''}{sunFactor.toLocaleString()}
              </text>
            </g>
          )}

          {/* Occupant adjustment */}
          {occupantFactor > 0 && (
            <g transform="translate(10, 72)">
              <text x={0} y={0} fontSize="8" fill={SVG_COLORS.textLight}>👤 Occupants</text>
              <text x={155} y={0} fontSize="9" fill={SVG_COLORS.heat} textAnchor="end">
                +{occupantFactor.toLocaleString()}
              </text>
            </g>
          )}

          {/* Kitchen adjustment */}
          {kitchenFactor > 0 && (
            <g transform="translate(10, 86)">
              <text x={0} y={0} fontSize="8" fill={SVG_COLORS.textLight}>🍳 Kitchen</text>
              <text x={155} y={0} fontSize="9" fill={SVG_COLORS.heat} textAnchor="end">
                +{kitchenFactor.toLocaleString()}
              </text>
            </g>
          )}

          {/* Ceiling adjustment */}
          {ceilingFactor !== 0 && (
            <g transform="translate(10, 100)">
              <text x={0} y={0} fontSize="8" fill={SVG_COLORS.textLight}>📏 Ceiling Height</text>
              <text x={155} y={0} fontSize="9" fill={ceilingFactor > 0 ? SVG_COLORS.heat : SVG_COLORS.cold} textAnchor="end">
                {ceilingFactor > 0 ? '+' : ''}{ceilingFactor.toLocaleString()}
              </text>
            </g>
          )}

          {/* Divider */}
          <line x1={10} y1={115} x2={170} y2={115} stroke={SVG_COLORS.strokeLight} />

          {/* Total */}
          <g transform="translate(10, 135)">
            <text x={0} y={0} fontSize="9" fill={SVG_COLORS.text} fontWeight="bold">Total BTU</text>
            <text x={160} y={0} fontSize="13" fill={SVG_COLORS.accent} fontWeight="bold" textAnchor="end">
              {adjustedBTU?.toLocaleString() ?? '—'}
            </text>
          </g>
        </g>

        {/* AC size recommendation */}
        <g transform="translate(25, 180)">
          <text x={0} y={0} fontSize="8" fill={SVG_COLORS.textLight}>
            Common AC sizes: 5,000 | 6,000 | 8,000 | 10,000 | 12,000 | 14,000 | 18,000 BTU
          </text>
          <text x={0} y={14} fontSize="9" fill={SVG_COLORS.primary} fontWeight="bold">
            Recommended: {adjustedBTU ? `${Math.ceil(adjustedBTU / 2000) * 2000} BTU unit` : '—'}
          </text>
        </g>
      </svg>
    </CalculatorSVG>
  );
}
