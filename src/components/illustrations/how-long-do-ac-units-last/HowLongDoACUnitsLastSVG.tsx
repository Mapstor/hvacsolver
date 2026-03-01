'use client';

import { SVG_COLORS } from '../../calculators/CalculatorSVG';

/**
 * Illustration showing AC unit lifespan and factors
 */
export default function HowLongDoACUnitsLastSVG() {
  return (
    <div className="w-full bg-slate-50 border border-slate-200 rounded-lg overflow-hidden">
      <svg
        viewBox="0 0 600 320"
        className="w-full h-auto"
        preserveAspectRatio="xMidYMid meet"
        role="img"
        aria-label="AC unit lifespan diagram showing typical years and factors"
      >
        <rect width="600" height="320" fill="#f8fafc" />

        <text x="300" y="25" fontSize="14" fontWeight="bold" fill={SVG_COLORS.text} textAnchor="middle">
          How Long Do AC Units Last?
        </text>

        {/* Timeline graphic */}
        <g transform="translate(50, 55)">
          <text x="0" y="0" fontSize="10" fontWeight="bold" fill={SVG_COLORS.text}>Average Lifespan by Type:</text>

          {/* Central AC */}
          <g transform="translate(0, 20)">
            <text x="0" y="12" fontSize="9" fill={SVG_COLORS.textLight}>Central AC</text>
            <rect x="100" y="0" width="300" height="20" fill="#dcfce7" rx="4" />
            <rect x="100" y="0" width="225" height="20" fill="#15803d" rx="4" />
            <text x="212" y="14" fontSize="9" fill="white" textAnchor="middle" fontWeight="bold">15-20 years</text>
            <text x="415" y="14" fontSize="8" fill={SVG_COLORS.textLight}>25 max</text>
          </g>

          {/* Heat Pump */}
          <g transform="translate(0, 50)">
            <text x="0" y="12" fontSize="9" fill={SVG_COLORS.textLight}>Heat Pump</text>
            <rect x="100" y="0" width="240" height="20" fill="#dbeafe" rx="4" />
            <rect x="100" y="0" width="180" height="20" fill={SVG_COLORS.cold} rx="4" />
            <text x="190" y="14" fontSize="9" fill="white" textAnchor="middle" fontWeight="bold">10-15 years</text>
            <text x="355" y="14" fontSize="8" fill={SVG_COLORS.textLight}>20 max</text>
          </g>

          {/* Window AC */}
          <g transform="translate(0, 80)">
            <text x="0" y="12" fontSize="9" fill={SVG_COLORS.textLight}>Window AC</text>
            <rect x="100" y="0" width="180" height="20" fill="#fef3c7" rx="4" />
            <rect x="100" y="0" width="120" height="20" fill="#d97706" rx="4" />
            <text x="160" y="14" fontSize="9" fill="white" textAnchor="middle" fontWeight="bold">8-10 years</text>
            <text x="295" y="14" fontSize="8" fill={SVG_COLORS.textLight}>15 max</text>
          </g>

          {/* Portable AC */}
          <g transform="translate(0, 110)">
            <text x="0" y="12" fontSize="9" fill={SVG_COLORS.textLight}>Portable AC</text>
            <rect x="100" y="0" width="150" height="20" fill="#fecaca" rx="4" />
            <rect x="100" y="0" width="90" height="20" fill="#b91c1c" rx="4" />
            <text x="145" y="14" fontSize="9" fill="white" textAnchor="middle" fontWeight="bold">5-7 years</text>
            <text x="265" y="14" fontSize="8" fill={SVG_COLORS.textLight}>10 max</text>
          </g>

          {/* Scale */}
          <g transform="translate(100, 140)">
            <line x1="0" y1="0" x2="400" y2="0" stroke={SVG_COLORS.stroke} strokeWidth="1" />
            <text x="0" y="12" fontSize="7" fill={SVG_COLORS.textLight}>0</text>
            <text x="80" y="12" fontSize="7" fill={SVG_COLORS.textLight}>5</text>
            <text x="160" y="12" fontSize="7" fill={SVG_COLORS.textLight}>10</text>
            <text x="240" y="12" fontSize="7" fill={SVG_COLORS.textLight}>15</text>
            <text x="320" y="12" fontSize="7" fill={SVG_COLORS.textLight}>20</text>
            <text x="400" y="12" fontSize="7" fill={SVG_COLORS.textLight}>25 years</text>
          </g>
        </g>

        {/* Factors affecting lifespan */}
        <g transform="translate(50, 220)">
          <text x="0" y="0" fontSize="10" fontWeight="bold" fill={SVG_COLORS.text}>Factors That Affect Lifespan:</text>

          <g transform="translate(0, 18)">
            <rect x="0" y="0" width="155" height="50" rx="4" fill="#dcfce7" stroke="#15803d" strokeWidth="1" />
            <text x="77" y="16" fontSize="8" fontWeight="bold" fill="#15803d" textAnchor="middle">Extends Life</text>
            <text x="10" y="30" fontSize="7" fill={SVG_COLORS.textLight}>• Annual maintenance</text>
            <text x="10" y="42" fontSize="7" fill={SVG_COLORS.textLight}>• Clean filters monthly</text>
          </g>

          <g transform="translate(170, 18)">
            <rect x="0" y="0" width="155" height="50" rx="4" fill="#fef3c7" stroke="#d97706" strokeWidth="1" />
            <text x="77" y="16" fontSize="8" fontWeight="bold" fill="#d97706" textAnchor="middle">Varies by Use</text>
            <text x="10" y="30" fontSize="7" fill={SVG_COLORS.textLight}>• Climate (hot = more wear)</text>
            <text x="10" y="42" fontSize="7" fill={SVG_COLORS.textLight}>• Usage hours per day</text>
          </g>

          <g transform="translate(340, 18)">
            <rect x="0" y="0" width="155" height="50" rx="4" fill="#fef2f2" stroke="#b91c1c" strokeWidth="1" />
            <text x="77" y="16" fontSize="8" fontWeight="bold" fill="#b91c1c" textAnchor="middle">Shortens Life</text>
            <text x="10" y="30" fontSize="7" fill={SVG_COLORS.textLight}>• Neglected maintenance</text>
            <text x="10" y="42" fontSize="7" fill={SVG_COLORS.textLight}>• Over/undersized unit</text>
          </g>
        </g>

        {/* Bottom tip */}
        <g transform="translate(150, 305)">
          <text x="150" y="0" fontSize="8" fill={SVG_COLORS.textLight} textAnchor="middle">
            💡 Rule of thumb: If repair costs &gt;50% of new unit and AC is &gt;10 years old → consider replacement
          </text>
        </g>
      </svg>
    </div>
  );
}
