import Link from "next/link";

export function CustomerShell({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <div className="flex min-h-screen">
        <aside className="hidden lg:flex w-64 border-r border-white/10 p-6">
          <nav className="flex flex-col gap-3">
            <Link href="/customer/dashboard" className="text-sm text-white/70 hover:text-white">
              Dashboard
            </Link>
            <Link href="/customer/orders" className="text-sm text-white/70 hover:text-white">
              Orders
            </Link>
            <Link href="/customer/profile" className="text-sm text-white/70 hover:text-white">
              Profile
            </Link>
            <Link href="/customer/measurements" className="text-sm text-white/70 hover:text-white">
              Measurements
            </Link>
          </nav>
        </aside>

        <div className="flex-1 flex flex-col">
          <header className="border-b border-white/10 p-4">
            <div className="max-w-6xl mx-auto flex items-center justify-between">
              <div className="text-sm text-white/70">Customer</div>
              <div className="text-sm text-white/70">Topbar</div>
            </div>
          </header>

          <main className="flex-1">
            <div className="max-w-6xl mx-auto p-6">{children}</div>
          </main>

          <section className="border-t border-white/10 p-4">
            <div className="max-w-6xl mx-auto text-sm text-white/60">
              Notifications
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}

