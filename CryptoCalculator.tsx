'use client';

import { useState, useEffect } from 'react';

interface CryptoCalculatorProps {
  crypto: string;
  price: number;
}

export default function CryptoCalculator({ crypto, price }: CryptoCalculatorProps) {
  const [amount, setAmount] = useState('1');
  const [usdValue, setUsdValue] = useState(0);

  useEffect(() => {
    const numAmount = parseFloat(amount) || 0;
    setUsdValue(numAmount * price);
  }, [amount, price]);

  return (
    <div className="card">
      <h2 className="text-2xl font-bold mb-6 text-[#f7931a]">Crypto Calculator</h2>
      <div className="flex flex-col md:flex-row gap-4 items-center">
        <div className="flex-1 w-full">
          <label className="block text-sm text-slate-400 mb-2">Amount in {crypto}</label>
          <input
            type="number"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            className="input-field w-full"
            step="0.00000001"
          />
        </div>
        <div className="text-3xl text-slate-400 hidden md:block">=</div>
        <div className="flex-1 w-full">
          <label className="block text-sm text-slate-400 mb-2">Equivalent USD</label>
          <div className="input-field text-2xl font-bold text-green-400">
            ${usdValue.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
          </div>
        </div>
      </div>
    </div>
  );
}
