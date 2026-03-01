import { generateStaticPageOGImage, OG_SIZE } from '@/lib/og-utils';

export const alt = 'Privacy Policy - HVACSolver';
export const size = OG_SIZE;
export const contentType = 'image/png';

export default async function Image() {
  return generateStaticPageOGImage({
    title: 'Privacy Policy',
    description: 'How we collect, use, and protect your information',
    icon: '🔒',
  });
}
