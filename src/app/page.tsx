import { Metadata } from 'next';
import Link from 'next/link';
import { getAllArticles, getArticlesByPillar, PILLAR_INFO } from '@/lib/articles';
import { generateWebSiteSchema, generateOrganizationSchema, schemaToJsonLd } from '@/lib/schema';

export const metadata: Metadata = {
  title: 'HVACSolver — Free HVAC Calculators & Troubleshooting Guides',
  description:
    'Free HVAC calculators, troubleshooting guides, and reference charts backed by ASHRAE standards, DOE data, and real engineering methodology. Size your AC, furnace, or heat pump correctly.',
  alternates: {
    canonical: '/',
  },
  openGraph: {
    title: 'HVACSolver — Free HVAC Calculators & Troubleshooting Guides',
    description:
      'Free HVAC calculators, troubleshooting guides, and reference charts backed by ASHRAE standards and real engineering methodology.',
    type: 'website',
    url: '/',
    siteName: 'HVACSolver',
    locale: 'en_US',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'HVACSolver — Free HVAC Calculators & Troubleshooting Guides',
    description:
      'Free HVAC calculators, troubleshooting guides, and reference charts backed by ASHRAE standards.',
  },
};

// HVAC System Overview SVG Component
function HVACSystemSVG() {
  return (
    <svg viewBox="0 0 800 400" className="w-full h-auto" aria-label="HVAC System Overview Diagram">
      {/* Background */}
      <rect width="800" height="400" fill="#f8fafc" rx="8" />

      {/* House outline */}
      <path d="M100,200 L100,350 L350,350 L350,200 L225,120 Z" fill="white" stroke="#334155" strokeWidth="2" />

      {/* Roof */}
      <path d="M90,200 L225,110 L360,200" fill="none" stroke="#334155" strokeWidth="3" />

      {/* Window */}
      <rect x="140" y="230" width="60" height="50" fill="#bfdbfe" stroke="#334155" strokeWidth="1.5" />
      <line x1="170" y1="230" x2="170" y2="280" stroke="#334155" strokeWidth="1" />
      <line x1="140" y1="255" x2="200" y2="255" stroke="#334155" strokeWidth="1" />

      {/* Door */}
      <rect x="260" y="270" width="50" height="80" fill="#92400e" stroke="#334155" strokeWidth="1.5" rx="2" />
      <circle cx="300" cy="315" r="4" fill="#fbbf24" />

      {/* Indoor Unit / Air Handler */}
      <rect x="130" y="290" width="50" height="55" fill="#64748b" stroke="#334155" strokeWidth="2" rx="4" />
      <text x="155" y="322" fontSize="8" fill="white" textAnchor="middle" fontWeight="bold">AIR</text>
      <text x="155" y="332" fontSize="8" fill="white" textAnchor="middle" fontWeight="bold">HANDLER</text>

      {/* Ductwork */}
      <path d="M155,290 L155,250 L280,250 L280,230" fill="none" stroke="#94a3b8" strokeWidth="12" strokeLinecap="round" />
      <path d="M155,290 L155,250 L280,250 L280,230" fill="none" stroke="#cbd5e1" strokeWidth="8" strokeLinecap="round" />

      {/* Supply vents */}
      <rect x="268" y="225" width="24" height="8" fill="#e2e8f0" stroke="#64748b" strokeWidth="1" />

      {/* Airflow arrows in house */}
      <g fill="#3b82f6" opacity="0.7">
        <path d="M280,222 L280,210 L275,215 M280,210 L285,215" stroke="#3b82f6" strokeWidth="1.5" fill="none" />
        <path d="M270,235 L260,250 L265,247 M260,250 L263,243" stroke="#3b82f6" strokeWidth="1.5" fill="none" />
      </g>

      {/* Refrigerant lines connecting indoor to outdoor */}
      <path d="M130,320 L80,320 L80,380 L450,380 L450,300" fill="none" stroke="#c2410c" strokeWidth="3" strokeDasharray="8,4" />
      <path d="M130,330 L70,330 L70,390 L460,390 L460,300" fill="none" stroke="#3b82f6" strokeWidth="3" strokeDasharray="8,4" />

      {/* Outdoor Unit / Condenser */}
      <rect x="420" y="220" width="80" height="80" fill="#475569" stroke="#334155" strokeWidth="2" rx="4" />
      <circle cx="460" cy="260" r="28" fill="#334155" stroke="#64748b" strokeWidth="2" />
      {/* Fan blades */}
      <g transform="translate(460, 260)">
        <line x1="0" y1="-20" x2="0" y2="20" stroke="#94a3b8" strokeWidth="4" strokeLinecap="round" />
        <line x1="-20" y1="0" x2="20" y2="0" stroke="#94a3b8" strokeWidth="4" strokeLinecap="round" />
        <line x1="-14" y1="-14" x2="14" y2="14" stroke="#94a3b8" strokeWidth="4" strokeLinecap="round" />
        <line x1="14" y1="-14" x2="-14" y2="14" stroke="#94a3b8" strokeWidth="4" strokeLinecap="round" />
      </g>
      <text x="460" y="315" fontSize="9" fill="white" textAnchor="middle" fontWeight="bold">CONDENSER</text>

      {/* Heat rejection arrows */}
      <g fill="none" stroke="#ef4444" strokeWidth="2">
        <path d="M420,240 L400,230 M405,225 L400,230 L405,235" />
        <path d="M420,260 L395,260 M400,255 L395,260 L400,265" />
        <path d="M420,280 L400,290 M405,285 L400,290 L405,295" />
        <path d="M500,240 L520,230 M515,225 L520,230 L515,235" />
        <path d="M500,260 L525,260 M520,255 L525,260 L520,265" />
        <path d="M500,280 L520,290 M515,285 L520,290 L515,295" />
      </g>

      {/* Thermostat */}
      <rect x="220" y="240" width="25" height="35" fill="white" stroke="#334155" strokeWidth="1.5" rx="3" />
      <circle cx="232" cy="257" r="8" fill="none" stroke="#3b82f6" strokeWidth="2" />
      <text x="232" y="260" fontSize="7" fill="#1e3a5f" textAnchor="middle" fontWeight="bold">72</text>

      {/* Labels */}
      <g fontSize="11" fill="#334155" fontWeight="600">
        <text x="225" y="105">HOME</text>
        <text x="460" y="210" textAnchor="middle">OUTDOOR UNIT</text>
      </g>

      {/* Legend */}
      <g transform="translate(550, 140)">
        <rect x="0" y="0" width="220" height="180" fill="white" stroke="#e2e8f0" strokeWidth="1" rx="6" />
        <text x="110" y="24" fontSize="12" fill="#0f172a" textAnchor="middle" fontWeight="bold">HVAC System Components</text>
        <line x1="10" y1="35" x2="210" y2="35" stroke="#e2e8f0" strokeWidth="1" />

        {/* Legend items */}
        <g transform="translate(15, 50)">
          <rect x="0" y="0" width="20" height="12" fill="#64748b" rx="2" />
          <text x="30" y="10" fontSize="10" fill="#475569">Air Handler (Indoor)</text>
        </g>
        <g transform="translate(15, 75)">
          <rect x="0" y="0" width="20" height="12" fill="#475569" rx="2" />
          <text x="30" y="10" fontSize="10" fill="#475569">Condenser (Outdoor)</text>
        </g>
        <g transform="translate(15, 100)">
          <line x1="0" y1="6" x2="20" y2="6" stroke="#c2410c" strokeWidth="3" strokeDasharray="4,2" />
          <text x="30" y="10" fontSize="10" fill="#475569">Hot Refrigerant Line</text>
        </g>
        <g transform="translate(15, 125)">
          <line x1="0" y1="6" x2="20" y2="6" stroke="#3b82f6" strokeWidth="3" strokeDasharray="4,2" />
          <text x="30" y="10" fontSize="10" fill="#475569">Cold Refrigerant Line</text>
        </g>
        <g transform="translate(15, 150)">
          <path d="M0,6 L15,6 M10,2 L15,6 L10,10" stroke="#ef4444" strokeWidth="2" fill="none" />
          <text x="30" y="10" fontSize="10" fill="#475569">Heat Rejection</text>
        </g>
      </g>

      {/* Sun for outdoor heat */}
      <circle cx="550" cy="60" r="25" fill="#fbbf24" />
      <g stroke="#fbbf24" strokeWidth="3">
        <line x1="550" y1="25" x2="550" y2="10" />
        <line x1="550" y1="95" x2="550" y2="110" />
        <line x1="515" y1="60" x2="500" y2="60" />
        <line x1="585" y1="60" x2="600" y2="60" />
        <line x1="525" y1="35" x2="515" y2="25" />
        <line x1="575" y1="35" x2="585" y2="25" />
        <line x1="525" y1="85" x2="515" y2="95" />
        <line x1="575" y1="85" x2="585" y2="95" />
      </g>
    </svg>
  );
}

