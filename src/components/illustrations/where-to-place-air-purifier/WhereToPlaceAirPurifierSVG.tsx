'use client';

import { SVG_COLORS } from '../../calculators/CalculatorSVG';

/**
 * Illustration showing optimal air purifier placement
 */
export default function WhereToPlaceAirPurifierSVG() {
  return (
    <div className="w-full bg-slate-50 border border-slate-200 rounded-lg overflow-hidden">
      <svg
        viewBox="0 0 600 300"
        className="w-full h-auto"
        preserveAspectRatio="xMidYMid meet"
        role="img"
        aria-label="Air purifier placement guide diagram"
      >
        <rect width="600" height="300" fill="#f8fafc" />

        <text x="300" y="25" fontSize="14" fontWeight="bold" fill={SVG_COLORS.text} textAnchor="middle">
          Where to Place Your Air Purifier
        </text>

        {/* Room layout */}
        <g transform="translate(50, 50)">
          {/* Room outline */}
          <rect x="0" y="0" width="280" height="180" fill="#f1f5f9" stroke={SVG_COLORS.stroke} strokeWidth="2" />

          {/* Door */}
          <rect x="0" y="140" width="40" height="40" fill="#cbd5e1" stroke={SVG_COLORS.stroke} strokeWidth="1" />
          <text x="20" y="165" fontSize="7" fill={SVG_COLORS.textLight} textAnchor="middle">DOOR</text>

          {/* Window */}
          <rect x="100" y="0" width="60" height="8" fill="#93c5fd" stroke={SVG_COLORS.stroke} strokeWidth="1" />
          <text x="130" y="20" fontSize="7" fill={SVG_COLORS.textLight} textAnchor="middle">WINDOW</text>

          {/* Bed */}
          <rect x="180" y="100" width="80" height="60" fill="#e2e8f0" stroke={SVG_COLORS.stroke} strokeWidth="1" rx="2" />
          <text x="220" y="135" fontSize="7" fill={SVG_COLORS.textLight} textAnchor="middle">BED</text>

          {/* Best placement - green zone */}
          <circle cx="100" cy="90" r="35" fill="#dcfce7" stroke="#15803d" strokeWidth="2" strokeDasharray="5,3" />
          <rect x="85" y="75" width="30" height="40" fill="#15803d" rx="4" />
          <text x="100" y="92" fontSize="6" fill="white" textAnchor="middle">AIR</text>
          <text x="100" y="100" fontSize="6" fill="white" textAnchor="middle">PURIFIER</text>

          {/* Airflow arrows */}
          <path d="M 100,50 Q 100,30 130,50" fill="none" stroke="#15803d" strokeWidth="1.5" markerEnd="url(#arrowGreen)" />
          <path d="M 125,90 L 160,90" fill="none" stroke="#15803d" strokeWidth="1.5" markerEnd="url(#arrowGreen)" />
          <path d="M 100,130 Q 100,150 130,130" fill="none" stroke="#15803d" strokeWidth="1.5" markerEnd="url(#arrowGreen)" />
        </g>

        {/* Arrow marker */}
        <defs>
          <marker id="arrowGreen" markerWidth="6" markerHeight="6" refX="5" refY="3" orient="auto">
            <path d="M0,0 L6,3 L0,6 Z" fill="#15803d" />
          </marker>
        </defs>

        {/* Placement rules */}
        <g transform="translate(360, 50)">
          <text x="0" y="0" fontSize="11" fontWeight="bold" fill={SVG_COLORS.text}>Placement Rules:</text>

          <g transform="translate(0, 18)">
            <rect x="0" y="0" width="190" height="35" rx="4" fill="#dcfce7" stroke="#15803d" strokeWidth="1" />
            <text x="10" y="14" fontSize="8" fontWeight="bold" fill="#15803d">✓ 3-5 feet from walls</text>
            <text x="10" y="28" fontSize="7" fill={SVG_COLORS.textLight}>Allows proper airflow circulation</text>
          </g>

          <g transform="translate(0, 60)">
            <rect x="0" y="0" width="190" height="35" rx="4" fill="#dcfce7" stroke="#15803d" strokeWidth="1" />
            <text x="10" y="14" fontSize="8" fontWeight="bold" fill="#15803d">✓ Near pollution source</text>
            <text x="10" y="28" fontSize="7" fill={SVG_COLORS.textLight}>Entry doors, pet areas, etc.</text>
          </g>

          <g transform="translate(0, 102)">
            <rect x="0" y="0" width="190" height="35" rx="4" fill="#dcfce7" stroke="#15803d" strokeWidth="1" />
            <text x="10" y="14" fontSize="8" fontWeight="bold" fill="#15803d">✓ Open area, elevated</text>
            <text x="10" y="28" fontSize="7" fill={SVG_COLORS.textLight}>Floor or table level is fine</text>
          </g>

          <g transform="translate(0, 144)">
            <rect x="0" y="0" width="190" height="35" rx="4" fill="#fef2f2" stroke="#b91c1c" strokeWidth="1" />
            <text x="10" y="14" fontSize="8" fontWeight="bold" fill="#b91c1c">✗ Avoid corners</text>
            <text x="10" y="28" fontSize="7" fill={SVG_COLORS.textLight}>Poor airflow distribution</text>
          </g>
        </g>

        {/* Room-specific tips */}
        <g transform="translate(50, 245)">
          <text x="0" y="0" fontSize="10" fontWeight="bold" fill={SVG_COLORS.text}>Room-Specific Tips:</text>

          <g transform="translate(0, 15)">
            <rect x="0" y="0" width="160" height="30" rx="4" fill="white" stroke={SVG_COLORS.stroke} strokeWidth="1" />
            <text x="80" y="12" fontSize="8" fontWeight="bold" fill={SVG_COLORS.text} textAnchor="middle">Bedroom</text>
            <text x="80" y="24" fontSize="7" fill={SVG_COLORS.textLight} textAnchor="middle">3-6 feet from bed, not aimed at face</text>
          </g>

          <g transform="translate(170, 15)">
            <rect x="0" y="0" width="160" height="30" rx="4" fill="white" stroke={SVG_COLORS.stroke} strokeWidth="1" />
            <text x="80" y="12" fontSize="8" fontWeight="bold" fill={SVG_COLORS.text} textAnchor="middle">Living Room</text>
            <text x="80" y="24" fontSize="7" fill={SVG_COLORS.textLight} textAnchor="middle">Central location, near seating</text>
          </g>

          <g transform="translate(340, 15)">
            <rect x="0" y="0" width="160" height="30" rx="4" fill="white" stroke={SVG_COLORS.stroke} strokeWidth="1" />
            <text x="80" y="12" fontSize="8" fontWeight="bold" fill={SVG_COLORS.text} textAnchor="middle">Office</text>
            <text x="80" y="24" fontSize="7" fill={SVG_COLORS.textLight} textAnchor="middle">Near desk, don&apos;t blow papers</text>
          </g>
        </g>
      </svg>
    </div>
  );
}
