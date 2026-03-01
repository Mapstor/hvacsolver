'use client';

import { SVG_COLORS } from '../../calculators/CalculatorSVG';

/**
 * Illustration for Superheat and Subcooling article
 * Shows refrigeration cycle with measurement points for superheat and subcooling
 */
export default function SuperheatSubcoolingSVG() {
  return (
    <div className="w-full bg-slate-50 border border-slate-200 rounded-lg overflow-hidden">
      <svg
        viewBox="0 0 650 380"
        className="w-full h-auto"
        preserveAspectRatio="xMidYMid meet"
        role="img"
        aria-label="Refrigeration cycle showing superheat measurement at evaporator and subcooling measurement at condenser"
      >
        {/* Background */}
        <rect width="650" height="380" fill="#f8fafc" />

        {/* Title */}
        <text x="325" y="25" fontSize="14" fontWeight="bold" fill={SVG_COLORS.text} textAnchor="middle">
          Refrigeration Cycle: Superheat &amp; Subcooling Points
        </text>

        {/* Arrow markers */}
        <defs>
          <marker id="flow-arrow" markerWidth="10" markerHeight="10" refX="8" refY="3" orient="auto">
            <path d="M0,0 L0,6 L10,3 z" fill={SVG_COLORS.primary} />
          </marker>
          <marker id="hot-arrow" markerWidth="10" markerHeight="10" refX="8" refY="3" orient="auto">
            <path d="M0,0 L0,6 L10,3 z" fill={SVG_COLORS.heat} />
          </marker>
          <marker id="cold-arrow" markerWidth="10" markerHeight="10" refX="8" refY="3" orient="auto">
            <path d="M0,0 L0,6 L10,3 z" fill={SVG_COLORS.cold} />
          </marker>
        </defs>

        {/* ===== OUTDOOR UNIT (Condenser) - TOP RIGHT ===== */}
        <g transform="translate(420, 45)">
          {/* Condenser box */}
          <rect x="0" y="0" width="160" height="90" rx="6" fill="white" stroke={SVG_COLORS.stroke} strokeWidth="2" />
          <rect x="0" y="0" width="160" height="24" rx="6" fill={SVG_COLORS.heat} />
          <rect x="0" y="18" width="160" height="6" fill={SVG_COLORS.heat} />
          <text x="80" y="16" fontSize="11" fontWeight="bold" fill="white" textAnchor="middle">
            CONDENSER (Outdoor)
          </text>

          {/* Coil representation */}
          <path
            d="M 20,40 Q 40,35 60,40 Q 80,45 100,40 Q 120,35 140,40"
            fill="none"
            stroke={SVG_COLORS.heat}
            strokeWidth="3"
          />
          <path
            d="M 20,55 Q 40,50 60,55 Q 80,60 100,55 Q 120,50 140,55"
            fill="none"
            stroke={SVG_COLORS.heat}
            strokeWidth="3"
          />
          <path
            d="M 20,70 Q 40,65 60,70 Q 80,75 100,70 Q 120,65 140,70"
            fill="none"
            stroke="#f59e0b"
            strokeWidth="3"
          />

          {/* Heat rejection arrows */}
          {[30, 80, 130].map((x) => (
            <g key={x}>
              <line x1={x} y1="85" x2={x} y2="100" stroke={SVG_COLORS.heat} strokeWidth="1.5" opacity="0.6" />
              <polygon points={`${x - 4},100 ${x + 4},100 ${x},108`} fill={SVG_COLORS.heat} opacity="0.6" />
            </g>
          ))}
          <text x="80" y="120" fontSize="8" fill={SVG_COLORS.textLight} textAnchor="middle">
            Heat released outside
          </text>
        </g>

        {/* ===== INDOOR UNIT (Evaporator) - BOTTOM LEFT ===== */}
        <g transform="translate(70, 220)">
          {/* Heat absorption arrows - moved above */}
          {[30, 80, 130].map((x) => (
            <g key={x}>
              <line x1={x} y1="-20" x2={x} y2="-5" stroke={SVG_COLORS.cold} strokeWidth="1.5" opacity="0.6" />
              <polygon points={`${x - 4},-20 ${x + 4},-20 ${x},-12`} fill={SVG_COLORS.cold} opacity="0.6" />
            </g>
          ))}
          <text x="80" y="-28" fontSize="8" fill={SVG_COLORS.textLight} textAnchor="middle">
            Heat absorbed from room
          </text>

          {/* Evaporator box */}
          <rect x="0" y="0" width="160" height="90" rx="6" fill="white" stroke={SVG_COLORS.stroke} strokeWidth="2" />
          <rect x="0" y="0" width="160" height="24" rx="6" fill={SVG_COLORS.cold} />
          <rect x="0" y="18" width="160" height="6" fill={SVG_COLORS.cold} />
          <text x="80" y="16" fontSize="11" fontWeight="bold" fill="white" textAnchor="middle">
            EVAPORATOR (Indoor)
          </text>

          {/* Coil representation */}
          <path
            d="M 20,40 Q 40,35 60,40 Q 80,45 100,40 Q 120,35 140,40"
            fill="none"
            stroke={SVG_COLORS.cold}
            strokeWidth="3"
          />
          <path
            d="M 20,55 Q 40,50 60,55 Q 80,60 100,55 Q 120,50 140,55"
            fill="none"
            stroke={SVG_COLORS.cold}
            strokeWidth="3"
          />
          <path
            d="M 20,70 Q 40,65 60,70 Q 80,75 100,70 Q 120,65 140,70"
            fill="none"
            stroke="#60a5fa"
            strokeWidth="3"
          />
        </g>

        {/* ===== COMPRESSOR ===== */}
        <g transform="translate(510, 220)">
          <circle cx="30" cy="30" r="28" fill="white" stroke={SVG_COLORS.stroke} strokeWidth="2" />
          <circle cx="30" cy="30" r="20" fill="#e2e8f0" />
          <text x="30" y="26" fontSize="8" fontWeight="bold" fill={SVG_COLORS.text} textAnchor="middle">
            COMP-
          </text>
          <text x="30" y="36" fontSize="8" fontWeight="bold" fill={SVG_COLORS.text} textAnchor="middle">
            RESSOR
          </text>
        </g>

        {/* ===== EXPANSION VALVE ===== */}
        <g transform="translate(70, 160)">
          <rect x="0" y="0" width="55" height="30" rx="4" fill="white" stroke={SVG_COLORS.stroke} strokeWidth="2" />
          <text x="27" y="13" fontSize="7" fontWeight="bold" fill={SVG_COLORS.text} textAnchor="middle">
            TXV/
          </text>
          <text x="27" y="23" fontSize="7" fontWeight="bold" fill={SVG_COLORS.text} textAnchor="middle">
            METERING
          </text>
        </g>

        {/* ===== REFRIGERANT LINES ===== */}

        {/* High-side liquid line: Condenser → TXV (subcooled liquid) */}
        <path
          d="M 420,90 L 280,90 L 280,175 L 125,175"
          fill="none"
          stroke={SVG_COLORS.heat}
          strokeWidth="4"
          markerEnd="url(#hot-arrow)"
        />

        {/* Low-side liquid line: TXV → Evaporator (cold liquid/vapor mix) */}
        <path
          d="M 97,190 L 97,220"
          fill="none"
          stroke={SVG_COLORS.cold}
          strokeWidth="4"
          markerEnd="url(#cold-arrow)"
        />

        {/* Suction line: Evaporator → Compressor (superheated vapor) */}
        <path
          d="M 230,265 L 350,265 L 350,250 L 485,250"
          fill="none"
          stroke={SVG_COLORS.cold}
          strokeWidth="4"
          markerEnd="url(#cold-arrow)"
        />

        {/* Discharge line: Compressor → Condenser (hot vapor) */}
        <path
          d="M 540,192 L 540,90 L 580,90"
          fill="none"
          stroke={SVG_COLORS.heat}
          strokeWidth="4"
          markerEnd="url(#hot-arrow)"
        />

        {/* ===== SUBCOOLING MEASUREMENT POINT ===== */}
        <g transform="translate(280, 55)">
          <rect x="-55" y="-15" width="110" height="48" rx="6" fill={SVG_COLORS.accentLight} stroke={SVG_COLORS.accent} strokeWidth="2" />
          <text x="0" y="0" fontSize="10" fontWeight="bold" fill={SVG_COLORS.accent} textAnchor="middle">
            SUBCOOLING
          </text>
          <text x="0" y="14" fontSize="9" fill={SVG_COLORS.text} textAnchor="middle">
            Measured here
          </text>
          <text x="0" y="26" fontSize="8" fill={SVG_COLORS.textLight} textAnchor="middle">
            (Liquid line temp)
          </text>
          {/* Arrow pointing to line */}
          <line x1="0" y1="33" x2="0" y2="52" stroke={SVG_COLORS.accent} strokeWidth="2" />
          <polygon points="-5,52 5,52 0,60" fill={SVG_COLORS.accent} />
        </g>

        {/* ===== SUPERHEAT MEASUREMENT POINT ===== */}
        <g transform="translate(350, 300)">
          <rect x="-55" y="-15" width="110" height="48" rx="6" fill={SVG_COLORS.accentLight} stroke={SVG_COLORS.accent} strokeWidth="2" />
          <text x="0" y="0" fontSize="10" fontWeight="bold" fill={SVG_COLORS.accent} textAnchor="middle">
            SUPERHEAT
          </text>
          <text x="0" y="14" fontSize="9" fill={SVG_COLORS.text} textAnchor="middle">
            Measured here
          </text>
          <text x="0" y="26" fontSize="8" fill={SVG_COLORS.textLight} textAnchor="middle">
            (Suction line temp)
          </text>
          {/* Arrow pointing to line */}
          <line x1="0" y1="-25" x2="0" y2="-52" stroke={SVG_COLORS.accent} strokeWidth="2" />
          <polygon points="-5,-52 5,-52 0,-60" fill={SVG_COLORS.accent} />
        </g>

        {/* ===== LEGEND - Bottom left ===== */}
        <g transform="translate(20, 355)">
          <line x1="0" y1="0" x2="30" y2="0" stroke={SVG_COLORS.heat} strokeWidth="4" />
          <text x="38" y="4" fontSize="8" fill={SVG_COLORS.text}>High pressure/Hot</text>

          <line x1="150" y1="0" x2="180" y2="0" stroke={SVG_COLORS.cold} strokeWidth="4" />
          <text x="188" y="4" fontSize="8" fill={SVG_COLORS.text}>Low pressure/Cold</text>

          <rect x="320" y="-5" width="16" height="10" fill={SVG_COLORS.accentLight} stroke={SVG_COLORS.accent} strokeWidth="1" />
          <text x="342" y="4" fontSize="8" fill={SVG_COLORS.text}>Measurement point</text>
        </g>

        {/* ===== STATE LABELS ON LINES ===== */}
        <text x="200" y="85" fontSize="8" fill={SVG_COLORS.textLight} textAnchor="middle">
          Subcooled Liquid →
        </text>
        <text x="380" y="260" fontSize="8" fill={SVG_COLORS.textLight} textAnchor="middle">
          ← Superheated Vapor
        </text>
        <text x="60" y="210" fontSize="8" fill={SVG_COLORS.textLight} textAnchor="middle">
          2-Phase
        </text>
        <text x="575" y="150" fontSize="8" fill={SVG_COLORS.textLight} textAnchor="middle" transform="rotate(90, 575, 150)">
          Hot Vapor
        </text>
      </svg>
    </div>
  );
}
