export type Balance = { userId: string; netBalance: number };
export type Transaction = { from: string; to: string; amount: number };

export function simplifyDebts(balances: Balance[]): Transaction[] {
  const creditors = balances
    .filter(b => b.netBalance > 0)
    .map(b => ({ id: b.userId, amount: b.netBalance }))
    .sort((a, b) => b.amount - a.amount);
  const debtors = balances
    .filter(b => b.netBalance < 0)
    .map(b => ({ id: b.userId, amount: -b.netBalance }))
    .sort((a, b) => b.amount - a.amount);

  const transactions: Transaction[] = [];
  let i = 0, j = 0;
  while (i < debtors.length && j < creditors.length) {
    const amount = Math.min(debtors[i].amount, creditors[j].amount);
    if (amount > 0.01) {
      transactions.push({ from: debtors[i].id, to: creditors[j].id, amount });
    }
    debtors[i].amount -= amount;
    creditors[j].amount -= amount;
    if (debtors[i].amount < 0.01) i++;
    if (creditors[j].amount < 0.01) j++;
  }
  return transactions;
}