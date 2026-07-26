# WalletIQ Usage Guide

## How to Use WalletIQ

### 1. Home Page (/)
- Select a cryptocurrency from the dropdown (BTC, ETH, USDT, SOL, BNB)
- Enter a wallet address in the search bar
- Click "Check" to view wallet details
- See live Bitcoin price at the bottom

### 2. Wallet Page (/wallet)
After checking a wallet, you'll see:

#### Wallet Header
- Crypto icon and name
- Full wallet address

#### Balance Cards
- **Confirmed Balance**: Confirmed transactions and total amount
- **Unconfirmed Balance**: Pending transactions (shows "no pending transactions" if zero)
- **Total Balance**: Combined confirmed + unconfirmed
- Each balance shows both crypto amount and USD equivalent

#### QR Code Section
- Scannable QR code of the wallet address
- Address displayed below for easy copying

#### Transaction Summary
- Total transaction count
- Most recent transaction date
- "View Crypto Price Chart" button to navigate to charts

#### Wallet Summary
- Detailed paragraph describing the wallet's balance
- Includes pending transaction status

#### Transaction History Table
- Last 10 transactions
- Columns: Date, Amount (in crypto), USD value
- Green for incoming, Red for outgoing
- Shows "No transactions" message if wallet is empty

### 3. Price Chart Page (/price-chart)

#### Price Display
- Current crypto price in large text
- Period change percentage (green for positive, red for negative)

#### Crypto Selection
- Choose from BTC, ETH, SOL, BNB, USDT
- Buttons highlight your selection

#### Time Period Selection
- 1 Day
- 5 Days
- 1 Month
- 1 Year
- 5 Years
- Max

Both crypto and period selection update the chart and percentage change dynamically.

#### Interactive Chart
- Line chart showing price history
- Hover to see specific price points
- Orange line matching the app's theme

#### Crypto Calculator
- Enter an amount in the selected crypto
- Instantly see USD equivalent
- Updates automatically when crypto or price changes

## Example Wallet Addresses to Try

### Bitcoin (BTC)
```
bc1qxy2kgdygjrsqtzq2n0yrf2493p83kkfjhx0wlh
```

### Ethereum (ETH)
```
0x742d35Cc6634C0532925a3b844Bc9e7595f0bEb
```

### Solana (SOL)
```
7xKXtg2CW87d97TXJSDpbD5jBkheTqA83TZRuJosgAsU
```

## Features

✅ **Real-time Data**: All prices and balances fetched live
✅ **No Registration**: Start checking wallets immediately
✅ **Privacy First**: No data stored anywhere
✅ **Multi-Chain**: Support for 5 major cryptocurrencies
✅ **Responsive**: Works on mobile, tablet, and desktop
✅ **Dark Theme**: Easy on the eyes with modern Web3 design

## Privacy Notice

🔒 **Your privacy is protected:**
- We don't store your wallet addresses
- We don't use cookies
- We don't use localStorage
- We don't have a backend database
- All data is fetched directly from public blockchain APIs
- When you refresh or close the page, all data is gone

## Tips

1. **Bookmark Wallet Pages**: You can bookmark the wallet page URL to quickly check a specific wallet later
2. **Check Multiple Wallets**: Use the search bar on any page to check different wallets
3. **Compare Prices**: Use the price chart page to compare different cryptocurrencies
4. **Calculate Values**: Use the crypto calculator to plan trades or conversions

## Supported Blockchains

| Crypto | Chain | API Provider |
|--------|-------|--------------|
| BTC | Bitcoin | Blockstream |
| ETH | Ethereum | Etherscan |
| SOL | Solana | Solana RPC |
| BNB | Binance Smart Chain | BscScan |
| USDT | Tron (TRC20) | TronGrid |

## Troubleshooting

### "Error fetching wallet data"
- Check if the wallet address is valid
- Ensure you selected the correct cryptocurrency
- Try again in a few seconds (API rate limits)

### Missing Transactions
- Some chains (like Solana and USDT TRC20) may have limited transaction history
- Bitcoin and Ethereum show full transaction history

### Price Not Loading
- Check your internet connection
- CoinGecko API may be temporarily unavailable
- Refresh the page

## Need Help?

The app is designed to be intuitive and self-explanatory. If something isn't working:
1. Refresh the page
2. Check your internet connection
3. Verify the wallet address is correct
4. Make sure you selected the right cryptocurrency for your address

---

Enjoy using WalletIQ! 🚀
