'use client';

import { useEffect, useState } from 'react';
import { getCryptoPrices } from '@/lib/api';

export default function BitcoinPriceBar() {
  const [price, setPrice] = useState<number | null>(null);

  useEffect(() => {
    const fetchPrice = async () => {
      try {
        const prices = await getCryptoPrices(['bitcoin']);
        setPrice(prices.bitcoin.usd);
      } catch (error) {
        console.error('Error fetching Bitcoin price:', error);
      }
    };

    fetchPrice();
    const interval = setInterval(fetchPrice, 30000); // Update every 30 seconds

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="card text-center">
      <h3 className="text-xl font-semibold mb-2">Bitcoin Price</h3>
      <p className="text-3xl font-bold text-[#f7931a]">
        {price !== null ? `$${price.toLocaleString()}` : 'Loading...'}
      </p>
    </div>
  );
}
