'use client';

import { SVG_COLORS } from '../../calculators/CalculatorSVG';

/**
 * Illustration explaining HEPA filter ratings and what they capture
 */
export default function HEPAFilterGuideSVG() {
  return (
    <div className="w-full bg-slate-50 border border-slate-200 rounded-lg overflow-hidden">
      <svg
        viewBox="0 0 600 300"
        className="w-full h-auto"
        preserveAspectRatio="xMidYMid meet"
        role="img"
        aria-label="HEPA filter guide showing what different filters capture"
      >
        <rect width="600" height="300" fill="#f8fafc" />

        <text x="300" y="25" fontSize="14" fontWeight="bold" fill={SVG_COLORS.text} textAnchor="middle">
          HEPA Filter Guide: Understanding True HEPA
        </text>

        {/* True HEPA definition */}
        <g transform="translate(40, 50)">
          <rect x="0" y="0" width="250" height="80" rx="6" fill="white" stroke="#15803d" strokeWidth="2" />
          <rect x="0" y="0" width="250" height="25" rx="6" fill="#15803d" />
          <rect x="0" y="20" width="250" height="5" fill="#15803d" />
          <text x="125" y="17" fontSize="10" fontWeight="bold" fill="white" textAnchor="middle">True HEPA Standard</text>

          <text x="125" y="48" fontSize="11" fontWeight="bold" fill={SVG_COLORS.text} textAnchor="middle">
            99.97% @ 0.3 microns
          </text>
          <text x="125" y="65" fontSize="8" fill={SVG_COLORS.textLight} textAnchor="middle">
            Must capture 99.97% of particles 0.3μm or larger
          </text>
        </g>

        {/* Particle size comparison */}
        <g transform="translate(310, 50)">
          <rect x="0" y="0" width="250" height="80" rx="6" fill="white" stroke={SVG_COLORS.stroke} strokeWidth="1.5" />
          <text x="125" y="18" fontSize="10" fontWeight="bold" fill={SVG_COLORS.text} textAnchor="middle">Particle Size Reference</text>

          <circle cx="30" cy="50" r="2" fill="#64748b" />
          <text x="30" y="70" fontSize="6" fill={SVG_COLORS.textLight} textAnchor="middle">Virus</text>
          <text x="30" y="78" fontSize="5" fill={SVG_COLORS.textLight} textAnchor="middle">0.1μm</text>

          <circle cx="75" cy="50" r="4" fill="#94a3b8" />
          <text x="75" y="70" fontSize="6" fill={SVG_COLORS.textLight} textAnchor="middle">Bacteria</text>
          <text x="75" y="78" fontSize="5" fill={SVG_COLORS.textLight} textAnchor="middle">0.3-5μm</text>

          <circle cx="130" cy="50" r="8" fill="#cbd5e1" />
          <text x="130" y="70" fontSize="6" fill={SVG_COLORS.textLight} textAnchor="middle">Mold</text>
          <text x="130" y="78" fontSize="5" fill={SVG_COLORS.textLight} textAnchor="middle">3-12μm</text>

          <circle cx="190" cy="50" r="12" fill="#e2e8f0" />
          <text x="190" y="70" fontSize="6" fill={SVG_COLORS.textLight} textAnchor="middle">Pollen</text>
          <text x="190" y="78" fontSize="5" fill={SVG_COLORS.textLight} textAnchor="middle">10-100μm</text>

          <circle cx="235" cy="50" r="3" fill="#fbbf24" />
          <text x="235" y="70" fontSize="6" fill={SVG_COLORS.textLight} textAnchor="middle">Hair</text>
          <text x="235" y="78" fontSize="5" fill={SVG_COLORS.textLight} textAnchor="middle">50-100μm</text>
        </g>

        {/* Filter types comparison */}
        <g transform="translate(40, 145)">
          <text x="0" y="0" fontSize="10" fontWeight="bold" fill={SVG_COLORS.text}>Filter Types Compared:</text>

          {/* HEPA-type */}
          <g transform="translate(0, 15)">
            <rect x="0" y="0" width="165" height="65" rx="4" fill="white" stroke="#d97706" strokeWidth="1.5" />
            <text x="82" y="16" fontSize="9" fontWeight="bold" fill="#d97706" textAnchor="middle">&quot;HEPA-type&quot;</text>
            <text x="82" y="30" fontSize="8" fill={SVG_COLORS.textLight} textAnchor="middle">85-99% efficient</text>
            <text x="82" y="44" fontSize="7" fill={SVG_COLORS.textLight} textAnchor="middle">NOT true HEPA</text>
            <text x="82" y="58" fontSize="7" fill="#d97706" textAnchor="middle">Marketing term - beware!</text>
          </g>

          {/* True HEPA */}
          <g transform="translate(180, 15)">
            <rect x="0" y="0" width="165" height="65" rx="4" fill="white" stroke="#15803d" strokeWidth="1.5" />
            <text x="82" y="16" fontSize="9" fontWeight="bold" fill="#15803d" textAnchor="middle">True HEPA (H13)</text>
            <text x="82" y="30" fontSize="8" fill={SVG_COLORS.textLight} textAnchor="middle">99.97% @ 0.3μm</text>
            <text x="82" y="44" fontSize="7" fill={SVG_COLORS.textLight} textAnchor="middle">Medical/residential grade</text>
            <text x="82" y="58" fontSize="7" fill="#15803d" textAnchor="middle">✓ Recommended</text>
          </g>

          {/* Medical HEPA */}
          <g transform="translate(360, 15)">
            <rect x="0" y="0" width="165" height="65" rx="4" fill="white" stroke="#7c3aed" strokeWidth="1.5" />
            <text x="82" y="16" fontSize="9" fontWeight="bold" fill="#7c3aed" textAnchor="middle">Medical HEPA (H14)</text>
            <text x="82" y="30" fontSize="8" fill={SVG_COLORS.textLight} textAnchor="middle">99.995% @ 0.3μm</text>
            <text x="82" y="44" fontSize="7" fill={SVG_COLORS.textLight} textAnchor="middle">Hospital/cleanroom grade</text>
            <text x="82" y="58" fontSize="7" fill={SVG_COLORS.textLight} textAnchor="middle">Overkill for home use</text>
          </g>
        </g>

        {/* What HEPA captures */}
        <g transform="translate(40, 235)">
          <rect x="0" y="0" width="520" height="50" rx="6" fill="#dcfce7" stroke="#15803d" strokeWidth="1" />
          <text x="260" y="18" fontSize="10" fontWeight="bold" fill="#15803d" textAnchor="middle">
            What True HEPA Captures:
          </text>
          <text x="260" y="35" fontSize="8" fill={SVG_COLORS.textLight} textAnchor="middle">
            ✓ Dust mites • ✓ Pollen • ✓ Mold spores • ✓ Pet dander • ✓ Most bacteria • ✓ Some viruses (on droplets)
          </text>
        </g>
      </svg>
    </div>
  );
}
