import { generatePillarOGImage, OG_SIZE } from '@/lib/og-utils';
import { getArticlesByPillar } from '@/lib/articles';

export const alt = 'Refrigerants - HVACSolver';
export const size = OG_SIZE;
export const contentType = 'image/png';

export default async function Image() {
  const articles = getArticlesByPillar('refrigerants');
  return generatePillarOGImage({ pillarKey: 'refrigerants', articleCount: articles.length });
}
