'use client';

interface WalletSummaryProps {
  crypto: string;
  address: string;
  confirmedBalance: number;
  unconfirmedBalance: number;
  totalBalance: number;
  usdPrice: number;
}

export default function WalletSummary({
  crypto,
  address,
  confirmedBalance,
  unconfirmedBalance,
  totalBalance,
  usdPrice,
}: WalletSummaryProps) {
  const formatAmount = (amount: number) => amount.toFixed(8);
  const formatUSD = (amount: number) => `$${(amount * usdPrice).toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;

  const summary = `The crypto address ${address} has a total balance of ${formatAmount(totalBalance)} ${crypto} (${formatUSD(totalBalance)}), consisting of ${formatAmount(confirmedBalance)} ${crypto} (${formatUSD(confirmedBalance)}) confirmed${unconfirmedBalance > 0 ? ` and ${formatAmount(unconfirmedBalance)} ${crypto} pending confirmation` : ''}. ${unconfirmedBalance === 0 ? 'There are no pending transactions.' : ''}`;

  return (
    <div className="card">
      <h2 className="text-2xl font-bold mb-6 text-[#f7931a]">Wallet Summary</h2>
      <p className="text-slate-300 leading-relaxed">{summary}</p>
    </div>
  );
}
