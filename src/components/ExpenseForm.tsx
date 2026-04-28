'use client';
import { useState } from 'react';
import { DollarSign } from 'lucide-react';

interface Props {
  tripId: string;
  onExpenseAdded?: (expense: any) => void;
}

const CURRENCIES = ['EUR', 'USD', 'GBP', 'INR', 'JPY', 'CAD', 'AUD'];

export function ExpenseForm({ tripId, onExpenseAdded }: Props) {
  const [description, setDescription] = useState('');
  const [amount, setAmount] = useState('');
  const [currency, setCurrency] = useState('EUR');
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    setError('');

    const res = await fetch('/api/expenses', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        tripId,
        description,
        amount: parseFloat(amount),
        originalAmount: parseFloat(amount),
        originalCurrency: currency,
      }),
    });

    if (res.ok) {
      const expense = await res.json();
      setDescription('');
      setAmount('');
      onExpenseAdded?.(expense);
    } else {
      setError('Failed to add expense');
    }
    setSubmitting(false);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-3">
      <div className="flex gap-2">
        <input
          placeholder="Description (e.g. Dinner at Nobu)"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="flex-1 p-3 border border-gray-200 rounded-lg text-sm focus:ring-2 focus:ring-emerald-300 outline-none"
          required
        />
      </div>
      <div className="flex gap-2">
        <div className="relative flex-1">
          <DollarSign size={14} className="absolute left-3 top-3.5 text-gray-400" />
          <input
            type="number"
            step="0.01"
            min="0.01"
            placeholder="Amount"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            className="w-full pl-8 p-3 border border-gray-200 rounded-lg text-sm focus:ring-2 focus:ring-emerald-300 outline-none"
            required
          />
        </div>
        <select
          value={currency}
          onChange={(e) => setCurrency(e.target.value)}
          className="p-3 border border-gray-200 rounded-lg text-sm focus:ring-2 focus:ring-emerald-300 outline-none"
        >
          {CURRENCIES.map((c) => <option key={c}>{c}</option>)}
        </select>
      </div>
      {error && <p className="text-red-500 text-xs">{error}</p>}
      <button
        type="submit"
        disabled={submitting}
        className="w-full bg-emerald-600 text-white py-2.5 rounded-lg text-sm font-semibold hover:bg-emerald-700 disabled:opacity-50 transition"
      >
        {submitting ? 'Adding…' : 'Add Expense'}
      </button>
    </form>
  );
}
