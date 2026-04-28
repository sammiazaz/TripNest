import { prisma } from '@/lib/prisma';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/authOptions';
import { NextResponse } from 'next/server';

// POST /api/polls/[id]/vote — cast or update a vote on a poll
export async function POST(req: Request, { params }: { params: { id: string } }) {
  const session = await getServerSession(authOptions);
  if (!session?.user) return new NextResponse('Unauthorized', { status: 401 });

  const userId = (session.user as any).id;
  const { optionIndex, tripId } = await req.json();
  const pollId = params.id;

  // Check poll exists and is still open
  const poll = await prisma.poll.findUnique({ where: { id: pollId } });
  if (!poll) return new NextResponse('Poll not found', { status: 404 });
  if (poll.expiresAt && new Date(poll.expiresAt) < new Date()) {
    return new NextResponse('Poll has expired', { status: 410 });
  }

  // Upsert the vote (one vote per user per poll)
  const vote = await prisma.pollVote.upsert({
    where: { pollId_userId: { pollId, userId } },
    create: { pollId, userId, optionIndex },
    update: { optionIndex },
  });

  await prisma.activity.create({
    data: {
      type: 'VOTE_CAST',
      payload: { pollQuestion: poll.question, optionIndex, tripId },
      tripId: poll.tripId,
      actorId: userId,
    },
  });

  return NextResponse.json(vote);
}
