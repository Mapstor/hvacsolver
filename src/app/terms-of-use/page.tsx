import { Metadata } from 'next';
import Link from 'next/link';
import { generateWebPageSchema, schemaToJsonLd } from '@/lib/schema';

export const metadata: Metadata = {
  title: 'Terms of Use',
  description: 'Terms of use for HVACSolver.com. Please read these terms before using our calculators and guides.',
  alternates: {
    canonical: '/terms-of-use',
  },
  openGraph: {
    title: 'Terms of Use - HVACSolver',
    description: 'Terms of use for HVACSolver.com. Please read these terms before using our calculators and guides.',
    url: '/terms-of-use',
    siteName: 'HVACSolver',
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Terms of Use - HVACSolver',
    description: 'Terms of use for HVACSolver.com. Please read these terms before using our calculators and guides.',
  },
};

export default function TermsOfUsePage() {
  const pageSchema = generateWebPageSchema(
    'Terms of Use',
    'Terms of use for HVACSolver.com. Please read these terms before using our calculators and guides.',
    'terms-of-use'
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
            Terms of Use
          </h1>
          <p className="text-slate-500 mb-8">Last updated: February 2026</p>

          <div className="prose prose-slate max-w-none space-y-6 text-slate-700">
            <section>
              <h2 className="text-xl font-bold text-slate-950 mt-8 mb-4">Acceptance of Terms</h2>
              <p>
                By accessing and using HVACSolver.com (&quot;the Site&quot;), you accept and agree to be
                bound by these Terms of Use. If you do not agree to these terms, please do not
                use the Site.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-bold text-slate-950 mt-8 mb-4">Educational Purpose</h2>
              <p>
                All content on this Site—including calculators, guides, charts, and articles—is
                provided for <strong>educational and informational purposes only</strong>. The
                information is intended to help you understand HVAC concepts and make informed
                decisions, not to replace professional advice.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-bold text-slate-950 mt-8 mb-4">Calculator Disclaimer</h2>
              <div className="bg-amber-50 border border-amber-200 rounded-lg p-4 my-4">
                <p className="text-amber-800">
                  <strong>Important:</strong> Calculator results are estimates based on
                  industry-standard methodology and the inputs you provide. They are not a
                  substitute for a professional load calculation performed by a licensed HVAC
                  contractor who can inspect your specific property.
                </p>
              </div>
              <p>
                Actual HVAC requirements depend on many factors that cannot be fully captured
                in an online calculator, including:
              </p>
              <ul className="list-disc pl-6 space-y-1">
                <li>Actual insulation levels and condition</li>
                <li>Air leakage and duct losses</li>
                <li>Window types, sizes, and orientations</li>
                <li>Local climate variations</li>
                <li>Building code requirements</li>
                <li>Equipment availability and specifications</li>
              </ul>
              <p>
                Always consult a qualified HVAC professional before purchasing or installing
                heating and cooling equipment.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-bold text-slate-950 mt-8 mb-4">No Professional Advice</h2>
              <p>
                The content on this Site does not constitute professional engineering,
                contracting, or technical advice. We are not licensed HVAC contractors,
                engineers, or building inspectors. Our content is based on publicly available
                standards and references, but should not be relied upon for:
              </p>
              <ul className="list-disc pl-6 space-y-1">
                <li>Final equipment sizing decisions</li>
                <li>Building permit applications</li>
                <li>Safety-critical installations</li>
                <li>Warranty or code compliance determinations</li>
              </ul>
            </section>

            <section>
              <h2 className="text-xl font-bold text-slate-950 mt-8 mb-4">Limitation of Liability</h2>
              <p>
                To the fullest extent permitted by law, HVACSolver.com and its operators shall
                not be liable for any direct, indirect, incidental, consequential, or punitive
                damages arising from:
              </p>
              <ul className="list-disc pl-6 space-y-1">
                <li>Your use of or inability to use the Site</li>
                <li>Any errors or omissions in Site content</li>
                <li>Decisions made based on Site content</li>
                <li>Equipment purchases or installations influenced by Site content</li>
                <li>Any other matter relating to the Site</li>
              </ul>
            </section>

            <section>
              <h2 className="text-xl font-bold text-slate-950 mt-8 mb-4">Accuracy of Information</h2>
              <p>
                We strive to provide accurate, well-sourced information. However, HVAC
                standards, regulations, and best practices evolve over time. We make no
                warranty that Site content is current, complete, or error-free.
              </p>
              <p>
                If you find an error or outdated information, please{' '}
                <Link
                  href="/contact"
                  className="text-[#1e3a5f] underline hover:text-[#c2410c]"
                >
                  contact us
                </Link>{' '}
                so we can correct it.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-bold text-slate-950 mt-8 mb-4">Intellectual Property</h2>
              <p>
                All content on this Site—including text, graphics, calculators, and code—is
                owned by HVACSolver.com or used with permission. You may not reproduce,
                distribute, or create derivative works without our written consent, except
                for personal, non-commercial use.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-bold text-slate-950 mt-8 mb-4">Third-Party Links</h2>
              <p>
                The Site may contain links to third-party websites for reference purposes
                (e.g., ASHRAE, DOE, EPA). We are not responsible for the content, accuracy,
                or privacy practices of these external sites.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-bold text-slate-950 mt-8 mb-4">Changes to Terms</h2>
              <p>
                We reserve the right to modify these Terms of Use at any time. Changes will
                be posted on this page with an updated revision date. Continued use of the
                Site after changes constitutes acceptance of the modified terms.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-bold text-slate-950 mt-8 mb-4">Governing Law</h2>
              <p>
                These Terms of Use shall be governed by and construed in accordance with
                applicable law, without regard to conflict of law principles.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-bold text-slate-950 mt-8 mb-4">Contact</h2>
              <p>
                Questions about these terms? Contact us at{' '}
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
