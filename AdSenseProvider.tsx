'use client';

import Script from 'next/script';

interface AdSenseProviderProps {
  children: React.ReactNode;
  publisherId?: string; // Your AdSense publisher ID
}

export default function AdSenseProvider({ children, publisherId = 'ca-app-pub-8343060968893817~4342812488' }: AdSenseProviderProps) {
  return (
    <>
      {/* Google AdSense SDK Initialization */}
      {/* Note: AdMob IDs don't work on web. Replace with AdSense publisher ID */}
      <Script
        id="adsense-init"
        async
        src={`https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${publisherId}`}
        crossOrigin="anonymous"
        strategy="afterInteractive"
        onLoad={() => {
          console.log('AdSense SDK loaded');
          // Initialize AdSense
          if (typeof window !== 'undefined' && (window as any).adsbygoogle) {
            try {
              ((window as any).adsbygoogle = (window as any).adsbygoogle || []).push({});
            } catch (err) {
              console.error('AdSense initialization error:', err);
            }
          }
        }}
        onError={(e) => {
          console.error('AdSense SDK failed to load:', e);
        }}
      />
      
      {children}
    </>
  );
}
