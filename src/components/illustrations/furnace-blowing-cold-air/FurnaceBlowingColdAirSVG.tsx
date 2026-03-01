'use client';

import { SVG_COLORS } from '../../calculators/CalculatorSVG';

/**
 * Illustration showing why furnace might blow cold air
 */
export default function FurnaceBlowingColdAirSVG() {
  return (
    <div className="w-full bg-slate-50 border border-slate-200 rounded-lg overflow-hidden">
      <svg
        viewBox="0 0 600 320"
        className="w-full h-auto"
        preserveAspectRatio="xMidYMid meet"
        role="img"
        aria-label="Furnace blowing cold air troubleshooting diagram"
      >
        <rect width="600" height="320" fill="#f8fafc" />

        <text x="300" y="25" fontSize="14" fontWeight="bold" fill={SVG_COLORS.text} textAnchor="middle">
          Why Is My Furnace Blowing Cold Air?
        </text>

        {/* Furnace illustration */}
        <g transform="translate(30, 50)">
          <rect x="0" y="0" width="130" height="180" rx="6" fill="#64748b" stroke={SVG_COLORS.stroke} strokeWidth="2" />

          {/* Heat exchanger */}
          <rect x="15" y="20" width="100" height="60" fill="#475569" rx="4" />
          <text x="65" y="45" fontSize="8" fill="#94a3b8" textAnchor="middle">Heat</text>
          <text x="65" y="57" fontSize="8" fill="#94a3b8" textAnchor="middle">Exchanger</text>

          {/* Burner area - showing no flame */}
          <rect x="20" y="90" width="90" height="35" fill="#1e293b" rx="2" />
          <text x="65" y="105" fontSize="7" fill="#ef4444" textAnchor="middle">NO FLAME</text>
          <text x="65" y="118" fontSize="6" fill="#94a3b8" textAnchor="middle">(burner off)</text>

          {/* Blower */}
          <rect x="25" y="135" width="80" height="35" fill="#475569" rx="4" />
          <circle cx="65" cy="152" r="12" fill="#64748b" stroke="#94a3b8" strokeWidth="1" />
          <text x="65" y="156" fontSize="6" fill="#94a3b8" textAnchor="middle">FAN</text>

          {/* Cold air arrows coming out */}
          <path d="M 130,40 L 155,40" stroke={SVG_COLORS.cold} strokeWidth="2" />
          <polygon points="155,40 150,37 150,43" fill={SVG_COLORS.cold} />
          <text x="165" y="44" fontSize="7" fill={SVG_COLORS.cold}>Cold!</text>

          <text x="65" y="200" fontSize="9" fill={SVG_COLORS.textLight} textAnchor="middle">Furnace running</text>
          <text x="65" y="212" fontSize="9" fill={SVG_COLORS.textLight} textAnchor="middle">but not heating</text>
        </g>

        {/* Causes checklist */}
        <g transform="translate(185, 50)">
          <text x="0" y="0" fontSize="11" fontWeight="bold" fill={SVG_COLORS.text}>Check These First (DIY):</text>

          {/* Cause 1 */}
          <g transform="translate(0, 18)">
            <rect x="0" y="0" width="190" height="40" rx="4" fill="white" stroke="#15803d" strokeWidth="1.5" />
            <circle cx="18" cy="20" r="10" fill="#dcfce7" />
            <text x="18" y="24" fontSize="10" fill="#15803d" textAnchor="middle" fontWeight="bold">1</text>
            <text x="35" y="15" fontSize="8" fontWeight="bold" fill={SVG_COLORS.text}>Thermostat Set Wrong</text>
            <text x="35" y="28" fontSize="7" fill={SVG_COLORS.textLight}>Fan ON instead of AUTO</text>
            <text x="35" y="38" fontSize="7" fill="#15803d">→ Set fan to AUTO</text>
          </g>

          {/* Cause 2 */}
          <g transform="translate(0, 68)">
            <rect x="0" y="0" width="190" height="40" rx="4" fill="white" stroke="#15803d" strokeWidth="1.5" />
            <circle cx="18" cy="20" r="10" fill="#dcfce7" />
            <text x="18" y="24" fontSize="10" fill="#15803d" textAnchor="middle" fontWeight="bold">2</text>
            <text x="35" y="15" fontSize="8" fontWeight="bold" fill={SVG_COLORS.text}>Dirty Air Filter</text>
            <text x="35" y="28" fontSize="7" fill={SVG_COLORS.textLight}>Restricts airflow, overheats</text>
            <text x="35" y="38" fontSize="7" fill="#15803d">→ Replace filter</text>
          </g>

          {/* Cause 3 */}
          <g transform="translate(0, 118)">
            <rect x="0" y="0" width="190" height="40" rx="4" fill="white" stroke="#d97706" strokeWidth="1.5" />
            <circle cx="18" cy="20" r="10" fill="#fef3c7" />
            <text x="18" y="24" fontSize="10" fill="#d97706" textAnchor="middle" fontWeight="bold">3</text>
            <text x="35" y="15" fontSize="8" fontWeight="bold" fill={SVG_COLORS.text}>Pilot Light Out (older)</text>
            <text x="35" y="28" fontSize="7" fill={SVG_COLORS.textLight}>Gas won&apos;t ignite</text>
            <text x="35" y="38" fontSize="7" fill="#d97706">→ Relight pilot</text>
          </g>

          {/* Cause 4 */}
          <g transform="translate(0, 168)">
            <rect x="0" y="0" width="190" height="40" rx="4" fill="white" stroke="#d97706" strokeWidth="1.5" />
            <circle cx="18" cy="20" r="10" fill="#fef3c7" />
            <text x="18" y="24" fontSize="10" fill="#d97706" textAnchor="middle" fontWeight="bold">4</text>
            <text x="35" y="15" fontSize="8" fontWeight="bold" fill={SVG_COLORS.text}>Condensate Drain Clogged</text>
            <text x="35" y="28" fontSize="7" fill={SVG_COLORS.textLight}>Safety switch shuts off burner</text>
            <text x="35" y="38" fontSize="7" fill="#d97706">→ Clear drain line</text>
          </g>
        </g>

        {/* Pro service needed */}
        <g transform="translate(395, 50)">
          <text x="0" y="0" fontSize="11" fontWeight="bold" fill="#b91c1c">Call a Technician:</text>

          <g transform="translate(0, 18)">
            <rect x="0" y="0" width="175" height="95" rx="4" fill="#fef2f2" stroke="#b91c1c" strokeWidth="1.5" />
            <text x="15" y="18" fontSize="8" fill={SVG_COLORS.text}>• Ignitor failure</text>
            <text x="15" y="33" fontSize="8" fill={SVG_COLORS.text}>• Gas valve issue</text>
            <text x="15" y="48" fontSize="8" fill={SVG_COLORS.text}>• Flame sensor dirty/bad</text>
            <text x="15" y="63" fontSize="8" fill={SVG_COLORS.text}>• Control board problem</text>
            <text x="15" y="78" fontSize="8" fill={SVG_COLORS.text}>• Cracked heat exchanger</text>
            <text x="87" y="92" fontSize="7" fill="#b91c1c" textAnchor="middle">⚠️ Don&apos;t DIY gas issues</text>
          </g>

          {/* Normal behavior note */}
          <g transform="translate(0, 125)">
            <rect x="0" y="0" width="175" height="60" rx="4" fill="#dcfce7" stroke="#15803d" strokeWidth="1" />
            <text x="87" y="16" fontSize="8" fontWeight="bold" fill="#15803d" textAnchor="middle">Normal Behavior:</text>
            <text x="15" y="32" fontSize="7" fill={SVG_COLORS.textLight}>• Cold air first 1-2 minutes</text>
            <text x="15" y="44" fontSize="7" fill={SVG_COLORS.textLight}>• Furnace warming up</text>
            <text x="15" y="56" fontSize="7" fill={SVG_COLORS.textLight}>• Then warm air should flow</text>
          </g>
        </g>

        {/* Bottom tip */}
        <g transform="translate(80, 295)">
          <rect x="0" y="0" width="440" height="20" rx="4" fill={SVG_COLORS.accentLight} />
          <text x="220" y="14" fontSize="9" fill={SVG_COLORS.accent} textAnchor="middle" fontWeight="bold">
            Quick fix: Check thermostat (AUTO not ON) → Check filter → Then call if needed
          </text>
        </g>
      </svg>
    </div>
  );
}
