'use client';

import { SVG_COLORS } from '../../calculators/CalculatorSVG';

/**
 * Illustration showing why dehumidifiers freeze up
 */
export default function DehumidifierFreezingUpSVG() {
  return (
    <div className="w-full bg-slate-50 border border-slate-200 rounded-lg overflow-hidden">
      <svg
        viewBox="0 0 600 310"
        className="w-full h-auto"
        preserveAspectRatio="xMidYMid meet"
        role="img"
        aria-label="Dehumidifier freezing up causes and solutions"
      >
        <rect width="600" height="310" fill="#f8fafc" />

        <text x="300" y="25" fontSize="14" fontWeight="bold" fill={SVG_COLORS.text} textAnchor="middle">
          Why Your Dehumidifier is Freezing Up
        </text>

        {/* Frozen dehumidifier illustration */}
        <g transform="translate(40, 50)">
          <rect x="0" y="0" width="140" height="170" rx="6" fill="#64748b" stroke={SVG_COLORS.stroke} strokeWidth="2" />

          {/* Frozen coils */}
          <rect x="15" y="20" width="110" height="60" fill="#dbeafe" stroke={SVG_COLORS.cold} strokeWidth="2" rx="4" />

          {/* Ice crystals */}
          <polygon points="35,35 40,50 30,50" fill="white" stroke="#93c5fd" strokeWidth="1" />
          <polygon points="60,30 65,45 55,45" fill="white" stroke="#93c5fd" strokeWidth="1" />
          <polygon points="85,40 90,55 80,55" fill="white" stroke="#93c5fd" strokeWidth="1" />
          <polygon points="105,32 110,47 100,47" fill="white" stroke="#93c5fd" strokeWidth="1" />

          <text x="70" y="70" fontSize="8" fill={SVG_COLORS.cold} textAnchor="middle">ICE BUILDUP</text>

          {/* Control panel */}
          <rect x="30" y="95" width="80" height="25" fill="#1e293b" rx="4" />
          <circle cx="50" cy="107" r="5" fill="#15803d" />
          <rect x="70" y="102" width="30" height="10" fill="#334155" rx="2" />

          {/* Water tank */}
          <rect x="30" y="130" width="80" height="30" fill="#475569" rx="4" />
          <text x="70" y="150" fontSize="7" fill="#94a3b8" textAnchor="middle">TANK</text>

          <text x="70" y="195" fontSize="9" fill={SVG_COLORS.textLight} textAnchor="middle">Frozen Dehumidifier</text>
        </g>

        {/* Causes */}
        <g transform="translate(210, 45)">
          <text x="0" y="0" fontSize="11" fontWeight="bold" fill={SVG_COLORS.text}>Common Causes:</text>

          <g transform="translate(0, 15)">
            <rect x="0" y="0" width="175" height="42" rx="4" fill="white" stroke="#b91c1c" strokeWidth="1.5" />
            <circle cx="18" cy="21" r="10" fill="#fef2f2" />
            <text x="18" y="25" fontSize="10" fill="#b91c1c" textAnchor="middle" fontWeight="bold">1</text>
            <text x="35" y="16" fontSize="8" fontWeight="bold" fill={SVG_COLORS.text}>Room Too Cold</text>
            <text x="35" y="30" fontSize="7" fill={SVG_COLORS.textLight}>Below 65°F (18°C)</text>
          </g>

          <g transform="translate(0, 65)">
            <rect x="0" y="0" width="175" height="42" rx="4" fill="white" stroke="#d97706" strokeWidth="1.5" />
            <circle cx="18" cy="21" r="10" fill="#fef3c7" />
            <text x="18" y="25" fontSize="10" fill="#d97706" textAnchor="middle" fontWeight="bold">2</text>
            <text x="35" y="16" fontSize="8" fontWeight="bold" fill={SVG_COLORS.text}>Poor Airflow</text>
            <text x="35" y="30" fontSize="7" fill={SVG_COLORS.textLight}>Dirty filter or blocked vents</text>
          </g>

          <g transform="translate(0, 115)">
            <rect x="0" y="0" width="175" height="42" rx="4" fill="white" stroke="#d97706" strokeWidth="1.5" />
            <circle cx="18" cy="21" r="10" fill="#fef3c7" />
            <text x="18" y="25" fontSize="10" fill="#d97706" textAnchor="middle" fontWeight="bold">3</text>
            <text x="35" y="16" fontSize="8" fontWeight="bold" fill={SVG_COLORS.text}>Low Refrigerant</text>
            <text x="35" y="30" fontSize="7" fill={SVG_COLORS.textLight}>Coils get too cold</text>
          </g>

          <g transform="translate(0, 165)">
            <rect x="0" y="0" width="175" height="42" rx="4" fill="white" stroke="#64748b" strokeWidth="1.5" />
            <circle cx="18" cy="21" r="10" fill="#f1f5f9" />
            <text x="18" y="25" fontSize="10" fill="#64748b" textAnchor="middle" fontWeight="bold">4</text>
            <text x="35" y="16" fontSize="8" fontWeight="bold" fill={SVG_COLORS.text}>Faulty Defrost Sensor</text>
            <text x="35" y="30" fontSize="7" fill={SVG_COLORS.textLight}>Auto-defrost not working</text>
          </g>
        </g>

        {/* Solutions */}
        <g transform="translate(410, 45)">
          <text x="0" y="0" fontSize="11" fontWeight="bold" fill="#15803d">Solutions:</text>

          <g transform="translate(0, 15)">
            <rect x="0" y="0" width="165" height="80" rx="4" fill="#dcfce7" stroke="#15803d" strokeWidth="1.5" />
            <text x="82" y="18" fontSize="8" fontWeight="bold" fill="#15803d" textAnchor="middle">Immediate Steps</text>
            <text x="10" y="35" fontSize="7" fill={SVG_COLORS.textLight}>1. Turn off and unplug</text>
            <text x="10" y="48" fontSize="7" fill={SVG_COLORS.textLight}>2. Let ice melt (2-4 hours)</text>
            <text x="10" y="61" fontSize="7" fill={SVG_COLORS.textLight}>3. Check/replace filter</text>
            <text x="10" y="74" fontSize="7" fill={SVG_COLORS.textLight}>4. Ensure room is 65°F+</text>
          </g>

          <g transform="translate(0, 105)">
            <rect x="0" y="0" width="165" height="60" rx="4" fill="white" stroke={SVG_COLORS.stroke} strokeWidth="1" />
            <text x="82" y="18" fontSize="8" fontWeight="bold" fill={SVG_COLORS.text} textAnchor="middle">Prevention</text>
            <text x="10" y="35" fontSize="7" fill={SVG_COLORS.textLight}>• Clean filter monthly</text>
            <text x="10" y="48" fontSize="7" fill={SVG_COLORS.textLight}>• Don&apos;t run below 60°F</text>
          </g>

          <g transform="translate(0, 175)">
            <rect x="0" y="0" width="165" height="35" rx="4" fill="#fef2f2" stroke="#b91c1c" strokeWidth="1" />
            <text x="82" y="14" fontSize="7" fontWeight="bold" fill="#b91c1c" textAnchor="middle">Call for service if:</text>
            <text x="82" y="28" fontSize="7" fill={SVG_COLORS.textLight} textAnchor="middle">Keeps freezing after fixes</text>
          </g>
        </g>

        {/* Temperature guide */}
        <g transform="translate(40, 280)">
          <text x="0" y="0" fontSize="8" fill={SVG_COLORS.textLight}>
            Operating range: 65-90°F (18-32°C) • Below 60°F: most units will freeze • Consider a &quot;low temp&quot; model for basements
          </text>
        </g>
      </svg>
    </div>
  );
}
