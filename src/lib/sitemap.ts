import { getAllArticles, PILLAR_INFO } from './articles';

const SITE_URL = 'https://www.hvacsolver.com';

// Hardcoded last-update dates for static legal pages.
// Update these when the corresponding page content meaningfully changes.
const STATIC_PAGE_DATES: Record<string, string> = {
  '/about': '2026-03-01',
  '/contact': '2026-03-01',
  '/privacy-policy': '2026-02-01', // page body: "Last updated: February 2026"
  '/terms-of-use': '2026-02-01',   // page body: "Last updated: February 2026"
};

const STATIC_PAGE_PRIORITY: Record<string, number> = {
  '/about': 0.6,
  '/contact': 0.5,
  '/privacy-policy': 0.3,
  '/terms-of-use': 0.3,
};

export interface SitemapEntry {
  url: string;
  lastModified: Date;
  changeFrequency: 'always' | 'hourly' | 'daily' | 'weekly' | 'monthly' | 'yearly' | 'never';
  priority: number;
}

/**
 * Generate all sitemap entries for the site.
 *
 * lastModified is sourced from each article's frontmatter dateModified.
 * Pillar hubs use the most recent dateModified of articles in that pillar.
 * Homepage uses the most recent dateModified across the whole corpus.
 * Static legal pages use the hardcoded dates above.
 */
export function generateSitemapEntries(): SitemapEntry[] {
  const entries: SitemapEntry[] = [];
  const articles = getAllArticles();

  // Compute aggregate dates from article corpus
  const allDates = articles.map((a) => a.dateModified).sort();
  const siteMaxModified = allDates[allDates.length - 1] || '2026-03-01';

  const pillarMaxModified: Record<string, string> = {};
  for (const a of articles) {
    const p = a.pillar;
    if (!pillarMaxModified[p] || a.dateModified > pillarMaxModified[p]) {
      pillarMaxModified[p] = a.dateModified;
    }
  }

  // Homepage
  entries.push({
    url: SITE_URL,
    lastModified: new Date(siteMaxModified),
    changeFrequency: 'weekly',
    priority: 1.0,
  });

  // Pillar hub pages
  Object.entries(PILLAR_INFO).forEach(([key, pillar]) => {
    if (pillar.hub !== '/') {
      entries.push({
        url: `${SITE_URL}${pillar.hub}`,
        lastModified: new Date(pillarMaxModified[key] || siteMaxModified),
        changeFrequency: 'weekly',
        priority: 0.9,
      });
    }
  });

  // Static legal pages
  Object.entries(STATIC_PAGE_DATES).forEach(([path, dateStr]) => {
    entries.push({
      url: `${SITE_URL}${path}`,
      lastModified: new Date(dateStr),
      changeFrequency: 'monthly',
      priority: STATIC_PAGE_PRIORITY[path] ?? 0.5,
    });
  });

  // Articles
  articles.forEach((article) => {
    entries.push({
      url: `${SITE_URL}/${article.slug}`,
      lastModified: new Date(article.dateModified),
      changeFrequency: 'monthly',
      priority: article.hasCalculator ? 0.8 : 0.7,
    });
  });

  return entries;
}

/**
 * Generate sitemap XML string (used only by audit/standalone tooling;
 * production sitemap is emitted by app/sitemap.ts via Next's metadata route).
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
