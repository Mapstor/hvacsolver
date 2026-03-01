'use client';

import { SVG_COLORS } from '../../calculators/CalculatorSVG';

/**
 * Illustration showing how to drain a portable AC
 */
export default function DrainPortableACSVG() {
  return (
    <div className="w-full bg-slate-50 border border-slate-200 rounded-lg overflow-hidden">
      <svg
        viewBox="0 0 600 340"
        className="w-full h-auto"
        preserveAspectRatio="xMidYMid meet"
        role="img"
        aria-label="Three methods for draining a portable AC"
      >
        <rect width="600" height="340" fill="#f8fafc" />

        <text x="300" y="25" fontSize="14" fontWeight="bold" fill={SVG_COLORS.text} textAnchor="middle">
          3 Ways to Drain Your Portable AC
        </text>

        {/* Method 1 - Manual drain */}
        <g transform="translate(30, 50)">
          <rect x="0" y="0" width="170" height="210" rx="6" fill="white" stroke={SVG_COLORS.cold} strokeWidth="2" />
          <rect x="0" y="0" width="170" height="30" rx="6" fill={SVG_COLORS.cold} />
          <rect x="0" y="25" width="170" height="5" fill={SVG_COLORS.cold} />
          <text x="85" y="20" fontSize="10" fontWeight="bold" fill="white" textAnchor="middle">1. Manual Drain</text>

          {/* Portable AC unit */}
          <rect x="50" y="50" width="70" height="90" rx="4" fill="#64748b" />
          <rect x="55" y="55" width="60" height="40" fill="#475569" rx="2" />

          {/* Drain plug at bottom */}
          <circle cx="85" cy="135" r="8" fill="#fef3c7" stroke="#d97706" strokeWidth="2" />
          <text x="85" y="138" fontSize="6" fill="#d97706" textAnchor="middle">PLUG</text>

          {/* Bucket */}
          <path d="M 65,160 L 60,195 L 110,195 L 105,160 Z" fill="#94a3b8" stroke={SVG_COLORS.stroke} strokeWidth="1" />
          <ellipse cx="85" cy="180" rx="20" ry="5" fill="#60a5fa" opacity="0.5" />

          <text x="85" y="170" fontSize="7" fill={SVG_COLORS.textLight} textAnchor="middle">Bucket</text>

          <text x="85" y="220" fontSize="8" fill={SVG_COLORS.textLight} textAnchor="middle">Remove plug,</text>
          <text x="85" y="232" fontSize="8" fill={SVG_COLORS.textLight} textAnchor="middle">drain into bucket</text>
          <text x="85" y="248" fontSize="7" fill="#d97706" textAnchor="middle">Every 1-8 hours</text>
        </g>

        {/* Method 2 - Continuous drain */}
        <g transform="translate(215, 50)">
          <rect x="0" y="0" width="170" height="210" rx="6" fill="white" stroke="#15803d" strokeWidth="2" />
          <rect x="0" y="0" width="170" height="30" rx="6" fill="#15803d" />
          <rect x="0" y="25" width="170" height="5" fill="#15803d" />
          <text x="85" y="20" fontSize="10" fontWeight="bold" fill="white" textAnchor="middle">2. Continuous Drain</text>

          {/* Portable AC unit */}
          <rect x="50" y="50" width="70" height="90" rx="4" fill="#64748b" />
          <rect x="55" y="55" width="60" height="40" fill="#475569" rx="2" />

          {/* Drain hose connection */}
          <circle cx="85" cy="135" r="6" fill="#15803d" />

          {/* Hose going to floor drain */}
          <path d="M 85,141 Q 85,160 110,160 Q 135,160 135,180 L 135,195" stroke="#15803d" strokeWidth="4" fill="none" strokeLinecap="round" />

          {/* Floor drain */}
          <ellipse cx="135" cy="200" rx="15" ry="5" fill="#475569" />
          <ellipse cx="135" cy="200" rx="8" ry="3" fill="#1e293b" />

          <text x="150" y="175" fontSize="7" fill={SVG_COLORS.textLight}>Hose</text>
          <text x="135" y="215" fontSize="7" fill={SVG_COLORS.textLight} textAnchor="middle">Floor drain</text>

          <text x="85" y="235" fontSize="8" fill={SVG_COLORS.textLight} textAnchor="middle">Attach hose to drain</text>
          <text x="85" y="248" fontSize="7" fill="#15803d" textAnchor="middle">Best: No emptying needed!</text>
        </g>

        {/* Method 3 - Self-evaporating */}
        <g transform="translate(400, 50)">
          <rect x="0" y="0" width="170" height="210" rx="6" fill="white" stroke="#7c3aed" strokeWidth="2" />
          <rect x="0" y="0" width="170" height="30" rx="6" fill="#7c3aed" />
          <rect x="0" y="25" width="170" height="5" fill="#7c3aed" />
          <text x="85" y="20" fontSize="10" fontWeight="bold" fill="white" textAnchor="middle">3. Self-Evaporating</text>

          {/* Portable AC unit */}
          <rect x="50" y="50" width="70" height="90" rx="4" fill="#64748b" />
          <rect x="55" y="55" width="60" height="40" fill="#475569" rx="2" />

          {/* Exhaust hose */}
          <rect x="120" y="65" width="40" height="20" fill="#94a3b8" rx="4" />
          <text x="140" y="78" fontSize="6" fill={SVG_COLORS.textLight} textAnchor="middle">Exhaust</text>

          {/* Moisture arrows going out exhaust */}
          <circle cx="128" cy="85" r="3" fill="#60a5fa" opacity="0.5" />
          <circle cx="135" cy="90" r="2" fill="#60a5fa" opacity="0.4" />
          <circle cx="142" cy="87" r="2" fill="#60a5fa" opacity="0.4" />
          <path d="M 145,75 L 155,75" stroke="#60a5fa" strokeWidth="1" />
          <polygon points="155,75 152,73 152,77" fill="#60a5fa" />

          {/* Internal tank minimal */}
          <rect x="65" y="115" width="40" height="15" fill="#475569" rx="2" />
          <text x="85" y="125" fontSize="5" fill="#94a3b8" textAnchor="middle">MINI TANK</text>

          <text x="85" y="160" fontSize="8" fill={SVG_COLORS.textLight} textAnchor="middle">Evaporates moisture</text>
          <text x="85" y="172" fontSize="8" fill={SVG_COLORS.textLight} textAnchor="middle">out the exhaust</text>
          <text x="85" y="195" fontSize="7" fill="#7c3aed" textAnchor="middle">Drain only in high</text>
          <text x="85" y="207" fontSize="7" fill="#7c3aed" textAnchor="middle">humidity conditions</text>
        </g>

        {/* Recommendation */}
        <g transform="translate(100, 310)">
          <rect x="0" y="0" width="400" height="20" rx="4" fill={SVG_COLORS.accentLight} />
          <text x="200" y="14" fontSize="9" fill={SVG_COLORS.accent} textAnchor="middle" fontWeight="bold">
            Recommended: Continuous drain setup = no maintenance needed
          </text>
        </g>
      </svg>
    </div>
  );
}
