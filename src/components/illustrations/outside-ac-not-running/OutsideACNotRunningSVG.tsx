'use client';

import { SVG_COLORS } from '../../calculators/CalculatorSVG';

/**
 * Illustration showing troubleshooting steps when outside AC unit is not running
 */
export default function OutsideACNotRunningSVG() {
  return (
    <div className="w-full bg-slate-50 border border-slate-200 rounded-lg overflow-hidden">
      <svg
        viewBox="0 0 600 330"
        className="w-full h-auto"
        preserveAspectRatio="xMidYMid meet"
        role="img"
        aria-label="Outside AC not running troubleshooting diagram"
      >
        <rect width="600" height="330" fill="#f8fafc" />

        <text x="300" y="25" fontSize="14" fontWeight="bold" fill={SVG_COLORS.text} textAnchor="middle">
          Outside AC Unit Not Running — Troubleshooting
        </text>

        {/* AC unit illustration */}
        <g transform="translate(50, 50)">
          <rect x="0" y="0" width="120" height="140" fill="#64748b" rx="4" />
          <rect x="10" y="10" width="100" height="100" fill="#475569" rx="2" />
          {/* Fan that's not spinning */}
          <circle cx="60" cy="60" r="35" fill="#334155" stroke="#94a3b8" strokeWidth="2" />
          <line x1="60" y1="25" x2="60" y2="95" stroke="#94a3b8" strokeWidth="3" />
          <line x1="25" y1="60" x2="95" y2="60" stroke="#94a3b8" strokeWidth="3" />
          {/* X mark */}
          <circle cx="60" cy="60" r="20" fill="#fecaca" opacity="0.8" />
          <text x="60" y="66" fontSize="20" fill="#b91c1c" textAnchor="middle" fontWeight="bold">✕</text>

          <text x="60" y="130" fontSize="8" fill="#94a3b8" textAnchor="middle">CONDENSER</text>
          <text x="60" y="155" fontSize="10" fill="#b91c1c" textAnchor="middle" fontWeight="bold">NOT RUNNING</text>
        </g>

        {/* Troubleshooting steps */}
        <g transform="translate(200, 45)">
          <text x="0" y="0" fontSize="11" fontWeight="bold" fill={SVG_COLORS.text}>Check These First (DIY):</text>

          <g transform="translate(0, 15)">
            <rect x="0" y="0" width="175" height="50" rx="4" fill="#dcfce7" stroke="#15803d" strokeWidth="1" />
            <text x="10" y="18" fontSize="9" fontWeight="bold" fill="#15803d">1. Thermostat</text>
            <text x="10" y="32" fontSize="8" fill={SVG_COLORS.textLight}>Set to COOL, lower than room</text>
            <text x="10" y="44" fontSize="8" fill={SVG_COLORS.textLight}>temp, fan on AUTO</text>
          </g>

          <g transform="translate(185, 15)">
            <rect x="0" y="0" width="175" height="50" rx="4" fill="#dcfce7" stroke="#15803d" strokeWidth="1" />
            <text x="10" y="18" fontSize="9" fontWeight="bold" fill="#15803d">2. Circuit Breaker</text>
            <text x="10" y="32" fontSize="8" fill={SVG_COLORS.textLight}>Check both indoor and</text>
            <text x="10" y="44" fontSize="8" fill={SVG_COLORS.textLight}>outdoor unit breakers</text>
          </g>

          <g transform="translate(0, 75)">
            <rect x="0" y="0" width="175" height="50" rx="4" fill="#dcfce7" stroke="#15803d" strokeWidth="1" />
            <text x="10" y="18" fontSize="9" fontWeight="bold" fill="#15803d">3. Disconnect Switch</text>
            <text x="10" y="32" fontSize="8" fill={SVG_COLORS.textLight}>Box near outdoor unit</text>
            <text x="10" y="44" fontSize="8" fill={SVG_COLORS.textLight}>should be in ON position</text>
          </g>

          <g transform="translate(185, 75)">
            <rect x="0" y="0" width="175" height="50" rx="4" fill="#dcfce7" stroke="#15803d" strokeWidth="1" />
            <text x="10" y="18" fontSize="9" fontWeight="bold" fill="#15803d">4. Air Filter</text>
            <text x="10" y="32" fontSize="8" fill={SVG_COLORS.textLight}>Clogged filter can cause</text>
            <text x="10" y="44" fontSize="8" fill={SVG_COLORS.textLight}>safety shutdown</text>
          </g>
        </g>

        {/* Professional repairs */}
        <g transform="translate(50, 230)">
          <text x="0" y="0" fontSize="11" fontWeight="bold" fill={SVG_COLORS.text}>May Need Technician:</text>

          <g transform="translate(0, 15)">
            <rect x="0" y="0" width="110" height="55" rx="4" fill="#fef2f2" stroke="#b91c1c" strokeWidth="1" />
            <text x="55" y="18" fontSize="8" fontWeight="bold" fill="#b91c1c" textAnchor="middle">Capacitor</text>
            <text x="55" y="32" fontSize="7" fill={SVG_COLORS.textLight} textAnchor="middle">Buzzing sound,</text>
            <text x="55" y="44" fontSize="7" fill={SVG_COLORS.textLight} textAnchor="middle">won&apos;t start</text>
          </g>

          <g transform="translate(120, 15)">
            <rect x="0" y="0" width="110" height="55" rx="4" fill="#fef2f2" stroke="#b91c1c" strokeWidth="1" />
            <text x="55" y="18" fontSize="8" fontWeight="bold" fill="#b91c1c" textAnchor="middle">Contactor</text>
            <text x="55" y="32" fontSize="7" fill={SVG_COLORS.textLight} textAnchor="middle">Clicking but</text>
            <text x="55" y="44" fontSize="7" fill={SVG_COLORS.textLight} textAnchor="middle">no start</text>
          </g>

          <g transform="translate(240, 15)">
            <rect x="0" y="0" width="110" height="55" rx="4" fill="#fef2f2" stroke="#b91c1c" strokeWidth="1" />
            <text x="55" y="18" fontSize="8" fontWeight="bold" fill="#b91c1c" textAnchor="middle">Fan Motor</text>
            <text x="55" y="32" fontSize="7" fill={SVG_COLORS.textLight} textAnchor="middle">Compressor runs,</text>
            <text x="55" y="44" fontSize="7" fill={SVG_COLORS.textLight} textAnchor="middle">fan doesn&apos;t</text>
          </g>

          <g transform="translate(360, 15)">
            <rect x="0" y="0" width="110" height="55" rx="4" fill="#fef2f2" stroke="#b91c1c" strokeWidth="1" />
            <text x="55" y="18" fontSize="8" fontWeight="bold" fill="#b91c1c" textAnchor="middle">Compressor</text>
            <text x="55" y="32" fontSize="7" fill={SVG_COLORS.textLight} textAnchor="middle">No sound at all,</text>
            <text x="55" y="44" fontSize="7" fill={SVG_COLORS.textLight} textAnchor="middle">major repair</text>
          </g>

          <g transform="translate(480, 15)">
            <rect x="0" y="0" width="70" height="55" rx="4" fill="#fef2f2" stroke="#b91c1c" strokeWidth="1" />
            <text x="35" y="18" fontSize="8" fontWeight="bold" fill="#b91c1c" textAnchor="middle">Low</text>
            <text x="35" y="30" fontSize="8" fontWeight="bold" fill="#b91c1c" textAnchor="middle">Refrigerant</text>
            <text x="35" y="44" fontSize="7" fill={SVG_COLORS.textLight} textAnchor="middle">Safety off</text>
          </g>
        </g>

        {/* Bottom tip */}
        <g transform="translate(100, 315)">
          <text x="200" y="0" fontSize="8" fill={SVG_COLORS.textLight} textAnchor="middle">
            Wait 5 minutes before resetting breaker • Repeated trips = call technician
          </text>
        </g>
      </svg>
    </div>
  );
}
