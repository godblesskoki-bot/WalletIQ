import type { Metadata } from "next";
import type { ReactNode } from "react";
import "./globals.css";
import AdSenseProvider from "@/components/AdSenseProvider";

export const metadata: Metadata = {
  title: "WalletIQ - Crypto Wallet Balance Checker",
  description: "Check your crypto wallet balances across multiple blockchains. Private and secure.",
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body>
        <AdSenseProvider publisherId="ca-app-pub-8343060968893817~4342812488">
          {children}
        </AdSenseProvider>
      </body>
    </html>
  );
}
