import { Metadata } from 'next';
import PillarHub from '@/components/layout/PillarHub';
import { getArticlesByPillar, PILLAR_INFO } from '@/lib/articles';
import { generateCollectionPageSchema, generatePillarBreadcrumbSchema, schemaToJsonLd } from '@/lib/schema';

const pillarKey = 'energy-costs';
const pillarInfo = PILLAR_INFO[pillarKey];

export const metadata: Metadata = {
  title: 'HVAC Energy Costs — Running Cost Calculators | HVACSolver',
  description: 'Calculate the cost to run air conditioners, heaters, dehumidifiers, and other HVAC equipment. Compare energy costs across different systems.',
  alternates: {
    canonical: pillarInfo?.hub,
  },
  openGraph: {
    title: 'HVAC Energy Costs — Running Cost Calculators',
    description: 'Calculate the cost to run air conditioners, heaters, dehumidifiers, and other HVAC equipment. Compare energy costs across different systems.',
    url: pillarInfo?.hub,
    siteName: 'HVACSolver',
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'HVAC Energy Costs — Running Cost Calculators',
    description: 'Calculate the cost to run air conditioners, heaters, dehumidifiers, and other HVAC equipment.',
  },
};

export default function EnergyCostsPage() {
  const articles = getArticlesByPillar(pillarKey);
  const articleSlugs = articles.map(a => a.slug);

  const collectionSchema = generateCollectionPageSchema(pillarKey, articleSlugs);
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
