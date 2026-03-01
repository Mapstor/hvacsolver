'use client';

import { SVG_COLORS } from '../../calculators/CalculatorSVG';

/**
 * Illustration explaining R-value concept for insulation
 */
export default function WhatIsRValueSVG() {
  return (
    <div className="w-full bg-slate-50 border border-slate-200 rounded-lg overflow-hidden">
      <svg
        viewBox="0 0 600 300"
        className="w-full h-auto"
        preserveAspectRatio="xMidYMid meet"
        role="img"
        aria-label="What is R-value explanation diagram"
      >
        <rect width="600" height="300" fill="#f8fafc" />

        <text x="300" y="25" fontSize="14" fontWeight="bold" fill={SVG_COLORS.text} textAnchor="middle">
          What Is R-Value? Insulation Explained
        </text>

        {/* Concept visualization */}
        <g transform="translate(50, 50)">
          <text x="0" y="0" fontSize="11" fontWeight="bold" fill={SVG_COLORS.text}>The Concept:</text>

          {/* Low R-value example */}
          <g transform="translate(0, 20)">
            <rect x="0" y="0" width="200" height="80" fill="white" stroke={SVG_COLORS.stroke} strokeWidth="1" rx="4" />
            <text x="100" y="18" fontSize="9" fontWeight="bold" fill="#b91c1c" textAnchor="middle">Low R-Value (R-5)</text>

            {/* Heat arrows passing through */}
            <rect x="75" y="25" width="50" height="50" fill="#fecaca" stroke="#b91c1c" strokeWidth="1" />
            <text x="100" y="55" fontSize="7" fill="#b91c1c" textAnchor="middle">Thin</text>

            {/* Multiple arrows going through */}
            <path d="M 30,50 L 70,50" stroke="#ef4444" strokeWidth="2" markerEnd="url(#arrowRed)" />
            <path d="M 130,50 L 170,50" stroke="#ef4444" strokeWidth="2" markerEnd="url(#arrowRed)" />
            <path d="M 30,40 L 70,40" stroke="#ef4444" strokeWidth="1.5" markerEnd="url(#arrowRed)" />
            <path d="M 130,40 L 170,40" stroke="#ef4444" strokeWidth="1.5" markerEnd="url(#arrowRed)" />
            <path d="M 30,60 L 70,60" stroke="#ef4444" strokeWidth="1.5" markerEnd="url(#arrowRed)" />
            <path d="M 130,60 L 170,60" stroke="#ef4444" strokeWidth="1.5" markerEnd="url(#arrowRed)" />

            <text x="25" y="75" fontSize="7" fill={SVG_COLORS.textLight}>HEAT</text>
            <text x="165" y="75" fontSize="7" fill={SVG_COLORS.textLight}>HEAT</text>
          </g>

          {/* High R-value example */}
          <g transform="translate(230, 20)">
            <rect x="0" y="0" width="200" height="80" fill="white" stroke={SVG_COLORS.stroke} strokeWidth="1" rx="4" />
            <text x="100" y="18" fontSize="9" fontWeight="bold" fill="#15803d" textAnchor="middle">High R-Value (R-30)</text>

            {/* Thick insulation */}
            <rect x="50" y="25" width="100" height="50" fill="#dcfce7" stroke="#15803d" strokeWidth="1" />
            <text x="100" y="55" fontSize="7" fill="#15803d" textAnchor="middle">Thick</text>

            {/* Arrows blocked */}
            <path d="M 25,50 L 45,50" stroke="#ef4444" strokeWidth="2" />
            <circle cx="48" cy="50" r="3" fill="#ef4444" />
          </g>
        </g>

        {/* Definition box */}
        <g transform="translate(470, 50)">
          <rect x="0" y="0" width="110" height="80" rx="6" fill="#dbeafe" stroke={SVG_COLORS.cold} strokeWidth="1.5" />
          <text x="55" y="20" fontSize="9" fontWeight="bold" fill={SVG_COLORS.cold} textAnchor="middle">R-Value</text>
          <text x="55" y="38" fontSize="8" fill={SVG_COLORS.textLight} textAnchor="middle">Thermal</text>
          <text x="55" y="50" fontSize="8" fill={SVG_COLORS.textLight} textAnchor="middle">Resistance</text>
          <text x="55" y="70" fontSize="8" fontWeight="bold" fill={SVG_COLORS.text} textAnchor="middle">Higher = Better</text>
        </g>

        {/* Arrow marker definitions */}
        <defs>
          <marker id="arrowRed" markerWidth="6" markerHeight="6" refX="5" refY="3" orient="auto">
            <path d="M0,0 L6,3 L0,6 Z" fill="#ef4444" />
          </marker>
        </defs>

        {/* Recommended R-values by location */}
        <g transform="translate(50, 160)">
          <text x="0" y="0" fontSize="11" fontWeight="bold" fill={SVG_COLORS.text}>Recommended R-Values (Climate Zones 4-5):</text>

          <g transform="translate(0, 20)">
            <rect x="0" y="0" width="120" height="50" rx="4" fill="white" stroke={SVG_COLORS.stroke} strokeWidth="1" />
            <text x="60" y="18" fontSize="9" fontWeight="bold" fill={SVG_COLORS.text} textAnchor="middle">Attic</text>
            <text x="60" y="38" fontSize="14" fontWeight="bold" fill="#15803d" textAnchor="middle">R-49 to R-60</text>
          </g>

          <g transform="translate(135, 20)">
            <rect x="0" y="0" width="120" height="50" rx="4" fill="white" stroke={SVG_COLORS.stroke} strokeWidth="1" />
            <text x="60" y="18" fontSize="9" fontWeight="bold" fill={SVG_COLORS.text} textAnchor="middle">Walls</text>
            <text x="60" y="38" fontSize="14" fontWeight="bold" fill="#15803d" textAnchor="middle">R-13 to R-21</text>
          </g>

          <g transform="translate(270, 20)">
            <rect x="0" y="0" width="120" height="50" rx="4" fill="white" stroke={SVG_COLORS.stroke} strokeWidth="1" />
            <text x="60" y="18" fontSize="9" fontWeight="bold" fill={SVG_COLORS.text} textAnchor="middle">Floor</text>
            <text x="60" y="38" fontSize="14" fontWeight="bold" fill="#15803d" textAnchor="middle">R-25 to R-30</text>
          </g>

          <g transform="translate(405, 20)">
            <rect x="0" y="0" width="120" height="50" rx="4" fill="white" stroke={SVG_COLORS.stroke} strokeWidth="1" />
            <text x="60" y="18" fontSize="9" fontWeight="bold" fill={SVG_COLORS.text} textAnchor="middle">Basement</text>
            <text x="60" y="38" fontSize="14" fontWeight="bold" fill="#15803d" textAnchor="middle">R-11 to R-15</text>
          </g>
        </g>

        {/* Key formula */}
        <g transform="translate(50, 250)">
          <rect x="0" y="0" width="500" height="35" rx="6" fill="white" stroke={SVG_COLORS.stroke} strokeWidth="1" />
          <text x="250" y="15" fontSize="10" fontWeight="bold" fill={SVG_COLORS.text} textAnchor="middle">
            Total R-Value = R-value per inch × thickness (inches)
          </text>
          <text x="250" y="30" fontSize="8" fill={SVG_COLORS.textLight} textAnchor="middle">
            Example: R-3.5/inch fiberglass × 6 inches = R-21 total
          </text>
        </g>
      </svg>
    </div>
  );
}
