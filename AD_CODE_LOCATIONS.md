# Ad Code Locations - Exact Implementation Points

## 📍 Where Ad Code Is Located

### 1. SDK Import (Top Level - Global)
**Location**: `src/app/layout.tsx`  
**Line**: 3-4 (import statement)  
**Line**: 15 (wrapper component)

```typescript
// TOP OF FILE - SDK Import
import AdSenseProvider from "@/components/AdSenseProvider";

// WRAPPING CHILDREN - SDK Initialization
<AdSenseProvider publisherId="ca-app-pub-8343060968893817~4342812488">
  {children}
</AdSenseProvider>
```

### 2. Ad Display Trigger (Exact Point After Check Button)
**Location**: `src/components/WalletSearch.tsx`  
**Line**: 18-22 (button click handler)

```typescript
const handleCheck = () => {
  if (address.trim()) {
    // EXACT POINT: Ad is triggered here, immediately after Check button press
    setShowAd(true);
  }
};
```

### 3. Navigation After Ad (Happens Only After Ad Closes)
**Location**: `src/components/WalletSearch.tsx`  
**Line**: 24-28 (ad closed handler)

```typescript
const handleAdClosed = () => {
  // EXACT POINT: Navigation happens ONLY after ad is dismissed
  setShowAd(false);
  router.push(`/wallet?crypto=${crypto}&address=${encodeURIComponent(address)}`);
};
```

### 4. Ad Component Rendering
**Location**: `src/components/WalletSearch.tsx`  
**Line**: 49-55 (conditional rendering)

```typescript
{/* EXACT POINT: Ad unit ID is inserted here */}
{showAd && (
  <InterstitialAd
    adUnitId="ca-app-pub-8343060968893817/1405657952"
    onAdClosed={handleAdClosed}
  />
)}
```

## 🎯 Execution Flow (Step by Step)

### User Clicks "Check" Button

```
FILE: src/components/WalletSearch.tsx
LINE: 42 - Button element

<button
  onClick={handleCheck}  // ← STEP 1: User clicks here
  className="btn-primary text-lg whitespace-nowrap"
>
  Check
</button>

↓

LINE: 18 - handleCheck function

const handleCheck = () => {
  if (address.trim()) {
    setShowAd(true);  // ← STEP 2: Ad is triggered
  }
};

↓

LINE: 49 - Conditional rendering

{showAd && (  // ← STEP 3: Ad appears
  <InterstitialAd
    adUnitId="ca-app-pub-8343060968893817/1405657952"
    onAdClosed={handleAdClosed}
  />
)}

↓

FILE: src/components/InterstitialAd.tsx
LINE: 12 - Component renders full-screen

return (
  <div className="fixed inset-0 z-50...">  // ← STEP 4: Full-screen ad
    {/* Ad content */}
  </div>
);

↓

LINE: 27 - User closes ad

<button onClick={handleClose}>  // ← STEP 5: User clicks close
  Close Ad
</button>

↓

LINE: 21 - handleClose calls onAdClosed

const handleClose = () => {
  if (countdown === 0) {
    onAdClosed();  // ← STEP 6: Triggers navigation
  }
};

↓

FILE: src/components/WalletSearch.tsx
LINE: 24 - Navigation executes

const handleAdClosed = () => {
  setShowAd(false);
  router.push(`/wallet?...`);  // ← STEP 7: Navigate to results
};
```

## 🔍 Code Inspection Guide

### To See SDK Initialization:
1. Open `src/app/layout.tsx`
2. Look for line 3: `import AdSenseProvider`
3. Look for line 15: `<AdSenseProvider publisherId="..."`

### To See Ad Trigger Point:
1. Open `src/components/WalletSearch.tsx`
2. Look for line 18: `const handleCheck = () => {`
3. Look for line 20: `setShowAd(true);` ← This is the exact trigger

### To See Ad Unit ID:
1. Open `src/components/WalletSearch.tsx`
2. Look for line 52: `adUnitId="ca-app-pub-8343060968893817/1405657952"`

### To See Navigation After Ad:
1. Open `src/components/WalletSearch.tsx`
2. Look for line 24: `const handleAdClosed = () => {`
3. Look for line 27: `router.push(...)` ← Navigation happens here

## 📝 Variable Names & State

