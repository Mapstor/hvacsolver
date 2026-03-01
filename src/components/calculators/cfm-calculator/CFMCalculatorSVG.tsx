'use client';

import CalculatorSVG, { SVG_COLORS } from '../CalculatorSVG';

interface CFMCalculatorSVGProps {
  cfm?: number;
  velocity?: number;
  ductArea?: number;
  ductDiameter?: number;
  ductWidth?: number;
  ductHeight?: number;
  calculationMode?: 'room_ach' | 'duct_velocity' | 'hvac_tonnage' | 'exhaust_hood';
  // Room mode props
  roomVolume?: number;
  ach?: number;
  roomType?: string;
  // HVAC tonnage mode props
  tons?: number;
  // Exhaust hood mode props
  hoodLength?: number;
  hoodType?: string;
}

/**
 * SVG visualization for CFM Calculator
 * Adapts visualization based on calculation mode
 */
export default function CFMCalculatorSVG({
  cfm,
  velocity,
  ductDiameter,
  ductWidth,
  ductHeight,
  calculationMode = 'duct_velocity',
  roomVolume,
  ach,
  roomType,
  tons,
  hoodLength,
  hoodType,
}: CFMCalculatorSVGProps) {
  const hasResults = cfm !== undefined;

  // Render different visualizations based on mode
  if (calculationMode === 'room_ach') {
    return <RoomVentilationSVG cfm={cfm} roomVolume={roomVolume} ach={ach} roomType={roomType} />;
  }

  if (calculationMode === 'hvac_tonnage') {
    return <HVACTonnageSVG cfm={cfm} tons={tons} />;
  }

  if (calculationMode === 'exhaust_hood') {
    return <ExhaustHoodSVG cfm={cfm} hoodLength={hoodLength} hoodType={hoodType} />;
  }

  // Default: Duct Velocity visualization
  return (
    <DuctVelocitySVG
      cfm={cfm}
      velocity={velocity}
      ductDiameter={ductDiameter}
      ductWidth={ductWidth}
      ductHeight={ductHeight}
      hasResults={hasResults}
    />
  );
}

