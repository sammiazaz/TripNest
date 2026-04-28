import { prisma } from '@/lib/prisma';
import { ActivityFeed } from '@/components/ActivityFeed';
import { BalanceSummary } from '@/components/BalanceSummary';
import dynamic from 'next/dynamic';

const MapPreview = dynamic(
  () => import('@/components/MapPreview'),
  {
    ssr: false,
    loading: () => (
      <div className="w-full h-[500px] rounded-3xl bg-slate-100 animate-pulse flex items-center justify-center text-slate-400">
        Loading map…
      </div>
    ),
  }
);
import { RecentGallery } from '@/components/RecentGallery';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/authOptions';
import { redirect } from 'next/navigation';
import { Calendar, Bell, UserPlus } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';

export default async function DashboardPage() {
  const session = await getServerSession(authOptions);
  if (!session?.user) redirect('/login');

  const userId = (session.user as any).id;
  const trip = await prisma.trip.findFirst({
    where: { members: { some: { userId } } },
    orderBy: { createdAt: 'desc' },
    include: {
      members: { include: { user: true } },
    },
  });

  if (!trip) {
    return (
      <div className="relative min-h-[80vh] flex items-center justify-center">
        {/* Info Cards */}
        <div className="absolute left-8 top-8 z-10 w-[320px]">
          <div className="rounded-2xl bg-white/90 shadow-md p-5 border border-blue-100">
            <div className="flex items-center gap-2 mb-1 font-semibold text-lg">
              <span role="img" aria-label="globe">🌍</span> Discover Destinations
            </div>
            <div className="text-sm text-gray-700">Explore our curated 'Best of 2026' lists. Tap below to see Top Spots.</div>
            <Link href="#" className="text-blue-700 text-sm font-medium mt-2 inline-block hover:underline">Explore top spots</Link>
          </div>
        </div>
        <div className="absolute right-8 top-8 z-10 w-[320px]">
          <div className="rounded-2xl bg-white/90 shadow-md p-5 border border-blue-100">
            <div className="flex items-center gap-2 mb-1 font-semibold text-lg">
              <span role="img" aria-label="collaboration">🤝</span> Collaboration Tips
            </div>
            <div className="text-sm text-gray-700"><span className="font-semibold">Getting started:</span> Learn how to invite friends effectively and streamline group decisions.</div>
            <Link href="#" className="text-blue-700 text-sm font-medium mt-2 inline-block hover:underline">Read tips</Link>
          </div>
        </div>
        <div className="absolute left-8 bottom-8 z-10 w-[320px]">
          <div className="rounded-2xl bg-white/90 shadow-md p-5 border border-blue-100">
            <div className="flex items-center gap-2 mb-1 font-semibold text-lg">
              <span role="img" aria-label="list">📝</span> Featured Community Triplist
            </div>
            <div className="text-sm text-gray-700">1. Kerala Backwaters Escape - Perfect for...</div>
          </div>
        </div>
        <div className="absolute right-8 bottom-8 z-10 w-[320px]">
          <div className="rounded-2xl bg-white/90 shadow-md p-5 border border-blue-100">
            <div className="flex items-center gap-2 mb-1 font-semibold text-lg">
              <span role="img" aria-label="calculator">🧮</span> Budget Calculator
            </div>
            <div className="text-sm text-gray-700"><span className="font-semibold">Quick estimate:</span> Plan your spending before you book.</div>
            <Link href="#" className="text-blue-700 text-sm font-medium mt-2 inline-block hover:underline">Start estimating</Link>
          </div>
        </div>
        {/* Welcome Card */}
        <div className="mx-auto max-w-2xl rounded-3xl border border-blue-100 bg-white p-10 text-center shadow-sm z-20">
          <h1 className="text-3xl font-bold text-[#1f3b57]">Welcome to your dashboard</h1>
          <p className="mt-3 text-base text-gray-600">
            You do not have an active trip yet. Create your first trip to start planning with your group.
          </p>
          <div className="mt-8 flex items-center justify-center">
            <Link
              href="/trips"
              className="rounded-xl bg-[#1976d2] px-6 py-3 text-sm font-semibold text-white shadow-md transition hover:brightness-110"
            >
              Create New Trip
            </Link>
          </div>
        </div>
      </div>
    );
  }

  const activities = await prisma.activity.findMany({
    where: { tripId: trip.id },
    orderBy: { createdAt: 'desc' },
    take: 3,
    include: { actor: true },
  });

  const memories = await prisma.memory.findMany({
    where: { tripId: trip.id },
    orderBy: { uploadedAt: 'desc' },
    take: 3,
    include: { user: true }
  });

  // For avatar stack
  const displayMembers = trip.members.slice(0, 3);
  const extraMembers = trip.members.length - 3;
  const isLegacyAmalfiPlan = /amalfi/i.test(trip.name);
  const displayTripName = isLegacyAmalfiPlan ? 'Kerala Backwaters Escape' : trip.name;
  const mapLatitude = isLegacyAmalfiPlan ? 9.9312 : trip.latitude;
  const mapLongitude = isLegacyAmalfiPlan ? 76.2673 : trip.longitude;
  const heroImage = isLegacyAmalfiPlan
    ? 'https://images.unsplash.com/photo-1593693397690-362cb9666fc2?auto=format&fit=crop&w=2000&q=80'
    : 'https://lh3.googleusercontent.com/aida-public/AB6AXuAXg0Hmd-zEzMYoUISaV7qgFjljOAto8KOBis4y-F-gPevG0NE7XZZaDcTl-_v935VmJDxQjJ4tdnH9LVijNj7IKIMQ8PHfvcYO7G1wmGC0fDH-JGRAuqF9rjhgllT66XN3SpCb9egxNalHnkiSVcQPvb_rheuYFyhu89U-jaXG7ssUh3T7hlUMmKpZ8bqpjRPWzePpmS3qlbPas7Nc3c9JPeFAqTa4q4W904k1B_KdCp_-FEKiscAmNcc3BgFDe5H3Ho1Zt4lJOMmA';

  return (
    <div className="relative space-y-6 max-w-[1280px] mx-auto pb-10">
      <div className="pointer-events-none fixed inset-0 -z-10 overflow-hidden">
        <Image
          src={heroImage}
          alt={`${displayTripName} background`}
          fill
          className="object-cover opacity-45 blur-[2px] scale-105"
          priority
        />
        <div className="absolute inset-0 bg-[#f5f6f8]/45" />
      </div>

      {/* Header section matching the design */}
      <div className="relative z-10 flex justify-between items-start pt-1">
        <div>
          <h1 className="text-[56px] font-bold text-[#2f6ece] leading-tight tracking-tight">
            {displayTripName}
          </h1>
          <div className="flex items-center gap-2 text-[#5e6673] text-sm mt-1">
            <Calendar size={14} />
            <span>
              {new Date(trip.startDate).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })} —{' '}
              {new Date(trip.endDate).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
            </span>
          </div>
        </div>

        <div className="flex items-center gap-4">
          <div className="flex -space-x-3 mr-2">
            {displayMembers.map((m, i) => (
              <div key={m.userId} className="w-10 h-10 rounded-full border-2 border-white overflow-hidden bg-gray-200 z-10 relative">
                {m.user.avatarUrl ? (
                  <Image src={m.user.avatarUrl} alt={m.user.name} fill className="object-cover" />
                ) : (
                  <div className="w-full h-full bg-emerald-500 flex items-center justify-center text-white text-xs font-bold">
                    {m.user.name.charAt(0)}
                  </div>
                )}
              </div>
            ))}
            {extraMembers > 0 && (
              <div className="w-10 h-10 rounded-full border-2 border-white bg-blue-100 flex items-center justify-center text-blue-600 text-xs font-semibold z-10">
                +{extraMembers}
              </div>
            )}
          </div>
          <button className="w-10 h-10 rounded-full bg-white/90 backdrop-blur flex items-center justify-center text-gray-600 shadow-sm border border-white/70 hover:bg-white transition">
            <UserPlus size={18} />
          </button>
          <button className="w-10 h-10 rounded-full bg-white/90 backdrop-blur flex items-center justify-center text-gray-600 shadow-sm border border-white/70 hover:bg-white transition">
            <Bell size={18} />
          </button>
        </div>
      </div>

      {/* Main Grid: Row 1 (Map 2/3, Finances 1/3) */}
      <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-6">
        <div className="lg:col-span-8">
          <MapPreview
            tripId={trip.id}
            tripName={displayTripName}
            latitude={mapLatitude}
            longitude={mapLongitude}
          />
        </div>
        <div className="lg:col-span-4">
          <BalanceSummary tripId={trip.id} currentUserId={userId} />
        </div>
      </div>

      {/* Main Grid: Row 2 (Activity 1/3, Gallery 2/3) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        <div className="lg:col-span-5 bg-white/75 backdrop-blur rounded-3xl p-6 shadow-[0_8px_32px_rgba(25,118,210,0.08)] border border-white/70">
          <div className="flex items-center justify-between mb-5">
            <h2 className="text-xl font-bold text-gray-900">Activity</h2>
            <button className="text-sm text-[#3b82f6] font-medium hover:underline">View All</button>
          </div>
          <ActivityFeed initialActivities={activities} tripId={trip.id} />
        </div>

        <div className="lg:col-span-7">
          <RecentGallery memories={memories} />
        </div>
      </div>
    </div>
  );
}