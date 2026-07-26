'use client';

import { QRCodeSVG } from 'qrcode.react';

interface QRCodeDisplayProps {
  address: string;
}

export default function QRCodeDisplay({ address }: QRCodeDisplayProps) {
  return (
    <div className="card flex flex-col items-center">
      <h3 className="text-xl font-semibold mb-4">Wallet QR Code</h3>
      <div className="bg-white p-4 rounded-xl">
        <QRCodeSVG value={address} size={200} />
      </div>
      <p className="mt-4 text-sm text-slate-400 break-all text-center">{address}</p>
    </div>
  );
}
