'use client';

import { SVG_COLORS } from '../../calculators/CalculatorSVG';

/**
 * Illustration showing AC compressor replacement cost breakdown
 */
export default function ACCompressorReplacementCostSVG() {
  return (
    <div className="w-full bg-slate-50 border border-slate-200 rounded-lg overflow-hidden">
      <svg
        viewBox="0 0 600 300"
        className="w-full h-auto"
        preserveAspectRatio="xMidYMid meet"
        role="img"
        aria-label="AC compressor replacement cost breakdown diagram"
      >
        <rect width="600" height="300" fill="#f8fafc" />

        <text x="300" y="25" fontSize="14" fontWeight="bold" fill={SVG_COLORS.text} textAnchor="middle">
          AC Compressor Replacement Cost Breakdown
        </text>

        {/* Compressor illustration */}
        <g transform="translate(40, 55)">
          <ellipse cx="70" cy="80" rx="55" ry="65" fill="#334155" />
          <ellipse cx="70" cy="80" rx="45" ry="55" fill="#475569" />
          <rect x="50" y="10" width="40" height="15" fill="#64748b" rx="2" />
          <rect x="45" y="145" width="50" height="10" fill="#64748b" rx="2" />

          {/* Refrigerant lines */}
          <rect x="25" y="50" width="8" height="25" fill="#94a3b8" rx="2" />
          <rect x="107" y="50" width="8" height="25" fill="#94a3b8" rx="2" />

          <text x="70" y="85" fontSize="9" fill="white" textAnchor="middle">Compressor</text>
          <text x="70" y="180" fontSize="9" fill={SVG_COLORS.textLight} textAnchor="middle">&quot;Heart of the AC&quot;</text>
        </g>

        {/* Cost breakdown bars */}
        <g transform="translate(180, 55)">
          <text x="0" y="0" fontSize="11" fontWeight="bold" fill={SVG_COLORS.text}>Typical Cost Range:</text>

          {/* Parts cost */}
          <g transform="translate(0, 20)">
            <text x="0" y="12" fontSize="9" fill={SVG_COLORS.textLight}>Compressor (part)</text>
            <rect x="100" y="0" width="180" height="20" fill="#dbeafe" stroke={SVG_COLORS.cold} strokeWidth="1" rx="2" />
            <text x="190" y="14" fontSize="10" fill={SVG_COLORS.text} textAnchor="middle" fontWeight="bold">$600 - $1,200</text>
          </g>

          {/* Labor cost */}
          <g transform="translate(0, 50)">
            <text x="0" y="12" fontSize="9" fill={SVG_COLORS.textLight}>Labor (4-6 hrs)</text>
            <rect x="100" y="0" width="150" height="20" fill="#fef3c7" stroke="#d97706" strokeWidth="1" rx="2" />
            <text x="175" y="14" fontSize="10" fill={SVG_COLORS.text} textAnchor="middle" fontWeight="bold">$400 - $800</text>
          </g>

          {/* Refrigerant */}
          <g transform="translate(0, 80)">
            <text x="0" y="12" fontSize="9" fill={SVG_COLORS.textLight}>Refrigerant</text>
            <rect x="100" y="0" width="120" height="20" fill="#dcfce7" stroke="#15803d" strokeWidth="1" rx="2" />
            <text x="160" y="14" fontSize="10" fill={SVG_COLORS.text} textAnchor="middle" fontWeight="bold">$200 - $600</text>
          </g>

          {/* Total */}
          <g transform="translate(0, 120)">
            <text x="0" y="14" fontSize="10" fontWeight="bold" fill={SVG_COLORS.text}>TOTAL</text>
            <rect x="100" y="0" width="280" height="24" fill="#f1f5f9" stroke={SVG_COLORS.stroke} strokeWidth="2" rx="2" />
            <text x="240" y="16" fontSize="12" fill={SVG_COLORS.text} textAnchor="middle" fontWeight="bold">$1,200 - $2,600</text>
          </g>
        </g>

        {/* Decision box */}
        <g transform="translate(180, 210)">
          <rect x="0" y="0" width="380" height="70" rx="6" fill="white" stroke={SVG_COLORS.stroke} strokeWidth="1.5" />
          <text x="190" y="20" fontSize="10" fontWeight="bold" fill={SVG_COLORS.text} textAnchor="middle">
            Replace Compressor vs. Replace Entire Unit?
          </text>

          <g transform="translate(20, 35)">
            <circle cx="8" cy="8" r="6" fill="#15803d" />
            <text x="20" y="12" fontSize="8" fill={SVG_COLORS.textLight}>Replace compressor if unit is &lt;10 years old</text>
          </g>

          <g transform="translate(20, 52)">
            <circle cx="8" cy="8" r="6" fill="#b91c1c" />
            <text x="20" y="12" fontSize="8" fill={SVG_COLORS.textLight}>Replace entire unit if &gt;15 years old or uses R-22</text>
          </g>
        </g>
      </svg>
    </div>
  );
}
