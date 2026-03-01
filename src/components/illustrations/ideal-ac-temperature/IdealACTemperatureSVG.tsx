'use client';

import { SVG_COLORS } from '../../calculators/CalculatorSVG';

/**
 * Illustration showing ideal AC temperature settings
 */
export default function IdealACTemperatureSVG() {
  return (
    <div className="w-full bg-slate-50 border border-slate-200 rounded-lg overflow-hidden">
      <svg
        viewBox="0 0 600 300"
        className="w-full h-auto"
        preserveAspectRatio="xMidYMid meet"
        role="img"
        aria-label="Ideal AC temperature settings diagram"
      >
        <rect width="600" height="300" fill="#f8fafc" />

        <text x="300" y="25" fontSize="14" fontWeight="bold" fill={SVG_COLORS.text} textAnchor="middle">
          Ideal AC Temperature Settings
        </text>

        {/* Main thermostat dial */}
        <g transform="translate(80, 60)">
          <circle cx="80" cy="80" r="75" fill="white" stroke={SVG_COLORS.stroke} strokeWidth="2" />
          <circle cx="80" cy="80" r="60" fill="#f1f5f9" stroke={SVG_COLORS.stroke} strokeWidth="1" />

          {/* Temperature markers */}
          <text x="80" y="20" fontSize="8" fill={SVG_COLORS.textLight} textAnchor="middle">72°F</text>
          <text x="140" y="45" fontSize="8" fill={SVG_COLORS.textLight} textAnchor="middle">74°F</text>
          <text x="155" y="85" fontSize="8" fill={SVG_COLORS.textLight} textAnchor="middle">76°F</text>
          <text x="140" y="120" fontSize="8" fill={SVG_COLORS.textLight} textAnchor="middle">78°F</text>
          <text x="80" y="145" fontSize="8" fill={SVG_COLORS.textLight} textAnchor="middle">80°F</text>

          {/* Ideal indicator at 78 */}
          <circle cx="80" cy="80" r="25" fill="#dcfce7" stroke="#15803d" strokeWidth="2" />
          <text x="80" y="76" fontSize="16" fontWeight="bold" fill="#15803d" textAnchor="middle">78°F</text>
          <text x="80" y="92" fontSize="8" fill="#15803d" textAnchor="middle">IDEAL</text>
        </g>

        {/* Temperature recommendations */}
        <g transform="translate(250, 55)">
          <text x="0" y="0" fontSize="11" fontWeight="bold" fill={SVG_COLORS.text}>DOE Recommendations:</text>

          <g transform="translate(0, 20)">
            <rect x="0" y="0" width="145" height="60" rx="4" fill="#dcfce7" stroke="#15803d" strokeWidth="1" />
            <text x="72" y="18" fontSize="9" fontWeight="bold" fill="#15803d" textAnchor="middle">When Home</text>
            <text x="72" y="40" fontSize="16" fontWeight="bold" fill="#15803d" textAnchor="middle">78°F</text>
            <text x="72" y="54" fontSize="7" fill={SVG_COLORS.textLight} textAnchor="middle">Best balance of comfort/cost</text>
          </g>

          <g transform="translate(155, 20)">
            <rect x="0" y="0" width="145" height="60" rx="4" fill="#fef3c7" stroke="#d97706" strokeWidth="1" />
            <text x="72" y="18" fontSize="9" fontWeight="bold" fill="#d97706" textAnchor="middle">Away (8+ hrs)</text>
            <text x="72" y="40" fontSize="16" fontWeight="bold" fill="#d97706" textAnchor="middle">85°F</text>
            <text x="72" y="54" fontSize="7" fill={SVG_COLORS.textLight} textAnchor="middle">or off if 8+ hours</text>
          </g>

          <g transform="translate(0, 90)">
            <rect x="0" y="0" width="145" height="60" rx="4" fill="#dbeafe" stroke={SVG_COLORS.cold} strokeWidth="1" />
            <text x="72" y="18" fontSize="9" fontWeight="bold" fill={SVG_COLORS.cold} textAnchor="middle">Sleeping</text>
            <text x="72" y="40" fontSize="16" fontWeight="bold" fill={SVG_COLORS.cold} textAnchor="middle">75-78°F</text>
            <text x="72" y="54" fontSize="7" fill={SVG_COLORS.textLight} textAnchor="middle">Slightly warmer is fine</text>
          </g>

          <g transform="translate(155, 90)">
            <rect x="0" y="0" width="145" height="60" rx="4" fill="#f3e8ff" stroke="#7c3aed" strokeWidth="1" />
            <text x="72" y="18" fontSize="9" fontWeight="bold" fill="#7c3aed" textAnchor="middle">Max Savings</text>
            <text x="72" y="40" fontSize="16" fontWeight="bold" fill="#7c3aed" textAnchor="middle">82-85°F</text>
            <text x="72" y="54" fontSize="7" fill={SVG_COLORS.textLight} textAnchor="middle">Use ceiling fans</text>
          </g>
        </g>

        {/* Cost savings info */}
        <g transform="translate(50, 200)">
          <rect x="0" y="0" width="500" height="80" rx="6" fill="white" stroke={SVG_COLORS.stroke} strokeWidth="1" />
          <text x="250" y="20" fontSize="11" fontWeight="bold" fill={SVG_COLORS.text} textAnchor="middle">
            Energy Savings Per Degree Higher
          </text>

          <g transform="translate(30, 35)">
            <rect x="0" y="0" width="80" height="35" rx="4" fill="#dcfce7" />
            <text x="40" y="18" fontSize="14" fontWeight="bold" fill="#15803d" textAnchor="middle">1°F</text>
            <text x="40" y="30" fontSize="8" fill={SVG_COLORS.textLight} textAnchor="middle">= 3% savings</text>
          </g>

          <g transform="translate(130, 35)">
            <rect x="0" y="0" width="100" height="35" rx="4" fill="#dcfce7" />
            <text x="50" y="18" fontSize="14" fontWeight="bold" fill="#15803d" textAnchor="middle">72→78°F</text>
            <text x="50" y="30" fontSize="8" fill={SVG_COLORS.textLight} textAnchor="middle">= 18% savings</text>
          </g>

          <g transform="translate(250, 35)">
            <rect x="0" y="0" width="200" height="35" rx="4" fill={SVG_COLORS.accentLight} />
            <text x="100" y="18" fontSize="12" fontWeight="bold" fill={SVG_COLORS.accent} textAnchor="middle">
              $100-300/year saved
            </text>
            <text x="100" y="30" fontSize="8" fill={SVG_COLORS.textLight} textAnchor="middle">by setting to 78°F vs 72°F</text>
          </g>
        </g>
      </svg>
    </div>
  );
}
