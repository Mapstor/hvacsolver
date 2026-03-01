'use client';

import { SVG_COLORS } from '../../calculators/CalculatorSVG';

/**
 * Illustration showing different AC noises and their causes
 */
export default function ACMakingNoiseSVG() {
  return (
    <div className="w-full bg-slate-50 border border-slate-200 rounded-lg overflow-hidden">
      <svg
        viewBox="0 0 600 320"
        className="w-full h-auto"
        preserveAspectRatio="xMidYMid meet"
        role="img"
        aria-label="AC noise types and their causes diagram"
      >
        <rect width="600" height="320" fill="#f8fafc" />

        <text x="300" y="25" fontSize="14" fontWeight="bold" fill={SVG_COLORS.text} textAnchor="middle">
          AC Noise Diagnosis Guide
        </text>

        {/* AC Unit in center */}
        <g transform="translate(240, 100)">
          <rect x="0" y="0" width="120" height="100" rx="6" fill="#64748b" stroke={SVG_COLORS.stroke} strokeWidth="2" />
          <rect x="10" y="10" width="100" height="60" fill="#475569" rx="4" />
          {/* Fan grille */}
          <circle cx="60" cy="40" r="25" fill="none" stroke="#94a3b8" strokeWidth="2" />
          <line x1="60" y1="15" x2="60" y2="65" stroke="#94a3b8" strokeWidth="1" />
          <line x1="35" y1="40" x2="85" y2="40" stroke="#94a3b8" strokeWidth="1" />
          <text x="60" y="85" fontSize="9" fill="white" textAnchor="middle">AC Unit</text>
        </g>

        {/* Noise types around the unit */}

        {/* Buzzing - top left */}
        <g transform="translate(30, 50)">
          <rect x="0" y="0" width="150" height="60" rx="6" fill="white" stroke="#d97706" strokeWidth="2" />
          <text x="75" y="18" fontSize="10" fontWeight="bold" fill="#d97706" textAnchor="middle">🔊 BUZZING</text>
          <text x="75" y="34" fontSize="8" fill={SVG_COLORS.textLight} textAnchor="middle">• Electrical issue</text>
          <text x="75" y="46" fontSize="8" fill={SVG_COLORS.textLight} textAnchor="middle">• Loose wiring</text>
          <text x="75" y="58" fontSize="8" fill={SVG_COLORS.textLight} textAnchor="middle">• Contactor problem</text>
        </g>
        <path d="M 180,80 L 240,130" stroke="#d97706" strokeWidth="1.5" strokeDasharray="4,2" />

        {/* Squealing - top right */}
        <g transform="translate(420, 50)">
          <rect x="0" y="0" width="150" height="60" rx="6" fill="white" stroke="#b91c1c" strokeWidth="2" />
          <text x="75" y="18" fontSize="10" fontWeight="bold" fill="#b91c1c" textAnchor="middle">🔊 SQUEALING</text>
          <text x="75" y="34" fontSize="8" fill={SVG_COLORS.textLight} textAnchor="middle">• Belt slipping</text>
          <text x="75" y="46" fontSize="8" fill={SVG_COLORS.textLight} textAnchor="middle">• Bearing failure</text>
          <text x="75" y="58" fontSize="8" fill={SVG_COLORS.textLight} textAnchor="middle">• High pressure</text>
        </g>
        <path d="M 420,80 L 360,130" stroke="#b91c1c" strokeWidth="1.5" strokeDasharray="4,2" />

        {/* Clicking - left */}
        <g transform="translate(30, 140)">
          <rect x="0" y="0" width="150" height="60" rx="6" fill="white" stroke="#15803d" strokeWidth="2" />
          <text x="75" y="18" fontSize="10" fontWeight="bold" fill="#15803d" textAnchor="middle">🔊 CLICKING</text>
          <text x="75" y="34" fontSize="8" fill={SVG_COLORS.textLight} textAnchor="middle">• Normal at start/stop</text>
          <text x="75" y="46" fontSize="8" fill={SVG_COLORS.textLight} textAnchor="middle">• Continuous = relay issue</text>
          <text x="75" y="58" fontSize="8" fill={SVG_COLORS.textLight} textAnchor="middle">• Thermostat problem</text>
        </g>
        <path d="M 180,170 L 240,155" stroke="#15803d" strokeWidth="1.5" strokeDasharray="4,2" />

        {/* Rattling - right */}
        <g transform="translate(420, 140)">
          <rect x="0" y="0" width="150" height="60" rx="6" fill="white" stroke="#d97706" strokeWidth="2" />
          <text x="75" y="18" fontSize="10" fontWeight="bold" fill="#d97706" textAnchor="middle">🔊 RATTLING</text>
          <text x="75" y="34" fontSize="8" fill={SVG_COLORS.textLight} textAnchor="middle">• Loose panels/screws</text>
          <text x="75" y="46" fontSize="8" fill={SVG_COLORS.textLight} textAnchor="middle">• Debris in unit</text>
          <text x="75" y="58" fontSize="8" fill={SVG_COLORS.textLight} textAnchor="middle">• Fan blade hitting</text>
        </g>
        <path d="M 420,170 L 360,155" stroke="#d97706" strokeWidth="1.5" strokeDasharray="4,2" />

        {/* Banging - bottom left */}
        <g transform="translate(30, 230)">
          <rect x="0" y="0" width="150" height="60" rx="6" fill="white" stroke="#b91c1c" strokeWidth="2" />
          <text x="75" y="18" fontSize="10" fontWeight="bold" fill="#b91c1c" textAnchor="middle">🔊 BANGING</text>
          <text x="75" y="34" fontSize="8" fill={SVG_COLORS.textLight} textAnchor="middle">• Broken component</text>
          <text x="75" y="46" fontSize="8" fill={SVG_COLORS.textLight} textAnchor="middle">• Compressor issue</text>
          <text x="75" y="58" fontSize="8" fill="#b91c1c" textAnchor="middle" fontWeight="bold">⚠️ Turn off AC!</text>
        </g>
        <path d="M 180,260 L 240,180" stroke="#b91c1c" strokeWidth="1.5" strokeDasharray="4,2" />

        {/* Hissing - bottom right */}
        <g transform="translate(420, 230)">
          <rect x="0" y="0" width="150" height="60" rx="6" fill="white" stroke="#b91c1c" strokeWidth="2" />
          <text x="75" y="18" fontSize="10" fontWeight="bold" fill="#b91c1c" textAnchor="middle">🔊 HISSING</text>
          <text x="75" y="34" fontSize="8" fill={SVG_COLORS.textLight} textAnchor="middle">• Refrigerant leak</text>
          <text x="75" y="46" fontSize="8" fill={SVG_COLORS.textLight} textAnchor="middle">• High pressure</text>
          <text x="75" y="58" fontSize="8" fill="#b91c1c" textAnchor="middle" fontWeight="bold">⚠️ Call technician!</text>
        </g>
        <path d="M 420,260 L 360,180" stroke="#b91c1c" strokeWidth="1.5" strokeDasharray="4,2" />

        {/* Legend */}
        <g transform="translate(200, 300)">
          <circle cx="10" cy="6" r="5" fill="#15803d" />
          <text x="20" y="10" fontSize="8" fill={SVG_COLORS.textLight}>Usually OK</text>
          <circle cx="100" cy="6" r="5" fill="#d97706" />
          <text x="110" y="10" fontSize="8" fill={SVG_COLORS.textLight}>Schedule service</text>
          <circle cx="210" cy="6" r="5" fill="#b91c1c" />
          <text x="220" y="10" fontSize="8" fill={SVG_COLORS.textLight}>Urgent - turn off unit</text>
        </g>
      </svg>
    </div>
  );
}
