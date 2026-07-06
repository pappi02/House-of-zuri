"use client";

import { useState } from "react";

const sampleNotifications = [
  { id: "1", title: "Order packed", body: "HZ-1024 is ready for dispatch", tone: "success" as const },
  { id: "2", title: "Low stock", body: "Buttons are running low", tone: "warning" as const },
];

export function NotificationCenter() {
  const [open, setOpen] = useState(false);

  return (
    <div className="relative">
      <button className="rounded-full border border-stone-700 px-3 py-2 text-sm text-stone-300" onClick={() => setOpen((value) => !value)}>
        Alerts
      </button>
      {open ? (
        <div className="absolute right-0 mt-3 w-80 rounded-[1.25rem] border border-stone-200 bg-white p-4 shadow-xl">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-semibold text-stone-900">Notifications</h3>
            <button className="text-xs text-stone-500" onClick={() => setOpen(false)}>Close</button>
          </div>
          <div className="mt-4 space-y-3">
            {sampleNotifications.map((notification) => (
              <div key={notification.id} className="rounded-2xl border border-stone-200 bg-stone-50 p-3">
                <p className="text-sm font-semibold text-stone-900">{notification.title}</p>
                <p className="mt-1 text-sm text-stone-600">{notification.body}</p>
              </div>
            ))}
          </div>
        </div>
      ) : null}
    </div>
  );
}