// Room Ventilation (ACH) Visualization
function RoomVentilationSVG({
  cfm,
  roomVolume,
  ach,
  roomType,
}: {
  cfm?: number;
  roomVolume?: number;
  ach?: number;
  roomType?: string;
}) {
  const hasResults = cfm !== undefined;

  // Get ACH rating
  const getACHRating = () => {
    if (!ach) return { text: '', color: SVG_COLORS.textLight };
    if (ach < 3) return { text: 'Low Ventilation', color: SVG_COLORS.warning };
    if (ach < 6) return { text: 'Standard', color: SVG_COLORS.good };
    if (ach < 12) return { text: 'Good', color: SVG_COLORS.good };
    return { text: 'High Ventilation', color: SVG_COLORS.primary };
  };

  const rating = getACHRating();

  return (
    <CalculatorSVG
      title="Room Ventilation"
      description="Air changes per hour visualization"
      aspectRatio="wide"
    >
      <svg viewBox="0 0 400 220" className="w-full h-full" preserveAspectRatio="xMidYMid meet">
        {/* Background */}
        <rect width="400" height="220" fill="#f8fafc" />

        {/* 3D Room Isometric View */}
        <g transform="translate(40, 30)">
          <text x={100} y={-8} fontSize="11" fill={SVG_COLORS.text} fontWeight="600" textAnchor="middle">
            Room Air Circulation
          </text>

          {/* Room floor (parallelogram for 3D effect) */}
          <polygon
            points="20,100 100,60 180,100 100,140"
            fill="#e2e8f0"
            stroke={SVG_COLORS.stroke}
            strokeWidth={1.5}
          />

          {/* Room back walls */}
          <polygon
            points="20,100 20,40 100,0 100,60"
            fill="#f1f5f9"
            stroke={SVG_COLORS.stroke}
            strokeWidth={1.5}
          />
          <polygon
            points="100,0 180,40 180,100 100,60"
            fill="#e8eef3"
            stroke={SVG_COLORS.stroke}
            strokeWidth={1.5}
          />

          {/* Air circulation arrows - animated */}
          {hasResults && (
            <>
              {/* Circular airflow pattern */}
              <g opacity={0.8}>
                {/* Air intake arrow (bottom left) */}
                <path
                  d="M30,90 Q50,80 70,75"
                  fill="none"
                  stroke={SVG_COLORS.primary}
                  strokeWidth={2.5}
                  strokeLinecap="round"
                  markerEnd="url(#arrowhead)"
                >
                  <animate
                    attributeName="stroke-dasharray"
                    values="0,100;40,60;0,100"
                    dur="2s"
                    repeatCount="indefinite"
                  />
                </path>

                {/* Rising air */}
                <path
                  d="M80,70 Q90,50 100,35"
                  fill="none"
                  stroke={SVG_COLORS.primary}
                  strokeWidth={2.5}
                  strokeLinecap="round"
                  markerEnd="url(#arrowhead)"
                >
                  <animate
                    attributeName="stroke-dasharray"
                    values="0,100;35,65;0,100"
                    dur="2s"
                    begin="0.3s"
                    repeatCount="indefinite"
                  />
                </path>

                {/* Top air movement */}
                <path
                  d="M105,30 Q130,25 150,35"
                  fill="none"
                  stroke={SVG_COLORS.primary}
                  strokeWidth={2.5}
                  strokeLinecap="round"
                  markerEnd="url(#arrowhead)"
                >
                  <animate
                    attributeName="stroke-dasharray"
                    values="0,100;40,60;0,100"
                    dur="2s"
                    begin="0.6s"
                    repeatCount="indefinite"
                  />
                </path>

                {/* Descending air */}
                <path
                  d="M155,40 Q160,60 150,80"
                  fill="none"
                  stroke={SVG_COLORS.primary}
                  strokeWidth={2.5}
                  strokeLinecap="round"
                  markerEnd="url(#arrowhead)"
                >
                  <animate
                    attributeName="stroke-dasharray"
                    values="0,100;35,65;0,100"
                    dur="2s"
                    begin="0.9s"
                    repeatCount="indefinite"
                  />
                </path>

                {/* Return to intake */}
                <path
                  d="M145,85 Q100,95 50,95"
                  fill="none"
                  stroke={SVG_COLORS.primary}
                  strokeWidth={2.5}
                  strokeLinecap="round"
                  markerEnd="url(#arrowhead)"
                >
                  <animate
                    attributeName="stroke-dasharray"
                    values="0,100;50,50;0,100"
                    dur="2s"
                    begin="1.2s"
                    repeatCount="indefinite"
                  />
                </path>
              </g>

              {/* Vent icon in wall */}
              <rect x={35} y={55} width={25} height={15} fill="white" stroke={SVG_COLORS.stroke} strokeWidth={1} rx={2} />
              <line x1={40} y1={58} x2={40} y2={67} stroke={SVG_COLORS.strokeLight} strokeWidth={1} />
              <line x1={47} y1={58} x2={47} y2={67} stroke={SVG_COLORS.strokeLight} strokeWidth={1} />
              <line x1={54} y1={58} x2={54} y2={67} stroke={SVG_COLORS.strokeLight} strokeWidth={1} />
            </>
          )}

          {/* Arrow marker definition */}
          <defs>
            <marker
              id="arrowhead"
              markerWidth="8"
              markerHeight="8"
              refX="6"
              refY="4"
              orient="auto"
            >
              <polygon points="0,0 8,4 0,8" fill={SVG_COLORS.primary} />
            </marker>
          </defs>

          {/* Room label inside */}
          {roomType && (
            <text x={100} y={85} fontSize="9" fill={SVG_COLORS.textLight} textAnchor="middle">
              {roomType}
            </text>
          )}
        </g>

        {/* Results Panel */}
        <g transform="translate(230, 25)">
          <rect x={0} y={0} width={150} height={105} fill="white" stroke={SVG_COLORS.strokeLight} strokeWidth={1} rx={8} />

          {/* CFM Result */}
          <text x={75} y={22} fontSize="10" fill={SVG_COLORS.textLight} textAnchor="middle">
            Required Airflow
          </text>
          <text x={75} y={50} fontSize="26" fill={SVG_COLORS.accent} fontWeight="bold" textAnchor="middle">
            {cfm ? cfm.toLocaleString() : '—'}
          </text>
          <text x={75} y={65} fontSize="11" fill={SVG_COLORS.text} textAnchor="middle">
            CFM
          </text>

          {/* ACH indicator */}
          {ach && (
            <g transform="translate(0, 75)">
              <line x1={15} y1={0} x2={135} y2={0} stroke={SVG_COLORS.strokeLight} strokeWidth={1} />
              <text x={75} y={18} fontSize="10" fill={rating.color} fontWeight="500" textAnchor="middle">
                {ach} ACH • {rating.text}
              </text>
            </g>
          )}
        </g>

        {/* Room Volume Info */}
        <g transform="translate(230, 140)">
          <rect x={0} y={0} width={150} height={55} fill="#f8fafc" stroke={SVG_COLORS.strokeLight} strokeWidth={1} rx={6} />

          <text x={75} y={18} fontSize="9" fill={SVG_COLORS.textLight} textAnchor="middle">
            Room Volume
          </text>
          <text x={75} y={36} fontSize="14" fill={SVG_COLORS.text} fontWeight="600" textAnchor="middle">
            {roomVolume ? roomVolume.toLocaleString() : '—'} cu ft
          </text>
          <text x={75} y={50} fontSize="8" fill={SVG_COLORS.textLight} textAnchor="middle">
            {roomVolume ? `${(roomVolume * 0.0283168).toFixed(1)} m³` : ''}
          </text>
        </g>

        {/* Formula */}
        <g transform="translate(40, 200)">
          <text x={0} y={0} fontSize="9" fill={SVG_COLORS.textLight}>
            CFM = (Room Volume × ACH) ÷ 60 minutes
          </text>
        </g>
      </svg>
    </CalculatorSVG>
  );
}

