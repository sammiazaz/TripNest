import { prisma } from '@/lib/prisma';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/authOptions';
import { NextResponse } from 'next/server';

// POST /api/invites/validate — join a trip via invite code
export async function POST(req: Request) {
  const session = await getServerSession(authOptions);
  if (!session?.user) return new NextResponse('Unauthorized', { status: 401 });

  const userId = (session.user as any).id;
  const { inviteCode } = await req.json();

  const trip = await prisma.trip.findUnique({ where: { inviteCode } });
  if (!trip) return new NextResponse('Invalid invite code', { status: 404 });

  // Check if already a member
  const existing = await prisma.tripMember.findUnique({
    where: { userId_tripId: { userId, tripId: trip.id } },
  });
  if (existing) return NextResponse.json({ trip, message: 'Already a member' });

  await prisma.tripMember.create({ data: { tripId: trip.id, userId, role: 'MEMBER' } });
  return NextResponse.json({ trip });
}