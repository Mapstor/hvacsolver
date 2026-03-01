'use client';

import { ReactNode } from 'react';

interface CalculatorWrapperProps {
  title: string;
  description?: string;
  children: ReactNode;
}

export default function CalculatorWrapper({
  title,
  description,
  children,
}: CalculatorWrapperProps) {
  return (
    <div className="bg-white border border-slate-200 rounded-lg shadow-sm overflow-hidden">
      <div className="bg-slate-50 border-b border-slate-200 px-4 py-3 sm:px-6">
        <h3 className="text-lg font-bold text-slate-950">{title}</h3>
        {description && (
          <p className="mt-1 text-sm text-slate-600">{description}</p>
        )}
      </div>
      <div className="p-4 sm:p-6">{children}</div>
    </div>
  );
}
