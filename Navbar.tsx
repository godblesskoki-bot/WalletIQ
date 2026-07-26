'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useState } from 'react';

export default function Navbar() {
  const [logoError, setLogoError] = useState(false);

  return (
    <nav className="w-full py-6">
      <div className="container mx-auto px-4">
        <Link href="/" className="flex items-center gap-3 hover:opacity-80 transition-opacity w-fit">
          {!logoError && (
            <Image
              src="/images/walletiq-logo.png"
              alt="WalletIQ Logo"
              width={48}
              height={48}
              className="object-contain"
              priority
              onError={() => setLogoError(true)}
            />
          )}
          <span className="text-3xl md:text-4xl font-bold text-[#f7931a]">
            WalletIQ
          </span>
        </Link>
      </div>
    </nav>
  );
}
