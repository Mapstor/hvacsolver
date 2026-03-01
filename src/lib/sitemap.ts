import { getAllArticles, PILLAR_INFO } from './articles';

const SITE_URL = 'https://hvacsolver.com';

export interface SitemapEntry {
  url: string;
  lastModified: Date;
  changeFrequency: 'always' | 'hourly' | 'daily' | 'weekly' | 'monthly' | 'yearly' | 'never';
  priority: number;
}

/**
 * Generate all sitemap entries for the site
 */
export function generateSitemapEntries(): SitemapEntry[] {
  const entries: SitemapEntry[] = [];
  const now = new Date();

  // Homepage - highest priority
  entries.push({
    url: SITE_URL,
    lastModified: now,
    changeFrequency: 'weekly',
    priority: 1.0,
  });

  // Pillar hub pages - high priority
  Object.values(PILLAR_INFO).forEach((pillar) => {
    if (pillar.hub !== '/') {
      entries.push({
        url: `${SITE_URL}${pillar.hub}`,
        lastModified: now,
        changeFrequency: 'weekly',
        priority: 0.9,
      });
    }
  });

  // Static pages
  const staticPages = [
    { path: '/about', priority: 0.6 },
    { path: '/contact', priority: 0.5 },
    { path: '/privacy-policy', priority: 0.3 },
    { path: '/terms-of-use', priority: 0.3 },
  ];

  staticPages.forEach(({ path, priority }) => {
    entries.push({
      url: `${SITE_URL}${path}`,
      lastModified: now,
      changeFrequency: 'monthly',
      priority,
    });
  });

  // All articles
  const articles = getAllArticles();
  articles.forEach((article) => {
    // Calculator articles get higher priority
    const priority = article.hasCalculator ? 0.8 : 0.7;

    entries.push({
      url: `${SITE_URL}/${article.slug}`,
      lastModified: now,
      changeFrequency: 'monthly',
      priority,
    });
  });

  return entries;
}

/**
 * Generate sitemap XML string
 */
export function generateSitemapXML(): string {
  const entries = generateSitemapEntries();

  const urlElements = entries
    .map(
      (entry) => `
  <url>
    <loc>${entry.url}</loc>
    <lastmod>${entry.lastModified.toISOString()}</lastmod>
    <changefreq>${entry.changeFrequency}</changefreq>
    <priority>${entry.priority}</priority>
  </url>`
    )
    .join('');

  return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urlElements}
</urlset>`;
}
