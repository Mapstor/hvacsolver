'use client';

import CalculatorSVG, { SVG_COLORS } from '../CalculatorSVG';

interface ElectricHeaterCostSVGProps {
  wattage?: number;
  hoursPerDay?: number;
  electricityRate?: number;
  dailyCost?: number;
  monthlyCost?: number;
  annualCost?: number;
}

/**
 * SVG visualization for Electric Heater Running Cost Calculator
 * Shows heater with energy consumption and cost breakdown
 */
export default function ElectricHeaterCostSVG({
  wattage,
  hoursPerDay,
  electricityRate,
  dailyCost,
  monthlyCost,
  annualCost,
}: ElectricHeaterCostSVGProps) {
  const hasResults = dailyCost !== undefined;

  // Energy bar height based on wattage (max 3000W for full height)
  const maxWattage = 3000;
  const energyBarHeight = wattage ? Math.min((wattage / maxWattage) * 80, 80) : 40;

  // Cost intensity color
  const getCostColor = () => {
    if (!monthlyCost) return SVG_COLORS.textLight;
    if (monthlyCost < 30) return SVG_COLORS.good;
    if (monthlyCost < 60) return SVG_COLORS.primary;
    if (monthlyCost < 100) return SVG_COLORS.warning;
    return SVG_COLORS.danger;
  };

  return (
    <CalculatorSVG
      title="Heater Running Cost"
      description="Energy consumption and operating cost visualization"
      aspectRatio="wide"
    >
      <svg
        viewBox="0 0 400 210"
        className="w-full h-full"
        preserveAspectRatio="xMidYMid meet"
      >
        {/* Background */}
        <rect width="400" height="210" fill="#f8fafc" />

        {/* Electric heater illustration */}
        <g transform="translate(30, 30)">
          {/* Heater body */}
          <rect
            x={20}
            y={20}
            width={80}
            height={100}
            rx={5}
            fill="#475569"
            stroke={SVG_COLORS.stroke}
            strokeWidth={2}
          />

          {/* Heater front panel */}
          <rect x={25} y={25} width={70} height={60} rx={3} fill="#1e3a5f" />

          {/* Heating elements (glowing when results available) */}
          {[0, 1, 2].map((i) => (
            <g key={i}>
              <rect
                x={30}
                y={32 + i * 18}
                width={60}
                height={10}
                rx={2}
                fill={hasResults ? SVG_COLORS.heat : '#64748b'}
                opacity={hasResults ? 0.8 : 0.3}
              />
              {hasResults && (
                <rect
                  x={30}
                  y={32 + i * 18}
                  width={60}
                  height={10}
                  rx={2}
                  fill={SVG_COLORS.heat}
                  opacity={0.5}
                >
                  <animate
                    attributeName="opacity"
                    values="0.3;0.7;0.3"
                    dur={`${0.8 + i * 0.2}s`}
                    repeatCount="indefinite"
                  />
                </rect>
              )}
            </g>
          ))}

          {/* Control dial */}
          <circle cx={60} cy={100} r={12} fill="#334155" stroke={SVG_COLORS.stroke} strokeWidth={1} />
          <line x1={60} y1={100} x2={60} y2={90} stroke="white" strokeWidth={2} />

          {/* Heater legs */}
          <rect x={30} y={120} width={8} height={15} fill="#334155" />
          <rect x={82} y={120} width={8} height={15} fill="#334155" />

          {/* Heat waves */}
          {hasResults && (
            <g opacity={0.6}>
              {[0, 1, 2].map((i) => (
                <path
                  key={i}
                  d={`M${35 + i * 25},15 Q${40 + i * 25},5 ${45 + i * 25},15 Q${50 + i * 25},25 ${55 + i * 25},15`}
                  fill="none"
                  stroke={SVG_COLORS.heat}
                  strokeWidth={2}
                  opacity={0.5}
                >
                  <animate
                    attributeName="d"
                    values={`M${35 + i * 25},15 Q${40 + i * 25},5 ${45 + i * 25},15 Q${50 + i * 25},25 ${55 + i * 25},15;
                             M${35 + i * 25},10 Q${40 + i * 25},0 ${45 + i * 25},10 Q${50 + i * 25},20 ${55 + i * 25},10;
                             M${35 + i * 25},15 Q${40 + i * 25},5 ${45 + i * 25},15 Q${50 + i * 25},25 ${55 + i * 25},15`}
                    dur="1.5s"
                    repeatCount="indefinite"
                  />
                </path>
              ))}
            </g>
          )}

          {/* Power indicator */}
          <text x={60} y={150} fontSize="10" fill={SVG_COLORS.text} textAnchor="middle">
            {wattage ? `${wattage}W` : '— W'}
          </text>
        </g>

        {/* Energy consumption bar */}
        <g transform="translate(140, 30)">
          <text x={25} y={0} fontSize="9" fill={SVG_COLORS.text} fontWeight="bold" textAnchor="middle">
            Power Draw
          </text>

          {/* Bar background */}
          <rect x={0} y={10} width={50} height={100} fill="#e2e8f0" rx={4} />

          {/* Energy bar (fills from bottom) */}
          <rect
            x={0}
            y={10 + (100 - energyBarHeight)}
            width={50}
            height={energyBarHeight}
            fill={SVG_COLORS.warning}
            rx={4}
            opacity={0.8}
          />

          {/* Wattage scale */}
          <text x={55} y={25} fontSize="7" fill={SVG_COLORS.textLight}>3kW</text>
          <text x={55} y={60} fontSize="7" fill={SVG_COLORS.textLight}>1.5kW</text>
          <text x={55} y={105} fontSize="7" fill={SVG_COLORS.textLight}>0</text>

          {/* kWh per day */}
          {hasResults && (
            <text x={25} y={125} fontSize="9" fill={SVG_COLORS.warning} fontWeight="bold" textAnchor="middle">
              {wattage && hoursPerDay ? ((wattage * hoursPerDay) / 1000).toFixed(1) : '—'} kWh/day
            </text>
          )}
        </g>

        {/* Cost breakdown panel */}
        <g transform="translate(220, 20)">
          <rect x={0} y={0} width={160} height={160} fill="white" stroke={SVG_COLORS.strokeLight} rx={6} />

          <text x={80} y={18} fontSize="11" fill={SVG_COLORS.text} fontWeight="bold" textAnchor="middle">
            Operating Cost
          </text>
          <line x1={10} y1={26} x2={150} y2={26} stroke={SVG_COLORS.strokeLight} />

          {/* Daily cost */}
          <g transform="translate(10, 40)">
            <text x={0} y={0} fontSize="9" fill={SVG_COLORS.textLight}>Daily</text>
            <text x={130} y={0} fontSize="12" fill={getCostColor()} fontWeight="bold" textAnchor="end">
              ${dailyCost?.toFixed(2) ?? '—'}
            </text>
          </g>

          {/* Monthly cost */}
          <g transform="translate(10, 70)">
            <text x={0} y={0} fontSize="9" fill={SVG_COLORS.textLight}>Monthly (30 days)</text>
            <text x={130} y={0} fontSize="14" fill={getCostColor()} fontWeight="bold" textAnchor="end">
              ${monthlyCost?.toFixed(2) ?? '—'}
            </text>
          </g>

          {/* Annual cost */}
          <g transform="translate(10, 100)">
            <text x={0} y={0} fontSize="9" fill={SVG_COLORS.textLight}>Annual (365 days)</text>
            <text x={130} y={0} fontSize="12" fill={getCostColor()} fontWeight="bold" textAnchor="end">
              ${annualCost?.toFixed(2) ?? '—'}
            </text>
          </g>

          {/* Usage info */}
          <line x1={10} y1={115} x2={150} y2={115} stroke={SVG_COLORS.strokeLight} />
          <g transform="translate(10, 130)">
            <text x={0} y={0} fontSize="8" fill={SVG_COLORS.textLight}>
              {hoursPerDay ? `${hoursPerDay} hrs/day` : '— hrs/day'}
            </text>
            <text x={0} y={14} fontSize="8" fill={SVG_COLORS.textLight}>
              {electricityRate ? `$${electricityRate}/kWh` : '$—/kWh'}
            </text>
          </g>
        </g>

        {/* Formula */}
        <g transform="translate(30, 198)">
          <text x={0} y={0} fontSize="8" fill={SVG_COLORS.textLight}>
            Cost = (Watts ÷ 1000) × Hours × $/kWh
          </text>
        </g>
      </svg>
    </CalculatorSVG>
  );
}