// Duct Velocity Visualization - Clean professional two-column layout
function DuctVelocitySVG({
  cfm,
  velocity,
  ductDiameter,
  ductWidth,
  ductHeight,
  hasResults,
}: {
  cfm?: number;
  velocity?: number;
  ductDiameter?: number;
  ductWidth?: number;
  ductHeight?: number;
  hasResults: boolean;
}) {
  // Velocity color coding
  const getVelocityColor = () => {
    if (!velocity) return SVG_COLORS.textLight;
    if (velocity < 600) return SVG_COLORS.good;
    if (velocity < 900) return SVG_COLORS.primary;
    if (velocity < 1200) return SVG_COLORS.warning;
    return SVG_COLORS.danger;
  };

  // Velocity assessment
  const getVelocityRating = () => {
    if (!velocity) return { text: '', short: '' };
    if (velocity < 500) return { text: 'Low - Quiet', short: 'Quiet' };
    if (velocity < 700) return { text: 'Optimal', short: 'Optimal' };
    if (velocity < 900) return { text: 'Moderate', short: 'Moderate' };
    if (velocity < 1200) return { text: 'High', short: 'High' };
    return { text: 'Too High', short: 'Too High' };
  };

  const isRound = ductDiameter !== undefined && !ductWidth;
  const rating = getVelocityRating();

  // Calculate duct area for display
  const getDuctArea = () => {
    if (isRound && ductDiameter) {
      const radiusFeet = ductDiameter / 2 / 12;
      return (Math.PI * radiusFeet * radiusFeet * 144).toFixed(1);
    } else if (ductWidth && ductHeight) {
      return (ductWidth * ductHeight).toFixed(1);
    }
    return '—';
  };

  return (
    <CalculatorSVG
      title="Duct Airflow"
      description="CFM from duct velocity and area"
      aspectRatio="wide"
    >
      <svg viewBox="0 0 400 180" className="w-full h-full" preserveAspectRatio="xMidYMid meet">
        {/* Background */}
        <rect width="400" height="180" fill="#f8fafc" />

        {/* LEFT COLUMN: Duct Illustration */}
        <g transform="translate(15, 12)">
          {/* Section title */}
          <text x={85} y={10} fontSize="10" fill={SVG_COLORS.text} fontWeight="600" textAnchor="middle">
            Duct Side View
          </text>

          {/* Duct body */}
          <g transform="translate(0, 18)">
            {/* Outer duct shell */}
            <rect x={0} y={0} width={170} height={45} fill="#cbd5e1" stroke={SVG_COLORS.stroke} strokeWidth={1.5} rx={2} />

            {/* Inner duct airway */}
            <rect x={4} y={4} width={162} height={37} fill="white" stroke={SVG_COLORS.strokeLight} strokeWidth={1} />

            {/* Airflow arrows */}
            {hasResults && (
              <g>
                {[0, 1, 2].map((i) => {
                  const y = 12 + i * 11;
                  return (
                    <g key={i}>
                      <line
                        x1={15}
                        y1={y}
                        x2={135}
                        y2={y}
                        stroke={getVelocityColor()}
                        strokeWidth={2}
                        strokeDasharray="10,5"
                        opacity={0.7}
                      >
                        <animate
                          attributeName="stroke-dashoffset"
                          from="0"
                          to="-30"
                          dur={`${1.2 - i * 0.15}s`}
                          repeatCount="indefinite"
                        />
                      </line>
                      <polygon
                        points={`150,${y} 140,${y - 4} 140,${y + 4}`}
                        fill={getVelocityColor()}
                        opacity={0.8}
                      />
                    </g>
                  );
                })}
              </g>
            )}

            {/* Velocity badge */}
            <rect x={55} y={13} width={60} height={18} fill="white" stroke={getVelocityColor()} strokeWidth={1.5} rx={4} />
            <text x={85} y={26} fontSize="10" fill={getVelocityColor()} fontWeight="bold" textAnchor="middle">
              {velocity ? `${velocity} FPM` : '— FPM'}
            </text>
          </g>

          {/* Cross-section below */}
          <g transform="translate(0, 75)">
            <text x={85} y={0} fontSize="9" fill={SVG_COLORS.text} fontWeight="500" textAnchor="middle">
              Cross Section
            </text>

            {isRound ? (
              // Round duct cross-section
              <g transform="translate(50, 10)">
                <circle cx={35} cy={28} r={26} fill="#cbd5e1" stroke={SVG_COLORS.stroke} strokeWidth={1.5} />
                <circle cx={35} cy={28} r={21} fill="white" stroke={SVG_COLORS.strokeLight} strokeWidth={1} />
                <line x1={9} y1={28} x2={61} y2={28} stroke={SVG_COLORS.primary} strokeWidth={1} strokeDasharray="3,2" />
                <circle cx={9} cy={28} r={2} fill={SVG_COLORS.primary} />
                <circle cx={61} cy={28} r={2} fill={SVG_COLORS.primary} />
                {hasResults && (
                  <circle cx={35} cy={28} r={3} fill={getVelocityColor()} opacity={0.6}>
                    <animate attributeName="r" values="2;5;2" dur="1.5s" repeatCount="indefinite" />
                  </circle>
                )}
                <text x={35} y={62} fontSize="9" fill={SVG_COLORS.text} fontWeight="500" textAnchor="middle">
                  {ductDiameter ? `${ductDiameter}" dia` : '—'}
                </text>
              </g>
            ) : (
              // Rectangular duct cross-section
              <g transform="translate(35, 10)">
                <rect x={10} y={5} width={70} height={42} fill="#cbd5e1" stroke={SVG_COLORS.stroke} strokeWidth={1.5} rx={2} />
                <rect x={15} y={10} width={60} height={32} fill="white" stroke={SVG_COLORS.strokeLight} strokeWidth={1} />
                <line x1={15} y1={52} x2={75} y2={52} stroke={SVG_COLORS.primary} strokeWidth={1} />
                <line x1={80} y1={10} x2={80} y2={42} stroke={SVG_COLORS.primary} strokeWidth={1} />
                {hasResults && (
                  <circle cx={45} cy={26} r={3} fill={getVelocityColor()} opacity={0.6}>
                    <animate attributeName="r" values="2;5;2" dur="1.5s" repeatCount="indefinite" />
                  </circle>
                )}
                <text x={55} y={62} fontSize="9" fill={SVG_COLORS.text} fontWeight="500" textAnchor="middle">
                  {ductWidth && ductHeight ? `${ductWidth}" × ${ductHeight}"` : '—'}
                </text>
              </g>
            )}
          </g>
        </g>

        {/* RIGHT COLUMN: Results */}
        <g transform="translate(210, 12)">
          {/* Main results card */}
          <rect x={0} y={0} width={175} height={100} fill="white" stroke={SVG_COLORS.strokeLight} strokeWidth={1} rx={6} />

          <text x={87} y={18} fontSize="10" fill={SVG_COLORS.text} fontWeight="bold" textAnchor="middle">
            Airflow Results
          </text>
          <line x1={10} y1={26} x2={165} y2={26} stroke={SVG_COLORS.strokeLight} />

          {/* CFM result */}
          <text x={87} y={52} fontSize="26" fill={SVG_COLORS.primary} fontWeight="bold" textAnchor="middle">
            {cfm ? cfm.toLocaleString() : '—'}
          </text>
          <text x={87} y={66} fontSize="9" fill={SVG_COLORS.textLight} textAnchor="middle">CFM</text>

          {/* Velocity rating badge */}
          {velocity && (
            <g>
              <rect x={47} y={74} width={80} height={16} fill={getVelocityColor()} rx={8} />
              <text x={87} y={86} fontSize="8" fill="white" fontWeight="bold" textAnchor="middle">
                {rating.text}
              </text>
            </g>
          )}

          {/* Specifications card */}
          <rect x={0} y={108} width={175} height={58} fill="#f1f5f9" stroke={SVG_COLORS.strokeLight} strokeWidth={1} rx={4} />

          <text x={15} y={124} fontSize="8" fill={SVG_COLORS.textLight}>Duct Area:</text>
          <text x={160} y={124} fontSize="9" fill={SVG_COLORS.text} fontWeight="500" textAnchor="end">
            {getDuctArea()} sq in
          </text>

          <text x={15} y={140} fontSize="8" fill={SVG_COLORS.textLight}>Velocity:</text>
          <text x={160} y={140} fontSize="9" fill={getVelocityColor()} fontWeight="500" textAnchor="end">
            {velocity ? `${velocity} FPM` : '—'}
          </text>

          <line x1={10} y1={148} x2={165} y2={148} stroke={SVG_COLORS.strokeLight} />
          <text x={87} y={161} fontSize="8" fill={SVG_COLORS.textLight} textAnchor="middle">
            CFM = Velocity × Area (sq ft)
          </text>
        </g>
      </svg>
    </CalculatorSVG>
  );
}

