import { ArticleFrontmatter, ArticleSummary, PILLAR_INFO } from './articles';

const SITE_URL = 'https://www.hvacsolver.com';
const SITE_NAME = 'HVACSolver';
const ORG_ID = `${SITE_URL}#organization`;
const WEBSITE_ID = `${SITE_URL}#website`;

const articleId = (slug: string) => `${SITE_URL}/${slug}#article`;
const webpageId = (slug: string) => `${SITE_URL}/${slug}#webpage`;
const calculatorId = (slug: string) => `${SITE_URL}/${slug}#calculator`;
const datasetId = (slug: string) => `${SITE_URL}/${slug}#dataset`;

/**
 * Generate TechArticle schema (more specific than Article for technical content)
 * Reads datePublished and dateModified from frontmatter (required) — no
 * synthetic fallbacks. Includes image (required by Google Article rich
 * results), author/publisher referencing the Organization, and speakable.
 */
export function generateTechArticleSchema(
  frontmatter: ArticleFrontmatter,
  slug: string
) {
  const pillarInfo = PILLAR_INFO[frontmatter.pillar];
  const articleUrl = `${SITE_URL}/${slug}`;

  return {
    '@context': 'https://schema.org',
    '@type': 'TechArticle',
    '@id': articleId(slug),
    headline: frontmatter.title,
    description: frontmatter.description,
    url: articleUrl,
    datePublished: frontmatter.datePublished,
    dateModified: frontmatter.dateModified,
    image: {
      '@type': 'ImageObject',
      url: `${articleUrl}/opengraph-image`,
      width: 1200,
      height: 630,
    },
    author: { '@id': ORG_ID },
    publisher: { '@id': ORG_ID },
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': webpageId(slug),
    },
    speakable: {
      '@type': 'SpeakableSpecification',
      cssSelector: ['h1', '.article-content p:first-of-type'],
    },
    articleSection: pillarInfo?.name || 'HVAC',
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
    '@id': calculatorId(slug),
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
    creator: { '@id': ORG_ID },
    isPartOf: { '@id': articleId(slug) },
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
 * Generate WebSite schema for homepage. Linked to Organization via publisher @id.
 */
export function generateWebSiteSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    '@id': WEBSITE_ID,
    name: SITE_NAME,
    url: SITE_URL,
    description:
      'HVAC problems solved with engineering data, not opinions. Free calculators, diagnostic guides, and reference charts backed by ASHRAE standards.',
    publisher: { '@id': ORG_ID },
    speakable: {
      '@type': 'SpeakableSpecification',
      cssSelector: ['h1', 'h2'],
    },
  };
}

/**
 * Generate Organization schema with logo (required for Google publisher rich
 * results), contact info, knowledge areas, and identity for cross-references.
 */
export function generateOrganizationSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    '@id': ORG_ID,
    name: SITE_NAME,
    url: SITE_URL,
    logo: {
      '@type': 'ImageObject',
      url: `${SITE_URL}/logo.png`,
      width: 512,
      height: 512,
    },
    description:
      'Free HVAC calculators and guides backed by ASHRAE standards, DOE data, and real engineering methodology.',
    contactPoint: {
      '@type': 'ContactPoint',
      email: 'info@hvacsolver.com',
      contactType: 'customer service',
    },
    sameAs: [],
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
 * Generate CollectionPage schema for pillar hub pages.
 * Accepts article summaries so each ListItem carries name + url.
 */
export function generateCollectionPageSchema(
  pillarKey: string,
  articles: Pick<ArticleSummary, 'slug' | 'title'>[]
) {
  const pillarInfo = PILLAR_INFO[pillarKey];
  const hubUrl = pillarInfo?.hub || `/${pillarKey}`;

  return {
    '@context': 'https://schema.org',
    '@type': 'CollectionPage',
    name: pillarInfo?.name || pillarKey,
    description: pillarInfo?.description || '',
    url: `${SITE_URL}${hubUrl}`,
    isPartOf: { '@id': WEBSITE_ID },
    publisher: { '@id': ORG_ID },
    mainEntity: {
      '@type': 'ItemList',
      numberOfItems: articles.length,
      itemListElement: articles.slice(0, 10).map((article, index) => ({
        '@type': 'ListItem',
        position: index + 1,
        name: article.title.split(' — ')[0].split(' | ')[0].trim(),
        url: `${SITE_URL}/${article.slug}`,
      })),
    },
    speakable: {
      '@type': 'SpeakableSpecification',
      cssSelector: ['header h1', 'header p'],
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
    '@id': datasetId(slug),
    name,
    description,
    url: `${SITE_URL}/${slug}`,
    keywords,
    creator: { '@id': ORG_ID },
    license: 'https://creativecommons.org/licenses/by/4.0/',
    isAccessibleForFree: true,
    isPartOf: { '@id': articleId(slug) },
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
