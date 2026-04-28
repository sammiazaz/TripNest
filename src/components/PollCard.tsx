'use client';
import { useState } from 'react';
import { useSocket } from '@/hooks/useSocket';

interface PollVote {
  id: string;
  optionIndex: number;
  pollId: string;
  userId: string;
}

interface Poll {
  id: string;
  question: string;
  options: string[];
  expiresAt: Date | string | null;
  createdAt: Date | string;
  tripId: string;
  creatorId: string;
  votes: PollVote[];
}

interface Props {
  poll: Poll;
  tripId: string;
  userId: string;
}

export function PollCard({ poll, tripId, userId }: Props) {
  const [votes, setVotes] = useState<PollVote[]>(poll.votes);
  const [selected, setSelected] = useState<number | null>(null);
  const socket = useSocket(tripId);

  const userVote = votes.find((v) => v.userId === userId);
  const hasVoted = !!userVote;

  const handleVote = async (optionIndex: number) => {
    if (hasVoted) return;
    setSelected(optionIndex);
    socket?.emit('vote', { pollId: poll.id, optionIndex, tripId, pollQuestion: poll.question });

    const res = await fetch(`/api/polls/${poll.id}/vote`, {
      method: 'POST',
      body: JSON.stringify({ optionIndex, tripId }),
      headers: { 'Content-Type': 'application/json' },
    });
    if (res.ok) {
      const vote = await res.json();
      setVotes((prev) => [...prev.filter((v) => v.userId !== userId), vote]);
    }
  };

  const totalVotes = votes.length;
  const isExpired = poll.expiresAt && new Date(poll.expiresAt) < new Date();

  return (
    <div className="border border-gray-100 rounded-xl p-4 space-y-3 bg-white shadow-sm">
      <div className="flex items-start justify-between gap-2">
        <h4 className="font-semibold text-gray-800 text-sm">{poll.question}</h4>
        {isExpired && <span className="text-xs bg-gray-100 text-gray-400 px-2 py-0.5 rounded-full shrink-0">Closed</span>}
      </div>
      <div className="space-y-2">
        {poll.options.map((opt: string, idx: number) => {
          const voteCount = votes.filter((v) => v.optionIndex === idx).length;
          const percent = totalVotes ? Math.round((voteCount / totalVotes) * 100) : 0;
          const isSelected = selected === idx || (userVote && userVote.optionIndex === idx);
          return (
            <button
              key={idx}
              onClick={() => handleVote(idx)}
              disabled={hasVoted || !!isExpired}
              className={`w-full text-left rounded-lg p-3 transition-all border ${
                isSelected
                  ? 'bg-emerald-50 border-emerald-200'
                  : 'bg-gray-50 border-gray-100 hover:bg-gray-100 hover:border-gray-200'
              } disabled:cursor-default`}
            >
              <div className="flex justify-between text-sm mb-1.5">
                <span className={isSelected ? 'text-emerald-700 font-medium' : 'text-gray-700'}>{opt}</span>
                {(hasVoted || isExpired) && <span className="text-gray-400">{percent}%</span>}
              </div>
              {(hasVoted || isExpired) && (
                <div className="w-full bg-gray-200 rounded-full h-1.5">
                  <div
                    className={`h-1.5 rounded-full transition-all ${isSelected ? 'bg-emerald-500' : 'bg-gray-300'}`}
                    style={{ width: `${percent}%` }}
                  />
                </div>
              )}
            </button>
          );
        })}
      </div>
      <p className="text-xs text-gray-400">
        {totalVotes} vote{totalVotes !== 1 ? 's' : ''}
        {hasVoted && ' · You voted'}
      </p>
    </div>
  );
}