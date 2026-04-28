import crypto from 'crypto';
import { prisma } from '@/lib/prisma';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/authOptions';
import { NextResponse } from 'next/server';
import { geocode } from '@/lib/geocode';

// GET /api/trips — list all trips for the current user
export async function GET() {
  const session = await getServerSession(authOptions);
  if (!session?.user) return new NextResponse('Unauthorized', { status: 401 });

  const trips = await prisma.trip.findMany({
    where: { members: { some: { userId: (session.user as any).id } } },
    orderBy: { createdAt: 'desc' },
    include: { members: { include: { user: true } } },
  });
  return NextResponse.json(trips);
}

// POST /api/trips — create a new trip
export async function POST(req: Request) {
  const session = await getServerSession(authOptions);
  if (!session?.user) return new NextResponse('Unauthorized', { status: 401 });

  const ownerId = (session.user as any).id;
  const { name, description, startDate, endDate, currency } = await req.json();
  const inviteCode = crypto.randomBytes(16).toString('hex');

  // Geocode the trip name to get map coordinates
  const coords = await geocode(name);

  const trip = await prisma.trip.create({
    data: {
      name,
      description,
      startDate: new Date(startDate),
      endDate: new Date(endDate),
      currency: currency || 'EUR',
      ownerId,
      inviteCode,
      latitude: coords?.lat ?? null,
      longitude: coords?.lng ?? null,
      members: { create: { userId: ownerId, role: 'HOST' } },
    },
  });

  return NextResponse.json({
    trip,
    inviteLink: `${process.env.NEXTAUTH_URL}/join/${inviteCode}`,
  });
}