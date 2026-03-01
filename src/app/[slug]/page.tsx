import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import ReactMarkdown, { Components } from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { getAllArticleSlugs, getArticleBySlug, PILLAR_INFO } from '@/lib/articles';
import { generateTechArticleSchema, generateCalculatorSchema, generateBreadcrumbSchema, schemaToJsonLd } from '@/lib/schema';
import Breadcrumbs from '@/components/layout/Breadcrumbs';
import CalculatorRenderer from '@/components/calculators/CalculatorRenderer';
import IllustrationRenderer from '@/components/illustrations/IllustrationRenderer';
import TableOfContents from '@/components/layout/TableOfContents';

// Helper to generate heading ID
function generateId(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^\w\s-]/g, '')
    .replace(/\s+/g, '-');
}

// Check if text is a standalone formula
function isFormula(text: string): boolean {
  // Must contain = sign
  if (!text.includes('=')) return false;
  // Should be relatively short (formulas, not sentences)
  if (text.length > 150) return false;
  // Should contain math-like characters or be a clear equation
  const hasFormulaChars = /[×÷+\-\/\*]/.test(text) || /\d/.test(text);
  // Should not end with common sentence endings (unless it's a formula result)
  const endsLikeSentence = /\.$/.test(text) && !/\d\.$/.test(text);
  return hasFormulaChars && !endsLikeSentence;
}

// Extract sources section from content
function extractSourcesSection(content: string): { mainContent: string; sourcesContent: string | null } {
  // Match various sources heading patterns
  const sourcesPattern = /\n## (?:Sources(?: and| &)? References?|References?)\n/i;
  const match = content.match(sourcesPattern);

  if (match && match.index !== undefined) {
    const mainContent = content.substring(0, match.index);
    const sourcesContent = content.substring(match.index);
    return { mainContent, sourcesContent };
  }

  return { mainContent: content, sourcesContent: null };
}

// Split content at first H2 to insert illustration after intro
function splitAtFirstH2(content: string): { intro: string; rest: string } {
  // Find the first ## heading (but not the title # heading)
  const h2Match = content.match(/\n## /);

  if (h2Match && h2Match.index !== undefined) {
    return {
      intro: content.substring(0, h2Match.index),
      rest: content.substring(h2Match.index),
    };
  }

  return { intro: content, rest: '' };
}

// Convert markdown list to numbered sources
function formatSourcesContent(content: string): string {
  // Replace unordered list markers with ordered list
  const formatted = content.replace(/\n- /g, '\n1. ');
  return formatted;
}

// Custom components for ReactMarkdown
const markdownComponents: Components = {
  // Wrap tables in a scrollable container
  table: ({ children, ...props }) => (
    <div className="table-wrapper">
      <table {...props}>{children}</table>
    </div>
  ),
  // Add IDs to headings for TOC navigation
  h2: ({ children, ...props }) => {
    const text = String(children).replace(/\*\*/g, '');
    const id = generateId(text);
    return <h2 id={id} {...props}>{children}</h2>;
  },
  h3: ({ children, ...props }) => {
    const text = String(children).replace(/\*\*/g, '');
    const id = generateId(text);
    return <h3 id={id} {...props}>{children}</h3>;
  },
  // Detect standalone formulas and apply formula styling
  p: ({ children, ...props }) => {
    const text = String(children);
    // Check if this paragraph is a standalone formula
    if (isFormula(text)) {
      return <p {...props}><span className="formula">{children}</span></p>;
    }
    return <p {...props}>{children}</p>;
  },
};

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  const slugs = getAllArticleSlugs();
  return slugs.map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const article = getArticleBySlug(slug);

  if (!article) {
    return {
      title: 'Article Not Found',
    };
  }

  const { frontmatter } = article;
  const pillarInfo = PILLAR_INFO[frontmatter.pillar];
  const cleanTitle = frontmatter.title.split(' — ')[0].split(' | ')[0].trim();

  return {
    title: frontmatter.seoTitle || frontmatter.title,
    description: frontmatter.description,
    alternates: {
      canonical: `/${slug}`,
    },
    openGraph: {
      title: cleanTitle,
      description: frontmatter.description,
      type: 'article',
      url: `/${slug}`,
      siteName: 'HVACSolver',
      locale: 'en_US',
      section: pillarInfo?.name || 'HVAC',
    },
    twitter: {
      card: 'summary_large_image',
      title: cleanTitle,
      description: frontmatter.description,
    },
    other: {
      'article:section': pillarInfo?.name || 'HVAC',
    },
  };
}

