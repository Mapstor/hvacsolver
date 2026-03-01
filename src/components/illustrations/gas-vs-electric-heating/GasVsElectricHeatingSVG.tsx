'use client';

import { SVG_COLORS } from '../../calculators/CalculatorSVG';

/**
 * Illustration comparing gas vs electric heating
 */
export default function GasVsElectricHeatingSVG() {
  return (
    <div className="w-full bg-slate-50 border border-slate-200 rounded-lg overflow-hidden">
      <svg
        viewBox="0 0 600 320"
        className="w-full h-auto"
        preserveAspectRatio="xMidYMid meet"
        role="img"
        aria-label="Gas vs electric heating comparison"
      >
        <rect width="600" height="320" fill="#f8fafc" />

        <text x="300" y="25" fontSize="14" fontWeight="bold" fill={SVG_COLORS.text} textAnchor="middle">
          Gas vs Electric Heating Comparison
        </text>

        {/* Gas Furnace */}
        <g transform="translate(40, 50)">
          <rect x="0" y="0" width="250" height="240" rx="8" fill="white" stroke="#d97706" strokeWidth="2" />
          <rect x="0" y="0" width="250" height="35" rx="8" fill="#d97706" />
          <rect x="0" y="28" width="250" height="7" fill="#d97706" />
          <text x="125" y="24" fontSize="12" fontWeight="bold" fill="white" textAnchor="middle">Gas Furnace</text>

          {/* Furnace icon */}
          <g transform="translate(20, 50)">
            <rect x="0" y="0" width="60" height="80" fill="#64748b" rx="4" />
            <polygon points="15,65 30,50 45,65" fill="#f97316" />
            <polygon points="20,65 30,55 40,65" fill="#fbbf24" />
            <text x="30" y="30" fontSize="8" fill="#94a3b8" textAnchor="middle">GAS</text>
          </g>

          {/* Pros */}
          <g transform="translate(90, 50)">
            <text x="0" y="0" fontSize="9" fontWeight="bold" fill="#15803d">✓ Pros:</text>
            <text x="0" y="16" fontSize="8" fill={SVG_COLORS.textLight}>• Lower operating cost</text>
            <text x="0" y="30" fontSize="8" fill={SVG_COLORS.textLight}>• Heats faster</text>
            <text x="0" y="44" fontSize="8" fill={SVG_COLORS.textLight}>• Works in power outage*</text>
            <text x="0" y="58" fontSize="8" fill={SVG_COLORS.textLight}>• Warmer air output</text>
          </g>

          {/* Cons */}
          <g transform="translate(90, 120)">
            <text x="0" y="0" fontSize="9" fontWeight="bold" fill="#b91c1c">✗ Cons:</text>
            <text x="0" y="16" fontSize="8" fill={SVG_COLORS.textLight}>• Higher upfront cost</text>
            <text x="0" y="30" fontSize="8" fill={SVG_COLORS.textLight}>• Needs gas line</text>
            <text x="0" y="44" fontSize="8" fill={SVG_COLORS.textLight}>• CO risk (needs detector)</text>
            <text x="0" y="58" fontSize="8" fill={SVG_COLORS.textLight}>• Annual maintenance</text>
          </g>

          {/* Cost estimate */}
          <g transform="translate(15, 190)">
            <rect x="0" y="0" width="220" height="40" rx="4" fill="#fef3c7" />
            <text x="110" y="16" fontSize="9" fontWeight="bold" fill="#d97706" textAnchor="middle">Typical Cost (1,000 sq ft)</text>
            <text x="110" y="32" fontSize="10" fill={SVG_COLORS.text} textAnchor="middle" fontWeight="bold">$50-100/month winter</text>
          </g>
        </g>

        {/* Electric Heating */}
        <g transform="translate(310, 50)">
          <rect x="0" y="0" width="250" height="240" rx="8" fill="white" stroke={SVG_COLORS.cold} strokeWidth="2" />
          <rect x="0" y="0" width="250" height="35" rx="8" fill={SVG_COLORS.cold} />
          <rect x="0" y="28" width="250" height="7" fill={SVG_COLORS.cold} />
          <text x="125" y="24" fontSize="12" fontWeight="bold" fill="white" textAnchor="middle">Electric Heat</text>

          {/* Electric icon */}
          <g transform="translate(20, 50)">
            <rect x="0" y="0" width="60" height="80" fill="#64748b" rx="4" />
            <path d="M 30,20 L 20,45 L 35,45 L 25,70" stroke="#fbbf24" strokeWidth="3" fill="none" />
            <text x="30" y="90" fontSize="6" fill="#94a3b8" textAnchor="middle">ELECTRIC</text>
          </g>

          {/* Pros */}
          <g transform="translate(90, 50)">
            <text x="0" y="0" fontSize="9" fontWeight="bold" fill="#15803d">✓ Pros:</text>
            <text x="0" y="16" fontSize="8" fill={SVG_COLORS.textLight}>• Lower upfront cost</text>
            <text x="0" y="30" fontSize="8" fill={SVG_COLORS.textLight}>• No gas line needed</text>
            <text x="0" y="44" fontSize="8" fill={SVG_COLORS.textLight}>• No CO risk</text>
            <text x="0" y="58" fontSize="8" fill={SVG_COLORS.textLight}>• Less maintenance</text>
          </g>

          {/* Cons */}
          <g transform="translate(90, 120)">
            <text x="0" y="0" fontSize="9" fontWeight="bold" fill="#b91c1c">✗ Cons:</text>
            <text x="0" y="16" fontSize="8" fill={SVG_COLORS.textLight}>• Higher operating cost</text>
            <text x="0" y="30" fontSize="8" fill={SVG_COLORS.textLight}>• Heats slower</text>
            <text x="0" y="44" fontSize="8" fill={SVG_COLORS.textLight}>• Useless in outage</text>
            <text x="0" y="58" fontSize="8" fill={SVG_COLORS.textLight}>• Less warm air feel</text>
          </g>

          {/* Cost estimate */}
          <g transform="translate(15, 190)">
            <rect x="0" y="0" width="220" height="40" rx="4" fill="#dbeafe" />
            <text x="110" y="16" fontSize="9" fontWeight="bold" fill={SVG_COLORS.cold} textAnchor="middle">Typical Cost (1,000 sq ft)</text>
            <text x="110" y="32" fontSize="10" fill={SVG_COLORS.text} textAnchor="middle" fontWeight="bold">$100-200/month winter</text>
          </g>
        </g>

        {/* Bottom recommendation */}
        <g transform="translate(80, 300)">
          <text x="220" y="0" fontSize="9" fill={SVG_COLORS.textLight} textAnchor="middle">
            Gas is cheaper to run • Electric is cheaper to install • Heat pumps offer best of both worlds
          </text>
        </g>
      </svg>
    </div>
  );
}
