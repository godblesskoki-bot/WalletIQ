# WalletIQ - Advertising Integration Guide

## 🚨 Important: AdMob vs AdSense

**Your provided ad IDs are for AdMob (mobile apps), but WalletIQ is a web application.**

- **AdMob** = Mobile apps (iOS, Android, React Native)
- **AdSense** = Web applications (Next.js, React, HTML)

## 📱 Current Implementation

I've implemented a **web-based interstitial ad system** that:

✅ Initializes at app level (in layout.tsx)
✅ Shows ad when "Check" button is clicked
✅ Displays for 5 seconds before allowing close
✅ Navigates to wallet page AFTER ad is dismissed
✅ Never shows at app launch

### Current Ad Flow:
1. User enters wallet address
2. User clicks "Check" button
3. **→ Interstitial ad appears** (full screen)
4. User waits 5 seconds
5. User closes ad
6. **→ Navigation to wallet results**

## 🔧 How It Works

### 1. AdSense SDK Initialization
**File**: `src/app/layout.tsx`

```typescript
<AdSenseProvider publisherId="ca-app-pub-8343060968893817~4342812488">
  {children}
</AdSenseProvider>
```

The SDK is loaded globally at the top level, exactly as requested.

### 2. Interstitial Ad Trigger
**File**: `src/components/WalletSearch.tsx`

```typescript
const handleCheck = () => {
  if (address.trim()) {
    setShowAd(true);  // Show ad FIRST
  }
};

const handleAdClosed = () => {
  setShowAd(false);
  router.push(`/wallet?...`);  // Navigate AFTER ad
};
```

The ad appears immediately after clicking "Check", before navigation.

### 3. Ad Component
**File**: `src/components/InterstitialAd.tsx`

Currently shows a **placeholder ad** with a 5-second countdown.

## 🎯 Converting to Real Google AdSense Ads

