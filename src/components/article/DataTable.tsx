'use client';

import { ReactNode } from 'react';

interface Column {
  header: string;
  accessor: string;
  align?: 'left' | 'right' | 'center';
  isNumeric?: boolean;
}

interface DataTableProps {
  columns: Column[];
  data: Record<string, ReactNode>[];
  caption?: string;
  stickyHeader?: boolean;
}

export default function DataTable({
  columns,
  data,
  caption,
  stickyHeader = true,
}: DataTableProps) {
  return (
    <div className="table-wrapper my-6 overflow-x-auto rounded-lg border border-slate-200">
      <table className="w-full border-collapse text-[15px]">
        {caption && (
          <caption className="px-4 py-2 text-left text-sm text-slate-600 bg-slate-50 border-b border-slate-200">
            {caption}
          </caption>
        )}
        <thead className={stickyHeader ? 'sticky top-0 z-10' : ''}>
          <tr className="bg-[#1e3a5f] text-white">
            {columns.map((col, idx) => (
              <th
                key={idx}
                className={`px-4 py-3 font-semibold border-b border-slate-300 ${
                  col.align === 'right' || col.isNumeric
                    ? 'text-right'
                    : col.align === 'center'
                    ? 'text-center'
                    : 'text-left'
                }`}
              >
                {col.header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {data.map((row, rowIdx) => (
            <tr
              key={rowIdx}
              className={rowIdx % 2 === 0 ? 'bg-white' : 'bg-slate-50'}
            >
              {columns.map((col, colIdx) => (
                <td
                  key={colIdx}
                  className={`px-4 py-3 border-b border-slate-200 ${
                    col.align === 'right' || col.isNumeric
                      ? 'text-right font-mono'
                      : col.align === 'center'
                      ? 'text-center'
                      : 'text-left'
                  }`}
                >
                  {row[col.accessor]}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

// Simple wrapper for markdown tables to add styling
export function MarkdownTableWrapper({ children }: { children: ReactNode }) {
  return (
    <div className="table-wrapper my-6 overflow-x-auto rounded-lg border border-slate-200">
      {children}
    </div>
  );
}
