# WalletIQ Component Documentation

## 📁 Component Structure

```
src/
├── components/
│   ├── Navbar.tsx
│   ├── CryptoDropdown.tsx
│   ├── WalletSearch.tsx
│   ├── BitcoinPriceBar.tsx
│   ├── QRCodeDisplay.tsx
│   ├── WalletSummary.tsx
│   ├── TransactionTable.tsx
│   ├── PriceChartComponent.tsx
│   └── CryptoCalculator.tsx
├── lib/
│   └── api.ts
└── app/
    ├── page.tsx (Home)
    ├── wallet/page.tsx
    └── price-chart/page.tsx
```

## 🧩 Component Details

### Navbar.tsx
**Purpose**: Main navigation header
**Location**: Used on all pages
**Props**: None
**Features**:
- WalletIQ logo/title
- Links to home page
- Bitcoin orange branding
- Responsive design

**Usage**:
```tsx
<Navbar />
```

---

### CryptoDropdown.tsx
**Purpose**: Cryptocurrency selection dropdown
**Props**:
- `value: string` - Currently selected crypto (BTC, ETH, etc.)
- `onChange: (value: string) => void` - Callback when selection changes

**Features**:
- Pre-populated with 5 cryptos
- Styled select element
- Dark theme integration

**Usage**:
```tsx
<CryptoDropdown 
  value={crypto} 
  onChange={setCrypto} 
/>
```

---

### WalletSearch.tsx
**Purpose**: Combined search interface (crypto selector + address input)
**Props**:
- `initialCrypto?: string` - Default crypto selection (default: 'BTC')
- `initialAddress?: string` - Default address value (default: '')

**Features**:
- Crypto dropdown integration
- Wallet address input
- Check button with navigation
- Enter key support
- Responsive layout

**Usage**:
```tsx
<WalletSearch />
<WalletSearch initialCrypto="ETH" initialAddress="0x..." />
```

---

### BitcoinPriceBar.tsx
**Purpose**: Display current Bitcoin price
**Props**: None
**Features**:
- Live price fetching from CoinGecko
- Auto-refresh every 30 seconds
- Loading state
- Error handling
- Bitcoin orange text color

**Usage**:
```tsx
<BitcoinPriceBar />
```

**API Call**:
- Fetches from CoinGecko Bitcoin price endpoint
- Updates every 30 seconds
- Displays formatted USD price

---

### QRCodeDisplay.tsx
**Purpose**: Generate and display QR code for wallet address
**Props**:
- `address: string` - Wallet address to encode

**Features**:
- SVG QR code generation
- 200x200px size
- White background
- Address display below code
- Scannable with mobile devices

**Usage**:
```tsx
<QRCodeDisplay address="bc1q..." />
```

---

### WalletSummary.tsx
**Purpose**: Generate natural language wallet summary
**Props**:
- `crypto: string` - Cryptocurrency code
- `address: string` - Wallet address
- `confirmedBalance: number` - Confirmed balance
- `unconfirmedBalance: number` - Unconfirmed balance
- `totalBalance: number` - Total balance
- `usdPrice: number` - Current USD price

**Features**:
- Auto-generated paragraph
- Balance breakdown
- USD conversions
- Pending transaction mention
- 8 decimal precision

**Usage**:
```tsx
<WalletSummary
  crypto="BTC"
  address="bc1q..."
  confirmedBalance={0.5}
  unconfirmedBalance={0}
  totalBalance={0.5}
  usdPrice={45000}
/>
```

---

### TransactionTable.tsx
**Purpose**: Display transaction history in table format
**Props**:
- `transactions: Transaction[]` - Array of transactions
- `crypto: string` - Cryptocurrency code
- `usdPrice: number` - Current USD price

**Transaction Type**:
```typescript
interface Transaction {
  date: string;
  amount: number;
  hash: string;
}
```

**Features**:
- Shows last 10 transactions
- Color-coded amounts (green/red)
- USD conversion
- Formatted dates
- Empty state message
- Hover effects

**Usage**:
```tsx
<TransactionTable
  transactions={txs}
  crypto="BTC"
  usdPrice={45000}
/>
```

---

### PriceChartComponent.tsx
**Purpose**: Interactive price chart with Recharts
**Props**:
- `cryptoId: string` - CoinGecko crypto ID (bitcoin, ethereum, etc.)
- `days: string | number` - Time period (1, 7, 30, 365, 'max')

**Features**:
- Line chart visualization
- Responsive container
- Custom tooltip
- Bitcoin orange line
- Loading state
- Price formatting
- Time-based X-axis

**Usage**:
```tsx
<PriceChartComponent
  cryptoId="bitcoin"
  days={30}
/>
```

**Chart Updates**: 
- When `cryptoId` changes
- When `days` changes
- Both props trigger re-fetch

---

### CryptoCalculator.tsx
**Purpose**: Convert crypto amounts to USD
**Props**:
- `crypto: string` - Cryptocurrency code
- `price: number` - Current USD price

**Features**:
- Real-time calculation
- Number input with decimals
- Live USD display
- Auto-updates on price change
- 8 decimal precision
- Responsive layout

