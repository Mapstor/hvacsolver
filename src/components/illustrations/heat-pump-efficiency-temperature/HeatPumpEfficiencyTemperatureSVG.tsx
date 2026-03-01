'use client';

import { SVG_COLORS } from '../../calculators/CalculatorSVG';

/**
 * Illustration showing heat pump efficiency vs temperature
 */
export default function HeatPumpEfficiencyTemperatureSVG() {
  return (
    <div className="w-full bg-slate-50 border border-slate-200 rounded-lg overflow-hidden">
      <svg
        viewBox="0 0 600 300"
        className="w-full h-auto"
        preserveAspectRatio="xMidYMid meet"
        role="img"
        aria-label="Heat pump efficiency vs outdoor temperature chart"
      >
        <rect width="600" height="300" fill="#f8fafc" />

        <text x="300" y="25" fontSize="14" fontWeight="bold" fill={SVG_COLORS.text} textAnchor="middle">
          Heat Pump Efficiency vs Outdoor Temperature
        </text>

        {/* Chart area */}
        <g transform="translate(80, 55)">
          {/* Y axis */}
          <line x1="0" y1="0" x2="0" y2="180" stroke={SVG_COLORS.stroke} strokeWidth="1.5" />
          <text x="-15" y="95" fontSize="9" fill={SVG_COLORS.textLight} textAnchor="middle" transform="rotate(-90, -15, 95)">
            COP (Efficiency)
          </text>

          {/* Y axis labels */}
          <text x="-8" y="5" fontSize="8" fill={SVG_COLORS.textLight} textAnchor="end">5</text>
          <text x="-8" y="50" fontSize="8" fill={SVG_COLORS.textLight} textAnchor="end">4</text>
          <text x="-8" y="95" fontSize="8" fill={SVG_COLORS.textLight} textAnchor="end">3</text>
          <text x="-8" y="140" fontSize="8" fill={SVG_COLORS.textLight} textAnchor="end">2</text>
          <text x="-8" y="180" fontSize="8" fill={SVG_COLORS.textLight} textAnchor="end">1</text>

          {/* X axis */}
          <line x1="0" y1="180" x2="420" y2="180" stroke={SVG_COLORS.stroke} strokeWidth="1.5" />
          <text x="210" y="210" fontSize="9" fill={SVG_COLORS.textLight} textAnchor="middle">
            Outdoor Temperature (°F)
          </text>

          {/* X axis labels */}
          <text x="0" y="195" fontSize="8" fill={SVG_COLORS.textLight} textAnchor="middle">-10°F</text>
          <text x="70" y="195" fontSize="8" fill={SVG_COLORS.textLight} textAnchor="middle">10°F</text>
          <text x="140" y="195" fontSize="8" fill={SVG_COLORS.textLight} textAnchor="middle">25°F</text>
          <text x="210" y="195" fontSize="8" fill={SVG_COLORS.textLight} textAnchor="middle">40°F</text>
          <text x="280" y="195" fontSize="8" fill={SVG_COLORS.textLight} textAnchor="middle">50°F</text>
          <text x="350" y="195" fontSize="8" fill={SVG_COLORS.textLight} textAnchor="middle">60°F</text>
          <text x="420" y="195" fontSize="8" fill={SVG_COLORS.textLight} textAnchor="middle">70°F</text>

          {/* Grid lines */}
          {[45, 90, 135].map((y) => (
            <line key={y} x1="0" y1={y} x2="420" y2={y} stroke={SVG_COLORS.strokeLight} strokeWidth="1" strokeDasharray="4,4" />
          ))}

          {/* Efficiency curve */}
          <path
            d="M 0,160 Q 70,145 140,110 Q 210,75 280,50 Q 350,30 420,15"
            fill="none"
            stroke="#15803d"
            strokeWidth="3"
          />

          {/* Balance point indicator */}
          <line x1="140" y1="0" x2="140" y2="180" stroke="#d97706" strokeWidth="1.5" strokeDasharray="6,3" />
          <text x="140" y="-5" fontSize="8" fill="#d97706" textAnchor="middle">Balance Point</text>

          {/* Zones */}
          <rect x="0" y="0" width="140" height="180" fill="#fef2f2" opacity="0.3" />
          <rect x="140" y="0" width="280" height="180" fill="#dcfce7" opacity="0.3" />

          {/* Zone labels */}
          <text x="70" y="20" fontSize="8" fill="#b91c1c" textAnchor="middle">Backup heat</text>
          <text x="70" y="32" fontSize="8" fill="#b91c1c" textAnchor="middle">may be needed</text>
          <text x="280" y="20" fontSize="8" fill="#15803d" textAnchor="middle">Efficient operation</text>
        </g>

        {/* Key insight boxes */}
        <g transform="translate(520, 70)">
          <rect x="0" y="0" width="70" height="50" rx="4" fill="#dcfce7" stroke="#15803d" strokeWidth="1" />
          <text x="35" y="18" fontSize="8" fontWeight="bold" fill="#15803d" textAnchor="middle">50°F+</text>
          <text x="35" y="32" fontSize="8" fill={SVG_COLORS.textLight} textAnchor="middle">COP 4+</text>
          <text x="35" y="44" fontSize="7" fill={SVG_COLORS.textLight} textAnchor="middle">400% efficient</text>
        </g>

        <g transform="translate(520, 130)">
          <rect x="0" y="0" width="70" height="50" rx="4" fill="#fef3c7" stroke="#d97706" strokeWidth="1" />
          <text x="35" y="18" fontSize="8" fontWeight="bold" fill="#d97706" textAnchor="middle">25-50°F</text>
          <text x="35" y="32" fontSize="8" fill={SVG_COLORS.textLight} textAnchor="middle">COP 2-4</text>
          <text x="35" y="44" fontSize="7" fill={SVG_COLORS.textLight} textAnchor="middle">200-400%</text>
        </g>

        <g transform="translate(520, 190)">
          <rect x="0" y="0" width="70" height="50" rx="4" fill="#fef2f2" stroke="#b91c1c" strokeWidth="1" />
          <text x="35" y="18" fontSize="8" fontWeight="bold" fill="#b91c1c" textAnchor="middle">&lt;25°F</text>
          <text x="35" y="32" fontSize="8" fill={SVG_COLORS.textLight} textAnchor="middle">COP &lt;2</text>
          <text x="35" y="44" fontSize="7" fill={SVG_COLORS.textLight} textAnchor="middle">Use backup</text>
        </g>

        {/* Bottom note */}
        <g transform="translate(50, 278)">
          <text x="250" y="0" fontSize="9" fill={SVG_COLORS.textLight} textAnchor="middle">
            Cold-climate heat pumps can maintain efficiency down to -15°F • Standard units: backup needed below 25-35°F
          </text>
        </g>
      </svg>
    </div>
  );
}
