import { prisma } from '@/lib/prisma';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/authOptions';
import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  const session = await getServerSession(authOptions);
  if (!session?.user) return new NextResponse('Unauthorized', { status: 401 });

  const userId = (session.user as any).id;
  const { tripId, imageUrl, title } = await req.json();

  const memory = await prisma.memory.create({
    data: {
      tripId,
      userId,
      imageUrl,
      title,
    },
    include: { user: true },
  });

  await prisma.activity.create({
    data: {
      type: 'PHOTO_UPLOADED',
      payload: { title, tripId },
      tripId,
      actorId: userId,
    },
  });

  return NextResponse.json(memory);
}
