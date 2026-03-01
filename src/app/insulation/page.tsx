import { Metadata } from 'next';
import PillarHub from '@/components/layout/PillarHub';
import { getArticlesByPillar, PILLAR_INFO } from '@/lib/articles';
import { generateCollectionPageSchema, generatePillarBreadcrumbSchema, schemaToJsonLd } from '@/lib/schema';

const pillarKey = 'insulation';
const pillarInfo = PILLAR_INFO[pillarKey];

export const metadata: Metadata = {
  title: 'Insulation Guides — R-Value Charts & Requirements | HVACSolver',
  description: 'Insulation R-value charts, requirements by climate zone, and guides for understanding thermal resistance in walls, attics, and floors.',
  alternates: {
    canonical: pillarInfo?.hub,
  },
  openGraph: {
    title: 'Insulation Guides — R-Value Charts & Requirements',
    description: 'Insulation R-value charts, requirements by climate zone, and guides for understanding thermal resistance in walls, attics, and floors.',
    url: pillarInfo?.hub,
    siteName: 'HVACSolver',
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Insulation Guides — R-Value Charts & Requirements',
    description: 'Insulation R-value charts, requirements by climate zone, and thermal resistance guides.',
  },
};

export default function InsulationPage() {
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
