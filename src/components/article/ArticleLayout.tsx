'use client';

import { ReactNode } from 'react';
import Breadcrumbs from '@/components/layout/Breadcrumbs';
import TableOfContents from '@/components/layout/TableOfContents';

interface ArticleLayoutProps {
  pillar: string;
  articleTitle: string;
  content: string;
  pillarInfo?: {
    name: string;
    hub: string;
  } | null;
  children: ReactNode;
}

export default function ArticleLayout({
  pillar,
  articleTitle,
  content,
  pillarInfo,
  children,
}: ArticleLayoutProps) {
  return (
    <div className="bg-white">
      <div className="mx-auto max-w-6xl px-4 py-8 sm:px-6 lg:px-8">
        {/* Breadcrumbs */}
        <Breadcrumbs
          pillar={pillar}
          articleTitle={articleTitle}
        />

        {/* Mobile TOC */}
        <div className="lg:hidden">
          <TableOfContents content={content} />
        </div>

        {/* Main content with sidebar */}
        <div className="lg:flex lg:gap-8">
          {/* Article content */}
          <div className="lg:flex-1 lg:min-w-0" style={{ maxWidth: '780px' }}>
            {children}

            {/* Related Pillar Link */}
            {pillarInfo && pillar !== 'standalone' && (
              <div className="mt-12 pt-8 border-t border-slate-200">
                <p className="text-slate-600">
                  This article is part of our{' '}
                  <a
                    href={pillarInfo.hub}
                    className="text-[#1e3a5f] underline hover:text-[#c2410c]"
                  >
                    {pillarInfo.name}
                  </a>{' '}
                  section.
                </p>
              </div>
            )}

            {/* Contact CTA */}
            <div className={`${pillarInfo && pillar !== 'standalone' ? 'mt-6' : 'mt-12 pt-8 border-t border-slate-200'}`}>
              <p className="text-slate-600">
                Got a question about this topic? We&apos;re happy to help — just email{' '}
                <a
                  href="mailto:info@hvacsolver.com"
                  className="text-[#1e3a5f] underline hover:text-[#c2410c]"
                >
                  info@hvacsolver.com
                </a>
                .
              </p>
            </div>
          </div>

          {/* Desktop TOC Sidebar */}
          <div className="hidden lg:block lg:w-[250px] lg:flex-shrink-0">
            <TableOfContents content={content} />
          </div>
        </div>
      </div>
    </div>
  );
}
