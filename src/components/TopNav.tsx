'use client';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useSession } from 'next-auth/react';

const PAGE_CONFIG: Record<string, { title: string; icon: string; subtitle?: string }> = {
  '/dashboard': { title: 'Dashboard', icon: 'dashboard', subtitle: 'Trip Overview' },
  '/trips': { title: 'My Trips', icon: 'explore', subtitle: 'All Adventures' },
  '/memory-vault': { title: 'Shared Space', icon: 'groups', subtitle: 'Memories & Moments' },
  '/finances': { title: 'Finances', icon: 'payments', subtitle: 'Expenses & Splits' },
  '/settings': { title: 'Settings', icon: 'settings', subtitle: 'Account Preferences' },
  '/notifications': { title: 'Notifications', icon: 'notifications', subtitle: 'Activity Feed' },
  '/itinerary': { title: 'Itinerary', icon: 'map', subtitle: 'Trip Plans' },
};

export function TopNav() {
  const pathname = usePathname();
  const { data: session } = useSession();

  const userName = session?.user?.name ?? 'User';
  const userAvatar = session?.user?.image;
  const userInitial = userName.charAt(0).toUpperCase();

  // Match the current path to config, fallback to generic
  const currentPage = PAGE_CONFIG[pathname ?? ''] ?? {
    title: 'TripNest',
    icon: 'travel_explore',
    subtitle: 'Collaborative Travel',
  };

  return (
    <header className="fixed top-0 right-0 left-0 md:left-64 h-16 bg-white/60 backdrop-blur-xl border-b border-white/40 shadow-sm shadow-blue-500/5 z-40 flex justify-between items-center px-8 transition-all duration-300 ease-in-out font-body-md antialiased">
      <div className="flex items-center gap-3">
        <span
          className="material-symbols-outlined text-blue-600 text-2xl"
          data-icon={currentPage.icon}
          style={{ fontVariationSettings: "'FILL' 1" }}
        >
          {currentPage.icon}
        </span>
        <div>
          <h2 className="text-lg font-bold tracking-tight text-blue-700 leading-tight">
            {currentPage.title}
          </h2>
          {currentPage.subtitle && (
            <p className="text-[10px] text-slate-400 font-medium uppercase tracking-wider leading-none">
              {currentPage.subtitle}
            </p>
          )}
        </div>
      </div>
      <div className="flex items-center gap-3">
        {/* Notification bell → links to /notifications */}
        <Link
          href="/notifications"
          className={`p-2 rounded-full transition-colors ${
            pathname === '/notifications'
              ? 'bg-blue-50 text-blue-600'
              : 'hover:bg-blue-50/50 text-slate-500 hover:text-blue-600'
          }`}
        >
          <span className="material-symbols-outlined" data-icon="notifications">
            notifications
          </span>
        </Link>
        <div className="h-8 w-px bg-slate-200"></div>
        {/* Avatar → links to settings */}
        <Link href="/settings" className="block">
          {userAvatar ? (
            <img
              className="w-8 h-8 rounded-full border border-blue-100 object-cover hover:ring-2 hover:ring-blue-200 transition-all"
              alt={userName}
              src={userAvatar}
            />
          ) : (
            <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center text-on-primary border border-blue-100 text-xs font-bold hover:ring-2 hover:ring-blue-200 transition-all">
              {userInitial}
            </div>
          )}
        </Link>
      </div>
    </header>
  );
}
