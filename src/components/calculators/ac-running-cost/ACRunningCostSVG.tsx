'use client';

import CalculatorSVG, { SVG_COLORS } from '../CalculatorSVG';

interface ACRunningCostSVGProps {
  btuCapacity?: number;
  seerRating?: number;
  hoursPerDay?: number;
  electricityRate?: number;
  dailyCost?: number;
  monthlyCost?: number;
  seasonalCost?: number;
  acType?: 'central' | 'window' | 'portable' | 'minisplit';
}

/**
 * SVG visualization for AC Running Cost Calculator
 * Shows air conditioner with efficiency and cost display
 */
export default function ACRunningCostSVG({
  btuCapacity,
  seerRating,
  hoursPerDay,
  electricityRate,
  dailyCost,
  monthlyCost,
  seasonalCost,
  acType = 'central',
}: ACRunningCostSVGProps) {
  const hasResults = dailyCost !== undefined;

  // Determine if this is SEER or EER based on AC type
  const usesEER = acType === 'window' || acType === 'portable';
  const efficiencyLabel = usesEER ? 'EER' : 'SEER';

  // Efficiency color coding - different thresholds for SEER vs EER
  const getEfficiencyColor = () => {
    if (!seerRating) return SVG_COLORS.textLight;
    if (usesEER) {
      // EER thresholds (lower scale than SEER)
      if (seerRating >= 12) return SVG_COLORS.good;
      if (seerRating >= 10) return SVG_COLORS.primary;
      if (seerRating >= 9) return SVG_COLORS.warning;
      return SVG_COLORS.danger;
    } else {
      // SEER thresholds
      if (seerRating >= 20) return SVG_COLORS.good;
      if (seerRating >= 16) return SVG_COLORS.primary;
      if (seerRating >= 14) return SVG_COLORS.warning;
      return SVG_COLORS.danger;
    }
  };

  const getEfficiencyRatingText = () => {
    if (!seerRating) return '';
    if (usesEER) {
      // EER rating labels
      if (seerRating >= 12) return 'Excellent';
      if (seerRating >= 10) return 'Very Good';
      if (seerRating >= 9) return 'Good';
      return 'Standard';
    } else {
      // SEER rating labels
      if (seerRating >= 20) return 'Excellent';
      if (seerRating >= 16) return 'Very Good';
      if (seerRating >= 14) return 'Good';
      return 'Standard';
    }
  };

  // Calculate wattage for visualization
  const wattage = btuCapacity && seerRating ? btuCapacity / seerRating : undefined;

  return (
    <CalculatorSVG
      title="AC Operating Cost"
      description="Energy consumption and seasonal cooling costs"
      aspectRatio="wide"
    >
      <svg
        viewBox="0 0 400 200"
        className="w-full h-full"
        preserveAspectRatio="xMidYMid meet"
      >
        {/* Background */}
        <rect width="400" height="200" fill="#f8fafc" />

        {/* AC Unit illustration */}
        <g transform="translate(25, 25)">
          {/* Outdoor condenser unit */}
          <rect
            x={0}
            y={40}
            width={70}
            height={90}
            rx={4}
            fill="#64748b"
            stroke={SVG_COLORS.stroke}
            strokeWidth={2}
          />

          {/* Fan grille */}
          <circle cx={35} cy={75} r={25} fill="#475569" stroke={SVG_COLORS.stroke} strokeWidth={1.5} />
          <circle cx={35} cy={75} r={20} fill="#334155" />

          {/* Fan blades */}
          {[0, 1, 2, 3].map((i) => (
            <line
              key={i}
              x1={35}
              y1={75}
              x2={35 + Math.cos((i * Math.PI) / 2) * 18}
              y2={75 + Math.sin((i * Math.PI) / 2) * 18}
              stroke="#94a3b8"
              strokeWidth={4}
              strokeLinecap="round"
            >
              {hasResults && (
                <animateTransform
                  attributeName="transform"
                  type="rotate"
                  from="0 35 75"
                  to="360 35 75"
                  dur="1s"
                  repeatCount="indefinite"
                />
              )}
            </line>
          ))}

          {/* Refrigerant lines */}
          <path
            d="M70,60 L85,60 L85,30 L130,30"
            fill="none"
            stroke={SVG_COLORS.cold}
            strokeWidth={3}
          />
          <path
            d="M70,90 L90,90 L90,50 L130,50"
            fill="none"
            stroke={SVG_COLORS.heat}
            strokeWidth={3}
          />

          {/* Indoor unit (simplified) */}
          <rect
            x={130}
            y={15}
            width={55}
            height={55}
            rx={4}
            fill="#94a3b8"
            stroke={SVG_COLORS.stroke}
            strokeWidth={2}
          />
          <rect x={135} y={50} width={45} height={15} fill="#64748b" rx={2} />

          {/* Cold air flow */}
          {hasResults && (
            <g>
              {[0, 1, 2].map((i) => (
                <path
                  key={i}
                  d={`M${145 + i * 12},70 L${145 + i * 12},95`}
                  fill="none"
                  stroke={SVG_COLORS.cold}
                  strokeWidth={2}
                  strokeDasharray="4,4"
                  opacity={0.6}
                >
                  <animate
                    attributeName="stroke-dashoffset"
                    from="0"
                    to="-16"
                    dur="0.8s"
                    repeatCount="indefinite"
                  />
                </path>
              ))}
              <text x={157} y={110} fontSize="16" textAnchor="middle">❄️</text>
            </g>
          )}

          {/* BTU/SEER labels */}
          <text x={35} y={145} fontSize="9" fill={SVG_COLORS.text} textAnchor="middle">
            {btuCapacity ? `${(btuCapacity / 1000).toFixed(0)}k BTU` : '— BTU'}
          </text>
        </g>

        {/* Efficiency rating indicator */}
        <g transform="translate(110, 130)">
          <rect x={0} y={0} width={80} height={45} fill="white" stroke={getEfficiencyColor()} strokeWidth={2} rx={4} />
          <text x={40} y={15} fontSize="8" fill={SVG_COLORS.textLight} textAnchor="middle">
            {efficiencyLabel} Rating
          </text>
          <text x={40} y={32} fontSize="14" fill={getEfficiencyColor()} fontWeight="bold" textAnchor="middle">
            {seerRating ?? '—'}
          </text>
          <text x={40} y={42} fontSize="7" fill={getEfficiencyColor()} textAnchor="middle">
            {getEfficiencyRatingText()}
          </text>
        </g>

        {/* Cost breakdown panel */}
        <g transform="translate(210, 15)">
          <rect x={0} y={0} width={170} height={165} fill="white" stroke={SVG_COLORS.strokeLight} rx={6} />

          <text x={85} y={18} fontSize="11" fill={SVG_COLORS.text} fontWeight="bold" textAnchor="middle">
            Cooling Costs
          </text>
          <line x1={10} y1={26} x2={160} y2={26} stroke={SVG_COLORS.strokeLight} />

          {/* Daily */}
          <g transform="translate(10, 40)">
            <text x={0} y={0} fontSize="9" fill={SVG_COLORS.textLight}>Daily ({hoursPerDay ?? '—'} hrs)</text>
            <text x={145} y={0} fontSize="12" fill={SVG_COLORS.primary} fontWeight="bold" textAnchor="end">
              ${dailyCost?.toFixed(2) ?? '—'}
            </text>
          </g>

          {/* Monthly */}
          <g transform="translate(10, 65)">
            <text x={0} y={0} fontSize="9" fill={SVG_COLORS.textLight}>Monthly (30 days)</text>
            <text x={145} y={0} fontSize="14" fill={SVG_COLORS.accent} fontWeight="bold" textAnchor="end">
              ${monthlyCost?.toFixed(2) ?? '—'}
            </text>
          </g>

          {/* Seasonal */}
          <g transform="translate(10, 90)">
            <text x={0} y={0} fontSize="9" fill={SVG_COLORS.textLight}>Cooling Season (4 mo)</text>
            <text x={145} y={0} fontSize="12" fill={SVG_COLORS.accent} fontWeight="bold" textAnchor="end">
              ${seasonalCost?.toFixed(2) ?? '—'}
            </text>
          </g>

          {/* Divider */}
          <line x1={10} y1={105} x2={160} y2={105} stroke={SVG_COLORS.strokeLight} />

          {/* Power consumption */}
          <g transform="translate(10, 120)">
            <text x={0} y={0} fontSize="8" fill={SVG_COLORS.textLight}>Power Draw</text>
            <text x={145} y={0} fontSize="10" fill={SVG_COLORS.text} textAnchor="end">
              {wattage ? `${wattage.toFixed(0)} W` : '— W'}
            </text>
          </g>

          {/* kWh per day */}
          <g transform="translate(10, 138)">
            <text x={0} y={0} fontSize="8" fill={SVG_COLORS.textLight}>Daily Energy</text>
            <text x={145} y={0} fontSize="10" fill={SVG_COLORS.text} textAnchor="end">
              {wattage && hoursPerDay ? `${((wattage * hoursPerDay) / 1000).toFixed(1)} kWh` : '— kWh'}
            </text>
          </g>

          {/* Electricity rate */}
          <g transform="translate(10, 155)">
            <text x={0} y={0} fontSize="8" fill={SVG_COLORS.textLight}>Rate</text>
            <text x={145} y={0} fontSize="10" fill={SVG_COLORS.text} textAnchor="end">
              {electricityRate ? `$${electricityRate}/kWh` : '$—/kWh'}
            </text>
          </g>
        </g>

        {/* Formula */}
        <g transform="translate(25, 185)">
          <text x={0} y={0} fontSize="8" fill={SVG_COLORS.textLight}>
            Cost = (BTU ÷ {efficiencyLabel} ÷ 1000) × Hours × $/kWh
          </text>
        </g>
      </svg>
    </CalculatorSVG>
  );
}
