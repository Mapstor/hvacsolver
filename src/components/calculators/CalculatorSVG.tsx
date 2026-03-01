'use client';

import { ReactNode } from 'react';

interface CalculatorSVGProps {
  children: ReactNode;
  title?: string;
  description?: string;
  className?: string;
  aspectRatio?: 'square' | 'wide' | 'tall';
}

/**
 * Wrapper component for calculator SVG visualizations.
 * Provides consistent styling, aspect ratios, and accessibility features.
 */
export default function CalculatorSVG({
  children,
  title,
  description,
  className = '',
  aspectRatio = 'wide',
}: CalculatorSVGProps) {
  const aspectClasses = {
    square: 'aspect-square',
    wide: 'aspect-[16/10]',
    tall: 'aspect-[10/16]',
  };

  return (
    <div className={`w-full ${className}`}>
      {title && (
        <h4 className="text-sm font-semibold text-slate-700 mb-2">{title}</h4>
      )}
      <div
        className={`relative w-full ${aspectClasses[aspectRatio]} bg-slate-50 border border-slate-200 rounded-lg overflow-hidden`}
        role="img"
        aria-label={description || title || 'Calculator visualization'}
      >
        {children}
      </div>
      {description && (
        <p className="mt-2 text-xs text-slate-500 text-center">{description}</p>
      )}
    </div>
  );
}

// Common SVG styling utilities
export const SVG_COLORS = {
  // Primary elements
  primary: '#1e3a5f',      // navy-700
  primaryLight: '#3b5a80', // lighter navy
  primaryDark: '#0f2440',  // navy-900

  // Accent colors
  accent: '#c2410c',       // orange-600
  accentLight: '#fff7ed',  // orange-50

  // Heat/energy indicators
  heat: '#ef4444',         // red-500
  heatLight: '#fef2f2',    // red-50
  cold: '#3b82f6',         // blue-500
  coldLight: '#eff6ff',    // blue-50

  // Status colors
  good: '#22c55e',         // green-500
  warning: '#f59e0b',      // amber-500
  danger: '#ef4444',       // red-500

  // Neutral
  stroke: '#334155',       // slate-700
  strokeLight: '#94a3b8',  // slate-400
  fill: '#f8fafc',         // slate-50
  fillWhite: '#ffffff',
  text: '#1e293b',         // slate-800
  textLight: '#64748b',    // slate-500
} as const;

// Common arrow marker definitions for reuse in SVGs
export function ArrowMarkerDefs() {
  return (
    <defs>
      {/* Heat flow arrow (red) */}
      <marker
        id="arrow-heat"
        markerWidth="10"
        markerHeight="10"
        refX="9"
        refY="3"
        orient="auto"
        markerUnits="strokeWidth"
      >
        <path d="M0,0 L0,6 L9,3 z" fill={SVG_COLORS.heat} />
      </marker>

      {/* Cold flow arrow (blue) */}
      <marker
        id="arrow-cold"
        markerWidth="10"
        markerHeight="10"
        refX="9"
        refY="3"
        orient="auto"
        markerUnits="strokeWidth"
      >
        <path d="M0,0 L0,6 L9,3 z" fill={SVG_COLORS.cold} />
      </marker>

      {/* Air flow arrow (primary) */}
      <marker
        id="arrow-air"
        markerWidth="10"
        markerHeight="10"
        refX="9"
        refY="3"
        orient="auto"
        markerUnits="strokeWidth"
      >
        <path d="M0,0 L0,6 L9,3 z" fill={SVG_COLORS.primary} />
      </marker>

      {/* Accent arrow */}
      <marker
        id="arrow-accent"
        markerWidth="10"
        markerHeight="10"
        refX="9"
        refY="3"
        orient="auto"
        markerUnits="strokeWidth"
      >
        <path d="M0,0 L0,6 L9,3 z" fill={SVG_COLORS.accent} />
      </marker>
    </defs>
  );
}

// Reusable house shape for heat load visualizations
interface HouseShapeProps {
  x: number;
  y: number;
  width: number;
  height: number;
  roofHeight?: number;
  fill?: string;
  stroke?: string;
  strokeWidth?: number;
}

