'use client';

import { SVG_COLORS } from '../../calculators/CalculatorSVG';

/**
 * Illustration showing ceiling fan downrod length selection
 */
export default function CeilingFanDownrodLengthSVG() {
  return (
    <div className="w-full bg-slate-50 border border-slate-200 rounded-lg overflow-hidden">
      <svg
        viewBox="0 0 600 300"
        className="w-full h-auto"
        preserveAspectRatio="xMidYMid meet"
        role="img"
        aria-label="Ceiling fan downrod length selection guide"
      >
        <rect width="600" height="300" fill="#f8fafc" />

        <text x="300" y="25" fontSize="14" fontWeight="bold" fill={SVG_COLORS.text} textAnchor="middle">
          Ceiling Fan Downrod Length Guide
        </text>

        {/* Room cross-section with measurements */}
        <g transform="translate(40, 50)">
          {/* Ceiling */}
          <rect x="0" y="0" width="350" height="10" fill="#94a3b8" />
          <text x="175" y="-5" fontSize="8" fill={SVG_COLORS.textLight} textAnchor="middle">Ceiling</text>

          {/* Floor */}
          <rect x="0" y="200" width="350" height="10" fill="#64748b" />
          <text x="175" y="225" fontSize="8" fill={SVG_COLORS.textLight} textAnchor="middle">Floor</text>

          {/* Ceiling height measurement */}
          <line x1="20" y1="10" x2="20" y2="200" stroke={SVG_COLORS.stroke} strokeWidth="1" strokeDasharray="4,2" />
          <text x="25" y="110" fontSize="8" fill={SVG_COLORS.textLight} transform="rotate(-90, 25, 110)">Ceiling Height</text>

          {/* Fan 1 - Flush mount (8ft ceiling) */}
          <g transform="translate(70, 10)">
            <rect x="-3" y="0" width="6" height="15" fill="#475569" />
            <ellipse cx="0" cy="20" rx="30" ry="8" fill="#64748b" />
            <text x="0" y="45" fontSize="8" fill={SVG_COLORS.textLight} textAnchor="middle">Flush Mount</text>
            <text x="0" y="57" fontSize="7" fill={SVG_COLORS.cold} textAnchor="middle">8&apos; ceiling</text>
            <text x="0" y="68" fontSize="7" fill={SVG_COLORS.textLight} textAnchor="middle">No downrod</text>
          </g>

          {/* Fan 2 - Short downrod (9ft ceiling) */}
          <g transform="translate(150, 10)">
            <rect x="-2" y="0" width="4" height="30" fill="#475569" />
            <ellipse cx="0" cy="40" rx="30" ry="8" fill="#64748b" />
            <text x="0" y="65" fontSize="8" fill={SVG_COLORS.textLight} textAnchor="middle">Short Downrod</text>
            <text x="0" y="77" fontSize="7" fill={SVG_COLORS.cold} textAnchor="middle">9&apos; ceiling</text>
            <text x="0" y="88" fontSize="7" fill={SVG_COLORS.textLight} textAnchor="middle">6&quot; downrod</text>
          </g>

          {/* Fan 3 - Medium downrod (10ft ceiling) */}
          <g transform="translate(230, 10)">
            <rect x="-2" y="0" width="4" height="50" fill="#475569" />
            <ellipse cx="0" cy="60" rx="30" ry="8" fill="#64748b" />
            <text x="0" y="85" fontSize="8" fill={SVG_COLORS.textLight} textAnchor="middle">Medium</text>
            <text x="0" y="97" fontSize="7" fill={SVG_COLORS.cold} textAnchor="middle">10&apos; ceiling</text>
            <text x="0" y="108" fontSize="7" fill={SVG_COLORS.textLight} textAnchor="middle">12&quot; downrod</text>
          </g>

          {/* Fan 4 - Long downrod (12ft ceiling) */}
          <g transform="translate(310, 10)">
            <rect x="-2" y="0" width="4" height="80" fill="#475569" />
            <ellipse cx="0" cy="90" rx="30" ry="8" fill="#64748b" />
            <text x="0" y="115" fontSize="8" fill={SVG_COLORS.textLight} textAnchor="middle">Long</text>
            <text x="0" y="127" fontSize="7" fill={SVG_COLORS.cold} textAnchor="middle">12&apos; ceiling</text>
            <text x="0" y="138" fontSize="7" fill={SVG_COLORS.textLight} textAnchor="middle">24-36&quot; downrod</text>
          </g>

          {/* Ideal height indicator */}
          <line x1="0" y1="115" x2="350" y2="115" stroke="#15803d" strokeWidth="1" strokeDasharray="6,3" />
          <text x="355" y="110" fontSize="7" fill="#15803d">7-9 ft from</text>
          <text x="355" y="120" fontSize="7" fill="#15803d">floor (ideal)</text>
        </g>

        {/* Downrod chart */}
        <g transform="translate(420, 55)">
          <rect x="0" y="0" width="160" height="180" rx="6" fill="white" stroke={SVG_COLORS.stroke} strokeWidth="1.5" />
          <rect x="0" y="0" width="160" height="25" rx="6" fill={SVG_COLORS.cold} />
          <rect x="0" y="20" width="160" height="5" fill={SVG_COLORS.cold} />
          <text x="80" y="17" fontSize="9" fontWeight="bold" fill="white" textAnchor="middle">Downrod Chart</text>

          {/* Table headers */}
          <text x="45" y="42" fontSize="8" fontWeight="bold" fill={SVG_COLORS.text} textAnchor="middle">Ceiling</text>
          <text x="120" y="42" fontSize="8" fontWeight="bold" fill={SVG_COLORS.text} textAnchor="middle">Downrod</text>

          {/* Rows */}
          <line x1="10" y1="48" x2="150" y2="48" stroke={SVG_COLORS.strokeLight} strokeWidth="1" />

          <text x="45" y="65" fontSize="8" fill={SVG_COLORS.textLight} textAnchor="middle">8 ft</text>
          <text x="120" y="65" fontSize="8" fill={SVG_COLORS.text} textAnchor="middle">Flush/Hugger</text>

          <text x="45" y="85" fontSize="8" fill={SVG_COLORS.textLight} textAnchor="middle">9 ft</text>
          <text x="120" y="85" fontSize="8" fill={SVG_COLORS.text} textAnchor="middle">3-6&quot;</text>

          <text x="45" y="105" fontSize="8" fill={SVG_COLORS.textLight} textAnchor="middle">10 ft</text>
          <text x="120" y="105" fontSize="8" fill={SVG_COLORS.text} textAnchor="middle">6-12&quot;</text>

          <text x="45" y="125" fontSize="8" fill={SVG_COLORS.textLight} textAnchor="middle">11 ft</text>
          <text x="120" y="125" fontSize="8" fill={SVG_COLORS.text} textAnchor="middle">12-18&quot;</text>

          <text x="45" y="145" fontSize="8" fill={SVG_COLORS.textLight} textAnchor="middle">12 ft</text>
          <text x="120" y="145" fontSize="8" fill={SVG_COLORS.text} textAnchor="middle">18-24&quot;</text>

          <text x="45" y="165" fontSize="8" fill={SVG_COLORS.textLight} textAnchor="middle">14 ft+</text>
          <text x="120" y="165" fontSize="8" fill={SVG_COLORS.text} textAnchor="middle">36&quot;+</text>
        </g>

        {/* Key rule */}
        <g transform="translate(100, 268)">
          <rect x="0" y="0" width="400" height="22" rx="4" fill={SVG_COLORS.accentLight} />
          <text x="200" y="15" fontSize="9" fill={SVG_COLORS.accent} textAnchor="middle" fontWeight="bold">
            Goal: Fan blades 7-9 feet from floor • Min 8&quot; from ceiling for airflow
          </text>
        </g>
      </svg>
    </div>
  );
}
