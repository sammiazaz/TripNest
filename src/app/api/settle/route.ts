import { prisma } from '@/lib/prisma';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/authOptions';
import { NextResponse } from 'next/server';

// POST /api/settle — mark an ExpenseSplit as settled
export async function POST(req: Request) {
  const session = await getServerSession(authOptions);
  if (!session?.user) return new NextResponse('Unauthorized', { status: 401 });

  const userId = (session.user as any).id;
  const { splitId } = await req.json();

  const split = await prisma.expenseSplit.update({
    where: { id: splitId },
    data: { settled: true },
  });
  return NextResponse.json(split);
}
