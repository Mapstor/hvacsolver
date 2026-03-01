'use client';

import { SVG_COLORS } from '../../calculators/CalculatorSVG';

/**
 * Illustration showing factors affecting how long it takes to cool a house
 */
export default function HowLongToCoolHouseSVG() {
  return (
    <div className="w-full bg-slate-50 border border-slate-200 rounded-lg overflow-hidden">
      <svg
        viewBox="0 0 600 320"
        className="w-full h-auto"
        preserveAspectRatio="xMidYMid meet"
        role="img"
        aria-label="How long to cool a house diagram"
      >
        <rect width="600" height="320" fill="#f8fafc" />

        <text x="300" y="25" fontSize="14" fontWeight="bold" fill={SVG_COLORS.text} textAnchor="middle">
          How Long Does It Take to Cool a House?
        </text>

        {/* Typical timeframes */}
        <g transform="translate(50, 50)">
          <text x="0" y="0" fontSize="11" fontWeight="bold" fill={SVG_COLORS.text}>Typical Cooling Times:</text>

          {/* Time bars */}
          <g transform="translate(0, 20)">
            <text x="0" y="12" fontSize="9" fill={SVG_COLORS.textLight}>1°F drop</text>
            <rect x="100" y="0" width="60" height="20" fill="#dcfce7" rx="4" />
            <text x="130" y="14" fontSize="9" fill="#15803d" textAnchor="middle" fontWeight="bold">4-5 min</text>
          </g>

          <g transform="translate(0, 50)">
            <text x="0" y="12" fontSize="9" fill={SVG_COLORS.textLight}>5°F drop</text>
            <rect x="100" y="0" width="150" height="20" fill="#dbeafe" rx="4" />
            <text x="175" y="14" fontSize="9" fill={SVG_COLORS.cold} textAnchor="middle" fontWeight="bold">20-30 min</text>
          </g>

          <g transform="translate(0, 80)">
            <text x="0" y="12" fontSize="9" fill={SVG_COLORS.textLight}>10°F drop</text>
            <rect x="100" y="0" width="280" height="20" fill="#fef3c7" rx="4" />
            <text x="240" y="14" fontSize="9" fill="#d97706" textAnchor="middle" fontWeight="bold">1-2 hours</text>
          </g>

          <g transform="translate(0, 110)">
            <text x="0" y="12" fontSize="9" fill={SVG_COLORS.textLight}>20°F drop</text>
            <rect x="100" y="0" width="400" height="20" fill="#fecaca" rx="4" />
            <text x="300" y="14" fontSize="9" fill="#b91c1c" textAnchor="middle" fontWeight="bold">3-5+ hours</text>
          </g>

          {/* Scale */}
          <g transform="translate(100, 140)">
            <line x1="0" y1="0" x2="400" y2="0" stroke={SVG_COLORS.stroke} strokeWidth="1" />
            <text x="0" y="12" fontSize="7" fill={SVG_COLORS.textLight}>0 min</text>
            <text x="100" y="12" fontSize="7" fill={SVG_COLORS.textLight}>1 hr</text>
            <text x="200" y="12" fontSize="7" fill={SVG_COLORS.textLight}>2 hr</text>
            <text x="300" y="12" fontSize="7" fill={SVG_COLORS.textLight}>3 hr</text>
            <text x="400" y="12" fontSize="7" fill={SVG_COLORS.textLight}>4+ hr</text>
          </g>
        </g>

        {/* Factors affecting cooling time */}
        <g transform="translate(50, 215)">
          <text x="0" y="0" fontSize="10" fontWeight="bold" fill={SVG_COLORS.text}>Factors That Slow Cooling:</text>

          <g transform="translate(0, 15)">
            <rect x="0" y="0" width="120" height="55" rx="4" fill="white" stroke={SVG_COLORS.stroke} strokeWidth="1" />
            <text x="60" y="18" fontSize="8" fontWeight="bold" fill={SVG_COLORS.text} textAnchor="middle">Undersized AC</text>
            <text x="60" y="32" fontSize="7" fill={SVG_COLORS.textLight} textAnchor="middle">Can&apos;t keep up</text>
            <text x="60" y="44" fontSize="7" fill={SVG_COLORS.textLight} textAnchor="middle">with heat gain</text>
          </g>

          <g transform="translate(130, 15)">
            <rect x="0" y="0" width="120" height="55" rx="4" fill="white" stroke={SVG_COLORS.stroke} strokeWidth="1" />
            <text x="60" y="18" fontSize="8" fontWeight="bold" fill={SVG_COLORS.text} textAnchor="middle">Poor Insulation</text>
            <text x="60" y="32" fontSize="7" fill={SVG_COLORS.textLight} textAnchor="middle">Heat seeps back</text>
            <text x="60" y="44" fontSize="7" fill={SVG_COLORS.textLight} textAnchor="middle">in through walls</text>
          </g>

          <g transform="translate(260, 15)">
            <rect x="0" y="0" width="120" height="55" rx="4" fill="white" stroke={SVG_COLORS.stroke} strokeWidth="1" />
            <text x="60" y="18" fontSize="8" fontWeight="bold" fill={SVG_COLORS.text} textAnchor="middle">Dirty Filter</text>
            <text x="60" y="32" fontSize="7" fill={SVG_COLORS.textLight} textAnchor="middle">Restricts airflow</text>
            <text x="60" y="44" fontSize="7" fill={SVG_COLORS.textLight} textAnchor="middle">reduces capacity</text>
          </g>

          <g transform="translate(390, 15)">
            <rect x="0" y="0" width="120" height="55" rx="4" fill="white" stroke={SVG_COLORS.stroke} strokeWidth="1" />
            <text x="60" y="18" fontSize="8" fontWeight="bold" fill={SVG_COLORS.text} textAnchor="middle">Direct Sunlight</text>
            <text x="60" y="32" fontSize="7" fill={SVG_COLORS.textLight} textAnchor="middle">Windows add</text>
            <text x="60" y="44" fontSize="7" fill={SVG_COLORS.textLight} textAnchor="middle">significant heat</text>
          </g>
        </g>

        {/* Bottom tip */}
        <g transform="translate(100, 305)">
          <text x="200" y="0" fontSize="8" fill={SVG_COLORS.textLight} textAnchor="middle">
            Rule of thumb: Properly sized AC should cool 1°F every 4-5 minutes in average conditions
          </text>
        </g>
      </svg>
    </div>
  );
}