### Step 1: Get AdSense Account
1. Visit [google.com/adsense](https://www.google.com/adsense)
2. Sign up with your Google account
3. Add your website domain
4. Wait for approval (usually 1-2 weeks)

### Step 2: Create Ad Units
1. Go to AdSense Dashboard
2. Click "Ads" → "By ad unit"
3. Create a new "Display ads" unit
4. Choose "Interstitial" or "In-page" format
5. Copy your **publisher ID** (ca-pub-XXXXXXXX)
6. Copy your **ad slot ID**

### Step 3: Replace IDs in Code

#### Update Layout (Publisher ID)
**File**: `src/app/layout.tsx`

```typescript
<AdSenseProvider publisherId="ca-pub-YOUR_ADSENSE_ID">
```

#### Update Ad Component (Ad Slot)
**File**: `src/components/InterstitialAd.tsx`

Replace the placeholder div with:

```typescript
<ins className="adsbygoogle"
     style={{ display: 'block' }}
     data-ad-client="ca-pub-YOUR_ADSENSE_ID"
     data-ad-slot="YOUR_AD_SLOT_ID"
     data-ad-format="auto"
     data-full-width-responsive="true"></ins>

<script>
  (adsbygoogle = window.adsbygoogle || []).push({});
</script>
```

## 🔄 Alternative: Google Ad Manager

For more control over interstitial ads:

### 1. Use Google Ad Manager (GAM)
1. Visit [admanager.google.com](https://admanager.google.com)
2. Create an interstitial ad unit
3. Get the ad unit path

### 2. Install react-gpt
```bash
npm install react-gpt
```

### 3. Update InterstitialAd.tsx
```typescript
import { DFPSlotsProvider, AdSlot } from 'react-gpt';

<DFPSlotsProvider dfpNetworkId="YOUR_NETWORK_ID">
  <AdSlot adUnit="/YOUR_NETWORK_ID/interstitial" />
</DFPSlotsProvider>
```

## 📱 For Mobile App (React Native)

If you want to convert WalletIQ to a mobile app with AdMob:

### Step 1: Create React Native App
```bash
npx react-native init WalletIQMobile
```

### Step 2: Install AdMob
```bash
npm install @react-native-firebase/app
npm install @react-native-firebase/admob
```

### Step 3: Initialize AdMob
```typescript
import admob, { InterstitialAd, AdEventType } from '@react-native-firebase/admob';

// Initialize AdMob
admob().initialize().then(adapterStatuses => {
  console.log('AdMob initialized');
});

// Your provided App ID
const APP_ID = 'ca-app-pub-8343060968893817~4342812488';
```

### Step 4: Create Interstitial
```typescript
const AD_UNIT_ID = 'ca-app-pub-8343060968893817/1405657952';
const interstitial = InterstitialAd.createForAdRequest(AD_UNIT_ID);

// Load ad
interstitial.load();

// Show on button press
const handleCheck = () => {
  interstitial.show();
};

// Navigate after ad closes
interstitial.addAdEventListener(AdEventType.CLOSED, () => {
  navigation.navigate('Wallet');
});
```

## ⚙️ Configuration Options

### Current Settings

**Ad Countdown**: 5 seconds
**Location**: `src/components/InterstitialAd.tsx` line 11

```typescript
const [countdown, setCountdown] = useState(5); // Change this value
```

**Ad Trigger**: On "Check" button click only
**Location**: `src/components/WalletSearch.tsx` line 18

### Customization Options

#### Change Countdown Duration
```typescript
const [countdown, setCountdown] = useState(10); // 10 seconds
```

#### Skip Countdown (Instant Close)
```typescript
const [countdown, setCountdown] = useState(0); // Close immediately
```

#### Remove Close Button
```typescript
{/* Remove the conditional rendering of close button */}
```

## 🎨 Ad Styling

The interstitial ad uses:
- Full-screen overlay (z-50)
- Dark backdrop (black/95)
- Backdrop blur effect
- Centered content
- Countdown timer
- Close button (after countdown)

### Customize Appearance
**File**: `src/components/InterstitialAd.tsx`

```typescript
// Background
className="fixed inset-0 bg-black/95" // Change opacity

// Container
className="max-w-4xl" // Change max width

// Countdown position
className="absolute -top-12 right-0" // Adjust position
```

## 📊 Ad Performance Tracking

### Add Analytics
```bash
npm install @vercel/analytics
```

### Track Ad Events
```typescript
import { track } from '@vercel/analytics';

const handleAdShown = () => {
  track('ad_shown', { adUnit: adUnitId });
};

const handleAdClosed = () => {
  track('ad_closed', { adUnit: adUnitId, duration: 5 - countdown });
};
```

## 🔒 Privacy Compliance

### GDPR Compliance
Add consent banner before showing ads:

```bash
npm install react-cookie-consent
```

```typescript
import CookieConsent from 'react-cookie-consent';

<CookieConsent
  location="bottom"
  buttonText="Accept"
  onAccept={() => setAdsEnabled(true)}
>
  This site uses cookies for ads and analytics.
</CookieConsent>
```

### Update Privacy Notice
Add to footer:
"We use Google AdSense to display ads. Learn more in our Privacy Policy."

## 🐛 Troubleshooting

### Ad Not Showing
1. Check AdSense approval status
2. Verify ad unit IDs are correct
3. Check browser console for errors
4. Ensure domain is added to AdSense
5. Test on production (ads may not show on localhost)

### Ad Blocked
1. Users may have ad blockers installed
2. Implement fallback content
3. Add "Please disable ad blocker" message

### Revenue Not Tracking
1. Wait 24-48 hours for initial data
2. Check AdSense dashboard
3. Verify ad code is correct
4. Ensure sufficient traffic

## 📈 Optimization Tips

### 1. Ad Placement
- ✅ Current: After user action (Check button)
- Consider: After viewing wallet details
- Consider: On price chart page

### 2. Ad Frequency
- Current: Every wallet check
- Consider: Every 3rd check
- Consider: Once per session

### 3. Ad Types
- Interstitial (current)
- Banner ads (header/footer)
- In-article ads
- Native ads

## 🚀 Next Steps

1. **Sign up for Google AdSense**
2. **Get approved** (add domain, wait for review)
3. **Create ad units** in AdSense dashboard
4. **Replace placeholder** with real ad code
5. **Test thoroughly** on production
6. **Monitor performance** in AdSense dashboard

## 📝 Important Notes

### Current Status
✅ Ad system implemented and working
✅ Shows after "Check" button click
✅ Navigates after ad closes
✅ Never shows at app launch
⚠️ Using placeholder ad (not real ads)
⚠️ Need AdSense account to show real ads

### Production Checklist
- [ ] Get AdSense approval
- [ ] Replace publisher ID
- [ ] Replace ad unit ID
- [ ] Test on production domain
- [ ] Add privacy policy
- [ ] Implement GDPR consent
- [ ] Monitor ad performance
- [ ] Optimize placement

---

## 🎉 Summary

Your ad integration is **ready to go**! The system:

1. ✅ Initializes SDK at app level
2. ✅ Shows interstitial ad on "Check" click
3. ✅ Navigates to results after ad closes
4. ✅ Never shows at app launch

**Next**: Get AdSense approval and replace the placeholder with real ads!

For questions: Check [AdSense Help Center](https://support.google.com/adsense)
