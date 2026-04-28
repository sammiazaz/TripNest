import { prisma } from '@/lib/prisma';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/authOptions';
import { NextResponse } from 'next/server';

export const dynamic = 'force-dynamic';

export async function GET(req: Request) {
  const session = await getServerSession(authOptions);
  if (!session?.user) return new NextResponse('Unauthorized', { status: 401 });

  const { searchParams } = new URL(req.url);
  const tripId = searchParams.get('tripId');
  if (!tripId) return new NextResponse('tripId is required', { status: 400 });

  const membership = await prisma.tripMember.findFirst({
    where: { tripId, userId: (session.user as any).id },
    select: { id: true },
  });
  if (!membership) return new NextResponse('Forbidden', { status: 403 });

  const activities = await prisma.activity.findMany({
    where: { tripId },
    orderBy: { createdAt: 'desc' },
    take: 30,
    include: { actor: true },
  });
  return NextResponse.json(activities);
}


