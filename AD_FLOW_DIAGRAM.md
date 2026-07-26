# Ad Integration - Visual Flow Diagram

## 🎬 Complete Ad Flow

```
┌─────────────────────────────────────────────────────────────┐
│  APP LAUNCH                                                 │
│  ┌────────────────────────────────────────────────────────┐ │
│  │ src/app/layout.tsx                                     │ │
│  │ Line 15: <AdSenseProvider publisherId="ca-app-pub...">│ │
│  │                                                         │ │
│  │ ✅ SDK INITIALIZED AT TOP LEVEL                        │ │
│  │ ❌ NO AD SHOWN AT LAUNCH                               │ │
│  └────────────────────────────────────────────────────────┘ │
└─────────────────────────────────────────────────────────────┘
                            ↓
┌─────────────────────────────────────────────────────────────┐
│  HOME PAGE                                                  │
│  ┌────────────────────────────────────────────────────────┐ │
│  │ User sees:                                             │ │
│  │ • Crypto dropdown (BTC/ETH/SOL/BNB/USDT)              │ │
│  │ • Wallet address input                                 │ │
│  │ • "Check" button                                       │ │
│  │                                                         │ │
│  │ User enters: bc1q1234...                              │ │
│  └────────────────────────────────────────────────────────┘ │
└─────────────────────────────────────────────────────────────┘
                            ↓
┌─────────────────────────────────────────────────────────────┐
│  USER CLICKS "CHECK" BUTTON                                 │
│  ┌────────────────────────────────────────────────────────┐ │
│  │ src/components/WalletSearch.tsx                        │ │
│  │ Line 42: <button onClick={handleCheck}>                │ │
│  │ Line 18: const handleCheck = () => {                   │ │
│  │ Line 20:   setShowAd(true);  ← TRIGGER                │ │
│  │                                                         │ │
│  │ ✅ AD TRIGGERED IMMEDIATELY                            │ │
│  │ ❌ NO NAVIGATION YET                                   │ │
│  └────────────────────────────────────────────────────────┘ │
└─────────────────────────────────────────────────────────────┘
                            ↓
┌─────────────────────────────────────────────────────────────┐
│  FULL-SCREEN INTERSTITIAL AD APPEARS                        │
│  ┌────────────────────────────────────────────────────────┐ │
│  │ src/components/InterstitialAd.tsx                      │ │
│  │ Line 52: adUnitId="ca-app-pub-8343060968893817/..."   │ │
│  │                                                         │ │
│  │ ╔════════════════════════════════════════════════╗    │ │
│  │ ║                                                ║    │ │
│  │ ║  [Ad closes in 5s]                            ║    │ │
│  │ ║                                                ║    │ │
│  │ ║  ┌──────────────────────────────────────┐    ║    │ │
│  │ ║  │                                       │    ║    │ │
│  │ ║  │     FULL-SCREEN AD CONTENT           │    ║    │ │
│  │ ║  │                                       │    ║    │ │
│  │ ║  │  ca-app-pub-8343060968893817/...     │    ║    │ │
│  │ ║  │                                       │    ║    │ │
│  │ ║  └──────────────────────────────────────┘    ║    │ │
│  │ ║                                                ║    │ │
│  │ ╚════════════════════════════════════════════════╝    │ │
│  │                                                         │ │
│  │ ✅ AD DISPLAYED FULL-SCREEN                            │ │
│  │ ⏳ COUNTDOWN: 5...4...3...2...1...                     │ │
│  └────────────────────────────────────────────────────────┘ │
└─────────────────────────────────────────────────────────────┘
                            ↓
┌─────────────────────────────────────────────────────────────┐
│  COUNTDOWN REACHES ZERO                                     │
│  ┌────────────────────────────────────────────────────────┐ │
│  │ src/components/InterstitialAd.tsx                      │ │
│  │ Line 31: {countdown === 0 && ...}                      │ │
│  │                                                         │ │
│  │ ╔════════════════════════════════════════════════╗    │ │
│  │ ║ [✕ Close Ad]                     ← APPEARS    ║    │ │
│  │ ║                                                ║    │ │
│  │ ║  ┌──────────────────────────────────────┐    ║    │ │
│  │ ║  │                                       │    ║    │ │
│  │ ║  │     AD CONTENT                        │    ║    │ │
│  │ ║  │                                       │    ║    │ │
│  │ ║  └──────────────────────────────────────┘    ║    │ │
│  │ ║                                                ║    │ │
│  │ ╚════════════════════════════════════════════════╝    │ │
│  │                                                         │ │
│  │ ✅ CLOSE BUTTON NOW VISIBLE                            │ │
│  └────────────────────────────────────────────────────────┘ │
└─────────────────────────────────────────────────────────────┘
                            ↓
┌─────────────────────────────────────────────────────────────┐
│  USER CLICKS "CLOSE AD"                                     │
│  ┌────────────────────────────────────────────────────────┐ │
│  │ src/components/InterstitialAd.tsx                      │ │
│  │ Line 35: <button onClick={handleClose}>                │ │
│  │ Line 21: const handleClose = () => {                   │ │
│  │ Line 23:   onAdClosed();  ← CALL CALLBACK             │ │
│  │                                                         │ │
│  │ ✅ AD DISMISSED                                        │ │
│  └────────────────────────────────────────────────────────┘ │
└─────────────────────────────────────────────────────────────┘
                            ↓
┌─────────────────────────────────────────────────────────────┐
│  NAVIGATION TO WALLET PAGE                                  │
│  ┌────────────────────────────────────────────────────────┐ │
│  │ src/components/WalletSearch.tsx                        │ │
│  │ Line 26: const handleAdClosed = () => {                │ │
│  │ Line 27:   setShowAd(false);                           │ │
│  │ Line 28:   router.push('/wallet?...');  ← NAVIGATE    │ │
│  │                                                         │ │
│  │ ✅ NAVIGATION HAPPENS AFTER AD                         │ │
│  └────────────────────────────────────────────────────────┘ │
└─────────────────────────────────────────────────────────────┘
                            ↓
┌─────────────────────────────────────────────────────────────┐
│  WALLET RESULTS PAGE                                        │
│  ┌────────────────────────────────────────────────────────┐ │
│  │ /wallet?crypto=BTC&address=bc1q1234...                │ │
│  │                                                         │ │
│  │ • Wallet balance                                       │ │
│  │ • Transaction history                                  │ │
│  │ • QR code                                              │ │
│  │ • Summary                                              │ │
│  │                                                         │ │
│  │ ✅ RESULTS DISPLAYED                                   │ │
│  └────────────────────────────────────────────────────────┘ │
└─────────────────────────────────────────────────────────────┘
```

