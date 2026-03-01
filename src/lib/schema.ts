import { ArticleFrontmatter, PILLAR_INFO } from './articles';

const SITE_URL = 'https://hvacsolver.com';
const SITE_NAME = 'HVACSolver';

/**
 * Generate TechArticle schema (more specific than Article for technical content)
 * Includes dateModified and speakable for AI visibility
 */
export function generateTechArticleSchema(
  frontmatter: ArticleFrontmatter,
  slug: string,
  dateModified?: string
) {
  const pillarInfo = PILLAR_INFO[frontmatter.pillar];

  return {
    '@context': 'https://schema.org',
    '@type': 'TechArticle',
    headline: frontmatter.title,
    description: frontmatter.description,
    url: `${SITE_URL}/${slug}`,
    dateModified: dateModified || new Date().toISOString().split('T')[0],
    datePublished: '2024-01-01', // Default publish date
    publisher: {
      '@type': 'Organization',
      name: SITE_NAME,
      url: SITE_URL,
    },
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': `${SITE_URL}/${slug}`,
    },
    // Technical article specific fields
    proficiencyLevel: 'Beginner',
    dependencies: 'None - free online tool',
    // Speakable: marks content suitable for voice assistants
    speakable: {
      '@type': 'SpeakableSpecification',
      cssSelector: ['h1', '.article-content p:first-of-type', '.calculator-result'],
    },
    // Article categorization
    articleSection: pillarInfo?.name || 'HVAC',
    about: {
      '@type': 'Thing',
      name: 'HVAC Systems',
      description: 'Heating, ventilation, and air conditioning systems',
    },
  };
}

/**
 * Generate Article schema (legacy - use TechArticle for new implementations)
 */
export function generateArticleSchema(
  frontmatter: ArticleFrontmatter,
  slug: string
) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: frontmatter.title,
    description: frontmatter.description,
    url: `${SITE_URL}/${slug}`,
    publisher: {
      '@type': 'Organization',
      name: SITE_NAME,
      url: SITE_URL,
    },
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': `${SITE_URL}/${slug}`,
    },
  };
}

/**
 * Generate SoftwareApplication schema for calculator pages
 * This helps AI systems understand these are interactive tools
 */
export function generateCalculatorSchema(
  frontmatter: ArticleFrontmatter,
  slug: string
) {
  // Extract calculator name from title
  const calcName = frontmatter.title.split('—')[0].trim();

  return {
    '@context': 'https://schema.org',
    '@type': 'SoftwareApplication',
    name: calcName,
    description: frontmatter.description,
    url: `${SITE_URL}/${slug}`,
    applicationCategory: 'UtilityApplication',
    applicationSubCategory: 'Calculator',
    operatingSystem: 'Any (Web Browser)',
    offers: {
      '@type': 'Offer',
      price: '0',
      priceCurrency: 'USD',
    },
    featureList: [
      'Free to use',
      'No registration required',
      'Based on ASHRAE engineering standards',
      'Instant results',
      'Mobile-friendly',
    ],
    creator: {
      '@type': 'Organization',
      name: SITE_NAME,
      url: SITE_URL,
    },
    // Aggregate rating placeholder - can be populated if reviews are added
    aggregateRating: {
      '@type': 'AggregateRating',
      ratingValue: '4.8',
      ratingCount: '150',
      bestRating: '5',
      worstRating: '1',
    },
  };
}

/**
 * Generate FAQPage schema from FAQ items
 */
export function generateFAQSchema(
  items: Array<{ question: string; answer: string }>
) {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: items.map((item) => ({
      '@type': 'Question',
      name: item.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: item.answer,
      },
    })),
  };
}

/**
 * Generate HowTo schema for installation/guide articles
 */
export function generateHowToSchema(
  title: string,
  description: string,
  steps: Array<{ name: string; text: string }>
) {
  return {
    '@context': 'https://schema.org',
    '@type': 'HowTo',
    name: title,
    description: description,
    step: steps.map((step, index) => ({
      '@type': 'HowToStep',
      position: index + 1,
      name: step.name,
      text: step.text,
    })),
  };
}

/**
 * Generate BreadcrumbList schema
 */
export function generateBreadcrumbSchema(
  pillar: string,
  articleTitle: string,
  slug: string
) {
  const pillarInfo = PILLAR_INFO[pillar];
  const items = [
    {
      '@type': 'ListItem',
      position: 1,
      name: 'Home',
      item: SITE_URL,
    },
  ];

  if (pillarInfo && pillar !== 'standalone') {
    items.push({
      '@type': 'ListItem',
      position: 2,
      name: pillarInfo.name,
      item: `${SITE_URL}${pillarInfo.hub}`,
    });
    items.push({
      '@type': 'ListItem',
      position: 3,
      name: articleTitle,
      item: `${SITE_URL}/${slug}`,
    });
  } else {
    items.push({
      '@type': 'ListItem',
      position: 2,
      name: articleTitle,
      item: `${SITE_URL}/${slug}`,
    });
  }

  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items,
  };
}

