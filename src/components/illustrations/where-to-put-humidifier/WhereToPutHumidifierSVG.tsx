'use client';

import { SVG_COLORS } from '../../calculators/CalculatorSVG';

/**
 * Illustration showing optimal humidifier placement
 */
export default function WhereToPutHumidifierSVG() {
  return (
    <div className="w-full bg-slate-50 border border-slate-200 rounded-lg overflow-hidden">
      <svg
        viewBox="0 0 600 300"
        className="w-full h-auto"
        preserveAspectRatio="xMidYMid meet"
        role="img"
        aria-label="Humidifier placement guide diagram"
      >
        <rect width="600" height="300" fill="#f8fafc" />

        <text x="300" y="25" fontSize="14" fontWeight="bold" fill={SVG_COLORS.text} textAnchor="middle">
          Where to Put Your Humidifier
        </text>

        {/* Room layout */}
        <g transform="translate(50, 50)">
          {/* Room outline */}
          <rect x="0" y="0" width="260" height="160" fill="#f1f5f9" stroke={SVG_COLORS.stroke} strokeWidth="2" />

          {/* Bed */}
          <rect x="140" y="80" width="100" height="60" fill="#e2e8f0" stroke={SVG_COLORS.stroke} strokeWidth="1" rx="2" />
          <text x="190" y="115" fontSize="7" fill={SVG_COLORS.textLight} textAnchor="middle">BED</text>

          {/* Nightstand with humidifier - good placement */}
          <rect x="110" y="95" width="25" height="30" fill="#cbd5e1" stroke={SVG_COLORS.stroke} strokeWidth="1" />

          {/* Humidifier */}
          <g transform="translate(113, 75)">
            <rect x="0" y="0" width="20" height="25" fill={SVG_COLORS.cold} rx="4" />
            <ellipse cx="10" cy="-5" rx="8" ry="5" fill="#93c5fd" opacity="0.6" />
            <ellipse cx="10" cy="-10" rx="6" ry="4" fill="#93c5fd" opacity="0.4" />
            <ellipse cx="10" cy="-15" rx="4" ry="3" fill="#93c5fd" opacity="0.2" />
          </g>

          {/* Good distance indicator */}
          <line x1="123" y1="85" x2="140" y2="100" stroke="#15803d" strokeWidth="1" strokeDasharray="3,2" />
          <text x="155" y="70" fontSize="7" fill="#15803d">3-6 ft from bed</text>

          {/* Bad placement X - on floor */}
          <g transform="translate(30, 120)">
            <rect x="0" y="0" width="20" height="25" fill="#94a3b8" rx="4" />
            <circle cx="10" cy="12" r="12" fill="#fecaca" opacity="0.8" />
            <text x="10" y="16" fontSize="10" fill="#b91c1c" textAnchor="middle" fontWeight="bold">✕</text>
          </g>
          <text x="40" y="155" fontSize="6" fill="#b91c1c" textAnchor="middle">Not on floor</text>
        </g>

        {/* Placement rules */}
        <g transform="translate(340, 50)">
          <text x="0" y="0" fontSize="11" fontWeight="bold" fill={SVG_COLORS.text}>Placement Rules:</text>

          <g transform="translate(0, 18)">
            <rect x="0" y="0" width="210" height="30" rx="4" fill="#dcfce7" stroke="#15803d" strokeWidth="1" />
            <text x="10" y="12" fontSize="8" fontWeight="bold" fill="#15803d">✓ Elevated surface (table/stand)</text>
            <text x="10" y="24" fontSize="7" fill={SVG_COLORS.textLight}>Better mist distribution, prevents floor wetness</text>
          </g>

          <g transform="translate(0, 55)">
            <rect x="0" y="0" width="210" height="30" rx="4" fill="#dcfce7" stroke="#15803d" strokeWidth="1" />
            <text x="10" y="12" fontSize="8" fontWeight="bold" fill="#15803d">✓ 3-6 feet from bed/furniture</text>
            <text x="10" y="24" fontSize="7" fill={SVG_COLORS.textLight}>Prevents moisture damage, avoids direct mist</text>
          </g>

          <g transform="translate(0, 92)">
            <rect x="0" y="0" width="210" height="30" rx="4" fill="#dcfce7" stroke="#15803d" strokeWidth="1" />
            <text x="10" y="12" fontSize="8" fontWeight="bold" fill="#15803d">✓ Center of room if possible</text>
            <text x="10" y="24" fontSize="7" fill={SVG_COLORS.textLight}>Even humidity distribution throughout</text>
          </g>

          <g transform="translate(0, 129)">
            <rect x="0" y="0" width="210" height="30" rx="4" fill="#fef2f2" stroke="#b91c1c" strokeWidth="1" />
            <text x="10" y="12" fontSize="8" fontWeight="bold" fill="#b91c1c">✗ Away from electronics</text>
            <text x="10" y="24" fontSize="7" fill={SVG_COLORS.textLight}>Moisture can damage TVs, computers</text>
          </g>

          <g transform="translate(0, 166)">
            <rect x="0" y="0" width="210" height="30" rx="4" fill="#fef2f2" stroke="#b91c1c" strokeWidth="1" />
            <text x="10" y="12" fontSize="8" fontWeight="bold" fill="#b91c1c">✗ Not against walls</text>
            <text x="10" y="24" fontSize="7" fill={SVG_COLORS.textLight}>Can cause mold, paint damage</text>
          </g>
        </g>

        {/* Types and placement */}
        <g transform="translate(50, 230)">
          <text x="0" y="0" fontSize="10" fontWeight="bold" fill={SVG_COLORS.text}>By Humidifier Type:</text>

          <g transform="translate(0, 15)">
            <rect x="0" y="0" width="160" height="40" rx="4" fill="white" stroke={SVG_COLORS.stroke} strokeWidth="1" />
            <text x="80" y="15" fontSize="9" fontWeight="bold" fill={SVG_COLORS.cold} textAnchor="middle">Cool Mist</text>
            <text x="80" y="30" fontSize="7" fill={SVG_COLORS.textLight} textAnchor="middle">Any room temp, safe for kids</text>
          </g>

          <g transform="translate(170, 15)">
            <rect x="0" y="0" width="160" height="40" rx="4" fill="white" stroke={SVG_COLORS.stroke} strokeWidth="1" />
            <text x="80" y="15" fontSize="9" fontWeight="bold" fill={SVG_COLORS.heat} textAnchor="middle">Warm Mist</text>
            <text x="80" y="30" fontSize="7" fill={SVG_COLORS.textLight} textAnchor="middle">Extra far from kids, burns risk</text>
          </g>

          <g transform="translate(340, 15)">
            <rect x="0" y="0" width="160" height="40" rx="4" fill="white" stroke={SVG_COLORS.stroke} strokeWidth="1" />
            <text x="80" y="15" fontSize="9" fontWeight="bold" fill="#7c3aed" textAnchor="middle">Whole-House</text>
            <text x="80" y="30" fontSize="7" fill={SVG_COLORS.textLight} textAnchor="middle">Connected to HVAC system</text>
          </g>
        </g>
      </svg>
    </div>
  );
}
