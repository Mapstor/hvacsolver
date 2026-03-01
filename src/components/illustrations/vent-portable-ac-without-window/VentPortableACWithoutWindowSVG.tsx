'use client';

import { SVG_COLORS } from '../../calculators/CalculatorSVG';

/**
 * Illustration showing ways to vent a portable AC without a window
 */
export default function VentPortableACWithoutWindowSVG() {
  return (
    <div className="w-full bg-slate-50 border border-slate-200 rounded-lg overflow-hidden">
      <svg
        viewBox="0 0 600 300"
        className="w-full h-auto"
        preserveAspectRatio="xMidYMid meet"
        role="img"
        aria-label="Portable AC venting alternatives diagram"
      >
        <rect width="600" height="300" fill="#f8fafc" />

        <text x="300" y="25" fontSize="14" fontWeight="bold" fill={SVG_COLORS.text} textAnchor="middle">
          How to Vent a Portable AC Without a Window
        </text>

        {/* Option 1: Sliding Door */}
        <g transform="translate(30, 55)">
          <rect x="0" y="0" width="165" height="135" rx="6" fill="white" stroke={SVG_COLORS.stroke} strokeWidth="1.5" />

          {/* Door illustration */}
          <g transform="translate(15, 15)">
            <rect x="0" y="0" width="45" height="70" fill="#94a3b8" stroke="#64748b" strokeWidth="1" />
            <rect x="45" y="0" width="45" height="70" fill="#cbd5e1" stroke="#64748b" strokeWidth="1" />
            {/* Vent kit */}
            <rect x="35" y="10" width="20" height="50" fill="#f97316" rx="2" />
            <circle cx="45" cy="35" r="8" fill="#64748b" />
          </g>

          <text x="82" y="105" fontSize="10" fontWeight="bold" fill={SVG_COLORS.text} textAnchor="middle">
            Sliding Door Kit
          </text>
          <text x="82" y="118" fontSize="8" fill={SVG_COLORS.textLight} textAnchor="middle">
            Works like window kit
          </text>
          <text x="82" y="130" fontSize="8" fill="#15803d" textAnchor="middle">
            Best option
          </text>
        </g>

        {/* Option 2: Drop Ceiling */}
        <g transform="translate(215, 55)">
          <rect x="0" y="0" width="165" height="135" rx="6" fill="white" stroke={SVG_COLORS.stroke} strokeWidth="1.5" />

          {/* Ceiling illustration */}
          <g transform="translate(15, 15)">
            <rect x="0" y="0" width="90" height="15" fill="#e2e8f0" stroke="#94a3b8" strokeWidth="1" />
            <rect x="35" y="0" width="20" height="15" fill="#94a3b8" />
            {/* Hose going up */}
            <rect x="40" y="15" width="10" height="40" fill="#64748b" />
            {/* AC unit */}
            <rect x="25" y="55" width="40" height="30" fill="#475569" rx="2" />
          </g>

          <text x="82" y="105" fontSize="10" fontWeight="bold" fill={SVG_COLORS.text} textAnchor="middle">
            Drop Ceiling
          </text>
          <text x="82" y="118" fontSize="8" fill={SVG_COLORS.textLight} textAnchor="middle">
            Vent into plenum space
          </text>
          <text x="82" y="130" fontSize="8" fill="#d97706" textAnchor="middle">
            Check codes first
          </text>
        </g>

        {/* Option 3: Wall Vent */}
        <g transform="translate(400, 55)">
          <rect x="0" y="0" width="165" height="135" rx="6" fill="white" stroke={SVG_COLORS.stroke} strokeWidth="1.5" />

          {/* Wall illustration */}
          <g transform="translate(15, 15)">
            <rect x="0" y="0" width="90" height="70" fill="#e2e8f0" stroke="#94a3b8" strokeWidth="1" />
            {/* Vent hole */}
            <circle cx="70" cy="35" r="12" fill="#94a3b8" />
            <circle cx="70" cy="35" r="8" fill="#64748b" />
            {/* Hose */}
            <line x1="30" y1="55" x2="62" y2="40" stroke="#64748b" strokeWidth="8" />
          </g>

          <text x="82" y="105" fontSize="10" fontWeight="bold" fill={SVG_COLORS.text} textAnchor="middle">
            Wall Vent
          </text>
          <text x="82" y="118" fontSize="8" fill={SVG_COLORS.textLight} textAnchor="middle">
            Permanent dryer-style vent
          </text>
          <text x="82" y="130" fontSize="8" fill="#15803d" textAnchor="middle">
            Most efficient
          </text>
        </g>

        {/* NOT recommended */}
        <g transform="translate(50, 205)">
          <rect x="0" y="0" width="500" height="75" rx="6" fill="#fef2f2" stroke="#b91c1c" strokeWidth="1" />
          <text x="250" y="20" fontSize="10" fontWeight="bold" fill="#b91c1c" textAnchor="middle">
            Not Recommended:
          </text>

          <g transform="translate(30, 35)">
            <text x="0" y="12" fontSize="8" fill={SVG_COLORS.textLight}>• Into another room (just moves heat)</text>
            <text x="220" y="12" fontSize="8" fill={SVG_COLORS.textLight}>• Into attic without proper vent (moisture issues)</text>
          </g>

          <g transform="translate(30, 50)">
            <text x="0" y="12" fontSize="8" fill={SVG_COLORS.textLight}>• Into chimney (blocked airflow)</text>
            <text x="220" y="12" fontSize="8" fill={SVG_COLORS.textLight}>• Running unvented (AC won&apos;t cool)</text>
          </g>
        </g>
      </svg>
    </div>
  );
}
