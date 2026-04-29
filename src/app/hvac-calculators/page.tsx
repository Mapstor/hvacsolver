import { Metadata } from 'next';
import PillarHub from '@/components/layout/PillarHub';
import { getArticlesByPillar, PILLAR_INFO } from '@/lib/articles';
import { generateCollectionPageSchema, generatePillarBreadcrumbSchema, schemaToJsonLd } from '@/lib/schema';

const pillarKey = 'calculators';
const pillarInfo = PILLAR_INFO[pillarKey];

export const metadata: Metadata = {
  title: 'HVAC Calculators — Free Sizing & Cost Tools',
  description: 'Free HVAC calculators for AC tonnage, furnace sizing, duct CFM, heating costs, and more. Based on ASHRAE standards and Manual J methodology.',
  alternates: {
    canonical: pillarInfo?.hub,
  },
  openGraph: {
    title: 'HVAC Calculators — Free Sizing & Cost Tools',
    description: 'Free HVAC calculators for AC tonnage, furnace sizing, duct CFM, heating costs, and more. Based on ASHRAE standards and Manual J methodology.',
    url: pillarInfo?.hub,
    siteName: 'HVACSolver',
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'HVAC Calculators — Free Sizing & Cost Tools',
    description: 'Free HVAC calculators for AC tonnage, furnace sizing, duct CFM, heating costs, and more.',
  },
};

export default function HVACCalculatorsPage() {
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
