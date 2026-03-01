import { generateStaticPageOGImage, OG_SIZE } from '@/lib/og-utils';

export const alt = 'About HVACSolver';
export const size = OG_SIZE;
export const contentType = 'image/png';

export default async function Image() {
  return generateStaticPageOGImage({
    title: 'About HVACSolver',
    description: 'Free HVAC calculators and guides backed by ASHRAE standards and real engineering methodology',
    icon: 'ℹ️',
  });
}