// Efficiency Ratings SVG Component
function EfficiencyRatingsSVG() {
  const ratings = [
    { label: '8 SEER', x: 30, color: '#dc2626', desc: 'Pre-2006' },
    { label: '13 SEER', x: 110, color: '#ea580c', desc: 'Old Min' },
    { label: '14 SEER', x: 190, color: '#d97706', desc: '2023 Min' },
    { label: '16 SEER', x: 270, color: '#65a30d', desc: 'Good' },
    { label: '20 SEER', x: 350, color: '#16a34a', desc: 'Excellent' },
    { label: '25+ SEER', x: 430, color: '#059669', desc: 'Best' },
  ];

  return (
    <svg viewBox="0 0 520 160" className="w-full h-auto" aria-label="SEER Efficiency Rating Scale">
      <rect width="520" height="160" fill="#f8fafc" rx="6" />

      {/* Title */}
      <text x="260" y="25" fontSize="14" fill="#0f172a" textAnchor="middle" fontWeight="bold">
        Air Conditioner Efficiency Scale (SEER)
      </text>

      {/* Scale bar background */}
      <defs>
        <linearGradient id="seer-scale-gradient" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#dc2626" />
          <stop offset="25%" stopColor="#ea580c" />
          <stop offset="50%" stopColor="#d97706" />
          <stop offset="75%" stopColor="#16a34a" />
          <stop offset="100%" stopColor="#059669" />
        </linearGradient>
      </defs>
      <rect x="30" y="50" width="460" height="20" rx="4" fill="url(#seer-scale-gradient)" />

      {/* Rating markers */}
      {ratings.map((rating, i) => (
        <g key={i}>
          <line x1={rating.x} y1="45" x2={rating.x} y2="75" stroke="white" strokeWidth="2" />
          <circle cx={rating.x} cy="60" r="8" fill={rating.color} stroke="white" strokeWidth="2" />
          <text x={rating.x} y="95" fontSize="11" fill="#0f172a" textAnchor="middle" fontWeight="bold">
            {rating.label}
          </text>
          <text x={rating.x} y="110" fontSize="9" fill="#64748b" textAnchor="middle">
            {rating.desc}
          </text>
        </g>
      ))}

      {/* 2023 minimum marker */}
      <path d="M190,120 L190,135 L185,130 M190,135 L195,130" stroke="#c2410c" strokeWidth="2" fill="none" />
      <text x="190" y="150" fontSize="9" fill="#c2410c" textAnchor="middle" fontWeight="bold">
        2023 Federal Minimum
      </text>

      {/* Savings note */}
      <text x="490" y="145" fontSize="8" fill="#64748b" textAnchor="end">
        Higher SEER = Lower operating costs
      </text>
    </svg>
  );
}

