'use client';

import { SVG_COLORS } from '../../calculators/CalculatorSVG';

/**
 * Illustration showing proper AC vent temperature drop
 */
export default function ACVentTemperatureSVG() {
  return (
    <div className="w-full bg-slate-50 border border-slate-200 rounded-lg overflow-hidden">
      <svg
        viewBox="0 0 600 260"
        className="w-full h-auto"
        preserveAspectRatio="xMidYMid meet"
        role="img"
        aria-label="AC vent temperature diagram showing proper temperature differential"
      >
        <rect width="600" height="260" fill="#f8fafc" />

        <text x="300" y="25" fontSize="14" fontWeight="bold" fill={SVG_COLORS.text} textAnchor="middle">
          AC Vent Temperature: What to Expect
        </text>

        {/* House cross-section with air handler */}
        <g transform="translate(80, 50)">
          {/* Air handler box */}
          <rect x="0" y="40" width="100" height="120" rx="4" fill="white" stroke={SVG_COLORS.stroke} strokeWidth="2" />
          <rect x="0" y="40" width="100" height="25" fill={SVG_COLORS.cold} rx="4" />
          <rect x="0" y="58" width="100" height="7" fill={SVG_COLORS.cold} />
          <text x="50" y="57" fontSize="9" fontWeight="bold" fill="white" textAnchor="middle">AIR HANDLER</text>

          {/* Evaporator coil */}
          <rect x="15" y="80" width="70" height="30" fill="#dbeafe" stroke={SVG_COLORS.cold} strokeWidth="1" rx="2" />
          <text x="50" y="98" fontSize="7" fill={SVG_COLORS.text} textAnchor="middle">Evaporator Coil</text>

          {/* Return air arrow */}
          <path d="M 50,160 L 50,175" stroke={SVG_COLORS.heat} strokeWidth="3" markerEnd="url(#return-arrow)" />
          <text x="50" y="190" fontSize="8" fill={SVG_COLORS.textLight} textAnchor="middle">Return Air</text>

          {/* Temperature at return */}
          <rect x="10" y="195" width="80" height="22" rx="4" fill={SVG_COLORS.accentLight} stroke={SVG_COLORS.accent} strokeWidth="1" />
          <text x="50" y="210" fontSize="10" fontWeight="bold" fill={SVG_COLORS.accent} textAnchor="middle">75°F (24°C)</text>
        </g>

        {/* Arrow showing air flow through system */}
        <defs>
          <marker id="return-arrow" markerWidth="8" markerHeight="8" refX="6" refY="3" orient="auto">
            <path d="M0,0 L0,6 L8,3 z" fill={SVG_COLORS.heat} />
          </marker>
          <marker id="supply-arrow" markerWidth="8" markerHeight="8" refX="6" refY="3" orient="auto">
            <path d="M0,0 L0,6 L8,3 z" fill={SVG_COLORS.cold} />
          </marker>
        </defs>

        {/* Supply duct */}
        <path d="M 180,110 L 280,110" stroke={SVG_COLORS.cold} strokeWidth="20" fill="none" />
        <path d="M 250,110 L 280,110" stroke={SVG_COLORS.cold} strokeWidth="4" markerEnd="url(#supply-arrow)" />
        <text x="230" y="95" fontSize="8" fill={SVG_COLORS.textLight} textAnchor="middle">Supply Duct</text>

        {/* Vent with cold air */}
        <g transform="translate(300, 55)">
          <rect x="0" y="40" width="100" height="80" rx="4" fill="white" stroke={SVG_COLORS.stroke} strokeWidth="2" />

          {/* Vent grille */}
          <rect x="20" y="55" width="60" height="40" fill="#dbeafe" stroke={SVG_COLORS.cold} strokeWidth="2" rx="2" />
          {[65, 75, 85].map((y) => (
            <line key={y} x1="25" y1={y} x2="75" y2={y} stroke={SVG_COLORS.cold} strokeWidth="1" />
          ))}

          {/* Cold air arrows */}
          {[35, 50, 65].map((x) => (
            <g key={x}>
              <line x1={x} y1="95" x2={x} y2="115" stroke={SVG_COLORS.cold} strokeWidth="2" opacity="0.7" />
              <polygon points={`${x-3},115 ${x+3},115 ${x},122`} fill={SVG_COLORS.cold} opacity="0.7" />
            </g>
          ))}

          <text x="50" y="135" fontSize="8" fill={SVG_COLORS.textLight} textAnchor="middle">Supply Vent</text>

          {/* Temperature at vent */}
          <rect x="5" y="140" width="90" height="22" rx="4" fill="#dbeafe" stroke={SVG_COLORS.cold} strokeWidth="1" />
          <text x="50" y="155" fontSize="10" fontWeight="bold" fill={SVG_COLORS.cold} textAnchor="middle">55-58°F (13-14°C)</text>
        </g>

        {/* Temperature differential indicator */}
        <g transform="translate(430, 70)">
          <rect x="0" y="0" width="140" height="130" rx="8" fill="white" stroke={SVG_COLORS.stroke} strokeWidth="2" />
          <rect x="0" y="0" width="140" height="28" rx="8" fill="#15803d" />
          <rect x="0" y="20" width="140" height="8" fill="#15803d" />
          <text x="70" y="19" fontSize="10" fontWeight="bold" fill="white" textAnchor="middle">TEMP DIFFERENTIAL</text>

          <text x="70" y="55" fontSize="24" fontWeight="bold" fill="#15803d" textAnchor="middle">15-20°F</text>
          <text x="70" y="72" fontSize="9" fill={SVG_COLORS.textLight} textAnchor="middle">(8-11°C)</text>

          <line x1="20" y1="85" x2="120" y2="85" stroke={SVG_COLORS.strokeLight} strokeWidth="1" />

          <text x="70" y="102" fontSize="8" fill={SVG_COLORS.text} textAnchor="middle">This is the expected</text>
          <text x="70" y="114" fontSize="8" fill={SVG_COLORS.text} textAnchor="middle">temperature drop for a</text>
          <text x="70" y="126" fontSize="8" fill={SVG_COLORS.text} textAnchor="middle">properly working AC</text>
        </g>

        {/* Bottom note */}
        <text x="300" y="245" fontSize="9" fill={SVG_COLORS.textLight} textAnchor="middle">
          Measure at return and closest supply vent with doors open, system running 15+ minutes
        </text>
      </svg>
    </div>
  );
}
