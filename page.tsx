'use client';

import { useEffect, useState, Suspense } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import Navbar from '@/components/Navbar';
import WalletSearch from '@/components/WalletSearch';
import QRCodeDisplay from '@/components/QRCodeDisplay';
import WalletSummary from '@/components/WalletSummary';
import TransactionTable from '@/components/TransactionTable';
import BitcoinPriceBar from '@/components/BitcoinPriceBar';
import { getWalletInfo, getCryptoPrices, CRYPTO_IDS } from '@/lib/api';

function WalletContent() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const crypto = searchParams.get('crypto') || 'BTC';
  const address = searchParams.get('address') || '';

  const [walletData, setWalletData] = useState<any>(null);
  const [usdPrice, setUsdPrice] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    if (!address) {
      router.push('/');
      return;
    }

    const fetchWalletData = async () => {
      setLoading(true);
      setError('');
      try {
        const [wallet, prices] = await Promise.all([
          getWalletInfo(crypto, address),
          getCryptoPrices([CRYPTO_IDS[crypto]]),
        ]);
        setWalletData(wallet);
        setUsdPrice(prices[CRYPTO_IDS[crypto]].usd);
      } catch (err: any) {
        setError(err.message || 'Error fetching wallet data');
      } finally {
        setLoading(false);
      }
    };

    fetchWalletData();
  }, [crypto, address, router]);

  const getCryptoName = (code: string) => {
    const names: Record<string, string> = {
      BTC: 'Bitcoin',
      ETH: 'Ethereum',
      SOL: 'Solana',
      BNB: 'Binance Coin',
      USDT: 'USDT TRC20',
    };
    return names[code] || code;
  };

  const getCryptoIcon = (code: string) => {
    const icons: Record<string, string> = {
      BTC: '₿',
      ETH: 'Ξ',
      SOL: '◎',
      BNB: '🔶',
      USDT: '₮',
    };
    return icons[code] || '🪙';
  };

  if (loading) {
    return (
      <div className="min-h-screen">
        <Navbar />
        <main className="container mx-auto px-4 py-12">
          <div className="text-center">
            <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-[#f7931a]"></div>
            <p className="mt-4 text-slate-400">Loading wallet data...</p>
          </div>
        </main>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen">
        <Navbar />
        <main className="container mx-auto px-4 py-12">
          <div className="max-w-4xl mx-auto space-y-6">
            <WalletSearch initialCrypto={crypto} initialAddress={address} />
            <div className="card text-center">
              <p className="text-red-400 text-lg">Error: {error}</p>
              <p className="text-slate-400 mt-2">Please check the wallet address and try again.</p>
            </div>
          </div>
        </main>
      </div>
    );
  }

  if (!walletData) return null;

  const mostRecentTx = walletData.transactions.length > 0 
    ? walletData.transactions[0].date 
    : 'No transactions';

  return (
    <div className="min-h-screen">
      <Navbar />
      
      <main className="container mx-auto px-4 py-12">
        <div className="max-w-6xl mx-auto space-y-8">
          <WalletSearch initialCrypto={crypto} initialAddress={address} />

          {/* Wallet Header */}
          <div className="card">
            <div className="flex items-center gap-4">
              <div className="text-6xl">{getCryptoIcon(crypto)}</div>
              <div>
                <h2 className="text-3xl font-bold text-[#f7931a]">{getCryptoName(crypto)}</h2>
                <p className="text-slate-400 break-all">{address}</p>
              </div>
            </div>
          </div>

          {/* Balance Section */}
          <div className="grid md:grid-cols-3 gap-6">
            <div className="card">
              <h3 className="text-sm text-slate-400 mb-2">Confirmed Balance</h3>
              <p className="text-2xl font-bold text-green-400">
                {walletData.confirmedBalance.toFixed(8)} {crypto}
              </p>
              <p className="text-slate-400">
                (${(walletData.confirmedBalance * usdPrice).toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })})
              </p>
            </div>
            <div className="card">
              <h3 className="text-sm text-slate-400 mb-2">Unconfirmed Balance</h3>
              <p className="text-2xl font-bold text-yellow-400">
                {walletData.unconfirmedBalance.toFixed(8)} {crypto}
              </p>
              <p className="text-slate-400">
                (${(walletData.unconfirmedBalance * usdPrice).toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })})
              </p>
              {walletData.unconfirmedBalance === 0 && (
                <p className="text-xs text-slate-500 mt-2">There are no pending transactions.</p>
              )}
            </div>
            <div className="card">
              <h3 className="text-sm text-slate-400 mb-2">Total Balance</h3>
              <p className="text-2xl font-bold text-[#f7931a]">
                {walletData.totalBalance.toFixed(8)} {crypto}
              </p>
              <p className="text-slate-400">
                (${(walletData.totalBalance * usdPrice).toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })})
              </p>
            </div>
          </div>

          {/* QR Code and Transaction Summary */}
          <div className="grid md:grid-cols-2 gap-6">
            <QRCodeDisplay address={address} />
            
            <div className="card">
              <h3 className="text-2xl font-bold mb-4 text-[#f7931a]">Transaction Summary</h3>
              <div className="space-y-3">
                <div>
                  <p className="text-sm text-slate-400">Total Transactions</p>
                  <p className="text-2xl font-bold">{walletData.totalTransactions}</p>
                </div>
                <div>
                  <p className="text-sm text-slate-400">Most Recent</p>
                  <p className="text-lg">{mostRecentTx}</p>
                </div>
              </div>
              <button
                onClick={() => router.push('/price-chart')}
                className="btn-primary w-full mt-6"
              >
                View Crypto Price Chart
              </button>
            </div>
          </div>

          {/* Wallet Summary */}
          <WalletSummary
            crypto={crypto}
            address={address}
            confirmedBalance={walletData.confirmedBalance}
            unconfirmedBalance={walletData.unconfirmedBalance}
            totalBalance={walletData.totalBalance}
            usdPrice={usdPrice}
          />

          {/* Transaction Table */}
          <TransactionTable
            transactions={walletData.transactions}
            crypto={crypto}
            usdPrice={usdPrice}
          />

          {/* Bitcoin Price */}
          <div className="w-full max-w-md mx-auto">
            <BitcoinPriceBar />
          </div>

          <footer className="text-center text-sm text-slate-500 mt-16">
            <p>WalletIQ does not store wallet addresses. All lookups are temporary and private.</p>
          </footer>
        </div>
      </main>
    </div>
  );
}

export default function WalletPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen flex items-center justify-center">
        <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-[#f7931a]"></div>
      </div>
    }>
      <WalletContent />
    </Suspense>
  );
}
