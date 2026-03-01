'use client';

import { SVG_COLORS } from '../../calculators/CalculatorSVG';

/**
 * Illustration showing standard thermostat wiring colors and terminals
 */
export default function ThermostatWiringSVG() {
  return (
    <div className="w-full bg-slate-50 border border-slate-200 rounded-lg overflow-hidden">
      <svg
        viewBox="0 0 600 320"
        className="w-full h-auto"
        preserveAspectRatio="xMidYMid meet"
        role="img"
        aria-label="Thermostat wiring color guide"
      >
        <rect width="600" height="320" fill="#f8fafc" />

        <text x="300" y="25" fontSize="14" fontWeight="bold" fill={SVG_COLORS.text} textAnchor="middle">
          Thermostat Wiring Color Guide
        </text>

        {/* Thermostat terminal block */}
        <g transform="translate(50, 50)">
          <rect x="0" y="0" width="180" height="200" fill="white" stroke={SVG_COLORS.stroke} strokeWidth="2" rx="8" />
          <text x="90" y="20" fontSize="10" fontWeight="bold" fill={SVG_COLORS.text} textAnchor="middle">Terminal Block</text>

          {/* Terminals */}
          {[
            { y: 40, label: 'R', color: '#ef4444' },
            { y: 60, label: 'Rc', color: '#ef4444' },
            { y: 80, label: 'Rh', color: '#ef4444' },
            { y: 100, label: 'C', color: '#3b82f6' },
            { y: 120, label: 'G', color: '#22c55e' },
            { y: 140, label: 'Y', color: '#eab308' },
            { y: 160, label: 'W', color: '#f8fafc' },
            { y: 180, label: 'O/B', color: '#f97316' },
          ].map((terminal) => (
            <g key={terminal.label} transform={`translate(20, ${terminal.y})`}>
              <rect x="0" y="0" width="30" height="16" fill="#e2e8f0" rx="2" />
              <text x="15" y="12" fontSize="9" fontWeight="bold" fill={SVG_COLORS.text} textAnchor="middle">
                {terminal.label}
              </text>
              <line x1="30" y1="8" x2="60" y2="8" stroke={terminal.color} strokeWidth="3" />
              <circle cx="65" cy="8" r="6" fill={terminal.color} stroke={terminal.label === 'W' ? '#94a3b8' : 'none'} strokeWidth="1" />
            </g>
          ))}
        </g>

        {/* Wire descriptions */}
        <g transform="translate(250, 50)">
          <text x="0" y="0" fontSize="10" fontWeight="bold" fill={SVG_COLORS.text}>Wire Functions:</text>

          {[
            { y: 20, wire: 'R (Red)', desc: '24V power from transformer', color: '#ef4444' },
            { y: 40, wire: 'Rc/Rh', desc: 'Cooling/Heating power (split systems)', color: '#ef4444' },
            { y: 60, wire: 'C (Blue)', desc: 'Common - completes 24V circuit', color: '#3b82f6' },
            { y: 80, wire: 'G (Green)', desc: 'Fan control', color: '#22c55e' },
            { y: 100, wire: 'Y (Yellow)', desc: 'Cooling/compressor call', color: '#eab308' },
            { y: 120, wire: 'W (White)', desc: 'Heating call (furnace/heat strips)', color: '#94a3b8' },
            { y: 140, wire: 'O/B (Orange)', desc: 'Heat pump reversing valve', color: '#f97316' },
          ].map((item) => (
            <g key={item.wire} transform={`translate(0, ${item.y})`}>
              <circle cx="8" cy="6" r="6" fill={item.color} stroke={item.color === '#94a3b8' ? '#94a3b8' : 'none'} strokeWidth="1" />
              <text x="22" y="10" fontSize="9" fontWeight="bold" fill={SVG_COLORS.text}>{item.wire}</text>
              <text x="100" y="10" fontSize="8" fill={SVG_COLORS.textLight}>{item.desc}</text>
            </g>
          ))}
        </g>

        {/* Common configurations */}
        <g transform="translate(50, 270)">
          <text x="0" y="0" fontSize="10" fontWeight="bold" fill={SVG_COLORS.text}>Common Configurations:</text>

          <g transform="translate(0, 15)">
            <rect x="0" y="0" width="160" height="25" rx="4" fill="#dcfce7" stroke="#15803d" strokeWidth="1" />
            <text x="80" y="11" fontSize="8" fontWeight="bold" fill="#15803d" textAnchor="middle">Heat Only</text>
            <text x="80" y="22" fontSize="7" fill={SVG_COLORS.textLight} textAnchor="middle">R, W, C (optional)</text>
          </g>

          <g transform="translate(170, 15)">
            <rect x="0" y="0" width="160" height="25" rx="4" fill="#dbeafe" stroke={SVG_COLORS.cold} strokeWidth="1" />
            <text x="80" y="11" fontSize="8" fontWeight="bold" fill={SVG_COLORS.cold} textAnchor="middle">Cool Only</text>
            <text x="80" y="22" fontSize="7" fill={SVG_COLORS.textLight} textAnchor="middle">R, Y, G, C</text>
          </g>

          <g transform="translate(340, 15)">
            <rect x="0" y="0" width="160" height="25" rx="4" fill="#fef3c7" stroke="#d97706" strokeWidth="1" />
            <text x="80" y="11" fontSize="8" fontWeight="bold" fill="#d97706" textAnchor="middle">Heat Pump</text>
            <text x="80" y="22" fontSize="7" fill={SVG_COLORS.textLight} textAnchor="middle">R, Y, G, C, O/B, W (aux)</text>
          </g>
        </g>

        {/* Warning */}
        <g transform="translate(250, 215)">
          <rect x="0" y="0" width="300" height="40" rx="4" fill="#fef2f2" stroke="#b91c1c" strokeWidth="1" />
          <text x="150" y="16" fontSize="9" fontWeight="bold" fill="#b91c1c" textAnchor="middle">
            Safety Warning
          </text>
          <text x="150" y="32" fontSize="8" fill={SVG_COLORS.textLight} textAnchor="middle">
            Always turn off power before working with thermostat wiring
          </text>
        </g>
      </svg>
    </div>
  );
}
