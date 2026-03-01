'use client';

import { SVG_COLORS } from '../../calculators/CalculatorSVG';

/**
 * Illustration showing causes and solutions for window AC freezing up
 */
export default function WindowACFreezingUpSVG() {
  return (
    <div className="w-full bg-slate-50 border border-slate-200 rounded-lg overflow-hidden">
      <svg
        viewBox="0 0 600 300"
        className="w-full h-auto"
        preserveAspectRatio="xMidYMid meet"
        role="img"
        aria-label="Window AC freezing up causes and solutions"
      >
        <rect width="600" height="300" fill="#f8fafc" />

        <text x="300" y="25" fontSize="14" fontWeight="bold" fill={SVG_COLORS.text} textAnchor="middle">
          Window AC Freezing Up — Causes & Fixes
        </text>

        {/* Window AC with ice illustration */}
        <g transform="translate(50, 50)">
          <rect x="0" y="0" width="130" height="90" fill="#64748b" rx="4" />
          <rect x="10" y="10" width="50" height="70" fill="#334155" rx="2" />

          {/* Ice crystals */}
          <circle cx="20" cy="25" r="6" fill="#bfdbfe" />
          <circle cx="35" cy="35" r="8" fill="#93c5fd" />
          <circle cx="25" cy="50" r="7" fill="#bfdbfe" />
          <circle cx="45" cy="45" r="5" fill="#dbeafe" />
          <circle cx="30" cy="65" r="6" fill="#93c5fd" />

          {/* Vent area */}
          <rect x="70" y="15" width="50" height="25" fill="#475569" rx="2" />
          <rect x="70" y="45" width="50" height="25" fill="#475569" rx="2" />

          <text x="65" y="105" fontSize="9" fill="#b91c1c" textAnchor="middle" fontWeight="bold">FROZEN COILS</text>
        </g>

        {/* Causes */}
        <g transform="translate(200, 45)">
          <text x="0" y="0" fontSize="11" fontWeight="bold" fill={SVG_COLORS.text}>Common Causes:</text>

          <g transform="translate(0, 18)">
            <rect x="0" y="0" width="180" height="40" rx="4" fill="#fef2f2" stroke="#b91c1c" strokeWidth="1" />
            <text x="10" y="16" fontSize="9" fontWeight="bold" fill="#b91c1c">Dirty Filter</text>
            <text x="10" y="32" fontSize="7" fill={SVG_COLORS.textLight}>Restricted airflow = cold coil = ice</text>
          </g>

          <g transform="translate(190, 18)">
            <rect x="0" y="0" width="180" height="40" rx="4" fill="#fef2f2" stroke="#b91c1c" strokeWidth="1" />
            <text x="10" y="16" fontSize="9" fontWeight="bold" fill="#b91c1c">Low Refrigerant</text>
            <text x="10" y="32" fontSize="7" fill={SVG_COLORS.textLight}>Low pressure = coil too cold</text>
          </g>

          <g transform="translate(0, 65)">
            <rect x="0" y="0" width="180" height="40" rx="4" fill="#fef3c7" stroke="#d97706" strokeWidth="1" />
            <text x="10" y="16" fontSize="9" fontWeight="bold" fill="#d97706">Running Too Cold</text>
            <text x="10" y="32" fontSize="7" fill={SVG_COLORS.textLight}>Outdoor temp below 60°F</text>
          </g>

          <g transform="translate(190, 65)">
            <rect x="0" y="0" width="180" height="40" rx="4" fill="#fef3c7" stroke="#d97706" strokeWidth="1" />
            <text x="10" y="16" fontSize="9" fontWeight="bold" fill="#d97706">Blower Issues</text>
            <text x="10" y="32" fontSize="7" fill={SVG_COLORS.textLight}>Fan not moving enough air</text>
          </g>
        </g>

        {/* Fix steps */}
        <g transform="translate(50, 175)">
          <text x="0" y="0" fontSize="11" fontWeight="bold" fill={SVG_COLORS.text}>How to Fix:</text>

          <g transform="translate(0, 18)">
            <circle cx="15" cy="15" r="15" fill={SVG_COLORS.cold} />
            <text x="15" y="20" fontSize="12" fill="white" textAnchor="middle" fontWeight="bold">1</text>
            <text x="40" y="12" fontSize="9" fontWeight="bold" fill={SVG_COLORS.text}>Turn off AC</text>
            <text x="40" y="26" fontSize="8" fill={SVG_COLORS.textLight}>Let ice melt completely (2-4 hours)</text>
          </g>

          <g transform="translate(200, 18)">
            <circle cx="15" cy="15" r="15" fill={SVG_COLORS.cold} />
            <text x="15" y="20" fontSize="12" fill="white" textAnchor="middle" fontWeight="bold">2</text>
            <text x="40" y="12" fontSize="9" fontWeight="bold" fill={SVG_COLORS.text}>Check/replace filter</text>
            <text x="40" y="26" fontSize="8" fill={SVG_COLORS.textLight}>Clean or swap dirty filters</text>
          </g>

          <g transform="translate(400, 18)">
            <circle cx="15" cy="15" r="15" fill={SVG_COLORS.cold} />
            <text x="15" y="20" fontSize="12" fill="white" textAnchor="middle" fontWeight="bold">3</text>
            <text x="40" y="12" fontSize="9" fontWeight="bold" fill={SVG_COLORS.text}>Clean coils</text>
            <text x="40" y="26" fontSize="8" fill={SVG_COLORS.textLight}>Remove dust and debris</text>
          </g>

          <g transform="translate(0, 60)">
            <circle cx="15" cy="15" r="15" fill={SVG_COLORS.cold} />
            <text x="15" y="20" fontSize="12" fill="white" textAnchor="middle" fontWeight="bold">4</text>
            <text x="40" y="12" fontSize="9" fontWeight="bold" fill={SVG_COLORS.text}>Run fan only (30 min)</text>
            <text x="40" y="26" fontSize="8" fill={SVG_COLORS.textLight}>Dry out remaining moisture</text>
          </g>

          <g transform="translate(200, 60)">
            <circle cx="15" cy="15" r="15" fill="#d97706" />
            <text x="15" y="20" fontSize="12" fill="white" textAnchor="middle" fontWeight="bold">5</text>
            <text x="40" y="12" fontSize="9" fontWeight="bold" fill={SVG_COLORS.text}>Still freezing?</text>
            <text x="40" y="26" fontSize="8" fill={SVG_COLORS.textLight}>May need refrigerant or repair</text>
          </g>
        </g>

        {/* Bottom tip */}
        <g transform="translate(100, 285)">
          <text x="200" y="0" fontSize="8" fill={SVG_COLORS.textLight} textAnchor="middle">
            Prevention: Replace filter monthly • Don&apos;t run AC when outdoor temp is below 60°F
          </text>
        </g>
      </svg>
    </div>
  );
}
