'use client';

import CalculatorSVG, { SVG_COLORS } from '../CalculatorSVG';

interface HeatPumpSizingSVGProps {
  heatingBTU?: number;
  coolingBTU?: number;
  recommendedTons?: number;
  balancePointTemp?: number;
  supplementalBTU?: number;
  homeSqFt?: number;
  climateZone?: number;
}

/**
 * SVG visualization for Heat Pump Sizing Calculator
 * Shows dual-mode heating/cooling capacity with balance point
 */
export default function HeatPumpSizingSVG({
  heatingBTU,
  coolingBTU,
  recommendedTons,
  balancePointTemp,
  supplementalBTU,
  homeSqFt,
  climateZone,
}: HeatPumpSizingSVGProps) {
  const hasResults = heatingBTU !== undefined || coolingBTU !== undefined;

  // Balance point on temperature scale
  const minTemp = 0;
  const maxTemp = 100;
  const tempToX = (temp: number) => 30 + ((temp - minTemp) / (maxTemp - minTemp)) * 180;
  const balanceX = balancePointTemp ? tempToX(balancePointTemp) : tempToX(35);

  // Capacity bar heights
  const maxBTU = 80000;
  const heatingHeight = heatingBTU ? Math.min((heatingBTU / maxBTU) * 80, 80) : 40;
  const coolingHeight = coolingBTU ? Math.min((coolingBTU / maxBTU) * 80, 80) : 40;

  return (
    <CalculatorSVG
      title="Heat Pump Capacity"
      description="Dual-mode heating and cooling sizing"
      aspectRatio="wide"
    >
      <svg
        viewBox="0 0 400 220"
        className="w-full h-full"
        preserveAspectRatio="xMidYMid meet"
      >
        {/* Background */}
        <rect width="400" height="220" fill="#f8fafc" />

        {/* Temperature scale with balance point */}
        <g transform="translate(0, 140)">
          {/* Scale line */}
          <line x1={30} y1={0} x2={210} y2={0} stroke={SVG_COLORS.stroke} strokeWidth={2} />

          {/* Temperature gradient background */}
          <defs>
            <linearGradient id="temp-gradient" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor={SVG_COLORS.cold} />
              <stop offset="35%" stopColor={SVG_COLORS.cold} stopOpacity={0.3} />
              <stop offset="65%" stopColor={SVG_COLORS.heat} stopOpacity={0.3} />
              <stop offset="100%" stopColor={SVG_COLORS.heat} />
            </linearGradient>
          </defs>
          <rect x={30} y={-5} width={180} height={10} fill="url(#temp-gradient)" opacity={0.5} />

          {/* Temperature markers */}
          {[0, 20, 40, 60, 80, 100].map((temp) => {
            const x = tempToX(temp);
            return (
              <g key={temp}>
                <line x1={x} y1={-8} x2={x} y2={8} stroke={SVG_COLORS.stroke} strokeWidth={1} />
                <text x={x} y={20} fontSize="8" fill={SVG_COLORS.textLight} textAnchor="middle">
                  {temp}°F
                </text>
              </g>
            );
          })}

          {/* Balance point marker */}
          {hasResults && (
            <g>
              <polygon
                points={`${balanceX - 6},15 ${balanceX + 6},15 ${balanceX},5`}
                fill={SVG_COLORS.accent}
              />
              <text x={balanceX} y={38} fontSize="8" fill={SVG_COLORS.accent} fontWeight="bold" textAnchor="middle">
                Balance
              </text>
              <text x={balanceX} y={50} fontSize="7" fill={SVG_COLORS.accent} textAnchor="middle">
                {balancePointTemp ?? 35}°F
              </text>
            </g>
          )}

          {/* Mode labels */}
          <text x={50} y={-15} fontSize="9" fill={SVG_COLORS.cold} fontWeight="bold">
            Heating Mode
          </text>
          <text x={175} y={-15} fontSize="9" fill={SVG_COLORS.heat} fontWeight="bold" textAnchor="end">
            Cooling Mode
          </text>
        </g>

        {/* Heat pump unit */}
        <g transform="translate(85, 55)">
          {/* Unit body */}
          <rect
            x={0}
            y={0}
            width={70}
            height={60}
            rx={6}
            fill="#475569"
            stroke={SVG_COLORS.stroke}
            strokeWidth={2}
          />

          {/* Reversing valve indicator */}
          <circle cx={35} cy={30} r={15} fill="#334155" stroke={SVG_COLORS.stroke} strokeWidth={1} />
          <text x={35} y={35} fontSize="12" textAnchor="middle">↔️</text>

          {/* Mode indicator */}
          <text x={35} y={55} fontSize="7" fill="white" textAnchor="middle">
            Reversible
          </text>

          {/* Heating output arrow (left) */}
          {hasResults && (
            <g>
              <path
                d="M-5,30 L-30,30"
                fill="none"
                stroke={SVG_COLORS.heat}
                strokeWidth={3}
                markerEnd="url(#heat-arrow)"
              />
              <text x={-45} y={20} fontSize="7" fill={SVG_COLORS.heat}>Heat</text>
            </g>
          )}

          {/* Cooling output arrow (right) */}
          {hasResults && (
            <g>
              <path
                d="M75,30 L100,30"
                fill="none"
                stroke={SVG_COLORS.cold}
                strokeWidth={3}
                markerEnd="url(#cool-arrow)"
              />
              <text x={105} y={20} fontSize="7" fill={SVG_COLORS.cold}>Cool</text>
            </g>
          )}
        </g>

        {/* Capacity bars */}
        <g transform="translate(230, 25)">
          <text x={70} y={0} fontSize="10" fill={SVG_COLORS.text} fontWeight="bold" textAnchor="middle">
            Capacity
          </text>

          {/* Heating capacity */}
          <g transform="translate(0, 15)">
            <rect x={0} y={95 - heatingHeight} width={50} height={heatingHeight} fill={SVG_COLORS.heat} rx={4} />
            <text x={25} y={75 - heatingHeight} fontSize="10" fill={SVG_COLORS.heat} fontWeight="bold" textAnchor="middle">
              {heatingBTU ? `${(heatingBTU / 1000).toFixed(0)}k` : '—'}
            </text>
            <text x={25} y={110} fontSize="8" fill={SVG_COLORS.text} textAnchor="middle">Heating</text>
            <text x={25} y={120} fontSize="7" fill={SVG_COLORS.textLight} textAnchor="middle">BTU</text>
          </g>

          {/* Cooling capacity */}
          <g transform="translate(70, 15)">
            <rect x={0} y={95 - coolingHeight} width={50} height={coolingHeight} fill={SVG_COLORS.cold} rx={4} />
            <text x={25} y={75 - coolingHeight} fontSize="10" fill={SVG_COLORS.cold} fontWeight="bold" textAnchor="middle">
              {coolingBTU ? `${(coolingBTU / 1000).toFixed(0)}k` : '—'}
            </text>
            <text x={25} y={110} fontSize="8" fill={SVG_COLORS.text} textAnchor="middle">Cooling</text>
            <text x={25} y={120} fontSize="7" fill={SVG_COLORS.textLight} textAnchor="middle">BTU</text>
          </g>

          {/* Tonnage label */}
          <g transform="translate(35, 130)">
            <rect x={0} y={0} width={70} height={22} fill={SVG_COLORS.accent} rx={4} />
            <text x={35} y={15} fontSize="11" fill="white" fontWeight="bold" textAnchor="middle">
              {recommendedTons ? `${recommendedTons} Ton` : '— Ton'}
            </text>
          </g>
        </g>

        {/* Supplemental heat indicator */}
        {supplementalBTU && supplementalBTU > 0 && (
          <g transform="translate(30, 55)">
            <rect x={0} y={0} width={45} height={30} fill="#fef3c7" stroke={SVG_COLORS.warning} strokeWidth={1} rx={3} />
            <text x={22} y={12} fontSize="7" fill={SVG_COLORS.warning} fontWeight="bold" textAnchor="middle">
              Aux Heat
            </text>
            <text x={22} y={24} fontSize="8" fill={SVG_COLORS.warning} textAnchor="middle">
              {(supplementalBTU / 1000).toFixed(0)}k
            </text>
          </g>
        )}

        {/* Home info */}
        <g transform="translate(30, 15)">
          <text x={0} y={0} fontSize="8" fill={SVG_COLORS.textLight}>
            {homeSqFt ? `${homeSqFt.toLocaleString()} sq ft` : ''}{climateZone ? ` | Zone ${climateZone}` : ''}
          </text>
        </g>

        {/* Balance point explanation */}
        <g transform="translate(30, 200)">
          <text x={0} y={0} fontSize="7" fill={SVG_COLORS.textLight}>
            Balance point: Outdoor temp where heat pump alone meets demand. Below this, aux heat needed.
          </text>
        </g>

        {/* Arrow markers */}
        <defs>
          <marker
            id="heat-arrow"
            markerWidth="6"
            markerHeight="6"
            refX="0"
            refY="3"
            orient="auto"
          >
            <path d="M6,0 L6,6 L0,3 z" fill={SVG_COLORS.heat} />
          </marker>
          <marker
            id="cool-arrow"
            markerWidth="6"
            markerHeight="6"
            refX="5"
            refY="3"
            orient="auto"
          >
            <path d="M0,0 L0,6 L6,3 z" fill={SVG_COLORS.cold} />
          </marker>
        </defs>
      </svg>
    </CalculatorSVG>
  );
}
