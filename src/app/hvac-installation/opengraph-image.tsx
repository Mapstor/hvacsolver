import { generatePillarOGImage, OG_SIZE } from '@/lib/og-utils';
import { getArticlesByPillar } from '@/lib/articles';

export const alt = 'HVAC Installation - HVACSolver';
export const size = OG_SIZE;
export const contentType = 'image/png';

export default async function Image() {
  const articles = getArticlesByPillar('installation');
  return generatePillarOGImage({ pillarKey: 'installation', articleCount: articles.length });
}
