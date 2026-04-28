'use client';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Sidebar } from './Sidebar';
import { TopNav } from './TopNav';

export function ConditionalLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const isPublicPage =
    pathname === '/' ||
    pathname === '/login' ||
    pathname === '/signup' ||
    pathname === '/join' ||
    pathname?.startsWith('/join/') ||
    pathname === '/privacy' ||
    pathname === '/terms' ||
    pathname === '/support';

  if (isPublicPage) {
    return <>{children}</>;
  }

  return (
    <div className="font-body-md text-on-surface bg-background min-h-screen">
      <Sidebar />
      <TopNav />
      <main className="pt-24 pb-12 md:pl-72 pr-8 px-4 min-h-screen">
        <div className="max-w-5xl mx-auto space-y-8">
          {children}
        </div>
      </main>
      <footer className="md:pl-72 py-12 px-8">
        <div className="max-w-5xl mx-auto flex flex-col md:flex-row justify-between items-center gap-6 opacity-60">
          <div className="flex items-center gap-2">
            <span className="material-symbols-outlined text-blue-600" data-icon="nest_remote">nest_remote</span>
            <span className="text-sm font-bold tracking-tight">TripNest v2.4.1</span>
          </div>
          <div className="flex gap-8 text-xs font-bold uppercase tracking-widest">
            <Link className="hover:text-primary transition-colors" href="/privacy">Privacy Policy</Link>
            <Link className="hover:text-primary transition-colors" href="/terms">Terms of Service</Link>
            <Link className="hover:text-primary transition-colors" href="/support">Support Center</Link>
          </div>
          <p className="text-xs">© 2026 TripNest Inc.</p>
        </div>
      </footer>
    </div>
  );
}
