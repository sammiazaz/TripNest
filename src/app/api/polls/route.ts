import { prisma } from '@/lib/prisma';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/authOptions';
import { NextResponse } from 'next/server';

// GET /api/polls?tripId=xxx — list polls for a trip
export async function GET(req: Request) {
  const session = await getServerSession(authOptions);
  if (!session?.user) return new NextResponse('Unauthorized', { status: 401 });

  const { searchParams } = new URL(req.url);
  const tripId = searchParams.get('tripId');
  if (!tripId) return new NextResponse('tripId is required', { status: 400 });

  const polls = await prisma.poll.findMany({
    where: { tripId },
    include: { votes: true, creator: true },
    orderBy: { createdAt: 'desc' },
  });
  return NextResponse.json(polls);
}

// POST /api/polls — create a new poll
export async function POST(req: Request) {
  const session = await getServerSession(authOptions);
  if (!session?.user) return new NextResponse('Unauthorized', { status: 401 });

  const creatorId = (session.user as any).id;
  const { tripId, question, options, expiresAt } = await req.json();

  const poll = await prisma.poll.create({
    data: {
      tripId,
      question,
      options,
      creatorId,
      expiresAt: expiresAt ? new Date(expiresAt) : null,
    },
    include: { votes: true, creator: true },
  });

  await prisma.activity.create({
    data: {
      type: 'POLL_CREATED',
      payload: { question, tripId },
      tripId,
      actorId: creatorId,
    },
  });

  return NextResponse.json(poll);
}
