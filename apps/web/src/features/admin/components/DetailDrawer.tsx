"use client";

import { ReactNode, useState } from "react";

export function DetailDrawer({ title, children, open }: { title: string; children: ReactNode; open: boolean }) {
  const [activeTab, setActiveTab] = useState("Summary");

  if (!open) return null;

  const tabs = ["Summary", "Customer", "Items", "Payment", "Manufacturing", "Fulfillment", "Timeline"];

  return (
    <div className="fixed inset-y-0 right-0 z-40 w-full max-w-2xl border-l border-stone-200 bg-white p-6 shadow-2xl">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold text-stone-900">{title}</h3>
        <span className="text-sm text-stone-500">Preview</span>
      </div>

      <div className="mt-6 flex flex-wrap gap-2 border-b border-stone-200 pb-4">
        {tabs.map((tab) => (
          <button key={tab} className={`rounded-full px-3 py-2 text-sm ${activeTab === tab ? "bg-stone-900 text-white" : "bg-stone-100 text-stone-700"}`} onClick={() => setActiveTab(tab)}>
            {tab}
          </button>
        ))}
      </div>

      <div className="mt-6 space-y-4 text-sm text-stone-700">{children}</div>
    </div>
  );
}
