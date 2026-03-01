'use client';

import CalculatorSVG, {
  ArrowMarkerDefs,
  HouseShape,
  SVG_COLORS,
} from '../CalculatorSVG';

interface HeatingBTUSVGProps {
  totalBTU?: number;
  climateZone?: string;
  breakdown?: {
    label: string;
    btu: number;
    percentage: number;
  }[];
  heatingType?: string;
}

/**
 * SVG visualization for Heating BTU Calculator
 * Shows house outline with heat loss arrows and climate zone indication
 * Source: ASHRAE heating load methodology visualization
 */
export default function HeatingBTUSVG({
  totalBTU,
  climateZone,
  breakdown,
  heatingType,
}: HeatingBTUSVGProps) {
  const hasResults = breakdown && breakdown.length > 0;

  // Get climate zone color based on severity
  const getClimateColor = () => {
    if (!climateZone) return '#94a3b8';
    const zone = climateZone.toLowerCase();
    if (zone.includes('cold') || zone.includes('very cold')) return '#3b82f6';
    if (zone.includes('cool')) return '#60a5fa';
    if (zone.includes('mixed')) return '#fbbf24';
    if (zone.includes('hot')) return '#ef4444';
    return '#94a3b8';
  };

  // Get percentages for arrow sizing
  const getPercentage = (label: string) => {
    if (!breakdown) return 15;
    const item = breakdown.find((b) => b.label.toLowerCase().includes(label.toLowerCase()));
    return item?.percentage || 10;
  };

  const wallsPercent = getPercentage('wall');
  const windowsPercent = getPercentage('window');
  const roofPercent = getPercentage('roof') || getPercentage('ceiling');
  const floorPercent = getPercentage('floor');
  const infiltrationPercent = getPercentage('infiltration');

  return (
    <CalculatorSVG
      title="Heat Loss Diagram"
      description="Arrows indicate heat escaping from your home in winter"
      aspectRatio="wide"
    >
      <svg
        viewBox="0 0 400 250"
        className="w-full h-full"
        preserveAspectRatio="xMidYMid meet"
      >
        <ArrowMarkerDefs />

        {/* Winter background with climate zone coloring */}
        <defs>
          <linearGradient id="winter-sky" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor={getClimateColor()} stopOpacity="0.3" />
            <stop offset="100%" stopColor={getClimateColor()} stopOpacity="0.1" />
          </linearGradient>
        </defs>
        <rect width="400" height="250" fill="url(#winter-sky)" />

        {/* Snowflakes for cold zones */}
        {climateZone?.toLowerCase().includes('cold') && (
          <g fill="#ffffff" opacity="0.8">
            <text x="30" y="40" fontSize="16">❄</text>
            <text x="80" y="70" fontSize="12">❄</text>
            <text x="320" y="35" fontSize="14">❄</text>
            <text x="360" y="60" fontSize="10">❄</text>
            <text x="50" y="100" fontSize="8">❄</text>
          </g>
        )}

        {/* Ground with snow/frost */}
        <rect y="190" width="400" height="60" fill="#e2e8f0" />
        <rect y="190" width="400" height="8" fill="#cbd5e1" />

        {/* House structure */}
        <HouseShape
          x={120}
          y={50}
          width={160}
          height={145}
          roofHeight={50}
          fill="#fef3c7"
          stroke={SVG_COLORS.stroke}
          strokeWidth={2}
        />

        {/* Windows */}
        <rect x={145} y={120} width={30} height={35} fill="#bfdbfe" stroke={SVG_COLORS.stroke} strokeWidth={1.5} />
        <line x1={160} y1={120} x2={160} y2={155} stroke={SVG_COLORS.stroke} strokeWidth={1} />
        <line x1={145} y1={137.5} x2={175} y2={137.5} stroke={SVG_COLORS.stroke} strokeWidth={1} />

        <rect x={225} y={120} width={30} height={35} fill="#bfdbfe" stroke={SVG_COLORS.stroke} strokeWidth={1.5} />
        <line x1={240} y1={120} x2={240} y2={155} stroke={SVG_COLORS.stroke} strokeWidth={1} />
        <line x1={225} y1={137.5} x2={255} y2={137.5} stroke={SVG_COLORS.stroke} strokeWidth={1} />

        {/* Door */}
        <rect x={185} y={140} width={30} height={50} fill="#92400e" stroke={SVG_COLORS.stroke} strokeWidth={1.5} />
        <circle cx={190} cy={165} r={3} fill="#fbbf24" />

        {/* Warm glow inside (representing heat) */}
        <defs>
          <radialGradient id="warm-glow" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#fbbf24" stopOpacity="0.4" />
            <stop offset="100%" stopColor="#fbbf24" stopOpacity="0" />
          </radialGradient>
        </defs>
        <ellipse cx={200} cy={145} rx={50} ry={40} fill="url(#warm-glow)" />

        {/* Heat Loss Arrows (red, going outward) */}

        {/* Roof/Ceiling heat loss */}
        <g className={hasResults ? 'opacity-100' : 'opacity-60'}>
          <path
            d="M200,48 L200,25"
            fill="none"
            stroke={SVG_COLORS.heat}
            strokeWidth={Math.max(2, roofPercent / 5)}
            markerEnd="url(#arrow-heat)"
          />
          <path
            d="M170,62 L155,42"
            fill="none"
            stroke={SVG_COLORS.heat}
            strokeWidth={Math.max(1.5, roofPercent / 6)}
            markerEnd="url(#arrow-heat)"
          />
          <path
            d="M230,62 L245,42"
            fill="none"
            stroke={SVG_COLORS.heat}
            strokeWidth={Math.max(1.5, roofPercent / 6)}
            markerEnd="url(#arrow-heat)"
          />
          <text x={200} y={18} fontSize="9" fill={SVG_COLORS.heat} fontWeight="bold" textAnchor="middle">
            Roof/Ceiling
          </text>
          {hasResults && (
            <text x={260} y={45} fontSize="8" fill={SVG_COLORS.text}>
              {roofPercent}%
            </text>
          )}
        </g>

        {/* Wall heat loss (left) */}
        <g className={hasResults ? 'opacity-100' : 'opacity-60'}>
          <path
            d="M118,130 L90,130"
            fill="none"
            stroke={SVG_COLORS.heat}
            strokeWidth={Math.max(2, wallsPercent / 5)}
            markerEnd="url(#arrow-heat)"
          />
          <path
            d="M118,160 L90,160"
            fill="none"
            stroke={SVG_COLORS.heat}
            strokeWidth={Math.max(2, wallsPercent / 5)}
            markerEnd="url(#arrow-heat)"
          />
          <text x={70} y={145} fontSize="9" fill={SVG_COLORS.heat} fontWeight="bold" textAnchor="middle">
            Walls
          </text>
          {hasResults && (
            <text x={70} y={175} fontSize="8" fill={SVG_COLORS.text} textAnchor="middle">
              {wallsPercent}%
            </text>
          )}
        </g>

        {/* Wall heat loss (right) */}
        <g className={hasResults ? 'opacity-100' : 'opacity-60'}>
          <path
            d="M282,130 L310,130"
            fill="none"
            stroke={SVG_COLORS.heat}
            strokeWidth={Math.max(2, wallsPercent / 5)}
            markerEnd="url(#arrow-heat)"
          />
          <path
            d="M282,160 L310,160"
            fill="none"
            stroke={SVG_COLORS.heat}
            strokeWidth={Math.max(2, wallsPercent / 5)}
            markerEnd="url(#arrow-heat)"
          />
          <text x={330} y={145} fontSize="9" fill={SVG_COLORS.heat} fontWeight="bold" textAnchor="middle">
            Walls
          </text>
        </g>

        {/* Window heat loss */}
        <g className={hasResults ? 'opacity-100' : 'opacity-60'}>
          <path
            d="M160,118 L160,105"
            fill="none"
            stroke="#f97316"
            strokeWidth={Math.max(1.5, windowsPercent / 6)}
            strokeDasharray="4,2"
            markerEnd="url(#arrow-heat)"
          />
          <path
            d="M240,118 L240,105"
            fill="none"
            stroke="#f97316"
            strokeWidth={Math.max(1.5, windowsPercent / 6)}
            strokeDasharray="4,2"
            markerEnd="url(#arrow-heat)"
          />
          <text x={160} y={98} fontSize="8" fill="#f97316" textAnchor="middle">
            Windows {hasResults ? `${windowsPercent}%` : ''}
          </text>
        </g>

        {/* Floor/Foundation heat loss */}
        <g className={hasResults ? 'opacity-100' : 'opacity-60'}>
          <path
            d="M170,195 L170,215"
            fill="none"
            stroke={SVG_COLORS.heat}
            strokeWidth={Math.max(1.5, floorPercent / 6)}
            markerEnd="url(#arrow-heat)"
          />
          <path
            d="M230,195 L230,215"
            fill="none"
            stroke={SVG_COLORS.heat}
            strokeWidth={Math.max(1.5, floorPercent / 6)}
            markerEnd="url(#arrow-heat)"
          />
          <text x={200} y={230} fontSize="8" fill={SVG_COLORS.heat} textAnchor="middle">
            Foundation {hasResults ? `${floorPercent}%` : ''}
          </text>
        </g>

        {/* Infiltration */}
        <g className={hasResults ? 'opacity-100' : 'opacity-60'}>
          <path
            d="M218,142 Q225,140 230,145"
            fill="none"
            stroke={SVG_COLORS.warning}
            strokeWidth={2}
            strokeDasharray="3,2"
          />
          <text x={240} y={98} fontSize="8" fill={SVG_COLORS.warning}>
            Air Leaks {hasResults ? `${infiltrationPercent}%` : ''}
          </text>
        </g>

        {/* Furnace/Heating unit */}
        <g>
          <rect x={30} y={150} width={45} height={55} fill="#fef3c7" stroke={SVG_COLORS.stroke} strokeWidth={1.5} rx={3} />
          <rect x={40} y={157} width={25} height={8} fill="#f59e0b" rx={2} />
          <rect x={40} y={170} width={25} height={8} fill="#f59e0b" rx={2} />
          <rect x={40} y={183} width={25} height={8} fill="#f59e0b" rx={2} />
          <text x={52.5} y={220} fontSize="8" fill={SVG_COLORS.text} textAnchor="middle">
            {heatingType || 'Furnace'}
          </text>
        </g>

        {/* Heat supply arrows */}
        <path
          d="M75,175 Q90,175 100,165 L115,150"
          fill="none"
          stroke="#f59e0b"
          strokeWidth={3}
          markerEnd="url(#arrow-accent)"
        />

        {/* Climate zone indicator */}
        <g>
          <rect x={295} y={10} width={95} height={45} fill="rgba(255,255,255,0.9)" rx={4} stroke={getClimateColor()} strokeWidth={2} />
          <text x={342.5} y={28} fontSize="9" fill={SVG_COLORS.text} fontWeight="bold" textAnchor="middle">
            Climate Zone
          </text>
          <text x={342.5} y={45} fontSize="10" fill={getClimateColor()} fontWeight="bold" textAnchor="middle">
            {climateZone || 'Select Zone'}
          </text>
        </g>

        {/* Results summary */}
        {hasResults && totalBTU && (
          <g>
            <rect x={10} y={10} width={100} height={45} fill="white" stroke={SVG_COLORS.stroke} strokeWidth={1} rx={4} />
            <text x={60} y={28} fontSize="9" fill={SVG_COLORS.textLight} textAnchor="middle">
              Required Heat
            </text>
            <text x={60} y={45} fontSize="12" fill={SVG_COLORS.text} fontWeight="bold" textAnchor="middle">
              {(totalBTU / 1000).toFixed(0)}k BTU/hr
            </text>
          </g>
        )}

        {/* Legend */}
        <g>
          <rect x={10} y={65} width={85} height={25} fill="rgba(255,255,255,0.9)" rx={4} />
          <line x1={18} y1={78} x2={38} y2={78} stroke={SVG_COLORS.heat} strokeWidth={2} markerEnd="url(#arrow-heat)" />
          <text x={45} y={82} fontSize="8" fill={SVG_COLORS.text}>Heat Loss</text>
        </g>
      </svg>
    </CalculatorSVG>
  );
}
