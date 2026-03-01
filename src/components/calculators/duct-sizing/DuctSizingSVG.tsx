'use client';

import CalculatorSVG, {
  ArrowMarkerDefs,
  DuctSection,
  SVG_COLORS,
} from '../CalculatorSVG';

interface DuctSizingSVGProps {
  cfm?: number;
  ductDiameter?: number;
  velocity?: number;
  frictionLoss?: number;
  ductType?: 'round' | 'rectangular';
  width?: number;
  height?: number;
}

/**
 * SVG visualization for CFM Duct Sizing Calculator
 * Shows duct cross-section with airflow arrows and velocity labels
 * Source: ACCA Manual D duct sizing methodology visualization
 */
export default function DuctSizingSVG({
  cfm,
  ductDiameter,
  velocity,
  frictionLoss,
  ductType = 'round',
  width,
  height,
}: DuctSizingSVGProps) {
  const hasResults = cfm !== undefined && (ductDiameter !== undefined || (width !== undefined && height !== undefined));

  // Scale the duct visualization based on size (max 24" = full width)
  const maxDuctSize = 24;
  const ductScale = ductDiameter ? Math.min(ductDiameter / maxDuctSize, 1) : 0.5;

  // Get velocity color (green = good, yellow = high, red = too high)
  const getVelocityColor = () => {
    if (!velocity) return SVG_COLORS.primary;
    if (velocity < 600) return SVG_COLORS.good;
    if (velocity < 900) return SVG_COLORS.primary;
    if (velocity < 1200) return SVG_COLORS.warning;
    return SVG_COLORS.danger;
  };

  // Get velocity status
  const getVelocityStatus = () => {
    if (!velocity) return '';
    if (velocity < 400) return 'Very Low';
    if (velocity < 600) return 'Low (Quiet)';
    if (velocity < 900) return 'Normal';
    if (velocity < 1200) return 'High';
    return 'Too High!';
  };

  return (
    <CalculatorSVG
      title="Duct Cross-Section"
      description={ductType === 'round' ? 'Round duct with airflow visualization' : 'Rectangular duct with airflow visualization'}
      aspectRatio="wide"
    >
      <svg
        viewBox="0 0 400 250"
        className="w-full h-full"
        preserveAspectRatio="xMidYMid meet"
      >
        <ArrowMarkerDefs />

        {/* Background */}
        <rect width="400" height="250" fill="#f8fafc" />

        {/* Side view - Duct section */}
        <g>
          <text x={200} y={20} fontSize="11" fill={SVG_COLORS.text} fontWeight="bold" textAnchor="middle">
            Side View - Airflow Direction
          </text>

          {/* Main duct body */}
          <DuctSection
            x={50}
            y={50}
            width={300}
            height={60}
            fill="#e2e8f0"
            stroke={SVG_COLORS.stroke}
          />

          {/* Inner duct surface */}
          <rect x={55} y={55} width={290} height={50} fill="#f1f5f9" />

          {/* Airflow arrows */}
          <g>
            {[0, 1, 2, 3, 4].map((i) => (
              <path
                key={i}
                d={`M${80 + i * 55},80 L${115 + i * 55},80`}
                fill="none"
                stroke={getVelocityColor()}
                strokeWidth={hasResults ? 3 : 2}
                markerEnd="url(#arrow-air)"
                opacity={0.8}
              />
            ))}
          </g>

          {/* CFM label */}
          <g>
            <rect x={55} y={115} width={60} height={22} fill="white" stroke={SVG_COLORS.strokeLight} rx={3} />
            <text x={85} y={130} fontSize="10" fill={SVG_COLORS.text} fontWeight="bold" textAnchor="middle">
              {cfm ? `${cfm} CFM` : '? CFM'}
            </text>
          </g>

          {/* Velocity label */}
          <g>
            <rect x={170} y={115} width={70} height={22} fill="white" stroke={getVelocityColor()} strokeWidth={1.5} rx={3} />
            <text x={205} y={130} fontSize="10" fill={getVelocityColor()} fontWeight="bold" textAnchor="middle">
              {velocity ? `${velocity} FPM` : '? FPM'}
            </text>
          </g>

          {/* Velocity status */}
          {velocity && (
            <text x={285} y={130} fontSize="9" fill={getVelocityColor()}>
              {getVelocityStatus()}
            </text>
          )}
        </g>

        {/* Cross-section view */}
        <g transform="translate(0, 145)">
          <text x={100} y={10} fontSize="11" fill={SVG_COLORS.text} fontWeight="bold" textAnchor="middle">
            Cross-Section
          </text>

          {ductType === 'round' ? (
            <>
              {/* Outer circle (duct wall) */}
              <circle
                cx={100}
                cy={50}
                r={35 * ductScale + 15}
                fill="#cbd5e1"
                stroke={SVG_COLORS.stroke}
                strokeWidth={2}
              />
              {/* Inner circle (airway) */}
              <circle
                cx={100}
                cy={50}
                r={35 * ductScale + 10}
                fill="#eff6ff"
                stroke={SVG_COLORS.strokeLight}
                strokeWidth={1}
              />
              {/* Diameter indicator */}
              <line
                x1={100 - 35 * ductScale - 10}
                y1={50}
                x2={100 + 35 * ductScale + 10}
                y2={50}
                stroke={SVG_COLORS.accent}
                strokeWidth={1.5}
                strokeDasharray="4,2"
              />
              <circle cx={100 - 35 * ductScale - 10} cy={50} r={3} fill={SVG_COLORS.accent} />
              <circle cx={100 + 35 * ductScale + 10} cy={50} r={3} fill={SVG_COLORS.accent} />

              {/* Diameter label */}
              <text x={100} y={95} fontSize="10" fill={SVG_COLORS.text} textAnchor="middle">
                {ductDiameter ? `${ductDiameter}"` : '?'} diameter
              </text>
            </>
          ) : (
            <>
              {/* Rectangular duct */}
              <rect
                x={60}
                y={30}
                width={80 * (width ? width / 24 : 0.5)}
                height={50 * (height ? height / 18 : 0.5)}
                fill="#cbd5e1"
                stroke={SVG_COLORS.stroke}
                strokeWidth={2}
              />
              <rect
                x={65}
                y={35}
                width={80 * (width ? width / 24 : 0.5) - 10}
                height={50 * (height ? height / 18 : 0.5) - 10}
                fill="#eff6ff"
                stroke={SVG_COLORS.strokeLight}
                strokeWidth={1}
              />

              {/* Dimension labels */}
              <text x={100} y={95} fontSize="10" fill={SVG_COLORS.text} textAnchor="middle">
                {width && height ? `${width}" × ${height}"` : '? × ?'}
              </text>
            </>
          )}
        </g>

        {/* Results panel */}
        <g transform="translate(200, 155)">
          <rect x={0} y={0} width={190} height={55} fill="white" stroke={SVG_COLORS.strokeLight} rx={4} />

          <text x={95} y={18} fontSize="10" fill={SVG_COLORS.textLight} textAnchor="middle">
            Duct Parameters
          </text>

          <line x1={10} y1={25} x2={180} y2={25} stroke={SVG_COLORS.strokeLight} />

          {/* Friction loss */}
          <text x={15} y={42} fontSize="9" fill={SVG_COLORS.text}>
            Friction Loss:
          </text>
          <text x={95} y={42} fontSize="9" fill={SVG_COLORS.primary} fontWeight="bold">
            {frictionLoss ? `${frictionLoss.toFixed(3)}&quot; w.g./100 ft` : '—'}
          </text>

          {/* Equivalent diameter (for rectangular) */}
          {ductType === 'rectangular' && ductDiameter && (
            <text x={15} y={52} fontSize="8" fill={SVG_COLORS.textLight}>
              Equiv. diameter: {ductDiameter}&quot;
            </text>
          )}
        </g>

        {/* Velocity scale */}
        <g transform="translate(360, 50)">
          <text x={0} y={0} fontSize="8" fill={SVG_COLORS.textLight} textAnchor="middle">
            Velocity
          </text>
          <rect x={-8} y={5} width={16} height={80} fill="url(#velocity-scale)" rx={2} />
          <text x={0} y={95} fontSize="7" fill={SVG_COLORS.good} textAnchor="middle">Low</text>
          <text x={0} y={55} fontSize="7" fill={SVG_COLORS.primary} textAnchor="middle">OK</text>
          <text x={0} y={18} fontSize="7" fill={SVG_COLORS.danger} textAnchor="middle">High</text>
        </g>

        {/* Velocity gradient definition */}
        <defs>
          <linearGradient id="velocity-scale" x1="0%" y1="100%" x2="0%" y2="0%">
            <stop offset="0%" stopColor={SVG_COLORS.good} />
            <stop offset="50%" stopColor={SVG_COLORS.primary} />
            <stop offset="75%" stopColor={SVG_COLORS.warning} />
            <stop offset="100%" stopColor={SVG_COLORS.danger} />
          </linearGradient>
        </defs>
      </svg>
    </CalculatorSVG>
  );
}
