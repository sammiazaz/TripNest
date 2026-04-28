'use client';
import { useEffect, useState } from 'react';
import { Transaction } from '@/lib/debtSimplification';
import { Wallet, Send } from 'lucide-react';
import Image from 'next/image';

interface Balance {
  userId: string;
  name: string;
  netBalance: number;
}

interface TransactionWithNames extends Transaction {
  fromName?: string;
  toName?: string;
}

export function BalanceSummary({ tripId, currentUserId }: { tripId: string, currentUserId: string }) {
  const [transactions, setTransactions] = useState<TransactionWithNames[]>([]);
  const [balances, setBalances] = useState<Balance[]>([]);
  const [loading, setLoading] = useState(true);

  const refetch = () => {
    fetch(`/api/expenses/${tripId}/balance`)
      .then((res) => res.json())
      .then((data) => {
        setBalances(data.balances ?? []);
        const nameMap = new Map<string, string>(
          (data.balances ?? []).map((b: Balance) => [b.userId, b.name])
        );
        setTransactions(
          (data.transactions ?? []).map((t: Transaction) => ({
            ...t,
            fromName: nameMap.get(t.from) ?? t.from.slice(0, 6),
            toName: nameMap.get(t.to) ?? t.to.slice(0, 6),
          }))
        );
        setLoading(false);
      })
      .catch(() => setLoading(false));
  };

  useEffect(() => {
    refetch();
  }, [tripId]);

  if (loading) {
    return (
      <div className="bg-white rounded-3xl p-6 shadow-sm border border-gray-50 h-full flex items-center justify-center">
        <p className="text-sm text-gray-400">Loading finances...</p>
      </div>
    );
  }

  // Derive display list from transactions and balances
  // In a real app we would compute the specific relation of the current user to others.
  // For this design mock, we'll try to show all users' balances or relevant transactions.
  const displayItems = balances.filter(b => b.userId !== currentUserId).map(b => {
    // Check if they owe the current user or vice versa
    const oweMe = transactions.find(t => t.from === b.userId && t.to === currentUserId);
    const iOweThem = transactions.find(t => t.from === currentUserId && t.to === b.userId);
    
    let status = 'SETTLED';
    let statusColor = 'text-gray-400';
    let amount = 0;
    let amountColor = 'text-gray-400';

    if (oweMe) {
      status = 'OWES YOU';
      statusColor = 'text-red-500';
      amount = oweMe.amount;
      amountColor = 'text-red-500';
    } else if (iOweThem) {
      status = 'YOU OWE THEM';
      statusColor = 'text-[#3b82f6]';
      amount = iOweThem.amount;
      amountColor = 'text-[#3b82f6]';
    } else {
      // Show their general net balance if no direct transaction
      if (b.netBalance > 0) {
        status = 'IS OWED';
        amount = b.netBalance;
      } else if (b.netBalance < 0) {
        status = 'OWES';
        amount = Math.abs(b.netBalance);
      }
    }

    return {
      userId: b.userId,
      name: b.name,
      status,
      statusColor,
      amount,
      amountColor
    };
  });

  return (
    <div className="bg-white/80 backdrop-blur rounded-3xl p-6 shadow-[0_8px_32px_rgba(25,118,210,0.08)] border border-white/70 h-full flex flex-col">
      <div className="flex justify-between items-start mb-6">
        <div>
          <h2 className="text-xl font-bold text-gray-900">Finances</h2>
          <p className="text-sm text-gray-500">Who&apos;s Owed What</p>
        </div>
        <div className="w-10 h-10 bg-blue-50 rounded-xl flex items-center justify-center text-[#1976d2]">
          <Wallet size={20} />
        </div>
      </div>

      <div className="space-y-4 flex-1">
        {displayItems.length === 0 && <p className="text-sm text-gray-400">No debts to show.</p>}
        {displayItems.map((item) => (
          <div key={item.userId} className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-gray-200 overflow-hidden flex items-center justify-center text-white font-bold text-sm bg-gradient-to-br from-gray-400 to-gray-600">
                {item.name.charAt(0)}
              </div>
              <div>
                <p className="font-semibold text-gray-900 text-sm">{item.name}</p>
                <p className={`text-[10px] font-bold tracking-wider ${item.statusColor}`}>
                  {item.status}
                </p>
              </div>
            </div>
            <span className={`font-medium ${item.amountColor}`}>
              €{item.amount.toFixed(2)}
            </span>
          </div>
        ))}
      </div>

      <button className="mt-6 w-full bg-[#1976d2] text-white py-3.5 rounded-2xl font-semibold flex items-center justify-center gap-2 hover:brightness-110 transition shadow-[0_8px_20px_rgba(25,118,210,0.25)]">
        <Send size={18} />
        Settle Up
      </button>
    </div>
  );
}