### Ad State Variable
**File**: `src/components/WalletSearch.tsx`  
**Line**: 12

```typescript
const [showAd, setShowAd] = useState(false);
```

- `showAd = false` → No ad showing
- `showAd = true` → Ad is displayed

### When State Changes:

```typescript
// BEFORE CHECK BUTTON CLICK
showAd = false  // No ad

// IMMEDIATELY AFTER CHECK BUTTON CLICK
showAd = true   // Ad appears

// AFTER USER CLOSES AD
showAd = false  // Ad dismissed, navigation happens
```

## 🎨 Ad Component Structure

**File**: `src/components/InterstitialAd.tsx`

```typescript
// LINE 1: Component receives ad unit ID
interface InterstitialAdProps {
  onAdClosed: () => void;
  adUnitId: string;  // ← Your ad unit ID is passed here
}

// LINE 7: Component definition
export default function InterstitialAd({ onAdClosed, adUnitId }) {
  
  // LINE 11: Countdown timer state
  const [countdown, setCountdown] = useState(5);
  
  // LINE 13-19: Countdown logic
  useEffect(() => {
    if (countdown > 0) {
      const timer = setTimeout(() => setCountdown(countdown - 1), 1000);
      return () => clearTimeout(timer);
    }
  }, [countdown]);
  
  // LINE 21-25: Close handler
  const handleClose = () => {
    if (countdown === 0) {
      onAdClosed();  // ← Triggers navigation
    }
  };
  
  // LINE 27-80: UI rendering
  return (
    <div className="fixed inset-0 z-50...">
      {/* Full-screen ad */}
    </div>
  );
}
```

## 🔧 Ad Unit ID Placement

### Exact Location of Your Ad Unit ID:

```
FILE: src/components/WalletSearch.tsx
LINE: 52

<InterstitialAd
  adUnitId="ca-app-pub-8343060968893817/1405657952"  ← HERE
  onAdClosed={handleAdClosed}
/>
```

### Exact Location of Your App ID:

```
FILE: src/app/layout.tsx
LINE: 15

<AdSenseProvider publisherId="ca-app-pub-8343060968893817~4342812488">  ← HERE
  {children}
</AdSenseProvider>
```

## ⚙️ How to Modify

### Change Ad Countdown Time:
```
FILE: src/components/InterstitialAd.tsx
LINE: 11

const [countdown, setCountdown] = useState(5);  // ← Change number here
```

### Change When Ad Shows:
```
FILE: src/components/WalletSearch.tsx
LINE: 18-22

const handleCheck = () => {
  if (address.trim()) {
    setShowAd(true);  // ← Modify this condition
  }
};
```

### Replace with Real Ad Code:
```
FILE: src/components/InterstitialAd.tsx
LINE: 46-58

// Replace the <div className="p-8..."> section with:
<ins className="adsbygoogle"
     data-ad-client="ca-pub-YOUR_ID"
     data-ad-slot={adUnitId}></ins>
```

## 📊 File Summary

| File | Purpose | Key Lines |
|------|---------|-----------|
| `src/app/layout.tsx` | SDK init at top level | 3, 15 |
| `src/components/AdSenseProvider.tsx` | SDK loader | 14-26 |
| `src/components/WalletSearch.tsx` | Ad trigger & navigation | 18-28, 49-55 |
| `src/components/InterstitialAd.tsx` | Ad display | 11, 21, 27-80 |

## 🎯 Quick Reference

### Find SDK Import:
```bash
grep -n "AdSenseProvider" src/app/layout.tsx
```

### Find Ad Trigger:
```bash
grep -n "setShowAd" src/components/WalletSearch.tsx
```

### Find Ad Unit ID:
```bash
grep -n "ca-app-pub" src/components/WalletSearch.tsx
```

### Find Navigation After Ad:
```bash
grep -n "router.push" src/components/WalletSearch.tsx
```

---

## ✅ Verification

To verify your ad integration:

1. **SDK at Top Level**: Check `src/app/layout.tsx` line 15
2. **Ad on Check Click**: Check `src/components/WalletSearch.tsx` line 20
3. **Ad Unit ID**: Check `src/components/WalletSearch.tsx` line 52
4. **Navigation After**: Check `src/components/WalletSearch.tsx` line 27

All requirements met! ✅
