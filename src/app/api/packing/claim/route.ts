import { prisma } from '@/lib/prisma';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/authOptions';
import { NextResponse } from 'next/server';

// POST /api/packing/claim — claim or unclaim a packing item
export async function POST(req: Request) {
  const session = await getServerSession(authOptions);
  if (!session?.user) return new NextResponse('Unauthorized', { status: 401 });

  const userId = (session.user as any).id;
  const { itemId, tripId, claim } = await req.json();

  if (claim) {
    // Only allow claiming if unclaimed
    const existing = await prisma.packingClaim.findFirst({ where: { itemId } });
    if (existing && existing.userId !== userId) {
      return new NextResponse('Item already claimed', { status: 409 });
    }

    await prisma.packingClaim.upsert({
      where: { id: existing?.id ?? 'new' },
      create: { itemId, userId },
      update: {},
    });

    await prisma.activity.create({
      data: {
        type: 'ITEM_CLAIMED',
        payload: { itemId, tripId },
        tripId,
        actorId: userId,
      },
    });
  } else {
    // Unclaim — only the claimant can unclaim
    await prisma.packingClaim.deleteMany({ where: { itemId, userId } });
  }

  // Return updated item with claims
  const updatedItem = await prisma.packingItem.findUnique({
    where: { id: itemId },
    include: { claims: { include: { user: true } } },
  });
  return NextResponse.json(updatedItem);
}

// GET /api/packing/claim?tripId=xxx — list packing items for a trip
export async function GET(req: Request) {
  const session = await getServerSession(authOptions);
  if (!session?.user) return new NextResponse('Unauthorized', { status: 401 });

  const { searchParams } = new URL(req.url);
  const tripId = searchParams.get('tripId');
  if (!tripId) return new NextResponse('tripId required', { status: 400 });

  const items = await prisma.packingItem.findMany({
    where: { tripId },
    include: { claims: { include: { user: true } } },
  });
  return NextResponse.json(items);
}
