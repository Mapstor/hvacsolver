import { generateStaticPageOGImage, OG_SIZE } from '@/lib/og-utils';

export const alt = 'Terms of Use - HVACSolver';
export const size = OG_SIZE;
export const contentType = 'image/png';

export default async function Image() {
  return generateStaticPageOGImage({
    title: 'Terms of Use',
    description: 'Terms and conditions for using HVACSolver calculators and guides',
    icon: '📋',
  });
}
