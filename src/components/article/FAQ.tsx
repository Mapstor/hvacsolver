'use client';

import { ReactNode } from 'react';

interface FAQItem {
  question: string;
  answer: string | ReactNode;
}

interface FAQProps {
  items: FAQItem[];
  includeSchema?: boolean;
}

export default function FAQ({ items, includeSchema = true }: FAQProps) {
  // Generate JSON-LD schema for FAQPage
  const schemaData = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: items.map((item) => ({
      '@type': 'Question',
      name: item.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: typeof item.answer === 'string' ? item.answer : '',
      },
    })),
  };

  return (
    <section className="my-8">
      {includeSchema && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaData) }}
        />
      )}

      <h2 id="faq" className="text-2xl font-bold text-slate-950 mb-6 pt-6 border-t border-slate-200">
        Frequently Asked Questions
      </h2>

      <div className="space-y-6">
        {items.map((item, idx) => (
          <div key={idx} className="border-b border-slate-100 pb-6 last:border-0">
            <h3 className="text-lg font-semibold text-slate-950 mb-2">
              {item.question}
            </h3>
            <div className="text-slate-700 leading-relaxed">
              {typeof item.answer === 'string' ? (
                <p>{item.answer}</p>
              ) : (
                item.answer
              )}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

// Helper to extract FAQ items from markdown content
export function extractFAQFromMarkdown(content: string): FAQItem[] {
  const faqItems: FAQItem[] = [];

  // Look for FAQ section
  const faqMatch = content.match(/## FAQ\n([\s\S]*?)(?=\n## |$)/i);
  if (!faqMatch) return faqItems;

  const faqContent = faqMatch[1];

  // Extract Q&A pairs (### headers are questions, following paragraphs are answers)
  const qaPattern = /### ([^\n]+)\n\n([\s\S]*?)(?=\n### |\n## |$)/g;
  let match;

  while ((match = qaPattern.exec(faqContent)) !== null) {
    faqItems.push({
      question: match[1].trim(),
      answer: match[2].trim(),
    });
  }

  return faqItems;
}
