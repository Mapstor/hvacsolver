'use client';

import { SVG_COLORS } from '../../calculators/CalculatorSVG';

/**
 * Illustration showing ideal basement dehumidifier settings
 */
export default function BasementDehumidifierSettingsSVG() {
  return (
    <div className="w-full bg-slate-50 border border-slate-200 rounded-lg overflow-hidden">
      <svg
        viewBox="0 0 600 280"
        className="w-full h-auto"
        preserveAspectRatio="xMidYMid meet"
        role="img"
        aria-label="Basement dehumidifier settings guide"
      >
        <rect width="600" height="280" fill="#f8fafc" />

        <text x="300" y="25" fontSize="14" fontWeight="bold" fill={SVG_COLORS.text} textAnchor="middle">
          Ideal Basement Dehumidifier Settings
        </text>

        {/* Humidity dial/gauge */}
        <g transform="translate(50, 55)">
          <rect x="0" y="0" width="200" height="180" rx="8" fill="white" stroke={SVG_COLORS.stroke} strokeWidth="2" />

          {/* Humidity scale arc */}
          <g transform="translate(100, 110)">
            {/* Background arc */}
            <path d="M -70,0 A 70,70 0 0,1 70,0" fill="none" stroke="#f1f5f9" strokeWidth="20" strokeLinecap="round" />

            {/* Danger zone - too humid (right side) */}
            <path d="M 30,-63 A 70,70 0 0,1 70,0" fill="none" stroke="#fecaca" strokeWidth="20" strokeLinecap="round" />

            {/* Caution zone */}
            <path d="M -10,-69 A 70,70 0 0,1 30,-63" fill="none" stroke="#fef3c7" strokeWidth="20" strokeLinecap="round" />

            {/* Ideal zone */}
            <path d="M -55,-43 A 70,70 0 0,1 -10,-69" fill="none" stroke="#dcfce7" strokeWidth="20" strokeLinecap="round" />

            {/* Too dry (left side) */}
            <path d="M -70,0 A 70,70 0 0,1 -55,-43" fill="none" stroke="#dbeafe" strokeWidth="20" strokeLinecap="round" />

            {/* Scale labels */}
            <text x="-80" y="20" fontSize="9" fill={SVG_COLORS.textLight}>30%</text>
            <text x="-65" y="-35" fontSize="9" fill={SVG_COLORS.textLight}>40%</text>
            <text x="-15" y="-60" fontSize="9" fill="#15803d" fontWeight="bold">50%</text>
            <text x="35" y="-45" fontSize="9" fill={SVG_COLORS.textLight}>60%</text>
            <text x="65" y="20" fontSize="9" fill={SVG_COLORS.textLight}>70%+</text>

            {/* Needle pointing to 50% */}
            <line x1="0" y1="0" x2="-15" y2="-50" stroke={SVG_COLORS.text} strokeWidth="3" strokeLinecap="round" />
            <circle cx="0" cy="0" r="8" fill={SVG_COLORS.text} />
          </g>

          {/* Target display */}
          <text x="100" y="155" fontSize="24" fontWeight="bold" fill="#15803d" textAnchor="middle">50%</text>
          <text x="100" y="172" fontSize="9" fill={SVG_COLORS.textLight} textAnchor="middle">Target Setting</text>
        </g>

        {/* Season recommendations */}
        <g transform="translate(280, 55)">
          <text x="0" y="0" fontSize="11" fontWeight="bold" fill={SVG_COLORS.text}>Recommended by Season:</text>

          {/* Summer */}
          <g transform="translate(0, 20)">
            <rect x="0" y="0" width="280" height="50" rx="4" fill="white" stroke="#d97706" strokeWidth="1.5" />
            <rect x="0" y="0" width="70" height="50" rx="4" fill="#fef3c7" />
            <rect x="62" y="0" width="8" height="50" fill="#fef3c7" />
            <text x="35" y="30" fontSize="10" fill="#d97706" textAnchor="middle" fontWeight="bold">Summer</text>
            <text x="170" y="22" fontSize="10" fill={SVG_COLORS.text} fontWeight="bold" textAnchor="middle">Set to 50-55%</text>
            <text x="170" y="38" fontSize="8" fill={SVG_COLORS.textLight} textAnchor="middle">Higher outdoor humidity = run more</text>
          </g>

          {/* Winter */}
          <g transform="translate(0, 80)">
            <rect x="0" y="0" width="280" height="50" rx="4" fill="white" stroke={SVG_COLORS.cold} strokeWidth="1.5" />
            <rect x="0" y="0" width="70" height="50" rx="4" fill="#dbeafe" />
            <rect x="62" y="0" width="8" height="50" fill="#dbeafe" />
            <text x="35" y="30" fontSize="10" fill={SVG_COLORS.cold} textAnchor="middle" fontWeight="bold">Winter</text>
            <text x="170" y="22" fontSize="10" fill={SVG_COLORS.text} fontWeight="bold" textAnchor="middle">Set to 40-50%</text>
            <text x="170" y="38" fontSize="8" fill={SVG_COLORS.textLight} textAnchor="middle">Prevent condensation on cold surfaces</text>
          </g>

          {/* Warning zone */}
          <g transform="translate(0, 145)">
            <rect x="0" y="0" width="280" height="35" rx="4" fill="#fef2f2" stroke="#b91c1c" strokeWidth="1" />
            <text x="140" y="14" fontSize="9" fill="#b91c1c" textAnchor="middle" fontWeight="bold">
              Above 60% = mold & mildew risk
            </text>
            <text x="140" y="28" fontSize="8" fill={SVG_COLORS.textLight} textAnchor="middle">
              Musty smell, dust mites, structural damage
            </text>
          </g>
        </g>

        {/* Bottom tips */}
        <g transform="translate(50, 250)">
          <text x="0" y="0" fontSize="8" fill={SVG_COLORS.textLight}>
            💡 Tip: Place dehumidifier away from walls • Empty reservoir or use continuous drain • Size for basement sq ft
          </text>
        </g>
      </svg>
    </div>
  );
}
