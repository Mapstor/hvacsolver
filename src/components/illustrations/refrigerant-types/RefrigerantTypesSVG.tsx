'use client';

import { SVG_COLORS } from '../../calculators/CalculatorSVG';

/**
 * Illustration comparing HVAC refrigerant types
 */
export default function RefrigerantTypesSVG() {
  return (
    <div className="w-full bg-slate-50 border border-slate-200 rounded-lg overflow-hidden">
      <svg
        viewBox="0 0 600 320"
        className="w-full h-auto"
        preserveAspectRatio="xMidYMid meet"
        role="img"
        aria-label="HVAC refrigerant types comparison"
      >
        <rect width="600" height="320" fill="#f8fafc" />

        <text x="300" y="25" fontSize="14" fontWeight="bold" fill={SVG_COLORS.text} textAnchor="middle">
          HVAC Refrigerant Types Comparison
        </text>

        {/* Refrigerant cards */}
        <g transform="translate(30, 50)">
          {/* R-22 */}
          <g transform="translate(0, 0)">
            <rect x="0" y="0" width="130" height="140" rx="6" fill="white" stroke="#b91c1c" strokeWidth="2" />
            <rect x="0" y="0" width="130" height="30" rx="6" fill="#fecaca" />
            <rect x="0" y="24" width="130" height="6" fill="#fecaca" />
            <text x="65" y="22" fontSize="12" fontWeight="bold" fill="#b91c1c" textAnchor="middle">R-22</text>
            <text x="65" y="50" fontSize="8" fill={SVG_COLORS.textLight} textAnchor="middle">Freon (HCFC)</text>

            <text x="10" y="70" fontSize="7" fill={SVG_COLORS.textLight}>ODP: 0.055 (harmful)</text>
            <text x="10" y="84" fontSize="7" fill={SVG_COLORS.textLight}>GWP: 1,810</text>
            <text x="10" y="98" fontSize="7" fill={SVG_COLORS.textLight}>Status: BANNED</text>
            <text x="10" y="112" fontSize="7" fill={SVG_COLORS.textLight}>Phase-out: 2020</text>

            <rect x="10" y="120" width="110" height="15" rx="2" fill="#fecaca" />
            <text x="65" y="131" fontSize="7" fill="#b91c1c" textAnchor="middle" fontWeight="bold">No longer available</text>
          </g>

          {/* R-410A */}
          <g transform="translate(145, 0)">
            <rect x="0" y="0" width="130" height="140" rx="6" fill="white" stroke="#d97706" strokeWidth="2" />
            <rect x="0" y="0" width="130" height="30" rx="6" fill="#fef3c7" />
            <rect x="0" y="24" width="130" height="6" fill="#fef3c7" />
            <text x="65" y="22" fontSize="12" fontWeight="bold" fill="#d97706" textAnchor="middle">R-410A</text>
            <text x="65" y="50" fontSize="8" fill={SVG_COLORS.textLight} textAnchor="middle">Puron (HFC)</text>

            <text x="10" y="70" fontSize="7" fill={SVG_COLORS.textLight}>ODP: 0 (safe)</text>
            <text x="10" y="84" fontSize="7" fill={SVG_COLORS.textLight}>GWP: 2,088 (high)</text>
            <text x="10" y="98" fontSize="7" fill={SVG_COLORS.textLight}>Status: Current std</text>
            <text x="10" y="112" fontSize="7" fill={SVG_COLORS.textLight}>Phase-down: 2025+</text>

            <rect x="10" y="120" width="110" height="15" rx="2" fill="#fef3c7" />
            <text x="65" y="131" fontSize="7" fill="#d97706" textAnchor="middle" fontWeight="bold">Being phased out</text>
          </g>

          {/* R-32 */}
          <g transform="translate(290, 0)">
            <rect x="0" y="0" width="130" height="140" rx="6" fill="white" stroke="#15803d" strokeWidth="2" />
            <rect x="0" y="0" width="130" height="30" rx="6" fill="#dcfce7" />
            <rect x="0" y="24" width="130" height="6" fill="#dcfce7" />
            <text x="65" y="22" fontSize="12" fontWeight="bold" fill="#15803d" textAnchor="middle">R-32</text>
            <text x="65" y="50" fontSize="8" fill={SVG_COLORS.textLight} textAnchor="middle">HFC (lower GWP)</text>

            <text x="10" y="70" fontSize="7" fill={SVG_COLORS.textLight}>ODP: 0 (safe)</text>
            <text x="10" y="84" fontSize="7" fill={SVG_COLORS.textLight}>GWP: 675 (better)</text>
            <text x="10" y="98" fontSize="7" fill={SVG_COLORS.textLight}>Status: Growing use</text>
            <text x="10" y="112" fontSize="7" fill={SVG_COLORS.textLight}>Efficiency: Higher</text>

            <rect x="10" y="120" width="110" height="15" rx="2" fill="#dcfce7" />
            <text x="65" y="131" fontSize="7" fill="#15803d" textAnchor="middle" fontWeight="bold">Recommended</text>
          </g>

          {/* R-454B */}
          <g transform="translate(435, 0)">
            <rect x="0" y="0" width="130" height="140" rx="6" fill="white" stroke="#7c3aed" strokeWidth="2" />
            <rect x="0" y="0" width="130" height="30" rx="6" fill="#f3e8ff" />
            <rect x="0" y="24" width="130" height="6" fill="#f3e8ff" />
            <text x="65" y="22" fontSize="12" fontWeight="bold" fill="#7c3aed" textAnchor="middle">R-454B</text>
            <text x="65" y="50" fontSize="8" fill={SVG_COLORS.textLight} textAnchor="middle">HFO blend</text>

            <text x="10" y="70" fontSize="7" fill={SVG_COLORS.textLight}>ODP: 0 (safe)</text>
            <text x="10" y="84" fontSize="7" fill={SVG_COLORS.textLight}>GWP: 466 (best)</text>
            <text x="10" y="98" fontSize="7" fill={SVG_COLORS.textLight}>Status: New standard</text>
            <text x="10" y="112" fontSize="7" fill={SVG_COLORS.textLight}>Mandated: 2025</text>

            <rect x="10" y="120" width="110" height="15" rx="2" fill="#f3e8ff" />
            <text x="65" y="131" fontSize="7" fill="#7c3aed" textAnchor="middle" fontWeight="bold">Future standard</text>
          </g>
        </g>

        {/* Key terms */}
        <g transform="translate(50, 210)">
          <text x="0" y="0" fontSize="10" fontWeight="bold" fill={SVG_COLORS.text}>Key Terms:</text>

          <g transform="translate(0, 15)">
            <rect x="0" y="0" width="240" height="35" rx="4" fill="white" stroke={SVG_COLORS.stroke} strokeWidth="1" />
            <text x="10" y="15" fontSize="8" fontWeight="bold" fill={SVG_COLORS.text}>ODP (Ozone Depletion Potential)</text>
            <text x="10" y="28" fontSize="7" fill={SVG_COLORS.textLight}>0 = safe for ozone • Higher = damages ozone layer</text>
          </g>

          <g transform="translate(260, 15)">
            <rect x="0" y="0" width="240" height="35" rx="4" fill="white" stroke={SVG_COLORS.stroke} strokeWidth="1" />
            <text x="10" y="15" fontSize="8" fontWeight="bold" fill={SVG_COLORS.text}>GWP (Global Warming Potential)</text>
            <text x="10" y="28" fontSize="7" fill={SVG_COLORS.textLight}>Lower = better • R-410A too high, being phased out</text>
          </g>
        </g>

        {/* Compatibility warning */}
        <g transform="translate(50, 270)">
          <rect x="0" y="0" width="500" height="35" rx="4" fill="#fef2f2" stroke="#b91c1c" strokeWidth="1" />
          <text x="250" y="15" fontSize="9" fontWeight="bold" fill="#b91c1c" textAnchor="middle">
            Refrigerants Are NOT Interchangeable
          </text>
          <text x="250" y="28" fontSize="8" fill={SVG_COLORS.textLight} textAnchor="middle">
            Each system is designed for specific refrigerant • Never mix types • Always use certified technician
          </text>
        </g>
      </svg>
    </div>
  );
}
