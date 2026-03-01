'use client';

import { useMemo } from 'react';
import CalculatorSVG, { SVG_COLORS } from '../CalculatorSVG';

interface AirPurifierSizingSVGProps {
  roomSqFt?: number;
  ceilingHeight?: number;
  recommendedCADR?: number;
  airChangesPerHour?: number;
  purifierCount?: number;
}

// Fixed particle positions (pre-computed to avoid Math.random during render)
const PARTICLE_POSITIONS = [
  { x: 45, y: 35, size: 3, delay: 0.2 },
  { x: 78, y: 52, size: 4, delay: 1.1 },
  { x: 112, y: 28, size: 2.5, delay: 0.8 },
  { x: 55, y: 88, size: 3.5, delay: 1.5 },
  { x: 142, y: 65, size: 2, delay: 0.4 },
  { x: 38, y: 72, size: 4.5, delay: 1.8 },
  { x: 95, y: 95, size: 3, delay: 0.6 },
  { x: 125, y: 42, size: 2.5, delay: 1.2 },
  { x: 68, y: 115, size: 3.5, delay: 0.9 },
  { x: 152, y: 85, size: 2, delay: 1.6 },
  { x: 48, y: 58, size: 4, delay: 0.3 },
  { x: 108, y: 78, size: 3, delay: 1.4 },
  { x: 135, y: 105, size: 2.5, delay: 0.7 },
  { x: 62, y: 42, size: 3.5, delay: 1.0 },
  { x: 88, y: 118, size: 2, delay: 1.7 },
  { x: 158, y: 55, size: 4, delay: 0.5 },
  { x: 72, y: 68, size: 3, delay: 1.3 },
  { x: 118, y: 92, size: 2.5, delay: 0.1 },
  { x: 42, y: 102, size: 3.5, delay: 1.9 },
  { x: 98, y: 38, size: 2, delay: 0.0 },
];

/**
 * SVG visualization for Air Purifier Sizing Calculator
 * Shows room with air purifier and particle flow visualization
 */
