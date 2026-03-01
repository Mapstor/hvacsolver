'use client';

import CalculatorSVG, { SVG_COLORS } from '../CalculatorSVG';

interface TanklessWaterHeaterSVGProps {
  requiredGPM?: number;
  temperatureRise?: number;
  requiredBTU?: number;
  fuelType?: 'gas' | 'electric';
  fixtureCount?: number;
  inletTemp?: number;
  outletTemp?: number;
}

/**
 * SVG visualization for Tankless Water Heater Sizing Calculator
 * Shows on-demand water heating flow diagram
 */
export default function TanklessWaterHeaterSVG({
  requiredGPM,
  temperatureRise,
  requiredBTU,
  fuelType = 'gas',
  fixtureCount,
  inletTemp,
  outletTemp,
}: TanklessWaterHeaterSVGProps) {
  const hasResults = requiredGPM !== undefined;

  // Flow rate indicator width
  const maxGPM = 10;
  const flowWidth = requiredGPM ? Math.min((requiredGPM / maxGPM) * 80, 80) : 40;

  return (
    <CalculatorSVG
      title="Tankless Water Heater Flow"
      description="On-demand heating capacity requirements"
      aspectRatio="wide"
    >
      <svg
        viewBox="0 0 400 220"
        className="w-full h-full"
        preserveAspectRatio="xMidYMid meet"
      >
        {/* Background */}
        <rect width="400" height="220" fill="#f8fafc" />

        {/* Cold water inlet (left side) */}
        <g transform="translate(20, 60)">
          <text x={30} y={-5} fontSize="9" fill={SVG_COLORS.cold} textAnchor="middle">
            Cold In
          </text>

          {/* Pipe */}
          <rect x={0} y={0} width={60} height={20} fill={SVG_COLORS.cold} opacity={0.3} rx={3} />
          <rect x={0} y={0} width={60} height={20} fill="none" stroke={SVG_COLORS.cold} strokeWidth={2} rx={3} />

          {/* Temperature label */}
          <text x={30} y={35} fontSize="10" fill={SVG_COLORS.cold} fontWeight="bold" textAnchor="middle">
            {inletTemp ? `${inletTemp}°F` : '—°F'}
          </text>

          {/* Flow animation */}
          {hasResults && (
            <g>
              {[0, 1, 2].map((i) => (
                <circle
                  key={i}
                  cx={10 + i * 15}
                  cy={10}
                  r={3}
                  fill={SVG_COLORS.cold}
                  opacity={0.6}
                >
                  <animate
                    attributeName="cx"
                    from={-5}
                    to={65}
                    dur="1s"
                    begin={`${i * 0.3}s`}
                    repeatCount="indefinite"
                  />
                </circle>
              ))}
            </g>
          )}
        </g>

        {/* Tankless unit */}
        <g transform="translate(90, 30)">
          {/* Unit body */}
          <rect
            x={0}
            y={0}
            width={80}
            height={100}
            rx={6}
            fill="#475569"
            stroke={SVG_COLORS.stroke}
            strokeWidth={2}
          />

          {/* Display panel */}
          <rect x={10} y={10} width={60} height={30} rx={3} fill="#1e3a5f" />
          <text x={40} y={30} fontSize="12" fill={SVG_COLORS.heat} fontWeight="bold" textAnchor="middle">
            {outletTemp ? `${outletTemp}°F` : '—°F'}
          </text>

          {/* Heat exchanger visualization */}
          <rect x={15} y={50} width={50} height={35} fill="#334155" rx={2} />

          {/* Heating element / burner */}
          {hasResults && (
            <g>
              {[0, 1, 2].map((i) => (
                <rect
                  key={i}
                  x={20}
                  y={55 + i * 10}
                  width={40}
                  height={6}
                  fill={fuelType === 'gas' ? SVG_COLORS.heat : SVG_COLORS.warning}
                  rx={1}
                  opacity={0.8}
                >
                  <animate
                    attributeName="opacity"
                    values="0.5;1;0.5"
                    dur={`${0.6 + i * 0.1}s`}
                    repeatCount="indefinite"
                  />
                </rect>
              ))}
            </g>
          )}

          {/* Fuel type indicator */}
          <text x={40} y={95} fontSize="8" fill="white" textAnchor="middle">
            {fuelType === 'gas' ? '🔥 Gas' : '⚡ Electric'}
          </text>

          {/* Cold water in arrow */}
          <path
            d="M-10,40 L-2,40"
            fill="none"
            stroke={SVG_COLORS.cold}
            strokeWidth={3}
            markerEnd="url(#flow-arrow-cold)"
          />

          {/* Hot water out arrow */}
          <path
            d="M82,40 L90,40"
            fill="none"
            stroke={SVG_COLORS.heat}
            strokeWidth={3}
            markerEnd="url(#flow-arrow-hot)"
          />
        </g>

        {/* Hot water outlet (right side) */}
        <g transform="translate(180, 60)">
          <text x={30} y={-5} fontSize="9" fill={SVG_COLORS.heat} textAnchor="middle">
            Hot Out
          </text>

          {/* Pipe */}
          <rect x={0} y={0} width={60} height={20} fill={SVG_COLORS.heat} opacity={0.3} rx={3} />
          <rect x={0} y={0} width={60} height={20} fill="none" stroke={SVG_COLORS.heat} strokeWidth={2} rx={3} />

          {/* Temperature label */}
          <text x={30} y={35} fontSize="10" fill={SVG_COLORS.heat} fontWeight="bold" textAnchor="middle">
            {outletTemp ? `${outletTemp}°F` : '—°F'}
          </text>

          {/* Flow animation */}
          {hasResults && (
            <g>
              {[0, 1, 2].map((i) => (
                <circle
                  key={i}
                  cx={10 + i * 15}
                  cy={10}
                  r={3}
                  fill={SVG_COLORS.heat}
                  opacity={0.6}
                >
                  <animate
                    attributeName="cx"
                    from={-5}
                    to={65}
                    dur="1s"
                    begin={`${i * 0.3}s`}
                    repeatCount="indefinite"
                  />
                </circle>
              ))}
            </g>
          )}
        </g>

        {/* Fixtures display */}
        <g transform="translate(250, 50)">
          <text x={0} y={0} fontSize="9" fill={SVG_COLORS.text} fontWeight="bold">
            Fixtures
          </text>
          <g transform="translate(0, 10)">
            <text x={0} y={12} fontSize="20">🚿</text>
            <text x={25} y={12} fontSize="20">🚰</text>
            {fixtureCount && fixtureCount > 2 && <text x={50} y={12} fontSize="20">🛁</text>}
          </g>
          <text x={0} y={50} fontSize="9" fill={SVG_COLORS.primary}>
            {fixtureCount ?? '—'} simultaneous
          </text>
        </g>

        {/* Results panel */}
        <g transform="translate(250, 110)">
          <rect x={0} y={0} width={130} height={75} fill="white" stroke={SVG_COLORS.strokeLight} rx={6} />

          <text x={65} y={16} fontSize="10" fill={SVG_COLORS.text} fontWeight="bold" textAnchor="middle">
            Requirements
          </text>
          <line x1={10} y1={22} x2={120} y2={22} stroke={SVG_COLORS.strokeLight} />

          {/* Flow rate */}
          <g transform="translate(10, 35)">
            <text x={0} y={0} fontSize="8" fill={SVG_COLORS.textLight}>Flow Rate</text>
            <text x={105} y={0} fontSize="11" fill={SVG_COLORS.accent} fontWeight="bold" textAnchor="end">
              {requiredGPM?.toFixed(1) ?? '—'} GPM
            </text>
          </g>

          {/* BTU requirement */}
          <g transform="translate(10, 52)">
            <text x={0} y={0} fontSize="8" fill={SVG_COLORS.textLight}>Capacity</text>
            <text x={105} y={0} fontSize="10" fill={SVG_COLORS.primary} fontWeight="bold" textAnchor="end">
              {requiredBTU ? `${(requiredBTU / 1000).toFixed(0)}k BTU` : '—'}
            </text>
          </g>

          {/* Temperature rise */}
          <g transform="translate(10, 68)">
            <text x={0} y={0} fontSize="8" fill={SVG_COLORS.textLight}>Temp Rise</text>
            <text x={105} y={0} fontSize="9" fill={SVG_COLORS.heat} textAnchor="end">
              {temperatureRise ? `${temperatureRise}°F` : '—'}
            </text>
          </g>
        </g>

        {/* Flow rate indicator */}
        <g transform="translate(20, 130)">
          <text x={0} y={0} fontSize="9" fill={SVG_COLORS.text} fontWeight="bold">
            Flow Rate
          </text>

          {/* Flow bar */}
          <rect x={0} y={10} width={100} height={15} fill="#e2e8f0" rx={3} />
          <rect x={0} y={10} width={flowWidth} height={15} fill={SVG_COLORS.cold} rx={3} />

          <text x={105} y={22} fontSize="9" fill={SVG_COLORS.primary}>
            {requiredGPM?.toFixed(1) ?? '—'} GPM
          </text>

          {/* Scale */}
          <text x={0} y={38} fontSize="7" fill={SVG_COLORS.textLight}>0</text>
          <text x={45} y={38} fontSize="7" fill={SVG_COLORS.textLight}>5</text>
          <text x={93} y={38} fontSize="7" fill={SVG_COLORS.textLight}>10 GPM</text>
        </g>

        {/* Formula note */}
        <g transform="translate(20, 205)">
          <text x={0} y={0} fontSize="7" fill={SVG_COLORS.textLight}>
            BTU = GPM × 8.33 × Temp Rise × 60 | Electric: 1 GPM needs ~17,000 BTU per 60°F rise
          </text>
        </g>

        {/* Arrow markers */}
        <defs>
          <marker
            id="flow-arrow-cold"
            markerWidth="6"
            markerHeight="6"
            refX="5"
            refY="3"
            orient="auto"
          >
            <path d="M0,0 L0,6 L6,3 z" fill={SVG_COLORS.cold} />
          </marker>
          <marker
            id="flow-arrow-hot"
            markerWidth="6"
            markerHeight="6"
            refX="5"
            refY="3"
            orient="auto"
          >
            <path d="M0,0 L0,6 L6,3 z" fill={SVG_COLORS.heat} />
          </marker>
        </defs>
      </svg>
    </CalculatorSVG>
  );
}
