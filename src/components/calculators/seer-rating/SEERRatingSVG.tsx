'use client';

import CalculatorSVG, { SVG_COLORS } from '../CalculatorSVG';

interface SEERRatingSVGProps {
  seerRating?: number;
  eer?: number;
  annualCost?: number;
  annualKWh?: number;
  savingsVsOld?: number;
  oldSEER?: number;
}

/**
 * SVG visualization for SEER Rating Calculator
 * Shows efficiency comparison and annual savings
 */
export default function SEERRatingSVG({
  seerRating,
  eer,
  annualCost,
  annualKWh,
  savingsVsOld,
  oldSEER = 10,
}: SEERRatingSVGProps) {
  const hasResults = seerRating !== undefined;

  // SEER efficiency color and rating
  const getSEERColor = () => {
    if (!seerRating) return SVG_COLORS.textLight;
    if (seerRating >= 21) return '#15803d'; // Excellent - green-700
    if (seerRating >= 18) return SVG_COLORS.good;
    if (seerRating >= 16) return SVG_COLORS.primary;
    if (seerRating >= 14) return SVG_COLORS.warning;
    return SVG_COLORS.danger;
  };

  const getSEERLabel = () => {
    if (!seerRating) return '';
    if (seerRating >= 21) return 'Excellent';
    if (seerRating >= 18) return 'Very Good';
    if (seerRating >= 16) return 'Good';
    if (seerRating >= 14) return 'Standard';
    return 'Low';
  };

  // Efficiency scale position
  const minSEER = 8;
  const maxSEER = 25;
  const seerToX = (seer: number) => 30 + ((seer - minSEER) / (maxSEER - minSEER)) * 160;
  const currentX = seerRating ? seerToX(seerRating) : seerToX(14);
  const oldX = seerToX(oldSEER);

  // Energy bar comparison
  const maxKWh = 3000;
  const newBarHeight = annualKWh ? Math.min((annualKWh / maxKWh) * 70, 70) : 40;
  const oldKWh = seerRating && annualKWh ? (annualKWh * seerRating) / oldSEER : 0;
  const oldBarHeight = oldKWh ? Math.min((oldKWh / maxKWh) * 70, 70) : 60;

  return (
    <CalculatorSVG
      title="SEER Efficiency Rating"
      description="Seasonal energy efficiency comparison"
      aspectRatio="wide"
    >
      <svg
        viewBox="0 0 400 210"
        className="w-full h-full"
        preserveAspectRatio="xMidYMid meet"
      >
        {/* Background */}
        <rect width="400" height="210" fill="#f8fafc" />

        {/* SEER scale */}
        <g transform="translate(0, 25)">
          <text x={30} y={-5} fontSize="10" fill={SVG_COLORS.text} fontWeight="bold">
            SEER Efficiency Scale
          </text>

          {/* Scale bar with gradient */}
          <defs>
            <linearGradient id="seer-gradient" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor={SVG_COLORS.danger} />
              <stop offset="30%" stopColor={SVG_COLORS.warning} />
              <stop offset="60%" stopColor={SVG_COLORS.primary} />
              <stop offset="100%" stopColor={SVG_COLORS.good} />
            </linearGradient>
          </defs>
          <rect x={30} y={5} width={160} height={15} fill="url(#seer-gradient)" rx={3} />

          {/* Scale markers */}
          {[8, 10, 13, 16, 20, 25].map((seer) => {
            const x = seerToX(seer);
            return (
              <g key={seer}>
                <line x1={x} y1={5} x2={x} y2={20} stroke="white" strokeWidth={1} />
                <text x={x} y={32} fontSize="7" fill={SVG_COLORS.textLight} textAnchor="middle">
                  {seer}
                </text>
              </g>
            );
          })}

          {/* Old SEER marker */}
          {hasResults && (
            <g>
              <circle cx={oldX} cy={12} r={6} fill={SVG_COLORS.danger} stroke="white" strokeWidth={1.5} />
              <text x={oldX} y={48} fontSize="7" fill={SVG_COLORS.danger} textAnchor="middle">
                Old: {oldSEER}
              </text>
            </g>
          )}

          {/* Current SEER marker */}
          {hasResults && (
            <g>
              <circle cx={currentX} cy={12} r={8} fill={getSEERColor()} stroke="white" strokeWidth={2} />
              <text x={currentX} y={-12} fontSize="10" fill={getSEERColor()} fontWeight="bold" textAnchor="middle">
                {seerRating}
              </text>
            </g>
          )}

          {/* Rating label */}
          <g transform="translate(195, 0)">
            <rect x={0} y={3} width={55} height={20} fill={getSEERColor()} rx={4} />
            <text x={27} y={17} fontSize="9" fill="white" fontWeight="bold" textAnchor="middle">
              {getSEERLabel()}
            </text>
          </g>
        </g>

        {/* Energy comparison bars */}
        <g transform="translate(30, 82)">
          <text x={0} y={0} fontSize="9" fill={SVG_COLORS.text} fontWeight="bold">
            Annual Energy Use
          </text>

          {/* Old system bar */}
          <g transform="translate(0, 15)">
            <rect x={0} y={80 - oldBarHeight} width={60} height={oldBarHeight} fill={SVG_COLORS.danger} opacity={0.6} rx={4} />
            <text x={30} y={90} fontSize="8" fill={SVG_COLORS.text} textAnchor="middle">
              Old ({oldSEER})
            </text>
            <text x={30} y={72 - oldBarHeight} fontSize="9" fill={SVG_COLORS.danger} fontWeight="bold" textAnchor="middle">
              {oldKWh ? `${oldKWh.toFixed(0)}` : '—'}
            </text>
          </g>

          {/* New system bar */}
          <g transform="translate(80, 15)">
            <rect x={0} y={80 - newBarHeight} width={60} height={newBarHeight} fill={getSEERColor()} rx={4} />
            <text x={30} y={90} fontSize="8" fill={SVG_COLORS.text} textAnchor="middle">
              New ({seerRating ?? '—'})
            </text>
            <text x={30} y={72 - newBarHeight} fontSize="9" fill={getSEERColor()} fontWeight="bold" textAnchor="middle">
              {annualKWh ? `${annualKWh.toFixed(0)}` : '—'}
            </text>
          </g>

          <text x={70} y={110} fontSize="8" fill={SVG_COLORS.textLight} textAnchor="middle">
            kWh/year
          </text>

          {/* Savings arrow */}
          {savingsVsOld && savingsVsOld > 0 && (
            <g transform="translate(145, 55)">
              <path d="M0,10 L20,10" stroke={SVG_COLORS.good} strokeWidth={2} markerEnd="url(#savings-arrow)" />
              <text x={0} y={0} fontSize="9" fill={SVG_COLORS.good} fontWeight="bold">
                -{((savingsVsOld / (annualCost! + savingsVsOld)) * 100).toFixed(0)}%
              </text>
              <text x={0} y={25} fontSize="8" fill={SVG_COLORS.good}>
                Less Energy
              </text>
            </g>
          )}
        </g>

        {/* Results panel */}
        <g transform="translate(230, 70)">
          <rect x={0} y={0} width={150} height={115} fill="white" stroke={SVG_COLORS.strokeLight} rx={6} />

          <text x={75} y={18} fontSize="10" fill={SVG_COLORS.text} fontWeight="bold" textAnchor="middle">
            Annual Costs
          </text>
          <line x1={10} y1={26} x2={140} y2={26} stroke={SVG_COLORS.strokeLight} />

          {/* Annual cost */}
          <g transform="translate(10, 42)">
            <text x={0} y={0} fontSize="9" fill={SVG_COLORS.textLight}>Operating Cost</text>
            <text x={125} y={0} fontSize="14" fill={SVG_COLORS.accent} fontWeight="bold" textAnchor="end">
              ${annualCost?.toFixed(0) ?? '—'}
            </text>
          </g>

          {/* Savings */}
          <g transform="translate(10, 68)">
            <text x={0} y={0} fontSize="9" fill={SVG_COLORS.textLight}>Annual Savings</text>
            <text x={125} y={0} fontSize="12" fill={SVG_COLORS.good} fontWeight="bold" textAnchor="end">
              ${savingsVsOld?.toFixed(0) ?? '—'}
            </text>
          </g>

          {/* EER */}
          <line x1={10} y1={80} x2={140} y2={80} stroke={SVG_COLORS.strokeLight} />
          <g transform="translate(10, 95)">
            <text x={0} y={0} fontSize="8" fill={SVG_COLORS.textLight}>EER Rating</text>
            <text x={125} y={0} fontSize="10" fill={SVG_COLORS.primary} fontWeight="bold" textAnchor="end">
              {eer?.toFixed(1) ?? '—'}
            </text>
          </g>
        </g>

        {/* SEER context */}
        <g transform="translate(30, 198)">
          <text x={0} y={0} fontSize="7" fill={SVG_COLORS.textLight}>
            SEER = BTU cooling ÷ Watt-hours | Min standard: 14 SEER (2023) | Energy Star: 15+ SEER
          </text>
        </g>

        {/* Arrow marker */}
        <defs>
          <marker
            id="savings-arrow"
            markerWidth="6"
            markerHeight="6"
            refX="5"
            refY="3"
            orient="auto"
          >
            <path d="M0,0 L0,6 L6,3 z" fill={SVG_COLORS.good} />
          </marker>
        </defs>
      </svg>
    </CalculatorSVG>
  );
}
