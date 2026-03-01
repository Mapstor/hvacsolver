import { Metadata } from 'next';
import { generateWebPageSchema, schemaToJsonLd } from '@/lib/schema';

export const metadata: Metadata = {
  title: 'Privacy Policy | HVACSolver',
  description: 'Privacy policy for HVACSolver.com explaining how we collect, use, and protect your information.',
  alternates: {
    canonical: '/privacy-policy',
  },
  openGraph: {
    title: 'Privacy Policy - HVACSolver',
    description: 'Privacy policy for HVACSolver.com explaining how we collect, use, and protect your information.',
    url: '/privacy-policy',
    siteName: 'HVACSolver',
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Privacy Policy - HVACSolver',
    description: 'Privacy policy for HVACSolver.com explaining how we collect, use, and protect your information.',
  },
};

export default function PrivacyPolicyPage() {
  const pageSchema = generateWebPageSchema(
    'Privacy Policy',
    'Privacy policy for HVACSolver.com explaining how we collect, use, and protect your information.',
    'privacy-policy'
  );

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: schemaToJsonLd(pageSchema) }}
      />
      <div className="bg-white">
        <div className="mx-auto max-w-3xl px-4 py-12 sm:px-6 lg:px-8">
          <h1 className="text-3xl md:text-4xl font-bold text-slate-950 mb-2">
            Privacy Policy
          </h1>
          <p className="text-slate-500 mb-8">Last updated: February 2026</p>

          <div className="prose prose-slate max-w-none space-y-6 text-slate-700">
            <section>
              <h2 className="text-xl font-bold text-slate-950 mt-8 mb-4">Overview</h2>
              <p>
                HVACSolver.com (&quot;we,&quot; &quot;us,&quot; or &quot;our&quot;) respects your privacy. This policy explains
                what information we collect, how we use it, and your choices regarding that information.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-bold text-slate-950 mt-8 mb-4">Information We Collect</h2>

              <h3 className="text-lg font-semibold text-slate-950 mt-6 mb-2">Information You Provide</h3>
              <p>
                If you contact us through our contact form, we collect your name, email address,
                and message content. We use this information solely to respond to your inquiry.
              </p>

              <h3 className="text-lg font-semibold text-slate-950 mt-6 mb-2">Automatically Collected Information</h3>
              <p>
                Like most websites, we automatically collect certain information when you visit:
              </p>
              <ul className="list-disc pl-6 space-y-1">
                <li>IP address (anonymized)</li>
                <li>Browser type and version</li>
                <li>Device type</li>
                <li>Pages visited and time spent</li>
                <li>Referring website</li>
              </ul>
              <p>
                This information helps us understand how visitors use our site and improve our content.
              </p>

              <h3 className="text-lg font-semibold text-slate-950 mt-6 mb-2">Calculator Inputs</h3>
              <p>
                When you use our calculators, all calculations happen in your browser. We do not
                collect, store, or transmit the values you enter into our calculators.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-bold text-slate-950 mt-8 mb-4">Advertising</h2>
              <p>
                We display ads through Raptive (formerly AdThrive), a digital advertising company.
                Raptive and its partners may use cookies and similar technologies to:
              </p>
              <ul className="list-disc pl-6 space-y-1">
                <li>Serve ads based on your interests</li>
                <li>Measure ad performance</li>
                <li>Limit how often you see an ad</li>
              </ul>
              <p>
                You can learn more about Raptive&apos;s privacy practices at{' '}
                <a
                  href="https://raptive.com/privacy-policy/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[#1e3a5f] underline hover:text-[#c2410c]"
                >
                  raptive.com/privacy-policy
                </a>.
              </p>
              <p>
                To opt out of personalized advertising, you can visit{' '}
                <a
                  href="https://optout.aboutads.info/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[#1e3a5f] underline hover:text-[#c2410c]"
                >
                  optout.aboutads.info
                </a>{' '}
                or{' '}
                <a
                  href="https://optout.networkadvertising.org/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[#1e3a5f] underline hover:text-[#c2410c]"
                >
                  optout.networkadvertising.org
                </a>.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-bold text-slate-950 mt-8 mb-4">Analytics</h2>
              <p>
                We use analytics tools to understand how visitors interact with our website.
                This helps us improve our content and user experience. Analytics data is
                aggregated and does not identify individual users.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-bold text-slate-950 mt-8 mb-4">Cookies</h2>
              <p>
                Cookies are small text files stored on your device. We use cookies for:
              </p>
              <ul className="list-disc pl-6 space-y-1">
                <li><strong>Essential cookies:</strong> Required for the website to function</li>
                <li><strong>Analytics cookies:</strong> Help us understand site usage</li>
                <li><strong>Advertising cookies:</strong> Used by our ad partners to serve relevant ads</li>
              </ul>
              <p>
                You can control cookies through your browser settings. Note that disabling
                cookies may affect site functionality.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-bold text-slate-950 mt-8 mb-4">Data Sharing</h2>
              <p>
                We do not sell your personal information to third parties. We may share
                information with:
              </p>
              <ul className="list-disc pl-6 space-y-1">
                <li>Service providers who help operate our website (hosting, analytics)</li>
                <li>Advertising partners as described above</li>
                <li>Legal authorities if required by law</li>
              </ul>
            </section>

            <section>
              <h2 className="text-xl font-bold text-slate-950 mt-8 mb-4">Your Rights</h2>
              <p>
                Depending on your location, you may have rights regarding your personal information,
                including the right to access, correct, or delete your data. To exercise these rights,
                contact us at{' '}
                <a
                  href="mailto:info@hvacsolver.com"
                  className="text-[#1e3a5f] underline hover:text-[#c2410c]"
                >
                  info@hvacsolver.com
                </a>.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-bold text-slate-950 mt-8 mb-4">Children&apos;s Privacy</h2>
              <p>
                Our website is not directed at children under 13. We do not knowingly collect
                personal information from children.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-bold text-slate-950 mt-8 mb-4">Changes to This Policy</h2>
              <p>
                We may update this privacy policy from time to time. Changes will be posted on
                this page with an updated revision date.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-bold text-slate-950 mt-8 mb-4">Contact</h2>
              <p>
                Questions about this privacy policy? Contact us at{' '}
                <a
                  href="mailto:info@hvacsolver.com"
                  className="text-[#1e3a5f] underline hover:text-[#c2410c]"
                >
                  info@hvacsolver.com
                </a>.
              </p>
            </section>
          </div>
        </div>
      </div>
    </>
  );
}
