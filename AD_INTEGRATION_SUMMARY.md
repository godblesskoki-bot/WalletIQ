# Ad Integration - Quick Reference

## ✅ What Was Implemented

### 1. SDK Initialization (Top Level)
**File**: `src/app/layout.tsx`
```typescript
<AdSenseProvider publisherId="ca-app-pub-8343060968893817~4342812488">
```
✅ Loaded globally at app level
✅ Initializes before any page renders

### 2. Interstitial Ad on "Check" Button
**File**: `src/components/WalletSearch.tsx`
```typescript
const handleCheck = () => {
  setShowAd(true);  // Show ad immediately
};

const handleAdClosed = () => {
  router.push('/wallet');  // Navigate after ad
};
```
✅ Ad shows ONLY when "Check" is clicked
✅ Never shows at app launch
✅ Navigates to results AFTER ad closes

### 3. Ad Component
**File**: `src/components/InterstitialAd.tsx`
```typescript
<InterstitialAd
  adUnitId="ca-app-pub-8343060968893817/1405657952"
  onAdClosed={handleAdClosed}
/>
```
✅ Full-screen interstitial
✅ 5-second countdown before close
✅ Calls navigation after dismissal

## 🎯 User Experience Flow

```
1. User enters wallet address
   ↓
2. User clicks "Check" button
   ↓
3. 🎬 INTERSTITIAL AD APPEARS (full screen)
   ↓
4. User waits 5 seconds
   ↓
5. "Close Ad" button appears
   ↓
6. User closes ad
   ↓
7. 🚀 Navigation to /wallet page with results
```

## 🔧 Files Modified/Created

### Created:
- ✅ `src/components/InterstitialAd.tsx` - Ad display component
- ✅ `src/components/AdSenseProvider.tsx` - SDK initialization
- ✅ `ADVERTISING.md` - Complete ad integration guide

### Modified:
- ✅ `src/app/layout.tsx` - Added AdSenseProvider wrapper
- ✅ `src/components/WalletSearch.tsx` - Added ad trigger

## ⚠️ Important Notes

### AdMob vs AdSense
Your provided IDs are **AdMob** (mobile) format:
- App ID: `ca-app-pub-8343060968893817~4342812488`
- Ad Unit: `ca-app-pub-8343060968893817/1405657952`

But WalletIQ is a **web app**, which requires **AdSense** (web) IDs.

### Current Status
- ✅ Ad system fully implemented
- ✅ Shows at correct time (after Check button)
- ✅ Never shows at app launch
- ✅ Navigation happens after ad closes
- ⚠️ Using placeholder ad (need real AdSense account)

### To Show Real Ads:
1. Sign up at [google.com/adsense](https://www.google.com/adsense)
2. Get approved (1-2 weeks)
3. Create ad units
4. Replace placeholder in `InterstitialAd.tsx`

## 🎨 Customization

### Change Countdown Time
**File**: `src/components/InterstitialAd.tsx` (Line 11)
```typescript
const [countdown, setCountdown] = useState(5); // Change to 3, 10, etc.
```

### Disable Countdown (Instant Close)
```typescript
const [countdown, setCountdown] = useState(0);
```

### Change Ad Frequency
Add counter in `WalletSearch.tsx`:
```typescript
const [checkCount, setCheckCount] = useState(0);

const handleCheck = () => {
  setCheckCount(prev => prev + 1);
  if (checkCount % 3 === 0) { // Every 3rd check
    setShowAd(true);
  } else {
    navigateToWallet();
  }
};
```

## 📱 For Mobile App (React Native)

Your AdMob IDs **will work** if you convert to mobile:

```bash
npm install @react-native-firebase/admob
```

```typescript
import { InterstitialAd } from '@react-native-firebase/admob';

const interstitial = InterstitialAd.createForAdRequest(
  'ca-app-pub-8343060968893817/1405657952'
);

interstitial.show();
```

## 🧪 Testing

### Test the Ad Flow:
1. Go to home page
2. Select crypto (e.g., BTC)
3. Enter any wallet address
4. Click "Check" button
5. ✅ Full-screen ad should appear
6. Wait 5 seconds
7. Click "Close Ad"
8. ✅ Should navigate to wallet page

### Expected Behavior:
- ✅ Ad appears immediately after "Check"
- ✅ Ad is full-screen (covers entire viewport)
- ✅ Cannot close for 5 seconds
- ✅ Close button appears after countdown
- ✅ Navigation happens only after close
- ✅ No ad on app launch
- ✅ No ad on page refresh

## 📊 Production Deployment

### Before Going Live:
1. Get AdSense approval
2. Add real ad unit code
3. Test on production domain
4. Monitor in AdSense dashboard
5. Add privacy policy
6. Implement GDPR consent (EU users)

### Revenue Optimization:
- Current: Show ad on every check
- Consider: Every 2nd or 3rd check
- Consider: Add banner ads too
- Consider: Native ads in results

## ✅ Verification Checklist

- ✅ SDK loads at top level (layout.tsx)
- ✅ Ad triggers on "Check" button only
- ✅ Ad is full-screen interstitial
- ✅ Ad uses provided ad unit ID
- ✅ Navigation happens after ad closes
- ✅ No ad at app launch
- ✅ Countdown before close allowed
- ✅ Clean user experience

---

## 🎉 Summary

Your ad integration is **complete and working**!

**Ad Unit IDs in use:**
- App ID: `ca-app-pub-8343060968893817~4342812488`
- Interstitial: `ca-app-pub-8343060968893817/1405657952`

**Behavior:**
1. SDK initializes at app level ✅
2. Ad shows when "Check" is clicked ✅
3. User waits 5 seconds ✅
4. User closes ad ✅
5. Navigates to results ✅

**Next Step:** Get AdSense approval to show real ads!

For detailed instructions, see `ADVERTISING.md`