export function HouseShape({
  x,
  y,
  width,
  height,
  roofHeight = 40,
  fill = SVG_COLORS.fillWhite,
  stroke = SVG_COLORS.stroke,
  strokeWidth = 2,
}: HouseShapeProps) {
  const roofPeakX = x + width / 2;
  const roofPeakY = y;
  const roofLeftX = x;
  const roofRightX = x + width;
  const roofBaseY = y + roofHeight;

  return (
    <g>
      {/* Roof */}
      <polygon
        points={`${roofPeakX},${roofPeakY} ${roofLeftX},${roofBaseY} ${roofRightX},${roofBaseY}`}
        fill={fill}
        stroke={stroke}
        strokeWidth={strokeWidth}
        strokeLinejoin="round"
      />
      {/* House body */}
      <rect
        x={x}
        y={roofBaseY}
        width={width}
        height={height - roofHeight}
        fill={fill}
        stroke={stroke}
        strokeWidth={strokeWidth}
      />
    </g>
  );
}

// Reusable sun icon
interface SunIconProps {
  cx: number;
  cy: number;
  radius?: number;
  rayLength?: number;
}

export function SunIcon({ cx, cy, radius = 20, rayLength = 12 }: SunIconProps) {
  const rays = 8;
  const rayPaths = [];

  for (let i = 0; i < rays; i++) {
    const angle = (i * 360) / rays;
    const rad = (angle * Math.PI) / 180;
    const x1 = cx + Math.cos(rad) * (radius + 4);
    const y1 = cy + Math.sin(rad) * (radius + 4);
    const x2 = cx + Math.cos(rad) * (radius + rayLength);
    const y2 = cy + Math.sin(rad) * (radius + rayLength);
    rayPaths.push(`M${x1},${y1} L${x2},${y2}`);
  }

  return (
    <g>
      <circle cx={cx} cy={cy} r={radius} fill="#fbbf24" stroke="#f59e0b" strokeWidth={2} />
      <path
        d={rayPaths.join(' ')}
        stroke="#f59e0b"
        strokeWidth={2}
        strokeLinecap="round"
      />
    </g>
  );
}

// Reusable person silhouette
interface PersonIconProps {
  x: number;
  y: number;
  scale?: number;
  fill?: string;
}

export function PersonIcon({ x, y, scale = 1, fill = SVG_COLORS.primary }: PersonIconProps) {
  return (
    <g transform={`translate(${x}, ${y}) scale(${scale})`}>
      {/* Head */}
      <circle cx={10} cy={5} r={5} fill={fill} />
      {/* Body */}
      <path
        d="M10,10 L10,25 M10,15 L3,22 M10,15 L17,22 M10,25 L5,35 M10,25 L15,35"
        stroke={fill}
        strokeWidth={2}
        strokeLinecap="round"
        fill="none"
      />
    </g>
  );
}

// Reusable duct section
interface DuctSectionProps {
  x: number;
  y: number;
  width: number;
  height: number;
  fill?: string;
  stroke?: string;
}

export function DuctSection({
  x,
  y,
  width,
  height,
  fill = '#e2e8f0',
  stroke = SVG_COLORS.stroke,
}: DuctSectionProps) {
  return (
    <rect
      x={x}
      y={y}
      width={width}
      height={height}
      fill={fill}
      stroke={stroke}
      strokeWidth={1.5}
      rx={2}
    />
  );
}

// Temperature gradient definitions
export function TemperatureGradientDefs() {
  return (
    <defs>
      <linearGradient id="temp-hot-cold" x1="0%" y1="0%" x2="0%" y2="100%">
        <stop offset="0%" stopColor={SVG_COLORS.heat} />
        <stop offset="50%" stopColor="#fbbf24" />
        <stop offset="100%" stopColor={SVG_COLORS.cold} />
      </linearGradient>
      <linearGradient id="temp-cold-hot" x1="0%" y1="0%" x2="0%" y2="100%">
        <stop offset="0%" stopColor={SVG_COLORS.cold} />
        <stop offset="50%" stopColor="#fbbf24" />
        <stop offset="100%" stopColor={SVG_COLORS.heat} />
      </linearGradient>
      <linearGradient id="heat-flow" x1="0%" y1="0%" x2="100%" y2="0%">
        <stop offset="0%" stopColor={SVG_COLORS.heatLight} />
        <stop offset="100%" stopColor={SVG_COLORS.heat} />
      </linearGradient>
    </defs>
  );
}