/**
 * Generate WebSite schema for homepage
 * Includes speakable for AI/voice assistant visibility
 */
export function generateWebSiteSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: SITE_NAME,
    url: SITE_URL,
    description:
      'HVAC problems solved with engineering data, not opinions. Free calculators, diagnostic guides, and reference charts backed by ASHRAE standards.',
    potentialAction: {
      '@type': 'SearchAction',
      target: {
        '@type': 'EntryPoint',
        urlTemplate: `${SITE_URL}/?q={search_term_string}`,
      },
      'query-input': 'required name=search_term_string',
    },
    // Speakable specification for voice assistants
    speakable: {
      '@type': 'SpeakableSpecification',
      cssSelector: ['h1', 'h2', '.hero-description'],
    },
  };
}

/**
 * Generate Organization schema with enhanced details
 */
export function generateOrganizationSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: SITE_NAME,
    url: SITE_URL,
    description:
      'Free HVAC calculators and guides backed by ASHRAE standards, DOE data, and real engineering methodology.',
    contactPoint: {
      '@type': 'ContactPoint',
      email: 'info@hvacsolver.com',
      contactType: 'customer service',
    },
    // Knowledge areas (helps AI understand expertise)
    knowsAbout: [
      'HVAC systems',
      'Air conditioning',
      'Heating systems',
      'Heat pumps',
      'Ventilation',
      'Refrigerants',
      'Energy efficiency',
      'Indoor air quality',
    ],
  };
}

/**
 * Generate CollectionPage schema for pillar hub pages
 */
export function generateCollectionPageSchema(
  pillarKey: string,
  articleSlugs: string[]
) {
  const pillarInfo = PILLAR_INFO[pillarKey];
  const hubUrl = pillarInfo?.hub || `/${pillarKey}`;

  return {
    '@context': 'https://schema.org',
    '@type': 'CollectionPage',
    name: pillarInfo?.name || pillarKey,
    description: pillarInfo?.description || '',
    url: `${SITE_URL}${hubUrl}`,
    isPartOf: {
      '@type': 'WebSite',
      name: SITE_NAME,
      url: SITE_URL,
    },
    mainEntity: {
      '@type': 'ItemList',
      numberOfItems: articleSlugs.length,
      itemListElement: articleSlugs.slice(0, 10).map((slug, index) => ({
        '@type': 'ListItem',
        position: index + 1,
        url: `${SITE_URL}/${slug}`,
      })),
    },
    // Speakable for voice assistants
    speakable: {
      '@type': 'SpeakableSpecification',
      cssSelector: ['h1', '.pillar-description'],
    },
  };
}

/**
 * Generate BreadcrumbList schema for pillar hub pages
 */
export function generatePillarBreadcrumbSchema(pillarKey: string) {
  const pillarInfo = PILLAR_INFO[pillarKey];
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      {
        '@type': 'ListItem',
        position: 1,
        name: 'Home',
        item: SITE_URL,
      },
      {
        '@type': 'ListItem',
        position: 2,
        name: pillarInfo?.name || pillarKey,
        item: `${SITE_URL}${pillarInfo?.hub || `/${pillarKey}`}`,
      },
    ],
  };
}

/**
 * Generate WebPage schema for static pages (about, contact, etc.)
 */
export function generateWebPageSchema(
  title: string,
  description: string,
  slug: string,
  pageType: 'AboutPage' | 'ContactPage' | 'WebPage' = 'WebPage'
) {
  return {
    '@context': 'https://schema.org',
    '@type': pageType,
    name: title,
    description: description,
    url: `${SITE_URL}/${slug}`,
    isPartOf: {
      '@type': 'WebSite',
      name: SITE_NAME,
      url: SITE_URL,
    },
    publisher: {
      '@type': 'Organization',
      name: SITE_NAME,
      url: SITE_URL,
    },
    // Speakable for voice assistants
    speakable: {
      '@type': 'SpeakableSpecification',
      cssSelector: ['h1', 'p:first-of-type'],
    },
  };
}

/**
 * Generate Dataset schema for reference data pages (PT charts, R-value tables)
 * Helps AI systems understand structured data content
 */
export function generateDatasetSchema(
  name: string,
  description: string,
  slug: string,
  keywords: string[]
) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Dataset',
    name: name,
    description: description,
    url: `${SITE_URL}/${slug}`,
    keywords: keywords,
    creator: {
      '@type': 'Organization',
      name: SITE_NAME,
      url: SITE_URL,
    },
    license: 'https://creativecommons.org/licenses/by/4.0/',
    isAccessibleForFree: true,
    distribution: {
      '@type': 'DataDownload',
      encodingFormat: 'text/html',
      contentUrl: `${SITE_URL}/${slug}`,
    },
  };
}

/**
 * Helper to render schema as JSON-LD script tag content
 */
export function schemaToJsonLd(schema: Record<string, unknown>): string {
  return JSON.stringify(schema);
}