// Climate Zones SVG
function ClimateZonesSVG() {
  return (
    <svg viewBox="0 0 500 280" className="w-full h-auto" aria-label="US Climate Zones for HVAC">
      <rect width="500" height="280" fill="#f8fafc" rx="6" />

      {/* Title */}
      <text x="250" y="24" fontSize="13" fill="#0f172a" textAnchor="middle" fontWeight="bold">
        U.S. HVAC Climate Zones
      </text>

      {/* Simplified US map regions */}
      {/* Zone 1 - Hot/Humid (South FL, HI) */}
      <ellipse cx="420" cy="200" rx="30" ry="20" fill="#ef4444" opacity="0.7" />

      {/* Zone 2 - Hot (Southern states) */}
      <path d="M120,180 Q250,200 400,175 L400,210 Q250,235 120,210 Z" fill="#f97316" opacity="0.7" />

      {/* Zone 3 - Warm (Mid-south) */}
      <path d="M100,150 Q250,165 420,145 L420,175 Q250,200 100,180 Z" fill="#fbbf24" opacity="0.7" />

      {/* Zone 4 - Mixed (Middle) */}
      <path d="M80,120 Q250,130 440,110 L440,145 Q250,165 80,150 Z" fill="#a3e635" opacity="0.7" />

      {/* Zone 5 - Cool (Northern) */}
      <path d="M70,90 Q250,95 450,80 L450,110 Q250,130 70,120 Z" fill="#38bdf8" opacity="0.7" />

      {/* Zone 6-7 - Cold/Very Cold (Far North) */}
      <path d="M80,60 Q250,55 440,55 L440,80 Q250,95 80,90 Z" fill="#6366f1" opacity="0.7" />

      {/* Legend */}
      <g transform="translate(30, 230)">
        <rect x="0" y="0" width="440" height="40" fill="white" stroke="#e2e8f0" rx="4" />

        <rect x="10" y="10" width="20" height="12" fill="#ef4444" rx="2" />
        <text x="35" y="20" fontSize="9" fill="#475569">Zone 1</text>

        <rect x="75" y="10" width="20" height="12" fill="#f97316" rx="2" />
        <text x="100" y="20" fontSize="9" fill="#475569">Zone 2</text>

        <rect x="140" y="10" width="20" height="12" fill="#fbbf24" rx="2" />
        <text x="165" y="20" fontSize="9" fill="#475569">Zone 3</text>

        <rect x="205" y="10" width="20" height="12" fill="#a3e635" rx="2" />
        <text x="230" y="20" fontSize="9" fill="#475569">Zone 4</text>

        <rect x="270" y="10" width="20" height="12" fill="#38bdf8" rx="2" />
        <text x="295" y="20" fontSize="9" fill="#475569">Zone 5</text>

        <rect x="335" y="10" width="20" height="12" fill="#6366f1" rx="2" />
        <text x="360" y="20" fontSize="9" fill="#475569">Zone 6-7</text>

        <text x="420" y="20" fontSize="8" fill="#94a3b8">(IECC)</text>
      </g>
    </svg>
  );
}

