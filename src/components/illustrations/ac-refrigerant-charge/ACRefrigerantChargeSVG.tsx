'use client';

import { SVG_COLORS } from '../../calculators/CalculatorSVG';

/**
 * Illustration showing AC refrigerant charge levels and gauge readings
 */
export default function ACRefrigerantChargeSVG() {
  return (
    <div className="w-full bg-slate-50 border border-slate-200 rounded-lg overflow-hidden">
      <svg
        viewBox="0 0 600 280"
        className="w-full h-auto"
        preserveAspectRatio="xMidYMid meet"
        role="img"
        aria-label="AC refrigerant charge diagram showing proper, undercharged, and overcharged states"
      >
        <rect width="600" height="280" fill="#f8fafc" />

        <text x="300" y="25" fontSize="14" fontWeight="bold" fill={SVG_COLORS.text} textAnchor="middle">
          Refrigerant Charge: Proper vs Improper Levels
        </text>

        {/* Three gauge scenarios */}
        {/* Undercharged */}
        <g transform="translate(70, 60)">
          <rect x="0" y="0" width="140" height="180" rx="8" fill="white" stroke="#b91c1c" strokeWidth="2" />
          <rect x="0" y="0" width="140" height="28" rx="8" fill="#b91c1c" />
          <rect x="0" y="20" width="140" height="8" fill="#b91c1c" />
          <text x="70" y="19" fontSize="11" fontWeight="bold" fill="white" textAnchor="middle">
            UNDERCHARGED
          </text>

          {/* Gauge */}
          <circle cx="70" cy="85" r="35" fill="#fef2f2" stroke={SVG_COLORS.stroke} strokeWidth="2" />
          <path d="M 70,85 L 45,75" stroke="#b91c1c" strokeWidth="3" strokeLinecap="round" />
          <circle cx="70" cy="85" r="5" fill="#b91c1c" />
          <text x="70" y="135" fontSize="9" fill={SVG_COLORS.text} textAnchor="middle">Low Pressure</text>

          {/* Symptoms */}
          <text x="70" y="152" fontSize="8" fill="#b91c1c" textAnchor="middle">• Warm air output</text>
          <text x="70" y="164" fontSize="8" fill="#b91c1c" textAnchor="middle">• Ice on coils</text>
          <text x="70" y="176" fontSize="8" fill="#b91c1c" textAnchor="middle">• Long run cycles</text>
        </g>

        {/* Properly Charged */}
        <g transform="translate(230, 60)">
          <rect x="0" y="0" width="140" height="180" rx="8" fill="white" stroke="#15803d" strokeWidth="2" />
          <rect x="0" y="0" width="140" height="28" rx="8" fill="#15803d" />
          <rect x="0" y="20" width="140" height="8" fill="#15803d" />
          <text x="70" y="19" fontSize="11" fontWeight="bold" fill="white" textAnchor="middle">
            PROPERLY CHARGED
          </text>

          {/* Gauge */}
          <circle cx="70" cy="85" r="35" fill="#f0fdf4" stroke={SVG_COLORS.stroke} strokeWidth="2" />
          <path d="M 70,85 L 70,55" stroke="#15803d" strokeWidth="3" strokeLinecap="round" />
          <circle cx="70" cy="85" r="5" fill="#15803d" />
          <text x="70" y="135" fontSize="9" fill={SVG_COLORS.text} textAnchor="middle">Normal Pressure</text>

          {/* Benefits */}
          <text x="70" y="152" fontSize="8" fill="#15803d" textAnchor="middle">• Cold air: 15-20°F drop</text>
          <text x="70" y="164" fontSize="8" fill="#15803d" textAnchor="middle">• Efficient operation</text>
          <text x="70" y="176" fontSize="8" fill="#15803d" textAnchor="middle">• Normal cycling</text>
        </g>

        {/* Overcharged */}
        <g transform="translate(390, 60)">
          <rect x="0" y="0" width="140" height="180" rx="8" fill="white" stroke="#b91c1c" strokeWidth="2" />
          <rect x="0" y="0" width="140" height="28" rx="8" fill="#b91c1c" />
          <rect x="0" y="20" width="140" height="8" fill="#b91c1c" />
          <text x="70" y="19" fontSize="11" fontWeight="bold" fill="white" textAnchor="middle">
            OVERCHARGED
          </text>

          {/* Gauge */}
          <circle cx="70" cy="85" r="35" fill="#fef2f2" stroke={SVG_COLORS.stroke} strokeWidth="2" />
          <path d="M 70,85 L 95,75" stroke="#b91c1c" strokeWidth="3" strokeLinecap="round" />
          <circle cx="70" cy="85" r="5" fill="#b91c1c" />
          <text x="70" y="135" fontSize="9" fill={SVG_COLORS.text} textAnchor="middle">High Pressure</text>

          {/* Symptoms */}
          <text x="70" y="152" fontSize="8" fill="#b91c1c" textAnchor="middle">• Compressor strain</text>
          <text x="70" y="164" fontSize="8" fill="#b91c1c" textAnchor="middle">• Higher energy bills</text>
          <text x="70" y="176" fontSize="8" fill="#b91c1c" textAnchor="middle">• System shutdowns</text>
        </g>

        {/* Legend */}
        <g transform="translate(20, 260)">
          <circle cx="8" cy="0" r="6" fill="#15803d" />
          <text x="20" y="4" fontSize="8" fill={SVG_COLORS.text}>Optimal</text>
          <circle cx="90" cy="0" r="6" fill="#b91c1c" />
          <text x="102" y="4" fontSize="8" fill={SVG_COLORS.text}>Problem - needs service</text>
        </g>
      </svg>
    </div>
  );
}
