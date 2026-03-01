'use client';

import { useRef, useEffect, ReactNode } from 'react';

interface ResultsContainerProps {
  children: ReactNode;
  show: boolean;
  variant?: 'border' | 'margin';
}

export default function ResultsContainer({ children, show, variant = 'border' }: ResultsContainerProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const hasScrolledRef = useRef(false);

  useEffect(() => {
    // Scroll to results when they first appear
    if (show && containerRef.current && !hasScrolledRef.current) {
      hasScrolledRef.current = true;
      // Small delay to ensure DOM is updated
      setTimeout(() => {
        containerRef.current?.scrollIntoView({
          behavior: 'smooth',
          block: 'start'
        });
      }, 100);
    }

    // Reset scroll flag when results are hidden
    if (!show) {
      hasScrolledRef.current = false;
    }
  }, [show]);

  if (!show) return null;

  const className = variant === 'border'
    ? 'border-t border-slate-200 pt-6 space-y-6 scroll-mt-4'
    : 'mt-8 space-y-6 scroll-mt-4';

  return (
    <div ref={containerRef} className={className}>
      {children}
    </div>
  );
}
