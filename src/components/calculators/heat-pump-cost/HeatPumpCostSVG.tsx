'use client';

import CalculatorSVG, { SVG_COLORS } from '../CalculatorSVG';

interface HeatPumpCostSVGProps {
  cop?: number;
  btuCapacity?: number;
  hoursPerDay?: number;
  electricityRate?: number;
  dailyCost?: number;
  monthlyCost?: number;
  seasonalCost?: number;
  mode?: 'heating' | 'cooling';
}

/**
 * SVG visualization for Heat Pump Running Cost Calculator
 * Shows heat pump with energy flow and cost breakdown
 */
export default function HeatPumpCostSVG({
  cop,
  btuCapacity,
  hoursPerDay,
  electricityRate,
  dailyCost,
  monthlyCost,
  seasonalCost,
  mode = 'heating',
}: HeatPumpCostSVGProps) {
  const hasResults = dailyCost !== undefined;

  // COP efficiency color
  const getCOPColor = () => {
    if (!cop) return SVG_COLORS.textLight;
    if (cop >= 4.0) return SVG_COLORS.good;
    if (cop >= 3.0) return SVG_COLORS.primary;
    if (cop >= 2.5) return SVG_COLORS.warning;
    return SVG_COLORS.danger;
  };

  const getCOPRating = () => {
    if (!cop) return '';
    if (cop >= 4.0) return 'Excellent';
    if (cop >= 3.0) return 'Good';
    if (cop >= 2.5) return 'Average';
    return 'Low';
  };

  // Calculate wattage
  const wattage = btuCapacity && cop ? btuCapacity / (cop * 3.412) : undefined;

  return (
    <CalculatorSVG
      title="Heat Pump Operating Cost"
      description={`${mode === 'heating' ? 'Heating' : 'Cooling'} efficiency and running costs`}
      aspectRatio="wide"
    >
      <svg
        viewBox="0 0 400 200"
        className="w-full h-full"
        preserveAspectRatio="xMidYMid meet"
      >
        {/* Background */}
        <rect width="400" height="200" fill="#f8fafc" />

        {/* Heat pump unit */}
        <g transform="translate(25, 30)">
          {/* Outdoor unit */}
          <rect
            x={0}
            y={30}
            width={65}
            height={85}
            rx={4}
            fill="#475569"
            stroke={SVG_COLORS.stroke}
            strokeWidth={2}
          />

          {/* Fan */}
          <circle cx={32} cy={60} r={22} fill="#334155" stroke={SVG_COLORS.stroke} strokeWidth={1} />
          {[0, 90, 180, 270].map((angle) => (
            <line
              key={angle}
              x1={32}
              y1={60}
              x2={32 + Math.cos((angle * Math.PI) / 180) * 18}
              y2={60 + Math.sin((angle * Math.PI) / 180) * 18}
              stroke="#64748b"
              strokeWidth={4}
              strokeLinecap="round"
            >
              {hasResults && (
                <animateTransform
                  attributeName="transform"
                  type="rotate"
                  from={`0 32 60`}
                  to={`360 32 60`}
                  dur="1.2s"
                  repeatCount="indefinite"
                />
              )}
            </line>
          ))}

          {/* Energy flow arrows */}
          <g>
            {/* Electrical input */}
            <path
              d="M32,-5 L32,25"
              fill="none"
              stroke={SVG_COLORS.warning}
              strokeWidth={3}
              markerEnd="url(#arrow-elec)"
            />
            <text x={32} y={-10} fontSize="8" fill={SVG_COLORS.warning} textAnchor="middle">
              ⚡ 1 kW
            </text>

            {/* Heat from/to air */}
            <path
              d={mode === 'heating' ? "M-15,60 L-5,60" : "M-5,60 L-15,60"}
              fill="none"
              stroke={mode === 'heating' ? SVG_COLORS.cold : SVG_COLORS.heat}
              strokeWidth={2}
              strokeDasharray="3,2"
            >
              {hasResults && (
                <animate
                  attributeName="stroke-dashoffset"
                  from="0"
                  to={mode === 'heating' ? "-10" : "10"}
                  dur="0.8s"
                  repeatCount="indefinite"
                />
              )}
            </path>

            {/* Heat output */}
            <path
              d="M70,60 L115,60"
              fill="none"
              stroke={mode === 'heating' ? SVG_COLORS.heat : SVG_COLORS.cold}
              strokeWidth={3}
            >
              {hasResults && (
                <animate
                  attributeName="stroke-dashoffset"
                  from="0"
                  to="-20"
                  dur="0.6s"
                  repeatCount="indefinite"
                />
              )}
            </path>
          </g>

          {/* Indoor air handler */}
          <rect
            x={120}
            y={40}
            width={50}
            height={50}
            rx={4}
            fill="#94a3b8"
            stroke={SVG_COLORS.stroke}
            strokeWidth={2}
          />

          {/* Air flow from handler */}
          {hasResults && (
            <g>
              {[0, 1, 2].map((i) => (
                <path
                  key={i}
                  d={`M${130 + i * 12},95 L${130 + i * 12},115`}
                  fill="none"
                  stroke={mode === 'heating' ? SVG_COLORS.heat : SVG_COLORS.cold}
                  strokeWidth={2}
                  strokeDasharray="3,3"
                  opacity={0.6}
                >
                  <animate
                    attributeName="stroke-dashoffset"
                    from="0"
                    to="-12"
                    dur="0.7s"
                    repeatCount="indefinite"
                  />
                </path>
              ))}
              <text x={145} y={130} fontSize="14" textAnchor="middle">
                {mode === 'heating' ? '🔥' : '❄️'}
              </text>
            </g>
          )}

          {/* COP multiplier display */}
          <g transform="translate(70, 10)">
            <rect x={0} y={0} width={50} height={20} fill="white" stroke={getCOPColor()} strokeWidth={1.5} rx={3} />
            <text x={25} y={14} fontSize="10" fill={getCOPColor()} fontWeight="bold" textAnchor="middle">
              ×{cop?.toFixed(1) ?? '—'}
            </text>
          </g>

          {/* Output label */}
          <text x={145} y={25} fontSize="9" fill={mode === 'heating' ? SVG_COLORS.heat : SVG_COLORS.cold} textAnchor="middle">
            {cop ? `${cop.toFixed(1)} kW out` : '— kW'}
          </text>
        </g>

        {/* COP efficiency panel */}
        <g transform="translate(25, 155)">
          <rect x={0} y={0} width={80} height={35} fill="white" stroke={getCOPColor()} strokeWidth={1.5} rx={4} />
          <text x={40} y={14} fontSize="8" fill={SVG_COLORS.textLight} textAnchor="middle">
            COP Rating
          </text>
          <text x={40} y={28} fontSize="10" fill={getCOPColor()} fontWeight="bold" textAnchor="middle">
            {cop?.toFixed(2) ?? '—'} ({getCOPRating()})
          </text>
        </g>

        {/* Cost breakdown panel */}
        <g transform="translate(210, 20)">
          <rect x={0} y={0} width={170} height={160} fill="white" stroke={SVG_COLORS.strokeLight} rx={6} />

          <text x={85} y={18} fontSize="11" fill={SVG_COLORS.text} fontWeight="bold" textAnchor="middle">
            {mode === 'heating' ? 'Heating' : 'Cooling'} Costs
          </text>
          <line x1={10} y1={26} x2={160} y2={26} stroke={SVG_COLORS.strokeLight} />

          {/* Daily */}
          <g transform="translate(10, 42)">
            <text x={0} y={0} fontSize="9" fill={SVG_COLORS.textLight}>Daily ({hoursPerDay ?? '—'} hrs)</text>
            <text x={145} y={0} fontSize="12" fill={SVG_COLORS.primary} fontWeight="bold" textAnchor="end">
              ${dailyCost?.toFixed(2) ?? '—'}
            </text>
          </g>

          {/* Monthly */}
          <g transform="translate(10, 67)">
            <text x={0} y={0} fontSize="9" fill={SVG_COLORS.textLight}>Monthly</text>
            <text x={145} y={0} fontSize="14" fill={SVG_COLORS.accent} fontWeight="bold" textAnchor="end">
              ${monthlyCost?.toFixed(2) ?? '—'}
            </text>
          </g>

          {/* Seasonal */}
          <g transform="translate(10, 92)">
            <text x={0} y={0} fontSize="9" fill={SVG_COLORS.textLight}>
              {mode === 'heating' ? 'Heating Season' : 'Cooling Season'}
            </text>
            <text x={145} y={0} fontSize="12" fill={SVG_COLORS.accent} fontWeight="bold" textAnchor="end">
              ${seasonalCost?.toFixed(2) ?? '—'}
            </text>
          </g>

          <line x1={10} y1={108} x2={160} y2={108} stroke={SVG_COLORS.strokeLight} />

          {/* Capacity */}
          <g transform="translate(10, 122)">
            <text x={0} y={0} fontSize="8" fill={SVG_COLORS.textLight}>Capacity</text>
            <text x={145} y={0} fontSize="9" fill={SVG_COLORS.text} textAnchor="end">
              {btuCapacity ? `${(btuCapacity / 1000).toFixed(0)}k BTU/hr` : '—'}
            </text>
          </g>

          {/* Power draw */}
          <g transform="translate(10, 138)">
            <text x={0} y={0} fontSize="8" fill={SVG_COLORS.textLight}>Power Draw</text>
            <text x={145} y={0} fontSize="9" fill={SVG_COLORS.text} textAnchor="end">
              {wattage ? `${wattage.toFixed(0)} W` : '— W'}
            </text>
          </g>

          {/* Rate */}
          <g transform="translate(10, 154)">
            <text x={0} y={0} fontSize="8" fill={SVG_COLORS.textLight}>Electricity Rate</text>
            <text x={145} y={0} fontSize="9" fill={SVG_COLORS.text} textAnchor="end">
              ${electricityRate ?? '—'}/kWh
            </text>
          </g>
        </g>

        {/* Arrow marker definition */}
        <defs>
          <marker
            id="arrow-elec"
            markerWidth="6"
            markerHeight="6"
            refX="5"
            refY="3"
            orient="auto"
          >
            <path d="M0,0 L0,6 L6,3 z" fill={SVG_COLORS.warning} />
          </marker>
        </defs>
      </svg>
    </CalculatorSVG>
  );
}
