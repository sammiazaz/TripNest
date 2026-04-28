import { prisma } from '@/lib/prisma';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/authOptions';
import { NextResponse } from 'next/server';
import { simplifyDebts } from '@/lib/debtSimplification';

// GET /api/expenses/[tripId]/balance — calculate net balances and settlement transactions
export async function GET(req: Request, { params }: { params: { tripId: string } }) {
  const session = await getServerSession(authOptions);
  if (!session?.user) return new NextResponse('Unauthorized', { status: 401 });

  const { tripId } = params;

  const members = await prisma.tripMember.findMany({
    where: { tripId },
    include: { user: true },
  });

  const expenses = await prisma.expense.findMany({
    where: { tripId },
    include: { splits: true, payer: true },
  });

  const net = new Map<string, number>();
  members.forEach((m) => net.set(m.userId, 0));

  for (const expense of expenses) {
    for (const split of expense.splits) {
      // Skip settled splits
      if (split.settled) continue;
      // Skip self-paying portion (payer owes themselves nothing)
      if (split.userId === expense.payerId) continue;
      // Payer is owed more
      net.set(expense.payerId, (net.get(expense.payerId) ?? 0) + split.amount);
      // Debtor owes more
      net.set(split.userId, (net.get(split.userId) ?? 0) - split.amount);
    }
  }

  const balances = Array.from(net.entries()).map(([userId, netBalance]) => {
    const member = members.find((m) => m.userId === userId);
    return { userId, name: member?.user.name ?? userId, netBalance };
  });

  const transactions = simplifyDebts(balances);
  return NextResponse.json({ balances, transactions });
}