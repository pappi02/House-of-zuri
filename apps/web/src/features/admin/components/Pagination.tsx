"use client";

export function Pagination({
  page,
  pageSize,
  totalItems,
  onPageChange,
}: {
  page: number;
  pageSize: number;
  totalItems: number;
  onPageChange: (page: number) => void;
}) {
  const totalPages = Math.max(1, Math.ceil(totalItems / pageSize));

  return (
    <div className="mt-4 flex flex-wrap items-center justify-between gap-3 rounded-[1.25rem] border border-stone-200 bg-white p-4 shadow-sm">
      <div className="text-sm text-stone-600">Showing {Math.min((page - 1) * pageSize + 1, totalItems)}-{Math.min(page * pageSize, totalItems)} of {totalItems}</div>
      <div className="flex items-center gap-2">
        <button className="rounded-full border border-stone-200 px-3 py-2 text-sm text-stone-600" onClick={() => onPageChange(Math.max(1, page - 1))}>
          Previous
        </button>
        {Array.from({ length: totalPages }, (_, index) => index + 1).map((value) => (
          <button
            key={value}
            className={`rounded-full px-3 py-2 text-sm ${value === page ? "bg-stone-900 text-white" : "border border-stone-200 text-stone-600"}`}
            onClick={() => onPageChange(value)}
          >
            {value}
          </button>
        ))}
        <button className="rounded-full border border-stone-200 px-3 py-2 text-sm text-stone-600" onClick={() => onPageChange(Math.min(totalPages, page + 1))}>
          Next
        </button>
      </div>
    </div>
  );
}
