'use client';

import { SVG_COLORS } from '../../calculators/CalculatorSVG';

/**
 * Illustration showing how hot water recirculation pumps work
 */
export default function RecirculationPumpSVG() {
  return (
    <div className="w-full bg-slate-50 border border-slate-200 rounded-lg overflow-hidden">
      <svg
        viewBox="0 0 600 300"
        className="w-full h-auto"
        preserveAspectRatio="xMidYMid meet"
        role="img"
        aria-label="Hot water recirculation pump diagram"
      >
        <rect width="600" height="300" fill="#f8fafc" />

        <text x="300" y="25" fontSize="14" fontWeight="bold" fill={SVG_COLORS.text} textAnchor="middle">
          Hot Water Recirculation Pump — How It Works
        </text>

        {/* System diagram */}
        <g transform="translate(50, 50)">
          {/* Water heater */}
          <rect x="0" y="40" width="60" height="100" fill="#f97316" rx="4" />
          <text x="30" y="80" fontSize="8" fill="white" textAnchor="middle" fontWeight="bold">WATER</text>
          <text x="30" y="92" fontSize="8" fill="white" textAnchor="middle" fontWeight="bold">HEATER</text>

          {/* Hot water line (top) */}
          <line x1="60" y1="60" x2="400" y2="60" stroke="#ef4444" strokeWidth="6" />
          <text x="230" y="50" fontSize="8" fill="#ef4444" textAnchor="middle">Hot Water Supply →</text>

          {/* Faucet */}
          <g transform="translate(400, 40)">
            <rect x="0" y="0" width="40" height="40" fill="#64748b" rx="4" />
            <circle cx="20" cy="20" r="8" fill="#475569" />
            <text x="20" y="55" fontSize="8" fill={SVG_COLORS.textLight} textAnchor="middle">Faucet</text>
          </g>

          {/* Return line (bottom) - with recirc pump */}
          <line x1="60" y1="140" x2="200" y2="140" stroke="#3b82f6" strokeWidth="6" />
          <line x1="280" y1="140" x2="400" y2="140" stroke="#3b82f6" strokeWidth="6" />

          {/* Vertical connections */}
          <line x1="400" y1="60" x2="400" y2="140" stroke="#3b82f6" strokeWidth="6" />

          {/* Recirculation pump */}
          <g transform="translate(200, 120)">
            <circle cx="40" cy="20" r="25" fill="#15803d" stroke="#166534" strokeWidth="2" />
            <text x="40" y="16" fontSize="7" fill="white" textAnchor="middle" fontWeight="bold">RECIRC</text>
            <text x="40" y="26" fontSize="7" fill="white" textAnchor="middle" fontWeight="bold">PUMP</text>
          </g>

          {/* Cold return label */}
          <text x="330" y="155" fontSize="8" fill="#3b82f6" textAnchor="middle">← Cooled Water Returns</text>

          {/* Flow arrows */}
          <polygon points="180,60 190,55 190,65" fill="#ef4444" />
          <polygon points="320,60 330,55 330,65" fill="#ef4444" />
          <polygon points="120,140 110,135 110,145" fill="#3b82f6" />
        </g>

        {/* Benefits */}
        <g transform="translate(50, 210)">
          <text x="0" y="0" fontSize="11" fontWeight="bold" fill={SVG_COLORS.text}>Benefits:</text>

          <g transform="translate(0, 15)">
            <rect x="0" y="0" width="160" height="55" rx="4" fill="#dcfce7" stroke="#15803d" strokeWidth="1" />
            <text x="80" y="18" fontSize="9" fontWeight="bold" fill="#15803d" textAnchor="middle">Instant Hot Water</text>
            <text x="80" y="34" fontSize="8" fill={SVG_COLORS.textLight} textAnchor="middle">No waiting for hot water</text>
            <text x="80" y="46" fontSize="8" fill={SVG_COLORS.textLight} textAnchor="middle">at distant faucets</text>
          </g>

          <g transform="translate(170, 15)">
            <rect x="0" y="0" width="160" height="55" rx="4" fill="#dbeafe" stroke={SVG_COLORS.cold} strokeWidth="1" />
            <text x="80" y="18" fontSize="9" fontWeight="bold" fill={SVG_COLORS.cold} textAnchor="middle">Water Savings</text>
            <text x="80" y="34" fontSize="8" fill={SVG_COLORS.textLight} textAnchor="middle">Save 12,000+ gallons/year</text>
            <text x="80" y="46" fontSize="8" fill={SVG_COLORS.textLight} textAnchor="middle">no running tap waste</text>
          </g>

          <g transform="translate(340, 15)">
            <rect x="0" y="0" width="160" height="55" rx="4" fill="#fef3c7" stroke="#d97706" strokeWidth="1" />
            <text x="80" y="18" fontSize="9" fontWeight="bold" fill="#d97706" textAnchor="middle">Consider</text>
            <text x="80" y="34" fontSize="8" fill={SVG_COLORS.textLight} textAnchor="middle">Timer or demand pump</text>
            <text x="80" y="46" fontSize="8" fill={SVG_COLORS.textLight} textAnchor="middle">to minimize energy use</text>
          </g>
        </g>

        {/* Bottom note */}
        <g transform="translate(100, 288)">
          <text x="200" y="0" fontSize="8" fill={SVG_COLORS.textLight} textAnchor="middle">
            Cost: $200-600 installed • Energy: $20-50/year • Best for: homes with distant bathrooms
          </text>
        </g>
      </svg>
    </div>
  );
}
