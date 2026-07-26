'use client';

export default function PremiumInfoSection() {
  return (
    <div className="w-full max-w-6xl mx-auto space-y-6 animate-fade-in">
      {/* Main Info Card */}
      <div className="card hover:shadow-2xl transition-all duration-300 hover:scale-[1.01]">
        <div className="space-y-6">
          {/* Hero Title */}
          <div className="border-b border-slate-700/50 pb-6">
            <h2 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-[#f7931a] via-[#ffa500] to-[#f7931a] bg-clip-text text-transparent mb-3">
              WalletIQ: Your Instant Crypto Wallet Balance & Transaction Explorer
            </h2>
            <p className="text-lg text-slate-300 leading-relaxed">
              WalletIQ is your fast, sleek, and privacy-first solution for exploring real-time crypto wallet balances and transactions across multiple blockchain networks. In a beautifully modern design, simply select your crypto, paste a wallet address, and tap Check to instantly view live blockchain data—no login, no personal data stored.
            </p>
          </div>

          {/* Supported Cryptocurrencies */}
          <div className="space-y-4">
            <h3 className="text-2xl font-bold text-[#f7931a] flex items-center gap-2">
              <span className="text-3xl">🪙</span>
              Supported Cryptocurrencies
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-3">
              {[
                { name: 'Bitcoin', symbol: 'BTC', icon: '₿', color: 'from-orange-500 to-yellow-600' },
                { name: 'Ethereum', symbol: 'ETH', icon: 'Ξ', color: 'from-blue-500 to-purple-600' },
                { name: 'BNB Smart Chain', symbol: 'BNB', icon: '🔶', color: 'from-yellow-400 to-orange-500' },
                { name: 'Solana', symbol: 'SOL', icon: '◎', color: 'from-purple-500 to-pink-600' },
                { name: 'USDT', symbol: 'TRC20', icon: '₮', color: 'from-green-500 to-teal-600' },
              ].map((crypto) => (
                <div
                  key={crypto.symbol}
                  className="bg-slate-700/30 hover:bg-slate-700/50 border border-slate-600/50 rounded-xl p-4 text-center transition-all duration-200 hover:scale-105 hover:border-[#f7931a]/50 group"
                >
                  <div className={`text-4xl mb-2 bg-gradient-to-r ${crypto.color} bg-clip-text text-transparent group-hover:scale-110 transition-transform`}>
                    {crypto.icon}
                  </div>
                  <div className="font-bold text-white">{crypto.name}</div>
                  <div className="text-sm text-slate-400">{crypto.symbol}</div>
                </div>
              ))}
            </div>
            <p className="text-slate-300 leading-relaxed mt-4">
              Each check delivers more than just a balance—you'll see confirmed, pending, and total balances, plus a shareable QR code and a complete transaction history with dates, amounts, and USD values—all sourced from the latest on-chain blockchain data.
            </p>
          </div>
        </div>
      </div>

      {/* Feature Cards Grid */}
      <div className="grid md:grid-cols-2 gap-6">
        {/* More Than a Balance Checker */}
        <div className="card hover:shadow-xl transition-all duration-300 hover:scale-[1.02] group">
          <div className="flex items-start gap-4">
            <div className="text-4xl group-hover:scale-110 transition-transform">📊</div>
            <div className="flex-1">
              <h3 className="text-xl font-bold text-[#f7931a] mb-3">More Than a Balance Checker</h3>
              <p className="text-slate-300 leading-relaxed">
                WalletIQ is a powerful multi-chain tracker—helping you monitor wallet activity, explore detailed transactions, and analyze trends—all without ever sharing personal details. Just paste a wallet address, and you'll have up-to-the-minute insights.
              </p>
            </div>
          </div>
        </div>

        {/* Privacy First */}
        <div className="card hover:shadow-xl transition-all duration-300 hover:scale-[1.02] group">
          <div className="flex items-start gap-4">
            <div className="text-4xl group-hover:scale-110 transition-transform">🔒</div>
            <div className="flex-1">
              <h3 className="text-xl font-bold text-[#f7931a] mb-3">Privacy First</h3>
              <p className="text-slate-300 leading-relaxed">
                Your privacy is paramount. WalletIQ never stores addresses, search history, or personal data. Each lookup is on-demand, fully on-chain—so once you leave, your information disappears.
              </p>
            </div>
          </div>
        </div>

        {/* Built for Speed */}
        <div className="card hover:shadow-xl transition-all duration-300 hover:scale-[1.02] group">
          <div className="flex items-start gap-4">
            <div className="text-4xl group-hover:scale-110 transition-transform">⚡</div>
            <div className="flex-1">
              <h3 className="text-xl font-bold text-[#f7931a] mb-3">Built for Speed</h3>
              <p className="text-slate-300 leading-relaxed">
                WalletIQ is engineered for performance—no caching, just live, instant results. Every search is lightning-fast, so you always see the latest confirmed and pending blockchain activity.
              </p>
            </div>
          </div>
        </div>

        {/* Public Blockchain Data Only */}
        <div className="card hover:shadow-xl transition-all duration-300 hover:scale-[1.02] group">
          <div className="flex items-start gap-4">
            <div className="text-4xl group-hover:scale-110 transition-transform">🌐</div>
            <div className="flex-1">
              <h3 className="text-xl font-bold text-[#f7931a] mb-3">Public Blockchain Data Only</h3>
              <p className="text-slate-300 leading-relaxed">
                WalletIQ does not handle, store, or manage cryptocurrency. It only displays public blockchain data from trusted providers. You stay in full control of your assets.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Safety Warning Card */}
      <div className="card border-2 border-yellow-500/30 bg-gradient-to-br from-yellow-900/20 to-red-900/20 hover:shadow-xl hover:shadow-yellow-500/10 transition-all duration-300">
        <div className="flex items-start gap-4">
          <div className="text-5xl">⚠️</div>
          <div className="flex-1 space-y-4">
            <h3 className="text-2xl font-bold text-yellow-400">Stay Safe & Informed</h3>
            <p className="text-slate-300 leading-relaxed">
              Always verify addresses before sending any funds. WalletIQ does not offer investment services, asset recovery, or fund management. If anyone claims to be WalletIQ outside official channels, it's a scam.
            </p>
          </div>
        </div>
      </div>

      {/* Mission Statement */}
      <div className="card bg-gradient-to-br from-[#f7931a]/10 to-orange-900/10 border-2 border-[#f7931a]/30 hover:shadow-xl hover:shadow-[#f7931a]/20 transition-all duration-300">
        <div className="space-y-4">
          <h3 className="text-2xl font-bold text-[#f7931a] flex items-center gap-3">
            <span className="text-3xl">🎯</span>
            Our Mission
          </h3>
          <p className="text-lg text-slate-300 leading-relaxed">
            WalletIQ is built for speed, simplicity, and privacy—empowering everyone to explore blockchain data without sacrificing security or personal information.
          </p>
          <div className="space-y-2 text-slate-300 pl-6">
            <div className="flex items-start gap-3">
              <span className="text-red-400 text-xl">✗</span>
              <p>We do not offer investment schemes.</p>
            </div>
            <div className="flex items-start gap-3">
              <span className="text-red-400 text-xl">✗</span>
              <p>We do not provide asset or fund recovery services.</p>
            </div>
            <div className="flex items-start gap-3">
              <span className="text-red-400 text-xl">✗</span>
              <p>We never operate with or request access to user funds.</p>
            </div>
            <div className="flex items-start gap-3">
              <span className="text-red-400 text-xl">⚠️</span>
              <p className="font-semibold text-yellow-400">
                Do not send money or cryptocurrency to anyone claiming to represent WalletIQ outside of official channels—such claims are fraudulent.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
