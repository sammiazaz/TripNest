import { prisma } from '@/lib/prisma';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/authOptions';
import { NextResponse } from 'next/server';

// POST /api/expenses — log a new expense for a trip
export async function POST(req: Request) {
  const session = await getServerSession(authOptions);
  if (!session?.user) return new NextResponse('Unauthorized', { status: 401 });

  const payerId = (session.user as any).id;
  const { tripId, description, amount, originalAmount, originalCurrency } = await req.json();

  // Verify the payer is a member of the trip
  const membership = await prisma.tripMember.findUnique({
    where: { userId_tripId: { userId: payerId, tripId } },
  });
  if (!membership) return new NextResponse('Not a member of this trip', { status: 403 });

  // Get all members to split the expense equally
  const members = await prisma.tripMember.findMany({ where: { tripId } });
  const splitAmount = parseFloat((amount / members.length).toFixed(2));

  const expense = await prisma.expense.create({
    data: {
      description,
      amount,
      originalAmount,
      originalCurrency,
      tripId,
      payerId,
      splits: {
        create: members.map((m: { userId: string }) => ({
          userId: m.userId,
          amount: splitAmount,
        })),
      },
    },
    include: { payer: true, splits: { include: { user: true } } },
  });

  // Log activity
  await prisma.activity.create({
    data: {
      type: 'EXPENSE_ADDED',
      payload: { description, amount, tripId },
      tripId,
      actorId: payerId,
    },
  });

  return NextResponse.json(expense);
}
