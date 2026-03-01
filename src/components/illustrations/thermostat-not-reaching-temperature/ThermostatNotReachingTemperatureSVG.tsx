'use client';

import { SVG_COLORS } from '../../calculators/CalculatorSVG';

/**
 * Illustration showing troubleshooting when thermostat won't reach set temperature
 */
export default function ThermostatNotReachingTemperatureSVG() {
  return (
    <div className="w-full bg-slate-50 border border-slate-200 rounded-lg overflow-hidden">
      <svg
        viewBox="0 0 600 330"
        className="w-full h-auto"
        preserveAspectRatio="xMidYMid meet"
        role="img"
        aria-label="Thermostat not reaching temperature troubleshooting"
      >
        <rect width="600" height="330" fill="#f8fafc" />

        <text x="300" y="25" fontSize="14" fontWeight="bold" fill={SVG_COLORS.text} textAnchor="middle">
          Thermostat Not Reaching Set Temperature
        </text>

        {/* Thermostat illustration */}
        <g transform="translate(50, 50)">
          <rect x="0" y="0" width="100" height="120" fill="white" stroke={SVG_COLORS.stroke} strokeWidth="2" rx="8" />
          <circle cx="50" cy="45" r="30" fill="#f1f5f9" stroke={SVG_COLORS.stroke} strokeWidth="1" />

          {/* Set temp */}
          <text x="50" y="40" fontSize="8" fill={SVG_COLORS.textLight} textAnchor="middle">SET</text>
          <text x="50" y="55" fontSize="14" fontWeight="bold" fill="#15803d" textAnchor="middle">72°F</text>

          {/* Current temp */}
          <text x="50" y="90" fontSize="8" fill={SVG_COLORS.textLight} textAnchor="middle">CURRENT</text>
          <text x="50" y="108" fontSize="14" fontWeight="bold" fill="#b91c1c" textAnchor="middle">68°F</text>

          {/* Warning */}
          <circle cx="85" cy="20" r="10" fill="#fecaca" />
          <text x="85" y="24" fontSize="12" fill="#b91c1c" textAnchor="middle" fontWeight="bold">!</text>

          <text x="50" y="140" fontSize="8" fill="#b91c1c" textAnchor="middle" fontWeight="bold">4°F DIFFERENCE</text>
        </g>

        {/* Common causes */}
        <g transform="translate(180, 45)">
          <text x="0" y="0" fontSize="11" fontWeight="bold" fill={SVG_COLORS.text}>Common Causes:</text>

          <g transform="translate(0, 15)">
            <rect x="0" y="0" width="190" height="45" rx="4" fill="#dcfce7" stroke="#15803d" strokeWidth="1" />
            <text x="10" y="18" fontSize="9" fontWeight="bold" fill="#15803d">DIY Fixes</text>
            <text x="10" y="32" fontSize="7" fill={SVG_COLORS.textLight}>• Dirty air filter (replace it)</text>
            <text x="10" y="42" fontSize="7" fill={SVG_COLORS.textLight}>• Blocked vents (open all vents)</text>
          </g>

          <g transform="translate(200, 15)">
            <rect x="0" y="0" width="190" height="45" rx="4" fill="#fef3c7" stroke="#d97706" strokeWidth="1" />
            <text x="10" y="18" fontSize="9" fontWeight="bold" fill="#d97706">System Issues</text>
            <text x="10" y="32" fontSize="7" fill={SVG_COLORS.textLight}>• Low refrigerant charge</text>
            <text x="10" y="42" fontSize="7" fill={SVG_COLORS.textLight}>• Dirty evaporator coil</text>
          </g>

          <g transform="translate(0, 70)">
            <rect x="0" y="0" width="190" height="45" rx="4" fill="#fef2f2" stroke="#b91c1c" strokeWidth="1" />
            <text x="10" y="18" fontSize="9" fontWeight="bold" fill="#b91c1c">Sizing Problems</text>
            <text x="10" y="32" fontSize="7" fill={SVG_COLORS.textLight}>• Undersized HVAC system</text>
            <text x="10" y="42" fontSize="7" fill={SVG_COLORS.textLight}>• Poor insulation/duct leaks</text>
          </g>

          <g transform="translate(200, 70)">
            <rect x="0" y="0" width="190" height="45" rx="4" fill="#dbeafe" stroke={SVG_COLORS.cold} strokeWidth="1" />
            <text x="10" y="18" fontSize="9" fontWeight="bold" fill={SVG_COLORS.cold}>Thermostat Issues</text>
            <text x="10" y="32" fontSize="7" fill={SVG_COLORS.textLight}>• Bad location (drafty/sunny)</text>
            <text x="10" y="42" fontSize="7" fill={SVG_COLORS.textLight}>• Needs calibration</text>
          </g>
        </g>

        {/* Troubleshooting steps */}
        <g transform="translate(50, 210)">
          <text x="0" y="0" fontSize="11" fontWeight="bold" fill={SVG_COLORS.text}>Troubleshooting Steps:</text>

          <g transform="translate(0, 18)">
            <circle cx="12" cy="12" r="12" fill={SVG_COLORS.cold} />
            <text x="12" y="16" fontSize="10" fill="white" textAnchor="middle" fontWeight="bold">1</text>
            <text x="35" y="16" fontSize="9" fill={SVG_COLORS.text}>Check and replace air filter</text>
          </g>

          <g transform="translate(180, 18)">
            <circle cx="12" cy="12" r="12" fill={SVG_COLORS.cold} />
            <text x="12" y="16" fontSize="10" fill="white" textAnchor="middle" fontWeight="bold">2</text>
            <text x="35" y="16" fontSize="9" fill={SVG_COLORS.text}>Ensure all vents are open</text>
          </g>

          <g transform="translate(360, 18)">
            <circle cx="12" cy="12" r="12" fill={SVG_COLORS.cold} />
            <text x="12" y="16" fontSize="10" fill="white" textAnchor="middle" fontWeight="bold">3</text>
            <text x="35" y="16" fontSize="9" fill={SVG_COLORS.text}>Check outdoor unit running</text>
          </g>

          <g transform="translate(0, 50)">
            <circle cx="12" cy="12" r="12" fill={SVG_COLORS.cold} />
            <text x="12" y="16" fontSize="10" fill="white" textAnchor="middle" fontWeight="bold">4</text>
            <text x="35" y="16" fontSize="9" fill={SVG_COLORS.text}>Verify thermostat location</text>
          </g>

          <g transform="translate(180, 50)">
            <circle cx="12" cy="12" r="12" fill={SVG_COLORS.cold} />
            <text x="12" y="16" fontSize="10" fill="white" textAnchor="middle" fontWeight="bold">5</text>
            <text x="35" y="16" fontSize="9" fill={SVG_COLORS.text}>Check for frozen coils</text>
          </g>

          <g transform="translate(360, 50)">
            <circle cx="12" cy="12" r="12" fill="#d97706" />
            <text x="12" y="16" fontSize="10" fill="white" textAnchor="middle" fontWeight="bold">6</text>
            <text x="35" y="16" fontSize="9" fill={SVG_COLORS.text}>Call HVAC technician</text>
          </g>
        </g>

        {/* Bottom note */}
        <g transform="translate(100, 315)">
          <text x="200" y="0" fontSize="8" fill={SVG_COLORS.textLight} textAnchor="middle">
            Normal: System reaches temp within 1 hour • Persistent 3°F+ gap = potential problem
          </text>
        </g>
      </svg>
    </div>
  );
}
