'use client';

import { SVG_COLORS } from '../../calculators/CalculatorSVG';

/**
 * Illustration showing average household electricity usage breakdown
 */
export default function AverageElectricityUsageSVG() {
  return (
    <div className="w-full bg-slate-50 border border-slate-200 rounded-lg overflow-hidden">
      <svg
        viewBox="0 0 600 300"
        className="w-full h-auto"
        preserveAspectRatio="xMidYMid meet"
        role="img"
        aria-label="Average household electricity usage breakdown chart"
      >
        <rect width="600" height="300" fill="#f8fafc" />

        <text x="300" y="25" fontSize="14" fontWeight="bold" fill={SVG_COLORS.text} textAnchor="middle">
          Average U.S. Home Electricity Usage (10,500 kWh/year)
        </text>

        {/* Pie chart representation as horizontal bars */}
        <g transform="translate(40, 55)">
          {/* HVAC - largest */}
          <g transform="translate(0, 0)">
            <rect x="0" y="0" width="280" height="30" fill={SVG_COLORS.cold} rx="4" />
            <text x="10" y="20" fontSize="10" fill="white" fontWeight="bold">Heating & Cooling</text>
            <text x="250" y="20" fontSize="10" fill="white" fontWeight="bold">46%</text>
          </g>

          {/* Water heating */}
          <g transform="translate(0, 38)">
            <rect x="0" y="0" width="120" height="30" fill="#d97706" rx="4" />
            <text x="10" y="20" fontSize="10" fill="white" fontWeight="bold">Water Heating</text>
            <text x="95" y="20" fontSize="10" fill="white" fontWeight="bold">14%</text>
          </g>

          {/* Appliances */}
          <g transform="translate(0, 76)">
            <rect x="0" y="0" width="110" height="30" fill="#15803d" rx="4" />
            <text x="10" y="20" fontSize="10" fill="white" fontWeight="bold">Appliances</text>
            <text x="85" y="20" fontSize="10" fill="white" fontWeight="bold">13%</text>
          </g>

          {/* Lighting */}
          <g transform="translate(0, 114)">
            <rect x="0" y="0" width="75" height="30" fill="#7c3aed" rx="4" />
            <text x="10" y="20" fontSize="10" fill="white" fontWeight="bold">Lighting</text>
            <text x="55" y="20" fontSize="10" fill="white" fontWeight="bold">9%</text>
          </g>

          {/* Electronics */}
          <g transform="translate(0, 152)">
            <rect x="0" y="0" width="60" height="30" fill="#0891b2" rx="4" />
            <text x="10" y="20" fontSize="9" fill="white" fontWeight="bold">Electronics</text>
          </g>
          <text x="65" y="172" fontSize="10" fill={SVG_COLORS.text} fontWeight="bold">7%</text>

          {/* Other */}
          <g transform="translate(0, 190)">
            <rect x="0" y="0" width="55" height="30" fill="#94a3b8" rx="4" />
            <text x="10" y="20" fontSize="9" fill="white" fontWeight="bold">Other</text>
          </g>
          <text x="60" y="210" fontSize="10" fill={SVG_COLORS.text} fontWeight="bold">11%</text>
        </g>

        {/* Monthly breakdown */}
        <g transform="translate(340, 55)">
          <rect x="0" y="0" width="230" height="165" rx="6" fill="white" stroke={SVG_COLORS.stroke} strokeWidth="1.5" />
          <text x="115" y="22" fontSize="11" fontWeight="bold" fill={SVG_COLORS.text} textAnchor="middle">Monthly Averages</text>

          <text x="20" y="50" fontSize="9" fill={SVG_COLORS.textLight}>Average monthly use:</text>
          <text x="180" y="50" fontSize="10" fill={SVG_COLORS.text} fontWeight="bold" textAnchor="end">875 kWh</text>

          <text x="20" y="70" fontSize="9" fill={SVG_COLORS.textLight}>Average rate:</text>
          <text x="180" y="70" fontSize="10" fill={SVG_COLORS.text} fontWeight="bold" textAnchor="end">$0.16/kWh</text>

          <line x1="20" y1="82" x2="210" y2="82" stroke={SVG_COLORS.strokeLight} strokeWidth="1" />

          <text x="20" y="100" fontSize="9" fill={SVG_COLORS.textLight}>Average monthly bill:</text>
          <text x="180" y="100" fontSize="12" fill={SVG_COLORS.accent} fontWeight="bold" textAnchor="end">$140</text>

          <text x="20" y="125" fontSize="9" fill={SVG_COLORS.textLight}>HVAC portion (~46%):</text>
          <text x="180" y="125" fontSize="10" fill={SVG_COLORS.cold} fontWeight="bold" textAnchor="end">$65/month</text>

          <text x="115" y="150" fontSize="8" fill={SVG_COLORS.textLight} textAnchor="middle">
            (Varies by climate, home size, rates)
          </text>
        </g>

        {/* Key insight */}
        <g transform="translate(340, 230)">
          <rect x="0" y="0" width="230" height="45" rx="6" fill={SVG_COLORS.accentLight} stroke={SVG_COLORS.accent} strokeWidth="1" />
          <text x="115" y="18" fontSize="9" fontWeight="bold" fill={SVG_COLORS.accent} textAnchor="middle">
            HVAC = Biggest Energy User
          </text>
          <text x="115" y="35" fontSize="8" fill={SVG_COLORS.textLight} textAnchor="middle">
            Improving HVAC efficiency saves the most money
          </text>
        </g>
      </svg>
    </div>
  );
}
