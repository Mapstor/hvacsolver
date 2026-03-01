'use client';

import CalculatorSVG, { SVG_COLORS } from '../CalculatorSVG';

interface RefrigerantPTChartSVGProps {
  refrigerantName?: string;
  safetyClass?: string;
  gwp?: number;
  glide?: string;
  lookupTemp?: number;
  lookupPressure?: number;
  bubblePressure?: number;
  dewPressure?: number;
  hasGlide?: boolean;
}

/**
 * SVG visualization for Refrigerant PT Chart
 * Shows pressure-temperature curve with phase regions
 */
export default function RefrigerantPTChartSVG({
  refrigerantName = 'R-410A',
  safetyClass = 'A1',
  gwp,
  glide,
  lookupTemp,
  lookupPressure,
  bubblePressure,
  dewPressure,
  hasGlide = false,
}: RefrigerantPTChartSVGProps) {
  const hasLookup = lookupTemp !== undefined && (lookupPressure !== undefined || bubblePressure !== undefined);

  // Safety class colors
  const getSafetyColor = () => {
    switch (safetyClass) {
      case 'A1': return SVG_COLORS.good;
      case 'A2L': return SVG_COLORS.warning;
      case 'A3': return SVG_COLORS.danger;
      default: return SVG_COLORS.textLight;
    }
  };

  // Convert temperature to X position on chart
  const tempToX = (temp: number) => {
    const minTemp = -40;
    const maxTemp = 150;
    return 50 + ((temp - minTemp) / (maxTemp - minTemp)) * 180;
  };

  // Convert pressure to Y position on chart (inverted for SVG)
  const pressureToY = (pressure: number) => {
    const minPressure = 0;
    const maxPressure = 500;
    return 140 - ((pressure - minPressure) / (maxPressure - minPressure)) * 100;
  };

  // Sample PT curve points (generic shape - actual data varies by refrigerant)
  const curvePath = `M50,135 Q80,120 110,100 T170,60 Q200,45 230,30`;

  // Lookup point position
  const lookupX = lookupTemp !== undefined ? tempToX(lookupTemp) : 0;
  const lookupY = lookupPressure !== undefined ? pressureToY(lookupPressure) :
                  bubblePressure !== undefined ? pressureToY(bubblePressure) : 0;

  return (
    <CalculatorSVG
      title="Refrigerant PT Relationship"
      description="Pressure-temperature saturation curve"
      aspectRatio="wide"
    >
      <svg
        viewBox="0 0 400 200"
        className="w-full h-full"
        preserveAspectRatio="xMidYMid meet"
      >
        {/* Background */}
        <rect width="400" height="200" fill="#f8fafc" />

        {/* Chart area background */}
        <rect x={45} y={25} width={195} height={125} fill="white" stroke={SVG_COLORS.strokeLight} strokeWidth={1} />

        {/* Phase regions */}
        <defs>
          <linearGradient id="liquid-region" x1="0%" y1="100%" x2="100%" y2="0%">
            <stop offset="0%" stopColor={SVG_COLORS.cold} stopOpacity={0.2} />
            <stop offset="100%" stopColor={SVG_COLORS.cold} stopOpacity={0.05} />
          </linearGradient>
          <linearGradient id="vapor-region" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor={SVG_COLORS.heat} stopOpacity={0.05} />
            <stop offset="100%" stopColor={SVG_COLORS.heat} stopOpacity={0.2} />
          </linearGradient>
        </defs>

        {/* Liquid region (below/left of curve) */}
        <path
          d="M50,150 L50,135 Q80,120 110,100 T170,60 Q200,45 230,30 L230,150 Z"
          fill="url(#liquid-region)"
        />

        {/* Vapor region indicator */}
        <path
          d="M50,25 L50,135 Q80,120 110,100 T170,60 Q200,45 230,30 L230,25 Z"
          fill="url(#vapor-region)"
        />

        {/* Region labels */}
        <text x={75} y={125} fontSize="9" fill={SVG_COLORS.cold} fontWeight="bold">
          LIQUID
        </text>
        <text x={180} y={45} fontSize="9" fill={SVG_COLORS.heat} fontWeight="bold">
          VAPOR
        </text>

        {/* Saturation curve */}
        <path
          d={curvePath}
          fill="none"
          stroke={SVG_COLORS.primary}
          strokeWidth={3}
          strokeLinecap="round"
        />

        {/* Glide band for zeotropes */}
        {hasGlide && (
          <path
            d="M50,138 Q80,123 110,103 T170,63 Q200,48 230,33"
            fill="none"
            stroke={SVG_COLORS.primary}
            strokeWidth={2}
            strokeDasharray="4,2"
            opacity={0.6}
          />
        )}

        {/* Axes */}
        <line x1={50} y1={150} x2={240} y2={150} stroke={SVG_COLORS.stroke} strokeWidth={1.5} />
        <line x1={50} y1={25} x2={50} y2={150} stroke={SVG_COLORS.stroke} strokeWidth={1.5} />

        {/* X-axis labels (Temperature) */}
        <text x={145} y={168} fontSize="9" fill={SVG_COLORS.text} textAnchor="middle" fontWeight="bold">
          Temperature (°F)
        </text>
        {[-40, 0, 50, 100, 150].map((temp) => (
          <g key={temp}>
            <line x1={tempToX(temp)} y1={150} x2={tempToX(temp)} y2={153} stroke={SVG_COLORS.stroke} />
            <text x={tempToX(temp)} y={162} fontSize="7" fill={SVG_COLORS.textLight} textAnchor="middle">
              {temp}
            </text>
          </g>
        ))}

        {/* Y-axis labels (Pressure) */}
        <text x={25} y={90} fontSize="9" fill={SVG_COLORS.text} textAnchor="middle" fontWeight="bold" transform="rotate(-90, 25, 90)">
          Pressure (psig)
        </text>
        {[0, 100, 200, 300, 400, 500].map((pressure) => (
          <g key={pressure}>
            <line x1={47} y1={pressureToY(pressure)} x2={50} y2={pressureToY(pressure)} stroke={SVG_COLORS.stroke} />
            <text x={44} y={pressureToY(pressure) + 3} fontSize="7" fill={SVG_COLORS.textLight} textAnchor="end">
              {pressure}
            </text>
          </g>
        ))}

        {/* Lookup point marker */}
        {hasLookup && (
          <g>
            {/* Crosshairs */}
            <line
              x1={lookupX}
              y1={150}
              x2={lookupX}
              y2={lookupY}
              stroke={SVG_COLORS.accent}
              strokeWidth={1}
              strokeDasharray="3,2"
            />
            <line
              x1={50}
              y1={lookupY}
              x2={lookupX}
              y2={lookupY}
              stroke={SVG_COLORS.accent}
              strokeWidth={1}
              strokeDasharray="3,2"
            />
            {/* Point */}
            <circle
              cx={lookupX}
              cy={lookupY}
              r={6}
              fill={SVG_COLORS.accent}
              stroke="white"
              strokeWidth={2}
            />

            {/* Dew point marker for zeotropes */}
            {hasGlide && dewPressure !== undefined && (
              <circle
                cx={lookupX}
                cy={pressureToY(dewPressure)}
                r={4}
                fill={SVG_COLORS.heat}
                stroke="white"
                strokeWidth={1.5}
              />
            )}
          </g>
        )}

        {/* Refrigerant info panel */}
        <g transform="translate(255, 20)">
          <rect x={0} y={0} width={130} height={95} fill="white" stroke={SVG_COLORS.strokeLight} rx={6} />

          {/* Name */}
          <text x={65} y={20} fontSize="14" fill={SVG_COLORS.text} fontWeight="bold" textAnchor="middle">
            {refrigerantName}
          </text>

          {/* Safety class badge */}
          <rect x={10} y={30} width={110} height={18} fill={getSafetyColor()} opacity={0.2} rx={3} />
          <text x={65} y={43} fontSize="10" fill={getSafetyColor()} fontWeight="bold" textAnchor="middle">
            Safety: {safetyClass}
          </text>

          {/* GWP */}
          <g transform="translate(10, 55)">
            <text x={0} y={0} fontSize="8" fill={SVG_COLORS.textLight}>GWP</text>
            <text x={105} y={0} fontSize="10" fill={SVG_COLORS.text} fontWeight="bold" textAnchor="end">
              {gwp?.toLocaleString() ?? '—'}
            </text>
          </g>

          {/* Glide */}
          <g transform="translate(10, 72)">
            <text x={0} y={0} fontSize="8" fill={SVG_COLORS.textLight}>Glide</text>
            <text x={105} y={0} fontSize="10" fill={hasGlide ? SVG_COLORS.warning : SVG_COLORS.text} fontWeight="bold" textAnchor="end">
              {glide ?? '0°F'}
            </text>
          </g>
        </g>

        {/* Lookup result panel */}
        {hasLookup && (
          <g transform="translate(255, 125)">
            <rect x={0} y={0} width={130} height={60} fill={SVG_COLORS.accentLight} stroke={SVG_COLORS.accent} rx={6} />

            <text x={65} y={16} fontSize="9" fill={SVG_COLORS.text} fontWeight="bold" textAnchor="middle">
              @ {lookupTemp}°F
            </text>

            {!hasGlide ? (
              <text x={65} y={40} fontSize="16" fill={SVG_COLORS.accent} fontWeight="bold" textAnchor="middle">
                {lookupPressure?.toFixed(1)} psig
              </text>
            ) : (
              <g>
                <text x={35} y={35} fontSize="7" fill={SVG_COLORS.textLight} textAnchor="middle">Bubble</text>
                <text x={35} y={50} fontSize="11" fill={SVG_COLORS.accent} fontWeight="bold" textAnchor="middle">
                  {bubblePressure?.toFixed(1)}
                </text>
                <text x={95} y={35} fontSize="7" fill={SVG_COLORS.textLight} textAnchor="middle">Dew</text>
                <text x={95} y={50} fontSize="11" fill={SVG_COLORS.heat} fontWeight="bold" textAnchor="middle">
                  {dewPressure?.toFixed(1)}
                </text>
              </g>
            )}
          </g>
        )}

        {/* Legend */}
        <g transform="translate(255, 125)" style={{ display: hasLookup ? 'none' : 'block' }}>
          <text x={0} y={15} fontSize="8" fill={SVG_COLORS.textLight}>
            <tspan fontWeight="bold">Superheat:</tspan> Suction T - Sat T
          </text>
          <text x={0} y={30} fontSize="8" fill={SVG_COLORS.textLight}>
            <tspan fontWeight="bold">Subcooling:</tspan> Sat T - Liquid T
          </text>
          {hasGlide && (
            <g>
              <line x1={0} y1={45} x2={20} y2={45} stroke={SVG_COLORS.primary} strokeWidth={2} />
              <text x={25} y={48} fontSize="7" fill={SVG_COLORS.textLight}>Bubble</text>
              <line x1={0} y1={58} x2={20} y2={58} stroke={SVG_COLORS.primary} strokeWidth={2} strokeDasharray="4,2" />
              <text x={25} y={61} fontSize="7" fill={SVG_COLORS.textLight}>Dew</text>
            </g>
          )}
        </g>

        {/* Saturation curve label */}
        <text x={200} y={75} fontSize="8" fill={SVG_COLORS.primary} fontWeight="bold" transform="rotate(-25, 200, 75)">
          Saturation
        </text>

        {/* Safety indicators */}
        {safetyClass === 'A2L' && (
          <g transform="translate(50, 180)">
            <text x={0} y={0} fontSize="7" fill={SVG_COLORS.warning}>
              ⚠ A2L: Mildly flammable - requires certified equipment
            </text>
          </g>
        )}
        {safetyClass === 'A3' && (
          <g transform="translate(50, 180)">
            <text x={0} y={0} fontSize="7" fill={SVG_COLORS.danger}>
              ⚠ A3: Highly flammable - strict charge limits apply
            </text>
          </g>
        )}
      </svg>
    </CalculatorSVG>
  );
}
