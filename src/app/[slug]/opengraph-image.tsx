import { ImageResponse } from 'next/og';
import { getArticleBySlug, getAllArticleSlugs, PILLAR_INFO } from '@/lib/articles';

export const alt = 'HVAC Solver Article';
export const size = {
  width: 1200,
  height: 630,
};
export const contentType = 'image/png';

export async function generateStaticParams() {
  const slugs = getAllArticleSlugs();
  return slugs.map((slug) => ({ slug }));
}

// Pillar colors for visual differentiation
const PILLAR_COLORS: Record<string, { bg: string; accent: string }> = {
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

// Pillar icons (simple text representations)
const PILLAR_ICONS: Record<string, string> = {
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

export default async function Image({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const article = getArticleBySlug(slug);

  if (!article) {
    // Fallback for missing articles
    return new ImageResponse(
      (
        <div
          style={{
            height: '100%',
            width: '100%',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            backgroundColor: '#1e3a5f',
            fontFamily: 'system-ui, sans-serif',
          }}
        >
          <div style={{ fontSize: 72, fontWeight: 700, color: '#ffffff' }}>
            HVAC Solver
          </div>
        </div>
      ),
      { ...size }
    );
  }

  const { frontmatter } = article;
  const pillar = frontmatter.pillar || 'standalone';
  const pillarInfo = PILLAR_INFO[pillar];
  const colors = PILLAR_COLORS[pillar] || PILLAR_COLORS.standalone;
  const icon = PILLAR_ICONS[pillar] || '📊';

  // Clean title - remove " — " suffix and "| HVACSolver" parts
  const cleanTitle = frontmatter.title
    .split(' — ')[0]
    .split(' | ')[0]
    .trim();

  // Truncate title if too long
  const displayTitle = cleanTitle.length > 60
    ? cleanTitle.substring(0, 57) + '...'
    : cleanTitle;

  // Truncate description
  const displayDesc = frontmatter.description.length > 120
    ? frontmatter.description.substring(0, 117) + '...'
    : frontmatter.description;

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
            backgroundImage: `radial-gradient(circle at 10% 20%, ${colors.accent}15 0%, transparent 40%), radial-gradient(circle at 90% 80%, ${colors.accent}15 0%, transparent 40%)`,
          }}
        />

        {/* Content container */}
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            padding: '50px 60px',
            height: '100%',
            position: 'relative',
          }}
        >
          {/* Top bar: Pillar badge + Calculator indicator */}
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              marginBottom: 30,
            }}
          >
            {/* Pillar badge */}
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                backgroundColor: 'rgba(255,255,255,0.15)',
                padding: '12px 24px',
                borderRadius: 8,
              }}
            >
              <span style={{ fontSize: 24, marginRight: 12 }}>{icon}</span>
              <span style={{ fontSize: 20, color: '#ffffff', fontWeight: 600 }}>
                {pillarInfo?.name || 'HVAC Solver'}
              </span>
            </div>

            {/* Calculator badge */}
            {frontmatter.hasCalculator && (
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  backgroundColor: colors.accent,
                  padding: '12px 24px',
                  borderRadius: 8,
                }}
              >
                <span style={{ fontSize: 18, color: '#ffffff', fontWeight: 700 }}>
                  CALCULATOR
                </span>
              </div>
            )}
          </div>

          {/* Main title */}
          <div
            style={{
              display: 'flex',
              flex: 1,
              alignItems: 'center',
            }}
          >
            <h1
              style={{
                fontSize: displayTitle.length > 40 ? 52 : 64,
                fontWeight: 700,
                color: '#ffffff',
                lineHeight: 1.2,
                margin: 0,
                maxWidth: 1000,
              }}
            >
              {displayTitle}
            </h1>
          </div>

          {/* Description */}
          <div
            style={{
              fontSize: 24,
              color: 'rgba(255,255,255,0.8)',
              lineHeight: 1.4,
              marginBottom: 40,
              maxWidth: 900,
            }}
          >
            {displayDesc}
          </div>

          {/* Bottom bar */}
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
            }}
          >
            {/* Logo */}
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
              }}
            >
              {/* Thermometer icon */}
              <svg
                width="40"
                height="40"
                viewBox="0 0 32 32"
                style={{ marginRight: 12 }}
              >
                <circle cx="16" cy="16" r="15" fill="#0f2440" />
                <rect x="13" y="6" width="6" height="16" rx="3" fill="#ffffff" />
                <circle cx="16" cy="23" r="5" fill="#ffffff" />
                <rect x="14.5" y="10" width="3" height="10" rx="1.5" fill={colors.accent} />
                <circle cx="16" cy="23" r="3" fill={colors.accent} />
              </svg>
              <span style={{ fontSize: 32, fontWeight: 700, color: '#ffffff' }}>
                HVAC Solver
              </span>
            </div>

            {/* URL */}
            <div
              style={{
                fontSize: 20,
                color: colors.accent,
                fontWeight: 600,
              }}
            >
              hvacsolver.com
            </div>
          </div>
        </div>
      </div>
    ),
    { ...size }
  );
}
