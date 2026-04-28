'use client';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { signOut, useSession } from 'next-auth/react';

export function Sidebar() {
  const pathname = usePathname();
  const { data: session } = useSession();

  const userName = session?.user?.name ?? 'User';
  const userAvatar = session?.user?.image;
  const userInitial = userName.charAt(0).toUpperCase();

  return (
    <aside className="hidden md:flex h-screen w-64 border-r fixed left-0 top-0 bg-white/80 backdrop-blur-3xl border-slate-200/60 shadow-[0_0_40px_rgba(0,0,0,0.03)] flex-col gap-2 py-8 px-5 z-50">
      <Link href="/dashboard" className="flex items-center gap-3 px-2 mb-10 hover:opacity-80 transition-all active:scale-95">
        <div className="w-10 h-10 rounded-xl bg-blue-600 flex items-center justify-center text-white shadow-lg shadow-blue-200">
          <span className="material-symbols-outlined text-[20px]" data-icon="travel_explore">travel_explore</span>
        </div>
        <div>
          <h1 className="text-xl font-black text-slate-900 tracking-tighter leading-none">TripNest</h1>
          <p className="text-[10px] text-blue-600 font-bold uppercase tracking-widest mt-1">Collab Space</p>
        </div>
      </Link>
      <nav className="flex flex-col gap-2">
        {[
          { href: '/dashboard', label: 'Dashboard', icon: 'dashboard' },
          { href: '/trips', label: 'My Trips', icon: 'explore' },
          { href: '/memory-vault', label: 'Shared Space', icon: 'groups' },
          { href: '/finances', label: 'Finances', icon: 'payments' },
          { href: '/settings', label: 'Settings', icon: 'settings' },
        ].map((item) => (
          <Link 
            key={item.href}
            href={item.href} 
            className={`flex items-center gap-3 px-4 py-3 rounded-2xl transition-all duration-300 group ${
              pathname === item.href 
                ? 'bg-blue-600 text-white shadow-lg shadow-blue-100 font-bold' 
                : 'text-slate-500 hover:bg-blue-50 hover:text-blue-600'
            }`}
          >
            <span className={`material-symbols-outlined text-[22px] transition-transform group-hover:scale-110 ${pathname === item.href ? 'fill-1' : ''}`} data-icon={item.icon} style={pathname === item.href ? { fontVariationSettings: "'FILL' 1" } : {}}>
              {item.icon}
            </span>
            <span className="text-sm tracking-tight">{item.label}</span>
          </Link>
        ))}
      </nav>
      <div className="mt-auto p-5 bg-slate-50 rounded-3xl border border-slate-100">
        <div className="flex items-center gap-3 mb-5">
          {userAvatar ? (
            <img className="w-10 h-10 rounded-full object-cover border-2 border-white shadow-sm" alt={userName} src={userAvatar}/>
          ) : (
            <div className="w-10 h-10 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center border-2 border-white shadow-sm font-bold text-sm">
              {userInitial}
            </div>
          )}
          <div className="overflow-hidden">
            <p className="text-sm font-bold text-slate-900 truncate">{userName}</p>
            <p className="text-[10px] text-slate-500 font-medium">Free Plan</p>
          </div>
        </div>
        <button 
          onClick={() => signOut({ callbackUrl: '/' })} 
          className="w-full py-2.5 bg-white text-slate-600 border border-slate-200 rounded-xl text-xs font-bold hover:bg-red-50 hover:text-red-600 hover:border-red-100 transition-all active:scale-95"
        >
          Sign Out
        </button>
      </div>
    </aside>
  );
}