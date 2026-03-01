'use client';

import CalculatorSVG, { SVG_COLORS } from '../CalculatorSVG';

interface SonesToDecibelsSVGProps {
  sones?: number;
  decibels?: number;
  conversionDirection?: 'sones-to-db' | 'db-to-sones';
}

/**
 * SVG visualization for Sones to Decibels Calculator
 * Shows sound level comparison with common reference sounds
 */
export default function SonesToDecibelsSVG({
  sones,
  decibels,
  conversionDirection = 'sones-to-db',
}: SonesToDecibelsSVGProps) {
  const hasResults = decibels !== undefined || sones !== undefined;

  // Common sound levels for reference
  const soundLevels = [
    { db: 30, label: 'Whisper', icon: '🤫' },
    { db: 40, label: 'Library', icon: '📚' },
    { db: 50, label: 'Quiet Office', icon: '💼' },
    { db: 60, label: 'Normal Talk', icon: '🗣️' },
    { db: 70, label: 'Vacuum', icon: '🧹' },
    { db: 80, label: 'Busy Traffic', icon: '🚗' },
  ];

  // Calculate bar position for current decibel level
  const chartX = 30;
  const chartWidth = 340;
  const minDB = 25;
  const maxDB = 85;
  const dbToX = (db: number) => chartX + ((db - minDB) / (maxDB - minDB)) * chartWidth;

  const currentX = decibels ? dbToX(decibels) : null;

  // Get loudness description
  const getLoudnessDescription = () => {
    if (!decibels) return '';
    if (decibels < 35) return 'Very Quiet';
    if (decibels < 45) return 'Quiet';
    if (decibels < 55) return 'Moderate';
    if (decibels < 65) return 'Normal';
    if (decibels < 75) return 'Loud';
    return 'Very Loud';
  };

  return (
    <CalculatorSVG
      title="Sound Level Comparison"
      description="Compare sones and decibels with common sounds"
      aspectRatio="wide"
    >
      <svg
        viewBox="0 0 400 200"
        className="w-full h-full"
        preserveAspectRatio="xMidYMid meet"
      >
        {/* Background */}
        <rect width="400" height="200" fill="#f8fafc" />

        {/* Title area */}
        <g transform="translate(200, 20)">
          <text x={0} y={0} fontSize="12" fill={SVG_COLORS.text} fontWeight="bold" textAnchor="middle">
            Sound Level Scale
          </text>
        </g>

        {/* Main scale bar */}
        <g transform="translate(0, 50)">
          {/* Scale background - gradient from green to yellow to red */}
          <defs>
            <linearGradient id="sound-gradient" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor={SVG_COLORS.good} />
              <stop offset="40%" stopColor="#a3e635" />
              <stop offset="60%" stopColor={SVG_COLORS.warning} />
              <stop offset="100%" stopColor={SVG_COLORS.danger} />
            </linearGradient>
          </defs>

          <rect
            x={chartX}
            y={0}
            width={chartWidth}
            height={20}
            rx={4}
            fill="url(#sound-gradient)"
            opacity={0.3}
          />
          <rect
            x={chartX}
            y={0}
            width={chartWidth}
            height={20}
            rx={4}
            fill="none"
            stroke={SVG_COLORS.strokeLight}
            strokeWidth={1}
          />

          {/* Decibel markers */}
          {[30, 40, 50, 60, 70, 80].map((db) => {
            const x = dbToX(db);
            return (
              <g key={db}>
                <line
                  x1={x}
                  y1={0}
                  x2={x}
                  y2={20}
                  stroke={SVG_COLORS.stroke}
                  strokeWidth={0.5}
                />
                <text x={x} y={35} fontSize="9" fill={SVG_COLORS.text} textAnchor="middle">
                  {db} dB
                </text>
              </g>
            );
          })}

          {/* Current level indicator */}
          {currentX && hasResults && (
            <g>
              <polygon
                points={`${currentX - 8},0 ${currentX + 8},0 ${currentX},-12`}
                fill={SVG_COLORS.accent}
              />
              <line
                x1={currentX}
                y1={0}
                x2={currentX}
                y2={20}
                stroke={SVG_COLORS.accent}
                strokeWidth={2}
              />
            </g>
          )}
        </g>

        {/* Sound reference icons */}
        <g transform="translate(0, 100)">
          {soundLevels.map((sound, i) => {
            const x = dbToX(sound.db);
            const isActive = decibels && Math.abs(decibels - sound.db) < 7;
            return (
              <g key={sound.db}>
                <text
                  x={x}
                  y={0}
                  fontSize="16"
                  textAnchor="middle"
                  opacity={isActive ? 1 : 0.5}
                >
                  {sound.icon}
                </text>
                <text
                  x={x}
                  y={18}
                  fontSize="7"
                  fill={isActive ? SVG_COLORS.primary : SVG_COLORS.textLight}
                  textAnchor="middle"
                  fontWeight={isActive ? 'bold' : 'normal'}
                >
                  {sound.label}
                </text>
              </g>
            );
          })}
        </g>

        {/* Results panel */}
        <g transform="translate(110, 135)">
          <rect x={0} y={0} width={180} height={55} fill="white" stroke={SVG_COLORS.strokeLight} rx={6} />

          <text x={90} y={18} fontSize="10" fill={SVG_COLORS.textLight} textAnchor="middle">
            {conversionDirection === 'sones-to-db' ? 'Sones → Decibels' : 'Decibels → Sones'}
          </text>

          {/* Conversion result */}
          <g transform="translate(10, 30)">
            <text x={0} y={0} fontSize="10" fill={SVG_COLORS.text}>
              {conversionDirection === 'sones-to-db' ? `${sones ?? '—'} sones` : `${decibels ?? '—'} dB`}
            </text>
            <text x={70} y={0} fontSize="12" fill={SVG_COLORS.primary} fontWeight="bold">
              →
            </text>
            <text x={90} y={0} fontSize="10" fill={SVG_COLORS.accent} fontWeight="bold">
              {conversionDirection === 'sones-to-db' ? `${decibels?.toFixed(1) ?? '—'} dB` : `${sones?.toFixed(2) ?? '—'} sones`}
            </text>
          </g>

          {/* Loudness description */}
          {hasResults && (
            <text x={90} y={45} fontSize="9" fill={SVG_COLORS.primary} textAnchor="middle">
              {getLoudnessDescription()}
            </text>
          )}
        </g>

        {/* Formula reference */}
        <g transform="translate(30, 195)">
          <text x={0} y={0} fontSize="7" fill={SVG_COLORS.textLight}>
            1 sone = 40 dB | Formula: dB = 33.2 × log₁₀(sones) + 40
          </text>
        </g>
      </svg>
    </CalculatorSVG>
  );
}
