'use client';

import { SVG_COLORS } from '../../calculators/CalculatorSVG';

/**
 * Illustration showing AC short cycling vs normal cycling
 */
export default function ACShortCyclingSVG() {
  return (
    <div className="w-full bg-slate-50 border border-slate-200 rounded-lg overflow-hidden">
      <svg
        viewBox="0 0 600 280"
        className="w-full h-auto"
        preserveAspectRatio="xMidYMid meet"
        role="img"
        aria-label="AC short cycling vs normal cycling timeline comparison"
      >
        <rect width="600" height="280" fill="#f8fafc" />

        <text x="300" y="25" fontSize="14" fontWeight="bold" fill={SVG_COLORS.text} textAnchor="middle">
          AC Short Cycling vs Normal Operation
        </text>

        {/* Normal Cycling */}
        <g transform="translate(40, 50)">
          <rect x="0" y="0" width="520" height="90" rx="8" fill="white" stroke="#15803d" strokeWidth="2" />
          <rect x="0" y="0" width="120" height="90" rx="8" fill="#15803d" />
          <rect x="112" y="0" width="8" height="90" fill="#15803d" />
          <text x="60" y="40" fontSize="10" fontWeight="bold" fill="white" textAnchor="middle">
            NORMAL
          </text>
          <text x="60" y="55" fontSize="10" fontWeight="bold" fill="white" textAnchor="middle">
            CYCLING
          </text>
          <text x="60" y="75" fontSize="8" fill="rgba(255,255,255,0.8)" textAnchor="middle">
            15-20 min cycles
          </text>

          {/* Timeline */}
          <g transform="translate(135, 25)">
            {/* Time axis */}
            <line x1="0" y1="40" x2="360" y2="40" stroke={SVG_COLORS.strokeLight} strokeWidth="1" />
            <text x="0" y="55" fontSize="7" fill={SVG_COLORS.textLight}>0 min</text>
            <text x="120" y="55" fontSize="7" fill={SVG_COLORS.textLight}>20 min</text>
            <text x="240" y="55" fontSize="7" fill={SVG_COLORS.textLight}>40 min</text>
            <text x="360" y="55" fontSize="7" fill={SVG_COLORS.textLight}>60 min</text>

            {/* ON periods (normal - long) */}
            <rect x="0" y="15" width="100" height="20" fill="#15803d" rx="2" />
            <text x="50" y="28" fontSize="7" fill="white" textAnchor="middle">ON (15-20 min)</text>

            <rect x="140" y="15" width="90" height="20" fill="#15803d" rx="2" />
            <text x="185" y="28" fontSize="7" fill="white" textAnchor="middle">ON</text>

            <rect x="270" y="15" width="90" height="20" fill="#15803d" rx="2" />
            <text x="315" y="28" fontSize="7" fill="white" textAnchor="middle">ON</text>

            {/* OFF periods */}
            <text x="120" y="10" fontSize="7" fill={SVG_COLORS.textLight} textAnchor="middle">OFF</text>
            <text x="255" y="10" fontSize="7" fill={SVG_COLORS.textLight} textAnchor="middle">OFF</text>
          </g>
        </g>

        {/* Short Cycling */}
        <g transform="translate(40, 155)">
          <rect x="0" y="0" width="520" height="90" rx="8" fill="white" stroke="#b91c1c" strokeWidth="2" />
          <rect x="0" y="0" width="120" height="90" rx="8" fill="#b91c1c" />
          <rect x="112" y="0" width="8" height="90" fill="#b91c1c" />
          <text x="60" y="40" fontSize="10" fontWeight="bold" fill="white" textAnchor="middle">
            SHORT
          </text>
          <text x="60" y="55" fontSize="10" fontWeight="bold" fill="white" textAnchor="middle">
            CYCLING
          </text>
          <text x="60" y="75" fontSize="8" fill="rgba(255,255,255,0.8)" textAnchor="middle">
            &lt;10 min cycles
          </text>

          {/* Timeline */}
          <g transform="translate(135, 25)">
            {/* Time axis */}
            <line x1="0" y1="40" x2="360" y2="40" stroke={SVG_COLORS.strokeLight} strokeWidth="1" />
            <text x="0" y="55" fontSize="7" fill={SVG_COLORS.textLight}>0 min</text>
            <text x="120" y="55" fontSize="7" fill={SVG_COLORS.textLight}>20 min</text>
            <text x="240" y="55" fontSize="7" fill={SVG_COLORS.textLight}>40 min</text>
            <text x="360" y="55" fontSize="7" fill={SVG_COLORS.textLight}>60 min</text>

            {/* ON periods (short - rapid) */}
            {[0, 40, 80, 120, 160, 200, 240, 280, 320].map((x) => (
              <rect key={x} x={x} y="15" width="25" height="20" fill="#b91c1c" rx="2" />
            ))}

            {/* Pattern indicators */}
            <text x="180" y="8" fontSize="7" fill="#b91c1c" textAnchor="middle">
              Rapid on-off-on-off (every 5-8 min)
            </text>
          </g>
        </g>

        {/* Common causes */}
        <g transform="translate(40, 258)">
          <text x="0" y="0" fontSize="8" fontWeight="bold" fill={SVG_COLORS.text}>Short cycling causes:</text>
          <text x="130" y="0" fontSize="8" fill={SVG_COLORS.textLight}>
            Oversized AC • Dirty filter • Low refrigerant • Thermostat issues • Frozen coils
          </text>
        </g>
      </svg>
    </div>
  );
}