// HVAC Tonnage Visualization
function HVACTonnageSVG({ cfm, tons }: { cfm?: number; tons?: number }) {
  return (
    <CalculatorSVG
      title="HVAC Airflow"
      description="CFM from system tonnage"
      aspectRatio="wide"
    >
      <svg viewBox="0 0 400 180" className="w-full h-full" preserveAspectRatio="xMidYMid meet">
        {/* Background */}
        <rect width="400" height="180" fill="#f8fafc" />

        <defs>
          <marker id="hvac-arrow" markerWidth="8" markerHeight="8" refX="6" refY="4" orient="auto">
            <polygon points="0,0 8,4 0,8" fill={SVG_COLORS.primary} />
          </marker>
        </defs>

        {/* LEFT COLUMN: HVAC Unit Illustration */}
        <g transform="translate(15, 15)">
          {/* Section title */}
          <text x={85} y={12} fontSize="10" fill={SVG_COLORS.text} fontWeight="600" textAnchor="middle">
            HVAC System Airflow
          </text>

          {/* Air handler unit */}
          <rect x={25} y={28} width={120} height={85} fill="#e2e8f0" stroke={SVG_COLORS.stroke} strokeWidth={2} rx={4} />

          {/* Fan circle */}
          <circle cx={85} cy={70} r={24} fill="white" stroke={SVG_COLORS.stroke} strokeWidth={1.5} />

          {/* Fan blades (animated) */}
          <g transform="translate(85, 70)">
            <g>
              {cfm && (
                <animateTransform
                  attributeName="transform"
                  type="rotate"
                  from="0"
                  to="360"
                  dur="2s"
                  repeatCount="indefinite"
                />
              )}
              <line x1={-17} y1={0} x2={17} y2={0} stroke={SVG_COLORS.primary} strokeWidth={3} strokeLinecap="round" />
              <line x1={0} y1={-17} x2={0} y2={17} stroke={SVG_COLORS.primary} strokeWidth={3} strokeLinecap="round" />
              <line x1={-12} y1={-12} x2={12} y2={12} stroke={SVG_COLORS.primary} strokeWidth={3} strokeLinecap="round" />
              <line x1={-12} y1={12} x2={12} y2={-12} stroke={SVG_COLORS.primary} strokeWidth={3} strokeLinecap="round" />
            </g>
          </g>

          {/* Center hub */}
          <circle cx={85} cy={70} r={5} fill={SVG_COLORS.stroke} />

          {/* Supply duct (right) */}
          <rect x={145} y={50} width={40} height={28} fill="#e2e8f0" stroke={SVG_COLORS.stroke} strokeWidth={1.5} />

          {/* Airflow arrows */}
          {cfm && (
            <path d="M150,64 L175,64" fill="none" stroke={SVG_COLORS.primary} strokeWidth={2.5} strokeLinecap="round" markerEnd="url(#hvac-arrow)">
              <animate attributeName="stroke-dasharray" values="0,30;25,5;0,30" dur="1.5s" repeatCount="indefinite" />
            </path>
          )}

          {/* Unit label */}
          <text x={85} y={128} fontSize="10" fill={SVG_COLORS.textLight} textAnchor="middle">
            {tons ? `${tons} Ton Unit` : 'HVAC Unit'}
          </text>

          {/* Formula box at bottom */}
          <rect x={0} y={140} width={170} height={28} fill="#f1f5f9" stroke={SVG_COLORS.strokeLight} strokeWidth={1} rx={4} />
          <text x={85} y={158} fontSize="8" fill={SVG_COLORS.textLight} textAnchor="middle">
            CFM = Tonnage × 400 CFM/ton
          </text>
        </g>

        {/* RIGHT COLUMN: Results */}
        <g transform="translate(210, 15)">
          {/* Results Panel */}
          <rect x={0} y={0} width={170} height={90} fill="white" stroke={SVG_COLORS.strokeLight} strokeWidth={1} rx={8} />

          <text x={85} y={20} fontSize="10" fill={SVG_COLORS.textLight} textAnchor="middle">
            Required Airflow
          </text>
          <text x={85} y={50} fontSize="28" fill={SVG_COLORS.accent} fontWeight="bold" textAnchor="middle">
            {cfm ? cfm.toLocaleString() : '—'}
          </text>
          <text x={85} y={68} fontSize="12" fill={SVG_COLORS.text} textAnchor="middle">
            CFM
          </text>

          {tons && (
            <text x={85} y={83} fontSize="9" fill={SVG_COLORS.textLight} textAnchor="middle">
              @ 400 CFM per ton
            </text>
          )}

          {/* Typical Range Reference */}
          <rect x={0} y={100} width={170} height={53} fill="#f8fafc" stroke={SVG_COLORS.strokeLight} strokeWidth={1} rx={6} />

          <text x={85} y={118} fontSize="9" fill={SVG_COLORS.textLight} textAnchor="middle">
            Typical CFM/Ton Range
          </text>
          <text x={85} y={136} fontSize="14" fill={SVG_COLORS.text} fontWeight="600" textAnchor="middle">
            350 – 450
          </text>
          <text x={85} y={148} fontSize="8" fill={SVG_COLORS.textLight} textAnchor="middle">
            CFM per ton
          </text>
        </g>
      </svg>
    </CalculatorSVG>
  );
}

