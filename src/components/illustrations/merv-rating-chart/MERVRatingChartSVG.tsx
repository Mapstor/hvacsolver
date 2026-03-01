'use client';

import { SVG_COLORS } from '../../calculators/CalculatorSVG';

/**
 * Illustration showing MERV rating chart for air filters
 */
export default function MERVRatingChartSVG() {
  return (
    <div className="w-full bg-slate-50 border border-slate-200 rounded-lg overflow-hidden">
      <svg
        viewBox="0 0 600 340"
        className="w-full h-auto"
        preserveAspectRatio="xMidYMid meet"
        role="img"
        aria-label="MERV rating chart for air filters"
      >
        <rect width="600" height="340" fill="#f8fafc" />

        <text x="300" y="25" fontSize="14" fontWeight="bold" fill={SVG_COLORS.text} textAnchor="middle">
          MERV Rating Chart — Filter Efficiency Guide
        </text>

        {/* MERV scale */}
        <g transform="translate(50, 50)">
          {/* Scale header */}
          <text x="25" y="0" fontSize="9" fontWeight="bold" fill={SVG_COLORS.textLight} textAnchor="middle">MERV</text>
          <text x="100" y="0" fontSize="9" fontWeight="bold" fill={SVG_COLORS.textLight}>Captures</text>
          <text x="320" y="0" fontSize="9" fontWeight="bold" fill={SVG_COLORS.textLight}>Best For</text>

          {/* MERV 1-4 */}
          <g transform="translate(0, 15)">
            <rect x="0" y="0" width="50" height="30" fill="#fecaca" rx="4" />
            <text x="25" y="20" fontSize="11" fill="#b91c1c" textAnchor="middle" fontWeight="bold">1-4</text>
            <text x="100" y="14" fontSize="8" fill={SVG_COLORS.textLight}>Large particles (10+ μm)</text>
            <text x="100" y="26" fontSize="8" fill={SVG_COLORS.textLight}>Dust, pollen, carpet fibers</text>
            <text x="320" y="20" fontSize="8" fill={SVG_COLORS.textLight}>Basic protection, window AC units</text>
          </g>

          {/* MERV 5-8 */}
          <g transform="translate(0, 55)">
            <rect x="0" y="0" width="50" height="30" fill="#fef3c7" rx="4" />
            <text x="25" y="20" fontSize="11" fill="#d97706" textAnchor="middle" fontWeight="bold">5-8</text>
            <text x="100" y="14" fontSize="8" fill={SVG_COLORS.textLight}>Medium particles (3-10 μm)</text>
            <text x="100" y="26" fontSize="8" fill={SVG_COLORS.textLight}>Mold spores, pet dander, dust mites</text>
            <text x="320" y="20" fontSize="8" fill={SVG_COLORS.textLight}>Residential minimum, most homes</text>
          </g>

          {/* MERV 9-12 */}
          <g transform="translate(0, 95)">
            <rect x="0" y="0" width="50" height="30" fill="#dcfce7" rx="4" />
            <text x="25" y="20" fontSize="11" fill="#15803d" textAnchor="middle" fontWeight="bold">9-12</text>
            <text x="100" y="14" fontSize="8" fill={SVG_COLORS.textLight}>Small particles (1-3 μm)</text>
            <text x="100" y="26" fontSize="8" fill={SVG_COLORS.textLight}>Lead dust, auto emissions, Legionella</text>
            <text x="320" y="20" fontSize="8" fill={SVG_COLORS.textLight}>Allergies, better air quality</text>
          </g>

          {/* MERV 13-16 */}
          <g transform="translate(0, 135)">
            <rect x="0" y="0" width="50" height="30" fill="#15803d" rx="4" />
            <text x="25" y="20" fontSize="11" fill="white" textAnchor="middle" fontWeight="bold">13-16</text>
            <text x="100" y="14" fontSize="8" fill={SVG_COLORS.textLight}>Fine particles (0.3-1 μm)</text>
            <text x="100" y="26" fontSize="8" fill={SVG_COLORS.textLight}>Bacteria, smoke, sneeze droplets</text>
            <text x="320" y="20" fontSize="8" fill={SVG_COLORS.textLight}>Hospitals, severe allergies, smoking</text>
          </g>

          {/* MERV 17-20 (HEPA) */}
          <g transform="translate(0, 175)">
            <rect x="0" y="0" width="50" height="30" fill="#7c3aed" rx="4" />
            <text x="25" y="20" fontSize="10" fill="white" textAnchor="middle" fontWeight="bold">17-20</text>
            <text x="100" y="14" fontSize="8" fill={SVG_COLORS.textLight}>Ultra-fine particles (&lt;0.3 μm)</text>
            <text x="100" y="26" fontSize="8" fill={SVG_COLORS.textLight}>Viruses, carbon dust, sea salt</text>
            <text x="320" y="20" fontSize="8" fill={SVG_COLORS.textLight}>HEPA - cleanrooms, surgical</text>
          </g>
        </g>

        {/* Recommendation box */}
        <g transform="translate(50, 265)">
          <rect x="0" y="0" width="500" height="60" rx="6" fill="white" stroke={SVG_COLORS.stroke} strokeWidth="1" />

          <rect x="0" y="0" width="250" height="60" rx="6" fill="#dcfce7" />
          <text x="125" y="20" fontSize="10" fontWeight="bold" fill="#15803d" textAnchor="middle">Recommended: MERV 8-13</text>
          <text x="125" y="38" fontSize="8" fill={SVG_COLORS.textLight} textAnchor="middle">Best balance of filtration and airflow</text>
          <text x="125" y="52" fontSize="8" fill={SVG_COLORS.textLight} textAnchor="middle">for residential HVAC systems</text>

          <text x="375" y="20" fontSize="10" fontWeight="bold" fill="#b91c1c" textAnchor="middle">Warning: MERV 14+</text>
          <text x="375" y="38" fontSize="8" fill={SVG_COLORS.textLight} textAnchor="middle">May restrict airflow too much</text>
          <text x="375" y="52" fontSize="8" fill={SVG_COLORS.textLight} textAnchor="middle">Check HVAC compatibility first</text>
        </g>
      </svg>
    </div>
  );
}
