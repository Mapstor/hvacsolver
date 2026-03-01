'use client';

import CalculatorSVG, { SVG_COLORS } from '../CalculatorSVG';

interface DewPointSVGProps {
  temperature?: number;
  relativeHumidity?: number;
  dewPoint?: number;
  wetBulb?: number;
  unit?: 'F' | 'C';
}

/**
 * SVG visualization for Dew Point Calculator
 * Shows simplified psychrometric chart region with current conditions
 * Source: ASHRAE psychrometric chart visualization
 */
export default function DewPointSVG({
  temperature,
  relativeHumidity,
  dewPoint,
  wetBulb,
  unit = 'F',
}: DewPointSVGProps) {
  const hasResults = dewPoint !== undefined;

  // Chart dimensions
  const chartX = 80;
  const chartY = 30;
  const chartWidth = 280;
  const chartHeight = 160;

  // Temperature range (simplified)
  const minTemp = unit === 'F' ? 30 : 0;
  const maxTemp = unit === 'F' ? 100 : 38;
  const tempRange = maxTemp - minTemp;

  // Convert temperature to X position
  const tempToX = (temp: number) => {
    const normalized = (temp - minTemp) / tempRange;
    return chartX + normalized * chartWidth;
  };

  // Convert humidity to Y position (inverted, 100% at top)
  const humidityToY = (humidity: number) => {
    return chartY + chartHeight - (humidity / 100) * chartHeight;
  };

  // Generate saturation curve (100% RH line)
  const saturationPoints: string[] = [];
  for (let t = minTemp; t <= maxTemp; t += 5) {
    const x = tempToX(t);
    // Simplified saturation curve (actual would use psychrometric equations)
    const y = humidityToY(100);
    saturationPoints.push(`${x},${y}`);
  }

  // Comfort zone boundaries
  const comfortMinTemp = unit === 'F' ? 65 : 18;
  const comfortMaxTemp = unit === 'F' ? 78 : 26;
  const comfortMinRH = 30;
  const comfortMaxRH = 60;

  // Current conditions point
  const currentX = temperature ? tempToX(temperature) : tempToX((minTemp + maxTemp) / 2);
  const currentY = relativeHumidity ? humidityToY(relativeHumidity) : humidityToY(50);

  // Dew point position
  const dewPointX = dewPoint ? tempToX(dewPoint) : currentX;

  // Get comfort assessment
  const getComfortStatus = () => {
    if (!temperature || !relativeHumidity) return { text: 'Enter values', color: SVG_COLORS.textLight };

    const inTempRange = temperature >= comfortMinTemp && temperature <= comfortMaxTemp;
    const inRHRange = relativeHumidity >= comfortMinRH && relativeHumidity <= comfortMaxRH;

    if (inTempRange && inRHRange) return { text: 'Comfortable', color: SVG_COLORS.good };
    if (relativeHumidity > 70) return { text: 'Too Humid', color: SVG_COLORS.warning };
    if (relativeHumidity < 25) return { text: 'Too Dry', color: SVG_COLORS.warning };
    if (temperature && temperature > (unit === 'F' ? 85 : 30)) return { text: 'Too Hot', color: SVG_COLORS.danger };
    if (temperature && temperature < (unit === 'F' ? 60 : 15)) return { text: 'Too Cold', color: SVG_COLORS.cold };
    return { text: 'Moderate', color: SVG_COLORS.primary };
  };

  const comfort = getComfortStatus();

  return (
    <CalculatorSVG
      title="Psychrometric Chart"
      description="Simplified chart showing temperature, humidity, and dew point relationships"
      aspectRatio="wide"
    >
      <svg
        viewBox="0 0 400 230"
        className="w-full h-full"
        preserveAspectRatio="xMidYMid meet"
      >
        {/* Background */}
        <rect width="400" height="230" fill="#f8fafc" />

        {/* Chart background */}
        <rect
          x={chartX}
          y={chartY}
          width={chartWidth}
          height={chartHeight}
          fill="white"
          stroke={SVG_COLORS.strokeLight}
          strokeWidth={1}
        />

        {/* Comfort zone (green region) */}
        <rect
          x={tempToX(comfortMinTemp)}
          y={humidityToY(comfortMaxRH)}
          width={tempToX(comfortMaxTemp) - tempToX(comfortMinTemp)}
          height={humidityToY(comfortMinRH) - humidityToY(comfortMaxRH)}
          fill={SVG_COLORS.good}
          opacity={0.15}
        />
        <rect
          x={tempToX(comfortMinTemp)}
          y={humidityToY(comfortMaxRH)}
          width={tempToX(comfortMaxTemp) - tempToX(comfortMinTemp)}
          height={humidityToY(comfortMinRH) - humidityToY(comfortMaxRH)}
          fill="none"
          stroke={SVG_COLORS.good}
          strokeWidth={1}
          strokeDasharray="4,2"
        />

        {/* High humidity zone (warning) */}
        <rect
          x={chartX}
          y={chartY}
          width={chartWidth}
          height={humidityToY(70) - chartY}
          fill={SVG_COLORS.warning}
          opacity={0.1}
        />

        {/* Grid lines - Temperature */}
        {[...Array(8)].map((_, i) => {
          const temp = minTemp + (i * tempRange) / 7;
          const x = tempToX(temp);
          return (
            <g key={`temp-${i}`}>
              <line x1={x} y1={chartY} x2={x} y2={chartY + chartHeight} stroke={SVG_COLORS.strokeLight} strokeWidth={0.5} />
              <text x={x} y={chartY + chartHeight + 12} fontSize="8" fill={SVG_COLORS.textLight} textAnchor="middle">
                {Math.round(temp)}°{unit}
              </text>
            </g>
          );
        })}

        {/* Grid lines - Humidity */}
        {[0, 20, 40, 60, 80, 100].map((rh) => {
          const y = humidityToY(rh);
          return (
            <g key={`rh-${rh}`}>
              <line x1={chartX} y1={y} x2={chartX + chartWidth} y2={y} stroke={SVG_COLORS.strokeLight} strokeWidth={0.5} />
              <text x={chartX - 5} y={y + 3} fontSize="8" fill={SVG_COLORS.textLight} textAnchor="end">
                {rh}%
              </text>
            </g>
          );
        })}

        {/* Axis labels */}
        <text
          x={chartX + chartWidth / 2}
          y={chartY + chartHeight + 25}
          fontSize="10"
          fill={SVG_COLORS.text}
          textAnchor="middle"
        >
          Dry Bulb Temperature (°{unit})
        </text>
        <text
          x={25}
          y={chartY + chartHeight / 2}
          fontSize="10"
          fill={SVG_COLORS.text}
          textAnchor="middle"
          transform={`rotate(-90, 25, ${chartY + chartHeight / 2})`}
        >
          Relative Humidity (%)
        </text>

        {/* Constant RH curves (simplified) */}
        {[20, 40, 60, 80].map((rh) => {
          // These would be actual psychrometric curves, simplified here as straight lines
          const y = humidityToY(rh);
          return (
            <g key={`rh-curve-${rh}`}>
              <line
                x1={chartX}
                y1={y}
                x2={chartX + chartWidth}
                y2={y}
                stroke={SVG_COLORS.cold}
                strokeWidth={0.5}
                opacity={0.5}
                strokeDasharray="2,4"
              />
            </g>
          );
        })}

        {/* Current conditions point */}
        {hasResults && (
          <>
            {/* Vertical line from point to temperature axis */}
            <line
              x1={currentX}
              y1={currentY}
              x2={currentX}
              y2={chartY + chartHeight}
              stroke={SVG_COLORS.primary}
              strokeWidth={1}
              strokeDasharray="3,2"
            />

            {/* Horizontal line from point to humidity axis */}
            <line
              x1={chartX}
              y1={currentY}
              x2={currentX}
              y2={currentY}
              stroke={SVG_COLORS.primary}
              strokeWidth={1}
              strokeDasharray="3,2"
            />

            {/* Dew point line (horizontal at 100% saturation to actual temp) */}
            <line
              x1={dewPointX}
              y1={currentY}
              x2={dewPointX}
              y2={chartY + chartHeight}
              stroke={SVG_COLORS.cold}
              strokeWidth={1.5}
              strokeDasharray="4,2"
            />

            {/* Current conditions marker */}
            <circle cx={currentX} cy={currentY} r={6} fill={SVG_COLORS.accent} stroke="white" strokeWidth={2} />

            {/* Dew point marker */}
            <circle cx={dewPointX} cy={humidityToY(100)} r={5} fill={SVG_COLORS.cold} stroke="white" strokeWidth={2} />
            <text x={dewPointX} y={humidityToY(100) - 10} fontSize="8" fill={SVG_COLORS.cold} textAnchor="middle">
              Dew Point
            </text>
          </>
        )}

        {/* Results panel */}
        <g transform="translate(10, 5)">
          <rect x={0} y={0} width={65} height={70} fill="white" stroke={SVG_COLORS.strokeLight} rx={4} />

          <text x={32.5} y={14} fontSize="8" fill={SVG_COLORS.textLight} textAnchor="middle">Conditions</text>
          <line x1={5} y1={19} x2={60} y2={19} stroke={SVG_COLORS.strokeLight} />

          <text x={8} y={32} fontSize="8" fill={SVG_COLORS.text}>T:</text>
          <text x={58} y={32} fontSize="9" fill={SVG_COLORS.primary} fontWeight="bold" textAnchor="end">
            {temperature !== undefined ? `${temperature.toFixed(1)}°${unit}` : '—'}
          </text>

          <text x={8} y={45} fontSize="8" fill={SVG_COLORS.text}>RH:</text>
          <text x={58} y={45} fontSize="9" fill={SVG_COLORS.primary} fontWeight="bold" textAnchor="end">
            {relativeHumidity !== undefined ? `${relativeHumidity.toFixed(1)}%` : '—'}
          </text>

          <text x={8} y={58} fontSize="8" fill={SVG_COLORS.text}>DP:</text>
          <text x={58} y={58} fontSize="9" fill={SVG_COLORS.cold} fontWeight="bold" textAnchor="end">
            {dewPoint !== undefined ? `${dewPoint.toFixed(1)}°${unit}` : '—'}
          </text>

          {wetBulb !== undefined && (
            <>
              <text x={8} y={71} fontSize="8" fill={SVG_COLORS.text}>WB:</text>
              <text x={58} y={71} fontSize="9" fill={SVG_COLORS.cold} fontWeight="bold" textAnchor="end">
                {wetBulb.toFixed(1)}°{unit}
              </text>
            </>
          )}
        </g>

        {/* Comfort status */}
        <g transform="translate(10, 80)">
          <rect x={0} y={0} width={65} height={25} fill="white" stroke={comfort.color} strokeWidth={1.5} rx={4} />
          <text x={32.5} y={16} fontSize="9" fill={comfort.color} fontWeight="bold" textAnchor="middle">
            {comfort.text}
          </text>
        </g>

        {/* Legend */}
        <g transform="translate(10, 200)">
          <rect x={0} y={0} width={180} height={22} fill="rgba(255,255,255,0.9)" rx={4} />
          <rect x={5} y={7} width={12} height={8} fill={SVG_COLORS.good} opacity={0.3} />
          <text x={22} y={14} fontSize="7" fill={SVG_COLORS.text}>Comfort Zone</text>

          <circle cx={85} cy={11} r={4} fill={SVG_COLORS.accent} />
          <text x={93} y={14} fontSize="7" fill={SVG_COLORS.text}>Current</text>

          <circle cx={140} cy={11} r={4} fill={SVG_COLORS.cold} />
          <text x={148} y={14} fontSize="7" fill={SVG_COLORS.text}>Dew Pt</text>
        </g>
      </svg>
    </CalculatorSVG>
  );
}
