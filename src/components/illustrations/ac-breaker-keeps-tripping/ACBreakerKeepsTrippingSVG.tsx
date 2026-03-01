'use client';

import { SVG_COLORS } from '../../calculators/CalculatorSVG';

/**
 * Illustration showing why AC breakers trip
 */
export default function ACBreakerKeepsTrippingSVG() {
  return (
    <div className="w-full bg-slate-50 border border-slate-200 rounded-lg overflow-hidden">
      <svg
        viewBox="0 0 600 280"
        className="w-full h-auto"
        preserveAspectRatio="xMidYMid meet"
        role="img"
        aria-label="Diagram showing common causes of AC breaker tripping"
      >
        <rect width="600" height="280" fill="#f8fafc" />

        <text x="300" y="25" fontSize="14" fontWeight="bold" fill={SVG_COLORS.text} textAnchor="middle">
          Why Your AC Breaker Keeps Tripping
        </text>

        {/* Electrical Panel */}
        <g transform="translate(40, 50)">
          <rect x="0" y="0" width="120" height="180" rx="4" fill="#64748b" stroke={SVG_COLORS.stroke} strokeWidth="2" />
          <rect x="10" y="10" width="100" height="160" fill="#334155" rx="2" />

          {/* Breakers */}
          <rect x="20" y="20" width="35" height="20" fill="#15803d" rx="2" />
          <text x="37" y="34" fontSize="7" fill="white" textAnchor="middle">ON</text>

          <rect x="65" y="20" width="35" height="20" fill="#15803d" rx="2" />
          <text x="82" y="34" fontSize="7" fill="white" textAnchor="middle">ON</text>

          <rect x="20" y="50" width="35" height="20" fill="#15803d" rx="2" />
          <text x="37" y="64" fontSize="7" fill="white" textAnchor="middle">ON</text>

          {/* Tripped AC breaker */}
          <rect x="65" y="50" width="35" height="20" fill="#b91c1c" rx="2" />
          <text x="82" y="64" fontSize="7" fill="white" textAnchor="middle">TRIP</text>
          <text x="82" y="85" fontSize="8" fill="#b91c1c" textAnchor="middle" fontWeight="bold">AC</text>

          <rect x="20" y="100" width="35" height="20" fill="#15803d" rx="2" />
          <rect x="65" y="100" width="35" height="20" fill="#15803d" rx="2" />
          <rect x="20" y="130" width="35" height="20" fill="#15803d" rx="2" />
          <rect x="65" y="130" width="35" height="20" fill="#15803d" rx="2" />

          <text x="60" y="200" fontSize="9" fill={SVG_COLORS.textLight} textAnchor="middle">Electrical Panel</text>
        </g>

        {/* Arrow to causes */}
        <path d="M 170,140 L 200,140" stroke={SVG_COLORS.stroke} strokeWidth="2" fill="none" markerEnd="url(#arrowhead)" />

        {/* Common Causes */}
        <g transform="translate(210, 45)">
          <text x="0" y="0" fontSize="11" fontWeight="bold" fill={SVG_COLORS.text}>Common Causes:</text>

          {/* Cause 1 */}
          <g transform="translate(0, 20)">
            <rect x="0" y="0" width="170" height="45" rx="4" fill="white" stroke="#d97706" strokeWidth="1.5" />
            <circle cx="20" cy="22" r="12" fill="#fef3c7" />
            <text x="20" y="27" fontSize="14" fill="#d97706" textAnchor="middle">1</text>
            <text x="40" y="18" fontSize="9" fontWeight="bold" fill={SVG_COLORS.text}>Dirty Air Filter</text>
            <text x="40" y="32" fontSize="8" fill={SVG_COLORS.textLight}>Restricted airflow → overheating</text>
          </g>

          {/* Cause 2 */}
          <g transform="translate(0, 75)">
            <rect x="0" y="0" width="170" height="45" rx="4" fill="white" stroke="#d97706" strokeWidth="1.5" />
            <circle cx="20" cy="22" r="12" fill="#fef3c7" />
            <text x="20" y="27" fontSize="14" fill="#d97706" textAnchor="middle">2</text>
            <text x="40" y="18" fontSize="9" fontWeight="bold" fill={SVG_COLORS.text}>Dirty Condenser</text>
            <text x="40" y="32" fontSize="8" fill={SVG_COLORS.textLight}>High head pressure → amp draw</text>
          </g>

          {/* Cause 3 */}
          <g transform="translate(0, 130)">
            <rect x="0" y="0" width="170" height="45" rx="4" fill="white" stroke="#b91c1c" strokeWidth="1.5" />
            <circle cx="20" cy="22" r="12" fill="#fef2f2" />
            <text x="20" y="27" fontSize="14" fill="#b91c1c" textAnchor="middle">3</text>
            <text x="40" y="18" fontSize="9" fontWeight="bold" fill={SVG_COLORS.text}>Compressor Issue</text>
            <text x="40" y="32" fontSize="8" fill={SVG_COLORS.textLight}>Hard start / failing motor</text>
          </g>
        </g>

        {/* More causes on right */}
        <g transform="translate(400, 45)">
          {/* Cause 4 */}
          <g transform="translate(0, 20)">
            <rect x="0" y="0" width="170" height="45" rx="4" fill="white" stroke="#d97706" strokeWidth="1.5" />
            <circle cx="20" cy="22" r="12" fill="#fef3c7" />
            <text x="20" y="27" fontSize="14" fill="#d97706" textAnchor="middle">4</text>
            <text x="40" y="18" fontSize="9" fontWeight="bold" fill={SVG_COLORS.text}>Loose Wiring</text>
            <text x="40" y="32" fontSize="8" fill={SVG_COLORS.textLight}>Arcing causes overcurrent</text>
          </g>

          {/* Cause 5 */}
          <g transform="translate(0, 75)">
            <rect x="0" y="0" width="170" height="45" rx="4" fill="white" stroke="#d97706" strokeWidth="1.5" />
            <circle cx="20" cy="22" r="12" fill="#fef3c7" />
            <text x="20" y="27" fontSize="14" fill="#d97706" textAnchor="middle">5</text>
            <text x="40" y="18" fontSize="9" fontWeight="bold" fill={SVG_COLORS.text}>Low Refrigerant</text>
            <text x="40" y="32" fontSize="8" fill={SVG_COLORS.textLight}>Compressor runs too long</text>
          </g>

          {/* Cause 6 */}
          <g transform="translate(0, 130)">
            <rect x="0" y="0" width="170" height="45" rx="4" fill="white" stroke="#b91c1c" strokeWidth="1.5" />
            <circle cx="20" cy="22" r="12" fill="#fef2f2" />
            <text x="20" y="27" fontSize="14" fill="#b91c1c" textAnchor="middle">6</text>
            <text x="40" y="18" fontSize="9" fontWeight="bold" fill={SVG_COLORS.text}>Bad Breaker</text>
            <text x="40" y="32" fontSize="8" fill={SVG_COLORS.textLight}>Breaker itself is failing</text>
          </g>
        </g>

        {/* Bottom tip */}
        <g transform="translate(100, 258)">
          <rect x="0" y="0" width="400" height="18" rx="4" fill={SVG_COLORS.accentLight} />
          <text x="200" y="13" fontSize="9" fill={SVG_COLORS.accent} textAnchor="middle" fontWeight="bold">
            If breaker trips immediately on reset → call an electrician (potential short circuit)
          </text>
        </g>
      </svg>
    </div>
  );
}
