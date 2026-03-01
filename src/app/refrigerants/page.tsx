import { Metadata } from 'next';
import PillarHub from '@/components/layout/PillarHub';
import { getArticlesByPillar, PILLAR_INFO } from '@/lib/articles';
import { generateCollectionPageSchema, generatePillarBreadcrumbSchema, schemaToJsonLd } from '@/lib/schema';

const pillarKey = 'refrigerants';
const pillarInfo = PILLAR_INFO[pillarKey];

export const metadata: Metadata = {
  title: 'Refrigerants — PT Charts, Types & Technical Data | HVACSolver',
  description: 'Refrigerant pressure-temperature charts, superheat/subcooling guides, and technical data for R-410A, R-22, R-32, and other common refrigerants.',
  alternates: {
    canonical: pillarInfo?.hub,
  },
  openGraph: {
    title: 'Refrigerants — PT Charts, Types & Technical Data',
    description: 'Refrigerant pressure-temperature charts, superheat/subcooling guides, and technical data for R-410A, R-22, R-32, and other common refrigerants.',
    url: pillarInfo?.hub,
    siteName: 'HVACSolver',
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Refrigerants — PT Charts, Types & Technical Data',
    description: 'Refrigerant PT charts, superheat/subcooling guides, and technical data for common refrigerants.',
  },
};

export default function RefrigerantsPage() {
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
