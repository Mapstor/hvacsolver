'use client';

import CalculatorSVG, { SVG_COLORS } from '../CalculatorSVG';

interface DehumidifierCostSVGProps {
  wattage?: number;
  hoursPerDay?: number;
  electricityRate?: number;
  dailyCost?: number;
  monthlyCost?: number;
  pintsPerDay?: number;
  energyFactor?: number;
}

/**
 * SVG visualization for Dehumidifier Running Cost Calculator
 * Shows dehumidifier with moisture extraction and cost display
 */
export default function DehumidifierCostSVG({
  wattage,
  hoursPerDay,
  electricityRate,
  dailyCost,
  monthlyCost,
  pintsPerDay,
  energyFactor,
}: DehumidifierCostSVGProps) {
  const hasResults = dailyCost !== undefined;

  // Energy factor rating
  const getEFColor = () => {
    if (!energyFactor) return SVG_COLORS.textLight;
    if (energyFactor >= 2.5) return SVG_COLORS.good;
    if (energyFactor >= 1.85) return SVG_COLORS.primary;
    if (energyFactor >= 1.5) return SVG_COLORS.warning;
    return SVG_COLORS.danger;
  };

  const getEFRating = () => {
    if (!energyFactor) return '';
    if (energyFactor >= 2.5) return 'Excellent';
    if (energyFactor >= 1.85) return 'Good';
    if (energyFactor >= 1.5) return 'Fair';
    return 'Poor';
  };

  return (
    <CalculatorSVG
      title="Dehumidifier Operating Cost"
      description="Energy consumption and moisture removal"
      aspectRatio="wide"
    >
      <svg
        viewBox="0 0 400 220"
        className="w-full h-full"
        preserveAspectRatio="xMidYMid meet"
      >
        {/* Background */}
        <rect width="400" height="220" fill="#f8fafc" />

        {/* Dehumidifier unit */}
        <g transform="translate(30, 25)">
          {/* Unit body */}
          <rect
            x={20}
            y={10}
            width={80}
            height={110}
            rx={6}
            fill="#64748b"
            stroke={SVG_COLORS.stroke}
            strokeWidth={2}
          />

          {/* Display panel */}
          <rect x={30} y={20} width={60} height={25} rx={3} fill="#1e3a5f" />
          <text x={60} y={37} fontSize="10" fill={SVG_COLORS.cold} fontWeight="bold" textAnchor="middle">
            {pintsPerDay ? `${pintsPerDay} pt` : '— pt'}
          </text>

          {/* Humidity indicator */}
          <text x={60} y={58} fontSize="8" fill="white" textAnchor="middle">
            💧 Removing
          </text>

          {/* Air intake grille (top) */}
          <g>
            {[0, 1, 2, 3].map((i) => (
              <rect key={i} x={35} y={65 + i * 8} width={50} height={4} rx={1} fill="#475569" />
            ))}
          </g>

          {/* Moisture intake arrows */}
          {hasResults && (
            <g>
              {[-20, 0, 20].map((offset, i) => (
                <g key={i}>
                  <text
                    x={60 + offset}
                    y={-5}
                    fontSize="10"
                    textAnchor="middle"
                    opacity={0.5}
                  >
                    💧
                  </text>
                  <path
                    d={`M${60 + offset},-2 L${60 + offset},8`}
                    fill="none"
                    stroke={SVG_COLORS.cold}
                    strokeWidth={1.5}
                    opacity={0.6}
                  >
                    <animate
                      attributeName="d"
                      values={`M${60 + offset},-2 L${60 + offset},8;M${60 + offset},5 L${60 + offset},15;M${60 + offset},-2 L${60 + offset},8`}
                      dur="1.5s"
                      repeatCount="indefinite"
                      begin={`${i * 0.3}s`}
                    />
                  </path>
                </g>
              ))}
            </g>
          )}

          {/* Water tank */}
          <rect x={35} y={100} width={50} height={15} rx={2} fill="#0ea5e9" opacity={0.3} stroke={SVG_COLORS.cold} strokeWidth={1} />

          {/* Water level animation */}
          {hasResults && (
            <rect x={36} y={108} width={48} height={6} rx={1} fill={SVG_COLORS.cold} opacity={0.5}>
              <animate
                attributeName="width"
                values="10;48;10"
                dur="4s"
                repeatCount="indefinite"
              />
            </rect>
          )}

          {/* Dry air output */}
          {hasResults && (
            <g>
              {[0, 1, 2].map((i) => (
                <path
                  key={i}
                  d={`M${105 + i * 5},${50 + i * 15} L${130 + i * 5},${50 + i * 15}`}
                  fill="none"
                  stroke={SVG_COLORS.good}
                  strokeWidth={2}
                  strokeDasharray="4,3"
                  opacity={0.5}
                >
                  <animate
                    attributeName="stroke-dashoffset"
                    from="0"
                    to="-14"
                    dur="0.8s"
                    repeatCount="indefinite"
                  />
                </path>
              ))}
              <text x={140} y={70} fontSize="8" fill={SVG_COLORS.good}>
                Dry Air
              </text>
            </g>
          )}

          {/* Wattage label */}
          <text x={60} y={128} fontSize="9" fill={SVG_COLORS.text} textAnchor="middle">
            {wattage ? `${wattage}W` : '— W'}
          </text>
        </g>

        {/* Energy Factor panel */}
        <g transform="translate(30, 163)">
          <rect x={0} y={0} width={90} height={35} fill="white" stroke={getEFColor()} strokeWidth={1.5} rx={4} />
          <text x={45} y={14} fontSize="8" fill={SVG_COLORS.textLight} textAnchor="middle">
            Energy Factor
          </text>
          <text x={45} y={28} fontSize="11" fill={getEFColor()} fontWeight="bold" textAnchor="middle">
            {energyFactor?.toFixed(2) ?? '—'} L/kWh ({getEFRating()})
          </text>
        </g>

        {/* Cost breakdown panel */}
        <g transform="translate(220, 20)">
          <rect x={0} y={0} width={160} height={155} fill="white" stroke={SVG_COLORS.strokeLight} rx={6} />

          <text x={80} y={18} fontSize="11" fill={SVG_COLORS.text} fontWeight="bold" textAnchor="middle">
            Running Costs
          </text>
          <line x1={10} y1={26} x2={150} y2={26} stroke={SVG_COLORS.strokeLight} />

          {/* Daily */}
          <g transform="translate(10, 42)">
            <text x={0} y={0} fontSize="9" fill={SVG_COLORS.textLight}>Daily ({hoursPerDay ?? '—'} hrs)</text>
            <text x={135} y={0} fontSize="12" fill={SVG_COLORS.primary} fontWeight="bold" textAnchor="end">
              ${dailyCost?.toFixed(2) ?? '—'}
            </text>
          </g>

          {/* Monthly */}
          <g transform="translate(10, 67)">
            <text x={0} y={0} fontSize="9" fill={SVG_COLORS.textLight}>Monthly</text>
            <text x={135} y={0} fontSize="16" fill={SVG_COLORS.accent} fontWeight="bold" textAnchor="end">
              ${monthlyCost?.toFixed(2) ?? '—'}
            </text>
          </g>

          <line x1={10} y1={85} x2={150} y2={85} stroke={SVG_COLORS.strokeLight} />

          {/* Daily removal */}
          <g transform="translate(10, 100)">
            <text x={0} y={0} fontSize="8" fill={SVG_COLORS.textLight}>Moisture Removed</text>
            <text x={135} y={0} fontSize="10" fill={SVG_COLORS.cold} fontWeight="bold" textAnchor="end">
              {pintsPerDay ?? '—'} pints/day
            </text>
          </g>

          {/* kWh per day */}
          <g transform="translate(10, 118)">
            <text x={0} y={0} fontSize="8" fill={SVG_COLORS.textLight}>Energy Use</text>
            <text x={135} y={0} fontSize="9" fill={SVG_COLORS.text} textAnchor="end">
              {wattage && hoursPerDay ? `${((wattage * hoursPerDay) / 1000).toFixed(1)} kWh/day` : '—'}
            </text>
          </g>

          {/* Rate */}
          <g transform="translate(10, 136)">
            <text x={0} y={0} fontSize="8" fill={SVG_COLORS.textLight}>Electricity Rate</text>
            <text x={135} y={0} fontSize="9" fill={SVG_COLORS.text} textAnchor="end">
              ${electricityRate ?? '—'}/kWh
            </text>
          </g>
        </g>

        {/* Humidity context */}
        <g transform="translate(145, 175)">
          <text x={0} y={0} fontSize="7" fill={SVG_COLORS.textLight}>
            Ideal indoor humidity: 30-50% RH
          </text>
          <text x={0} y={12} fontSize="7" fill={SVG_COLORS.textLight}>
            Higher EF = more moisture per kWh
          </text>
        </g>
      </svg>
    </CalculatorSVG>
  );
}
