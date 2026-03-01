'use client';

import { SVG_COLORS } from '../../calculators/CalculatorSVG';

/**
 * Illustration showing causes and fixes for window AC leaking water
 */
export default function WindowACLeakingWaterSVG() {
  return (
    <div className="w-full bg-slate-50 border border-slate-200 rounded-lg overflow-hidden">
      <svg
        viewBox="0 0 600 330"
        className="w-full h-auto"
        preserveAspectRatio="xMidYMid meet"
        role="img"
        aria-label="Window AC leaking water causes and solutions"
      >
        <rect width="600" height="330" fill="#f8fafc" />

        <text x="300" y="25" fontSize="14" fontWeight="bold" fill={SVG_COLORS.text} textAnchor="middle">
          Window AC Leaking Water — Causes & Solutions
        </text>

        {/* Window AC with water leak illustration */}
        <g transform="translate(50, 50)">
          {/* Window frame */}
          <rect x="0" y="0" width="150" height="100" fill="#e2e8f0" stroke="#64748b" strokeWidth="2" />

          {/* AC unit */}
          <rect x="15" y="25" width="120" height="70" fill="#64748b" rx="4" />
          <rect x="25" y="35" width="45" height="50" fill="#475569" rx="2" />
          <rect x="75" y="35" width="50" height="22" fill="#334155" rx="2" />
          <rect x="75" y="60" width="50" height="22" fill="#334155" rx="2" />

          {/* Water droplets */}
          <ellipse cx="55" cy="105" rx="4" ry="6" fill="#3b82f6" />
          <ellipse cx="70" cy="108" rx="3" ry="5" fill="#3b82f6" />
          <ellipse cx="85" cy="106" rx="4" ry="5" fill="#3b82f6" />

          {/* Water puddle */}
          <ellipse cx="70" cy="120" rx="35" ry="8" fill="#93c5fd" opacity="0.6" />

          <text x="75" y="140" fontSize="9" fill="#b91c1c" textAnchor="middle" fontWeight="bold">INDOOR LEAK</text>
        </g>

        {/* Causes */}
        <g transform="translate(230, 45)">
          <text x="0" y="0" fontSize="11" fontWeight="bold" fill={SVG_COLORS.text}>Common Causes:</text>

          <g transform="translate(0, 18)">
            <rect x="0" y="0" width="160" height="50" rx="4" fill="#fef2f2" stroke="#b91c1c" strokeWidth="1" />
            <text x="10" y="18" fontSize="9" fontWeight="bold" fill="#b91c1c">Improper Tilt</text>
            <text x="10" y="32" fontSize="7" fill={SVG_COLORS.textLight}>Unit tilted inward, not</text>
            <text x="10" y="44" fontSize="7" fill={SVG_COLORS.textLight}>draining outside</text>
          </g>

          <g transform="translate(170, 18)">
            <rect x="0" y="0" width="160" height="50" rx="4" fill="#fef2f2" stroke="#b91c1c" strokeWidth="1" />
            <text x="10" y="18" fontSize="9" fontWeight="bold" fill="#b91c1c">Clogged Drain</text>
            <text x="10" y="32" fontSize="7" fill={SVG_COLORS.textLight}>Debris blocking drain</text>
            <text x="10" y="44" fontSize="7" fill={SVG_COLORS.textLight}>hole or channel</text>
          </g>

          <g transform="translate(0, 75)">
            <rect x="0" y="0" width="160" height="50" rx="4" fill="#fef3c7" stroke="#d97706" strokeWidth="1" />
            <text x="10" y="18" fontSize="9" fontWeight="bold" fill="#d97706">Dirty Filter</text>
            <text x="10" y="32" fontSize="7" fill={SVG_COLORS.textLight}>Causes frozen coil →</text>
            <text x="10" y="44" fontSize="7" fill={SVG_COLORS.textLight}>excess water when melts</text>
          </g>

          <g transform="translate(170, 75)">
            <rect x="0" y="0" width="160" height="50" rx="4" fill="#fef3c7" stroke="#d97706" strokeWidth="1" />
            <text x="10" y="18" fontSize="9" fontWeight="bold" fill="#d97706">High Humidity</text>
            <text x="10" y="32" fontSize="7" fill={SVG_COLORS.textLight}>Extreme humidity =</text>
            <text x="10" y="44" fontSize="7" fill={SVG_COLORS.textLight}>more condensation</text>
          </g>
        </g>

        {/* Solutions */}
        <g transform="translate(50, 215)">
          <text x="0" y="0" fontSize="11" fontWeight="bold" fill={SVG_COLORS.text}>How to Fix:</text>

          <g transform="translate(0, 18)">
            <rect x="0" y="0" width="130" height="65" rx="4" fill="#dcfce7" stroke="#15803d" strokeWidth="1" />
            <text x="65" y="18" fontSize="9" fontWeight="bold" fill="#15803d" textAnchor="middle">Check Tilt</text>
            <text x="65" y="34" fontSize="7" fill={SVG_COLORS.textLight} textAnchor="middle">Back should be</text>
            <text x="65" y="46" fontSize="7" fill={SVG_COLORS.textLight} textAnchor="middle">1/4&quot; lower than front</text>
            <text x="65" y="58" fontSize="7" fill={SVG_COLORS.textLight} textAnchor="middle">for proper drainage</text>
          </g>

          <g transform="translate(140, 18)">
            <rect x="0" y="0" width="130" height="65" rx="4" fill="#dcfce7" stroke="#15803d" strokeWidth="1" />
            <text x="65" y="18" fontSize="9" fontWeight="bold" fill="#15803d" textAnchor="middle">Clear Drain</text>
            <text x="65" y="34" fontSize="7" fill={SVG_COLORS.textLight} textAnchor="middle">Find drain hole on</text>
            <text x="65" y="46" fontSize="7" fill={SVG_COLORS.textLight} textAnchor="middle">bottom/back of unit</text>
            <text x="65" y="58" fontSize="7" fill={SVG_COLORS.textLight} textAnchor="middle">Clear with wire/brush</text>
          </g>

          <g transform="translate(280, 18)">
            <rect x="0" y="0" width="130" height="65" rx="4" fill="#dcfce7" stroke="#15803d" strokeWidth="1" />
            <text x="65" y="18" fontSize="9" fontWeight="bold" fill="#15803d" textAnchor="middle">Clean Filter</text>
            <text x="65" y="34" fontSize="7" fill={SVG_COLORS.textLight} textAnchor="middle">Remove, wash, dry</text>
            <text x="65" y="46" fontSize="7" fill={SVG_COLORS.textLight} textAnchor="middle">or replace filter</text>
            <text x="65" y="58" fontSize="7" fill={SVG_COLORS.textLight} textAnchor="middle">Monthly maintenance</text>
          </g>

          <g transform="translate(420, 18)">
            <rect x="0" y="0" width="130" height="65" rx="4" fill="#fef3c7" stroke="#d97706" strokeWidth="1" />
            <text x="65" y="18" fontSize="9" fontWeight="bold" fill="#d97706" textAnchor="middle">Check Seals</text>
            <text x="65" y="34" fontSize="7" fill={SVG_COLORS.textLight} textAnchor="middle">Inspect weatherstrip</text>
            <text x="65" y="46" fontSize="7" fill={SVG_COLORS.textLight} textAnchor="middle">around unit</text>
            <text x="65" y="58" fontSize="7" fill={SVG_COLORS.textLight} textAnchor="middle">Replace if damaged</text>
          </g>
        </g>

        {/* Bottom note */}
        <g transform="translate(100, 315)">
          <text x="200" y="0" fontSize="8" fill={SVG_COLORS.textLight} textAnchor="middle">
            Normal: Some condensation dripping outside • Problem: Water leaking inside room
          </text>
        </g>
      </svg>
    </div>
  );
}
