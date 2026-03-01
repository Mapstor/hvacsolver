'use client';

import { useState, useEffect, useRef, useMemo } from 'react';

interface TOCItem {
  id: string;
  text: string;
  level: number;
}

interface TableOfContentsProps {
  content: string;
}

// Extract headings from markdown content
function extractHeadings(content: string): TOCItem[] {
  const headings: TOCItem[] = [];
  const lines = content.split('\n');

  for (const line of lines) {
    // Match ## and ### headings
    const h2Match = line.match(/^##\s+(.+)$/);
    const h3Match = line.match(/^###\s+(.+)$/);

    if (h2Match) {
      const text = h2Match[1].replace(/\*\*/g, '').trim();
      const id = text
        .toLowerCase()
        .replace(/[^\w\s-]/g, '')
        .replace(/\s+/g, '-');
      headings.push({ id, text, level: 2 });
    } else if (h3Match) {
      const text = h3Match[1].replace(/\*\*/g, '').trim();
      const id = text
        .toLowerCase()
        .replace(/[^\w\s-]/g, '')
        .replace(/\s+/g, '-');
      headings.push({ id, text, level: 3 });
    }
  }

  return headings;
}

export default function TableOfContents({ content }: TableOfContentsProps) {
  const headings = useMemo(() => extractHeadings(content), [content]);
  const [activeId, setActiveId] = useState<string>('');
  const [isOpen, setIsOpen] = useState(false);
  const observerRef = useRef<IntersectionObserver | null>(null);

  useEffect(() => {
    if (headings.length === 0) return;

    // Set up IntersectionObserver for active section tracking
    observerRef.current = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveId(entry.target.id);
          }
        });
      },
      {
        rootMargin: '-80px 0px -70% 0px',
        threshold: 0,
      }
    );

    // Observe all heading elements
    headings.forEach(({ id }) => {
      const element = document.getElementById(id);
      if (element) {
        observerRef.current?.observe(element);
      }
    });

    return () => {
      observerRef.current?.disconnect();
    };
  }, [headings]);

  const handleClick = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
      setIsOpen(false);
    }
  };

  if (headings.length === 0) return null;

  return (
    <>
      {/* Mobile: Collapsible TOC */}
      <div className="lg:hidden mb-6">
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="flex items-center justify-between w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-lg text-left"
        >
          <span className="font-semibold text-slate-700">Table of Contents</span>
          <svg
            className={`w-5 h-5 text-slate-500 transition-transform ${isOpen ? 'rotate-180' : ''}`}
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
          </svg>
        </button>
        {isOpen && (
          <nav className="mt-2 px-4 py-3 bg-slate-50 border border-slate-200 rounded-lg">
            <ul className="space-y-2">
              {headings.map(({ id, text, level }, index) => (
                <li key={`${id}-${index}`} className={level === 3 ? 'ml-4' : ''}>
                  <button
                    onClick={() => handleClick(id)}
                    className={`text-left text-sm hover:text-[#1e3a5f] transition-colors ${
                      activeId === id
                        ? 'text-[#1e3a5f] font-medium'
                        : 'text-slate-600'
                    }`}
                  >
                    {text}
                  </button>
                </li>
              ))}
            </ul>
          </nav>
        )}
      </div>

      {/* Desktop: Sticky Sidebar */}
      <aside className="hidden lg:block sticky top-8 max-w-[250px] max-h-[calc(100vh-4rem)] overflow-y-auto">
        <nav className="pr-4">
          <h4 className="font-semibold text-slate-900 mb-3 text-sm uppercase tracking-wide">
            On This Page
          </h4>
          <ul className="space-y-1">
            {headings.map(({ id, text, level }, index) => (
              <li key={`${id}-${index}`}>
                <button
                  onClick={() => handleClick(id)}
                  className={`block text-left text-sm py-1 transition-colors w-full ${
                    level === 3 ? 'pl-4' : 'pl-0'
                  } ${
                    activeId === id
                      ? 'text-[#1e3a5f] font-medium border-l-2 border-[#c2410c] pl-3'
                      : 'text-slate-600 hover:text-[#1e3a5f] border-l-2 border-transparent'
                  } ${level === 3 && activeId === id ? 'pl-7' : ''}`}
                >
                  {text}
                </button>
              </li>
            ))}
          </ul>
        </nav>
      </aside>
    </>
  );
}
