import { prisma } from '@/lib/prisma';
import { PackingList } from '@/components/PackingList';
import { PollCard } from '@/components/PollCard';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/authOptions';
import { redirect } from 'next/navigation';

export default async function ItineraryPage() {
  const session = await getServerSession(authOptions);
  if (!session?.user) redirect('/login');

  const userId = (session.user as any).id;
  const trip = await prisma.trip.findFirst({
    where: { members: { some: { userId } } },
    orderBy: { createdAt: 'desc' },
  });

  if (!trip) {
    return (
      <div className="flex items-center justify-center h-64">
        <p className="text-gray-500">No active trip. <a href="/trips" className="text-emerald-600 underline">Create one</a></p>
      </div>
    );
  }

  const [packingItems, polls] = await Promise.all([
    prisma.packingItem.findMany({
      where: { tripId: trip.id },
      include: { claims: { include: { user: true } } },
    }),
    prisma.poll.findMany({
      where: { tripId: trip.id },
      include: { votes: true, creator: true },
      orderBy: { createdAt: 'desc' },
    }),
  ]);

  return (
    <div className="space-y-8">
      <h1 className="text-2xl font-bold text-gray-900">Trip Planning</h1>

      {/* Group Polls */}
      <section>
        <h2 className="text-lg font-semibold text-gray-700 mb-4">Group Polls</h2>
        {polls.length === 0 ? (
          <p className="text-gray-400 text-sm">No polls yet. Create one to make group decisions!</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {polls.map((poll) => (
              <PollCard key={poll.id} poll={poll} tripId={trip.id} userId={userId} />
            ))}
          </div>
        )}
      </section>

      {/* Claimable Packing List */}
      <section>
        <h2 className="text-lg font-semibold text-gray-700 mb-4">Packing List</h2>
        {packingItems.length === 0 ? (
          <p className="text-gray-400 text-sm">No packing items added yet.</p>
        ) : (
          <PackingList items={packingItems} tripId={trip.id} userId={userId} />
        )}
      </section>
    </div>
  );
}
