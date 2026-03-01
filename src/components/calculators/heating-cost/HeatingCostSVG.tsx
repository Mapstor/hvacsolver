'use client';

import CalculatorSVG, { SVG_COLORS } from '../CalculatorSVG';

interface HeatingCostSVGProps {
  fuelType?: string;
  btuRequired?: number;
  efficiency?: number;
  fuelPrice?: number;
  monthlyCost?: number;
  annualCost?: number;
  fuelUsage?: number;
  fuelUnit?: string;
}

/**
 * SVG visualization for Heating Cost Calculator
 * Shows fuel comparison and cost breakdown
 */
export default function HeatingCostSVG({
  fuelType = 'Natural Gas',
  btuRequired,
  efficiency,
  fuelPrice,
  monthlyCost,
  annualCost,
  fuelUsage,
  fuelUnit = 'therms',
}: HeatingCostSVGProps) {
  const hasResults = monthlyCost !== undefined;

  // Fuel type icons and colors
  const getFuelInfo = (fuel: string) => {
    const lower = fuel.toLowerCase();
    if (lower.includes('gas')) return { icon: '🔥', color: '#3b82f6', name: 'Natural Gas' };
    if (lower.includes('propane') || lower.includes('lp')) return { icon: '🛢️', color: '#8b5cf6', name: 'Propane' };
    if (lower.includes('oil') || lower.includes('fuel')) return { icon: '🛢️', color: '#78716c', name: 'Heating Oil' };
    if (lower.includes('electric')) return { icon: '⚡', color: '#f59e0b', name: 'Electric' };
    if (lower.includes('wood') || lower.includes('pellet')) return { icon: '🪵', color: '#92400e', name: 'Wood/Pellet' };
    return { icon: '🔥', color: SVG_COLORS.primary, name: fuel };
  };

  const fuelInfo = getFuelInfo(fuelType);

  // Efficiency color
  const getEfficiencyColor = () => {
    if (!efficiency) return SVG_COLORS.textLight;
    if (efficiency >= 95) return SVG_COLORS.good;
    if (efficiency >= 85) return SVG_COLORS.primary;
    if (efficiency >= 75) return SVG_COLORS.warning;
    return SVG_COLORS.danger;
  };

  return (
    <CalculatorSVG
      title="Heating Cost Analysis"
      description="Fuel consumption and operating costs"
      aspectRatio="wide"
    >
      <svg
        viewBox="0 0 400 200"
        className="w-full h-full"
        preserveAspectRatio="xMidYMid meet"
      >
        {/* Background */}
        <rect width="400" height="200" fill="#f8fafc" />

        {/* Fuel source visualization */}
        <g transform="translate(30, 25)">
          <text x={60} y={0} fontSize="10" fill={SVG_COLORS.text} fontWeight="bold" textAnchor="middle">
            {fuelInfo.name}
          </text>

          {/* Fuel tank/source icon */}
          <rect
            x={20}
            y={15}
            width={80}
            height={70}
            rx={8}
            fill={fuelInfo.color}
            opacity={0.2}
            stroke={fuelInfo.color}
            strokeWidth={2}
          />

          {/* Fuel icon */}
          <text x={60} y={55} fontSize="32" textAnchor="middle">
            {fuelInfo.icon}
          </text>

          {/* Fuel usage */}
          {hasResults && (
            <text x={60} y={75} fontSize="9" fill={fuelInfo.color} fontWeight="bold" textAnchor="middle">
              {fuelUsage?.toFixed(1) ?? '—'} {fuelUnit}/mo
            </text>
          )}

          {/* Energy flow arrow */}
          <path
            d="M105,50 L145,50"
            fill="none"
            stroke={SVG_COLORS.heat}
            strokeWidth={3}
            markerEnd="url(#heat-arrow)"
          />
          {hasResults && (
            <path
              d="M105,50 L145,50"
              fill="none"
              stroke={SVG_COLORS.heat}
              strokeWidth={3}
              strokeDasharray="6,4"
            >
              <animate
                attributeName="stroke-dashoffset"
                from="0"
                to="-20"
                dur="0.8s"
                repeatCount="indefinite"
              />
            </path>
          )}
        </g>

        {/* Furnace/boiler */}
        <g transform="translate(150, 25)">
          <rect
            x={0}
            y={15}
            width={55}
            height={70}
            rx={4}
            fill="#475569"
            stroke={SVG_COLORS.stroke}
            strokeWidth={2}
          />

          {/* Heat exchanger indicator */}
          <rect x={10} y={30} width={35} height={35} fill="#334155" rx={2} />
          {hasResults && (
            <g>
              {[0, 1, 2].map((i) => (
                <rect
                  key={i}
                  x={15}
                  y={35 + i * 10}
                  width={25}
                  height={6}
                  fill={SVG_COLORS.heat}
                  rx={1}
                  opacity={0.7}
                >
                  <animate
                    attributeName="opacity"
                    values="0.4;0.9;0.4"
                    dur={`${0.8 + i * 0.2}s`}
                    repeatCount="indefinite"
                  />
                </rect>
              ))}
            </g>
          )}

          {/* Efficiency badge */}
          <g transform="translate(5, 70)">
            <rect x={0} y={0} width={45} height={18} fill="white" stroke={getEfficiencyColor()} strokeWidth={1} rx={2} />
            <text x={22} y={13} fontSize="9" fill={getEfficiencyColor()} fontWeight="bold" textAnchor="middle">
              {efficiency ? `${efficiency}%` : '—%'}
            </text>
          </g>

          <text x={27} y={105} fontSize="8" fill={SVG_COLORS.textLight} textAnchor="middle">
            Efficiency
          </text>
        </g>

        {/* Heat output to home */}
        <g transform="translate(150, 25)">
          <path
            d="M60,50 L100,50"
            fill="none"
            stroke={SVG_COLORS.heat}
            strokeWidth={3}
          />

          {/* Simple house */}
          <g transform="translate(105, 25)">
            <polygon points="25,0 0,20 50,20" fill="#94a3b8" stroke={SVG_COLORS.stroke} strokeWidth={1.5} />
            <rect x={10} y={20} width={30} height={30} fill="#e2e8f0" stroke={SVG_COLORS.stroke} strokeWidth={1.5} />
            <rect x={20} y={32} width={10} height={18} fill="#64748b" />
          </g>

          {/* Heat waves in home */}
          {hasResults && (
            <g opacity={0.6}>
              <text x={130} y={30} fontSize="12">🔥</text>
            </g>
          )}
        </g>

        {/* BTU requirement */}
        <g transform="translate(30, 110)">
          <text x={0} y={0} fontSize="8" fill={SVG_COLORS.textLight}>
            Heat Needed
          </text>
          <text x={0} y={14} fontSize="11" fill={SVG_COLORS.primary} fontWeight="bold">
            {btuRequired ? `${(btuRequired / 1000).toFixed(0)}k BTU/hr` : '— BTU/hr'}
          </text>
        </g>

        {/* Cost breakdown panel */}
        <g transform="translate(230, 20)">
          <rect x={0} y={0} width={150} height={155} fill="white" stroke={SVG_COLORS.strokeLight} rx={6} />

          <text x={75} y={18} fontSize="11" fill={SVG_COLORS.text} fontWeight="bold" textAnchor="middle">
            Heating Costs
          </text>
          <line x1={10} y1={26} x2={140} y2={26} stroke={SVG_COLORS.strokeLight} />

          {/* Monthly cost */}
          <g transform="translate(10, 42)">
            <text x={0} y={0} fontSize="9" fill={SVG_COLORS.textLight}>Monthly</text>
            <text x={125} y={0} fontSize="16" fill={SVG_COLORS.accent} fontWeight="bold" textAnchor="end">
              ${monthlyCost?.toFixed(0) ?? '—'}
            </text>
          </g>

          {/* Annual cost */}
          <g transform="translate(10, 70)">
            <text x={0} y={0} fontSize="9" fill={SVG_COLORS.textLight}>Annual (Season)</text>
            <text x={125} y={0} fontSize="14" fill={SVG_COLORS.accent} fontWeight="bold" textAnchor="end">
              ${annualCost?.toFixed(0) ?? '—'}
            </text>
          </g>

          <line x1={10} y1={85} x2={140} y2={85} stroke={SVG_COLORS.strokeLight} />

          {/* Fuel price */}
          <g transform="translate(10, 100)">
            <text x={0} y={0} fontSize="8" fill={SVG_COLORS.textLight}>Fuel Price</text>
            <text x={125} y={0} fontSize="9" fill={SVG_COLORS.text} textAnchor="end">
              ${fuelPrice?.toFixed(2) ?? '—'}/{fuelUnit}
            </text>
          </g>

          {/* Monthly fuel usage */}
          <g transform="translate(10, 118)">
            <text x={0} y={0} fontSize="8" fill={SVG_COLORS.textLight}>Monthly Usage</text>
            <text x={125} y={0} fontSize="9" fill={SVG_COLORS.text} textAnchor="end">
              {fuelUsage?.toFixed(1) ?? '—'} {fuelUnit}
            </text>
          </g>

          {/* Efficiency */}
          <g transform="translate(10, 136)">
            <text x={0} y={0} fontSize="8" fill={SVG_COLORS.textLight}>System Efficiency</text>
            <text x={125} y={0} fontSize="9" fill={getEfficiencyColor()} fontWeight="bold" textAnchor="end">
              {efficiency ?? '—'}%
            </text>
          </g>
        </g>

        {/* Note */}
        <g transform="translate(30, 185)">
          <text x={0} y={0} fontSize="7" fill={SVG_COLORS.textLight}>
            Higher efficiency = lower fuel consumption for same heat output
          </text>
        </g>

        {/* Arrow marker */}
        <defs>
          <marker
            id="heat-arrow"
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
