'use client';

import { SVG_COLORS } from '../../calculators/CalculatorSVG';

/**
 * Illustration explaining AFUE rating and efficiency
 */
export default function AFUERatingSVG() {
  return (
    <div className="w-full bg-slate-50 border border-slate-200 rounded-lg overflow-hidden">
      <svg
        viewBox="0 0 600 320"
        className="w-full h-auto"
        preserveAspectRatio="xMidYMid meet"
        role="img"
        aria-label="AFUE rating diagram comparing furnace efficiency levels"
      >
        <rect width="600" height="320" fill="#f8fafc" />

        <text x="300" y="25" fontSize="14" fontWeight="bold" fill={SVG_COLORS.text} textAnchor="middle">
          AFUE Rating: Where Does Your Fuel Go?
        </text>

        {/* Three furnace scenarios side by side */}
        {/* 80% AFUE */}
        <g transform="translate(50, 50)">
          <text x="70" y="15" fontSize="11" fontWeight="bold" fill={SVG_COLORS.text} textAnchor="middle">
            80% AFUE
          </text>
          <text x="70" y="28" fontSize="8" fill={SVG_COLORS.textLight} textAnchor="middle">
            (Standard Efficiency)
          </text>

          {/* Furnace box */}
          <rect x="20" y="40" width="100" height="140" rx="4" fill="white" stroke={SVG_COLORS.stroke} strokeWidth="2" />

          {/* Fuel input at bottom */}
          <rect x="45" y="160" width="50" height="20" fill="#fef3c7" stroke="#d97706" strokeWidth="1" rx="2" />
          <text x="70" y="173" fontSize="7" fill="#d97706" textAnchor="middle">100% Fuel</text>

          {/* Heat output - 80% */}
          <rect x="30" y="55" width="80" height="50" fill={SVG_COLORS.accentLight} stroke={SVG_COLORS.accent} strokeWidth="1" rx="2" />
          <text x="70" y="78" fontSize="16" fontWeight="bold" fill={SVG_COLORS.accent} textAnchor="middle">80%</text>
          <text x="70" y="93" fontSize="7" fill={SVG_COLORS.text} textAnchor="middle">→ Home Heat</text>

          {/* Waste - 20% */}
          <rect x="30" y="115" width="80" height="30" fill="#fef2f2" stroke="#b91c1c" strokeWidth="1" rx="2" />
          <text x="70" y="133" fontSize="10" fontWeight="bold" fill="#b91c1c" textAnchor="middle">20% Lost</text>

          {/* Flue arrow */}
          <path d="M 70,40 L 70,20" stroke="#b91c1c" strokeWidth="2" />
          <polygon points="65,20 75,20 70,12" fill="#b91c1c" />
          <text x="95" y="8" fontSize="6" fill="#b91c1c">Flue</text>
        </g>

        {/* 95% AFUE */}
        <g transform="translate(225, 50)">
          <text x="70" y="15" fontSize="11" fontWeight="bold" fill={SVG_COLORS.text} textAnchor="middle">
            95% AFUE
          </text>
          <text x="70" y="28" fontSize="8" fill={SVG_COLORS.textLight} textAnchor="middle">
            (High Efficiency)
          </text>

          {/* Furnace box */}
          <rect x="20" y="40" width="100" height="140" rx="4" fill="white" stroke={SVG_COLORS.stroke} strokeWidth="2" />

          {/* Fuel input at bottom */}
          <rect x="45" y="160" width="50" height="20" fill="#fef3c7" stroke="#d97706" strokeWidth="1" rx="2" />
          <text x="70" y="173" fontSize="7" fill="#d97706" textAnchor="middle">100% Fuel</text>

          {/* Heat output - 95% */}
          <rect x="30" y="55" width="80" height="70" fill={SVG_COLORS.accentLight} stroke={SVG_COLORS.accent} strokeWidth="1" rx="2" />
          <text x="70" y="88" fontSize="16" fontWeight="bold" fill={SVG_COLORS.accent} textAnchor="middle">95%</text>
          <text x="70" y="103" fontSize="7" fill={SVG_COLORS.text} textAnchor="middle">→ Home Heat</text>

          {/* Waste - 5% */}
          <rect x="30" y="135" width="80" height="15" fill="#fef2f2" stroke="#b91c1c" strokeWidth="1" rx="2" />
          <text x="70" y="146" fontSize="8" fontWeight="bold" fill="#b91c1c" textAnchor="middle">5% Lost</text>

          {/* Flue arrow (smaller) */}
          <path d="M 70,40 L 70,30" stroke="#b91c1c" strokeWidth="1" />
          <polygon points="67,30 73,30 70,25" fill="#b91c1c" />
        </g>

        {/* 98% AFUE */}
        <g transform="translate(400, 50)">
          <text x="70" y="15" fontSize="11" fontWeight="bold" fill="#15803d" textAnchor="middle">
            98% AFUE
          </text>
          <text x="70" y="28" fontSize="8" fill={SVG_COLORS.textLight} textAnchor="middle">
            (Ultra Efficiency)
          </text>

          {/* Furnace box */}
          <rect x="20" y="40" width="100" height="140" rx="4" fill="white" stroke="#15803d" strokeWidth="2" />

          {/* Fuel input at bottom */}
          <rect x="45" y="160" width="50" height="20" fill="#fef3c7" stroke="#d97706" strokeWidth="1" rx="2" />
          <text x="70" y="173" fontSize="7" fill="#d97706" textAnchor="middle">100% Fuel</text>

          {/* Heat output - 98% */}
          <rect x="30" y="55" width="80" height="85" fill="#dcfce7" stroke="#15803d" strokeWidth="1" rx="2" />
          <text x="70" y="95" fontSize="16" fontWeight="bold" fill="#15803d" textAnchor="middle">98%</text>
          <text x="70" y="110" fontSize="7" fill={SVG_COLORS.text} textAnchor="middle">→ Home Heat</text>

          {/* Waste - 2% */}
          <rect x="30" y="145" width="80" height="8" fill="#fef2f2" stroke="#b91c1c" strokeWidth="1" rx="2" />
          <text x="70" y="160" fontSize="7" fill="#b91c1c" textAnchor="middle">2%</text>
        </g>

        {/* Comparison bar */}
        <g transform="translate(50, 245)">
          <text x="0" y="0" fontSize="9" fontWeight="bold" fill={SVG_COLORS.text}>Annual Savings Example (2,000 sq ft home):</text>

          <rect x="0" y="12" width="140" height="20" fill="#fef2f2" rx="2" />
          <text x="70" y="26" fontSize="9" fill={SVG_COLORS.text} textAnchor="middle">~$1,250/year</text>

          <rect x="175" y="12" width="140" height="20" fill="#fef3c7" rx="2" />
          <text x="245" y="26" fontSize="9" fill={SVG_COLORS.text} textAnchor="middle">~$1,050/year</text>

          <rect x="350" y="12" width="140" height="20" fill="#dcfce7" rx="2" />
          <text x="420" y="26" fontSize="9" fill={SVG_COLORS.text} textAnchor="middle">~$1,020/year</text>

          <text x="245" y="50" fontSize="8" fill={SVG_COLORS.textLight} textAnchor="middle">
            Based on natural gas at $1.50/therm, typical heating load
          </text>
        </g>
      </svg>
    </div>
  );
}
