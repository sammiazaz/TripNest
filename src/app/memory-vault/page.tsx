import { prisma } from '@/lib/prisma';
import { MemoryGrid } from '@/components/MemoryGrid';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/authOptions';
import { redirect } from 'next/navigation';

export default async function MemoryVaultPage() {
  const session = await getServerSession(authOptions);
  if (!session?.user) redirect('/login');

  const userId = (session.user as any).id;
  const trip = await prisma.trip.findFirst({
    where: { members: { some: { userId } } },
  });
  if (!trip) return <div>No trip</div>;

  const memories = await prisma.memory.findMany({
    where: { tripId: trip.id },
    include: { user: true },
    orderBy: { uploadedAt: 'desc' },
  });

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold">Memory Vault</h1>
      <MemoryGrid memories={memories} />
    </div>
  );
}