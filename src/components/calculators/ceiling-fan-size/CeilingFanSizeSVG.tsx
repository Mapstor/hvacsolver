'use client';

import CalculatorSVG, { SVG_COLORS } from '../CalculatorSVG';

interface CeilingFanSizeSVGProps {
  roomWidth?: number;
  roomLength?: number;
  recommendedSize?: number;
  roomSqFt?: number;
  mountType?: 'standard' | 'flush' | 'extended';
}

/**
 * SVG visualization for Ceiling Fan Size Calculator
 * Shows room with fan size recommendation - clean two-column layout
 */
export default function CeilingFanSizeSVG({
  roomWidth,
  roomLength,
  recommendedSize,
  roomSqFt,
  mountType = 'standard',
}: CeilingFanSizeSVGProps) {
  // Fan blade scale (max 72" = full scale)
  const maxFanSize = 72;
  const fanScale = recommendedSize ? recommendedSize / maxFanSize : 0.5;
  const fanRadius = 35 * fanScale + 12;

  // Room dimensions for visualization (scaled to fit in left column)
  const roomW = roomWidth || 12;
  const roomL = roomLength || 14;
  const maxDim = Math.max(roomW, roomL, 20);
  const roomScaleW = (roomW / maxDim) * 140;
  const roomScaleL = (roomL / maxDim) * 100;

  // Mount type labels
  const getMountInfo = () => {
    switch (mountType) {
      case 'flush': return { label: 'Flush', ceiling: '7-8 ft' };
      case 'extended': return { label: 'Extended', ceiling: '10+ ft' };
      default: return { label: 'Standard', ceiling: '8-9 ft' };
    }
  };
  const mountInfo = getMountInfo();

  return (
    <CalculatorSVG
      title="Fan Size for Your Room"
      description="Recommended ceiling fan diameter based on room dimensions"
      aspectRatio="wide"
    >
      <svg
        viewBox="0 0 400 180"
        className="w-full h-full"
        preserveAspectRatio="xMidYMid meet"
      >
        {/* Background */}
        <rect width="400" height="180" fill="#f8fafc" />

        {/* LEFT COLUMN: Room visualization */}
        <g transform="translate(20, 15)">
          {/* Room outline (3D perspective) */}
          <g transform="translate(15, 10)">
            {/* Floor */}
            <polygon
              points={`0,${roomScaleL} ${roomScaleW},${roomScaleL} ${roomScaleW + 30},${roomScaleL - 22} 30,${roomScaleL - 22}`}
              fill="#f1f5f9"
              stroke={SVG_COLORS.strokeLight}
              strokeWidth={1}
            />

            {/* Back wall */}
            <rect
              x={0}
              y={0}
              width={roomScaleW}
              height={roomScaleL}
              fill="#e2e8f0"
              stroke={SVG_COLORS.stroke}
              strokeWidth={1.5}
            />

            {/* Side wall (right) */}
            <polygon
              points={`${roomScaleW},0 ${roomScaleW + 30},-22 ${roomScaleW + 30},${roomScaleL - 22} ${roomScaleW},${roomScaleL}`}
              fill="#cbd5e1"
              stroke={SVG_COLORS.stroke}
              strokeWidth={1.5}
            />

            {/* Ceiling fan */}
            <g transform={`translate(${roomScaleW / 2}, ${roomScaleL / 2 - 15})`}>
              {/* Downrod */}
              {mountType === 'standard' && (
                <rect x={-2} y={-20} width={4} height={20} fill="#94a3b8" />
              )}
              {mountType === 'extended' && (
                <rect x={-2} y={-32} width={4} height={32} fill="#94a3b8" />
              )}

              {/* Motor housing */}
              <ellipse cx={0} cy={0} rx={10} ry={6} fill="#64748b" stroke={SVG_COLORS.stroke} strokeWidth={1} />

              {/* Fan blades */}
              {[0, 72, 144, 216, 288].map((angle, i) => (
                <ellipse
                  key={i}
                  cx={0}
                  cy={0}
                  rx={fanRadius}
                  ry={fanRadius / 4}
                  fill="#94a3b8"
                  stroke={SVG_COLORS.stroke}
                  strokeWidth={0.5}
                  opacity={0.8}
                  transform={`rotate(${angle})`}
                />
              ))}

              {/* Center cap */}
              <circle cx={0} cy={0} r={5} fill="#475569" />

              {/* Fan size indicator arc */}
              <circle
                cx={0}
                cy={0}
                r={fanRadius + 4}
                fill="none"
                stroke={SVG_COLORS.accent}
                strokeWidth={1.5}
                strokeDasharray="3,3"
                opacity={0.7}
              />
            </g>
          </g>

          {/* Room dimensions - positioned clearly below/beside room */}
          <text x={15 + roomScaleW / 2} y={roomScaleL + 28} fontSize="9" fill={SVG_COLORS.text} textAnchor="middle">
            {roomW} ft
          </text>
          <text x={roomScaleW + 55} y={roomScaleL / 2 + 5} fontSize="9" fill={SVG_COLORS.text} textAnchor="start">
            {roomL} ft
          </text>
        </g>

        {/* Mount type info card - below room */}
        <g transform="translate(20, 145)">
          <rect x={0} y={0} width={170} height={26} fill="#f1f5f9" stroke={SVG_COLORS.strokeLight} strokeWidth={1} rx={4} />
          <text x={10} y={17} fontSize="8" fill={SVG_COLORS.textLight}>
            Mount: <tspan fontWeight="bold" fill={SVG_COLORS.text}>{mountInfo.label}</tspan>
          </text>
          <text x={85} y={17} fontSize="8" fill={SVG_COLORS.textLight}>
            Ceiling: <tspan fontWeight="bold" fill={SVG_COLORS.text}>{mountInfo.ceiling}</tspan>
          </text>
        </g>

        {/* RIGHT COLUMN: Results Panel */}
        <g transform="translate(210, 15)">
          {/* Main results card */}
          <rect x={0} y={0} width={175} height={100} fill="white" stroke={SVG_COLORS.strokeLight} strokeWidth={1} rx={6} />

          <text x={87} y={18} fontSize="10" fill={SVG_COLORS.text} fontWeight="bold" textAnchor="middle">
            Recommendation
          </text>
          <line x1={10} y1={26} x2={165} y2={26} stroke={SVG_COLORS.strokeLight} />

          {/* Fan size - primary result */}
          <text x={87} y={42} fontSize="8" fill={SVG_COLORS.textLight} textAnchor="middle">
            Fan Diameter
          </text>
          <text x={87} y={68} fontSize="28" fill={SVG_COLORS.accent} fontWeight="bold" textAnchor="middle">
            {recommendedSize ? `${recommendedSize}"` : '—'}
          </text>

          {/* Room area */}
          <line x1={10} y1={78} x2={165} y2={78} stroke={SVG_COLORS.strokeLight} />
          <text x={15} y={93} fontSize="8" fill={SVG_COLORS.textLight}>Room Area:</text>
          <text x={160} y={93} fontSize="10" fill={SVG_COLORS.primary} fontWeight="bold" textAnchor="end">
            {roomSqFt ? `${roomSqFt} sq ft` : '—'}
          </text>
        </g>

        {/* Size guide card */}
        <g transform="translate(210, 123)">
          <rect x={0} y={0} width={175} height={48} fill="#f1f5f9" stroke={SVG_COLORS.strokeLight} strokeWidth={1} rx={4} />
          <text x={87} y={14} fontSize="8" fill={SVG_COLORS.textLight} textAnchor="middle">Size Guide</text>
          <text x={87} y={28} fontSize="7" fill={SVG_COLORS.text} textAnchor="middle">
            &lt;75 sq ft: 29-36&quot; | 75-144: 36-42&quot;
          </text>
          <text x={87} y={40} fontSize="7" fill={SVG_COLORS.text} textAnchor="middle">
            144-225: 44&quot; | 225-400: 50-54&quot;
          </text>
        </g>
      </svg>
    </CalculatorSVG>
  );
}
