import { generatePillarOGImage, OG_SIZE } from '@/lib/og-utils';
import { getArticlesByPillar } from '@/lib/articles';

export const alt = 'HVAC Efficiency - HVACSolver';
export const size = OG_SIZE;
export const contentType = 'image/png';

export default async function Image() {
  const articles = getArticlesByPillar('efficiency');
  return generatePillarOGImage({ pillarKey: 'efficiency', articleCount: articles.length });
}
