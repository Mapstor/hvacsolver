'use client';

import { SVG_COLORS } from '../../calculators/CalculatorSVG';

/**
 * Illustration explaining how AC removes humidity
 */
export default function DoesACRemoveHumiditySVG() {
  return (
    <div className="w-full bg-slate-50 border border-slate-200 rounded-lg overflow-hidden">
      <svg
        viewBox="0 0 600 280"
        className="w-full h-auto"
        preserveAspectRatio="xMidYMid meet"
        role="img"
        aria-label="How air conditioning removes humidity"
      >
        <rect width="600" height="280" fill="#f8fafc" />

        <text x="300" y="25" fontSize="14" fontWeight="bold" fill={SVG_COLORS.text} textAnchor="middle">
          How Your AC Removes Humidity
        </text>

        {/* Step by step process */}
        <g transform="translate(30, 55)">
          {/* Step 1 - Humid air enters */}
          <g transform="translate(0, 0)">
            <rect x="0" y="0" width="120" height="90" rx="6" fill="white" stroke={SVG_COLORS.cold} strokeWidth="2" />
            <circle cx="20" cy="20" r="12" fill={SVG_COLORS.cold} />
            <text x="20" y="24" fontSize="10" fill="white" textAnchor="middle" fontWeight="bold">1</text>
            <text x="70" y="20" fontSize="9" fontWeight="bold" fill={SVG_COLORS.text}>Humid Air</text>
            <text x="70" y="33" fontSize="9" fontWeight="bold" fill={SVG_COLORS.text}>Enters</text>

            {/* Water droplets in air */}
            <circle cx="30" cy="55" r="4" fill="#60a5fa" opacity="0.6" />
            <circle cx="50" cy="60" r="3" fill="#60a5fa" opacity="0.5" />
            <circle cx="70" cy="52" r="4" fill="#60a5fa" opacity="0.6" />
            <circle cx="90" cy="58" r="3" fill="#60a5fa" opacity="0.5" />
            <text x="60" y="80" fontSize="7" fill={SVG_COLORS.textLight} textAnchor="middle">Moisture in air</text>
          </g>

          {/* Arrow */}
          <path d="M 125,45 L 145,45" stroke={SVG_COLORS.stroke} strokeWidth="2" />
          <polygon points="145,45 140,42 140,48" fill={SVG_COLORS.stroke} />

          {/* Step 2 - Cold coil */}
          <g transform="translate(150, 0)">
            <rect x="0" y="0" width="120" height="90" rx="6" fill="white" stroke={SVG_COLORS.cold} strokeWidth="2" />
            <circle cx="20" cy="20" r="12" fill={SVG_COLORS.cold} />
            <text x="20" y="24" fontSize="10" fill="white" textAnchor="middle" fontWeight="bold">2</text>
            <text x="70" y="20" fontSize="9" fontWeight="bold" fill={SVG_COLORS.text}>Hits Cold</text>
            <text x="70" y="33" fontSize="9" fontWeight="bold" fill={SVG_COLORS.text}>Evap Coil</text>

            {/* Coil representation */}
            <rect x="20" y="45" width="80" height="30" fill="#dbeafe" stroke={SVG_COLORS.cold} strokeWidth="1" rx="2" />
            <text x="60" y="55" fontSize="6" fill={SVG_COLORS.cold} textAnchor="middle">COLD</text>
            <text x="60" y="65" fontSize="6" fill={SVG_COLORS.cold} textAnchor="middle">40-45°F</text>
            <text x="60" y="85" fontSize="7" fill={SVG_COLORS.textLight} textAnchor="middle">Below dew point</text>
          </g>

          {/* Arrow */}
          <path d="M 275,45 L 295,45" stroke={SVG_COLORS.stroke} strokeWidth="2" />
          <polygon points="295,45 290,42 290,48" fill={SVG_COLORS.stroke} />

          {/* Step 3 - Condensation */}
          <g transform="translate(300, 0)">
            <rect x="0" y="0" width="120" height="90" rx="6" fill="white" stroke={SVG_COLORS.cold} strokeWidth="2" />
            <circle cx="20" cy="20" r="12" fill={SVG_COLORS.cold} />
            <text x="20" y="24" fontSize="10" fill="white" textAnchor="middle" fontWeight="bold">3</text>
            <text x="70" y="20" fontSize="9" fontWeight="bold" fill={SVG_COLORS.text}>Moisture</text>
            <text x="70" y="33" fontSize="9" fontWeight="bold" fill={SVG_COLORS.text}>Condenses</text>

            {/* Water droplets falling */}
            <ellipse cx="40" cy="50" rx="3" ry="5" fill="#60a5fa" />
            <ellipse cx="60" cy="55" rx="3" ry="5" fill="#60a5fa" />
            <ellipse cx="80" cy="52" rx="3" ry="5" fill="#60a5fa" />
            <path d="M 40,58 L 40,75 M 60,63 L 60,75 M 80,60 L 80,75" stroke="#60a5fa" strokeWidth="1" strokeDasharray="2,2" />
            <text x="60" y="85" fontSize="7" fill={SVG_COLORS.textLight} textAnchor="middle">Drips to drain pan</text>
          </g>

          {/* Arrow */}
          <path d="M 425,45 L 445,45" stroke={SVG_COLORS.stroke} strokeWidth="2" />
          <polygon points="445,45 440,42 440,48" fill={SVG_COLORS.stroke} />

          {/* Step 4 - Dry cool air */}
          <g transform="translate(450, 0)">
            <rect x="0" y="0" width="120" height="90" rx="6" fill="white" stroke="#15803d" strokeWidth="2" />
            <circle cx="20" cy="20" r="12" fill="#15803d" />
            <text x="20" y="24" fontSize="10" fill="white" textAnchor="middle" fontWeight="bold">4</text>
            <text x="70" y="20" fontSize="9" fontWeight="bold" fill={SVG_COLORS.text}>Dry, Cool</text>
            <text x="70" y="33" fontSize="9" fontWeight="bold" fill={SVG_COLORS.text}>Air Out</text>

            {/* Clean air arrows */}
            <path d="M 30,55 L 90,55" stroke="#15803d" strokeWidth="2" />
            <polygon points="90,55 85,52 85,58" fill="#15803d" />
            <path d="M 30,70 L 80,70" stroke="#15803d" strokeWidth="2" />
            <polygon points="80,70 75,67 75,73" fill="#15803d" />
            <text x="60" y="85" fontSize="7" fill="#15803d" textAnchor="middle">Less humidity!</text>
          </g>
        </g>

        {/* Key fact box */}
        <g transform="translate(30, 165)">
          <rect x="0" y="0" width="540" height="55" rx="6" fill="white" stroke={SVG_COLORS.stroke} strokeWidth="1.5" />
          <text x="270" y="20" fontSize="10" fontWeight="bold" fill={SVG_COLORS.text} textAnchor="middle">
            Yes, AC Removes Humidity — But It&apos;s a Byproduct, Not the Main Goal
          </text>
          <text x="270" y="38" fontSize="8" fill={SVG_COLORS.textLight} textAnchor="middle">
            ACs are designed to cool air. Dehumidification happens because air must be cooled below its dew point.
          </text>
          <text x="270" y="50" fontSize="8" fill={SVG_COLORS.textLight} textAnchor="middle">
            For heavy humidity: consider a dedicated dehumidifier (more efficient at moisture removal)
          </text>
        </g>

        {/* Typical removal rate */}
        <g transform="translate(30, 235)">
          <rect x="0" y="0" width="260" height="35" rx="4" fill={SVG_COLORS.accentLight} />
          <text x="130" y="15" fontSize="9" fontWeight="bold" fill={SVG_COLORS.accent} textAnchor="middle">
            Typical AC Moisture Removal
          </text>
          <text x="130" y="28" fontSize="8" fill={SVG_COLORS.textLight} textAnchor="middle">
            5-20 gallons/day depending on humidity & runtime
          </text>
        </g>

        {/* Limitations */}
        <g transform="translate(310, 235)">
          <rect x="0" y="0" width="260" height="35" rx="4" fill="#fef2f2" />
          <text x="130" y="15" fontSize="9" fontWeight="bold" fill="#b91c1c" textAnchor="middle">
            AC Dehumidification Limits
          </text>
          <text x="130" y="28" fontSize="8" fill={SVG_COLORS.textLight} textAnchor="middle">
            Won&apos;t work well if oversized or fan set to ON
          </text>
        </g>
      </svg>
    </div>
  );
}