export default function HomePage() {
  const calculators = getArticlesByPillar('calculators').slice(0, 8);
  const troubleshooting = getArticlesByPillar('troubleshooting').slice(0, 4);
  const efficiency = getArticlesByPillar('efficiency').slice(0, 4);

  // Generate schemas
  const websiteSchema = generateWebSiteSchema();
  const organizationSchema = generateOrganizationSchema();

  return (
    <div>
      {/* JSON-LD Schema Markup */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: schemaToJsonLd(websiteSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: schemaToJsonLd(organizationSchema) }}
      />

      {/* Hero Section */}
      <section className="bg-[#0f2440] text-white py-16 md:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-3xl md:text-5xl font-bold mb-6">
            HVAC Problems Solved With Engineering Data, Not Opinions
          </h1>
          <p className="text-lg md:text-xl text-slate-300 max-w-3xl mx-auto mb-8">
            Free calculators, diagnostic guides, and reference charts backed by ASHRAE
            standards, DOE data, and real engineering methodology.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Link
              href="/hvac-calculators"
              className="inline-block bg-[#c2410c] hover:bg-[#9a3412] text-white font-semibold px-6 py-3 rounded-md transition-colors"
            >
              Use Our Calculators
            </Link>
            <Link
              href="/hvac-troubleshooting"
              className="inline-block bg-white hover:bg-slate-100 text-[#0f2440] font-semibold px-6 py-3 rounded-md transition-colors"
            >
              Troubleshoot a Problem
            </Link>
          </div>
        </div>
      </section>

      {/* HVAC System Overview */}
      <section className="py-16 bg-white">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl md:text-3xl font-bold text-slate-950 mb-4">
            Understanding Your HVAC System
          </h2>
          <p className="text-slate-600 mb-8 max-w-3xl">
            A central HVAC system consists of indoor and outdoor components connected by refrigerant lines.
            The outdoor condenser unit releases heat extracted from your home, while the indoor air handler
            circulates conditioned air through your ductwork.
          </p>
          <div className="bg-slate-50 rounded-lg p-4 border border-slate-200">
            <HVACSystemSVG />
          </div>
        </div>
      </section>

      {/* Calculator Showcase */}
      <section className="py-16 bg-slate-50">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl md:text-3xl font-bold text-slate-950 mb-2">
            HVAC Calculators
          </h2>
          <p className="text-slate-600 mb-8">
            Professional-grade calculators based on ASHRAE and ACCA methodologies.
            Size equipment correctly, estimate costs, and optimize efficiency.
          </p>
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
            {calculators.map((article) => (
              <Link
                key={article.slug}
                href={`/${article.slug}`}
                className="block p-5 bg-white rounded-lg border border-slate-200 hover:border-[#c2410c] hover:shadow-md transition-all"
              >
                <h3 className="font-semibold text-slate-950 mb-2">{article.title.split(' — ')[0]}</h3>
                <p className="text-sm text-slate-600 line-clamp-2">{article.description}</p>
              </Link>
            ))}
          </div>
          <div className="mt-8 text-center">
            <Link
              href="/hvac-calculators"
              className="text-[#1e3a5f] underline hover:text-[#c2410c] font-medium"
            >
              View all calculators &rarr;
            </Link>
          </div>
        </div>
      </section>

      {/* Efficiency Standards Reference */}
      <section className="py-16 bg-white">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl md:text-3xl font-bold text-slate-950 mb-4">
            HVAC Efficiency Standards
          </h2>
          <p className="text-slate-600 mb-8 max-w-3xl">
            Federal minimum efficiency standards increased in 2023. Understanding SEER, EER, HSPF, and AFUE
            ratings helps you compare equipment and estimate operating costs.
          </p>

          <div className="grid gap-8 lg:grid-cols-2">
            {/* SEER Scale SVG */}
            <div className="bg-slate-50 rounded-lg p-4 border border-slate-200">
              <EfficiencyRatingsSVG />
            </div>

            {/* Efficiency Ratings Table */}
            <div className="overflow-x-auto">
              <table className="w-full text-sm border border-slate-200 rounded-lg overflow-hidden">
                <thead className="bg-[#1e3a5f] text-white">
                  <tr>
                    <th className="text-left px-4 py-3 font-semibold">Rating</th>
                    <th className="text-left px-4 py-3 font-semibold">Applies To</th>
                    <th className="text-left px-4 py-3 font-semibold">2023 Minimum</th>
                    <th className="text-left px-4 py-3 font-semibold">Excellent</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="bg-white">
                    <td className="px-4 py-3 font-medium text-slate-900">SEER2</td>
                    <td className="px-4 py-3 text-slate-600">Central AC &amp; Heat Pumps</td>
                    <td className="px-4 py-3 text-slate-900">13.4 - 14.3*</td>
                    <td className="px-4 py-3 text-green-700 font-medium">20+</td>
                  </tr>
                  <tr className="bg-slate-50">
                    <td className="px-4 py-3 font-medium text-slate-900">EER2</td>
                    <td className="px-4 py-3 text-slate-600">Central AC (peak cooling)</td>
                    <td className="px-4 py-3 text-slate-900">10.6 - 11.7*</td>
                    <td className="px-4 py-3 text-green-700 font-medium">14+</td>
                  </tr>
                  <tr className="bg-white">
                    <td className="px-4 py-3 font-medium text-slate-900">HSPF2</td>
                    <td className="px-4 py-3 text-slate-600">Heat Pump (heating)</td>
                    <td className="px-4 py-3 text-slate-900">7.5</td>
                    <td className="px-4 py-3 text-green-700 font-medium">10+</td>
                  </tr>
                  <tr className="bg-slate-50">
                    <td className="px-4 py-3 font-medium text-slate-900">AFUE</td>
                    <td className="px-4 py-3 text-slate-600">Gas Furnaces</td>
                    <td className="px-4 py-3 text-slate-900">80%</td>
                    <td className="px-4 py-3 text-green-700 font-medium">95%+</td>
                  </tr>
                  <tr className="bg-white">
                    <td className="px-4 py-3 font-medium text-slate-900">COP</td>
                    <td className="px-4 py-3 text-slate-600">Heat Pumps &amp; Geothermal</td>
                    <td className="px-4 py-3 text-slate-900">—</td>
                    <td className="px-4 py-3 text-green-700 font-medium">4.0+</td>
                  </tr>
                </tbody>
              </table>
              <p className="text-xs text-slate-500 mt-2">*Varies by region (North vs South). Source: DOE 10 CFR 430.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Climate Zones & Sizing */}
      <section className="py-16 bg-slate-50">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl md:text-3xl font-bold text-slate-950 mb-4">
            Climate Zones &amp; Equipment Sizing
          </h2>
          <p className="text-slate-600 mb-8 max-w-3xl">
            Your climate zone determines heating and cooling loads, efficiency requirements, and
            equipment recommendations. IECC climate zones range from Zone 1 (hot) to Zone 7 (very cold).
          </p>

          <div className="grid gap-8 lg:grid-cols-2">
            {/* Climate Zone SVG */}
            <div className="bg-white rounded-lg p-4 border border-slate-200">
              <ClimateZonesSVG />
            </div>

            {/* Sizing Guidelines Table */}
            <div>
              <h3 className="font-semibold text-slate-950 mb-4">Quick Sizing Guidelines</h3>
              <div className="overflow-x-auto">
                <table className="w-full text-sm border border-slate-200 rounded-lg overflow-hidden">
                  <thead className="bg-[#1e3a5f] text-white">
                    <tr>
                      <th className="text-left px-4 py-3 font-semibold">Climate</th>
                      <th className="text-left px-4 py-3 font-semibold">Cooling Load</th>
                      <th className="text-left px-4 py-3 font-semibold">Heating Load</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr className="bg-white">
                      <td className="px-4 py-3 font-medium text-slate-900">Hot (Zone 1-2)</td>
                      <td className="px-4 py-3 text-slate-600">500-700 sq ft/ton</td>
                      <td className="px-4 py-3 text-slate-600">25-35 BTU/sq ft</td>
                    </tr>
                    <tr className="bg-slate-50">
                      <td className="px-4 py-3 font-medium text-slate-900">Mixed (Zone 3-4)</td>
                      <td className="px-4 py-3 text-slate-600">550-700 sq ft/ton</td>
                      <td className="px-4 py-3 text-slate-600">35-45 BTU/sq ft</td>
                    </tr>
                    <tr className="bg-white">
                      <td className="px-4 py-3 font-medium text-slate-900">Cool (Zone 5)</td>
                      <td className="px-4 py-3 text-slate-600">600-800 sq ft/ton</td>
                      <td className="px-4 py-3 text-slate-600">45-55 BTU/sq ft</td>
                    </tr>
                    <tr className="bg-slate-50">
                      <td className="px-4 py-3 font-medium text-slate-900">Cold (Zone 6-7)</td>
                      <td className="px-4 py-3 text-slate-600">700-1000 sq ft/ton</td>
                      <td className="px-4 py-3 text-slate-600">50-60 BTU/sq ft</td>
                    </tr>
                  </tbody>
                </table>
              </div>
              <p className="text-xs text-slate-500 mt-2">
                These are rough estimates. Actual loads depend on insulation, windows, orientation, and occupancy.
                Use our <Link href="/ac-tonnage-calculator" className="text-[#1e3a5f] underline hover:text-[#c2410c]">AC tonnage calculator</Link> or <Link href="/heating-btu-calculator" className="text-[#1e3a5f] underline hover:text-[#c2410c]">heating BTU calculator</Link> for accurate sizing.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Operating Costs Reference */}
      <section className="py-16 bg-white">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl md:text-3xl font-bold text-slate-950 mb-4">
            Typical HVAC Operating Costs
          </h2>
          <p className="text-slate-600 mb-8 max-w-3xl">
            Operating costs vary significantly based on equipment efficiency, local energy rates, climate, and usage patterns.
            These estimates assume average U.S. electricity rates of $0.16/kWh and natural gas at $1.50/therm.
          </p>

          <div className="overflow-x-auto">
            <table className="w-full text-sm border border-slate-200 rounded-lg overflow-hidden">
              <thead className="bg-[#1e3a5f] text-white">
                <tr>
                  <th className="text-left px-4 py-3 font-semibold">Equipment Type</th>
                  <th className="text-left px-4 py-3 font-semibold">Typical Wattage</th>
                  <th className="text-left px-4 py-3 font-semibold">Cost/Hour</th>
                  <th className="text-left px-4 py-3 font-semibold">Cost/Month*</th>
                  <th className="text-left px-4 py-3 font-semibold">Calculator</th>
                </tr>
              </thead>
              <tbody>
                <tr className="bg-white">
                  <td className="px-4 py-3 font-medium text-slate-900">Central AC (3-ton)</td>
                  <td className="px-4 py-3 text-slate-600">3,000 - 3,500W</td>
                  <td className="px-4 py-3 text-slate-900">$0.48 - $0.56</td>
                  <td className="px-4 py-3 text-slate-900">$115 - $170</td>
                  <td className="px-4 py-3"><Link href="/cost-to-run-air-conditioner" className="text-[#1e3a5f] underline hover:text-[#c2410c]">Calculate</Link></td>
                </tr>
                <tr className="bg-slate-50">
                  <td className="px-4 py-3 font-medium text-slate-900">Heat Pump (cooling)</td>
                  <td className="px-4 py-3 text-slate-600">2,500 - 3,000W</td>
                  <td className="px-4 py-3 text-slate-900">$0.40 - $0.48</td>
                  <td className="px-4 py-3 text-slate-900">$95 - $145</td>
                  <td className="px-4 py-3"><Link href="/heat-pump-running-cost" className="text-[#1e3a5f] underline hover:text-[#c2410c]">Calculate</Link></td>
                </tr>
                <tr className="bg-white">
                  <td className="px-4 py-3 font-medium text-slate-900">Heat Pump (heating)</td>
                  <td className="px-4 py-3 text-slate-600">3,000 - 5,000W</td>
                  <td className="px-4 py-3 text-slate-900">$0.48 - $0.80</td>
                  <td className="px-4 py-3 text-slate-900">$145 - $240</td>
                  <td className="px-4 py-3"><Link href="/heat-pump-running-cost" className="text-[#1e3a5f] underline hover:text-[#c2410c]">Calculate</Link></td>
                </tr>
                <tr className="bg-slate-50">
                  <td className="px-4 py-3 font-medium text-slate-900">Gas Furnace (80k BTU)</td>
                  <td className="px-4 py-3 text-slate-600">500W + gas</td>
                  <td className="px-4 py-3 text-slate-900">$0.90 - $1.20</td>
                  <td className="px-4 py-3 text-slate-900">$135 - $180</td>
                  <td className="px-4 py-3"><Link href="/heating-cost-calculator" className="text-[#1e3a5f] underline hover:text-[#c2410c]">Calculate</Link></td>
                </tr>
                <tr className="bg-white">
                  <td className="px-4 py-3 font-medium text-slate-900">Electric Space Heater</td>
                  <td className="px-4 py-3 text-slate-600">1,500W</td>
                  <td className="px-4 py-3 text-slate-900">$0.24</td>
                  <td className="px-4 py-3 text-slate-900">$86 - $115</td>
                  <td className="px-4 py-3"><Link href="/cost-to-run-electric-heater" className="text-[#1e3a5f] underline hover:text-[#c2410c]">Calculate</Link></td>
                </tr>
                <tr className="bg-slate-50">
                  <td className="px-4 py-3 font-medium text-slate-900">Dehumidifier (50 pt)</td>
                  <td className="px-4 py-3 text-slate-600">300 - 700W</td>
                  <td className="px-4 py-3 text-slate-900">$0.05 - $0.11</td>
                  <td className="px-4 py-3 text-slate-900">$22 - $53</td>
                  <td className="px-4 py-3"><Link href="/dehumidifier-running-cost" className="text-[#1e3a5f] underline hover:text-[#c2410c]">Calculate</Link></td>
                </tr>
                <tr className="bg-white">
                  <td className="px-4 py-3 font-medium text-slate-900">Ceiling Fan</td>
                  <td className="px-4 py-3 text-slate-600">10 - 75W</td>
                  <td className="px-4 py-3 text-slate-900">$0.002 - $0.01</td>
                  <td className="px-4 py-3 text-slate-900">$1 - $5</td>
                  <td className="px-4 py-3"><Link href="/ceiling-fan-size" className="text-[#1e3a5f] underline hover:text-[#c2410c]">Size Guide</Link></td>
                </tr>
              </tbody>
            </table>
          </div>
          <p className="text-xs text-slate-500 mt-3">
            *Monthly estimates assume 8 hours/day operation. Actual costs vary based on local rates, runtime, and equipment efficiency.
            Use our calculators above for personalized estimates with your specific electricity rate.
          </p>
        </div>
      </section>

      {/* Common HVAC Problems Quick Reference */}
      <section className="py-16 bg-slate-50">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl md:text-3xl font-bold text-slate-950 mb-4">
            Common HVAC Problems &amp; Solutions
          </h2>
          <p className="text-slate-600 mb-8 max-w-3xl">
            Many HVAC issues have straightforward causes. Check these common problems before calling a technician.
          </p>

          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            <div className="bg-white rounded-lg border border-slate-200 p-6">
              <h3 className="font-semibold text-slate-950 mb-3">AC Not Cooling</h3>
              <ul className="text-sm text-slate-600 space-y-2">
                <li className="flex items-start gap-2">
                  <span className="text-[#c2410c] mt-0.5">1.</span>
                  Check thermostat is set to COOL and temperature is below room temp
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-[#c2410c] mt-0.5">2.</span>
                  Replace dirty air filter (restricted airflow is #1 cause)
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-[#c2410c] mt-0.5">3.</span>
                  Verify outdoor unit is running and not blocked by debris
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-[#c2410c] mt-0.5">4.</span>
                  Check circuit breakers for both indoor and outdoor units
                </li>
              </ul>
              <Link href="/ac-not-blowing-cold" className="text-sm text-[#1e3a5f] underline hover:text-[#c2410c] mt-4 inline-block">
                Full troubleshooting guide &rarr;
              </Link>
            </div>

            <div className="bg-white rounded-lg border border-slate-200 p-6">
              <h3 className="font-semibold text-slate-950 mb-3">Furnace Not Heating</h3>
              <ul className="text-sm text-slate-600 space-y-2">
                <li className="flex items-start gap-2">
                  <span className="text-[#c2410c] mt-0.5">1.</span>
                  Verify thermostat is set to HEAT and above room temperature
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-[#c2410c] mt-0.5">2.</span>
                  Check that gas valve is open (handle parallel to pipe)
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-[#c2410c] mt-0.5">3.</span>
                  Inspect pilot light or igniter for proper operation
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-[#c2410c] mt-0.5">4.</span>
                  Replace clogged filter causing limit switch trips
                </li>
              </ul>
              <Link href="/furnace-blowing-cold-air" className="text-sm text-[#1e3a5f] underline hover:text-[#c2410c] mt-4 inline-block">
                Full troubleshooting guide &rarr;
              </Link>
            </div>

            <div className="bg-white rounded-lg border border-slate-200 p-6">
              <h3 className="font-semibold text-slate-950 mb-3">High Energy Bills</h3>
              <ul className="text-sm text-slate-600 space-y-2">
                <li className="flex items-start gap-2">
                  <span className="text-[#c2410c] mt-0.5">1.</span>
                  Dirty filters force system to work harder (change monthly)
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-[#c2410c] mt-0.5">2.</span>
                  Duct leaks can waste 20-30% of conditioned air
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-[#c2410c] mt-0.5">3.</span>
                  Old equipment (15+ years) may be half as efficient as new
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-[#c2410c] mt-0.5">4.</span>
                  Poor insulation increases heating/cooling loads
                </li>
              </ul>
              <Link href="/hvac-efficiency" className="text-sm text-[#1e3a5f] underline hover:text-[#c2410c] mt-4 inline-block">
                Efficiency guides &rarr;
              </Link>
            </div>

            <div className="bg-white rounded-lg border border-slate-200 p-6">
              <h3 className="font-semibold text-slate-950 mb-3">Uneven Temperatures</h3>
              <ul className="text-sm text-slate-600 space-y-2">
                <li className="flex items-start gap-2">
                  <span className="text-[#c2410c] mt-0.5">1.</span>
                  Check that all supply vents are open and unobstructed
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-[#c2410c] mt-0.5">2.</span>
                  Ensure return air grilles are not blocked by furniture
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-[#c2410c] mt-0.5">3.</span>
                  Adjust dampers to balance airflow between zones
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-[#c2410c] mt-0.5">4.</span>
                  Consider duct sealing or zoning system upgrade
                </li>
              </ul>
              <Link href="/cold-air-return-vents" className="text-sm text-[#1e3a5f] underline hover:text-[#c2410c] mt-4 inline-block">
                Return vent guide &rarr;
              </Link>
            </div>

            <div className="bg-white rounded-lg border border-slate-200 p-6">
              <h3 className="font-semibold text-slate-950 mb-3">AC Short Cycling</h3>
              <ul className="text-sm text-slate-600 space-y-2">
                <li className="flex items-start gap-2">
                  <span className="text-[#c2410c] mt-0.5">1.</span>
                  Oversized equipment reaches setpoint too quickly
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-[#c2410c] mt-0.5">2.</span>
                  Low refrigerant causes pressure switch trips
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-[#c2410c] mt-0.5">3.</span>
                  Frozen evaporator coil due to restricted airflow
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-[#c2410c] mt-0.5">4.</span>
                  Faulty thermostat or loose wiring connections
                </li>
              </ul>
              <Link href="/ac-short-cycling" className="text-sm text-[#1e3a5f] underline hover:text-[#c2410c] mt-4 inline-block">
                Full troubleshooting guide &rarr;
              </Link>
            </div>

            <div className="bg-white rounded-lg border border-slate-200 p-6">
              <h3 className="font-semibold text-slate-950 mb-3">Strange Noises</h3>
              <ul className="text-sm text-slate-600 space-y-2">
                <li className="flex items-start gap-2">
                  <span className="text-[#c2410c] mt-0.5">•</span>
                  <strong>Squealing:</strong> Belt slipping or motor bearings
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-[#c2410c] mt-0.5">•</span>
                  <strong>Banging:</strong> Loose blower wheel or broken part
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-[#c2410c] mt-0.5">•</span>
                  <strong>Clicking:</strong> Relay issues or failing compressor
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-[#c2410c] mt-0.5">•</span>
                  <strong>Hissing:</strong> Refrigerant leak or duct leak
                </li>
              </ul>
              <Link href="/hvac-troubleshooting" className="text-sm text-[#1e3a5f] underline hover:text-[#c2410c] mt-4 inline-block">
                All troubleshooting guides &rarr;
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Pillar Navigation */}
      <section className="py-16 bg-white">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl md:text-3xl font-bold text-slate-950 mb-2">
            Browse by Topic
          </h2>
          <p className="text-slate-600 mb-8">
            Comprehensive guides organized by subject area.
          </p>
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {Object.entries(PILLAR_INFO)
              .filter(([key]) => key !== 'standalone')
              .map(([key, info]) => {
                const articles = getArticlesByPillar(key);
                const topArticles = articles.slice(0, 3);
                return (
                  <div
                    key={key}
                    className="bg-slate-50 p-6 rounded-lg border border-slate-200"
                  >
                    <Link href={info.hub}>
                      <h3 className="font-semibold text-lg text-slate-950 hover:text-[#c2410c] mb-2">
                        {info.name}
                      </h3>
                    </Link>
                    <p className="text-sm text-slate-600 mb-4">{info.description}</p>
                    <ul className="text-sm space-y-1 mb-3">
                      {topArticles.map((article) => (
                        <li key={article.slug}>
                          <Link
                            href={`/${article.slug}`}
                            className="text-[#1e3a5f] hover:text-[#c2410c] hover:underline"
                          >
                            {article.title.split(' — ')[0]}
                          </Link>
                        </li>
                      ))}
                    </ul>
                    <Link
                      href={info.hub}
                      className="text-xs text-slate-500 hover:text-[#c2410c]"
                    >
                      View all {articles.length} articles &rarr;
                    </Link>
                  </div>
                );
              })}
          </div>
        </div>
      </section>

      {/* Refrigerant Reference Quick Table */}
      <section className="py-16 bg-slate-50">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl md:text-3xl font-bold text-slate-950 mb-4">
            Common Refrigerants Reference
          </h2>
          <p className="text-slate-600 mb-8 max-w-3xl">
            R-22 was phased out in 2020. Most new systems use R-410A, though R-32 and R-454B are emerging as lower-GWP alternatives.
          </p>

          <div className="overflow-x-auto">
            <table className="w-full text-sm border border-slate-200 rounded-lg overflow-hidden">
              <thead className="bg-[#1e3a5f] text-white">
                <tr>
                  <th className="text-left px-4 py-3 font-semibold">Refrigerant</th>
                  <th className="text-left px-4 py-3 font-semibold">Type</th>
                  <th className="text-left px-4 py-3 font-semibold">GWP</th>
                  <th className="text-left px-4 py-3 font-semibold">Status</th>
                  <th className="text-left px-4 py-3 font-semibold">Common In</th>
                </tr>
              </thead>
              <tbody>
                <tr className="bg-white">
                  <td className="px-4 py-3 font-medium text-slate-900">R-22 (Freon)</td>
                  <td className="px-4 py-3 text-slate-600">HCFC</td>
                  <td className="px-4 py-3 text-slate-900">1,810</td>
                  <td className="px-4 py-3"><span className="text-red-700 font-medium">Phased Out (2020)</span></td>
                  <td className="px-4 py-3 text-slate-600">Pre-2010 AC units</td>
                </tr>
                <tr className="bg-slate-50">
                  <td className="px-4 py-3 font-medium text-slate-900">R-410A (Puron)</td>
                  <td className="px-4 py-3 text-slate-600">HFC Blend</td>
                  <td className="px-4 py-3 text-slate-900">2,088</td>
                  <td className="px-4 py-3"><span className="text-amber-700 font-medium">Current Standard</span></td>
                  <td className="px-4 py-3 text-slate-600">Most new AC/heat pumps</td>
                </tr>
                <tr className="bg-white">
                  <td className="px-4 py-3 font-medium text-slate-900">R-32</td>
                  <td className="px-4 py-3 text-slate-600">HFC</td>
                  <td className="px-4 py-3 text-slate-900">675</td>
                  <td className="px-4 py-3"><span className="text-green-700 font-medium">Growing Adoption</span></td>
                  <td className="px-4 py-3 text-slate-600">Mini-splits, newer AC</td>
                </tr>
                <tr className="bg-slate-50">
                  <td className="px-4 py-3 font-medium text-slate-900">R-454B</td>
                  <td className="px-4 py-3 text-slate-600">HFO Blend</td>
                  <td className="px-4 py-3 text-slate-900">466</td>
                  <td className="px-4 py-3"><span className="text-green-700 font-medium">2025 Standard</span></td>
                  <td className="px-4 py-3 text-slate-600">Future residential AC</td>
                </tr>
                <tr className="bg-white">
                  <td className="px-4 py-3 font-medium text-slate-900">R-134a</td>
                  <td className="px-4 py-3 text-slate-600">HFC</td>
                  <td className="px-4 py-3 text-slate-900">1,430</td>
                  <td className="px-4 py-3"><span className="text-amber-700 font-medium">Current</span></td>
                  <td className="px-4 py-3 text-slate-600">Auto AC, refrigerators</td>
                </tr>
              </tbody>
            </table>
          </div>
          <p className="text-xs text-slate-500 mt-3">
            GWP = Global Warming Potential (CO₂ = 1). Lower is better for the environment.
            <Link href="/refrigerants" className="text-[#1e3a5f] underline hover:text-[#c2410c] ml-1">
              View full refrigerant guides &rarr;
            </Link>
          </p>
        </div>
      </section>

      {/* How We're Different */}
      <section className="py-16 bg-white border-t border-slate-200">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl md:text-3xl font-bold text-slate-950 mb-8 text-center">
            Why Use HVAC Solver?
          </h2>
          <div className="grid gap-8 md:grid-cols-3">
            <div className="text-center">
              <div className="w-12 h-12 bg-slate-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-6 h-6 text-[#1e3a5f]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="font-semibold text-slate-950 mb-2">Engineering Standards</h3>
              <p className="text-slate-600 text-sm">
                Every calculator uses real methodology from ASHRAE, ACCA, DOE, and EPA.
                Formulas are cited and verifiable.
              </p>
            </div>
            <div className="text-center">
              <div className="w-12 h-12 bg-slate-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-6 h-6 text-[#1e3a5f]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 17v-2m3 2v-4m3 4v-6m2 10H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
              </div>
              <h3 className="font-semibold text-slate-950 mb-2">Real Data</h3>
              <p className="text-slate-600 text-sm">
                Every table includes units. Every calculation shows its work.
                Reference data comes from manufacturer specs and industry standards.
              </p>
            </div>
            <div className="text-center">
              <div className="w-12 h-12 bg-slate-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-6 h-6 text-[#1e3a5f]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18.364 18.364A9 9 0 005.636 5.636m12.728 12.728A9 9 0 015.636 5.636m12.728 12.728L5.636 5.636" />
                </svg>
              </div>
              <h3 className="font-semibold text-slate-950 mb-2">No Sales Pitch</h3>
              <p className="text-slate-600 text-sm">
                No product reviews. No sponsored content.
                Just technical information to help you make informed decisions.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
