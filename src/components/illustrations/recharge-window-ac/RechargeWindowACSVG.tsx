'use client';

import { SVG_COLORS } from '../../calculators/CalculatorSVG';

/**
 * Illustration about window AC recharging (sealed system)
 */
export default function RechargeWindowACSVG() {
  return (
    <div className="w-full bg-slate-50 border border-slate-200 rounded-lg overflow-hidden">
      <svg
        viewBox="0 0 600 280"
        className="w-full h-auto"
        preserveAspectRatio="xMidYMid meet"
        role="img"
        aria-label="Window AC recharging information diagram"
      >
        <rect width="600" height="280" fill="#f8fafc" />

        <text x="300" y="25" fontSize="14" fontWeight="bold" fill={SVG_COLORS.text} textAnchor="middle">
          Can You Recharge a Window AC? The Truth
        </text>

        {/* Window AC illustration */}
        <g transform="translate(50, 50)">
          <rect x="0" y="0" width="150" height="100" fill="#64748b" rx="4" />
          <rect x="10" y="10" width="60" height="80" fill="#334155" rx="2" />
          <rect x="80" y="15" width="60" height="35" fill="#475569" rx="2" />
          <rect x="80" y="55" width="60" height="35" fill="#475569" rx="2" />

          {/* Sealed system symbol */}
          <circle cx="40" cy="50" r="25" fill="#fecaca" stroke="#b91c1c" strokeWidth="2" />
          <text x="40" y="45" fontSize="8" fill="#b91c1c" textAnchor="middle" fontWeight="bold">SEALED</text>
          <text x="40" y="57" fontSize="8" fill="#b91c1c" textAnchor="middle" fontWeight="bold">SYSTEM</text>

          <text x="75" y="108" fontSize="9" fill={SVG_COLORS.textLight} textAnchor="middle">Window AC Unit</text>
        </g>

        {/* Key facts */}
        <g transform="translate(220, 50)">
          <rect x="0" y="0" width="330" height="100" rx="6" fill="white" stroke="#b91c1c" strokeWidth="2" />
          <rect x="0" y="0" width="330" height="28" rx="6" fill="#fecaca" />
          <rect x="0" y="22" width="330" height="6" fill="#fecaca" />
          <text x="165" y="20" fontSize="11" fontWeight="bold" fill="#b91c1c" textAnchor="middle">
            Important Facts
          </text>

          <text x="15" y="48" fontSize="9" fill={SVG_COLORS.text}>• Window ACs are sealed systems — NOT designed for recharging</text>
          <text x="15" y="64" fontSize="9" fill={SVG_COLORS.text}>• If low on refrigerant, there&apos;s a LEAK somewhere</text>
          <text x="15" y="80" fontSize="9" fill={SVG_COLORS.text}>• Recharging without fixing leak is temporary and wasteful</text>
          <text x="15" y="96" fontSize="9" fill={SVG_COLORS.text}>• DIY kits exist but often cost more than a new unit</text>
        </g>

        {/* Decision flowchart */}
        <g transform="translate(50, 170)">
          <text x="0" y="0" fontSize="11" fontWeight="bold" fill={SVG_COLORS.text}>What Should You Do?</text>

          <g transform="translate(0, 20)">
            <rect x="0" y="0" width="160" height="70" rx="4" fill="#dcfce7" stroke="#15803d" strokeWidth="1.5" />
            <text x="80" y="20" fontSize="9" fontWeight="bold" fill="#15803d" textAnchor="middle">Unit is 5+ Years Old</text>
            <text x="80" y="38" fontSize="8" fill={SVG_COLORS.textLight} textAnchor="middle">or repair cost &gt; $150</text>
            <line x1="20" y1="50" x2="140" y2="50" stroke="#15803d" strokeWidth="1" strokeDasharray="3,3" />
            <text x="80" y="64" fontSize="9" fill="#15803d" textAnchor="middle" fontWeight="bold">Replace the unit</text>
          </g>

          <g transform="translate(180, 20)">
            <rect x="0" y="0" width="160" height="70" rx="4" fill="#fef3c7" stroke="#d97706" strokeWidth="1.5" />
            <text x="80" y="20" fontSize="9" fontWeight="bold" fill="#d97706" textAnchor="middle">Unit is &lt;3 Years Old</text>
            <text x="80" y="38" fontSize="8" fill={SVG_COLORS.textLight} textAnchor="middle">and still under warranty</text>
            <line x1="20" y1="50" x2="140" y2="50" stroke="#d97706" strokeWidth="1" strokeDasharray="3,3" />
            <text x="80" y="64" fontSize="9" fill="#d97706" textAnchor="middle" fontWeight="bold">Check warranty claim</text>
          </g>

          <g transform="translate(360, 20)">
            <rect x="0" y="0" width="160" height="70" rx="4" fill="#dbeafe" stroke={SVG_COLORS.cold} strokeWidth="1.5" />
            <text x="80" y="20" fontSize="9" fontWeight="bold" fill={SVG_COLORS.cold} textAnchor="middle">Before Assuming</text>
            <text x="80" y="38" fontSize="8" fill={SVG_COLORS.textLight} textAnchor="middle">Low Refrigerant</text>
            <line x1="20" y1="50" x2="140" y2="50" stroke={SVG_COLORS.cold} strokeWidth="1" strokeDasharray="3,3" />
            <text x="80" y="64" fontSize="9" fill={SVG_COLORS.cold} textAnchor="middle" fontWeight="bold">Clean filters + coils</text>
          </g>
        </g>

        {/* Bottom note */}
        <g transform="translate(80, 265)">
          <text x="220" y="0" fontSize="8" fill={SVG_COLORS.textLight} textAnchor="middle">
            New window AC: $150-500 • Professional recharge: $100-300 • Usually replacement is smarter choice
          </text>
        </g>
      </svg>
    </div>
  );
}
