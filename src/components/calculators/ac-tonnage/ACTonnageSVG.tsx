'use client';

import CalculatorSVG, {
  ArrowMarkerDefs,
  SVG_COLORS,
} from '../CalculatorSVG';

interface ACTonnageSVGProps {
  breakdown?: {
    label: string;
    btu: number;
    percentage: number;
  }[];
  totalBTU?: number;
  recommendedTons?: number;
}

/**
 * SVG visualization for AC Tonnage Calculator
 * Shows house cross-section with heat gain arrows from various sources
 * Source: ACCA Manual J load components visualization
 */
export default function ACTonnageSVG({
  breakdown,
  totalBTU,
  recommendedTons,
}: ACTonnageSVGProps) {
  const hasResults = breakdown && breakdown.length > 0;

  // Get percentages for display
  const getPercentage = (label: string) => {
    if (!breakdown) return 0;
    const item = breakdown.find((b) => b.label.toLowerCase().includes(label.toLowerCase()));
    return item?.percentage || 0;
  };

  const envelopePercent = getPercentage('envelope');
  const windowPercent = getPercentage('window');

  return (
    <CalculatorSVG
      title="Heat Gain Sources"
      description="Arrows indicate heat gain from various sources entering your home"
      aspectRatio="wide"
    >
      <svg
        viewBox="0 0 400 200"
        className="w-full h-full"
        preserveAspectRatio="xMidYMid meet"
      >
        <ArrowMarkerDefs />

        {/* Background */}
        <rect width="400" height="200" fill="#f8fafc" />

        {/* LEFT SIDE: House Illustration */}
        <g transform="translate(10, 10)">
          {/* Sky area */}
          <rect x={0} y={0} width={220} height={130} fill="#e0f2fe" rx={4} />

          {/* Ground */}
          <rect x={0} y={130} width={220} height={50} fill="#d1d5db" rx={0} />

          {/* Sun */}
          <circle cx={35} cy={35} r={18} fill="#fbbf24" />
          {/* Sun rays */}
          {[0, 45, 90, 135, 180, 225, 270, 315].map((angle) => (
            <line
              key={angle}
              x1={35 + Math.cos((angle * Math.PI) / 180) * 22}
              y1={35 + Math.sin((angle * Math.PI) / 180) * 22}
              x2={35 + Math.cos((angle * Math.PI) / 180) * 28}
              y2={35 + Math.sin((angle * Math.PI) / 180) * 28}
              stroke="#fbbf24"
              strokeWidth={2}
              strokeLinecap="round"
            />
          ))}

          {/* House */}
          <g transform="translate(70, 35)">
            {/* Roof */}
            <path d="M0,50 L50,10 L100,50 Z" fill="#f1f5f9" stroke={SVG_COLORS.stroke} strokeWidth={2} />
            {/* Walls */}
            <rect x={5} y={50} width={90} height={75} fill="white" stroke={SVG_COLORS.stroke} strokeWidth={2} />
            {/* Window */}
            <rect x={20} y={65} width={25} height={30} fill="#bfdbfe" stroke={SVG_COLORS.stroke} strokeWidth={1} />
            <line x1={32.5} y1={65} x2={32.5} y2={95} stroke={SVG_COLORS.stroke} strokeWidth={1} />
            <line x1={20} y1={80} x2={45} y2={80} stroke={SVG_COLORS.stroke} strokeWidth={1} />
            {/* Door */}
            <rect x={55} y={75} width={22} height={50} fill="#92400e" stroke={SVG_COLORS.stroke} strokeWidth={1} />
            <circle cx={72} cy={100} r={2} fill="#fbbf24" />
          </g>

          {/* Heat arrows - simplified, no labels on arrows */}
          {/* Roof arrow */}
          <path d="M120,5 L120,32" fill="none" stroke={SVG_COLORS.heat} strokeWidth={3} markerEnd="url(#arrow-heat)" />

          {/* Solar arrow */}
          <path d="M55,50 L88,72" fill="none" stroke={SVG_COLORS.heat} strokeWidth={3} strokeDasharray="4,2" markerEnd="url(#arrow-heat)" />

          {/* Left wall arrow */}
          <path d="M55,100 L73,100" fill="none" stroke={SVG_COLORS.heat} strokeWidth={3} markerEnd="url(#arrow-heat)" />

          {/* Right wall arrow */}
          <path d="M185,100 L167,100" fill="none" stroke={SVG_COLORS.heat} strokeWidth={3} markerEnd="url(#arrow-heat)" />

          {/* AC Unit */}
          <g transform="translate(175, 135)">
            <rect x={0} y={0} width={35} height={30} fill="#e2e8f0" stroke={SVG_COLORS.stroke} strokeWidth={1} rx={2} />
            <rect x={5} y={5} width={25} height={3} fill="#94a3b8" />
            <rect x={5} y={11} width={25} height={3} fill="#94a3b8" />
            <rect x={5} y={17} width={25} height={3} fill="#94a3b8" />
            {/* Heat removal arrow */}
            <path d="M35,15 L45,15 L45,5" fill="none" stroke={SVG_COLORS.cold} strokeWidth={2} markerEnd="url(#arrow-cold)" />
          </g>
        </g>

        {/* RIGHT SIDE: Results and Legend */}
        <g transform="translate(245, 10)">
          {/* Legend box */}
          <rect x={0} y={0} width={140} height={45} fill="white" stroke={SVG_COLORS.strokeLight} strokeWidth={1} rx={6} />
          <text x={70} y={16} fontSize="9" fill={SVG_COLORS.textLight} textAnchor="middle">Legend</text>
          <line x1={15} y1={28} x2={35} y2={28} stroke={SVG_COLORS.heat} strokeWidth={2} />
          <text x={42} y={32} fontSize="9" fill={SVG_COLORS.text}>Heat Gain</text>
          <line x1={15} y1={40} x2={35} y2={40} stroke={SVG_COLORS.cold} strokeWidth={2} />
          <text x={42} y={44} fontSize="9" fill={SVG_COLORS.text}>Heat Removal</text>

          {/* Heat Sources breakdown */}
          <rect x={0} y={55} width={140} height={75} fill="#fef3c7" stroke={SVG_COLORS.strokeLight} strokeWidth={1} rx={6} />
          <text x={70} y={72} fontSize="10" fill={SVG_COLORS.text} fontWeight="600" textAnchor="middle">Heat Sources</text>

          <text x={12} y={90} fontSize="9" fill={SVG_COLORS.heat}>● Roof & Walls</text>
          <text x={125} y={90} fontSize="9" fill={SVG_COLORS.text} textAnchor="end">{hasResults ? `${envelopePercent}%` : '—'}</text>

          <text x={12} y={105} fontSize="9" fill={SVG_COLORS.heat}>● Solar (Windows)</text>
          <text x={125} y={105} fontSize="9" fill={SVG_COLORS.text} textAnchor="end">{hasResults ? `${windowPercent}%` : '—'}</text>

          <text x={12} y={120} fontSize="9" fill={SVG_COLORS.accent}>● People & Appliances</text>
          <text x={125} y={120} fontSize="9" fill={SVG_COLORS.text} textAnchor="end">{hasResults ? `${100 - envelopePercent - windowPercent}%` : '—'}</text>

          {/* Results box */}
          {hasResults && totalBTU && recommendedTons ? (
            <g>
              <rect x={0} y={140} width={140} height={50} fill="white" stroke={SVG_COLORS.stroke} strokeWidth={1} rx={6} />
              <text x={70} y={160} fontSize="16" fill={SVG_COLORS.text} fontWeight="bold" textAnchor="middle">
                {recommendedTons} Ton AC
              </text>
              <text x={70} y={178} fontSize="11" fill={SVG_COLORS.textLight} textAnchor="middle">
                {(totalBTU / 1000).toFixed(0)}k BTU/hr capacity
              </text>
            </g>
          ) : (
            <g>
              <rect x={0} y={140} width={140} height={50} fill="#f8fafc" stroke={SVG_COLORS.strokeLight} strokeWidth={1} rx={6} />
              <text x={70} y={162} fontSize="10" fill={SVG_COLORS.textLight} textAnchor="middle">
                Enter details above
              </text>
              <text x={70} y={178} fontSize="10" fill={SVG_COLORS.textLight} textAnchor="middle">
                to calculate AC size
              </text>
            </g>
          )}
        </g>
      </svg>
    </CalculatorSVG>
  );
}