**Usage**:
```tsx
<CryptoCalculator
  crypto="BTC"
  price={45000}
/>
```

**State Management**:
- Internal state for amount
- Calculated USD value
- Updates on input change
- Updates on price change

---

## 📚 API Functions (lib/api.ts)

### getCryptoPrices(cryptoIds: string[])
**Purpose**: Fetch current prices for multiple cryptos
**Returns**: Object with prices keyed by crypto ID
**API**: CoinGecko Simple Price endpoint

**Example**:
```typescript
const prices = await getCryptoPrices(['bitcoin', 'ethereum']);
// Returns: { bitcoin: { usd: 45000 }, ethereum: { usd: 3000 } }
```

---

### getMarketChart(cryptoId: string, days: string | number)
**Purpose**: Fetch historical price data for charts
**Returns**: Object with prices array
**API**: CoinGecko Market Chart endpoint

**Example**:
```typescript
const chartData = await getMarketChart('bitcoin', 30);
// Returns: { prices: [[timestamp, price], ...] }
```

---

### getWalletInfo(crypto: string, address: string)
**Purpose**: Fetch wallet balance and transactions
**Returns**: Wallet data object
**API**: Various blockchain APIs based on crypto

**Return Type**:
```typescript
{
  confirmedBalance: number;
  unconfirmedBalance: number;
  totalBalance: number;
  transactions: Transaction[];
  totalTransactions: number;
}
```

**Supported Cryptos**:
- BTC → getBitcoinWallet() → Blockstream API
- ETH → getEthereumWallet() → Etherscan API
- SOL → getSolanaWallet() → Solana RPC
- BNB → getBNBWallet() → BscScan API
- USDT → getUSDTTRC20Wallet() → TronGrid API

---

## 🎨 Styling Classes

### Global Utility Classes (globals.css)

#### .card
```css
@apply bg-slate-800/50 backdrop-blur-lg border border-slate-700 rounded-2xl p-6;
```
**Usage**: All card containers
**Features**: Glass-morphism effect, rounded corners, padding

#### .btn-primary
```css
@apply bg-[#f7931a] hover:bg-[#e8870f] text-white font-semibold py-3 px-6 rounded-xl transition-all duration-200 hover:scale-105;
```
**Usage**: Primary action buttons
**Features**: Bitcoin orange, hover scale, smooth transitions

#### .input-field
```css
@apply bg-slate-800/80 border border-slate-700 rounded-xl px-4 py-3 text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-[#f7931a] focus:border-transparent transition-all;
```
**Usage**: Text inputs and selects
**Features**: Dark background, orange focus ring, smooth transitions

---

## 🔄 State Management

### Component-Level State
All components use React useState hooks for local state:
- No global state management (Redux, Zustand, etc.)
- Props drilling for shared data
- URL params for page-level state (wallet page)

### Data Flow
1. **User Input** → WalletSearch component
2. **Navigation** → Wallet page with URL params
3. **API Fetch** → getWalletInfo() in lib/api.ts
4. **State Update** → useState in page component
5. **Render** → Child components receive props

---

## 🧪 Testing Recommendations

### Unit Tests
```typescript
// Example: CryptoDropdown.test.tsx
test('renders all crypto options', () => {
  render(<CryptoDropdown value="BTC" onChange={() => {}} />);
  expect(screen.getByText('Bitcoin (BTC)')).toBeInTheDocument();
});
```

### Integration Tests
```typescript
// Example: WalletSearch.test.tsx
test('navigates to wallet page on check', () => {
  // Test navigation with crypto and address
});
```

### E2E Tests
```typescript
// Example: wallet-flow.spec.ts
test('complete wallet check flow', () => {
  // 1. Visit home
  // 2. Select crypto
  // 3. Enter address
  // 4. Click check
  // 5. Verify wallet page loads
  // 6. Verify balance displayed
});
```

---

## 🎯 Best Practices

### Component Design
✅ Single Responsibility Principle
✅ Props over global state
✅ TypeScript for type safety
✅ Client-side components ('use client')
✅ Error boundaries for API errors

### Performance
✅ React.memo for expensive components (if needed)
✅ Lazy loading for charts (already done via useEffect)
✅ Debouncing for calculator input (optional)
✅ Minimize re-renders

### Accessibility
✅ Semantic HTML
✅ ARIA labels where needed
✅ Keyboard navigation
✅ High contrast colors
✅ Responsive text sizes

---

## 🔧 Extending Components

### Adding a New Crypto
1. Add to CRYPTO_IDS in lib/api.ts
2. Add API fetching function
3. Add to dropdown in CryptoDropdown.tsx
4. Add icon/symbol mapping in wallet page
5. Test thoroughly

### Adding a New Chart Type
1. Import new Recharts component
2. Create new chart component (e.g., BarChartComponent.tsx)
3. Use same data fetching pattern
4. Add to price-chart page
5. Style with orange theme

### Adding Analytics
1. Install package: `npm install @vercel/analytics`
2. Add to layout.tsx
3. Track events in components
4. Monitor in Vercel dashboard

---

This documentation should help you understand, maintain, and extend WalletIQ components!
