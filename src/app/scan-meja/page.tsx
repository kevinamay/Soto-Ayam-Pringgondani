"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Scanner } from "@yudiel/react-qr-scanner";

export default function ScanMejaPage() {
  const router = useRouter();
  const [error, setError] = useState<string | null>(null);
  const [isScanning, setIsScanning] = useState(true);

  const handleScan = (result: any) => {
    if (result && result.length > 0) {
      // @yudiel/react-qr-scanner returns an array of results in v2+
      const rawValue = result[0]?.rawValue;
      
      if (typeof rawValue === 'string') {
        // Stop scanning to prevent multiple triggers
        setIsScanning(false);
        
        // Extract table number. e.g., if QR contains "table=38" or "38"
        const tableNumber = rawValue.replace(/[^0-9]/g, ""); 
        
        if (tableNumber) {
          sessionStorage.setItem("tableNumber", tableNumber);
          
          // Redirect the user to the menu page with the table number in URL
          setTimeout(() => {
            router.push(`/menu?meja=${tableNumber}`);
          }, 500);
        } else {
          // If no number found in QR
          setError("QR Code tidak valid. Pastikan Anda men-scan QR code di meja.");
          setIsScanning(true);
        }
      }
    }
  };

  return (
    <div className="min-h-screen bg-[var(--color-cream)] flex flex-col items-center justify-center p-4">
      
      {/* Header Area */}
      <div className="text-center mb-8">
        <h1 className="font-serif font-bold text-[var(--color-dark-brown)] text-2xl lg:text-3xl">
          Scan QR Code Meja
        </h1>
        <p className="font-sans text-[var(--color-grayish-brown)] text-sm lg:text-base mt-2 max-w-sm mx-auto">
          Arahkan kamera ke QR code yang ada di meja Anda untuk mulai memesan.
        </p>
      </div>

      {/* Scanner Viewfinder */}
      <div className="relative w-full max-w-sm aspect-square rounded-3xl overflow-hidden border-4 border-white shadow-2xl bg-black">
        {isScanning && (
          <Scanner
            onScan={handleScan}
            onError={(err) => {
              // Kita hilangkan console.error agar Next.js tidak memunculkan overlay error merah
              setError("Gagal mengakses kamera. Pastikan Anda telah memberikan izin kamera pada browser Anda.");
            }}
            components={{
              audio: true,
              onOff: true,
              torch: true
            }}
          />
        )}
        
        {/* Visual Overlay Target */}
        <div className="absolute inset-0 pointer-events-none border-[40px] border-black/30 rounded-3xl z-10"></div>
        <div className="absolute inset-0 pointer-events-none flex items-center justify-center z-20">
          <div className="w-48 h-48 border-2 border-white/50 rounded-xl relative">
             <div className="absolute top-0 left-0 w-4 h-4 border-t-4 border-l-4 border-white rounded-tl-xl"></div>
             <div className="absolute top-0 right-0 w-4 h-4 border-t-4 border-r-4 border-white rounded-tr-xl"></div>
             <div className="absolute bottom-0 left-0 w-4 h-4 border-b-4 border-l-4 border-white rounded-bl-xl"></div>
             <div className="absolute bottom-0 right-0 w-4 h-4 border-b-4 border-r-4 border-white rounded-br-xl"></div>
          </div>
        </div>
      </div>

      {/* Error Message */}
      {error && (
        <div className="mt-6 text-red-600 font-sans text-sm text-center max-w-sm bg-red-100 p-3 rounded-lg shadow-sm">
          {error}
        </div>
      )}

      {/* Fallback / Cancel */}
      <div className="mt-10">
        <Link 
          href="/" 
          className="font-sans text-[var(--color-dark-brown)] font-semibold border-b-2 border-transparent hover:border-[var(--color-terracotta)] hover:text-[var(--color-terracotta)] transition-colors pb-1"
        >
          &larr; Kembali
        </Link>
      </div>
      
    </div>
  );
}
