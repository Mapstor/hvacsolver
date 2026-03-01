'use client';

import CalculatorSVG, { SVG_COLORS } from '../CalculatorSVG';

interface MiniSplitSizingSVGProps {
  totalBTU?: number;
  roomCount?: number;
  zones?: Array<{ name: string; btu: number }>;
  outdoorUnitSize?: number;
  seerRating?: number;
}

/**
 * SVG visualization for Mini Split Sizing Calculator
 * Shows multi-zone system with indoor and outdoor units
 */
export default function MiniSplitSizingSVG({
  totalBTU,
  roomCount = 1,
  zones = [],
  outdoorUnitSize,
  seerRating,
}: MiniSplitSizingSVGProps) {
  const hasResults = totalBTU !== undefined;

  // Limit displayed zones for visualization
  const displayZones = zones.slice(0, 4);
  const zoneCount = Math.max(roomCount, displayZones.length, 1);

  return (
    <CalculatorSVG
      title="Mini Split System Layout"
      description="Multi-zone ductless system configuration"
      aspectRatio="wide"
    >
      <svg
        viewBox="0 0 400 220"
        className="w-full h-full"
        preserveAspectRatio="xMidYMid meet"
      >
        {/* Background */}
        <rect width="400" height="220" fill="#f8fafc" />

        {/* Indoor units (zones) */}
        <g transform="translate(20, 20)">
          <text x={80} y={0} fontSize="10" fill={SVG_COLORS.text} fontWeight="bold" textAnchor="middle">
            Indoor Units
          </text>

          {[...Array(Math.min(zoneCount, 4))].map((_, i) => {
            const zone = displayZones[i];
            const yOffset = 15 + i * 40;
            return (
              <g key={i} transform={`translate(0, ${yOffset})`}>
                {/* Room box */}
                <rect
                  x={0}
                  y={0}
                  width={120}
                  height={35}
                  fill="white"
                  stroke={SVG_COLORS.strokeLight}
                  strokeWidth={1}
                  rx={4}
                />

                {/* Indoor unit */}
                <rect
                  x={5}
                  y={5}
                  width={45}
                  height={12}
                  fill="#94a3b8"
                  stroke={SVG_COLORS.stroke}
                  strokeWidth={1}
                  rx={2}
                />

                {/* Airflow vanes */}
                <rect x={10} y={17} width={35} height={3} fill="#64748b" rx={1} />

                {/* Cold air flow */}
                {hasResults && (
                  <g>
                    {[0, 1, 2].map((j) => (
                      <path
                        key={j}
                        d={`M${15 + j * 10},22 L${15 + j * 10},30`}
                        fill="none"
                        stroke={SVG_COLORS.cold}
                        strokeWidth={1}
                        strokeDasharray="2,2"
                        opacity={0.6}
                      >
                        <animate
                          attributeName="stroke-dashoffset"
                          from="0"
                          to="-8"
                          dur="0.6s"
                          repeatCount="indefinite"
                        />
                      </path>
                    ))}
                  </g>
                )}

                {/* Zone label and BTU */}
                <text x={60} y={12} fontSize="8" fill={SVG_COLORS.text}>
                  {zone?.name || `Zone ${i + 1}`}
                </text>
                <text x={60} y={25} fontSize="9" fill={SVG_COLORS.primary} fontWeight="bold">
                  {zone?.btu ? `${(zone.btu / 1000).toFixed(0)}k BTU` : '—'}
                </text>

                {/* Connection line to outdoor unit */}
                <path
                  d={`M120,17 Q140,17 155,${60 + (i - (zoneCount - 1) / 2) * 10}`}
                  fill="none"
                  stroke={SVG_COLORS.cold}
                  strokeWidth={2}
                  opacity={0.6}
                />
              </g>
            );
          })}

          {/* More zones indicator */}
          {zoneCount > 4 && (
            <text x={60} y={185} fontSize="8" fill={SVG_COLORS.textLight} textAnchor="middle">
              +{zoneCount - 4} more zones
            </text>
          )}
        </g>

        {/* Refrigerant lines */}
        <g transform="translate(155, 60)">
          {/* Line bundle */}
          <rect x={0} y={-5} width={15} height={80} fill="#e2e8f0" stroke={SVG_COLORS.strokeLight} strokeWidth={1} rx={3} />

          {/* Line pair indication */}
          <circle cx={5} cy={10} r={2} fill={SVG_COLORS.cold} />
          <circle cx={10} cy={10} r={2} fill={SVG_COLORS.heat} />

          {/* Refrigerant flow animation */}
          {hasResults && (
            <>
              <circle cx={5} cy={35} r={2} fill={SVG_COLORS.cold}>
                <animate attributeName="cy" values="15;60;15" dur="2s" repeatCount="indefinite" />
              </circle>
              <circle cx={10} cy={50} r={2} fill={SVG_COLORS.heat}>
                <animate attributeName="cy" values="60;15;60" dur="2s" repeatCount="indefinite" />
              </circle>
            </>
          )}
        </g>

        {/* Outdoor condenser unit */}
        <g transform="translate(180, 30)">
          <text x={50} y={0} fontSize="10" fill={SVG_COLORS.text} fontWeight="bold" textAnchor="middle">
            Outdoor Unit
          </text>

          {/* Unit body */}
          <rect
            x={10}
            y={15}
            width={80}
            height={100}
            rx={6}
            fill="#475569"
            stroke={SVG_COLORS.stroke}
            strokeWidth={2}
          />

          {/* Fan grille */}
          <circle cx={50} cy={55} r={30} fill="#334155" stroke={SVG_COLORS.stroke} strokeWidth={1.5} />
          <circle cx={50} cy={55} r={25} fill="#1e3a5f" />

          {/* Fan blades */}
          {[0, 90, 180, 270].map((angle) => (
            <line
              key={angle}
              x1={50}
              y1={55}
              x2={50 + Math.cos((angle * Math.PI) / 180) * 20}
              y2={55 + Math.sin((angle * Math.PI) / 180) * 20}
              stroke="#64748b"
              strokeWidth={5}
              strokeLinecap="round"
            >
              {hasResults && (
                <animateTransform
                  attributeName="transform"
                  type="rotate"
                  from="0 50 55"
                  to="360 50 55"
                  dur="1s"
                  repeatCount="indefinite"
                />
              )}
            </line>
          ))}

          {/* Compressor section */}
          <rect x={15} y={90} width={70} height={20} fill="#334155" rx={2} />

          {/* Capacity label */}
          <text x={50} y={125} fontSize="10" fill={SVG_COLORS.accent} fontWeight="bold" textAnchor="middle">
            {outdoorUnitSize ? `${(outdoorUnitSize / 1000).toFixed(0)}k BTU` : '— BTU'}
          </text>

          {/* SEER rating */}
          <g transform="translate(5, 135)">
            <text x={45} y={0} fontSize="8" fill={SVG_COLORS.textLight} textAnchor="middle">
              {seerRating ? `SEER ${seerRating}` : ''}
            </text>
          </g>
        </g>

        {/* Results summary */}
        <g transform="translate(280, 130)">
          <rect x={0} y={0} width={100} height={55} fill="white" stroke={SVG_COLORS.strokeLight} rx={4} />

          <text x={50} y={15} fontSize="9" fill={SVG_COLORS.textLight} textAnchor="middle">
            Total Capacity
          </text>
          <text x={50} y={35} fontSize="14" fill={SVG_COLORS.accent} fontWeight="bold" textAnchor="middle">
            {totalBTU ? `${(totalBTU / 1000).toFixed(0)}k BTU` : '—'}
          </text>
          <text x={50} y={50} fontSize="8" fill={SVG_COLORS.text} textAnchor="middle">
            {zoneCount} Zone{zoneCount > 1 ? 's' : ''}
          </text>
        </g>

        {/* System type note */}
        <g transform="translate(20, 205)">
          <text x={0} y={0} fontSize="7" fill={SVG_COLORS.textLight}>
            Multi-zone mini-split: One outdoor unit connects to multiple indoor heads
          </text>
        </g>
      </svg>
    </CalculatorSVG>
  );
}
