'use client';

import CalculatorSVG, { SVG_COLORS } from '../CalculatorSVG';

interface COPSVGProps {
  cop?: number;
  heatingOutput?: number;
  electricInput?: number;
  efficiency?: number;
  systemType?: 'heat-pump' | 'ac' | 'chiller';
}

/**
 * SVG visualization for COP (Coefficient of Performance) Calculator
 * Shows energy flow diagram with input/output comparison
 * Source: ASHRAE efficiency calculations
 */
export default function COPSVG({
  cop,
  heatingOutput,
  electricInput,
  efficiency,
  systemType = 'heat-pump',
}: COPSVGProps) {
  const hasResults = cop !== undefined;

  // Get COP rating color
  const getCOPColor = () => {
    if (!cop) return SVG_COLORS.textLight;
    if (cop >= 4.0) return SVG_COLORS.good;
    if (cop >= 3.0) return SVG_COLORS.primary;
    if (cop >= 2.0) return SVG_COLORS.warning;
    return SVG_COLORS.danger;
  };

  // Get COP rating text
  const getCOPRating = () => {
    if (!cop) return '';
    if (cop >= 4.5) return 'Excellent';
    if (cop >= 4.0) return 'Very Good';
    if (cop >= 3.0) return 'Good';
    if (cop >= 2.5) return 'Average';
    if (cop >= 2.0) return 'Fair';
    return 'Poor';
  };

  // Bar heights based on COP (max COP ~5 for visualization)
  const maxCOP = 5;
  const copNormalized = cop ? Math.min(cop / maxCOP, 1) : 0.5;
  const inputBarHeight = 60;
  const outputBarHeight = inputBarHeight * (cop || 2);

  return (
    <CalculatorSVG
      title="Energy Flow Diagram"
      description="COP shows how much heat output you get per unit of electrical input"
      aspectRatio="wide"
    >
      <svg
        viewBox="0 0 400 200"
        className="w-full h-full"
        preserveAspectRatio="xMidYMid meet"
      >
        {/* Background */}
        <rect width="400" height="200" fill="#f8fafc" />

        {/* System unit box */}
        <g transform="translate(140, 50)">
          <rect
            x={0}
            y={0}
            width={120}
            height={100}
            rx={8}
            fill={systemType === 'heat-pump' ? '#fef3c7' : '#e0f2fe'}
            stroke={SVG_COLORS.stroke}
            strokeWidth={2}
          />

          {/* System label */}
          <text x={60} y={-8} fontSize="10" fill={SVG_COLORS.text} fontWeight="bold" textAnchor="middle">
            {systemType === 'heat-pump' ? 'Heat Pump' : systemType === 'ac' ? 'Air Conditioner' : 'Chiller'}
          </text>

          {/* COP display */}
          <rect x={20} y={25} width={80} height={50} fill="white" stroke={getCOPColor()} strokeWidth={2} rx={6} />
          <text x={60} y={48} fontSize="8" fill={SVG_COLORS.textLight} textAnchor="middle">
            COP
          </text>
          <text x={60} y={65} fontSize="18" fill={getCOPColor()} fontWeight="bold" textAnchor="middle">
            {cop ? cop.toFixed(2) : '—'}
          </text>

          {/* Rating badge */}
          {cop && (
            <g>
              <rect x={30} y={80} width={60} height={16} fill={getCOPColor()} rx={8} />
              <text x={60} y={92} fontSize="9" fill="white" fontWeight="bold" textAnchor="middle">
                {getCOPRating()}
              </text>
            </g>
          )}

          {/* Compressor/fan icon */}
          <circle cx={60} cy={15} r={8} fill="#94a3b8" />
          <text x={60} y={18} fontSize="8" fill="white" textAnchor="middle">⟳</text>
        </g>

        {/* Electrical input (left side) */}
        <g transform="translate(30, 65)">
          <text x={45} y={0} fontSize="10" fill={SVG_COLORS.text} fontWeight="bold" textAnchor="middle">
            Electrical Input
          </text>

          {/* Input bar */}
          <rect
            x={20}
            y={15}
            width={50}
            height={inputBarHeight}
            fill={SVG_COLORS.warning}
            rx={4}
          />

          {/* Value label */}
          <text x={45} y={50} fontSize="10" fill="white" fontWeight="bold" textAnchor="middle">
            {electricInput ? `${electricInput.toLocaleString()}` : '1'}
          </text>
          <text x={45} y={62} fontSize="8" fill="white" textAnchor="middle">
            kW
          </text>

          {/* Arrow to system */}
          <path
            d="M75,50 L125,50"
            fill="none"
            stroke={SVG_COLORS.warning}
            strokeWidth={3}
            markerEnd="url(#arrow-input)"
          />
        </g>

        {/* Heat output (right side) */}
        <g transform="translate(280, 35)">
          <text x={45} y={0} fontSize="10" fill={SVG_COLORS.text} fontWeight="bold" textAnchor="middle">
            Heat Output
          </text>

          {/* Output bar (taller based on COP) */}
          <rect
            x={20}
            y={15 + (120 - Math.min(outputBarHeight, 120))}
            width={50}
            height={Math.min(outputBarHeight, 120)}
            fill={getCOPColor()}
            rx={4}
          />

          {/* Value label */}
          <text x={45} y={85} fontSize="10" fill="white" fontWeight="bold" textAnchor="middle">
            {heatingOutput ? `${heatingOutput.toLocaleString()}` : (cop || 2).toFixed(1)}
          </text>
          <text x={45} y={97} fontSize="8" fill="white" textAnchor="middle">
            kW
          </text>

          {/* Arrow from system */}
          <path
            d="M-20,70 L15,70"
            fill="none"
            stroke={getCOPColor()}
            strokeWidth={3}
            markerEnd="url(#arrow-output)"
          />
        </g>

        {/* Free energy from environment */}
        {systemType === 'heat-pump' && cop && cop > 1 && (
          <g transform="translate(165, 155)">
            <text x={35} y={0} fontSize="9" fill={SVG_COLORS.cold} fontWeight="bold" textAnchor="middle">
              + Free Energy from Air
            </text>
            <path
              d="M35,5 L35,30"
              fill="none"
              stroke={SVG_COLORS.cold}
              strokeWidth={2}
              strokeDasharray="4,2"
            />
            <text x={35} y={45} fontSize="20" fill={SVG_COLORS.cold}>🌡️</text>
          </g>
        )}

        {/* Formula explanation */}
        <g transform="translate(15, 180)">
          <text fontSize="9" fill={SVG_COLORS.textLight}>
            <tspan x={0}>COP = Heat Output ÷ Electrical Input</tspan>
            {cop && (
              <tspan x={200}>
                | {heatingOutput || (cop).toFixed(1)} kW ÷ {electricInput || 1} kW = {cop.toFixed(2)}
              </tspan>
            )}
          </text>
        </g>

        {/* Arrow markers */}
        <defs>
          <marker
            id="arrow-input"
            markerWidth="10"
            markerHeight="10"
            refX="9"
            refY="3"
            orient="auto"
            markerUnits="strokeWidth"
          >
            <path d="M0,0 L0,6 L9,3 z" fill={SVG_COLORS.warning} />
          </marker>
          <marker
            id="arrow-output"
            markerWidth="10"
            markerHeight="10"
            refX="9"
            refY="3"
            orient="auto"
            markerUnits="strokeWidth"
          >
            <path d="M0,0 L0,6 L9,3 z" fill={getCOPColor()} />
          </marker>
        </defs>

        {/* Efficiency comparison */}
        {efficiency && (
          <g transform="translate(15, 10)">
            <rect x={0} y={0} width={100} height={25} fill="white" stroke={SVG_COLORS.strokeLight} rx={4} />
            <text x={50} y={10} fontSize="8" fill={SVG_COLORS.textLight} textAnchor="middle">
              Efficiency
            </text>
            <text x={50} y={22} fontSize="10" fill={getCOPColor()} fontWeight="bold" textAnchor="middle">
              {efficiency}%
            </text>
          </g>
        )}
      </svg>
    </CalculatorSVG>
  );
}
