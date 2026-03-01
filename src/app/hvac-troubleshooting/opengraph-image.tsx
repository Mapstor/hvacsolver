import { generatePillarOGImage, OG_SIZE } from '@/lib/og-utils';
import { getArticlesByPillar } from '@/lib/articles';

export const alt = 'HVAC Troubleshooting - HVACSolver';
export const size = OG_SIZE;
export const contentType = 'image/png';

export default async function Image() {
  const articles = getArticlesByPillar('troubleshooting');
  return generatePillarOGImage({ pillarKey: 'troubleshooting', articleCount: articles.length });
}
