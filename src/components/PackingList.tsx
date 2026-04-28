'use client';
import { useState } from 'react';
import { Check, Package } from 'lucide-react';

interface PackingClaimWithUser {
  id: string;
  userId: string;
  user: { name: string };
}

interface PackingItemWithClaims {
  id: string;
  name: string;
  tripId: string;
  claims: PackingClaimWithUser[];
}

interface Props {
  items: PackingItemWithClaims[];
  tripId: string;
  userId: string;
}

export function PackingList({ items, tripId, userId }: Props) {
  const [localItems, setLocalItems] = useState(items);

  const toggleClaim = async (itemId: string, currentlyHasClaim: boolean) => {
    const res = await fetch('/api/packing/claim', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ itemId, tripId, claim: !currentlyHasClaim }),
    });
    if (res.ok) {
      const updated = await res.json();
      setLocalItems((prev) => prev.map((item) => (item.id === itemId ? updated : item)));
    }
  };

  return (
    <ul className="space-y-2">
      {localItems.map((item) => {
        const claim = item.claims[0];
        const claimedByUser = claim?.userId === userId;
        const claimedBySomeone = !!claim;
        return (
          <li key={item.id} className="flex justify-between items-center p-3 border border-gray-100 rounded-xl bg-white shadow-sm">
            <div className="flex items-center gap-3">
              <Package size={16} className="text-gray-300" />
              <span className={`text-sm font-medium ${claimedBySomeone ? 'text-gray-500 line-through' : 'text-gray-800'}`}>
                {item.name}
              </span>
            </div>
            <button
              onClick={() => toggleClaim(item.id, claimedByUser)}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium transition-all ${
                claimedByUser
                  ? 'bg-emerald-100 text-emerald-700 hover:bg-emerald-200'
                  : claimedBySomeone
                  ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                  : 'bg-gray-100 text-gray-600 hover:bg-emerald-50 hover:text-emerald-600'
              }`}
              disabled={claimedBySomeone && !claimedByUser}
            >
              {claimedByUser && <Check size={12} />}
              {claimedByUser
                ? 'You claimed it'
                : claimedBySomeone
                ? `By ${claim!.user.name}`
                : 'Claim'}
            </button>
          </li>
        );
      })}
    </ul>
  );
}