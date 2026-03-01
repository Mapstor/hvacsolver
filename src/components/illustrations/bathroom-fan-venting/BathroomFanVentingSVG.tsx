'use client';

import { SVG_COLORS } from '../../calculators/CalculatorSVG';

/**
 * Illustration showing proper bathroom fan venting options
 */
export default function BathroomFanVentingSVG() {
  return (
    <div className="w-full bg-slate-50 border border-slate-200 rounded-lg overflow-hidden">
      <svg
        viewBox="0 0 600 300"
        className="w-full h-auto"
        preserveAspectRatio="xMidYMid meet"
        role="img"
        aria-label="Bathroom fan venting diagram showing correct and incorrect methods"
      >
        <rect width="600" height="300" fill="#f8fafc" />

        <text x="300" y="25" fontSize="14" fontWeight="bold" fill={SVG_COLORS.text} textAnchor="middle">
          Bathroom Fan Venting: Right vs Wrong
        </text>

        {/* CORRECT - Vent to outside */}
        <g transform="translate(50, 45)">
          <rect x="0" y="0" width="230" height="220" rx="8" fill="white" stroke="#15803d" strokeWidth="2" />
          <rect x="0" y="0" width="230" height="28" rx="8" fill="#15803d" />
          <rect x="0" y="20" width="230" height="8" fill="#15803d" />
          <text x="115" y="19" fontSize="11" fontWeight="bold" fill="white" textAnchor="middle">
            CORRECT: Vent to Outside
          </text>

          {/* House cross-section */}
          {/* Roof */}
          <polygon points="30,80 115,45 200,80" fill="#cbd5e1" stroke={SVG_COLORS.stroke} strokeWidth="1" />

          {/* Attic space */}
          <rect x="30" y="80" width="170" height="40" fill="#e2e8f0" stroke={SVG_COLORS.stroke} strokeWidth="1" />
          <text x="65" y="105" fontSize="8" fill={SVG_COLORS.textLight} textAnchor="middle">Attic</text>

          {/* Bathroom below */}
          <rect x="30" y="120" width="170" height="80" fill="#f8fafc" stroke={SVG_COLORS.stroke} strokeWidth="1" />
          <text x="115" y="175" fontSize="8" fill={SVG_COLORS.textLight} textAnchor="middle">Bathroom</text>

          {/* Fan unit */}
          <rect x="95" y="125" width="40" height="15" fill={SVG_COLORS.cold} rx="2" />
          <text x="115" y="134" fontSize="6" fill="white" textAnchor="middle">FAN</text>

          {/* Duct going up through attic to roof cap */}
          <rect x="110" y="75" width="10" height="50" fill="#94a3b8" />
          <path d="M 115,75 L 115,55" stroke="#94a3b8" strokeWidth="10" />

          {/* Roof cap */}
          <rect x="105" y="48" width="20" height="10" fill="#64748b" rx="2" />

          {/* Moist air arrows going outside */}
          <path d="M 115,48 L 115,35" stroke={SVG_COLORS.cold} strokeWidth="2" />
          <polygon points="110,35 120,35 115,28" fill={SVG_COLORS.cold} />
          <text x="145" y="35" fontSize="7" fill={SVG_COLORS.cold}>Moist air exits</text>
        </g>

        {/* WRONG - Vent into attic */}
        <g transform="translate(320, 45)">
          <rect x="0" y="0" width="230" height="220" rx="8" fill="white" stroke="#b91c1c" strokeWidth="2" />
          <rect x="0" y="0" width="230" height="28" rx="8" fill="#b91c1c" />
          <rect x="0" y="20" width="230" height="8" fill="#b91c1c" />
          <text x="115" y="19" fontSize="11" fontWeight="bold" fill="white" textAnchor="middle">
            WRONG: Vent into Attic
          </text>

          {/* House cross-section */}
          {/* Roof */}
          <polygon points="30,80 115,45 200,80" fill="#cbd5e1" stroke={SVG_COLORS.stroke} strokeWidth="1" />

          {/* Attic space with moisture problem */}
          <rect x="30" y="80" width="170" height="40" fill="#fecaca" stroke={SVG_COLORS.stroke} strokeWidth="1" />
          <text x="65" y="95" fontSize="7" fill="#b91c1c" textAnchor="middle">Moisture</text>
          <text x="65" y="105" fontSize="7" fill="#b91c1c" textAnchor="middle">damage!</text>

          {/* Mold indicators */}
          {[40, 55, 175, 190].map((x) => (
            <circle key={x} cx={x} cy="100" r="3" fill="#7f1d1d" opacity="0.5" />
          ))}
          <text x="165" y="95" fontSize="7" fill="#b91c1c" textAnchor="middle">Mold</text>
          <text x="165" y="105" fontSize="7" fill="#b91c1c" textAnchor="middle">growth</text>

          {/* Bathroom below */}
          <rect x="30" y="120" width="170" height="80" fill="#f8fafc" stroke={SVG_COLORS.stroke} strokeWidth="1" />
          <text x="115" y="175" fontSize="8" fill={SVG_COLORS.textLight} textAnchor="middle">Bathroom</text>

          {/* Fan unit */}
          <rect x="95" y="125" width="40" height="15" fill={SVG_COLORS.cold} rx="2" />
          <text x="115" y="134" fontSize="6" fill="white" textAnchor="middle">FAN</text>

          {/* Duct going up but ending in attic */}
          <rect x="110" y="95" width="10" height="30" fill="#94a3b8" />

          {/* Moist air trapped in attic */}
          <path d="M 115,95 L 115,88" stroke="#b91c1c" strokeWidth="2" />
          <circle cx="100" cy="88" r="5" fill="#93c5fd" opacity="0.6" />
          <circle cx="130" cy="90" r="4" fill="#93c5fd" opacity="0.6" />
          <circle cx="145" cy="85" r="3" fill="#93c5fd" opacity="0.6" />
        </g>

        {/* Bottom note */}
        <g transform="translate(50, 275)">
          <text x="250" y="0" fontSize="9" fill={SVG_COLORS.textLight} textAnchor="middle">
            Always vent bathroom fans directly to the outdoors through roof cap, soffit, or exterior wall
          </text>
        </g>
      </svg>
    </div>
  );
}
