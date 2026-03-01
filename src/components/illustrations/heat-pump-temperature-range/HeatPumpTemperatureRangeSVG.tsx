'use client';

import { SVG_COLORS } from '../../calculators/CalculatorSVG';

/**
 * Illustration showing heat pump operating temperature ranges
 */
export default function HeatPumpTemperatureRangeSVG() {
  return (
    <div className="w-full bg-slate-50 border border-slate-200 rounded-lg overflow-hidden">
      <svg
        viewBox="0 0 600 280"
        className="w-full h-auto"
        preserveAspectRatio="xMidYMid meet"
        role="img"
        aria-label="Heat pump operating temperature range diagram"
      >
        <rect width="600" height="280" fill="#f8fafc" />

        <text x="300" y="25" fontSize="14" fontWeight="bold" fill={SVG_COLORS.text} textAnchor="middle">
          Heat Pump Operating Temperature Ranges
        </text>

        {/* Temperature scale */}
        <g transform="translate(50, 60)">
          {/* Scale bar */}
          <rect x="0" y="40" width="500" height="30" fill="#f1f5f9" rx="4" />

          {/* Temperature zones */}
          <rect x="0" y="40" width="100" height="30" fill="#fecaca" rx="4" />
          <rect x="100" y="40" width="100" height="30" fill="#fef3c7" />
          <rect x="200" y="40" width="200" height="30" fill="#dcfce7" />
          <rect x="400" y="40" width="100" height="30" fill="#dbeafe" rx="4" />

          {/* Temperature labels */}
          <text x="0" y="35" fontSize="8" fill={SVG_COLORS.textLight}>-20°F</text>
          <text x="100" y="35" fontSize="8" fill={SVG_COLORS.textLight}>0°F</text>
          <text x="200" y="35" fontSize="8" fill={SVG_COLORS.textLight}>25°F</text>
          <text x="300" y="35" fontSize="8" fill={SVG_COLORS.textLight}>50°F</text>
          <text x="400" y="35" fontSize="8" fill={SVG_COLORS.textLight}>70°F</text>
          <text x="500" y="35" fontSize="8" fill={SVG_COLORS.textLight}>100°F+</text>

          {/* Zone labels */}
          <text x="50" y="60" fontSize="8" fill="#b91c1c" textAnchor="middle" fontWeight="bold">Backup</text>
          <text x="150" y="60" fontSize="8" fill="#d97706" textAnchor="middle" fontWeight="bold">Limited</text>
          <text x="300" y="60" fontSize="8" fill="#15803d" textAnchor="middle" fontWeight="bold">Optimal Range</text>
          <text x="450" y="60" fontSize="8" fill={SVG_COLORS.cold} textAnchor="middle" fontWeight="bold">Cooling</text>
        </g>

        {/* Heat pump types comparison */}
        <g transform="translate(50, 140)">
          <text x="0" y="0" fontSize="11" fontWeight="bold" fill={SVG_COLORS.text}>Heat Pump Types:</text>

          {/* Standard heat pump */}
          <g transform="translate(0, 20)">
            <rect x="0" y="0" width="240" height="45" rx="4" fill="white" stroke={SVG_COLORS.stroke} strokeWidth="1.5" />
            <text x="15" y="18" fontSize="9" fontWeight="bold" fill={SVG_COLORS.text}>Standard Heat Pump</text>
            <text x="15" y="32" fontSize="8" fill={SVG_COLORS.textLight}>Effective range: 25°F to 100°F</text>
            <rect x="100" y="38" width="130" height="4" fill="#dcfce7" rx="2" />
          </g>

          {/* Cold climate heat pump */}
          <g transform="translate(260, 20)">
            <rect x="0" y="0" width="240" height="45" rx="4" fill="white" stroke="#15803d" strokeWidth="1.5" />
            <text x="15" y="18" fontSize="9" fontWeight="bold" fill="#15803d">Cold Climate Heat Pump</text>
            <text x="15" y="32" fontSize="8" fill={SVG_COLORS.textLight}>Effective range: -15°F to 100°F</text>
            <rect x="50" y="38" width="180" height="4" fill="#15803d" rx="2" />
          </g>

          {/* Mini-split */}
          <g transform="translate(0, 75)">
            <rect x="0" y="0" width="240" height="45" rx="4" fill="white" stroke={SVG_COLORS.cold} strokeWidth="1.5" />
            <text x="15" y="18" fontSize="9" fontWeight="bold" fill={SVG_COLORS.cold}>Ductless Mini-Split</text>
            <text x="15" y="32" fontSize="8" fill={SVG_COLORS.textLight}>Effective range: 5°F to 115°F</text>
            <rect x="80" y="38" width="150" height="4" fill={SVG_COLORS.cold} rx="2" />
          </g>

          {/* Geothermal */}
          <g transform="translate(260, 75)">
            <rect x="0" y="0" width="240" height="45" rx="4" fill="white" stroke="#7c3aed" strokeWidth="1.5" />
            <text x="15" y="18" fontSize="9" fontWeight="bold" fill="#7c3aed">Geothermal Heat Pump</text>
            <text x="15" y="32" fontSize="8" fill={SVG_COLORS.textLight}>Works at any outdoor temp!</text>
            <rect x="30" y="38" width="200" height="4" fill="#7c3aed" rx="2" />
          </g>
        </g>

        {/* Bottom note */}
        <g transform="translate(80, 260)">
          <rect x="0" y="0" width="440" height="18" rx="4" fill={SVG_COLORS.accentLight} />
          <text x="220" y="13" fontSize="9" fill={SVG_COLORS.accent} textAnchor="middle" fontWeight="bold">
            Below effective range: Heat pump runs but uses auxiliary/backup heat
          </text>
        </g>
      </svg>
    </div>
  );
}
