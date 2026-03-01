'use client';

import { ReactNode } from 'react';

interface BlockquoteHookProps {
  children: ReactNode;
}

export default function BlockquoteHook({ children }: BlockquoteHookProps) {
  return (
    <blockquote className="my-6 pl-4 border-l-4 border-[#c2410c] bg-slate-50 py-4 pr-4 rounded-r-lg">
      <div className="italic text-slate-700 leading-relaxed">
        {children}
      </div>
    </blockquote>
  );
}

// Markdown component override for blockquotes
export function MarkdownBlockquote({
  children,
  ...props
}: {
  children: ReactNode;
  [key: string]: unknown;
}) {
  return (
    <blockquote
      className="my-6 pl-4 border-l-4 border-[#c2410c] bg-slate-50 py-4 pr-4 rounded-r-lg"
      {...props}
    >
      <div className="italic text-slate-700 leading-relaxed">{children}</div>
    </blockquote>
  );
}
