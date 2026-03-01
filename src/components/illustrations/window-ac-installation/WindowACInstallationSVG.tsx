'use client';

import { SVG_COLORS } from '../../calculators/CalculatorSVG';

/**
 * Illustration showing window AC installation steps
 */
export default function WindowACInstallationSVG() {
  return (
    <div className="w-full bg-slate-50 border border-slate-200 rounded-lg overflow-hidden">
      <svg
        viewBox="0 0 600 320"
        className="w-full h-auto"
        preserveAspectRatio="xMidYMid meet"
        role="img"
        aria-label="Window AC installation guide"
      >
        <rect width="600" height="320" fill="#f8fafc" />

        <text x="300" y="25" fontSize="14" fontWeight="bold" fill={SVG_COLORS.text} textAnchor="middle">
          Window AC Installation Guide
        </text>

        {/* Window cross-section */}
        <g transform="translate(50, 50)">
          {/* Window frame */}
          <rect x="0" y="0" width="200" height="130" fill="white" stroke="#64748b" strokeWidth="3" />

          {/* Window sash (lower) */}
          <rect x="5" y="60" width="190" height="65" fill="#94a3b8" stroke="#64748b" strokeWidth="2" />

          {/* AC unit */}
          <rect x="35" y="45" width="130" height="80" fill="#64748b" rx="4" />
          <rect x="45" y="55" width="50" height="60" fill="#475569" rx="2" />
          <rect x="100" y="55" width="55" height="25" fill="#334155" rx="2" />
          <rect x="100" y="85" width="55" height="25" fill="#334155" rx="2" />

          {/* Side panels */}
          <rect x="5" y="55" width="30" height="70" fill="#e2e8f0" stroke={SVG_COLORS.stroke} strokeWidth="1" />
          <rect x="165" y="55" width="30" height="70" fill="#e2e8f0" stroke={SVG_COLORS.stroke} strokeWidth="1" />
          <text x="20" y="95" fontSize="6" fill={SVG_COLORS.textLight} textAnchor="middle" transform="rotate(-90, 20, 95)">PANEL</text>
          <text x="180" y="95" fontSize="6" fill={SVG_COLORS.textLight} textAnchor="middle" transform="rotate(-90, 180, 95)">PANEL</text>

          {/* Tilt angle indicator */}
          <line x1="35" y1="125" x2="165" y2="130" stroke="#15803d" strokeWidth="2" />
          <text x="100" y="145" fontSize="7" fill="#15803d" textAnchor="middle">Slight tilt outward for drainage</text>

          {/* Support bracket */}
          <rect x="60" y="125" width="80" height="8" fill="#d97706" />
          <text x="100" y="155" fontSize="7" fill="#d97706" textAnchor="middle">Support bracket (heavy units)</text>
        </g>

        {/* Installation steps */}
        <g transform="translate(280, 45)">
          <text x="0" y="0" fontSize="11" fontWeight="bold" fill={SVG_COLORS.text}>Installation Steps:</text>

          <g transform="translate(0, 18)">
            <circle cx="12" cy="12" r="12" fill={SVG_COLORS.cold} />
            <text x="12" y="16" fontSize="10" fill="white" textAnchor="middle" fontWeight="bold">1</text>
            <text x="32" y="16" fontSize="9" fill={SVG_COLORS.text}>Check window opens 6&quot;+ and locks</text>
          </g>

          <g transform="translate(0, 48)">
            <circle cx="12" cy="12" r="12" fill={SVG_COLORS.cold} />
            <text x="12" y="16" fontSize="10" fill="white" textAnchor="middle" fontWeight="bold">2</text>
            <text x="32" y="16" fontSize="9" fill={SVG_COLORS.text}>Install mounting brackets (if incl.)</text>
          </g>

          <g transform="translate(0, 78)">
            <circle cx="12" cy="12" r="12" fill={SVG_COLORS.cold} />
            <text x="12" y="16" fontSize="10" fill="white" textAnchor="middle" fontWeight="bold">3</text>
            <text x="32" y="16" fontSize="9" fill={SVG_COLORS.text}>Place AC in window, lower sash</text>
          </g>

          <g transform="translate(0, 108)">
            <circle cx="12" cy="12" r="12" fill={SVG_COLORS.cold} />
            <text x="12" y="16" fontSize="10" fill="white" textAnchor="middle" fontWeight="bold">4</text>
            <text x="32" y="16" fontSize="9" fill={SVG_COLORS.text}>Extend side panels, secure</text>
          </g>

          <g transform="translate(0, 138)">
            <circle cx="12" cy="12" r="12" fill={SVG_COLORS.cold} />
            <text x="12" y="16" fontSize="10" fill="white" textAnchor="middle" fontWeight="bold">5</text>
            <text x="32" y="16" fontSize="9" fill={SVG_COLORS.text}>Ensure 1/4&quot; tilt for drainage</text>
          </g>
        </g>

        {/* Key tips */}
        <g transform="translate(50, 225)">
          <text x="0" y="0" fontSize="11" fontWeight="bold" fill={SVG_COLORS.text}>Key Tips:</text>

          <g transform="translate(0, 18)">
            <rect x="0" y="0" width="160" height="55" rx="4" fill="#dcfce7" stroke="#15803d" strokeWidth="1" />
            <text x="80" y="18" fontSize="9" fontWeight="bold" fill="#15803d" textAnchor="middle">Electrical</text>
            <text x="80" y="34" fontSize="7" fill={SVG_COLORS.textLight} textAnchor="middle">Use dedicated circuit</text>
            <text x="80" y="46" fontSize="7" fill={SVG_COLORS.textLight} textAnchor="middle">No extension cords</text>
          </g>

          <g transform="translate(170, 18)">
            <rect x="0" y="0" width="160" height="55" rx="4" fill="#fef3c7" stroke="#d97706" strokeWidth="1" />
            <text x="80" y="18" fontSize="9" fontWeight="bold" fill="#d97706" textAnchor="middle">Support</text>
            <text x="80" y="34" fontSize="7" fill={SVG_COLORS.textLight} textAnchor="middle">Units 50+ lbs need</text>
            <text x="80" y="46" fontSize="7" fill={SVG_COLORS.textLight} textAnchor="middle">external bracket support</text>
          </g>

          <g transform="translate(340, 18)">
            <rect x="0" y="0" width="160" height="55" rx="4" fill="#dbeafe" stroke={SVG_COLORS.cold} strokeWidth="1" />
            <text x="80" y="18" fontSize="9" fontWeight="bold" fill={SVG_COLORS.cold} textAnchor="middle">Sealing</text>
            <text x="80" y="34" fontSize="7" fill={SVG_COLORS.textLight} textAnchor="middle">Weatherstrip gaps</text>
            <text x="80" y="46" fontSize="7" fill={SVG_COLORS.textLight} textAnchor="middle">for efficiency + bugs</text>
          </g>
        </g>

        {/* Bottom note */}
        <g transform="translate(100, 308)">
          <text x="200" y="0" fontSize="8" fill={SVG_COLORS.textLight} textAnchor="middle">
            Two-person job recommended • Check rental/HOA rules first
          </text>
        </g>
      </svg>
    </div>
  );
}
