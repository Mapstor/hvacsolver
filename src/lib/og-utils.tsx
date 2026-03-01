import { ImageResponse } from 'next/og';
import { PILLAR_INFO } from './articles';

export const OG_SIZE = {
  width: 1200,
  height: 630,
};

// Pillar colors for visual differentiation
export const PILLAR_COLORS: Record<string, { bg: string; accent: string }> = {
  calculators: { bg: '#1e3a5f', accent: '#c2410c' },
  troubleshooting: { bg: '#7c2d12', accent: '#fdba74' },
  efficiency: { bg: '#166534', accent: '#86efac' },
  installation: { bg: '#1e40af', accent: '#93c5fd' },
  insulation: { bg: '#6b21a8', accent: '#d8b4fe' },
  'energy-costs': { bg: '#b45309', accent: '#fde047' },
  refrigerants: { bg: '#0e7490', accent: '#67e8f9' },
  'indoor-climate': { bg: '#4338ca', accent: '#a5b4fc' },
  'water-heaters': { bg: '#0f766e', accent: '#5eead4' },
  standalone: { bg: '#1e3a5f', accent: '#c2410c' },
};

// Pillar icons
export const PILLAR_ICONS: Record<string, string> = {
  calculators: '📐',
  troubleshooting: '🔧',
  efficiency: '⚡',
  installation: '🛠️',
  insulation: '🏠',
  'energy-costs': '💰',
  refrigerants: '❄️',
  'indoor-climate': '🌡️',
  'water-heaters': '🚿',
  standalone: '📊',
};

interface PillarOGImageProps {
  pillarKey: string;
  articleCount?: number;
}

interface StaticPageOGImageProps {
  title: string;
  description: string;
  icon?: string;
}

export function generatePillarOGImage({ pillarKey, articleCount }: PillarOGImageProps) {
  const pillarInfo = PILLAR_INFO[pillarKey];
  const colors = PILLAR_COLORS[pillarKey] || PILLAR_COLORS.standalone;
  const icon = PILLAR_ICONS[pillarKey] || '📊';

  return new ImageResponse(
    (
      <div
        style={{
          height: '100%',
          width: '100%',
          display: 'flex',
          flexDirection: 'column',
          backgroundColor: colors.bg,
          fontFamily: 'system-ui, sans-serif',
          position: 'relative',
        }}
      >
        {/* Background pattern */}
        <div
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundImage: `radial-gradient(circle at 10% 20%, ${colors.accent}20 0%, transparent 50%), radial-gradient(circle at 90% 80%, ${colors.accent}20 0%, transparent 50%)`,
          }}
        />

        {/* Content */}
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            height: '100%',
            padding: '60px',
            position: 'relative',
          }}
        >
          {/* Large icon */}
          <div
            style={{
              fontSize: 100,
              marginBottom: 30,
            }}
          >
            {icon}
          </div>

          {/* Title */}
          <h1
            style={{
              fontSize: 72,
              fontWeight: 700,
              color: '#ffffff',
              textAlign: 'center',
              margin: 0,
              marginBottom: 20,
            }}
          >
            {pillarInfo?.name || 'HVAC Solver'}
          </h1>

          {/* Description */}
          <p
            style={{
              fontSize: 28,
              color: 'rgba(255,255,255,0.8)',
              textAlign: 'center',
              maxWidth: 800,
              margin: 0,
              marginBottom: 30,
            }}
          >
            {pillarInfo?.description || 'HVAC resources backed by engineering data'}
          </p>

          {/* Article count badge */}
          {articleCount && (
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                backgroundColor: colors.accent,
                padding: '12px 32px',
                borderRadius: 50,
              }}
            >
              <span style={{ fontSize: 22, color: '#ffffff', fontWeight: 700 }}>
                {articleCount} Articles & Guides
              </span>
            </div>
          )}

          {/* Bottom logo */}
          <div
            style={{
              position: 'absolute',
              bottom: 40,
              display: 'flex',
              alignItems: 'center',
            }}
          >
            <svg
              width="36"
              height="36"
              viewBox="0 0 32 32"
              style={{ marginRight: 10 }}
            >
              <circle cx="16" cy="16" r="15" fill="#0f2440" />
              <rect x="13" y="6" width="6" height="16" rx="3" fill="#ffffff" />
              <circle cx="16" cy="23" r="5" fill="#ffffff" />
              <rect x="14.5" y="10" width="3" height="10" rx="1.5" fill={colors.accent} />
              <circle cx="16" cy="23" r="3" fill={colors.accent} />
            </svg>
            <span style={{ fontSize: 28, fontWeight: 700, color: '#ffffff' }}>
              HVAC Solver
            </span>
            <span style={{ fontSize: 20, color: colors.accent, marginLeft: 20, fontWeight: 600 }}>
              hvacsolver.com
            </span>
          </div>
        </div>
      </div>
    ),
    { ...OG_SIZE }
  );
}

export function generateStaticPageOGImage({ title, description, icon = '📄' }: StaticPageOGImageProps) {
  const colors = PILLAR_COLORS.standalone;

  return new ImageResponse(
    (
      <div
        style={{
          height: '100%',
          width: '100%',
          display: 'flex',
          flexDirection: 'column',
          backgroundColor: colors.bg,
          fontFamily: 'system-ui, sans-serif',
          position: 'relative',
        }}
      >
        {/* Background pattern */}
        <div
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundImage: `radial-gradient(circle at 10% 20%, ${colors.accent}20 0%, transparent 50%), radial-gradient(circle at 90% 80%, ${colors.accent}20 0%, transparent 50%)`,
          }}
        />

        {/* Content */}
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            height: '100%',
            padding: '60px',
            position: 'relative',
          }}
        >
          {/* Icon */}
          <div
            style={{
              fontSize: 80,
              marginBottom: 30,
            }}
          >
            {icon}
          </div>

          {/* Title */}
          <h1
            style={{
              fontSize: 64,
              fontWeight: 700,
              color: '#ffffff',
              textAlign: 'center',
              margin: 0,
              marginBottom: 20,
            }}
          >
            {title}
          </h1>

          {/* Description */}
          <p
            style={{
              fontSize: 26,
              color: 'rgba(255,255,255,0.8)',
              textAlign: 'center',
              maxWidth: 800,
              margin: 0,
            }}
          >
            {description}
          </p>

          {/* Bottom logo */}
          <div
            style={{
              position: 'absolute',
              bottom: 40,
              display: 'flex',
              alignItems: 'center',
            }}
          >
            <svg
              width="36"
              height="36"
              viewBox="0 0 32 32"
              style={{ marginRight: 10 }}
            >
              <circle cx="16" cy="16" r="15" fill="#0f2440" />
              <rect x="13" y="6" width="6" height="16" rx="3" fill="#ffffff" />
              <circle cx="16" cy="23" r="5" fill="#ffffff" />
              <rect x="14.5" y="10" width="3" height="10" rx="1.5" fill={colors.accent} />
              <circle cx="16" cy="23" r="3" fill={colors.accent} />
            </svg>
            <span style={{ fontSize: 28, fontWeight: 700, color: '#ffffff' }}>
              HVAC Solver
            </span>
            <span style={{ fontSize: 20, color: colors.accent, marginLeft: 20, fontWeight: 600 }}>
              hvacsolver.com
            </span>
          </div>
        </div>
      </div>
    ),
    { ...OG_SIZE }
  );
}
