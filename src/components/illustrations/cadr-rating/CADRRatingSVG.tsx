'use client';

import { SVG_COLORS } from '../../calculators/CalculatorSVG';

/**
 * Illustration explaining CADR rating for air purifiers
 */
export default function CADRRatingSVG() {
  return (
    <div className="w-full bg-slate-50 border border-slate-200 rounded-lg overflow-hidden">
      <svg
        viewBox="0 0 600 300"
        className="w-full h-auto"
        preserveAspectRatio="xMidYMid meet"
        role="img"
        aria-label="CADR rating explanation for air purifiers"
      >
        <rect width="600" height="300" fill="#f8fafc" />

        <text x="300" y="25" fontSize="14" fontWeight="bold" fill={SVG_COLORS.text} textAnchor="middle">
          Understanding CADR Rating (Clean Air Delivery Rate)
        </text>

        {/* Air purifier illustration */}
        <g transform="translate(40, 50)">
          <rect x="0" y="0" width="120" height="160" rx="8" fill="#64748b" stroke={SVG_COLORS.stroke} strokeWidth="2" />
          <rect x="10" y="10" width="100" height="80" fill="#475569" rx="4" />

          {/* Filter lines */}
          {[20, 35, 50, 65, 80].map((y) => (
            <line key={y} x1="15" y1={y} x2="105" y2={y} stroke="#94a3b8" strokeWidth="2" />
          ))}

          {/* Control panel */}
          <rect x="30" y="100" width="60" height="30" fill="#1e293b" rx="4" />
          <circle cx="50" cy="115" r="6" fill="#15803d" />
          <circle cx="70" cy="115" r="6" fill="#334155" />

          {/* Dirty air in */}
          <g transform="translate(-30, 40)">
            <circle cx="0" cy="0" r="4" fill="#94a3b8" opacity="0.7" />
            <circle cx="-8" cy="8" r="3" fill="#94a3b8" opacity="0.6" />
            <circle cx="5" cy="15" r="3" fill="#94a3b8" opacity="0.5" />
            <path d="M 10,5 L 25,5" stroke="#94a3b8" strokeWidth="1.5" />
            <polygon points="25,5 22,2 22,8" fill="#94a3b8" />
          </g>
          <text x="-25" y="75" fontSize="7" fill={SVG_COLORS.textLight}>Dirty air</text>

          {/* Clean air out */}
          <g transform="translate(125, 40)">
            <path d="M 0,5 L 15,5" stroke={SVG_COLORS.cold} strokeWidth="2" />
            <polygon points="15,5 12,2 12,8" fill={SVG_COLORS.cold} />
            <path d="M 0,15 L 18,15" stroke={SVG_COLORS.cold} strokeWidth="2" />
            <polygon points="18,15 15,12 15,18" fill={SVG_COLORS.cold} />
            <path d="M 0,-5 L 12,-5" stroke={SVG_COLORS.cold} strokeWidth="2" />
            <polygon points="12,-5 9,-8 9,-2" fill={SVG_COLORS.cold} />
          </g>
          <text x="130" y="75" fontSize="7" fill={SVG_COLORS.cold}>Clean air</text>

          <text x="60" y="180" fontSize="9" fill={SVG_COLORS.textLight} textAnchor="middle">Air Purifier</text>
        </g>

        {/* CADR explanation */}
        <g transform="translate(220, 50)">
          <rect x="0" y="0" width="170" height="70" rx="6" fill="white" stroke={SVG_COLORS.cold} strokeWidth="2" />
          <text x="85" y="20" fontSize="10" fontWeight="bold" fill={SVG_COLORS.text} textAnchor="middle">CADR = CFM of clean air</text>
          <text x="85" y="38" fontSize="8" fill={SVG_COLORS.textLight} textAnchor="middle">Higher CADR = faster air cleaning</text>
          <text x="85" y="55" fontSize="8" fill={SVG_COLORS.textLight} textAnchor="middle">Measured in cubic feet/minute</text>
        </g>

        {/* Three CADR types */}
        <g transform="translate(220, 135)">
          <text x="0" y="0" fontSize="10" fontWeight="bold" fill={SVG_COLORS.text}>3 CADR Ratings (tested separately):</text>

          {/* Smoke */}
          <g transform="translate(0, 15)">
            <rect x="0" y="0" width="110" height="55" rx="4" fill="white" stroke="#64748b" strokeWidth="1.5" />
            <text x="55" y="18" fontSize="9" fontWeight="bold" fill="#64748b" textAnchor="middle">Smoke</text>
            <text x="55" y="32" fontSize="8" fill={SVG_COLORS.textLight} textAnchor="middle">0.09-1.0 μm</text>
            <text x="55" y="46" fontSize="8" fill={SVG_COLORS.textLight} textAnchor="middle">(smallest)</text>
          </g>

          {/* Dust */}
          <g transform="translate(120, 15)">
            <rect x="0" y="0" width="110" height="55" rx="4" fill="white" stroke="#d97706" strokeWidth="1.5" />
            <text x="55" y="18" fontSize="9" fontWeight="bold" fill="#d97706" textAnchor="middle">Dust</text>
            <text x="55" y="32" fontSize="8" fill={SVG_COLORS.textLight} textAnchor="middle">0.5-3.0 μm</text>
            <text x="55" y="46" fontSize="8" fill={SVG_COLORS.textLight} textAnchor="middle">(medium)</text>
          </g>

          {/* Pollen */}
          <g transform="translate(240, 15)">
            <rect x="0" y="0" width="110" height="55" rx="4" fill="white" stroke="#15803d" strokeWidth="1.5" />
            <text x="55" y="18" fontSize="9" fontWeight="bold" fill="#15803d" textAnchor="middle">Pollen</text>
            <text x="55" y="32" fontSize="8" fill={SVG_COLORS.textLight} textAnchor="middle">5.0-11.0 μm</text>
            <text x="55" y="46" fontSize="8" fill={SVG_COLORS.textLight} textAnchor="middle">(largest)</text>
          </g>
        </g>

        {/* Sizing rule */}
        <g transform="translate(220, 220)">
          <rect x="0" y="0" width="350" height="55" rx="6" fill={SVG_COLORS.accentLight} stroke={SVG_COLORS.accent} strokeWidth="1.5" />
          <text x="175" y="18" fontSize="10" fontWeight="bold" fill={SVG_COLORS.accent} textAnchor="middle">
            AHAM 2/3 Rule for Room Sizing
          </text>
          <text x="175" y="35" fontSize="9" fill={SVG_COLORS.text} textAnchor="middle">
            Smoke CADR × 1.55 = Max Room Size (sq ft)
          </text>
          <text x="175" y="48" fontSize="8" fill={SVG_COLORS.textLight} textAnchor="middle">
            Example: CADR 200 × 1.55 = good for up to 310 sq ft
          </text>
        </g>
      </svg>
    </div>
  );
}
