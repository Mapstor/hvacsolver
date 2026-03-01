'use client';

import { SVG_COLORS } from '../../calculators/CalculatorSVG';

/**
 * Illustration comparing DOE SACC vs ASHRAE BTU ratings
 */
export default function BTUSaccVsAshraeSVG() {
  return (
    <div className="w-full bg-slate-50 border border-slate-200 rounded-lg overflow-hidden">
      <svg
        viewBox="0 0 600 300"
        className="w-full h-auto"
        preserveAspectRatio="xMidYMid meet"
        role="img"
        aria-label="Comparison of DOE SACC vs ASHRAE BTU ratings for portable ACs"
      >
        <rect width="600" height="300" fill="#f8fafc" />

        <text x="300" y="25" fontSize="14" fontWeight="bold" fill={SVG_COLORS.text} textAnchor="middle">
          Portable AC Ratings: ASHRAE vs DOE (SACC)
        </text>

        {/* Same portable AC unit */}
        <g transform="translate(230, 55)">
          <rect x="0" y="0" width="140" height="100" rx="8" fill="white" stroke={SVG_COLORS.stroke} strokeWidth="2" />
          <rect x="20" y="15" width="100" height="40" fill="#e2e8f0" rx="4" />
          <text x="70" y="40" fontSize="9" fill={SVG_COLORS.text} textAnchor="middle">Portable AC</text>
          <rect x="40" y="65" width="60" height="25" fill={SVG_COLORS.cold} rx="4" />
          <text x="70" y="82" fontSize="8" fill="white" textAnchor="middle">Same unit</text>
        </g>

        {/* Arrows pointing to both ratings */}
        <path d="M 220,105 L 150,150" stroke={SVG_COLORS.stroke} strokeWidth="2" fill="none" />
        <path d="M 380,105 L 450,150" stroke={SVG_COLORS.stroke} strokeWidth="2" fill="none" />

        {/* ASHRAE Rating (left) - inflated */}
        <g transform="translate(40, 155)">
          <rect x="0" y="0" width="200" height="115" rx="8" fill="white" stroke="#d97706" strokeWidth="2" />
          <rect x="0" y="0" width="200" height="28" rx="8" fill="#d97706" />
          <rect x="0" y="20" width="200" height="8" fill="#d97706" />
          <text x="100" y="19" fontSize="10" fontWeight="bold" fill="white" textAnchor="middle">
            ASHRAE Rating
          </text>
          <text x="100" y="50" fontSize="8" fill={SVG_COLORS.textLight} textAnchor="middle">(Old method - marketing number)</text>

          {/* Big inflated number */}
          <text x="100" y="85" fontSize="28" fontWeight="bold" fill="#d97706" textAnchor="middle">
            12,000 BTU
          </text>

          <text x="100" y="105" fontSize="8" fill={SVG_COLORS.textLight} textAnchor="middle">
            Measures only raw cooling output
          </text>
        </g>

        {/* DOE SACC Rating (right) - realistic */}
        <g transform="translate(360, 155)">
          <rect x="0" y="0" width="200" height="115" rx="8" fill="white" stroke="#15803d" strokeWidth="2" />
          <rect x="0" y="0" width="200" height="28" rx="8" fill="#15803d" />
          <rect x="0" y="20" width="200" height="8" fill="#15803d" />
          <text x="100" y="19" fontSize="10" fontWeight="bold" fill="white" textAnchor="middle">
            DOE SACC Rating
          </text>
          <text x="100" y="50" fontSize="8" fill={SVG_COLORS.textLight} textAnchor="middle">(New method - realistic)</text>

          {/* Smaller realistic number */}
          <text x="100" y="85" fontSize="28" fontWeight="bold" fill="#15803d" textAnchor="middle">
            7,500 BTU
          </text>

          <text x="100" y="105" fontSize="8" fill={SVG_COLORS.textLight} textAnchor="middle">
            Accounts for heat from exhaust hose
          </text>
        </g>

        {/* Comparison insight */}
        <g transform="translate(100, 280)">
          <rect x="0" y="0" width="400" height="15" rx="4" fill={SVG_COLORS.accentLight} />
          <text x="200" y="11" fontSize="9" fill={SVG_COLORS.accent} textAnchor="middle" fontWeight="bold">
            SACC is 30-40% lower than ASHRAE — use SACC for accurate room sizing
          </text>
        </g>
      </svg>
    </div>
  );
}