// Exhaust Hood Visualization
function ExhaustHoodSVG({
  cfm,
  hoodLength,
  hoodType,
}: {
  cfm?: number;
  hoodLength?: number;
  hoodType?: string;
}) {
  // Format hood type for display
  const formatHoodType = (type?: string) => {
    if (!type) return '';
    return type.split('_').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' ');
  };

  return (
    <CalculatorSVG
      title="Exhaust Hood"
      description="Kitchen hood ventilation CFM"
      aspectRatio="wide"
    >
      <svg viewBox="0 0 400 180" className="w-full h-full" preserveAspectRatio="xMidYMid meet">
        {/* Background */}
        <rect width="400" height="180" fill="#f8fafc" />

        {/* LEFT COLUMN: Kitchen Hood Illustration */}
        <g transform="translate(15, 12)">
          {/* Title */}
          <text x={85} y={10} fontSize="10" fill={SVG_COLORS.text} fontWeight="600" textAnchor="middle">
            Kitchen Exhaust Hood
          </text>

          {/* Exhaust duct */}
          <rect x={65} y={22} width={40} height={25} fill="#e2e8f0" stroke={SVG_COLORS.stroke} strokeWidth={1.5} />

          {/* Hood canopy */}
          <path
            d="M25,47 L145,47 L135,82 L35,82 Z"
            fill="#e2e8f0"
            stroke={SVG_COLORS.stroke}
            strokeWidth={2}
          />

          {/* Hood filters */}
          <rect x={40} y={55} width={90} height={18} fill="#cbd5e1" stroke={SVG_COLORS.strokeLight} strokeWidth={1} rx={2} />
          <line x1={60} y1={55} x2={60} y2={73} stroke={SVG_COLORS.strokeLight} strokeWidth={1} />
          <line x1={85} y1={55} x2={85} y2={73} stroke={SVG_COLORS.strokeLight} strokeWidth={1} />
          <line x1={110} y1={55} x2={110} y2={73} stroke={SVG_COLORS.strokeLight} strokeWidth={1} />

          {/* Hood length indicator */}
          <line x1={25} y1={92} x2={145} y2={92} stroke={SVG_COLORS.primary} strokeWidth={1} strokeDasharray="3,2" />
          <text x={85} y={104} fontSize="9" fill={SVG_COLORS.primary} textAnchor="middle">
            {hoodLength ? `${hoodLength} ft length` : '— ft length'}
          </text>

          {/* Rising smoke/steam arrows */}
          {cfm && (
            <g opacity={0.7}>
              {[0, 1, 2].map((i) => (
                <path
                  key={i}
                  d={`M${55 + i * 30},130 Q${60 + i * 30},115 ${55 + i * 30},100`}
                  fill="none"
                  stroke={SVG_COLORS.primary}
                  strokeWidth={2}
                  strokeLinecap="round"
                  opacity={0.6}
                >
                  <animate
                    attributeName="d"
                    values={`M${55 + i * 30},135 Q${60 + i * 30},118 ${55 + i * 30},105;M${55 + i * 30},125 Q${60 + i * 30},108 ${55 + i * 30},90;M${55 + i * 30},135 Q${60 + i * 30},118 ${55 + i * 30},105`}
                    dur="2s"
                    begin={`${i * 0.3}s`}
                    repeatCount="indefinite"
                  />
                  <animate
                    attributeName="opacity"
                    values="0.2;0.7;0.2"
                    dur="2s"
                    begin={`${i * 0.3}s`}
                    repeatCount="indefinite"
                  />
                </path>
              ))}
            </g>
          )}

          {/* Cooktop */}
          <rect x={30} y={118} width={110} height={22} fill="#64748b" stroke={SVG_COLORS.stroke} strokeWidth={1.5} rx={3} />

          {/* Burners */}
          <circle cx={55} cy={129} r={10} fill="#475569" stroke="#334155" strokeWidth={1} />
          <circle cx={85} cy={129} r={10} fill="#475569" stroke="#334155" strokeWidth={1} />
          <circle cx={115} cy={129} r={10} fill="#475569" stroke="#334155" strokeWidth={1} />

          {/* Formula box */}
          <rect x={0} y={148} width={170} height={24} fill="#f1f5f9" stroke={SVG_COLORS.strokeLight} strokeWidth={1} rx={4} />
          <text x={85} y={164} fontSize="8" fill={SVG_COLORS.textLight} textAnchor="middle">
            CFM = Length × CFM/ft
          </text>
        </g>

        {/* RIGHT COLUMN: Results */}
        <g transform="translate(210, 12)">
          {/* Results Panel */}
          <rect x={0} y={0} width={170} height={88} fill="white" stroke={SVG_COLORS.strokeLight} strokeWidth={1} rx={8} />

          <text x={85} y={18} fontSize="10" fill={SVG_COLORS.textLight} textAnchor="middle">
            Required Exhaust
          </text>
          <text x={85} y={48} fontSize="28" fill={SVG_COLORS.accent} fontWeight="bold" textAnchor="middle">
            {cfm ? cfm.toLocaleString() : '—'}
          </text>
          <text x={85} y={66} fontSize="12" fill={SVG_COLORS.text} textAnchor="middle">
            CFM
          </text>

          {hoodType && (
            <text x={85} y={82} fontSize="9" fill={SVG_COLORS.textLight} textAnchor="middle">
              {formatHoodType(hoodType)}
            </text>
          )}

          {/* CFM per Linear Foot Reference */}
          <rect x={0} y={98} width={170} height={72} fill="#f8fafc" stroke={SVG_COLORS.strokeLight} strokeWidth={1} rx={6} />

          <text x={85} y={115} fontSize="9" fill={SVG_COLORS.textLight} textAnchor="middle">
            CFM per Linear Foot
          </text>

          {/* Two-column layout for rates */}
          <text x={25} y={133} fontSize="9" fill={SVG_COLORS.text}>Light:</text>
          <text x={70} y={133} fontSize="9" fill={SVG_COLORS.text} fontWeight="500">100</text>
          <text x={100} y={133} fontSize="9" fill={SVG_COLORS.text}>Heavy:</text>
          <text x={150} y={133} fontSize="9" fill={SVG_COLORS.text} fontWeight="500">350</text>

          <text x={25} y={150} fontSize="9" fill={SVG_COLORS.text}>Medium:</text>
          <text x={70} y={150} fontSize="9" fill={SVG_COLORS.text} fontWeight="500">200</text>
          <text x={100} y={150} fontSize="9" fill={SVG_COLORS.text}>X-Heavy:</text>
          <text x={150} y={150} fontSize="9" fill={SVG_COLORS.text} fontWeight="500">500</text>

          <text x={85} y={166} fontSize="7" fill={SVG_COLORS.textLight} textAnchor="middle">
            CFM per linear foot of hood
          </text>
        </g>
      </svg>
    </CalculatorSVG>
  );
}
