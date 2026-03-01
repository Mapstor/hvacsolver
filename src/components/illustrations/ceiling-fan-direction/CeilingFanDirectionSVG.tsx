'use client';

import { SVG_COLORS } from '../../calculators/CalculatorSVG';

/**
 * Illustration for Ceiling Fan Direction article
 * Shows counterclockwise (summer) vs clockwise (winter) rotation with airflow
 */
export default function CeilingFanDirectionSVG() {
  return (
    <div className="w-full bg-slate-50 border border-slate-200 rounded-lg overflow-hidden">
      <svg
        viewBox="0 0 600 280"
        className="w-full h-auto"
        preserveAspectRatio="xMidYMid meet"
        role="img"
        aria-label="Ceiling fan direction: counterclockwise for summer cooling, clockwise for winter heat distribution"
      >
        {/* Background */}
        <rect width="600" height="280" fill="#f8fafc" />

        {/* Divider */}
        <line x1="300" y1="20" x2="300" y2="260" stroke={SVG_COLORS.strokeLight} strokeWidth="1" strokeDasharray="4,4" />

        {/* ===== SUMMER SIDE (LEFT) ===== */}
        <g transform="translate(0, 0)">
          {/* Title */}
          <rect x="40" y="15" width="100" height="26" rx="13" fill={SVG_COLORS.cold} />
          <text x="90" y="33" fontSize="12" fontWeight="bold" fill="white" textAnchor="middle">
            SUMMER
          </text>

          {/* Sun icon */}
          <g transform="translate(210, 30)">
            <circle cx="0" cy="0" r="14" fill="#fbbf24" />
            {[0, 45, 90, 135, 180, 225, 270, 315].map((angle) => {
              const rad = (angle * Math.PI) / 180;
              const x1 = Math.cos(rad) * 18;
              const y1 = Math.sin(rad) * 18;
              const x2 = Math.cos(rad) * 24;
              const y2 = Math.sin(rad) * 24;
              return (
                <line
                  key={angle}
                  x1={x1}
                  y1={y1}
                  x2={x2}
                  y2={y2}
                  stroke="#f59e0b"
                  strokeWidth="2"
                  strokeLinecap="round"
                />
              );
            })}
          </g>

          {/* Room outline */}
          <rect x="50" y="60" width="200" height="160" fill="white" stroke={SVG_COLORS.stroke} strokeWidth="1.5" />

          {/* Ceiling */}
          <line x1="50" y1="60" x2="250" y2="60" stroke={SVG_COLORS.stroke} strokeWidth="2" />

          {/* Ceiling fan */}
          <g transform="translate(150, 95)">
            {/* Downrod */}
            <rect x="-3" y="-35" width="6" height="35" fill="#64748b" />

            {/* Motor housing */}
            <ellipse cx="0" cy="0" rx="12" ry="7" fill="#475569" stroke={SVG_COLORS.stroke} strokeWidth="1" />

            {/* Fan blades with rotation arrow */}
            {[0, 90, 180, 270].map((angle) => (
              <ellipse
                key={angle}
                cx="0"
                cy="0"
                rx="45"
                ry="10"
                fill="#94a3b8"
                stroke={SVG_COLORS.stroke}
                strokeWidth="0.5"
                opacity="0.85"
                transform={`rotate(${angle})`}
              />
            ))}

            {/* Center cap */}
            <circle cx="0" cy="0" r="6" fill="#334155" />

            {/* Counterclockwise arrow */}
            <path
              d="M -30,-25 A 35,35 0 0,0 30,-25"
              fill="none"
              stroke={SVG_COLORS.cold}
              strokeWidth="2.5"
              markerEnd="url(#arrow-ccw)"
            />
          </g>

          {/* Downdraft arrows */}
          <defs>
            <marker id="arrow-ccw" markerWidth="8" markerHeight="8" refX="6" refY="3" orient="auto">
              <path d="M0,0 L0,6 L8,3 z" fill={SVG_COLORS.cold} />
            </marker>
            <marker id="arrow-down" markerWidth="8" markerHeight="8" refX="3" refY="6" orient="auto">
              <path d="M0,0 L6,0 L3,8 z" fill={SVG_COLORS.cold} />
            </marker>
          </defs>

          {/* Central downdraft */}
          <line x1="150" y1="115" x2="150" y2="185" stroke={SVG_COLORS.cold} strokeWidth="2" markerEnd="url(#arrow-down)" />
          <line x1="130" y1="120" x2="115" y2="175" stroke={SVG_COLORS.cold} strokeWidth="1.5" markerEnd="url(#arrow-down)" opacity="0.7" />
          <line x1="170" y1="120" x2="185" y2="175" stroke={SVG_COLORS.cold} strokeWidth="1.5" markerEnd="url(#arrow-down)" opacity="0.7" />

          {/* Person feeling cool */}
          <g transform="translate(145, 190)">
            <circle cx="0" cy="0" r="8" fill={SVG_COLORS.primary} />
            <path d="M0,8 L0,30 M0,15 L-10,25 M0,15 L10,25 M0,30 L-8,45 M0,30 L8,45" stroke={SVG_COLORS.primary} strokeWidth="2" strokeLinecap="round" fill="none" />
          </g>

          {/* Label */}
          <text x="150" y="255" fontSize="11" fill={SVG_COLORS.text} textAnchor="middle" fontWeight="600">
            Counterclockwise
          </text>
          <text x="150" y="270" fontSize="10" fill={SVG_COLORS.textLight} textAnchor="middle">
            Direct downdraft = wind chill
          </text>
        </g>

        {/* ===== WINTER SIDE (RIGHT) ===== */}
        <g transform="translate(300, 0)">
          {/* Title */}
          <rect x="40" y="15" width="100" height="26" rx="13" fill={SVG_COLORS.heat} />
          <text x="90" y="33" fontSize="12" fontWeight="bold" fill="white" textAnchor="middle">
            WINTER
          </text>

          {/* Snowflake icon */}
          <g transform="translate(210, 30)">
            {[0, 60, 120].map((angle) => (
              <g key={angle} transform={`rotate(${angle})`}>
                <line x1="0" y1="-16" x2="0" y2="16" stroke={SVG_COLORS.cold} strokeWidth="2" />
                <line x1="-4" y1="-10" x2="4" y2="-10" stroke={SVG_COLORS.cold} strokeWidth="1.5" />
                <line x1="-4" y1="10" x2="4" y2="10" stroke={SVG_COLORS.cold} strokeWidth="1.5" />
              </g>
            ))}
          </g>

          {/* Room outline */}
          <rect x="50" y="60" width="200" height="160" fill="white" stroke={SVG_COLORS.stroke} strokeWidth="1.5" />

          {/* Ceiling */}
          <line x1="50" y1="60" x2="250" y2="60" stroke={SVG_COLORS.stroke} strokeWidth="2" />

          {/* Heat layer at ceiling (before circulation) */}
          <rect x="51" y="61" width="198" height="25" fill={SVG_COLORS.heatLight} opacity="0.5" />

          {/* Ceiling fan */}
          <g transform="translate(150, 95)">
            {/* Downrod */}
            <rect x="-3" y="-35" width="6" height="35" fill="#64748b" />

            {/* Motor housing */}
            <ellipse cx="0" cy="0" rx="12" ry="7" fill="#475569" stroke={SVG_COLORS.stroke} strokeWidth="1" />

            {/* Fan blades */}
            {[0, 90, 180, 270].map((angle) => (
              <ellipse
                key={angle}
                cx="0"
                cy="0"
                rx="45"
                ry="10"
                fill="#94a3b8"
                stroke={SVG_COLORS.stroke}
                strokeWidth="0.5"
                opacity="0.85"
                transform={`rotate(${angle})`}
              />
            ))}

            {/* Center cap */}
            <circle cx="0" cy="0" r="6" fill="#334155" />

            {/* Clockwise arrow */}
            <path
              d="M 30,-25 A 35,35 0 0,1 -30,-25"
              fill="none"
              stroke={SVG_COLORS.heat}
              strokeWidth="2.5"
              markerEnd="url(#arrow-cw)"
            />
          </g>

          {/* Arrow markers for winter side */}
          <defs>
            <marker id="arrow-cw" markerWidth="8" markerHeight="8" refX="6" refY="3" orient="auto">
              <path d="M0,0 L0,6 L8,3 z" fill={SVG_COLORS.heat} />
            </marker>
            <marker id="arrow-up" markerWidth="8" markerHeight="8" refX="3" refY="2" orient="auto">
              <path d="M0,8 L6,8 L3,0 z" fill={SVG_COLORS.heat} />
            </marker>
            <marker id="arrow-side" markerWidth="8" markerHeight="8" refX="6" refY="3" orient="auto">
              <path d="M0,0 L0,6 L8,3 z" fill={SVG_COLORS.heat} />
            </marker>
          </defs>

          {/* Updraft arrows (gentle) */}
          <line x1="150" y1="180" x2="150" y2="115" stroke={SVG_COLORS.heat} strokeWidth="1.5" markerEnd="url(#arrow-up)" opacity="0.6" />

          {/* Circulation pattern - heat pushed to walls and down */}
          <path
            d="M 85,85 Q 85,110 75,140"
            fill="none"
            stroke={SVG_COLORS.heat}
            strokeWidth="2"
            markerEnd="url(#arrow-side)"
          />
          <path
            d="M 215,85 Q 215,110 225,140"
            fill="none"
            stroke={SVG_COLORS.heat}
            strokeWidth="2"
            markerEnd="url(#arrow-side)"
          />

          {/* Person with warmth */}
          <g transform="translate(145, 190)">
            <circle cx="0" cy="0" r="8" fill={SVG_COLORS.primary} />
            <path d="M0,8 L0,30 M0,15 L-10,25 M0,15 L10,25 M0,30 L-8,45 M0,30 L8,45" stroke={SVG_COLORS.primary} strokeWidth="2" strokeLinecap="round" fill="none" />
          </g>

          {/* Label */}
          <text x="150" y="255" fontSize="11" fill={SVG_COLORS.text} textAnchor="middle" fontWeight="600">
            Clockwise (Low Speed)
          </text>
          <text x="150" y="270" fontSize="10" fill={SVG_COLORS.textLight} textAnchor="middle">
            Gentle updraft = redistributes warm air
          </text>
        </g>
      </svg>
    </div>
  );
}
