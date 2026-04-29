import { Metadata } from 'next';
import PillarHub from '@/components/layout/PillarHub';
import { getArticlesByPillar, PILLAR_INFO } from '@/lib/articles';
import { generateCollectionPageSchema, generatePillarBreadcrumbSchema, schemaToJsonLd } from '@/lib/schema';

const pillarKey = 'installation';
const pillarInfo = PILLAR_INFO[pillarKey];

export const metadata: Metadata = {
  title: 'HVAC Installation Guides — DIY Setup & Wiring',
  description: 'HVAC installation guides for thermostats, window AC units, bathroom fans, and more. Includes wiring diagrams and step-by-step instructions.',
  alternates: {
    canonical: pillarInfo?.hub,
  },
  openGraph: {
    title: 'HVAC Installation Guides — DIY Setup & Wiring',
    description: 'HVAC installation guides for thermostats, window AC units, bathroom fans, and more. Includes wiring diagrams and step-by-step instructions.',
    url: pillarInfo?.hub,
    siteName: 'HVACSolver',
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'HVAC Installation Guides — DIY Setup & Wiring',
    description: 'HVAC installation guides for thermostats, window AC units, bathroom fans, and more.',
  },
};

export default function HVACInstallationPage() {
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
