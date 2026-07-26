'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import CryptoDropdown from './CryptoDropdown';
import InterstitialAd from './InterstitialAd';

interface WalletSearchProps {
  initialCrypto?: string;
  initialAddress?: string;
}

export default function WalletSearch({ initialCrypto = 'BTC', initialAddress = '' }: WalletSearchProps) {
  const [crypto, setCrypto] = useState(initialCrypto);
  const [address, setAddress] = useState(initialAddress);
  const [showAd, setShowAd] = useState(false);
  const router = useRouter();

  const handleCheck = () => {
    if (address.trim()) {
      // Show interstitial ad BEFORE navigation
      setShowAd(true);
    }
  };

  const handleAdClosed = () => {
    // Navigate to wallet page AFTER ad is closed
    setShowAd(false);
    router.push(`/wallet?crypto=${crypto}&address=${encodeURIComponent(address)}`);
  };

  return (
    <>
      <div className="w-full max-w-4xl mx-auto space-y-4">
        <CryptoDropdown value={crypto} onChange={setCrypto} />
        
        <div className="flex flex-col md:flex-row gap-3">
          <input
            type="text"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            placeholder="Enter wallet address"
            className="input-field flex-1 text-lg"
            onKeyDown={(e) => e.key === 'Enter' && handleCheck()}
          />
          <button
            onClick={handleCheck}
            className="btn-primary text-lg whitespace-nowrap"
          >
            Check
          </button>
        </div>
      </div>

      {/* Interstitial Ad - Shows after Check button is clicked */}
      {showAd && (
        <InterstitialAd
          adUnitId="ca-app-pub-8343060968893817/1405657952"
          onAdClosed={handleAdClosed}
        />
      )}
    </>
  );
}
