'use client';

import { useSession } from 'next-auth/react';
import { useEffect, useState } from 'react';

interface UserProfile {
  id: string;
  name: string;
  email: string;
  avatarUrl: string | null;
}

export default function SettingsPage() {
  const { data: session } = useSession();
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('/api/user/profile')
      .then((res) => res.json())
      .then((data) => {
        setProfile(data);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  const userName = profile?.name ?? session?.user?.name ?? 'User';
  const userEmail = profile?.email ?? session?.user?.email ?? '';
  const userAvatar = profile?.avatarUrl ?? session?.user?.image;
  const userInitial = userName.charAt(0).toUpperCase();

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[40vh]">
        <div className="animate-pulse text-slate-400">Loading profile…</div>
      </div>
    );
  }

  return (
    <>
      <section className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        <div className="lg:col-span-12">
          <h2 className="font-headline-lg text-on-surface mb-2">Personal Information</h2>
          <p className="text-on-surface-variant font-body-md">Manage your profile details and public identity.</p>
        </div>
        <div className="lg:col-span-4">
          <div className="glass-card rounded-3xl p-8 flex flex-col items-center text-center h-full">
            <div className="relative group cursor-pointer mb-6">
              {userAvatar ? (
                <img className="w-32 h-32 rounded-3xl object-cover shadow-lg group-hover:opacity-90 transition-all border-4 border-white" alt={userName} src={userAvatar}/>
              ) : (
                <div className="w-32 h-32 rounded-3xl shadow-lg border-4 border-white bg-primary flex items-center justify-center text-on-primary text-4xl font-bold">
                  {userInitial}
                </div>
              )}
              <div className="absolute -bottom-2 -right-2 bg-primary p-2 rounded-xl text-on-primary shadow-md">
                <span className="material-symbols-outlined text-sm" data-icon="photo_camera">photo_camera</span>
              </div>
            </div>
            <h3 className="font-headline-md mb-1">{userName}</h3>
            <p className="text-sm text-on-surface-variant mb-6">{userEmail}</p>
            <div className="flex gap-2 w-full">
              <button className="flex-1 py-2 rounded-xl bg-white border border-slate-200 text-xs font-bold text-slate-700 hover:bg-slate-50">View Public</button>
              <button className="flex-1 py-2 rounded-xl bg-primary text-on-primary text-xs font-bold shadow-sm hover:shadow-md transition-all">Edit Photo</button>
            </div>
          </div>
        </div>
        <div className="lg:col-span-8">
          <div className="glass-card rounded-3xl p-8 space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="text-xs font-bold text-slate-500 uppercase tracking-wider ml-1">Full Name</label>
                <input className="w-full bg-slate-50/50 border-0 border-b border-slate-200 focus:ring-0 focus:border-primary transition-all font-body-md px-1 py-2" type="text" defaultValue={userName}/>
              </div>
              <div className="space-y-2">
                <label className="text-xs font-bold text-slate-500 uppercase tracking-wider ml-1">Display Name</label>
                <input className="w-full bg-slate-50/50 border-0 border-b border-slate-200 focus:ring-0 focus:border-primary transition-all font-body-md px-1 py-2" type="text" defaultValue={`@${userName.toLowerCase().replace(/\s+/g, '_')}`}/>
              </div>
            </div>
            <div className="space-y-2">
              <label className="text-xs font-bold text-slate-500 uppercase tracking-wider ml-1">Bio</label>
              <textarea className="w-full bg-slate-50/50 border-0 border-b border-slate-200 focus:ring-0 focus:border-primary transition-all font-body-md px-1 py-2 resize-none" rows={3} defaultValue="Computer Science student and Backend Developer. Passionate about travel and building collaborative tools."></textarea>
            </div>
            <div className="pt-4 flex justify-end">
              <button className="px-8 py-3 bg-primary text-on-primary rounded-xl font-bold shadow-lg shadow-blue-500/20 hover:scale-[1.02] active:scale-95 transition-all">Save Profile Changes</button>
            </div>
          </div>
        </div>
      </section>

      <section className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="space-y-6">
          <div>
            <h2 className="font-headline-md text-on-surface mb-1">Account Security</h2>
            <p className="text-sm text-on-surface-variant">Protect your account and managed sessions.</p>
          </div>
          <div className="glass-card rounded-3xl p-6 space-y-4">
            <div className="flex items-center justify-between p-3 hover:bg-blue-50/30 rounded-2xl transition-colors cursor-pointer group">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-white rounded-2xl flex items-center justify-center text-primary border border-slate-100 shadow-sm">
                  <span className="material-symbols-outlined" data-icon="key">key</span>
                </div>
                <div>
                  <p className="font-bold text-on-surface">Update Password</p>
                  <p className="text-xs text-on-surface-variant">Last changed 3 months ago</p>
                </div>
              </div>
              <span className="material-symbols-outlined text-slate-400 group-hover:text-primary transition-colors" data-icon="chevron_right">chevron_right</span>
            </div>
            <div className="flex items-center justify-between p-3 hover:bg-blue-50/30 rounded-2xl transition-colors cursor-pointer group">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-white rounded-2xl flex items-center justify-center text-primary border border-slate-100 shadow-sm">
                  <span className="material-symbols-outlined" data-icon="vibration">vibration</span>
                </div>
                <div>
                  <p className="font-bold text-on-surface">Two-Factor Authentication</p>
                  <p className="text-xs text-emerald-600 font-semibold">Enabled (SMS & App)</p>
                </div>
              </div>
              <span className="material-symbols-outlined text-slate-400 group-hover:text-primary transition-colors" data-icon="chevron_right">chevron_right</span>
            </div>
            <div className="pt-4 border-t border-slate-100">
              <p className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-4 px-3">Active Sessions</p>
              <div className="space-y-2">
                <div className="flex items-center justify-between px-3 py-2">
                  <div className="flex items-center gap-3">
                    <span className="material-symbols-outlined text-slate-400 text-lg" data-icon="laptop_mac">laptop_mac</span>
                    <span className="text-sm">Current Browser Session</span>
                  </div>
                  <span className="text-[10px] bg-blue-100 text-blue-700 px-2 py-0.5 rounded-full font-bold">CURRENT</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="space-y-6">
          <div>
            <h2 className="font-headline-md text-on-surface mb-1">Preferences</h2>
            <p className="text-sm text-on-surface-variant">Customize your experience and alerts.</p>
          </div>
          <div className="glass-card rounded-3xl p-6 space-y-2">
            <p className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-2 px-2">Notifications</p>
            <div className="flex items-center justify-between p-3 rounded-2xl bg-white/40">
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 bg-blue-50 rounded-xl flex items-center justify-center text-blue-600">
                  <span className="material-symbols-outlined" data-icon="image">image</span>
                </div>
                <div>
                  <p className="text-sm font-bold">New Photos</p>
                  <p className="text-[11px] text-on-surface-variant">When someone adds photos to a trip</p>
                </div>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input defaultChecked className="sr-only peer" type="checkbox"/>
                <div className="w-11 h-6 bg-slate-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary"></div>
              </label>
            </div>
            <div className="flex items-center justify-between p-3 rounded-2xl bg-white/40">
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 bg-blue-50 rounded-xl flex items-center justify-center text-blue-600">
                  <span className="material-symbols-outlined" data-icon="ballot">ballot</span>
                </div>
                <div>
                  <p className="text-sm font-bold">New Polls</p>
                  <p className="text-[11px] text-on-surface-variant">When friends vote on destinations</p>
                </div>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input defaultChecked className="sr-only peer" type="checkbox"/>
                <div className="w-11 h-6 bg-slate-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary"></div>
              </label>
            </div>
            <div className="flex items-center justify-between p-3 rounded-2xl bg-white/40">
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 bg-blue-50 rounded-xl flex items-center justify-center text-blue-600">
                  <span className="material-symbols-outlined" data-icon="receipt_long">receipt_long</span>
                </div>
                <div>
                  <p className="text-sm font-bold">Expense Updates</p>
                  <p className="text-[11px] text-on-surface-variant">Shared cost alerts and summaries</p>
                </div>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input className="sr-only peer" type="checkbox"/>
                <div className="w-11 h-6 bg-slate-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary"></div>
              </label>
            </div>
          </div>
        </div>
      </section>

      <section className="space-y-6">
        <div>
          <h2 className="font-headline-md text-on-surface mb-1">Privacy Controls</h2>
          <p className="text-sm text-on-surface-variant">Control how you appear to other members of your travel groups.</p>
        </div>
        <div className="glass-card rounded-3xl p-1 overflow-hidden">
          <div className="grid grid-cols-1 md:grid-cols-2">
            <div className="p-8 border-r border-slate-100 flex gap-6">
              <div className="w-14 h-14 bg-primary/10 rounded-2xl flex items-center justify-center text-primary shrink-0">
                <span className="material-symbols-outlined text-3xl" data-icon="visibility">visibility</span>
              </div>
              <div className="space-y-4">
                <div>
                  <h4 className="font-bold text-lg">Shared Space Visibility</h4>
                  <p className="text-sm text-on-surface-variant">Decide who can see your active trips and travel history in the collaborative dashboard.</p>
                </div>
                <select className="w-full bg-slate-100 border-0 rounded-xl px-4 py-3 font-label-lg focus:ring-2 focus:ring-primary/20">
                  <option>Everyone in Groups</option>
                  <option>Trip Admins Only</option>
                  <option>Private</option>
                </select>
              </div>
            </div>
            <div className="p-8 flex gap-6">
              <div className="w-14 h-14 bg-primary/10 rounded-2xl flex items-center justify-center text-primary shrink-0">
                <span className="material-symbols-outlined text-3xl" data-icon="location_on">location_on</span>
              </div>
              <div className="space-y-4">
                <div>
                  <h4 className="font-bold text-lg">Location Sharing</h4>
                  <p className="text-sm text-on-surface-variant">Share your real-time location with fellow travelers during active itineraries.</p>
                </div>
                <div className="flex items-center gap-6 p-4 bg-slate-100 rounded-2xl">
                  <span className="text-sm font-bold">Enable Tracking</span>
                  <label className="relative inline-flex items-center cursor-pointer ml-auto">
                    <input className="sr-only peer" type="checkbox"/>
                    <div className="w-11 h-6 bg-slate-300 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary"></div>
                  </label>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="pt-8 border-t border-slate-200">
        <div className="bg-red-50/50 border border-red-100 rounded-3xl p-8 flex flex-col md:flex-row items-center justify-between gap-6">
          <div>
            <h4 className="font-bold text-error text-lg mb-1">Danger Zone</h4>
            <p className="text-sm text-slate-600">Permanently delete your account and all associated trip data.</p>
          </div>
          <button className="px-6 py-3 border border-red-200 text-error font-bold rounded-xl hover:bg-red-50 transition-colors">Delete My Account</button>
        </div>
      </section>
    </>
  );
}
