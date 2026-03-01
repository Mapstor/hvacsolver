import { ImageResponse } from 'next/og';

export const alt = 'HVACSolver - HVAC Calculators & Troubleshooting Guides';
export const size = {
  width: 1200,
  height: 630,
};
export const contentType = 'image/png';

export default async function Image() {
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
        {/* Background pattern */}
        <div
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundImage: 'radial-gradient(circle at 25% 25%, #2d4a6f 0%, transparent 50%), radial-gradient(circle at 75% 75%, #2d4a6f 0%, transparent 50%)',
            opacity: 0.5,
          }}
        />

        {/* Thermometer icon */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            marginBottom: 40,
          }}
        >
          <svg
            width="80"
            height="80"
            viewBox="0 0 32 32"
            style={{ marginRight: 20 }}
          >
            <circle cx="16" cy="16" r="15" fill="#0f2440" />
            <rect x="13" y="6" width="6" height="16" rx="3" fill="#ffffff" />
            <circle cx="16" cy="23" r="5" fill="#ffffff" />
            <rect x="14.5" y="10" width="3" height="10" rx="1.5" fill="#c2410c" />
            <circle cx="16" cy="23" r="3" fill="#c2410c" />
          </svg>

          {/* Logo text */}
          <div
            style={{
              fontSize: 72,
              fontWeight: 700,
              color: '#ffffff',
              letterSpacing: '-2px',
            }}
          >
            HVAC Solver
          </div>
        </div>

        {/* Tagline */}
        <div
          style={{
            fontSize: 32,
            color: '#94a3b8',
            marginBottom: 50,
            textAlign: 'center',
            maxWidth: 900,
          }}
        >
          HVAC problems solved with engineering data, not opinions
        </div>

        {/* Feature highlights */}
        <div
          style={{
            display: 'flex',
            gap: 40,
          }}
        >
          {[
            { icon: '📐', text: '25+ Calculators' },
            { icon: '🔧', text: 'Troubleshooting' },
            { icon: '📊', text: 'Reference Charts' },
          ].map((item) => (
            <div
              key={item.text}
              style={{
                display: 'flex',
                alignItems: 'center',
                backgroundColor: 'rgba(255,255,255,0.1)',
                padding: '16px 32px',
                borderRadius: 12,
              }}
            >
              <span style={{ fontSize: 28, marginRight: 12 }}>{item.icon}</span>
              <span style={{ fontSize: 22, color: '#ffffff', fontWeight: 600 }}>
                {item.text}
              </span>
            </div>
          ))}
        </div>

        {/* Bottom URL */}
        <div
          style={{
            position: 'absolute',
            bottom: 30,
            fontSize: 20,
            color: '#c2410c',
            fontWeight: 600,
          }}
        >
          hvacsolver.com
        </div>
      </div>
    ),
    {
      ...size,
    }
  );
}
