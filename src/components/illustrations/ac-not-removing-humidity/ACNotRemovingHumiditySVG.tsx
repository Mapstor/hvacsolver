'use client';

import { SVG_COLORS } from '../../calculators/CalculatorSVG';

/**
 * Illustration showing why AC might not remove humidity
 */
export default function ACNotRemovingHumiditySVG() {
  return (
    <div className="w-full bg-slate-50 border border-slate-200 rounded-lg overflow-hidden">
      <svg
        viewBox="0 0 600 340"
        className="w-full h-auto"
        preserveAspectRatio="xMidYMid meet"
        role="img"
        aria-label="Why AC is not removing humidity diagram"
      >
        <rect width="600" height="340" fill="#f8fafc" />

        <text x="300" y="25" fontSize="14" fontWeight="bold" fill={SVG_COLORS.text} textAnchor="middle">
          Why Your AC Isn&apos;t Removing Humidity
        </text>

        {/* How AC dehumidifies - left side */}
        <g transform="translate(30, 50)">
          <rect x="0" y="0" width="250" height="120" rx="6" fill="white" stroke={SVG_COLORS.cold} strokeWidth="2" />
          <rect x="0" y="0" width="250" height="25" rx="6" fill={SVG_COLORS.cold} />
          <rect x="0" y="20" width="250" height="5" fill={SVG_COLORS.cold} />
          <text x="125" y="17" fontSize="10" fontWeight="bold" fill="white" textAnchor="middle">How AC Removes Humidity</text>

          {/* Evaporator coil */}
          <rect x="20" y="45" width="60" height="50" fill="#dbeafe" stroke={SVG_COLORS.cold} strokeWidth="1" rx="2" />
          <text x="50" y="65" fontSize="7" fill={SVG_COLORS.text} textAnchor="middle">Cold</text>
          <text x="50" y="75" fontSize="7" fill={SVG_COLORS.text} textAnchor="middle">Coil</text>

          {/* Humid air in */}
          <text x="15" y="42" fontSize="7" fill={SVG_COLORS.textLight}>Humid air</text>
          <path d="M 5,55 L 20,70" stroke="#60a5fa" strokeWidth="1.5" />
          <circle cx="8" cy="58" r="3" fill="#60a5fa" opacity="0.5" />
          <circle cx="12" cy="62" r="2" fill="#60a5fa" opacity="0.5" />

          {/* Water droplets forming */}
          <ellipse cx="85" cy="65" rx="2" ry="4" fill="#60a5fa" />
          <ellipse cx="85" cy="80" rx="2" ry="4" fill="#60a5fa" />
          <ellipse cx="85" cy="95" rx="2" ry="4" fill="#60a5fa" />

          {/* Arrow to drain */}
          <path d="M 90,95 L 110,105" stroke={SVG_COLORS.stroke} strokeWidth="1" />
          <text x="120" y="110" fontSize="7" fill={SVG_COLORS.textLight}>To drain</text>

          {/* Dry air out */}
          <path d="M 80,55 L 130,55" stroke="#94a3b8" strokeWidth="1.5" />
          <polygon points="130,55 125,52 125,58" fill="#94a3b8" />
          <text x="160" y="58" fontSize="7" fill={SVG_COLORS.textLight}>Dry, cool air</text>

          {/* Key requirement */}
          <text x="180" y="85" fontSize="8" fill={SVG_COLORS.text} fontWeight="bold">Key: Air must stay</text>
          <text x="180" y="97" fontSize="8" fill={SVG_COLORS.text} fontWeight="bold">on coil long enough</text>
        </g>

        {/* Common problems - right side */}
        <g transform="translate(310, 50)">
          <text x="0" y="0" fontSize="11" fontWeight="bold" fill={SVG_COLORS.text}>Common Causes:</text>

          {/* Problem 1 */}
          <g transform="translate(0, 15)">
            <rect x="0" y="0" width="260" height="40" rx="4" fill="white" stroke="#d97706" strokeWidth="1.5" />
            <circle cx="20" cy="20" r="12" fill="#fef3c7" />
            <text x="20" y="25" fontSize="12" fill="#d97706" textAnchor="middle" fontWeight="bold">1</text>
            <text x="40" y="16" fontSize="9" fontWeight="bold" fill={SVG_COLORS.text}>Oversized AC</text>
            <text x="40" y="30" fontSize="7" fill={SVG_COLORS.textLight}>Cools too fast, shuts off before dehumidifying</text>
          </g>

          {/* Problem 2 */}
          <g transform="translate(0, 62)">
            <rect x="0" y="0" width="260" height="40" rx="4" fill="white" stroke="#d97706" strokeWidth="1.5" />
            <circle cx="20" cy="20" r="12" fill="#fef3c7" />
            <text x="20" y="25" fontSize="12" fill="#d97706" textAnchor="middle" fontWeight="bold">2</text>
            <text x="40" y="16" fontSize="9" fontWeight="bold" fill={SVG_COLORS.text}>Fan Set to ON (not AUTO)</text>
            <text x="40" y="30" fontSize="7" fill={SVG_COLORS.textLight}>Moisture re-evaporates from coil back into air</text>
          </g>

          {/* Problem 3 */}
          <g transform="translate(0, 109)">
            <rect x="0" y="0" width="260" height="40" rx="4" fill="white" stroke="#d97706" strokeWidth="1.5" />
            <circle cx="20" cy="20" r="12" fill="#fef3c7" />
            <text x="20" y="25" fontSize="12" fill="#d97706" textAnchor="middle" fontWeight="bold">3</text>
            <text x="40" y="16" fontSize="9" fontWeight="bold" fill={SVG_COLORS.text}>Low Refrigerant</text>
            <text x="40" y="30" fontSize="7" fill={SVG_COLORS.textLight}>Coil not cold enough to condense moisture</text>
          </g>
        </g>

        {/* Ideal humidity range */}
        <g transform="translate(30, 215)">
          <rect x="0" y="0" width="250" height="85" rx="6" fill="white" stroke={SVG_COLORS.stroke} strokeWidth="1.5" />
          <text x="125" y="20" fontSize="10" fontWeight="bold" fill={SVG_COLORS.text} textAnchor="middle">Target Indoor Humidity</text>

          {/* Humidity scale */}
          <rect x="20" y="35" width="210" height="20" fill="#f1f5f9" rx="4" />
          <rect x="80" y="35" width="90" height="20" fill="#dcfce7" rx="0" />

          <text x="30" y="48" fontSize="8" fill="#b91c1c">30%</text>
          <text x="115" y="48" fontSize="8" fill="#15803d" fontWeight="bold">40-50%</text>
          <text x="195" y="48" fontSize="8" fill="#b91c1c">60%+</text>

          <text x="50" y="70" fontSize="7" fill={SVG_COLORS.textLight}>Too dry</text>
          <text x="115" y="70" fontSize="7" fill="#15803d" textAnchor="middle">Ideal</text>
          <text x="185" y="70" fontSize="7" fill={SVG_COLORS.textLight}>Muggy</text>
        </g>

        {/* Solutions */}
        <g transform="translate(310, 215)">
          <rect x="0" y="0" width="260" height="95" rx="6" fill="#dcfce7" stroke="#15803d" strokeWidth="1.5" />
          <text x="130" y="20" fontSize="10" fontWeight="bold" fill="#15803d" textAnchor="middle">Solutions</text>
          <text x="20" y="40" fontSize="8" fill={SVG_COLORS.text}>• Set fan to AUTO, not ON</text>
          <text x="20" y="56" fontSize="8" fill={SVG_COLORS.text}>• Lower thermostat 2-3°F (longer run cycles)</text>
          <text x="20" y="72" fontSize="8" fill={SVG_COLORS.text}>• Add a whole-house dehumidifier</text>
          <text x="20" y="88" fontSize="8" fill={SVG_COLORS.text}>• Check refrigerant charge</text>
        </g>
      </svg>
    </div>
  );
}
