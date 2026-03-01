'use client';

import { SVG_COLORS } from '../../calculators/CalculatorSVG';

/**
 * Illustration showing ideal indoor humidity levels
 */
export default function IndoorHumidityGuideSVG() {
  return (
    <div className="w-full bg-slate-50 border border-slate-200 rounded-lg overflow-hidden">
      <svg
        viewBox="0 0 600 300"
        className="w-full h-auto"
        preserveAspectRatio="xMidYMid meet"
        role="img"
        aria-label="Indoor humidity guide diagram"
      >
        <rect width="600" height="300" fill="#f8fafc" />

        <text x="300" y="25" fontSize="14" fontWeight="bold" fill={SVG_COLORS.text} textAnchor="middle">
          Indoor Humidity Guide
        </text>

        {/* Humidity scale */}
        <g transform="translate(50, 55)">
          <text x="0" y="0" fontSize="11" fontWeight="bold" fill={SVG_COLORS.text}>Relative Humidity Scale:</text>

          {/* Scale bar */}
          <g transform="translate(0, 20)">
            <rect x="0" y="0" width="80" height="40" fill="#fecaca" rx="4" />
            <rect x="80" y="0" width="120" height="40" fill="#fef3c7" />
            <rect x="200" y="0" width="120" height="40" fill="#dcfce7" />
            <rect x="320" y="0" width="80" height="40" fill="#fef3c7" />
            <rect x="400" y="0" width="100" height="40" fill="#fecaca" rx="4" />

            {/* Labels */}
            <text x="40" y="18" fontSize="11" fill="#b91c1c" textAnchor="middle" fontWeight="bold">0-30%</text>
            <text x="40" y="32" fontSize="7" fill="#b91c1c" textAnchor="middle">Too Dry</text>

            <text x="140" y="18" fontSize="11" fill="#d97706" textAnchor="middle" fontWeight="bold">30-40%</text>
            <text x="140" y="32" fontSize="7" fill="#d97706" textAnchor="middle">Low</text>

            <text x="260" y="18" fontSize="11" fill="#15803d" textAnchor="middle" fontWeight="bold">40-50%</text>
            <text x="260" y="32" fontSize="7" fill="#15803d" textAnchor="middle">IDEAL</text>

            <text x="360" y="18" fontSize="11" fill="#d97706" textAnchor="middle" fontWeight="bold">50-60%</text>
            <text x="360" y="32" fontSize="7" fill="#d97706" textAnchor="middle">High</text>

            <text x="450" y="18" fontSize="11" fill="#b91c1c" textAnchor="middle" fontWeight="bold">60%+</text>
            <text x="450" y="32" fontSize="7" fill="#b91c1c" textAnchor="middle">Too Humid</text>
          </g>
        </g>

        {/* Problems at each extreme */}
        <g transform="translate(50, 140)">
          {/* Too dry */}
          <g transform="translate(0, 0)">
            <rect x="0" y="0" width="240" height="80" rx="4" fill="white" stroke="#b91c1c" strokeWidth="1.5" />
            <rect x="0" y="0" width="240" height="22" rx="4" fill="#fecaca" />
            <rect x="0" y="18" width="240" height="4" fill="#fecaca" />
            <text x="120" y="15" fontSize="10" fontWeight="bold" fill="#b91c1c" textAnchor="middle">
              Too Dry (&lt;30%)
            </text>
            <text x="15" y="38" fontSize="8" fill={SVG_COLORS.textLight}>• Dry skin, chapped lips</text>
            <text x="15" y="50" fontSize="8" fill={SVG_COLORS.textLight}>• Static electricity</text>
            <text x="15" y="62" fontSize="8" fill={SVG_COLORS.textLight}>• Respiratory irritation</text>
            <text x="15" y="74" fontSize="8" fill={SVG_COLORS.textLight}>• Wood cracks/shrinks</text>
          </g>

          {/* Too humid */}
          <g transform="translate(260, 0)">
            <rect x="0" y="0" width="240" height="80" rx="4" fill="white" stroke="#b91c1c" strokeWidth="1.5" />
            <rect x="0" y="0" width="240" height="22" rx="4" fill="#fecaca" />
            <rect x="0" y="18" width="240" height="4" fill="#fecaca" />
            <text x="120" y="15" fontSize="10" fontWeight="bold" fill="#b91c1c" textAnchor="middle">
              Too Humid (&gt;60%)
            </text>
            <text x="15" y="38" fontSize="8" fill={SVG_COLORS.textLight}>• Mold and mildew growth</text>
            <text x="15" y="50" fontSize="8" fill={SVG_COLORS.textLight}>• Dust mites thrive</text>
            <text x="15" y="62" fontSize="8" fill={SVG_COLORS.textLight}>• Musty odors</text>
            <text x="15" y="74" fontSize="8" fill={SVG_COLORS.textLight}>• Wood warps/swells</text>
          </g>
        </g>

        {/* Seasonal recommendations */}
        <g transform="translate(50, 235)">
          <rect x="0" y="0" width="500" height="50" rx="6" fill="#dcfce7" stroke="#15803d" strokeWidth="1" />
          <text x="250" y="18" fontSize="10" fontWeight="bold" fill="#15803d" textAnchor="middle">
            Seasonal Targets
          </text>
          <text x="250" y="36" fontSize="9" fill={SVG_COLORS.textLight} textAnchor="middle">
            Summer: 40-50% (use AC/dehumidifier) • Winter: 30-40% (use humidifier, lower if condensation on windows)
          </text>
        </g>
      </svg>
    </div>
  );
}
