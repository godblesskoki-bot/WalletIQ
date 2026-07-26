'use client';

import { useEffect, useState } from 'react';

interface InterstitialAdProps {
  onAdClosed: () => void;
  adUnitId: string;
}

export default function InterstitialAd({ onAdClosed, adUnitId }: InterstitialAdProps) {
  const [countdown, setCountdown] = useState(5);

  useEffect(() => {
    // Countdown timer for skipping ad
    if (countdown > 0) {
      const timer = setTimeout(() => setCountdown(countdown - 1), 1000);
      return () => clearTimeout(timer);
    }
  }, [countdown]);

  const handleClose = () => {
    if (countdown === 0) {
      onAdClosed();
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/95 backdrop-blur-sm">
      <div className="relative w-full max-w-4xl mx-4">
        {/* Close Button (appears after countdown) */}
        {countdown === 0 && (
          <button
            onClick={handleClose}
            className="absolute -top-12 right-0 bg-white text-black px-6 py-2 rounded-lg font-semibold hover:bg-gray-200 transition-colors flex items-center gap-2"
          >
            <span>Close Ad</span>
            <span className="text-xl">×</span>
          </button>
        )}

        {/* Countdown Display */}
        {countdown > 0 && (
          <div className="absolute -top-12 right-0 bg-slate-800 text-white px-6 py-2 rounded-lg font-semibold">
            Ad closes in {countdown}s
          </div>
        )}

        {/* Ad Container */}
        <div className="bg-white rounded-2xl overflow-hidden shadow-2xl">
          <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white p-4 text-center">
            <p className="text-sm font-semibold">Advertisement</p>
          </div>
          
          {/* Ad Content - Replace with actual AdSense code */}
          <div className="p-8 text-center min-h-[400px] flex flex-col items-center justify-center bg-gradient-to-br from-slate-100 to-slate-200">
            <div className="space-y-4">
              <div className="text-6xl">📱</div>
              <h2 className="text-3xl font-bold text-slate-800">WalletIQ Premium</h2>
              <p className="text-slate-600 max-w-md">
                Unlock advanced features like portfolio tracking, price alerts, and multi-wallet management.
              </p>
              <button className="bg-gradient-to-r from-[#f7931a] to-[#e8870f] text-white px-8 py-3 rounded-xl font-semibold hover:scale-105 transition-transform">
                Learn More
              </button>
              <p className="text-xs text-slate-500 mt-4">Ad Unit ID: {adUnitId}</p>
            </div>
          </div>

          {/* Google AdSense Integration Point */}
          {/* Replace the above div with your AdSense ad code:
          <ins className="adsbygoogle"
               style={{ display: 'block' }}
               data-ad-client="ca-pub-YOUR_ADSENSE_ID"
               data-ad-slot={adUnitId}
               data-ad-format="auto"
               data-full-width-responsive="true"></ins>
          */}
        </div>

        <div className="text-center mt-4 text-sm text-slate-400">
          <p>Ads help keep WalletIQ free and private</p>
        </div>
      </div>
    </div>
  );
}
