'use client';

import CalculatorSVG, { SVG_COLORS } from '../CalculatorSVG';

interface AirChangesPerHourSVGProps {
  roomVolume?: number;
  cfm?: number;
  ach?: number;
  roomType?: string;
  recommendedACH?: number;
}

/**
 * SVG visualization for Air Changes Per Hour Calculator
 * Shows room with air circulation pattern - clean two-column layout
 * Source: ASHRAE 62.1/62.2 ventilation standards visualization
 */
export default function AirChangesPerHourSVG({
  roomVolume,
  cfm,
  ach,
  roomType = 'General',
  recommendedACH,
}: AirChangesPerHourSVGProps) {
  const hasResults = ach !== undefined;

  // ACH adequacy color
  const getACHColor = () => {
    if (!ach || !recommendedACH) return SVG_COLORS.textLight;
    if (ach >= recommendedACH) return SVG_COLORS.good;
    if (ach >= recommendedACH * 0.75) return SVG_COLORS.warning;
    return SVG_COLORS.danger;
  };

  const getACHStatus = () => {
    if (!ach || !recommendedACH) return '';
    if (ach >= recommendedACH) return 'Adequate';
    if (ach >= recommendedACH * 0.75) return 'Marginal';
    return 'Insufficient';
  };

  // Air flow particles - more particles for higher ACH
  const particleCount = ach ? Math.min(Math.max(Math.floor(ach * 2), 4), 12) : 6;

  return (
    <CalculatorSVG
      title="Room Air Circulation"
      description="Air changes per hour visualization"
      aspectRatio="wide"
    >
      <svg
        viewBox="0 0 400 180"
        className="w-full h-full"
        preserveAspectRatio="xMidYMid meet"
      >
        {/* Background */}
        <rect width="400" height="180" fill="#f8fafc" />

        {/* LEFT COLUMN: Room Illustration */}
        <g transform="translate(15, 12)">
          {/* Section title */}
          <text x={90} y={10} fontSize="10" fill={SVG_COLORS.text} fontWeight="600" textAnchor="middle">
            {roomType} Room
          </text>

          {/* Room cross-section */}
          <g transform="translate(0, 18)">
            {/* Room outline */}
            <rect
              x={0}
              y={0}
              width={180}
              height={105}
              fill="white"
              stroke={SVG_COLORS.stroke}
              strokeWidth={2}
            />

            {/* Floor */}
            <rect x={0} y={100} width={180} height={5} fill="#cbd5e1" />

            {/* Supply vent (top left) */}
            <g transform="translate(15, 0)">
              <rect x={0} y={-4} width={35} height={8} fill="#64748b" stroke={SVG_COLORS.stroke} strokeWidth={1} rx={2} />
              {[0, 1, 2].map((i) => (
                <rect key={i} x={4 + i * 10} y={-1} width={6} height={2} fill="#94a3b8" rx={1} />
              ))}
              <text x={17} y={16} fontSize="7" fill={SVG_COLORS.cold} textAnchor="middle">Supply</text>
            </g>

            {/* Return vent (bottom right) */}
            <g transform="translate(130, 92)">
              <rect x={0} y={0} width={35} height={8} fill="#64748b" stroke={SVG_COLORS.stroke} strokeWidth={1} rx={2} />
              {[0, 1, 2].map((i) => (
                <rect key={i} x={4 + i * 10} y={3} width={6} height={2} fill="#94a3b8" rx={1} />
              ))}
              <text x={17} y={-5} fontSize="7" fill={SVG_COLORS.heat} textAnchor="middle">Return</text>
            </g>

            {/* Air circulation pattern */}
            {hasResults && (
              <g opacity={0.6}>
                {/* Main circulation path */}
                <path
                  d="M32,12 Q90,25 140,42 Q155,65 140,85 Q90,78 32,68 Q12,42 32,12"
                  fill="none"
                  stroke={SVG_COLORS.cold}
                  strokeWidth={1.5}
                  strokeDasharray="6,4"
                >
                  <animate
                    attributeName="stroke-dashoffset"
                    from="0"
                    to="-20"
                    dur={`${3 / (ach || 1)}s`}
                    repeatCount="indefinite"
                  />
                </path>

                {/* Air particles */}
                {[...Array(particleCount)].map((_, i) => {
                  const progress = i / particleCount;
                  const angle = progress * Math.PI * 2;
                  const radiusX = 45 + Math.sin(angle) * 25;
                  const radiusY = 40 + Math.cos(angle) * 28;
                  return (
                    <circle
                      key={i}
                      cx={90 + Math.cos(angle) * radiusX}
                      cy={48 + Math.sin(angle) * radiusY * 0.5}
                      r={2.5}
                      fill={SVG_COLORS.cold}
                      opacity={0.5}
                    >
                      <animateMotion
                        path="M0,0 Q35,15 48,32 Q55,50 48,62 Q18,58 0,50 Q-12,25 0,0"
                        dur={`${4 / (ach || 1)}s`}
                        begin={`${i * 0.25}s`}
                        repeatCount="indefinite"
                      />
                    </circle>
                  );
                })}
              </g>
            )}

            {/* Room volume indicator inside room */}
            <g transform="translate(8, 30)">
              <text x={0} y={0} fontSize="7" fill={SVG_COLORS.textLight}>Volume:</text>
              <text x={0} y={10} fontSize="8" fill={SVG_COLORS.primary} fontWeight="bold">
                {roomVolume ? `${roomVolume.toLocaleString()} cu ft` : '—'}
              </text>
            </g>
          </g>

          {/* Formula - below room illustration with proper spacing */}
          <g transform="translate(0, 138)">
            <rect x={0} y={0} width={180} height={28} fill="#f1f5f9" stroke={SVG_COLORS.strokeLight} strokeWidth={1} rx={4} />
            <text x={90} y={12} fontSize="7" fill={SVG_COLORS.textLight} textAnchor="middle">Formula</text>
            <text x={90} y={22} fontSize="8" fill={SVG_COLORS.text} fontWeight="500" textAnchor="middle">
              ACH = (CFM × 60) ÷ Volume
            </text>
          </g>
        </g>

        {/* RIGHT COLUMN: Results Panel */}
        <g transform="translate(215, 12)">
          {/* Main results card */}
          <rect x={0} y={0} width={170} height={120} fill="white" stroke={SVG_COLORS.strokeLight} strokeWidth={1} rx={6} />

          <text x={85} y={18} fontSize="10" fill={SVG_COLORS.text} fontWeight="bold" textAnchor="middle">
            Air Changes Per Hour
          </text>
          <line x1={10} y1={26} x2={160} y2={26} stroke={SVG_COLORS.strokeLight} />

          {/* Primary ACH result */}
          <text x={85} y={55} fontSize="28" fill={getACHColor()} fontWeight="bold" textAnchor="middle">
            {ach?.toFixed(1) ?? '—'}
          </text>
          <text x={85} y={70} fontSize="8" fill={SVG_COLORS.textLight} textAnchor="middle">
            changes per hour
          </text>

          {/* Status badge */}
          {hasResults && (
            <g>
              <rect x={45} y={78} width={80} height={16} fill={getACHColor()} rx={8} />
              <text x={85} y={90} fontSize="8" fill="white" fontWeight="bold" textAnchor="middle">
                {getACHStatus()}
              </text>
            </g>
          )}

          {/* Comparison to recommended */}
          <line x1={10} y1={100} x2={160} y2={100} stroke={SVG_COLORS.strokeLight} />
          <text x={15} y={113} fontSize="8" fill={SVG_COLORS.textLight}>Recommended:</text>
          <text x={155} y={113} fontSize="9" fill={SVG_COLORS.primary} fontWeight="bold" textAnchor="end">
            {recommendedACH ?? '—'} ACH
          </text>

          {/* Additional metrics card */}
          <rect x={0} y={128} width={170} height={38} fill="#f1f5f9" stroke={SVG_COLORS.strokeLight} strokeWidth={1} rx={4} />

          {/* Airflow */}
          <text x={15} y={144} fontSize="8" fill={SVG_COLORS.textLight}>Airflow:</text>
          <text x={155} y={144} fontSize="9" fill={SVG_COLORS.text} fontWeight="500" textAnchor="end">
            {cfm?.toLocaleString() ?? '—'} CFM
          </text>

          {/* Air turnover time */}
          <text x={15} y={158} fontSize="8" fill={SVG_COLORS.textLight}>Air Turnover:</text>
          <text x={155} y={158} fontSize="9" fill={SVG_COLORS.text} fontWeight="500" textAnchor="end">
            {ach ? `${(60 / ach).toFixed(1)} min` : '—'}
          </text>
        </g>
      </svg>
    </CalculatorSVG>
  );
}
