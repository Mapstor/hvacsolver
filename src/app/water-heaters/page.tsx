import { Metadata } from 'next';
import PillarHub from '@/components/layout/PillarHub';
import { getArticlesByPillar, PILLAR_INFO } from '@/lib/articles';
import { generateCollectionPageSchema, generatePillarBreadcrumbSchema, schemaToJsonLd } from '@/lib/schema';

const pillarKey = 'water-heaters';
const pillarInfo = PILLAR_INFO[pillarKey];

export const metadata: Metadata = {
  title: 'Water Heaters — Sizing, Types & Efficiency',
  description: 'Water heater sizing calculators, tankless vs tank comparisons, and guides for choosing the right water heater for your home.',
  alternates: {
    canonical: pillarInfo?.hub,
  },
  openGraph: {
    title: 'Water Heaters — Sizing, Types & Efficiency',
    description: 'Water heater sizing calculators, tankless vs tank comparisons, and guides for choosing the right water heater for your home.',
    url: pillarInfo?.hub,
    siteName: 'HVACSolver',
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Water Heaters — Sizing, Types & Efficiency',
    description: 'Water heater sizing calculators, tankless vs tank comparisons, and selection guides.',
  },
};

export default function WaterHeatersPage() {
  const articles = getArticlesByPillar(pillarKey);
  const collectionSchema = generateCollectionPageSchema(pillarKey, articles);
  const breadcrumbSchema = generatePillarBreadcrumbSchema(pillarKey);

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: schemaToJsonLd(collectionSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: schemaToJsonLd(breadcrumbSchema) }}
      />
      <PillarHub pillarKey={pillarKey} />
    </>
  );
}
