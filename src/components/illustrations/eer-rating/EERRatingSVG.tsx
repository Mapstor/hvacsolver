'use client';

import { SVG_COLORS } from '../../calculators/CalculatorSVG';

/**
 * Illustration explaining EER rating for air conditioners
 */
export default function EERRatingSVG() {
  return (
    <div className="w-full bg-slate-50 border border-slate-200 rounded-lg overflow-hidden">
      <svg
        viewBox="0 0 600 340"
        className="w-full h-auto"
        preserveAspectRatio="xMidYMid meet"
        role="img"
        aria-label="EER rating explanation diagram"
      >
        <rect width="600" height="340" fill="#f8fafc" />

        <text x="300" y="25" fontSize="14" fontWeight="bold" fill={SVG_COLORS.text} textAnchor="middle">
          Understanding EER (Energy Efficiency Ratio)
        </text>

        {/* Formula box */}
        <g transform="translate(40, 50)">
          <rect x="0" y="0" width="220" height="80" rx="6" fill="white" stroke={SVG_COLORS.cold} strokeWidth="2" />
          <text x="110" y="25" fontSize="12" fontWeight="bold" fill={SVG_COLORS.text} textAnchor="middle">EER Formula</text>

          <text x="110" y="55" fontSize="14" fontWeight="bold" fill={SVG_COLORS.cold} textAnchor="middle">
            BTU ÷ Watts = EER
          </text>
          <text x="110" y="72" fontSize="8" fill={SVG_COLORS.textLight} textAnchor="middle">
            Cooling output ÷ Power input
          </text>
        </g>

        {/* Example calculation */}
        <g transform="translate(280, 50)">
          <rect x="0" y="0" width="280" height="80" rx="6" fill="#fef3c7" stroke="#d97706" strokeWidth="1.5" />
          <text x="140" y="20" fontSize="10" fontWeight="bold" fill="#d97706" textAnchor="middle">Example Calculation</text>

          <text x="20" y="45" fontSize="9" fill={SVG_COLORS.text}>10,000 BTU AC using 1,000 watts:</text>
          <text x="20" y="65" fontSize="11" fill={SVG_COLORS.text} fontWeight="bold">10,000 ÷ 1,000 = EER 10</text>
        </g>

        {/* EER comparison bars */}
        <g transform="translate(40, 145)">
          <text x="0" y="0" fontSize="11" fontWeight="bold" fill={SVG_COLORS.text}>EER Comparison (Window/Portable ACs):</text>

          {/* Low efficiency */}
          <g transform="translate(0, 20)">
            <rect x="0" y="0" width="100" height="25" fill="#fecaca" rx="4" />
            <text x="50" y="17" fontSize="10" fill="#b91c1c" textAnchor="middle" fontWeight="bold">EER 8-9</text>
            <text x="115" y="17" fontSize="9" fill={SVG_COLORS.textLight}>Low efficiency</text>
          </g>

          {/* Average */}
          <g transform="translate(0, 55)">
            <rect x="0" y="0" width="150" height="25" fill="#fef3c7" rx="4" />
            <text x="75" y="17" fontSize="10" fill="#d97706" textAnchor="middle" fontWeight="bold">EER 10-11</text>
            <text x="165" y="17" fontSize="9" fill={SVG_COLORS.textLight}>Average</text>
          </g>

          {/* Good */}
          <g transform="translate(0, 90)">
            <rect x="0" y="0" width="200" height="25" fill="#dcfce7" rx="4" />
            <text x="100" y="17" fontSize="10" fill="#15803d" textAnchor="middle" fontWeight="bold">EER 12-14</text>
            <text x="215" y="17" fontSize="9" fill={SVG_COLORS.textLight}>Good (Energy Star)</text>
          </g>

          {/* Excellent */}
          <g transform="translate(0, 125)">
            <rect x="0" y="0" width="270" height="25" fill="#dbeafe" rx="4" />
            <text x="135" y="17" fontSize="10" fill={SVG_COLORS.cold} textAnchor="middle" fontWeight="bold">EER 14+</text>
            <text x="285" y="17" fontSize="9" fill={SVG_COLORS.textLight}>Excellent</text>
          </g>
        </g>

        {/* EER vs SEER */}
        <g transform="translate(350, 145)">
          <rect x="0" y="0" width="210" height="100" rx="6" fill="white" stroke={SVG_COLORS.stroke} strokeWidth="1.5" />
          <text x="105" y="20" fontSize="10" fontWeight="bold" fill={SVG_COLORS.text} textAnchor="middle">EER vs SEER</text>

          <text x="15" y="42" fontSize="8" fontWeight="bold" fill={SVG_COLORS.text}>EER:</text>
          <text x="42" y="42" fontSize="8" fill={SVG_COLORS.textLight}>Efficiency at one temp (95°F)</text>

          <text x="15" y="60" fontSize="8" fontWeight="bold" fill={SVG_COLORS.text}>SEER:</text>
          <text x="48" y="60" fontSize="8" fill={SVG_COLORS.textLight}>Seasonal average efficiency</text>

          <line x1="15" y1="70" x2="195" y2="70" stroke={SVG_COLORS.strokeLight} strokeWidth="1" />

          <text x="105" y="88" fontSize="8" fill={SVG_COLORS.textLight} textAnchor="middle">
            EER used for window/portable ACs
          </text>
        </g>

        {/* Bottom insight */}
        <g transform="translate(80, 318)">
          <rect x="0" y="0" width="440" height="18" rx="4" fill={SVG_COLORS.accentLight} />
          <text x="220" y="13" fontSize="9" fill={SVG_COLORS.accent} textAnchor="middle" fontWeight="bold">
            Higher EER = lower electricity costs • EER 12 uses 25% less power than EER 9
          </text>
        </g>
      </svg>
    </div>
  );
}
