"use client";

import { createContext, useContext, useMemo, useState } from "react";

interface Toast {
  id: number;
  title: string;
  description?: string;
  tone: "success" | "error" | "warning" | "info";
}

const ToastContext = createContext<((toast: Omit<Toast, "id">) => void) | null>(null);

export function ToastProvider({ children }: { children: React.ReactNode }) {
  const [toasts, setToasts] = useState<Toast[]>([]);

  const pushToast = (toast: Omit<Toast, "id">) => {
    const id = Date.now();
    setToasts((current) => [...current, { ...toast, id }]);
    window.setTimeout(() => {
      setToasts((current) => current.filter((item) => item.id !== id));
    }, 2800);
  };

  const value = useMemo(() => pushToast, []);

  return (
    <ToastContext.Provider value={value}>
      {children}
      <div className="fixed right-4 top-4 z-50 flex w-80 flex-col gap-3">
        {toasts.map((toast) => (
          <div key={toast.id} className={`rounded-[1.25rem] border p-4 text-sm shadow-xl ${toast.tone === "success" ? "border-emerald-200 bg-emerald-50 text-emerald-700" : toast.tone === "error" ? "border-rose-200 bg-rose-50 text-rose-700" : toast.tone === "warning" ? "border-amber-200 bg-amber-50 text-amber-700" : "border-sky-200 bg-sky-50 text-sky-700"}`}>
            <p className="font-semibold">{toast.title}</p>
            {toast.description ? <p className="mt-1 text-sm">{toast.description}</p> : null}
          </div>
        ))}
      </div>
    </ToastContext.Provider>
  );
}

export function useToast() {
  const context = useContext(ToastContext);
  if (!context) {
    throw new Error("useToast must be used within ToastProvider");
  }
  return context;
}
