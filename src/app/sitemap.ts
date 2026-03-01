import { MetadataRoute } from 'next';
import { generateSitemapEntries } from '@/lib/sitemap';

export default function sitemap(): MetadataRoute.Sitemap {
  const entries = generateSitemapEntries();

  return entries.map((entry) => ({
    url: entry.url,
    lastModified: entry.lastModified,
    changeFrequency: entry.changeFrequency,
    priority: entry.priority,
  }));
}
