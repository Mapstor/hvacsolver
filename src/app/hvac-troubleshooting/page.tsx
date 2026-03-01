import { Metadata } from 'next';
import PillarHub from '@/components/layout/PillarHub';
import { getArticlesByPillar, PILLAR_INFO } from '@/lib/articles';
import { generateCollectionPageSchema, generatePillarBreadcrumbSchema, schemaToJsonLd } from '@/lib/schema';

const pillarKey = 'troubleshooting';
const pillarInfo = PILLAR_INFO[pillarKey];

export const metadata: Metadata = {
  title: 'HVAC Troubleshooting Guides — Diagnose Common Problems | HVACSolver',
  description: 'Step-by-step HVAC troubleshooting guides for AC not cooling, furnace issues, thermostat problems, and more. Diagnose before you call a technician.',
  alternates: {
    canonical: pillarInfo?.hub,
  },
  openGraph: {
    title: 'HVAC Troubleshooting Guides — Diagnose Common Problems',
    description: 'Step-by-step HVAC troubleshooting guides for AC not cooling, furnace issues, thermostat problems, and more.',
    url: pillarInfo?.hub,
    siteName: 'HVACSolver',
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'HVAC Troubleshooting Guides — Diagnose Common Problems',
    description: 'Step-by-step HVAC troubleshooting guides for AC not cooling, furnace issues, thermostat problems, and more.',
  },
};

export default function HVACTroubleshootingPage() {
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
