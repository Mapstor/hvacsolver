'use client';

import { SVG_COLORS } from '../../calculators/CalculatorSVG';

/**
 * Illustration showing furnace filter types and replacement guide
 */
export default function FurnaceFilterGuideSVG() {
  return (
    <div className="w-full bg-slate-50 border border-slate-200 rounded-lg overflow-hidden">
      <svg
        viewBox="0 0 600 300"
        className="w-full h-auto"
        preserveAspectRatio="xMidYMid meet"
        role="img"
        aria-label="Furnace filter types and replacement guide"
      >
        <rect width="600" height="300" fill="#f8fafc" />

        <text x="300" y="25" fontSize="14" fontWeight="bold" fill={SVG_COLORS.text} textAnchor="middle">
          Furnace Filter Guide: Types & Replacement Schedule
        </text>

        {/* Filter types comparison */}
        <g transform="translate(30, 50)">
          {/* Fiberglass */}
          <g transform="translate(0, 0)">
            <rect x="0" y="0" width="130" height="110" rx="4" fill="white" stroke="#94a3b8" strokeWidth="1.5" />
            <rect x="10" y="10" width="110" height="50" fill="#e2e8f0" rx="2" />
            <line x1="15" y1="20" x2="115" y2="20" stroke="#cbd5e1" strokeWidth="1" />
            <line x1="15" y1="30" x2="115" y2="30" stroke="#cbd5e1" strokeWidth="1" />
            <line x1="15" y1="40" x2="115" y2="40" stroke="#cbd5e1" strokeWidth="1" />
            <line x1="15" y1="50" x2="115" y2="50" stroke="#cbd5e1" strokeWidth="1" />
            <text x="65" y="75" fontSize="9" fontWeight="bold" fill={SVG_COLORS.text} textAnchor="middle">Fiberglass</text>
            <text x="65" y="88" fontSize="7" fill={SVG_COLORS.textLight} textAnchor="middle">MERV 1-4 • $1-5</text>
            <text x="65" y="100" fontSize="7" fill="#d97706" textAnchor="middle">Replace: 30 days</text>
          </g>

          {/* Pleated */}
          <g transform="translate(145, 0)">
            <rect x="0" y="0" width="130" height="110" rx="4" fill="white" stroke="#15803d" strokeWidth="1.5" />
            <rect x="10" y="10" width="110" height="50" fill="#dcfce7" rx="2" />
            {/* Pleats */}
            {[20, 35, 50, 65, 80, 95, 110].map((x) => (
              <line key={x} x1={x} y1="12" x2={x} y2="58" stroke="#86efac" strokeWidth="2" />
            ))}
            <text x="65" y="75" fontSize="9" fontWeight="bold" fill={SVG_COLORS.text} textAnchor="middle">Pleated</text>
            <text x="65" y="88" fontSize="7" fill={SVG_COLORS.textLight} textAnchor="middle">MERV 8-13 • $10-25</text>
            <text x="65" y="100" fontSize="7" fill="#15803d" textAnchor="middle">Replace: 90 days</text>
          </g>

          {/* Electrostatic */}
          <g transform="translate(290, 0)">
            <rect x="0" y="0" width="130" height="110" rx="4" fill="white" stroke={SVG_COLORS.cold} strokeWidth="1.5" />
            <rect x="10" y="10" width="110" height="50" fill="#dbeafe" rx="2" />
            <text x="65" y="30" fontSize="6" fill={SVG_COLORS.cold} textAnchor="middle">+ + + + +</text>
            <text x="65" y="45" fontSize="6" fill={SVG_COLORS.cold} textAnchor="middle">- - - - -</text>
            <text x="65" y="75" fontSize="9" fontWeight="bold" fill={SVG_COLORS.text} textAnchor="middle">Electrostatic</text>
            <text x="65" y="88" fontSize="7" fill={SVG_COLORS.textLight} textAnchor="middle">MERV 8-10 • $30-100</text>
            <text x="65" y="100" fontSize="7" fill={SVG_COLORS.cold} textAnchor="middle">Washable (monthly)</text>
          </g>

          {/* HEPA */}
          <g transform="translate(435, 0)">
            <rect x="0" y="0" width="130" height="110" rx="4" fill="white" stroke="#7c3aed" strokeWidth="1.5" />
            <rect x="10" y="10" width="110" height="50" fill="#ede9fe" rx="2" />
            <text x="65" y="35" fontSize="8" fill="#7c3aed" textAnchor="middle" fontWeight="bold">HEPA</text>
            <text x="65" y="48" fontSize="6" fill="#7c3aed" textAnchor="middle">99.97%</text>
            <text x="65" y="75" fontSize="9" fontWeight="bold" fill={SVG_COLORS.text} textAnchor="middle">True HEPA</text>
            <text x="65" y="88" fontSize="7" fill={SVG_COLORS.textLight} textAnchor="middle">MERV 17+ • $50-200</text>
            <text x="65" y="100" fontSize="7" fill="#7c3aed" textAnchor="middle">Replace: 12 months</text>
          </g>
        </g>

        {/* Replacement schedule */}
        <g transform="translate(30, 175)">
          <rect x="0" y="0" width="280" height="100" rx="6" fill="white" stroke={SVG_COLORS.stroke} strokeWidth="1.5" />
          <rect x="0" y="0" width="280" height="25" rx="6" fill={SVG_COLORS.text} />
          <rect x="0" y="20" width="280" height="5" fill={SVG_COLORS.text} />
          <text x="140" y="17" fontSize="10" fontWeight="bold" fill="white" textAnchor="middle">When to Replace More Often</text>

          <text x="15" y="42" fontSize="8" fill={SVG_COLORS.textLight}>• Pets in home (hair & dander)</text>
          <text x="15" y="56" fontSize="8" fill={SVG_COLORS.textLight}>• Allergies or asthma</text>
          <text x="15" y="70" fontSize="8" fill={SVG_COLORS.textLight}>• Smokers in household</text>
          <text x="15" y="84" fontSize="8" fill={SVG_COLORS.textLight}>• Nearby construction</text>
          <text x="15" y="98" fontSize="8" fill={SVG_COLORS.textLight}>• Filter looks dirty (visual check)</text>
        </g>

        {/* MERV guide */}
        <g transform="translate(330, 175)">
          <rect x="0" y="0" width="240" height="100" rx="6" fill="white" stroke={SVG_COLORS.stroke} strokeWidth="1.5" />
          <rect x="0" y="0" width="240" height="25" rx="6" fill={SVG_COLORS.cold} />
          <rect x="0" y="20" width="240" height="5" fill={SVG_COLORS.cold} />
          <text x="120" y="17" fontSize="10" fontWeight="bold" fill="white" textAnchor="middle">Quick MERV Guide</text>

          <text x="15" y="42" fontSize="8" fill={SVG_COLORS.textLight}>MERV 1-4: Pollen, dust mites</text>
          <text x="15" y="56" fontSize="8" fill={SVG_COLORS.textLight}>MERV 5-8: Mold, pet dander</text>
          <text x="15" y="70" fontSize="8" fill={SVG_COLORS.textLight}>MERV 9-12: Fine dust, legionella</text>
          <text x="15" y="84" fontSize="8" fill="#15803d" fontWeight="bold">MERV 8-11 best for most homes</text>
          <text x="15" y="98" fontSize="7" fill="#b91c1c">⚠️ MERV 13+ may restrict airflow</text>
        </g>
      </svg>
    </div>
  );
}
