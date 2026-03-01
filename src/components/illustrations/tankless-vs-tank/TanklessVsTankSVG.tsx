'use client';

import { SVG_COLORS } from '../../calculators/CalculatorSVG';

/**
 * Illustration comparing tankless vs tank water heaters
 */
export default function TanklessVsTankSVG() {
  return (
    <div className="w-full bg-slate-50 border border-slate-200 rounded-lg overflow-hidden">
      <svg
        viewBox="0 0 600 320"
        className="w-full h-auto"
        preserveAspectRatio="xMidYMid meet"
        role="img"
        aria-label="Tankless vs tank water heater comparison"
      >
        <rect width="600" height="320" fill="#f8fafc" />

        <text x="300" y="25" fontSize="14" fontWeight="bold" fill={SVG_COLORS.text} textAnchor="middle">
          Tankless vs Tank Water Heater Comparison
        </text>

        {/* Tank water heater */}
        <g transform="translate(50, 50)">
          <rect x="0" y="0" width="230" height="230" rx="8" fill="white" stroke={SVG_COLORS.cold} strokeWidth="2" />
          <rect x="0" y="0" width="230" height="35" rx="8" fill={SVG_COLORS.cold} />
          <rect x="0" y="28" width="230" height="7" fill={SVG_COLORS.cold} />
          <text x="115" y="25" fontSize="12" fontWeight="bold" fill="white" textAnchor="middle">Tank Water Heater</text>

          {/* Tank illustration */}
          <g transform="translate(30, 50)">
            <rect x="0" y="0" width="50" height="90" fill="#64748b" rx="4" />
            <rect x="5" y="10" width="40" height="70" fill="#3b82f6" rx="2" />
            <text x="25" y="50" fontSize="7" fill="white" textAnchor="middle">TANK</text>
          </g>

          {/* Specs */}
          <g transform="translate(95, 50)">
            <text x="0" y="12" fontSize="8" fill={SVG_COLORS.text} fontWeight="bold">Upfront Cost:</text>
            <text x="80" y="12" fontSize="8" fill="#15803d">$800-1,500</text>

            <text x="0" y="30" fontSize="8" fill={SVG_COLORS.text} fontWeight="bold">Lifespan:</text>
            <text x="80" y="30" fontSize="8" fill={SVG_COLORS.textLight}>8-12 years</text>

            <text x="0" y="48" fontSize="8" fill={SVG_COLORS.text} fontWeight="bold">Energy Use:</text>
            <text x="80" y="48" fontSize="8" fill="#b91c1c">Higher (standby loss)</text>

            <text x="0" y="66" fontSize="8" fill={SVG_COLORS.text} fontWeight="bold">Space:</text>
            <text x="80" y="66" fontSize="8" fill={SVG_COLORS.textLight}>Large footprint</text>

            <text x="0" y="84" fontSize="8" fill={SVG_COLORS.text} fontWeight="bold">Hot Water:</text>
            <text x="80" y="84" fontSize="8" fill={SVG_COLORS.textLight}>Can run out</text>
          </g>

          {/* Pros/Cons */}
          <g transform="translate(15, 150)">
            <text x="0" y="0" fontSize="8" fontWeight="bold" fill="#15803d">✓ Lower upfront cost</text>
            <text x="0" y="14" fontSize="8" fontWeight="bold" fill="#15803d">✓ Simple installation</text>
            <text x="0" y="28" fontSize="8" fontWeight="bold" fill="#15803d">✓ Easy maintenance</text>
            <text x="0" y="48" fontSize="8" fontWeight="bold" fill="#b91c1c">✗ Higher energy bills</text>
            <text x="0" y="62" fontSize="8" fontWeight="bold" fill="#b91c1c">✗ Limited hot water</text>
          </g>
        </g>

        {/* Tankless water heater */}
        <g transform="translate(320, 50)">
          <rect x="0" y="0" width="230" height="230" rx="8" fill="white" stroke="#15803d" strokeWidth="2" />
          <rect x="0" y="0" width="230" height="35" rx="8" fill="#15803d" />
          <rect x="0" y="28" width="230" height="7" fill="#15803d" />
          <text x="115" y="25" fontSize="12" fontWeight="bold" fill="white" textAnchor="middle">Tankless Water Heater</text>

          {/* Tankless illustration */}
          <g transform="translate(30, 50)">
            <rect x="0" y="0" width="50" height="50" fill="#64748b" rx="4" />
            <rect x="10" y="10" width="30" height="30" fill="#f97316" rx="2" />
            <text x="25" y="30" fontSize="6" fill="white" textAnchor="middle">ON</text>
            <text x="25" y="40" fontSize="5" fill="white" textAnchor="middle">DEMAND</text>
          </g>

          {/* Specs */}
          <g transform="translate(95, 50)">
            <text x="0" y="12" fontSize="8" fill={SVG_COLORS.text} fontWeight="bold">Upfront Cost:</text>
            <text x="80" y="12" fontSize="8" fill="#b91c1c">$2,000-4,500</text>

            <text x="0" y="30" fontSize="8" fill={SVG_COLORS.text} fontWeight="bold">Lifespan:</text>
            <text x="80" y="30" fontSize="8" fill="#15803d">20+ years</text>

            <text x="0" y="48" fontSize="8" fill={SVG_COLORS.text} fontWeight="bold">Energy Use:</text>
            <text x="80" y="48" fontSize="8" fill="#15803d">24-34% less</text>

            <text x="0" y="66" fontSize="8" fill={SVG_COLORS.text} fontWeight="bold">Space:</text>
            <text x="80" y="66" fontSize="8" fill="#15803d">Wall-mounted</text>

            <text x="0" y="84" fontSize="8" fill={SVG_COLORS.text} fontWeight="bold">Hot Water:</text>
            <text x="80" y="84" fontSize="8" fill="#15803d">Unlimited</text>
          </g>

          {/* Pros/Cons */}
          <g transform="translate(15, 150)">
            <text x="0" y="0" fontSize="8" fontWeight="bold" fill="#15803d">✓ Lower operating cost</text>
            <text x="0" y="14" fontSize="8" fontWeight="bold" fill="#15803d">✓ Endless hot water</text>
            <text x="0" y="28" fontSize="8" fontWeight="bold" fill="#15803d">✓ Longer lifespan</text>
            <text x="0" y="48" fontSize="8" fontWeight="bold" fill="#b91c1c">✗ Higher upfront cost</text>
            <text x="0" y="62" fontSize="8" fontWeight="bold" fill="#b91c1c">✗ May need gas upgrade</text>
          </g>
        </g>

        {/* Bottom recommendation */}
        <g transform="translate(50, 295)">
          <text x="250" y="0" fontSize="9" fill={SVG_COLORS.textLight} textAnchor="middle">
            Tankless: Best for high usage homes • Tank: Best for budget-conscious • Both work well when properly sized
          </text>
        </g>
      </svg>
    </div>
  );
}
