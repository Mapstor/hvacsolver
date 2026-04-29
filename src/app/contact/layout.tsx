import { Metadata } from 'next';
import { generateWebPageSchema, schemaToJsonLd } from '@/lib/schema';

export const metadata: Metadata = {
  title: 'Contact Us',
  description: 'Have a question, found an error, or want to suggest an improvement? Contact the HVACSolver team.',
  alternates: {
    canonical: '/contact',
  },
  openGraph: {
    title: 'Contact HVACSolver',
    description: 'Have a question, found an error, or want to suggest an improvement? Contact the HVACSolver team.',
    url: '/contact',
    siteName: 'HVACSolver',
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Contact HVACSolver',
    description: 'Have a question or found an error? Contact the HVACSolver team.',
  },
};

export default function ContactLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const contactSchema = generateWebPageSchema(
    'Contact Us',
    'Have a question, found an error, or want to suggest an improvement? Contact the HVACSolver team.',
    'contact',
    'ContactPage'
  );

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: schemaToJsonLd(contactSchema) }}
      />
      {children}
    </>
  );
}
