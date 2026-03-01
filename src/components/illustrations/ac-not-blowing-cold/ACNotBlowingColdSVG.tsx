'use client';

import { SVG_COLORS } from '../../calculators/CalculatorSVG';

/**
 * Illustration showing AC not blowing cold troubleshooting flowchart
 */
export default function ACNotBlowingColdSVG() {
  return (
    <div className="w-full bg-slate-50 border border-slate-200 rounded-lg overflow-hidden">
      <svg
        viewBox="0 0 600 340"
        className="w-full h-auto"
        preserveAspectRatio="xMidYMid meet"
        role="img"
        aria-label="AC not blowing cold air troubleshooting flowchart"
      >
        <rect width="600" height="340" fill="#f8fafc" />

        <text x="300" y="25" fontSize="14" fontWeight="bold" fill={SVG_COLORS.text} textAnchor="middle">
          AC Not Blowing Cold? Check These First
        </text>

        {/* Step 1 - Thermostat */}
        <g transform="translate(40, 50)">
          <rect x="0" y="0" width="160" height="80" rx="6" fill="white" stroke={SVG_COLORS.cold} strokeWidth="2" />
          <circle cx="25" cy="25" r="15" fill={SVG_COLORS.cold} />
          <text x="25" y="30" fontSize="12" fill="white" textAnchor="middle" fontWeight="bold">1</text>
          <text x="95" y="25" fontSize="10" fontWeight="bold" fill={SVG_COLORS.text} textAnchor="middle">Thermostat</text>
          <text x="95" y="42" fontSize="8" fill={SVG_COLORS.textLight} textAnchor="middle">Set to COOL?</text>
          <text x="95" y="54" fontSize="8" fill={SVG_COLORS.textLight} textAnchor="middle">Fan on AUTO?</text>
          <text x="95" y="66" fontSize="8" fill={SVG_COLORS.textLight} textAnchor="middle">Temp below room?</text>
        </g>

        {/* Arrow */}
        <path d="M 200,90 L 220,90" stroke={SVG_COLORS.stroke} strokeWidth="2" fill="none" />

        {/* Step 2 - Filter */}
        <g transform="translate(220, 50)">
          <rect x="0" y="0" width="160" height="80" rx="6" fill="white" stroke={SVG_COLORS.cold} strokeWidth="2" />
          <circle cx="25" cy="25" r="15" fill={SVG_COLORS.cold} />
          <text x="25" y="30" fontSize="12" fill="white" textAnchor="middle" fontWeight="bold">2</text>
          <text x="95" y="25" fontSize="10" fontWeight="bold" fill={SVG_COLORS.text} textAnchor="middle">Air Filter</text>
          <text x="95" y="42" fontSize="8" fill={SVG_COLORS.textLight} textAnchor="middle">Is it dirty/clogged?</text>
          <text x="95" y="54" fontSize="8" fill={SVG_COLORS.textLight} textAnchor="middle">Replace if needed</text>
          <text x="95" y="66" fontSize="8" fill="#15803d" textAnchor="middle">#1 cause of issues</text>
        </g>

        {/* Arrow */}
        <path d="M 380,90 L 400,90" stroke={SVG_COLORS.stroke} strokeWidth="2" fill="none" />

        {/* Step 3 - Outdoor unit */}
        <g transform="translate(400, 50)">
          <rect x="0" y="0" width="160" height="80" rx="6" fill="white" stroke={SVG_COLORS.cold} strokeWidth="2" />
          <circle cx="25" cy="25" r="15" fill={SVG_COLORS.cold} />
          <text x="25" y="30" fontSize="12" fill="white" textAnchor="middle" fontWeight="bold">3</text>
          <text x="95" y="25" fontSize="10" fontWeight="bold" fill={SVG_COLORS.text} textAnchor="middle">Outdoor Unit</text>
          <text x="95" y="42" fontSize="8" fill={SVG_COLORS.textLight} textAnchor="middle">Is fan running?</text>
          <text x="95" y="54" fontSize="8" fill={SVG_COLORS.textLight} textAnchor="middle">Coils clean?</text>
          <text x="95" y="66" fontSize="8" fill={SVG_COLORS.textLight} textAnchor="middle">No debris blocking?</text>
        </g>

        {/* Second row */}
        {/* Step 4 - Breaker */}
        <g transform="translate(40, 150)">
          <rect x="0" y="0" width="160" height="80" rx="6" fill="white" stroke="#d97706" strokeWidth="2" />
          <circle cx="25" cy="25" r="15" fill="#d97706" />
          <text x="25" y="30" fontSize="12" fill="white" textAnchor="middle" fontWeight="bold">4</text>
          <text x="95" y="25" fontSize="10" fontWeight="bold" fill={SVG_COLORS.text} textAnchor="middle">Circuit Breaker</text>
          <text x="95" y="42" fontSize="8" fill={SVG_COLORS.textLight} textAnchor="middle">Check electrical panel</text>
          <text x="95" y="54" fontSize="8" fill={SVG_COLORS.textLight} textAnchor="middle">AC breaker tripped?</text>
          <text x="95" y="66" fontSize="8" fill={SVG_COLORS.textLight} textAnchor="middle">Reset once only</text>
        </g>

        {/* Step 5 - Frozen coil */}
        <g transform="translate(220, 150)">
          <rect x="0" y="0" width="160" height="80" rx="6" fill="white" stroke="#d97706" strokeWidth="2" />
          <circle cx="25" cy="25" r="15" fill="#d97706" />
          <text x="25" y="30" fontSize="12" fill="white" textAnchor="middle" fontWeight="bold">5</text>
          <text x="95" y="25" fontSize="10" fontWeight="bold" fill={SVG_COLORS.text} textAnchor="middle">Frozen Coil?</text>
          <text x="95" y="42" fontSize="8" fill={SVG_COLORS.textLight} textAnchor="middle">Check indoor coil</text>
          <text x="95" y="54" fontSize="8" fill={SVG_COLORS.textLight} textAnchor="middle">Ice = turn off 2-4 hrs</text>
          <text x="95" y="66" fontSize="8" fill={SVG_COLORS.textLight} textAnchor="middle">Run fan only to thaw</text>
        </g>

        {/* Step 6 - Refrigerant */}
        <g transform="translate(400, 150)">
          <rect x="0" y="0" width="160" height="80" rx="6" fill="white" stroke="#b91c1c" strokeWidth="2" />
          <circle cx="25" cy="25" r="15" fill="#b91c1c" />
          <text x="25" y="30" fontSize="12" fill="white" textAnchor="middle" fontWeight="bold">6</text>
          <text x="95" y="25" fontSize="10" fontWeight="bold" fill={SVG_COLORS.text} textAnchor="middle">Low Refrigerant</text>
          <text x="95" y="42" fontSize="8" fill={SVG_COLORS.textLight} textAnchor="middle">If above didn&apos;t help</text>
          <text x="95" y="54" fontSize="8" fill={SVG_COLORS.textLight} textAnchor="middle">Likely refrigerant leak</text>
          <text x="95" y="66" fontSize="8" fill="#b91c1c" textAnchor="middle" fontWeight="bold">Call HVAC tech</text>
        </g>

        {/* Result boxes */}
        <g transform="translate(80, 260)">
          <rect x="0" y="0" width="200" height="55" rx="6" fill="#dcfce7" stroke="#15803d" strokeWidth="1.5" />
          <text x="100" y="20" fontSize="10" fontWeight="bold" fill="#15803d" textAnchor="middle">DIY Fixable (Steps 1-5)</text>
          <text x="100" y="35" fontSize="8" fill={SVG_COLORS.textLight} textAnchor="middle">Filter, thermostat, breaker</text>
          <text x="100" y="47" fontSize="8" fill={SVG_COLORS.textLight} textAnchor="middle">Most common causes</text>
        </g>

        <g transform="translate(320, 260)">
          <rect x="0" y="0" width="200" height="55" rx="6" fill="#fef2f2" stroke="#b91c1c" strokeWidth="1.5" />
          <text x="100" y="20" fontSize="10" fontWeight="bold" fill="#b91c1c" textAnchor="middle">Needs Technician</text>
          <text x="100" y="35" fontSize="8" fill={SVG_COLORS.textLight} textAnchor="middle">Refrigerant, compressor</text>
          <text x="100" y="47" fontSize="8" fill={SVG_COLORS.textLight} textAnchor="middle">Electrical issues, parts</text>
        </g>
      </svg>
    </div>
  );
}
