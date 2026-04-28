'use client';
import { useEffect, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Plus, Calendar, MapPin, Search, Bell, UserPlus, ChevronRight, Plane, Compass, Users, Heart, Settings, HelpCircle } from 'lucide-react';

interface TripMember {
  user: {
    name: string;
    avatarUrl: string | null;
  };
}

interface Trip {
  id: string;
  name: string;
  description: string | null;
  startDate: string;
  endDate: string;
  coverImage: string | null;
  inviteCode: string;
  members: TripMember[];
  status?: 'planning' | 'upcoming' | 'past';
}

export default function TripsPage() {
  const [trips, setTrips] = useState<Trip[]>([]);
  const [loading, setLoading] = useState(true);
  const [showCreate, setShowCreate] = useState(false);
  const [form, setForm] = useState({ name: '', description: '', startDate: '', endDate: '' });
  const [creating, setCreating] = useState(false);

  useEffect(() => {
    fetch('/api/trips')
      .then((res) => res.json())
      .then((data) => {
        const now = new Date();
        const categorized = data.map((trip: Trip) => {
          const start = new Date(trip.startDate);
          const end = new Date(trip.endDate);
          if (end < now) return { ...trip, status: 'past' as const };
          if (start > now) return { ...trip, status: 'upcoming' as const };
          return { ...trip, status: 'planning' as const };
        });
        setTrips(categorized);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  const handleCreate = async (e: React.FormEvent) => {
    e.preventDefault();
    setCreating(true);
    const res = await fetch('/api/trips', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(form),
    });
    if (res.ok) {
      const { trip } = await res.json();
      setTrips((prev) => [{ ...trip, status: 'planning' as const }, ...prev]);
      setShowCreate(false);
      setForm({ name: '', description: '', startDate: '', endDate: '' });
    }
    setCreating(false);
  };

  const currentTrips = trips.filter(t => t.status === 'planning');
  const upcomingTrips = trips.filter(t => t.status === 'upcoming');
  const pastTrips = trips.filter(t => t.status === 'past');

  const getDaysLeft = (startDate: string) => {
    const now = new Date();
    const start = new Date(startDate);
    const diff = Math.ceil((start.getTime() - now.getTime()) / (1000 * 60 * 60 * 24));
    return diff > 0 ? diff : 0;
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <div className="animate-pulse text-gray-400">Loading trips…</div>
      </div>
    );
  }

  return (
    <>
      {/* Page Header */}
          <header className="mb-12">
            <h2 className="text-5xl font-bold text-[#1a1c1c] mb-2" style={{ fontFamily: 'Inter, sans-serif', lineHeight: '1.2', letterSpacing: '-0.02em' }}>
              My Trips
            </h2>
            <p className="text-lg text-[#526069]" style={{ fontFamily: 'Inter, sans-serif', lineHeight: '1.6' }}>
              Manage and explore your collaborative travel plans
            </p>
          </header>

          {/* Create Trip Form */}
          {showCreate && (
            <form onSubmit={handleCreate} className="mb-12 bg-white/60 backdrop-blur-xl rounded-2xl p-6 shadow-[0_8px_32px_rgba(25,118,210,0.08)] border border-white/70">
              <h3 className="text-xl font-semibold text-[#1a1c1c] mb-4">Create a New Trip</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                <input
                  placeholder="Trip name"
                  value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                  className="w-full p-3 border border-[#c1c6d4] rounded-xl text-sm bg-white/50"
                  required
                />
                <input
                  placeholder="Description (optional)"
                  value={form.description}
                  onChange={(e) => setForm({ ...form, description: e.target.value })}
                  className="w-full p-3 border border-[#c1c6d4] rounded-xl text-sm bg-white/50"
                />
              </div>
              <div className="grid grid-cols-2 gap-4 mb-4">
                <div>
                  <label className="text-xs text-[#526069] mb-1 block">Start Date</label>
                  <input
                    type="date"
                    value={form.startDate}
                    onChange={(e) => setForm({ ...form, startDate: e.target.value })}
                    className="w-full p-3 border border-[#c1c6d4] rounded-xl text-sm bg-white/50"
                    required
                  />
                </div>
                <div>
                  <label className="text-xs text-[#526069] mb-1 block">End Date</label>
                  <input
                    type="date"
                    value={form.endDate}
                    onChange={(e) => setForm({ ...form, endDate: e.target.value })}
                    className="w-full p-3 border border-[#c1c6d4] rounded-xl text-sm bg-white/50"
                    required
                  />
                </div>
              </div>
              <div className="flex gap-3">
                <button
                  type="submit"
                  disabled={creating}
                  className="bg-[#005dac] text-white px-6 py-3 rounded-xl text-sm font-semibold hover:bg-[#004786] transition disabled:opacity-50"
                >
                  {creating ? 'Creating…' : 'Create Trip'}
                </button>
                <button
                  type="button"
                  onClick={() => setShowCreate(false)}
                  className="px-6 py-3 rounded-xl text-sm font-medium text-[#526069] hover:bg-gray-100 transition"
                >
                  Cancel
                </button>
              </div>
            </form>
          )}

          {/* No Trips State */}
          {trips.length === 0 && !showCreate && (
            <div className="text-center py-16">
              <div className="bg-white/60 backdrop-blur-xl rounded-2xl p-10 shadow-[0_8px_32px_rgba(25,118,210,0.08)] border border-white/70 inline-block">
                <MapPin size={48} className="mx-auto mb-4 text-gray-300" />
                <p className="text-gray-500 mb-4">No trips yet. Create your first one!</p>
                <button
                  onClick={() => setShowCreate(true)}
                  className="bg-[#005dac] text-white px-6 py-3 rounded-xl text-sm font-semibold hover:bg-[#004786] transition"
                >
                  Create New Trip
                </button>
              </div>
            </div>
          )}

          {/* Current Trips Section */}
          {currentTrips.length > 0 && (
            <section className="mb-16">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-2xl font-semibold text-[#1a1c1c] flex items-center gap-2" style={{ fontFamily: 'Inter, sans-serif', lineHeight: '1.4' }}>
                  <span className="w-2 h-2 rounded-full bg-green-500"></span>
                  Current Trips
                </h3>
              </div>
              <div className="bg-white/60 backdrop-blur-xl rounded-2xl overflow-hidden group cursor-pointer border-2 border-blue-500/30 shadow-[0_8px_32px_rgba(25,118,210,0.08)]">
                <div className="flex flex-col md:flex-row h-72">
                  <div className="md:w-1/2 h-full overflow-hidden">
                    <img
                      alt={currentTrips[0].name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                      src={currentTrips[0].coverImage || 'https://lh3.googleusercontent.com/aida-public/AB6AXuA7rscJNIyQr_4mf1LtJZmyw6gjsUt-jo6IPevE2Kd_u-unpJmvBuLWdcFMxZ6ANYwVB7QgYX86J83Atou8CIiZ7OVMEc35nJKvtDpXsSP3o1blqUR1Yb1loaGY2_59cKdtXK8MQGzLxuUnSx7F3OICTJcCIyNm3ERKMDxxhuf8Vqr8WrDkeWHbfnfp-Sb9SVhG_Y716h9-r-_3SVLV1xyrwQJH3nrKK7-FYZG3NrNeZCWJj1LTUqKKCFyHhgF1q88qxPNSwyOoFyok'}
                    />
                  </div>
                  <div className="md:w-1/2 p-8 flex flex-col justify-between">
                    <div>
                      <div className="flex items-center justify-between mb-4">
                        <span className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-xs font-medium">Actively Planning</span>
                        <div className="flex -space-x-2">
                          {currentTrips[0].members.slice(0, 2).map((m, i) => (
                            <div key={i} className="w-8 h-8 rounded-full border-2 border-white overflow-hidden bg-gray-200">
                              {m.user.avatarUrl ? (
                                <Image src={m.user.avatarUrl} alt={m.user.name} width={32} height={32} className="object-cover" />
                              ) : (
                                <div className="w-full h-full bg-emerald-500 flex items-center justify-center text-white text-xs font-bold">
                                  {m.user.name.charAt(0)}
                                </div>
                              )}
                            </div>
                          ))}
                          {currentTrips[0].members.length > 2 && (
                            <div className="w-8 h-8 rounded-full border-2 border-white bg-slate-100 flex items-center justify-center text-[10px] font-bold text-slate-500">
                              +{currentTrips[0].members.length - 2}
                            </div>
                          )}
                        </div>
                      </div>
                      <h4 className="text-2xl font-semibold text-[#1a1c1c] mb-2" style={{ fontFamily: 'Inter, sans-serif', lineHeight: '1.3', letterSpacing: '-0.01em' }}>
                        {currentTrips[0].name}
                      </h4>
                      <div className="flex items-center gap-4 text-[#526069] mb-6">
                        <div className="flex items-center gap-1">
                          <Calendar size={14} />
                          <span className="text-sm">
                            {new Date(currentTrips[0].startDate).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })} — {new Date(currentTrips[0].endDate).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                          </span>
                        </div>
                        <div className="flex items-center gap-1">
                          <MapPin size={14} />
                          <span className="text-sm">{currentTrips[0].description || 'Location TBD'}</span>
                        </div>
                      </div>
                    </div>
                    <div className="flex gap-4">
                      <Link
                        href="/dashboard"
                        className="flex-1 bg-[#005dac] text-white text-sm font-semibold py-3 rounded-xl hover:bg-[#004786] transition text-center"
                      >
                        Continue Planning
                      </Link>
                      <button className="w-12 h-12 flex items-center justify-center rounded-xl bg-white/50 border border-white/60 text-[#005dac] hover:bg-white/80 transition">
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z" />
                        </svg>
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </section>
          )}

          {/* Upcoming Trips Section */}
          {upcomingTrips.length > 0 && (
            <section className="mb-16">
              <div className="flex items-center justify-between mb-8">
                <h3 className="text-2xl font-semibold text-[#1a1c1c]" style={{ fontFamily: 'Inter, sans-serif', lineHeight: '1.4' }}>Upcoming Trips</h3>
                <button className="text-[#005dac] text-sm font-medium hover:underline">View All</button>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {upcomingTrips.map((trip) => (
                  <div key={trip.id} className="bg-white/60 backdrop-blur-xl rounded-2xl overflow-hidden group cursor-pointer flex flex-col h-full shadow-[0_8px_32px_rgba(25,118,210,0.08)] border border-white/70">
                    <div className="h-48 overflow-hidden relative">
                      <img
                        alt={trip.name}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                        src={trip.coverImage || 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800'}
                      />
                      <div className="absolute top-4 right-4 bg-white/90 backdrop-blur px-3 py-1 rounded-full text-xs font-medium text-blue-700">
                        {getDaysLeft(trip.startDate)} days left
                      </div>
                    </div>
                    <div className="p-6 flex flex-col flex-1">
                      <h4 className="text-xl font-semibold text-[#1a1c1c] mb-2" style={{ fontFamily: 'Inter, sans-serif', lineHeight: '1.4' }}>{trip.name}</h4>
                      <div className="flex items-center gap-2 text-[#526069] mb-6">
                        <Calendar size={14} />
                        <span className="text-sm">
                          {new Date(trip.startDate).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })} — {new Date(trip.endDate).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                        </span>
                      </div>
                      <div className="mt-auto flex items-center justify-between">
                        <div className="flex -space-x-2">
                          {trip.members.slice(0, 2).map((m, i) => (
                            <div key={i} className="w-7 h-7 rounded-full border-2 border-white overflow-hidden bg-gray-200">
                              {m.user.avatarUrl ? (
                                <Image src={m.user.avatarUrl} alt={m.user.name} width={28} height={28} className="object-cover" />
                              ) : (
                                <div className="w-full h-full bg-emerald-500 flex items-center justify-center text-white text-xs font-bold">
                                  {m.user.name.charAt(0)}
                                </div>
                              )}
                            </div>
                          ))}
                        </div>
                        <ChevronRight size={20} className="text-gray-300" />
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </section>
          )}

          {/* Past Trips Section */}
          {pastTrips.length > 0 && (
            <section>
              <div className="flex items-center justify-between mb-8">
                <h3 className="text-2xl font-semibold text-[#1a1c1c]" style={{ fontFamily: 'Inter, sans-serif', lineHeight: '1.4' }}>Past Trips</h3>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {pastTrips.map((trip) => (
                  <div key={trip.id} className="bg-white/60 backdrop-blur-xl rounded-2xl overflow-hidden group cursor-pointer hover:shadow-md transition-shadow grayscale hover:grayscale-0 duration-500 shadow-[0_8px_32px_rgba(25,118,210,0.08)] border border-white/70">
                    <div className="h-40 overflow-hidden">
                      <img
                        alt={trip.name}
                        className="w-full h-full object-cover"
                        src={trip.coverImage || 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800'}
                      />
                    </div>
                    <div className="p-5">
                      <h4 className="text-sm font-semibold text-[#1a1c1c] mb-1">{trip.name}</h4>
                      <p className="text-xs text-[#526069]">
                        {new Date(trip.startDate).toLocaleDateString('en-US', { month: 'long', year: 'numeric' })} • {trip.members.length} Members
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </section>
          )}
    </>
  );
}
