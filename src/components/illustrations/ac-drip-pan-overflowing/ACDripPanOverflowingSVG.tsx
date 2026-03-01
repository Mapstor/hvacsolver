'use client';

import { SVG_COLORS } from '../../calculators/CalculatorSVG';

/**
 * Illustration showing AC drip pan and drain line system
 */
export default function ACDripPanOverflowingSVG() {
  return (
    <div className="w-full bg-slate-50 border border-slate-200 rounded-lg overflow-hidden">
      <svg
        viewBox="0 0 600 300"
        className="w-full h-auto"
        preserveAspectRatio="xMidYMid meet"
        role="img"
        aria-label="AC drip pan and condensate drain system diagram"
      >
        <rect width="600" height="300" fill="#f8fafc" />

        <text x="300" y="25" fontSize="14" fontWeight="bold" fill={SVG_COLORS.text} textAnchor="middle">
          AC Condensate Drain System
        </text>

        {/* Left side - Normal operation */}
        <g transform="translate(40, 50)">
          <rect x="0" y="0" width="240" height="220" rx="8" fill="white" stroke="#15803d" strokeWidth="2" />
          <rect x="0" y="0" width="240" height="28" rx="8" fill="#15803d" />
          <rect x="0" y="20" width="240" height="8" fill="#15803d" />
          <text x="120" y="19" fontSize="10" fontWeight="bold" fill="white" textAnchor="middle">
            Normal Operation
          </text>

          {/* Evaporator coil */}
          <rect x="50" y="45" width="140" height="50" fill="#dbeafe" stroke={SVG_COLORS.cold} strokeWidth="2" rx="4" />
          <text x="120" y="70" fontSize="9" fill={SVG_COLORS.text} textAnchor="middle">Evaporator Coil</text>
          <text x="120" y="82" fontSize="7" fill={SVG_COLORS.cold} textAnchor="middle">(Cold, dehumidifies air)</text>

          {/* Condensation droplets */}
          {[70, 95, 120, 145, 165].map((x) => (
            <ellipse key={x} cx={x} cy="97" rx="2" ry="6" fill="#60a5fa" opacity="0.7" />
          ))}

          {/* Drip pan */}
          <path d="M 40,110 L 40,130 L 200,130 L 200,110 Z" fill="#94a3b8" stroke={SVG_COLORS.stroke} strokeWidth="1" />
          <text x="120" y="123" fontSize="8" fill="white" textAnchor="middle">Drip Pan</text>

          {/* Water in pan (low level) */}
          <rect x="42" y="115" width="156" height="13" fill="#60a5fa" opacity="0.5" rx="1" />

          {/* Drain line */}
          <rect x="115" y="130" width="10" height="50" fill="#64748b" />
          <text x="145" y="155" fontSize="7" fill={SVG_COLORS.textLight}>Drain Line</text>

          {/* Water flowing out */}
          <ellipse cx="120" cy="185" rx="3" ry="5" fill="#60a5fa" opacity="0.6" />
          <ellipse cx="120" cy="195" rx="2" ry="4" fill="#60a5fa" opacity="0.5" />
          <text x="120" y="210" fontSize="7" fill={SVG_COLORS.textLight} textAnchor="middle">Drains outside</text>
        </g>

        {/* Right side - Clogged/overflowing */}
        <g transform="translate(320, 50)">
          <rect x="0" y="0" width="240" height="220" rx="8" fill="white" stroke="#b91c1c" strokeWidth="2" />
          <rect x="0" y="0" width="240" height="28" rx="8" fill="#b91c1c" />
          <rect x="0" y="20" width="240" height="8" fill="#b91c1c" />
          <text x="120" y="19" fontSize="10" fontWeight="bold" fill="white" textAnchor="middle">
            Clogged Drain - Overflow!
          </text>

          {/* Evaporator coil */}
          <rect x="50" y="45" width="140" height="50" fill="#dbeafe" stroke={SVG_COLORS.cold} strokeWidth="2" rx="4" />
          <text x="120" y="70" fontSize="9" fill={SVG_COLORS.text} textAnchor="middle">Evaporator Coil</text>

          {/* Condensation droplets */}
          {[70, 95, 120, 145, 165].map((x) => (
            <ellipse key={x} cx={x} cy="97" rx="2" ry="6" fill="#60a5fa" opacity="0.7" />
          ))}

          {/* Drip pan */}
          <path d="M 40,110 L 40,130 L 200,130 L 200,110 Z" fill="#94a3b8" stroke={SVG_COLORS.stroke} strokeWidth="1" />

          {/* Water OVERFLOWING pan */}
          <rect x="42" y="108" width="156" height="20" fill="#60a5fa" opacity="0.6" rx="1" />

          {/* Overflow water spilling */}
          <ellipse cx="45" cy="135" rx="8" ry="4" fill="#60a5fa" opacity="0.5" />
          <ellipse cx="195" cy="137" rx="10" ry="5" fill="#60a5fa" opacity="0.5" />
          <ellipse cx="50" cy="150" rx="15" ry="6" fill="#60a5fa" opacity="0.4" />
          <ellipse cx="190" cy="155" rx="18" ry="7" fill="#60a5fa" opacity="0.4" />

          {/* Clogged drain line */}
          <rect x="115" y="130" width="10" height="50" fill="#64748b" />

          {/* Clog indicator */}
          <rect x="112" y="150" width="16" height="12" fill="#7f1d1d" rx="2" />
          <text x="120" y="159" fontSize="6" fill="white" textAnchor="middle">CLOG</text>

          {/* Problem indicators */}
          <text x="120" y="195" fontSize="8" fill="#b91c1c" textAnchor="middle" fontWeight="bold">
            Causes water damage!
          </text>

          {/* Common clog causes */}
          <text x="120" y="210" fontSize="7" fill={SVG_COLORS.textLight} textAnchor="middle">
            Causes: algae, debris, improper slope
          </text>
        </g>

        {/* Bottom maintenance tip */}
        <g transform="translate(120, 280)">
          <text x="180" y="0" fontSize="9" fill={SVG_COLORS.textLight} textAnchor="middle">
            Prevention: Flush drain line with vinegar every 3 months; ensure proper slope toward outlet
          </text>
        </g>
      </svg>
    </div>
  );
}
