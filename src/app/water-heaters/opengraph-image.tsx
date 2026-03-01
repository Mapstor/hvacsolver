import { generatePillarOGImage, OG_SIZE } from '@/lib/og-utils';
import { getArticlesByPillar } from '@/lib/articles';

export const alt = 'Water Heaters - HVACSolver';
export const size = OG_SIZE;
export const contentType = 'image/png';

export default async function Image() {
  const articles = getArticlesByPillar('water-heaters');
  return generatePillarOGImage({ pillarKey: 'water-heaters', articleCount: articles.length });
}
