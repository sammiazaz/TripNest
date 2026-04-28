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
    <aside className="hidden md:flex h-screen w-64 border-r fixed left-0 top-0 bg-slate-50/80 backdrop-blur-2xl border-white/40 shadow-xl shadow-blue-900/5 flex-col gap-2 py-6 px-4 z-50">
      <Link href="/dashboard" className="flex items-center gap-3 px-2 mb-8 hover:opacity-80 transition-opacity">
        <div className="w-10 h-10 rounded-xl bg-primary flex items-center justify-center text-on-primary">
          <span className="material-symbols-outlined" data-icon="travel_explore">travel_explore</span>
        </div>
        <div>
          <h1 className="text-lg font-black text-blue-700 font-headline-md tracking-tight">TripNest</h1>
          <p className="text-xs text-slate-500 font-label-md">Collaborative Travel</p>
        </div>
      </Link>
      <nav className="flex flex-col gap-1">
        <Link href="/dashboard" className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-300 ease-in-out cursor-pointer ${pathname === '/dashboard' ? 'text-blue-700 font-bold border-r-4 border-blue-600 bg-blue-50/50' : 'text-slate-500 hover:bg-white/50 hover:scale-[1.02]'}`}>
          <span className="material-symbols-outlined" data-icon="dashboard">dashboard</span>
          <span className="font-label-lg">Dashboard</span>
        </Link>
        <Link href="/trips" className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-300 ease-in-out cursor-pointer ${pathname === '/trips' ? 'text-blue-700 font-bold border-r-4 border-blue-600 bg-blue-50/50' : 'text-slate-500 hover:bg-white/50 hover:scale-[1.02]'}`}>
          <span className="material-symbols-outlined" data-icon="explore">explore</span>
          <span className="font-label-lg">My Trips</span>
        </Link>
        <Link href="/memory-vault" className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-300 ease-in-out cursor-pointer ${pathname === '/memory-vault' ? 'text-blue-700 font-bold border-r-4 border-blue-600 bg-blue-50/50' : 'text-slate-500 hover:bg-white/50 hover:scale-[1.02]'}`}>
          <span className="material-symbols-outlined" data-icon="groups">groups</span>
          <span className="font-label-lg">Shared Space</span>
        </Link>
        <Link href="/finances" className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-300 ease-in-out cursor-pointer ${pathname === '/finances' ? 'text-blue-700 font-bold border-r-4 border-blue-600 bg-blue-50/50' : 'text-slate-500 hover:bg-white/50 hover:scale-[1.02]'}`}>
          <span className="material-symbols-outlined" data-icon="payments">payments</span>
          <span className="font-label-lg">Finances</span>
        </Link>
        <Link href="/settings" className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-300 ease-in-out cursor-pointer ${pathname === '/settings' ? 'text-blue-700 font-bold border-r-4 border-blue-600 bg-blue-50/50' : 'text-slate-500 hover:bg-white/50 hover:scale-[1.02]'}`}>
          <span className="material-symbols-outlined" data-icon="settings" style={pathname === '/settings' ? { fontVariationSettings: "'FILL' 1" } : {}}>settings</span>
          <span className="font-label-lg">Settings</span>
        </Link>
      </nav>
      <div className="mt-auto p-4 glass-card rounded-2xl">
        <div className="flex items-center gap-3 mb-4">
          {userAvatar ? (
            <img className="w-10 h-10 rounded-full object-cover border-2 border-white" alt={userName} src={userAvatar}/>
          ) : (
            <div className="w-10 h-10 rounded-full bg-primary flex items-center justify-center text-on-primary border-2 border-white font-bold text-sm">
              {userInitial}
            </div>
          )}
          <div className="overflow-hidden">
            <p className="text-sm font-bold truncate">{userName}</p>
            <p className="text-[10px] text-slate-500 uppercase tracking-wider">Member</p>
          </div>
        </div>
        <button onClick={() => signOut({ callbackUrl: '/' })} className="w-full py-2 bg-primary-container text-on-primary-container rounded-lg text-xs font-bold hover:opacity-90 transition-opacity">
          Log Out
        </button>
      </div>
    </aside>
  );
}