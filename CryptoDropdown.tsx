'use client';

interface CryptoDropdownProps {
  value: string;
  onChange: (value: string) => void;
}

const CRYPTOS = [
  { value: 'BTC', label: 'Bitcoin (BTC)' },
  { value: 'ETH', label: 'Ethereum (ETH)' },
  { value: 'USDT', label: 'USDT TRC20' },
  { value: 'SOL', label: 'Solana (SOL)' },
  { value: 'BNB', label: 'Binance Coin (BNB)' },
];

export default function CryptoDropdown({ value, onChange }: CryptoDropdownProps) {
  return (
    <select
      value={value}
      onChange={(e) => onChange(e.target.value)}
      className="input-field w-full md:w-auto text-lg cursor-pointer"
    >
      {CRYPTOS.map((crypto) => (
        <option key={crypto.value} value={crypto.value} className="bg-slate-800">
          {crypto.label}
        </option>
      ))}
    </select>
  );
}
