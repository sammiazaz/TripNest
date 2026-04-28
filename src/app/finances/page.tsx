import { prisma } from '@/lib/prisma';
import { BalanceSummary } from '@/components/BalanceSummary';
import { ExpenseForm } from '@/components/ExpenseForm';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/authOptions';
import { redirect } from 'next/navigation';

export default async function FinancesPage() {
  const session = await getServerSession(authOptions);
  if (!session?.user) redirect('/login');

  const trip = await prisma.trip.findFirst({
    where: { members: { some: { userId: (session.user as any).id } } },
    orderBy: { createdAt: 'desc' },
  });
  if (!trip) {
    return (
      <div className="flex items-center justify-center h-64">
        <p className="text-gray-500">No active trip. <a href="/trips" className="text-emerald-600 underline">Create one</a></p>
      </div>
    );
  }

  const expenses = await prisma.expense.findMany({
    where: { tripId: trip.id },
    include: { payer: true, splits: { include: { user: true } } },
    orderBy: { paidAt: 'desc' },
  });

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold text-gray-900">Finances</h1>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Left: expense log + add form */}
        <div className="space-y-4">
          <div className="bg-white rounded-xl p-5 shadow-sm">
            <h2 className="font-semibold text-gray-800 mb-4">Log Expense</h2>
            <ExpenseForm tripId={trip.id} />
          </div>

          <div className="bg-white rounded-xl p-5 shadow-sm">
            <h2 className="font-semibold text-gray-800 mb-4">
              Expense History <span className="text-gray-400 font-normal text-sm">({expenses.length})</span>
            </h2>
            <div className="space-y-3">
              {expenses.length === 0 && <p className="text-gray-400 text-sm">No expenses yet.</p>}
              {expenses.map((exp) => (
                <div key={exp.id} className="border-b border-gray-100 pb-3 last:border-0">
                  <div className="flex justify-between items-start">
                    <span className="font-medium text-sm text-gray-800">{exp.description}</span>
                    <span className="text-sm font-semibold text-gray-900">
                      {exp.originalCurrency ?? trip.currency} {(exp.originalAmount ?? exp.amount).toFixed(2)}
                    </span>
                  </div>
                  <div className="text-xs text-gray-400 mt-1">
                    Paid by <span className="text-gray-600 font-medium">{exp.payer.name}</span>
                    {' · '}{new Date(exp.paidAt).toLocaleDateString()}
                  </div>
                  <div className="flex flex-wrap gap-1 mt-1.5">
                    {exp.splits.map((s) => (
                      <span key={s.id} className={`text-xs px-2 py-0.5 rounded-full ${s.settled ? 'bg-green-100 text-green-700' : 'bg-orange-50 text-orange-600'}`}>
                        {s.user.name}: €{s.amount.toFixed(2)} {s.settled ? '✓' : ''}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right: settlement */}
        <div className="bg-white rounded-xl p-5 shadow-sm">
          <h2 className="font-semibold text-gray-800 mb-4">Settle Up</h2>
          <BalanceSummary tripId={trip.id} currentUserId={(session.user as any).id} />
        </div>
      </div>
    </div>
  );
}