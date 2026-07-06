"use client";

import { ReactNode } from "react";

export function DataTable({
  title,
  columns,
  rows,
  onRowClick,
}: {
  title: string;
  columns: Array<{ key: string; label: string }>;
  rows: Array<Record<string, ReactNode>>;
  onRowClick?: (row: Record<string, ReactNode>) => void;
}) {
  return (
    <div className="rounded-[1.5rem] border border-stone-200 bg-white p-5 shadow-sm">
      <div className="mb-4 flex items-center justify-between">
        <h3 className="text-lg font-semibold text-stone-900">{title}</h3>
        <button className="rounded-full border border-stone-200 px-3 py-2 text-sm text-stone-600">View all</button>
      </div>

      <div className="overflow-x-auto">
        <table className="min-w-full text-left text-sm">
          <thead>
            <tr className="border-b border-stone-200 text-stone-500">
              {columns.map((column) => (
                <th key={column.key} className="px-3 py-3 font-medium">
                  {column.label}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {rows.map((row, index) => (
              <tr
                key={index}
                className={`border-b border-stone-100 last:border-0 ${onRowClick ? "cursor-pointer hover:bg-stone-50" : ""}`}
                onClick={(event) => {
                  if (!onRowClick) return;
                  const target = event.target as HTMLElement;
                  if (["BUTTON", "INPUT", "A", "SVG", "PATH"].includes(target.tagName)) return;
                  onRowClick(row);
                }}
              >
                {columns.map((column) => (
                  <td key={column.key} className="px-3 py-3 text-stone-700">
                    {row[column.key]}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
