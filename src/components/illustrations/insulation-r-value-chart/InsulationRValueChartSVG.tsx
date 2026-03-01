'use client';

import { SVG_COLORS } from '../../calculators/CalculatorSVG';

/**
 * Illustration showing insulation R-values by type
 */
export default function InsulationRValueChartSVG() {
  return (
    <div className="w-full bg-slate-50 border border-slate-200 rounded-lg overflow-hidden">
      <svg
        viewBox="0 0 600 340"
        className="w-full h-auto"
        preserveAspectRatio="xMidYMid meet"
        role="img"
        aria-label="Insulation R-value comparison chart"
      >
        <rect width="600" height="340" fill="#f8fafc" />

        <text x="300" y="25" fontSize="14" fontWeight="bold" fill={SVG_COLORS.text} textAnchor="middle">
          Insulation R-Value Comparison (per inch)
        </text>

        {/* R-value bars */}
        <g transform="translate(50, 50)">
          {/* Header */}
          <text x="0" y="0" fontSize="9" fontWeight="bold" fill={SVG_COLORS.textLight}>Type</text>
          <text x="130" y="0" fontSize="9" fontWeight="bold" fill={SVG_COLORS.textLight}>R-Value/inch</text>
          <text x="350" y="0" fontSize="9" fontWeight="bold" fill={SVG_COLORS.textLight}>Best For</text>

          {/* Spray foam closed-cell */}
          <g transform="translate(0, 15)">
            <text x="0" y="14" fontSize="9" fill={SVG_COLORS.text}>Spray Foam (Closed)</text>
            <rect x="130" y="0" width="180" height="20" fill="#15803d" rx="4" />
            <text x="220" y="14" fontSize="9" fill="white" textAnchor="middle" fontWeight="bold">R-6.0 to R-7.0</text>
            <text x="350" y="14" fontSize="8" fill={SVG_COLORS.textLight}>Exterior, moisture areas</text>
          </g>

          {/* Spray foam open-cell */}
          <g transform="translate(0, 45)">
            <text x="0" y="14" fontSize="9" fill={SVG_COLORS.text}>Spray Foam (Open)</text>
            <rect x="130" y="0" width="100" height="20" fill="#22c55e" rx="4" />
            <text x="180" y="14" fontSize="9" fill="white" textAnchor="middle" fontWeight="bold">R-3.5 to R-4.0</text>
            <text x="350" y="14" fontSize="8" fill={SVG_COLORS.textLight}>Interior walls, sound</text>
          </g>

          {/* Polyiso */}
          <g transform="translate(0, 75)">
            <text x="0" y="14" fontSize="9" fill={SVG_COLORS.text}>Polyisocyanurate</text>
            <rect x="130" y="0" width="160" height="20" fill="#059669" rx="4" />
            <text x="210" y="14" fontSize="9" fill="white" textAnchor="middle" fontWeight="bold">R-5.6 to R-6.5</text>
            <text x="350" y="14" fontSize="8" fill={SVG_COLORS.textLight}>Roof, exterior sheathing</text>
          </g>

          {/* XPS */}
          <g transform="translate(0, 105)">
            <text x="0" y="14" fontSize="9" fill={SVG_COLORS.text}>XPS (Extruded)</text>
            <rect x="130" y="0" width="130" height="20" fill="#10b981" rx="4" />
            <text x="195" y="14" fontSize="9" fill="white" textAnchor="middle" fontWeight="bold">R-5.0</text>
            <text x="350" y="14" fontSize="8" fill={SVG_COLORS.textLight}>Below grade, wet areas</text>
          </g>

          {/* EPS */}
          <g transform="translate(0, 135)">
            <text x="0" y="14" fontSize="9" fill={SVG_COLORS.text}>EPS (Expanded)</text>
            <rect x="130" y="0" width="100" height="20" fill="#34d399" rx="4" />
            <text x="180" y="14" fontSize="9" fill="white" textAnchor="middle" fontWeight="bold">R-3.6 to R-4.2</text>
            <text x="350" y="14" fontSize="8" fill={SVG_COLORS.textLight}>ICF, exterior, budget</text>
          </g>

          {/* Cellulose */}
          <g transform="translate(0, 165)">
            <text x="0" y="14" fontSize="9" fill={SVG_COLORS.text}>Cellulose (Blown)</text>
            <rect x="130" y="0" width="95" height="20" fill="#fbbf24" rx="4" />
            <text x="178" y="14" fontSize="9" fill="white" textAnchor="middle" fontWeight="bold">R-3.2 to R-3.8</text>
            <text x="350" y="14" fontSize="8" fill={SVG_COLORS.textLight}>Attics, walls, eco-friendly</text>
          </g>

          {/* Fiberglass batts */}
          <g transform="translate(0, 195)">
            <text x="0" y="14" fontSize="9" fill={SVG_COLORS.text}>Fiberglass Batts</text>
            <rect x="130" y="0" width="90" height="20" fill="#f59e0b" rx="4" />
            <text x="175" y="14" fontSize="9" fill="white" textAnchor="middle" fontWeight="bold">R-2.9 to R-3.8</text>
            <text x="350" y="14" fontSize="8" fill={SVG_COLORS.textLight}>Walls, floors, budget</text>
          </g>

          {/* Mineral wool */}
          <g transform="translate(0, 225)">
            <text x="0" y="14" fontSize="9" fill={SVG_COLORS.text}>Mineral Wool</text>
            <rect x="130" y="0" width="100" height="20" fill="#d97706" rx="4" />
            <text x="180" y="14" fontSize="9" fill="white" textAnchor="middle" fontWeight="bold">R-3.0 to R-4.2</text>
            <text x="350" y="14" fontSize="8" fill={SVG_COLORS.textLight}>Fire resistance, sound</text>
          </g>
        </g>

        {/* Legend */}
        <g transform="translate(50, 320)">
          <text x="0" y="0" fontSize="8" fill={SVG_COLORS.textLight}>
            Higher R-value = Better insulation • Total R-value = R/inch × thickness • Climate zones require R-30 to R-60 for attics
          </text>
        </g>
      </svg>
    </div>
  );
}