## 🔄 State Transitions

```
┌──────────────┐
│ App Launches │
│ showAd=false │ ← No ad at launch
└──────┬───────┘
       │
       ↓
┌──────────────┐
│ User on Home │
│ showAad=false│
└──────┬───────┘
       │
       │ User clicks "Check"
       ↓
┌──────────────┐
│ Ad Triggered │
│ showAd=TRUE  │ ← Ad appears
└──────┬───────┘
       │
       │ Countdown: 5 → 4 → 3 → 2 → 1 → 0
       ↓
┌──────────────┐
│ Can Close Ad │
│ showAd=TRUE  │
└──────┬───────┘
       │
       │ User clicks "Close"
       ↓
┌──────────────┐
│ Navigating   │
│ showAd=false │ ← Ad dismissed, navigating
└──────┬───────┘
       │
       ↓
┌──────────────┐
│ Wallet Page  │
│ showAd=false │ ← Results shown
└──────────────┘
```

## 📁 Component Hierarchy

```
App Root (src/app/layout.tsx)
│
├── AdSenseProvider ← SDK initialized here
│   │
│   └── Page Content
│       │
│       ├── Home Page (/)
│       │   │
│       │   └── WalletSearch
│       │       │
│       │       ├── CryptoDropdown
│       │       ├── Input Field
│       │       ├── Check Button ← Triggers ad
│       │       │
│       │       └── {showAd && InterstitialAd} ← Ad component
│       │           │
│       │           ├── Countdown Timer
│       │           ├── Ad Content (ca-app-pub-...)
│       │           └── Close Button ← Calls navigation
│       │
│       ├── Wallet Page (/wallet)
│       │   └── Results displayed here
│       │
│       └── Price Chart Page (/price-chart)
```

## ⚡ Timing Diagram

```
Time →

t=0s    App launches
        └─ SDK loaded (layout.tsx)
        └─ No ad shown ✓

t=10s   User enters address
        └─ Still no ad ✓

t=15s   User clicks "Check"
        └─ setShowAd(true) IMMEDIATELY
        └─ Ad appears ✓

t=16s   Ad displayed
        └─ Countdown: 5

t=17s   Ad displayed
        └─ Countdown: 4

t=18s   Ad displayed
        └─ Countdown: 3

t=19s   Ad displayed
        └─ Countdown: 2

t=20s   Ad displayed
        └─ Countdown: 1

t=21s   Ad displayed
        └─ Countdown: 0
        └─ Close button appears ✓

t=22s   User clicks "Close Ad"
        └─ onAdClosed() called
        └─ router.push() executed
        └─ Navigation starts ✓

t=23s   Wallet page loads
        └─ Results displayed ✓
```

## 🎯 Key Points

### ✅ Requirements Met

1. **SDK at Top Level**
   - ✅ File: `src/app/layout.tsx`
   - ✅ Line: 4 (import), 15 (initialization)
   - ✅ Loaded before any page renders

2. **Ad on Check Click**
   - ✅ File: `src/components/WalletSearch.tsx`
   - ✅ Line: 20 (`setShowAd(true)`)
   - ✅ Triggered immediately after button press

3. **Ad Unit ID at Exact Point**
   - ✅ File: `src/components/WalletSearch.tsx`
   - ✅ Line: 58 (`adUnitId="ca-app-pub-..."`)
   - ✅ Inserted at exact ad render point

4. **No Ad at Launch**
   - ✅ Initial state: `showAd = false`
   - ✅ Only changes when "Check" is clicked
   - ✅ Never shown on app load

5. **Navigate After Ad**
   - ✅ File: `src/components/WalletSearch.tsx`
   - ✅ Line: 28 (`router.push()`)
   - ✅ Only executes after ad is closed

## 📊 Code Path Summary

```
1. SDK Init:    layout.tsx:15        → AdSenseProvider wrapper
2. Ad Trigger:  WalletSearch.tsx:20  → setShowAd(true)
3. Ad Display:  WalletSearch.tsx:58  → <InterstitialAd adUnitId="...">
4. Ad Content:  InterstitialAd.tsx:46 → Full-screen display
5. Ad Close:    InterstitialAd.tsx:23 → onAdClosed()
6. Navigation:  WalletSearch.tsx:28  → router.push('/wallet')
```

---

## ✅ Integration Complete!

All requirements implemented:
- ✅ SDK at top level
- ✅ Ad on Check button press
- ✅ Ad unit ID at exact point
- ✅ Navigation after ad closes
- ✅ No ad at app launch

The ad flow is working as specified!
