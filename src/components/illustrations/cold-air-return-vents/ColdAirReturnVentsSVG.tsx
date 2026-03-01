'use client';

import { SVG_COLORS } from '../../calculators/CalculatorSVG';

/**
 * Illustration showing cold air return vent function and placement
 */
export default function ColdAirReturnVentsSVG() {
  return (
    <div className="w-full bg-slate-50 border border-slate-200 rounded-lg overflow-hidden">
      <svg
        viewBox="0 0 600 300"
        className="w-full h-auto"
        preserveAspectRatio="xMidYMid meet"
        role="img"
        aria-label="Cold air return vent diagram showing air circulation in HVAC system"
      >
        <rect width="600" height="300" fill="#f8fafc" />

        <text x="300" y="25" fontSize="14" fontWeight="bold" fill={SVG_COLORS.text} textAnchor="middle">
          How Return Vents Work in Your HVAC System
        </text>

        {/* Arrow markers */}
        <defs>
          <marker id="supply-flow" markerWidth="8" markerHeight="8" refX="6" refY="3" orient="auto">
            <path d="M0,0 L0,6 L8,3 z" fill={SVG_COLORS.cold} />
          </marker>
          <marker id="return-flow" markerWidth="8" markerHeight="8" refX="6" refY="3" orient="auto">
            <path d="M0,0 L0,6 L8,3 z" fill={SVG_COLORS.heat} />
          </marker>
        </defs>

        {/* Room outline */}
        <rect x="120" y="50" width="360" height="200" fill="white" stroke={SVG_COLORS.stroke} strokeWidth="2" rx="4" />
        <text x="300" y="70" fontSize="10" fill={SVG_COLORS.textLight} textAnchor="middle">ROOM</text>

        {/* Air Handler / Furnace */}
        <g transform="translate(30, 100)">
          <rect x="0" y="0" width="70" height="100" rx="4" fill="#e2e8f0" stroke={SVG_COLORS.stroke} strokeWidth="2" />
          <text x="35" y="45" fontSize="8" fontWeight="bold" fill={SVG_COLORS.text} textAnchor="middle">AIR</text>
          <text x="35" y="57" fontSize="8" fontWeight="bold" fill={SVG_COLORS.text} textAnchor="middle">HANDLER</text>

          {/* Filter indicator */}
          <rect x="10" y="70" width="50" height="15" fill="#dbeafe" stroke={SVG_COLORS.cold} strokeWidth="1" rx="2" />
          <text x="35" y="81" fontSize="6" fill={SVG_COLORS.text} textAnchor="middle">FILTER</text>
        </g>

        {/* Supply duct and vent (ceiling) */}
        <rect x="100" y="45" width="250" height="8" fill={SVG_COLORS.cold} opacity="0.3" />
        <g transform="translate(330, 50)">
          <rect x="0" y="0" width="60" height="20" fill={SVG_COLORS.cold} stroke={SVG_COLORS.stroke} strokeWidth="1" rx="2" />
          <text x="30" y="13" fontSize="7" fontWeight="bold" fill="white" textAnchor="middle">SUPPLY</text>

          {/* Cold air arrows coming down */}
          {[15, 30, 45].map((x) => (
            <g key={x}>
              <line x1={x} y1="20" x2={x} y2="50" stroke={SVG_COLORS.cold} strokeWidth="2" />
              <polygon points={`${x-4},50 ${x+4},50 ${x},58`} fill={SVG_COLORS.cold} />
            </g>
          ))}
        </g>
        <text x="360" y="125" fontSize="9" fill={SVG_COLORS.cold} textAnchor="middle">
          Conditioned
        </text>
        <text x="360" y="137" fontSize="9" fill={SVG_COLORS.cold} textAnchor="middle">
          Air Out
        </text>

        {/* Return vent (low on wall) */}
        <g transform="translate(140, 200)">
          <rect x="0" y="0" width="80" height="40" fill={SVG_COLORS.heat} stroke={SVG_COLORS.stroke} strokeWidth="1" rx="2" opacity="0.8" />
          <text x="40" y="15" fontSize="8" fontWeight="bold" fill="white" textAnchor="middle">RETURN</text>
          <text x="40" y="27" fontSize="7" fill="white" textAnchor="middle">VENT</text>

          {/* Arrows going into return */}
          {[15, 40, 65].map((x) => (
            <g key={x}>
              <line x1={x} y1="-30" x2={x} y2="-5" stroke={SVG_COLORS.heat} strokeWidth="2" />
              <polygon points={`${x-3},-5 ${x+3},-5 ${x},2`} fill={SVG_COLORS.heat} />
            </g>
          ))}
        </g>
        <text x="260" y="165" fontSize="9" fill={SVG_COLORS.heat} textAnchor="middle">
          Room Air
        </text>
        <text x="260" y="177" fontSize="9" fill={SVG_COLORS.heat} textAnchor="middle">
          Returns
        </text>

        {/* Return duct back to handler */}
        <rect x="100" y="245" width="80" height="8" fill={SVG_COLORS.heat} opacity="0.3" />
        <path d="M 100,249 L 100,170 L 70,170" stroke={SVG_COLORS.heat} strokeWidth="3" fill="none" markerEnd="url(#return-flow)" />

        {/* Supply duct from handler */}
        <path d="M 70,130 L 100,130 L 100,49" stroke={SVG_COLORS.cold} strokeWidth="3" fill="none" markerEnd="url(#supply-flow)" />

        {/* Circulation arrows in room */}
        <path d="M 270,140 Q 300,180 330,140" stroke={SVG_COLORS.textLight} strokeWidth="1" fill="none" strokeDasharray="4,2" />
        <polygon points="330,140 326,148 334,146" fill={SVG_COLORS.textLight} />

        {/* Legend */}
        <g transform="translate(500, 100)">
          <rect x="0" y="0" width="85" height="70" rx="4" fill="white" stroke={SVG_COLORS.strokeLight} strokeWidth="1" />
          <text x="42" y="15" fontSize="8" fontWeight="bold" fill={SVG_COLORS.text} textAnchor="middle">Legend</text>

          <rect x="10" y="25" width="20" height="8" fill={SVG_COLORS.cold} />
          <text x="35" y="32" fontSize="7" fill={SVG_COLORS.text}>Supply (cold)</text>

          <rect x="10" y="42" width="20" height="8" fill={SVG_COLORS.heat} />
          <text x="35" y="49" fontSize="7" fill={SVG_COLORS.text}>Return (warm)</text>

          <path d="M 10,60 Q 20,65 30,60" stroke={SVG_COLORS.textLight} strokeWidth="1" fill="none" strokeDasharray="3,2" />
          <text x="35" y="63" fontSize="7" fill={SVG_COLORS.text}>Air flow</text>
        </g>

        {/* Bottom note */}
        <text x="300" y="285" fontSize="9" fill={SVG_COLORS.textLight} textAnchor="middle">
          Return vents pull room air back to be filtered, conditioned, and recirculated
        </text>
      </svg>
    </div>
  );
}
