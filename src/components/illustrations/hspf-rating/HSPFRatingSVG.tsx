'use client';

import { SVG_COLORS } from '../../calculators/CalculatorSVG';

/**
 * Illustration explaining HSPF rating for heat pumps
 */
export default function HSPFRatingSVG() {
  return (
    <div className="w-full bg-slate-50 border border-slate-200 rounded-lg overflow-hidden">
      <svg
        viewBox="0 0 600 300"
        className="w-full h-auto"
        preserveAspectRatio="xMidYMid meet"
        role="img"
        aria-label="HSPF rating explanation diagram"
      >
        <rect width="600" height="300" fill="#f8fafc" />

        <text x="300" y="25" fontSize="14" fontWeight="bold" fill={SVG_COLORS.text} textAnchor="middle">
          HSPF Rating Explained (Heat Pump Heating Efficiency)
        </text>

        {/* Formula section */}
        <g transform="translate(50, 50)">
          <rect x="0" y="0" width="220" height="70" rx="6" fill="white" stroke={SVG_COLORS.cold} strokeWidth="2" />
          <text x="110" y="22" fontSize="10" fontWeight="bold" fill={SVG_COLORS.cold} textAnchor="middle">HSPF Formula</text>

          <text x="110" y="48" fontSize="14" fontWeight="bold" fill={SVG_COLORS.text} textAnchor="middle">
            BTU ÷ Watt-hours = HSPF
          </text>
          <text x="110" y="64" fontSize="8" fill={SVG_COLORS.textLight} textAnchor="middle">
            Total heating output ÷ Total electricity used
          </text>
        </g>

        {/* Example calculation */}
        <g transform="translate(290, 50)">
          <rect x="0" y="0" width="260" height="70" rx="6" fill="#dcfce7" stroke="#15803d" strokeWidth="1" />
          <text x="130" y="22" fontSize="10" fontWeight="bold" fill="#15803d" textAnchor="middle">Example Calculation</text>

          <text x="130" y="42" fontSize="11" fill={SVG_COLORS.text} textAnchor="middle">
            36,000,000 BTU ÷ 4,000,000 Wh
          </text>
          <text x="130" y="60" fontSize="12" fontWeight="bold" fill="#15803d" textAnchor="middle">
            = HSPF 9.0
          </text>
        </g>

        {/* Rating scale */}
        <g transform="translate(50, 140)">
          <text x="0" y="0" fontSize="11" fontWeight="bold" fill={SVG_COLORS.text}>HSPF Rating Scale:</text>

          {/* Scale bar */}
          <g transform="translate(0, 20)">
            <rect x="0" y="0" width="100" height="30" fill="#fecaca" rx="4" />
            <rect x="100" y="0" width="100" height="30" fill="#fef3c7" />
            <rect x="200" y="0" width="100" height="30" fill="#dcfce7" />
            <rect x="300" y="0" width="100" height="30" fill="#15803d" />
            <rect x="400" y="0" width="100" height="30" fill="#166534" rx="4" />

            <text x="50" y="20" fontSize="10" fill="#b91c1c" textAnchor="middle" fontWeight="bold">6-7</text>
            <text x="150" y="20" fontSize="10" fill="#d97706" textAnchor="middle" fontWeight="bold">7-8</text>
            <text x="250" y="20" fontSize="10" fill="#15803d" textAnchor="middle" fontWeight="bold">8-9</text>
            <text x="350" y="20" fontSize="10" fill="white" textAnchor="middle" fontWeight="bold">9-10</text>
            <text x="450" y="20" fontSize="10" fill="white" textAnchor="middle" fontWeight="bold">10+</text>
          </g>

          {/* Labels */}
          <g transform="translate(0, 60)">
            <text x="50" y="0" fontSize="8" fill={SVG_COLORS.textLight} textAnchor="middle">Old/Poor</text>
            <text x="150" y="0" fontSize="8" fill={SVG_COLORS.textLight} textAnchor="middle">Minimum</text>
            <text x="250" y="0" fontSize="8" fill={SVG_COLORS.textLight} textAnchor="middle">Good</text>
            <text x="350" y="0" fontSize="8" fill={SVG_COLORS.textLight} textAnchor="middle">Excellent</text>
            <text x="450" y="0" fontSize="8" fill={SVG_COLORS.textLight} textAnchor="middle">Premium</text>
          </g>

          {/* Energy Star marker */}
          <g transform="translate(235, 30)">
            <line x1="0" y1="0" x2="0" y2="20" stroke="#15803d" strokeWidth="2" />
            <text x="0" y="35" fontSize="8" fill="#15803d" textAnchor="middle" fontWeight="bold">ENERGY STAR</text>
            <text x="0" y="45" fontSize="7" fill={SVG_COLORS.textLight} textAnchor="middle">Min 8.5</text>
          </g>
        </g>

        {/* HSPF vs HSPF2 */}
        <g transform="translate(50, 230)">
          <rect x="0" y="0" width="500" height="55" rx="6" fill="white" stroke={SVG_COLORS.stroke} strokeWidth="1" />
          <text x="250" y="20" fontSize="10" fontWeight="bold" fill={SVG_COLORS.text} textAnchor="middle">
            HSPF vs HSPF2 (2023 Update)
          </text>
          <text x="250" y="38" fontSize="9" fill={SVG_COLORS.textLight} textAnchor="middle">
            HSPF2 uses more realistic testing • Ratings appear ~15% lower than HSPF
          </text>
          <text x="250" y="50" fontSize="8" fill={SVG_COLORS.textLight} textAnchor="middle">
            Example: HSPF 10 ≈ HSPF2 8.5 • Both represent same actual efficiency
          </text>
        </g>
      </svg>
    </div>
  );
}
