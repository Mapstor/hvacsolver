'use client';

import { SVG_COLORS } from '../../calculators/CalculatorSVG';

/**
 * Illustration explaining why condensation forms on AC vents
 */
export default function CondensationOnACVentsSVG() {
  return (
    <div className="w-full bg-slate-50 border border-slate-200 rounded-lg overflow-hidden">
      <svg
        viewBox="0 0 600 300"
        className="w-full h-auto"
        preserveAspectRatio="xMidYMid meet"
        role="img"
        aria-label="Diagram showing why condensation forms on AC vents"
      >
        <rect width="600" height="300" fill="#f8fafc" />

        <text x="300" y="25" fontSize="14" fontWeight="bold" fill={SVG_COLORS.text} textAnchor="middle">
          Why Condensation Forms on AC Vents
        </text>

        {/* Left side - The process */}
        <g transform="translate(40, 50)">
          <rect x="0" y="0" width="280" height="210" rx="8" fill="white" stroke={SVG_COLORS.stroke} strokeWidth="2" />
          <text x="140" y="20" fontSize="10" fontWeight="bold" fill={SVG_COLORS.text} textAnchor="middle">
            What Causes Vent Condensation
          </text>

          {/* Vent grille */}
          <rect x="100" y="40" width="80" height="50" fill={SVG_COLORS.cold} stroke={SVG_COLORS.stroke} strokeWidth="2" rx="4" />
          {[52, 62, 72, 82].map((y) => (
            <line key={y} x1="110" y1={y} x2="170" y2={y} stroke="white" strokeWidth="1.5" />
          ))}
          <text x="140" y="105" fontSize="8" fill={SVG_COLORS.textLight} textAnchor="middle">Cold Vent Surface</text>
          <text x="140" y="117" fontSize="8" fill={SVG_COLORS.cold} textAnchor="middle">~55°F (13°C)</text>

          {/* Warm humid air with label */}
          <g transform="translate(15, 85)">
            {/* Humidity clouds */}
            <circle cx="25" cy="20" r="12" fill="#93c5fd" opacity="0.4" />
            <circle cx="45" cy="15" r="10" fill="#93c5fd" opacity="0.4" />
            <circle cx="35" cy="30" r="8" fill="#93c5fd" opacity="0.4" />

            {/* Arrow toward vent */}
            <path d="M 55,22 L 72,22" stroke={SVG_COLORS.heat} strokeWidth="2" />
            <polygon points="72,18 72,26 82,22" fill={SVG_COLORS.heat} />

            {/* Label below clouds */}
            <text x="35" y="52" fontSize="7" fill={SVG_COLORS.textLight} textAnchor="middle">Warm, humid</text>
            <text x="35" y="62" fontSize="7" fill={SVG_COLORS.textLight} textAnchor="middle">room air</text>
          </g>

          {/* Condensation droplets on vent */}
          {[110, 125, 145, 160, 170].map((x, i) => (
            <ellipse key={x} cx={x} cy={88 + (i % 2) * 4} rx="3" ry="4" fill="#60a5fa" />
          ))}

          {/* Result - moved down */}
          <line x1="20" y1="160" x2="260" y2="160" stroke={SVG_COLORS.strokeLight} strokeWidth="1" />
          <text x="140" y="178" fontSize="9" fill={SVG_COLORS.text} textAnchor="middle">
            When warm, moist air contacts cold vent:
          </text>
          <text x="140" y="193" fontSize="9" fontWeight="bold" fill={SVG_COLORS.cold} textAnchor="middle">
            Air cools below dew point → Water forms
          </text>
        </g>

        {/* Right side - Common causes */}
        <g transform="translate(340, 50)">
          <rect x="0" y="0" width="220" height="210" rx="8" fill="white" stroke={SVG_COLORS.stroke} strokeWidth="2" />
          <rect x="0" y="0" width="220" height="28" rx="8" fill={SVG_COLORS.accent} />
          <rect x="0" y="20" width="220" height="8" fill={SVG_COLORS.accent} />
          <text x="110" y="19" fontSize="10" fontWeight="bold" fill="white" textAnchor="middle">
            Common Causes
          </text>

          {/* List of causes */}
          <g transform="translate(15, 45)">
            <circle cx="8" cy="8" r="4" fill="#d97706" />
            <text x="20" y="12" fontSize="9" fill={SVG_COLORS.text}>High indoor humidity (&gt;55%)</text>

            <circle cx="8" cy="38" r="4" fill="#d97706" />
            <text x="20" y="42" fontSize="9" fill={SVG_COLORS.text}>Poor duct insulation</text>

            <circle cx="8" cy="68" r="4" fill="#d97706" />
            <text x="20" y="72" fontSize="9" fill={SVG_COLORS.text}>Blocked return air flow</text>

            <circle cx="8" cy="98" r="4" fill="#d97706" />
            <text x="20" y="102" fontSize="9" fill={SVG_COLORS.text}>Air leaks around vent boot</text>

            <circle cx="8" cy="128" r="4" fill="#d97706" />
            <text x="20" y="132" fontSize="9" fill={SVG_COLORS.text}>Dirty air filter restricting flow</text>

            <circle cx="8" cy="158" r="4" fill="#d97706" />
            <text x="20" y="162" fontSize="9" fill={SVG_COLORS.text}>AC running too cold</text>
          </g>
        </g>

        {/* Bottom note */}
        <text x="300" y="285" fontSize="9" fill={SVG_COLORS.textLight} textAnchor="middle">
          Some condensation is normal in humid climates; excessive sweating indicates an issue
        </text>
      </svg>
    </div>
  );
}
