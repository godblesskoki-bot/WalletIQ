'use client';

interface Transaction {
  date: string;
  amount: number;
  hash: string;
}

interface TransactionTableProps {
  transactions: Transaction[];
  crypto: string;
  usdPrice: number;
}

export default function TransactionTable({ transactions, crypto, usdPrice }: TransactionTableProps) {
  if (transactions.length === 0) {
    return (
      <div className="card text-center">
        <p className="text-slate-400">There are no transactions associated with this crypto address yet.</p>
      </div>
    );
  }

  return (
    <div className="card overflow-x-auto">
      <h2 className="text-2xl font-bold mb-6 text-[#f7931a]">Transaction History</h2>
      <table className="w-full">
        <thead>
          <tr className="border-b border-slate-700">
            <th className="text-left py-3 px-4 text-slate-300">Date</th>
            <th className="text-right py-3 px-4 text-slate-300">Amount</th>
            <th className="text-right py-3 px-4 text-slate-300">USD</th>
          </tr>
        </thead>
        <tbody>
          {transactions.map((tx, index) => (
            <tr key={index} className="border-b border-slate-800 hover:bg-slate-800/30 transition-colors">
              <td className="py-3 px-4 text-sm">{tx.date}</td>
              <td className={`py-3 px-4 text-right font-semibold ${tx.amount < 0 ? 'text-red-400' : 'text-green-400'}`}>
                {tx.amount >= 0 ? '+' : ''}{tx.amount.toFixed(8)} {crypto}
              </td>
              <td className={`py-3 px-4 text-right ${tx.amount < 0 ? 'text-red-400' : 'text-green-400'}`}>
                {tx.amount >= 0 ? '+' : ''}${(tx.amount * usdPrice).toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