export default async function ArticlePage({ params }: PageProps) {
  const { slug } = await params;
  const article = getArticleBySlug(slug);

  if (!article) {
    notFound();
  }

  const { frontmatter, content } = article;
  const pillarInfo = PILLAR_INFO[frontmatter.pillar];

  // Generate JSON-LD schemas
  const techArticleSchema = generateTechArticleSchema(frontmatter, slug);
  const breadcrumbSchema = generateBreadcrumbSchema(
    frontmatter.pillar,
    frontmatter.title.split(' — ')[0],
    slug
  );
  // Add SoftwareApplication schema for calculator pages
  const calculatorSchema = frontmatter.hasCalculator
    ? generateCalculatorSchema(frontmatter, slug)
    : null;

  // Extract sources section first
  const { mainContent: contentWithoutSources, sourcesContent } = extractSourcesSection(content);

  // Check if content has calculator marker
  const CALC_MARKER = '{/* CALCULATOR */}';
  const hasCalcMarker = contentWithoutSources.includes(CALC_MARKER);
  const showCalculator = frontmatter.hasCalculator && frontmatter.calculatorComponent;

  // Split content at marker if present
  let contentBefore = contentWithoutSources;
  let contentAfter = '';
  if (hasCalcMarker && showCalculator) {
    const parts = contentWithoutSources.split(CALC_MARKER);
    contentBefore = parts[0];
    contentAfter = parts.slice(1).join(CALC_MARKER);
  }

  // For informational articles (no calculator), split content to insert illustration after intro
  const isInformationalArticle = !frontmatter.hasCalculator;
  let introContent = '';
  let restContent = '';
  if (isInformationalArticle) {
    const { intro, rest } = splitAtFirstH2(contentBefore);
    introContent = intro;
    restContent = rest;
  }

  // Format sources for numbered list
  const formattedSources = sourcesContent ? formatSourcesContent(sourcesContent) : null;

  return (
    <div className="bg-white">
      {/* JSON-LD Schema Markup */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: schemaToJsonLd(techArticleSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: schemaToJsonLd(breadcrumbSchema) }}
      />
      {/* SoftwareApplication schema for calculator pages */}
      {calculatorSchema && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: schemaToJsonLd(calculatorSchema) }}
        />
      )}

      <div className="mx-auto max-w-6xl px-4 py-8 sm:px-6 lg:px-8">
        {/* Breadcrumbs */}
        <Breadcrumbs
          pillar={frontmatter.pillar}
          articleTitle={frontmatter.title.split(' — ')[0]}
        />

        {/* Mobile TOC */}
        <div className="lg:hidden">
          <TableOfContents content={content} />
        </div>

        {/* Main content with sidebar */}
        <div className="lg:flex lg:gap-8">
          {/* Article content - min 700px on desktop */}
          <div className="lg:flex-1 lg:min-w-0" style={{ maxWidth: '780px' }}>
            {/* Informational Article Layout (with illustration) */}
            {isInformationalArticle ? (
              <>
                {/* Intro content (before first H2) */}
                <article className="article-content">
                  <ReactMarkdown remarkPlugins={[remarkGfm]} components={markdownComponents}>{introContent}</ReactMarkdown>
                </article>

                {/* Illustration - positioned high after intro */}
                <IllustrationRenderer slug={slug} />

                {/* Rest of content (from first H2 onward) */}
                {restContent && (
                  <article className="article-content">
                    <ReactMarkdown remarkPlugins={[remarkGfm]} components={markdownComponents}>{restContent}</ReactMarkdown>
                  </article>
                )}
              </>
            ) : (
              <>
                {/* Calculator Article Layout */}
                {/* Article Content - Before Calculator */}
                <article className="article-content">
                  <ReactMarkdown remarkPlugins={[remarkGfm]} components={markdownComponents}>{contentBefore}</ReactMarkdown>
                </article>

                {/* Calculator Component - Inline Position */}
                {showCalculator && hasCalcMarker && frontmatter.calculatorComponent && (
                  <div className="my-8" id="calculator">
                    <CalculatorRenderer calculatorComponent={frontmatter.calculatorComponent} />
                  </div>
                )}

                {/* Article Content - After Calculator */}
                {contentAfter && (
                  <article className="article-content">
                    <ReactMarkdown remarkPlugins={[remarkGfm]} components={markdownComponents}>{contentAfter}</ReactMarkdown>
                  </article>
                )}

                {/* Calculator at End (fallback if no marker) */}
                {showCalculator && !hasCalcMarker && frontmatter.calculatorComponent && (
                  <div className="mt-8" id="calculator">
                    <CalculatorRenderer calculatorComponent={frontmatter.calculatorComponent} />
                  </div>
                )}
              </>
            )}

            {/* Sources & References Section */}
            {formattedSources && (
              <div className="sources-section">
                <div className="sources-card">
                  <h2 id="sources-and-references">Sources & References</h2>
                  <div className="article-content">
                    <ReactMarkdown
                      remarkPlugins={[remarkGfm]}
                      components={{
                        ...markdownComponents,
                        // Override h2 to not render (we have our own heading)
                        h2: () => null,
                        // Style links with URL truncation
                        a: ({ href, children, ...props }) => (
                          <a href={href} target="_blank" rel="noopener noreferrer" {...props}>
                            {children}
                          </a>
                        ),
                      }}
                    >
                      {formattedSources}
                    </ReactMarkdown>
                  </div>
                </div>
              </div>
            )}

            {/* Related Pillar Link */}
            {pillarInfo && frontmatter.pillar !== 'standalone' && (
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