export default function AirPurifierSizingSVG({
  roomSqFt,
  ceilingHeight = 8,
  recommendedCADR,
  airChangesPerHour = 4,
  purifierCount = 1,
}: AirPurifierSizingSVGProps) {
  const hasResults = recommendedCADR !== undefined;

  // Use pre-computed particle positions with dynamic captured state
  const particles = useMemo(() =>
    PARTICLE_POSITIONS.map((p, i) => ({
      ...p,
      captured: i < (hasResults ? 12 : 0),
    })),
    [hasResults]
  );

  return (
    <CalculatorSVG
      title="Air Purifier Coverage"
      description="Room air cleaning capacity visualization"
      aspectRatio="wide"
    >
      <svg
        viewBox="0 0 400 200"
        className="w-full h-full"
        preserveAspectRatio="xMidYMid meet"
      >
        {/* Background */}
        <rect width="400" height="200" fill="#f8fafc" />

        {/* Room outline */}
        <g transform="translate(20, 25)">
          {/* Room box */}
          <rect
            x={0}
            y={0}
            width={180}
            height={130}
            fill="white"
            stroke={SVG_COLORS.stroke}
            strokeWidth={2}
            rx={4}
          />

          {/* Floor */}
          <line x1={0} y1={130} x2={180} y2={130} stroke={SVG_COLORS.stroke} strokeWidth={2} />

          {/* Room dimensions label */}
          <text x={90} y={145} fontSize="9" fill={SVG_COLORS.textLight} textAnchor="middle">
            {roomSqFt ? `${roomSqFt} sq ft × ${ceilingHeight} ft ceiling` : 'Enter room size'}
          </text>

          {/* Air purifier unit */}
          <g transform="translate(140, 80)">
            {/* Unit body */}
            <rect x={0} y={0} width={30} height={45} rx={3} fill="#475569" stroke={SVG_COLORS.stroke} strokeWidth={1.5} />

            {/* Control panel */}
            <rect x={5} y={5} width={20} height={8} rx={1} fill="#1e3a5f" />
            <circle cx={10} cy={9} r={2} fill={hasResults ? SVG_COLORS.good : SVG_COLORS.textLight} />

            {/* Air intake grille */}
            <g>
              {[0, 1, 2, 3].map((i) => (
                <rect key={i} x={5} y={18 + i * 6} width={20} height={3} rx={1} fill="#64748b" />
              ))}
            </g>

            {/* Clean air output arrows */}
            {hasResults && (
              <g>
                <path
                  d="M-5,15 Q-25,15 -30,5"
                  fill="none"
                  stroke={SVG_COLORS.cold}
                  strokeWidth={2}
                  opacity={0.6}
                >
                  <animate
                    attributeName="stroke-dashoffset"
                    from="0"
                    to="-20"
                    dur="1s"
                    repeatCount="indefinite"
                  />
                </path>
                <path
                  d="M-5,22 Q-35,22 -45,22"
                  fill="none"
                  stroke={SVG_COLORS.cold}
                  strokeWidth={2}
                  opacity={0.6}
                  strokeDasharray="4,2"
                >
                  <animate
                    attributeName="stroke-dashoffset"
                    from="0"
                    to="-20"
                    dur="0.8s"
                    repeatCount="indefinite"
                  />
                </path>
                <path
                  d="M-5,30 Q-25,30 -30,40"
                  fill="none"
                  stroke={SVG_COLORS.cold}
                  strokeWidth={2}
                  opacity={0.6}
                  strokeDasharray="4,2"
                >
                  <animate
                    attributeName="stroke-dashoffset"
                    from="0"
                    to="-20"
                    dur="1.2s"
                    repeatCount="indefinite"
                  />
                </path>
              </g>
            )}
          </g>

          {/* Particles (dust, allergens, etc.) */}
          {particles.map((p, i) => (
            <circle
              key={i}
              cx={p.x}
              cy={p.y}
              r={p.size}
              fill={p.captured ? SVG_COLORS.cold : '#94a3b8'}
              opacity={p.captured ? 0.3 : 0.6}
            >
              {hasResults && p.captured && (
                <animate
                  attributeName="cx"
                  from={p.x}
                  to={155}
                  dur={`${1.5 + p.delay}s`}
                  repeatCount="indefinite"
                />
              )}
              {hasResults && p.captured && (
                <animate
                  attributeName="cy"
                  from={p.y}
                  to={105}
                  dur={`${1.5 + p.delay}s`}
                  repeatCount="indefinite"
                />
              )}
              {hasResults && p.captured && (
                <animate
                  attributeName="opacity"
                  from="0.6"
                  to="0"
                  dur={`${1.5 + p.delay}s`}
                  repeatCount="indefinite"
                />
              )}
            </circle>
          ))}

          {/* Legend */}
          <g transform="translate(5, 5)">
            <circle cx={5} cy={5} r={3} fill="#94a3b8" opacity={0.6} />
            <text x={12} y={8} fontSize="7" fill={SVG_COLORS.textLight}>Particles</text>
          </g>
        </g>

        {/* Results panel */}
        <g transform="translate(220, 25)">
          <rect x={0} y={0} width={160} height={130} fill="white" stroke={SVG_COLORS.strokeLight} rx={6} />

          <text x={80} y={18} fontSize="11" fill={SVG_COLORS.text} fontWeight="bold" textAnchor="middle">
            Purifier Specs
          </text>
          <line x1={10} y1={26} x2={150} y2={26} stroke={SVG_COLORS.strokeLight} />

          {/* CADR recommendation */}
          <text x={80} y={45} fontSize="9" fill={SVG_COLORS.textLight} textAnchor="middle">
            Minimum CADR
          </text>
          <text x={80} y={68} fontSize="22" fill={SVG_COLORS.accent} fontWeight="bold" textAnchor="middle">
            {recommendedCADR ? `${recommendedCADR}` : '—'}
          </text>
          <text x={80} y={82} fontSize="10" fill={SVG_COLORS.textLight} textAnchor="middle">
            CFM (cubic feet/min)
          </text>

          {/* Air changes */}
          <g transform="translate(10, 95)">
            <text x={70} y={0} fontSize="8" fill={SVG_COLORS.textLight} textAnchor="middle">
              Target Air Changes
            </text>
            <text x={70} y={14} fontSize="11" fill={SVG_COLORS.primary} fontWeight="bold" textAnchor="middle">
              {airChangesPerHour} ACH
            </text>
          </g>

          {/* Unit count */}
          {purifierCount > 1 && (
            <g transform="translate(10, 115)">
              <text x={70} y={0} fontSize="8" fill={SVG_COLORS.warning} textAnchor="middle">
                Recommended: {purifierCount} units
              </text>
            </g>
          )}
        </g>

        {/* CADR guide */}
        <g transform="translate(220, 165)">
          <text x={0} y={0} fontSize="8" fill={SVG_COLORS.textLight}>
            AHAM 2/3 Rule: CADR ≥ ⅔ × Room sq ft
          </text>
          <text x={0} y={12} fontSize="7" fill={SVG_COLORS.textLight}>
            Higher CADR = faster air cleaning
          </text>
        </g>

        {/* Particle type icons */}
        <g transform="translate(20, 175)">
          <text x={0} y={0} fontSize="8" fill={SVG_COLORS.textLight}>
            Removes: 🌸 Pollen · 🐱 Pet Dander · 💨 Dust · 🦠 Bacteria
          </text>
        </g>
      </svg>
    </CalculatorSVG>
  );
}
