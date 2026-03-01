import { generatePillarOGImage, OG_SIZE } from '@/lib/og-utils';
import { getArticlesByPillar } from '@/lib/articles';

export const alt = 'Energy Costs - HVACSolver';
export const size = OG_SIZE;
export const contentType = 'image/png';

export default async function Image() {
  const articles = getArticlesByPillar('energy-costs');
  return generatePillarOGImage({ pillarKey: 'energy-costs', articleCount: articles.length });
}
