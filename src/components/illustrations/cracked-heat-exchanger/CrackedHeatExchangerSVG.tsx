'use client';

import { SVG_COLORS } from '../../calculators/CalculatorSVG';

/**
 * Illustration showing cracked heat exchanger danger
 */
export default function CrackedHeatExchangerSVG() {
  return (
    <div className="w-full bg-slate-50 border border-slate-200 rounded-lg overflow-hidden">
      <svg
        viewBox="0 0 600 300"
        className="w-full h-auto"
        preserveAspectRatio="xMidYMid meet"
        role="img"
        aria-label="Diagram showing the danger of a cracked heat exchanger"
      >
        <rect width="600" height="300" fill="#f8fafc" />

        <text x="300" y="25" fontSize="14" fontWeight="bold" fill={SVG_COLORS.text} textAnchor="middle">
          Cracked Heat Exchanger: The Hidden Danger
        </text>

        {/* Normal heat exchanger */}
        <g transform="translate(50, 50)">
          <rect x="0" y="0" width="220" height="210" rx="8" fill="white" stroke="#15803d" strokeWidth="2" />
          <rect x="0" y="0" width="220" height="28" rx="8" fill="#15803d" />
          <rect x="0" y="20" width="220" height="8" fill="#15803d" />
          <text x="110" y="19" fontSize="10" fontWeight="bold" fill="white" textAnchor="middle">
            NORMAL: Gases Separated
          </text>

          {/* Heat exchanger tubes */}
          <g transform="translate(30, 45)">
            {/* Outer shell */}
            <rect x="0" y="0" width="160" height="100" fill="#e2e8f0" stroke={SVG_COLORS.stroke} strokeWidth="2" rx="4" />

            {/* Combustion chamber (inner) */}
            <rect x="20" y="20" width="120" height="60" fill="#fef3c7" stroke="#d97706" strokeWidth="2" rx="2" />
            <text x="80" y="45" fontSize="8" fill="#d97706" textAnchor="middle">Combustion</text>
            <text x="80" y="57" fontSize="8" fill="#d97706" textAnchor="middle">Chamber</text>

            {/* Flame */}
            <polygon points="70,70 80,55 90,70" fill="#f97316" />
            <polygon points="75,70 80,60 85,70" fill="#fbbf24" />

            {/* Flue gases going up */}
            <path d="M 80,20 L 80,5" stroke="#94a3b8" strokeWidth="2" />
            <polygon points="75,5 85,5 80,-3" fill="#94a3b8" />
            <text x="115" y="0" fontSize="7" fill={SVG_COLORS.textLight}>→ Flue</text>
          </g>

          {/* Air flow around (not mixing) */}
          <g transform="translate(30, 45)">
            <path d="M -15,50 L 5,50" stroke={SVG_COLORS.cold} strokeWidth="2" />
            <path d="M 155,50 L 175,50" stroke={SVG_COLORS.cold} strokeWidth="2" />
            <polygon points="175,45 175,55 183,50" fill={SVG_COLORS.cold} />
          </g>
          <text x="110" y="165" fontSize="8" fill={SVG_COLORS.cold} textAnchor="middle">Clean air flows around</text>
          <text x="110" y="177" fontSize="8" fill={SVG_COLORS.cold} textAnchor="middle">(never touches combustion gases)</text>

          {/* Checkmark */}
          <circle cx="110" cy="195" r="12" fill="#dcfce7" stroke="#15803d" strokeWidth="2" />
          <path d="M 103,195 L 108,200 L 118,190" stroke="#15803d" strokeWidth="2" fill="none" />
        </g>

        {/* Cracked heat exchanger */}
        <g transform="translate(330, 50)">
          <rect x="0" y="0" width="220" height="210" rx="8" fill="white" stroke="#b91c1c" strokeWidth="2" />
          <rect x="0" y="0" width="220" height="28" rx="8" fill="#b91c1c" />
          <rect x="0" y="20" width="220" height="8" fill="#b91c1c" />
          <text x="110" y="19" fontSize="10" fontWeight="bold" fill="white" textAnchor="middle">
            CRACKED: Gases Mixing!
          </text>

          {/* Heat exchanger tubes */}
          <g transform="translate(30, 45)">
            {/* Outer shell */}
            <rect x="0" y="0" width="160" height="100" fill="#fef2f2" stroke={SVG_COLORS.stroke} strokeWidth="2" rx="4" />

            {/* Combustion chamber with crack */}
            <rect x="20" y="20" width="120" height="60" fill="#fef3c7" stroke="#d97706" strokeWidth="2" rx="2" />

            {/* THE CRACK */}
            <path d="M 140,35 L 142,45 L 138,55 L 141,65" stroke="#b91c1c" strokeWidth="3" fill="none" />

            {/* Flame */}
            <polygon points="70,70 80,55 90,70" fill="#f97316" />
            <polygon points="75,70 80,60 85,70" fill="#fbbf24" />

            {/* CO leaking through crack */}
            <circle cx="150" cy="40" r="4" fill="#b91c1c" opacity="0.6" />
            <circle cx="155" cy="50" r="3" fill="#b91c1c" opacity="0.5" />
            <circle cx="152" cy="60" r="3" fill="#b91c1c" opacity="0.5" />
            <text x="175" y="50" fontSize="7" fill="#b91c1c">CO</text>
          </g>

          {/* Contaminated air */}
          <text x="110" y="165" fontSize="8" fill="#b91c1c" textAnchor="middle">Carbon monoxide leaks</text>
          <text x="110" y="177" fontSize="8" fill="#b91c1c" textAnchor="middle">into breathable air supply</text>

          {/* Warning */}
          <circle cx="110" cy="195" r="12" fill="#fef2f2" stroke="#b91c1c" strokeWidth="2" />
          <text x="110" y="200" fontSize="14" fontWeight="bold" fill="#b91c1c" textAnchor="middle">!</text>
        </g>

        {/* Warning banner */}
        <g transform="translate(100, 268)">
          <rect x="0" y="0" width="400" height="22" rx="4" fill="#fef2f2" stroke="#b91c1c" strokeWidth="1" />
          <text x="200" y="15" fontSize="9" fontWeight="bold" fill="#b91c1c" textAnchor="middle">
            A cracked heat exchanger can leak deadly carbon monoxide — requires immediate replacement
          </text>
        </g>
      </svg>
    </div>
  );
}
