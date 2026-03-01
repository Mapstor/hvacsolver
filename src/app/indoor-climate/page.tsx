import { Metadata } from 'next';
import PillarHub from '@/components/layout/PillarHub';
import { getArticlesByPillar, PILLAR_INFO } from '@/lib/articles';
import { generateCollectionPageSchema, generatePillarBreadcrumbSchema, schemaToJsonLd } from '@/lib/schema';

const pillarKey = 'indoor-climate';
const pillarInfo = PILLAR_INFO[pillarKey];

export const metadata: Metadata = {
  title: 'Indoor Climate — Humidity, Air Quality & Comfort | HVACSolver',
  description: 'Guides for indoor humidity control, air purifiers, dehumidifiers, and maintaining optimal indoor air quality and comfort levels.',
  alternates: {
    canonical: pillarInfo?.hub,
  },
  openGraph: {
    title: 'Indoor Climate — Humidity, Air Quality & Comfort',
    description: 'Guides for indoor humidity control, air purifiers, dehumidifiers, and maintaining optimal indoor air quality and comfort levels.',
    url: pillarInfo?.hub,
    siteName: 'HVACSolver',
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Indoor Climate — Humidity, Air Quality & Comfort',
    description: 'Guides for indoor humidity control, air purifiers, dehumidifiers, and comfort.',
  },
};

export default function IndoorClimatePage() {
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
