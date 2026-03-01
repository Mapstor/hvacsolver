'use client';

import CalculatorSVG, { SVG_COLORS } from '../CalculatorSVG';

interface Appliance {
  name: string;
  runningWatts: number;
  startingWatts: number;
}

interface GeneratorSizingSVGProps {
  appliances?: Appliance[];
  totalRunningWatts?: number;
  totalStartingWatts?: number;
  recommendedSize?: number;
}

/**
 * SVG visualization for Generator Sizing Calculator
 * Shows appliance icons with wattage bars
 * Source: Generator manufacturers' sizing guidelines
 */
export default function GeneratorSizingSVG({
  appliances,
  totalRunningWatts,
  totalStartingWatts,
  recommendedSize,
}: GeneratorSizingSVGProps) {
  const hasResults = appliances && appliances.length > 0;

  // Get top appliances by wattage (max 5 for display)
  const topAppliances = appliances
    ? [...appliances].sort((a, b) => b.startingWatts - a.startingWatts).slice(0, 5)
    : [];

  // Find max wattage for scaling bars
  const maxWatts = topAppliances.length > 0
    ? Math.max(...topAppliances.map(a => a.startingWatts))
    : 5000;

  // Get icon for appliance type
  const getApplianceIcon = (name: string): string => {
    const lowerName = name.toLowerCase();
    if (lowerName.includes('ac') || lowerName.includes('air condition')) return '❄️';
    if (lowerName.includes('fridge') || lowerName.includes('refrigerator')) return '🧊';
    if (lowerName.includes('pump') || lowerName.includes('well')) return '💧';
    if (lowerName.includes('heat') || lowerName.includes('furnace')) return '🔥';
    if (lowerName.includes('washer') || lowerName.includes('dryer')) return '👕';
    if (lowerName.includes('microwave')) return '📻';
    if (lowerName.includes('light')) return '💡';
    if (lowerName.includes('computer') || lowerName.includes('tv')) return '🖥️';
    if (lowerName.includes('sump')) return '🌊';
    if (lowerName.includes('garage')) return '🚗';
    return '⚡';
  };

  return (
    <CalculatorSVG
      title="Power Requirements"
      description="Starting watts (surge) shown in orange, running watts in blue"
      aspectRatio="wide"
    >
      <svg
        viewBox="0 0 440 250"
        className="w-full h-full"
        preserveAspectRatio="xMidYMid meet"
      >
        {/* Background */}
        <rect width="440" height="250" fill="#f8fafc" />

        {/* Generator icon */}
        <g transform="translate(20, 30)">
          {/* Generator body */}
          <rect x={0} y={0} width={70} height={50} rx={4} fill="#fbbf24" stroke={SVG_COLORS.stroke} strokeWidth={2} />

          {/* Engine cover details */}
          <rect x={5} y={5} width={25} height={40} rx={3} fill="#f59e0b" />
          <circle cx={17.5} cy={25} r={12} fill="#d97706" />
          <circle cx={17.5} cy={25} r={6} fill="#92400e" />

          {/* Control panel */}
          <rect x={35} y={8} width={30} height={20} rx={2} fill="#1e293b" />
          <circle cx={42} cy={15} r={3} fill="#22c55e" />
          <rect x={48} y={12} width={12} height={6} rx={1} fill="#64748b" />

          {/* Outlets */}
          <rect x={37} y={32} width={10} height={10} rx={1} fill="#374151" />
          <rect x={52} y={32} width={10} height={10} rx={1} fill="#374151" />

          {/* Wheels */}
          <circle cx={15} cy={55} r={8} fill="#374151" stroke={SVG_COLORS.stroke} strokeWidth={1} />
          <circle cx={55} cy={55} r={8} fill="#374151" stroke={SVG_COLORS.stroke} strokeWidth={1} />

          {/* Handle */}
          <rect x={25} y={-8} width={20} height={8} rx={3} fill="#94a3b8" />

          {/* Size label */}
          {recommendedSize && (
            <g>
              <rect x={-5} y={70} width={80} height={25} fill="white" stroke={SVG_COLORS.accent} strokeWidth={2} rx={4} />
              <text x={35} y={87} fontSize="11" fill={SVG_COLORS.accent} fontWeight="bold" textAnchor="middle">
                {recommendedSize >= 1000 ? `${(recommendedSize / 1000).toFixed(1)} kW` : `${recommendedSize} W`}
              </text>
            </g>
          )}
        </g>

        {/* Power flow lines */}
        <path
          d="M90,55 Q120,55 130,60"
          fill="none"
          stroke={SVG_COLORS.warning}
          strokeWidth={3}
          strokeDasharray="8,4"
        >
          <animate
            attributeName="stroke-dashoffset"
            from="0"
            to="-24"
            dur="1s"
            repeatCount="indefinite"
          />
        </path>

        {/* Appliances with wattage bars */}
        <g transform="translate(130, 20)">
          <text x={0} y={0} fontSize="10" fill={SVG_COLORS.text} fontWeight="bold">
            Appliances
          </text>
          <text x={170} y={0} fontSize="10" fill={SVG_COLORS.text} fontWeight="bold">
            Wattage
          </text>

          {hasResults ? (
            topAppliances.map((appliance, index) => {
              const barWidth = 100;
              const runningWidth = (appliance.runningWatts / maxWatts) * barWidth;
              const startingWidth = (appliance.startingWatts / maxWatts) * barWidth;

              return (
                <g key={appliance.name} transform={`translate(0, ${20 + index * 35})`}>
                  {/* Icon */}
                  <text x={0} y={15} fontSize="16">
                    {getApplianceIcon(appliance.name)}
                  </text>

                  {/* Name */}
                  <text x={25} y={15} fontSize="9" fill={SVG_COLORS.text}>
                    {appliance.name.length > 18 ? appliance.name.substring(0, 18) + '...' : appliance.name}
                  </text>

                  {/* Starting watts bar (background) */}
                  <rect
                    x={130}
                    y={5}
                    width={startingWidth}
                    height={10}
                    fill={SVG_COLORS.warning}
                    opacity={0.5}
                    rx={2}
                  />

                  {/* Running watts bar (foreground) */}
                  <rect
                    x={130}
                    y={5}
                    width={runningWidth}
                    height={10}
                    fill={SVG_COLORS.primary}
                    rx={2}
                  />

                  {/* Wattage labels */}
                  <text x={240} y={13} fontSize="8" fill={SVG_COLORS.primary}>
                    {appliance.runningWatts}W
                  </text>
                  {appliance.startingWatts > appliance.runningWatts && (
                    <text x={240} y={22} fontSize="7" fill={SVG_COLORS.warning}>
                      ({appliance.startingWatts}W surge)
                    </text>
                  )}
                </g>
              );
            })
          ) : (
            // Placeholder when no appliances selected
            [
              { name: 'Central AC', icon: '❄️', watts: 4000 },
              { name: 'Refrigerator', icon: '🧊', watts: 1200 },
              { name: 'Sump Pump', icon: '💧', watts: 1500 },
              { name: 'Lights', icon: '💡', watts: 500 },
            ].map((item, index) => (
              <g key={item.name} transform={`translate(0, ${20 + index * 35})`} opacity={0.4}>
                <text x={0} y={15} fontSize="16">{item.icon}</text>
                <text x={25} y={15} fontSize="9" fill={SVG_COLORS.textLight}>{item.name}</text>
                <rect x={130} y={5} width={60} height={10} fill={SVG_COLORS.strokeLight} rx={2} />
              </g>
            ))
          )}
        </g>

        {/* Totals section */}
        <g transform="translate(130, 195)">
          <line x1={0} y1={0} x2={290} y2={0} stroke={SVG_COLORS.strokeLight} strokeWidth={1} />

          {/* Running watts total */}
          <g transform="translate(0, 15)">
            <rect x={0} y={0} width={120} height={35} fill="white" stroke={SVG_COLORS.primary} strokeWidth={1.5} rx={4} />
            <text x={60} y={15} fontSize="8" fill={SVG_COLORS.textLight} textAnchor="middle">Running Watts</text>
            <text x={60} y={30} fontSize="12" fill={SVG_COLORS.primary} fontWeight="bold" textAnchor="middle">
              {totalRunningWatts ? `${totalRunningWatts.toLocaleString()} W` : '— W'}
            </text>
          </g>

          {/* Starting watts total */}
          <g transform="translate(130, 15)">
            <rect x={0} y={0} width={120} height={35} fill="white" stroke={SVG_COLORS.warning} strokeWidth={1.5} rx={4} />
            <text x={60} y={15} fontSize="8" fill={SVG_COLORS.textLight} textAnchor="middle">Peak/Starting Watts</text>
            <text x={60} y={30} fontSize="12" fill={SVG_COLORS.warning} fontWeight="bold" textAnchor="middle">
              {totalStartingWatts ? `${totalStartingWatts.toLocaleString()} W` : '— W'}
            </text>
          </g>
        </g>

        {/* Legend */}
        <g transform="translate(20, 140)">
          <text x={0} y={0} fontSize="8" fill={SVG_COLORS.textLight}>Legend:</text>
          <rect x={0} y={8} width={40} height={8} fill={SVG_COLORS.primary} rx={2} />
          <text x={45} y={15} fontSize="7" fill={SVG_COLORS.text}>Running</text>
          <rect x={0} y={22} width={40} height={8} fill={SVG_COLORS.warning} opacity={0.5} rx={2} />
          <text x={45} y={29} fontSize="7" fill={SVG_COLORS.text}>Surge</text>
        </g>
      </svg>
    </CalculatorSVG>
  );
}
