'use client';

import { ReactNode } from 'react';

interface CalculatorResultProps {
  label: string;
  value: string | number;
  unit?: string;
  subtitle?: string;
  primary?: boolean;
  highlight?: 'good' | 'warning' | 'bad';
}

export function CalculatorResult({
  label,
  value,
  unit,
  subtitle,
  primary = false,
  highlight,
}: CalculatorResultProps) {
  const highlightClasses = {
    good: 'text-green-700',
    warning: 'text-amber-600',
    bad: 'text-red-700',
  };

  const valueClass = highlight
    ? highlightClasses[highlight]
    : primary
    ? 'text-[#c2410c]'
    : 'text-slate-950';

  return (
    <div className={`${primary ? 'py-3' : 'py-2'}`}>
      <div className="text-sm text-slate-600">{label}</div>
      <div
        className={`${
          primary ? 'text-3xl sm:text-4xl font-bold' : 'text-xl font-semibold'
        } ${valueClass}`}
      >
        {typeof value === 'number' ? value.toLocaleString() : value}
        {unit && (
          <span
            className={`${
              primary ? 'text-lg sm:text-xl' : 'text-base'
            } font-normal text-slate-500 ml-1`}
          >
            {unit}
          </span>
        )}
      </div>
      {subtitle && (
        <div className="text-xs text-slate-500 mt-1">{subtitle}</div>
      )}
    </div>
  );
}

interface ResultsGridProps {
  children: ReactNode;
  columns?: 2 | 3 | 4;
}

export function ResultsGrid({ children, columns = 2 }: ResultsGridProps) {
  const gridClasses = {
    2: 'grid-cols-1 sm:grid-cols-2',
    3: 'grid-cols-1 sm:grid-cols-3',
    4: 'grid-cols-2 sm:grid-cols-4',
  };

  return (
    <div className={`grid ${gridClasses[columns]} gap-4`}>{children}</div>
  );
}

// ResultsTable with headers and string[][] rows
interface ResultsTableWithHeadersProps {
  headers: string[];
  rows: string[][];
}

// ResultsTable with object rows (legacy format)
interface ResultsTableLegacyProps {
  rows: { label: string; value: string | number; unit?: string; highlight?: 'good' | 'warning' | 'bad' }[];
  headers?: never;
}

type ResultsTableProps = ResultsTableWithHeadersProps | ResultsTableLegacyProps;

export function ResultsTable(props: ResultsTableProps) {
  const highlightClasses = {
    good: 'text-green-700',
    warning: 'text-amber-600',
    bad: 'text-red-700',
  };

  // Check if using new format with headers
  if ('headers' in props && props.headers) {
    const { headers, rows } = props;
    return (
      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="bg-navy-700 text-white">
              {headers.map((header, i) => (
                <th
                  key={i}
                  className={`py-2 px-3 font-semibold ${i === 0 ? 'text-left' : 'text-right'}`}
                >
                  {header}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {rows.map((row, rowIndex) => (
              <tr
                key={rowIndex}
                className={rowIndex % 2 === 0 ? 'bg-slate-50' : 'bg-white'}
              >
                {row.map((cell, cellIndex) => (
                  <td
                    key={cellIndex}
                    className={`py-2 px-3 ${cellIndex === 0 ? 'text-slate-600' : 'text-right font-medium text-slate-950'}`}
                  >
                    {cell}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  }

  // Legacy format with object rows
  const { rows } = props;
  return (
    <table className="w-full text-sm">
      <tbody>
        {rows.map((row, index) => (
          <tr
            key={index}
            className={index % 2 === 0 ? 'bg-slate-50' : 'bg-white'}
          >
            <td className="py-2 px-3 text-slate-600">{row.label}</td>
            <td className={`py-2 px-3 text-right font-medium ${row.highlight ? highlightClasses[row.highlight] : 'text-slate-950'}`}>
              {typeof row.value === 'number'
                ? row.value.toLocaleString(undefined, {
                    maximumFractionDigits: 4,
                  })
                : row.value}
              {row.unit && (
                <span className="text-slate-500 font-normal ml-1">
                  {row.unit}
                </span>
              )}
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
