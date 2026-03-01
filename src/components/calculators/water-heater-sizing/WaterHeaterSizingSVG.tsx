'use client';

import CalculatorSVG, {
  TemperatureGradientDefs,
  SVG_COLORS,
} from '../CalculatorSVG';

interface WaterHeaterSizingSVGProps {
  tankSize?: number;
  firstHourRating?: number;
  recoveryRate?: number;
  peakDemand?: number;
  heaterType?: 'tank' | 'tankless' | 'heat-pump';
}

/**
 * SVG visualization for Water Heater Sizing Calculator
 * Shows tank diagram with temperature layers and capacity indicators
 * Source: DOE First Hour Rating methodology visualization
 */
export default function WaterHeaterSizingSVG({
  tankSize,
  firstHourRating,
  recoveryRate,
  peakDemand,
  heaterType = 'tank',
}: WaterHeaterSizingSVGProps) {
  const hasResults = tankSize !== undefined || firstHourRating !== undefined;

  // Calculate water level for usage visualization
  const usagePercent = peakDemand && firstHourRating
    ? Math.min((peakDemand / firstHourRating) * 100, 100)
    : 50;

  return (
    <CalculatorSVG
      title={heaterType === 'tankless' ? 'Tankless Water Heater' : 'Tank Water Heater'}
      description="Temperature layers and capacity visualization"
      aspectRatio="wide"
    >
      <svg
        viewBox="0 0 400 230"
        className="w-full h-full"
        preserveAspectRatio="xMidYMid meet"
      >
        <TemperatureGradientDefs />

        {/* Background */}
        <rect width="400" height="230" fill="#f8fafc" />

        {heaterType === 'tank' ? (
          <>
            {/* Tank body */}
            <g transform="translate(80, 20)">
              {/* Outer tank shell */}
              <rect
                x={0}
                y={20}
                width={120}
                height={170}
                rx={10}
                fill="#e2e8f0"
                stroke={SVG_COLORS.stroke}
                strokeWidth={2}
              />

              {/* Inner tank (water) */}
              <rect
                x={8}
                y={28}
                width={104}
                height={154}
                rx={6}
                fill="url(#temp-cold-hot)"
              />

              {/* Temperature layers labels */}
              <text x={130} y={50} fontSize="9" fill={SVG_COLORS.heat}>Hot (120-140°F)</text>
              <text x={130} y={105} fontSize="9" fill="#fbbf24">Warm Zone</text>
              <text x={130} y={165} fontSize="9" fill={SVG_COLORS.cold}>Cold Inlet</text>

              {/* Tank top with fittings */}
              <rect x={-5} y={10} width={130} height={15} rx={5} fill="#cbd5e1" stroke={SVG_COLORS.stroke} strokeWidth={1.5} />

              {/* Hot water outlet */}
              <rect x={30} y={0} width={15} height={15} fill="#94a3b8" stroke={SVG_COLORS.stroke} strokeWidth={1} />
              <text x={37.5} y={-5} fontSize="7" fill={SVG_COLORS.heat} textAnchor="middle">HOT</text>

              {/* Anode rod */}
              <rect x={70} y={0} width={8} height={15} fill="#71717a" stroke={SVG_COLORS.stroke} strokeWidth={1} />

              {/* Cold water inlet */}
              <rect x={-25} y={50} width={30} height={12} fill="#94a3b8" stroke={SVG_COLORS.stroke} strokeWidth={1} />
              <text x={-10} y={73} fontSize="7" fill={SVG_COLORS.cold} textAnchor="middle">COLD IN</text>

              {/* Dip tube (extends cold water to bottom) */}
              <rect x={-17} y={56} width={25} height={4} fill="#64748b" />
              <rect x={3} y={56} width={4} height={110} fill="#64748b" />

              {/* Hot water outlet pipe */}
              <rect x={30} y={28} width={4} height={25} fill={SVG_COLORS.heat} opacity={0.7} />

              {/* Heating element indicators */}
              <circle cx={100} cy={60} r={8} fill={SVG_COLORS.heat} opacity={0.8} />
              <circle cx={100} cy={140} r={8} fill={SVG_COLORS.heat} opacity={0.6} />
              <text x={100} y={62} fontSize="8" fill="white" textAnchor="middle" dominantBaseline="middle">⚡</text>
              <text x={100} y={142} fontSize="8" fill="white" textAnchor="middle" dominantBaseline="middle">⚡</text>

              {/* T&P relief valve */}
              <rect x={122} y={45} width={20} height={10} fill="#fbbf24" stroke={SVG_COLORS.stroke} strokeWidth={1} rx={2} />
              <text x={132} y={68} fontSize="6" fill={SVG_COLORS.textLight} textAnchor="middle">T&P</text>

              {/* Drain valve */}
              <circle cx={60} cy={195} r={6} fill="#94a3b8" stroke={SVG_COLORS.stroke} strokeWidth={1} />
              <text x={60} y={210} fontSize="7" fill={SVG_COLORS.textLight} textAnchor="middle">Drain</text>

              {/* Capacity label */}
              {tankSize && (
                <g>
                  <rect x={20} y={90} width={80} height={30} fill="rgba(255,255,255,0.9)" rx={4} />
                  <text x={60} y={105} fontSize="10" fill={SVG_COLORS.text} fontWeight="bold" textAnchor="middle">
                    {tankSize} Gallons
                  </text>
                  <text x={60} y={116} fontSize="8" fill={SVG_COLORS.textLight} textAnchor="middle">
                    Tank Capacity
                  </text>
                </g>
              )}
            </g>

            {/* Demand vs Capacity indicator */}
            <g transform="translate(260, 30)">
              <text x={55} y={0} fontSize="10" fill={SVG_COLORS.text} fontWeight="bold" textAnchor="middle">
                Peak Hour Capacity
              </text>

              {/* Capacity bar background */}
              <rect x={20} y={15} width={70} height={150} fill="#e2e8f0" stroke={SVG_COLORS.strokeLight} rx={4} />

              {/* Available capacity */}
              <rect
                x={22}
                y={17 + (148 * (100 - usagePercent)) / 100}
                width={66}
                height={(148 * usagePercent) / 100}
                fill={usagePercent > 90 ? SVG_COLORS.danger : usagePercent > 70 ? SVG_COLORS.warning : SVG_COLORS.cold}
                rx={3}
              />

              {/* Demand line */}
              {peakDemand && firstHourRating && (
                <line
                  x1={15}
                  y1={17 + (148 * (100 - usagePercent)) / 100}
                  x2={95}
                  y2={17 + (148 * (100 - usagePercent)) / 100}
                  stroke={SVG_COLORS.accent}
                  strokeWidth={2}
                  strokeDasharray="5,3"
                />
              )}

              {/* Scale labels */}
              <text x={100} y={25} fontSize="8" fill={SVG_COLORS.textLight}>100%</text>
              <text x={100} y={90} fontSize="8" fill={SVG_COLORS.textLight}>50%</text>
              <text x={100} y={165} fontSize="8" fill={SVG_COLORS.textLight}>0%</text>

              {/* Legend */}
              <g transform="translate(0, 175)">
                {firstHourRating && (
                  <text x={55} y={10} fontSize="9" fill={SVG_COLORS.primary} textAnchor="middle">
                    FHR: {firstHourRating} gal
                  </text>
                )}
                {peakDemand && (
                  <text x={55} y={25} fontSize="9" fill={SVG_COLORS.accent} textAnchor="middle">
                    Demand: {peakDemand} gal
                  </text>
                )}
              </g>
            </g>
          </>
        ) : heaterType === 'tankless' ? (
          <>
            {/* Tankless unit */}
            <g transform="translate(100, 30)">
              {/* Unit body */}
              <rect x={0} y={0} width={100} height={140} rx={8} fill="#e2e8f0" stroke={SVG_COLORS.stroke} strokeWidth={2} />

              {/* Display screen */}
              <rect x={15} y={20} width={70} height={40} rx={4} fill="#1e293b" />
              <text x={50} y={45} fontSize="14" fill="#22c55e" fontFamily="monospace" textAnchor="middle">
                {peakDemand ? `${peakDemand}°F` : '120°F'}
              </text>

              {/* Heat exchanger representation */}
              <path
                d="M25,80 Q35,90 25,100 Q15,110 25,120 M50,80 Q60,90 50,100 Q40,110 50,120 M75,80 Q85,90 75,100 Q65,110 75,120"
                fill="none"
                stroke={SVG_COLORS.heat}
                strokeWidth={3}
                opacity={0.7}
              />

              {/* Cold inlet */}
              <rect x={-30} y={70} width={35} height={15} fill="#94a3b8" stroke={SVG_COLORS.stroke} strokeWidth={1} rx={2} />
              <text x={-12} y={100} fontSize="7" fill={SVG_COLORS.cold} textAnchor="middle">COLD</text>

              {/* Hot outlet */}
              <rect x={95} y={70} width={35} height={15} fill="#94a3b8" stroke={SVG_COLORS.stroke} strokeWidth={1} rx={2} />
              <text x={112} y={100} fontSize="7" fill={SVG_COLORS.heat} textAnchor="middle">HOT</text>

              {/* Gas/Electric indicator */}
              <rect x={30} y={145} width={40} height={20} fill="#fbbf24" stroke={SVG_COLORS.stroke} rx={3} />
              <text x={50} y={158} fontSize="8" fill={SVG_COLORS.text} textAnchor="middle">⚡ POWER</text>
            </g>

            {/* Flow rate indicator */}
            <g transform="translate(260, 50)">
              <text x={50} y={0} fontSize="10" fill={SVG_COLORS.text} fontWeight="bold" textAnchor="middle">
                Flow Rate
              </text>

              {/* Flow meter visual */}
              <circle cx={50} cy={60} r={40} fill="#e2e8f0" stroke={SVG_COLORS.strokeLight} strokeWidth={2} />
              <circle cx={50} cy={60} r={35} fill="#f8fafc" />

              {/* Flow indicator */}
              <path
                d="M50,60 L50,30"
                fill="none"
                stroke={SVG_COLORS.primary}
                strokeWidth={3}
                strokeLinecap="round"
                transform={`rotate(${peakDemand ? Math.min(peakDemand * 15, 135) : 45}, 50, 60)`}
              />

              <text x={50} y={80} fontSize="12" fill={SVG_COLORS.text} fontWeight="bold" textAnchor="middle">
                {peakDemand ? `${peakDemand} GPM` : '? GPM'}
              </text>

              {/* Temperature rise info */}
              <rect x={10} y={110} width={80} height={50} fill="white" stroke={SVG_COLORS.strokeLight} rx={4} />
              <text x={50} y={128} fontSize="8" fill={SVG_COLORS.textLight} textAnchor="middle">Temp Rise</text>
              <text x={50} y={145} fontSize="12" fill={SVG_COLORS.accent} fontWeight="bold" textAnchor="middle">
                {recoveryRate ? `${recoveryRate}°F` : '—'}
              </text>
            </g>
          </>
        ) : (
          <>
            {/* Heat pump water heater */}
            <g transform="translate(80, 15)">
              {/* Heat pump unit on top */}
              <rect x={10} y={0} width={100} height={50} rx={6} fill="#60a5fa" stroke={SVG_COLORS.stroke} strokeWidth={2} />
              <text x={60} y={20} fontSize="8" fill="white" textAnchor="middle">HEAT PUMP</text>

              {/* Fan grille */}
              <circle cx={60} cy={35} r={12} fill="#1e40af" stroke="#3b82f6" strokeWidth={1} />
              <text x={60} y={39} fontSize="10" fill="white" textAnchor="middle">⟳</text>

              {/* Tank below */}
              <rect x={0} y={55} width={120} height={140} rx={8} fill="#e2e8f0" stroke={SVG_COLORS.stroke} strokeWidth={2} />
              <rect x={8} y={63} width={104} height={124} rx={5} fill="url(#temp-cold-hot)" />

              {/* Capacity */}
              {tankSize && (
                <g>
                  <rect x={20} y={110} width={80} height={30} fill="rgba(255,255,255,0.9)" rx={4} />
                  <text x={60} y={125} fontSize="10" fill={SVG_COLORS.text} fontWeight="bold" textAnchor="middle">
                    {tankSize} Gallons
                  </text>
                  <text x={60} y={136} fontSize="8" fill={SVG_COLORS.textLight} textAnchor="middle">
                    Hybrid Tank
                  </text>
                </g>
              )}
            </g>
          </>
        )}

        {/* First Hour Rating explanation */}
        {heaterType === 'tank' && (
          <g transform="translate(15, 200)">
            <text fontSize="8" fill={SVG_COLORS.textLight}>
              <tspan x={0}>FHR = Tank Capacity + Recovery in 1st Hour</tspan>
            </text>
          </g>
        )}
      </svg>
    </CalculatorSVG>
  );
}
