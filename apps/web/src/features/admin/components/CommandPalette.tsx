"use client";

import { useEffect, useState } from "react";

const commands = [
  { label: "Go to Orders", href: "/admin/orders" },
  { label: "Go to Products", href: "/admin/products" },
  { label: "Open Inventory", href: "/admin/inventory" },
  { label: "View Manufacturing Queue", href: "/admin/manufacturing" },
  { label: "Create Product", href: "/admin/products/new" },
];

export function CommandPalette({ open, onClose }: { open: boolean; onClose: () => void }) {
  const [query, setQuery] = useState("");

  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      if ((event.ctrlKey || event.metaKey) && event.key.toLowerCase() === "k") {
        event.preventDefault();
        onClose();
      }
    };

    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [onClose]);

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center bg-stone-950/60 px-4 py-20">
      <div className="w-full max-w-2xl rounded-[1.5rem] border border-stone-200 bg-white p-4 shadow-2xl">
        <input value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Type a command" className="w-full rounded-full border border-stone-200 px-4 py-3 text-sm outline-none" autoFocus />
        <div className="mt-4 space-y-2">
          {commands.filter((command) => command.label.toLowerCase().includes(query.toLowerCase())).map((command) => (
            <a key={command.href} href={command.href} className="block rounded-2xl px-4 py-3 text-sm text-stone-700 hover:bg-stone-50" onClick={onClose}>
              {command.label}
            </a>
          ))}
        </div>
      </div>
    </div>
  );
}
