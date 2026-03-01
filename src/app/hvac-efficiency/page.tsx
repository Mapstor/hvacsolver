import { Metadata } from 'next';
import PillarHub from '@/components/layout/PillarHub';
import { getArticlesByPillar, PILLAR_INFO } from '@/lib/articles';
import { generateCollectionPageSchema, generatePillarBreadcrumbSchema, schemaToJsonLd } from '@/lib/schema';

const pillarKey = 'efficiency';
const pillarInfo = PILLAR_INFO[pillarKey];

export const metadata: Metadata = {
  title: 'HVAC Efficiency Ratings — SEER, AFUE, HSPF Explained | HVACSolver',
  description: 'Understand HVAC efficiency ratings including SEER, AFUE, HSPF, EER, and COP. Learn what the numbers mean and how to compare systems.',
  alternates: {
    canonical: pillarInfo?.hub,
  },
  openGraph: {
    title: 'HVAC Efficiency Ratings — SEER, AFUE, HSPF Explained',
    description: 'Understand HVAC efficiency ratings including SEER, AFUE, HSPF, EER, and COP. Learn what the numbers mean and how to compare systems.',
    url: pillarInfo?.hub,
    siteName: 'HVACSolver',
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'HVAC Efficiency Ratings — SEER, AFUE, HSPF Explained',
    description: 'Understand HVAC efficiency ratings including SEER, AFUE, HSPF, EER, and COP.',
  },
};

export default function HVACEfficiencyPage() {
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
