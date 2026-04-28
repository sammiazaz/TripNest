import { prisma } from '@/lib/prisma';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/authOptions';
import { NextResponse } from 'next/server';

// GET /api/map/pins?tripId=xxx — list map pins for a trip
export async function GET(req: Request) {
  const session = await getServerSession(authOptions);
  if (!session?.user) return new NextResponse('Unauthorized', { status: 401 });

  const { searchParams } = new URL(req.url);
  const tripId = searchParams.get('tripId');
  if (!tripId) return new NextResponse('tripId required', { status: 400 });

  const pins = await prisma.mapPin.findMany({
    where: { tripId },
    include: { user: true },
    orderBy: { pinnedAt: 'desc' },
  });
  return NextResponse.json(pins);
}

// POST /api/map/pins — add a new map pin
export async function POST(req: Request) {
  const session = await getServerSession(authOptions);
  if (!session?.user) return new NextResponse('Unauthorized', { status: 401 });

  const userId = (session.user as any).id;
  const { tripId, latitude, longitude, title, description } = await req.json();

  const pin = await prisma.mapPin.create({
    data: { tripId, userId, latitude, longitude, title, description },
    include: { user: true },
  });

  await prisma.activity.create({
    data: {
      type: 'PIN_ADDED',
      payload: { title, latitude, longitude, tripId },
      tripId,
      actorId: userId,
    },
  });

  return NextResponse.json(pin);
}
