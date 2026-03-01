import { generateStaticPageOGImage, OG_SIZE } from '@/lib/og-utils';

export const alt = 'Contact HVACSolver';
export const size = OG_SIZE;
export const contentType = 'image/png';

export default async function Image() {
  return generateStaticPageOGImage({
    title: 'Contact Us',
    description: 'Have a question or found an error? We\'d like to hear from you.',
    icon: '📧',
  });
}
