'use client';

import Link from 'next/link';
import { ReactNode } from 'react';

interface InternalLinkProps {
  href: string;
  children: ReactNode;
  className?: string;
}

export default function InternalLink({
  href,
  children,
  className = '',
}: InternalLinkProps) {
  // Check if link is internal (starts with / or is relative)
  const isInternal = href.startsWith('/') || !href.includes('://');

  const baseStyles = 'text-[#1e3a5f] underline hover:text-[#c2410c] transition-colors';

  if (isInternal) {
    return (
      <Link href={href} className={`${baseStyles} ${className}`}>
        {children}
      </Link>
    );
  }

  // External link
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className={`${baseStyles} ${className}`}
    >
      {children}
    </a>
  );
}

// Markdown component override for links
export function MarkdownLink({
  href,
  children,
  ...props
}: {
  href?: string;
  children: ReactNode;
  [key: string]: unknown;
}) {
  if (!href) return <span {...props}>{children}</span>;

  const isInternal = href.startsWith('/') || !href.includes('://');
  const baseStyles = 'text-[#1e3a5f] underline hover:text-[#c2410c] transition-colors';

  if (isInternal) {
    return (
      <Link href={href} className={baseStyles} {...props}>
        {children}
      </Link>
    );
  }

  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className={baseStyles}
      {...props}
    >
      {children}
    </a>
  );
}
