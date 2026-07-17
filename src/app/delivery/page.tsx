"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import dynamic from "next/dynamic";

// Haversine formula to calculate distance in km
function calculateDistance(lat1: number, lon1: number, lat2: number, lon2: number) {
  const R = 6371; // Radius of the earth in km
  const dLat = (lat2 - lat1) * (Math.PI / 180);
  const dLon = (lon2 - lon1) * (Math.PI / 180);
  const a = 
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(lat1 * (Math.PI / 180)) * Math.cos(lat2 * (Math.PI / 180)) * 
    Math.sin(dLon / 2) * Math.sin(dLon / 2); 
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a)); 
  const d = R * c; // Distance in km
  return d * 1.3; // 1.3x multiplier for realistic road routing distance
}

const MapPicker = dynamic(() => import('@/components/MapPicker'), {
  ssr: false,
  loading: () => <div className="h-64 w-full rounded-xl bg-gray-200 animate-pulse flex items-center justify-center text-gray-500 font-semibold border border-gray-300">Memuat Peta...</div>
});

const RESTAURANT_LOC = { lat: -8.0364233, lng: 111.414764 }; // Soto Ayam Pringgondani. Change this to your exact Google Maps coordinates later.

// 1. Types & Data
type MenuItem = {
  id: string;
  name: string;
  price: number;
  image: string;
  category: "Makanan Utama" | "Minuman" | "Lauk Pendamping" | "Tambahan";
  contain?: boolean;
};

type CartItem = MenuItem & {
  quantity: number;
  note: string;
};

const menuItems: MenuItem[] = [
  // Makanan Utama
  { id: "m1", name: "Soto Ayam", price: 15000, image: "/images/soto.png", category: "Makanan Utama" },
  { id: "m2", name: "Rawon", price: 25000, image: "/images/rawon.png", category: "Makanan Utama" },
  { id: "m3", name: "Pecel Madiun", price: 12000, image: "/images/pecel.png", category: "Makanan Utama" },
  { id: "m4", name: "Nasi Campur", price: 20000, image: "/images/campur.png", category: "Makanan Utama" },

  // Minuman
  { id: "d1", name: "Es Teh / Teh Panas", price: 4000, image: "/images/esteh.png", category: "Minuman", contain: true },
  { id: "d2", name: "Es Jeruk", price: 5000, image: "/images/esjeruk.png", category: "Minuman", contain: true },
  { id: "d3", name: "Kopi Hitam", price: 5000, image: "/images/hitam.png", category: "Minuman", contain: true },
  { id: "d4", name: "Kopi Susu", price: 6000, image: "/images/susu.png", category: "Minuman", contain: true },
  { id: "d5", name: "Lemon Tea", price: 6000, image: "/images/lemontea.png", category: "Minuman", contain: true },
  { id: "d6", name: "Air Mineral", price: 4000, image: "/images/mineral.png", category: "Minuman", contain: true },
  { id: "d7", name: "Sprite", price: 5000, image: "/images/sprite.png", category: "Minuman", contain: true },
  { id: "d8", name: "Coca Cola", price: 5000, image: "/images/cola.png", category: "Minuman", contain: true },
  { id: "d9", name: "Fanta", price: 5000, image: "/images/fanta.png", category: "Minuman", contain: true },
  { id: "d10", name: "Floridina", price: 5000, image: "/images/floridina.png", category: "Minuman", contain: true },
  { id: "d11", name: "Teh Pucuk", price: 5000, image: "/images/pucuk.png", category: "Minuman", contain: true },

  // Lauk Pendamping
  { id: "s1", name: "Sate Ati Ampela", price: 5000, image: "/images/ati.png", category: "Lauk Pendamping" },
  { id: "s2", name: "Sate Telur Puyuh", price: 4000, image: "/images/puyuh.png", category: "Lauk Pendamping" },
  { id: "s3", name: "Sate Usus", price: 3000, image: "/images/usus.png", category: "Lauk Pendamping" },
  { id: "s4", name: "Ayam Goreng", price: 10000, image: "/images/ayamgoreng.png", category: "Lauk Pendamping" },
  { id: "s5", name: "Telur Dadar", price: 5000, image: "/images/dadar.png", category: "Lauk Pendamping" },
  { id: "s6", name: "Telur Asin", price: 6000, image: "/images/telurasin.png", category: "Lauk Pendamping", contain: true },
  { id: "s7", name: "Telur Rebus", price: 4000, image: "/images/telurrebus.png", category: "Lauk Pendamping" },
  { id: "s8", name: "Bakwan Jagung", price: 2000, image: "/images/bakwan.png", category: "Lauk Pendamping" },
  { id: "s9", name: "Tempe Goreng", price: 2000, image: "/images/tempegoreng.png", category: "Lauk Pendamping" },
  { id: "s10", name: "Tahu Goreng", price: 2000, image: "/images/tahu.png", category: "Lauk Pendamping" },

  // Tambahan
  { id: "a1", name: "Nasi Putih", price: 5000, image: "/images/nasi.png", category: "Tambahan" },
  { id: "a2", name: "Sayur Terong/Lodeh", price: 7000, image: "/images/lodeh.png", category: "Tambahan" },
  { id: "a3", name: "Kari", price: 8000, image: "/images/kari.png", category: "Tambahan" },
  { id: "a4", name: "Mangut Lele", price: 15000, image: "/images/mangut.png", category: "Tambahan" },
  { id: "a5", name: "Peyek Kacang", price: 3000, image: "/images/peyek.png", category: "Tambahan" },
  { id: "a6", name: "Kerupuk", price: 1000, image: "/images/krupuk.png", category: "Tambahan" },
  { id: "a7", name: "Kripik Tempe", price: 2000, image: "/images/kripiktempe.png", category: "Tambahan" },
  { id: "a8", name: "Kripik Pisang", price: 2000, image: "/images/pisang.png", category: "Tambahan" },
  { id: "a9", name: "Kripik Singkong", price: 2000, image: "/images/singkong.png", category: "Tambahan" },
  { id: "a10", name: "Sambal Pecel", price: 3000, image: "/images/sambelpecel.png", category: "Tambahan" },
];

const categories = ["Semua", "Makanan Utama", "Minuman", "Lauk Pendamping", "Tambahan"];

export default function DeliveryPage() {
  const [activeCategory, setActiveCategory] = useState("Semua");
  const [cart, setCart] = useState<CartItem[]>([]);
  const [paymentMethod, setPaymentMethod] = useState<"COD" | "QRIS">("COD");

  // Delivery State
  const [nama, setNama] = useState("");
  const [whatsapp, setWhatsapp] = useState("");
  const [alamat, setAlamat] = useState("");
  const [distance, setDistance] = useState<number>(1);

  const handleLocationSelect = (lat: number, lng: number) => {
    const dist = calculateDistance(RESTAURANT_LOC.lat, RESTAURANT_LOC.lng, lat, lng);
    setDistance(Number(dist.toFixed(1)));
  };

  const addToCart = (item: MenuItem) => {
    setCart((prev) => {
      const existing = prev.find((c) => c.id === item.id);
      if (existing) {
        return prev.map((c) => (c.id === item.id ? { ...c, quantity: c.quantity + 1 } : c));
      }
      return [...prev, { ...item, quantity: 1, note: "" }];
    });
  };

  const updateQuantity = (id: string, delta: number) => {
    setCart((prev) => {
      return prev.map((c) => {
        if (c.id === id) {
          const newQ = c.quantity + delta;
          return { ...c, quantity: newQ > 0 ? newQ : 0 };
        }
        return c;
      }).filter((c) => c.quantity > 0);
    });
  };

  const updateNote = (id: string, note: string) => {
    setCart((prev) => prev.map((c) => (c.id === id ? { ...c, note } : c)));
  };

  const subtotal = cart.reduce((acc, item) => acc + item.price * item.quantity, 0);
  const tax = subtotal * 0.1;
  const ongkir = distance <= 2 ? 0 : (distance - 2) * 3000;
  const grandTotal = subtotal + tax + ongkir;

  const handleCheckout = () => {
    if (cart.length === 0) {
      alert("Keranjang masih kosong!");
      return;
    }
    if (!nama.trim() || !whatsapp.trim() || !alamat.trim()) {
      alert("Mohon lengkapi Data Pengiriman (Nama, WA, Alamat)!");
      return;
    }

    
    const summary = cart.map(c => `- ${c.quantity}x ${c.name} (Catatan: ${c.note || '-'})`).join('\n');
    
    alert(`Pesanan Delivery berhasil dibuat!\n\nPemesan: ${nama}\nWA: ${whatsapp}\nAlamat: ${alamat} (${distance} KM)\n\nRincian:\n${summary}\n\nOngkir: Rp ${ongkir.toLocaleString('id-ID')}\nTotal Bayar: Rp ${grandTotal.toLocaleString('id-ID')}\nMetode: ${paymentMethod}`);
    
    // Reset after success
    setCart([]);
    setNama("");
    setWhatsapp("");
    setAlamat("");
    setDistance(1);
    setPaymentMethod("COD");
  };

  const filteredMenu = activeCategory === "Semua" ? menuItems : menuItems.filter(i => i.category === activeCategory);

  return (
    <div className="min-h-screen bg-[var(--color-cream)] pb-12">
      {/* Header */}
      <header className="bg-white shadow-sm px-6 py-4 flex justify-between items-center sticky top-0 z-50">
        <div>
          <Link href="/" className="font-serif font-bold text-2xl text-[var(--color-terracotta)] uppercase">
            Pringgondani Delivery
          </Link>
          <p className="text-xs text-[var(--color-grayish-brown)] mt-1">Layanan Pesan Antar</p>
        </div>
        <Link href="/" className="text-sm font-semibold text-[var(--color-dark-brown)] border-b-2 border-transparent hover:border-[var(--color-terracotta)] transition-colors pb-1">
          &larr; Kembali
        </Link>
      </header>

      {/* Main Layout */}
      <main className="max-w-[1400px] mx-auto p-4 sm:p-6 grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        
        {/* Left Col: Menu Browsing */}
        <div className="lg:col-span-8 flex flex-col gap-6">
          
          {/* Filters */}
          <div className="flex overflow-x-auto gap-2 pb-2 scrollbar-hide">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`whitespace-nowrap px-5 py-2 rounded-full font-sans font-semibold transition-colors ${
                  activeCategory === cat
                    ? "bg-[var(--color-dark-brown)] text-white shadow-md"
                    : "bg-white text-[var(--color-grayish-brown)] hover:bg-gray-100 border border-gray-200"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Menu Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
            {filteredMenu.map((item) => {
              const cartItem = cart.find(c => c.id === item.id);
              const qty = cartItem?.quantity || 0;

              return (
                <div key={item.id} className="bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow overflow-hidden flex flex-col border border-gray-100">
                  <div className="relative w-full h-32 bg-gray-50/50">
                    <Image 
                      src={item.image} 
                      alt={item.name} 
                      fill 
                      className={`${item.contain ? 'object-contain p-2' : 'object-cover'}`}
                      sizes="(max-width: 768px) 100vw, 33vw"
                    />
                  </div>
                  <div className="p-4 flex flex-col flex-grow">
                    <h3 className="font-serif font-bold text-[var(--color-dark-brown)] text-base">{item.name}</h3>
                    <p className="font-sans font-semibold text-[var(--color-terracotta)] text-sm mt-1">
                      Rp {item.price.toLocaleString("id-ID")}
                    </p>
                    
                    <div className="mt-auto pt-4">
                      {qty === 0 ? (
                        <button 
                          onClick={() => addToCart(item)}
                          className="w-full bg-[var(--color-terracotta)] text-white py-2 rounded-lg font-bold text-sm hover:bg-[var(--color-terracotta-dark)] transition-colors"
                        >
                          Tambah
                        </button>
                      ) : (
                        <div className="flex items-center justify-between bg-gray-50 rounded-lg p-1 border border-gray-200">
                          <button onClick={() => updateQuantity(item.id, -1)} className="w-8 h-8 flex items-center justify-center bg-white rounded shadow-sm text-gray-600 hover:bg-gray-100 font-bold">-</button>
                          <span className="font-bold text-[var(--color-dark-brown)]">{qty}</span>
                          <button onClick={() => updateQuantity(item.id, 1)} className="w-8 h-8 flex items-center justify-center bg-[var(--color-terracotta)] rounded shadow-sm text-white hover:bg-[var(--color-terracotta-dark)] font-bold">+</button>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Right Col: Sticky Cart & Form */}
        <div className="lg:col-span-4">
          <div className="bg-white rounded-2xl shadow-xl border border-gray-100 sticky top-24 overflow-hidden flex flex-col max-h-[calc(100vh-8rem)]">
            
            <div className="p-5 border-b border-gray-100 bg-gray-50/50">
              <h2 className="font-serif font-bold text-2xl text-[var(--color-dark-brown)]">Checkout</h2>
            </div>

            <div className="overflow-y-auto flex-grow flex flex-col">
              
              {/* Delivery Data Form */}
              <div className="p-5 border-b border-gray-100 bg-white">
                <h3 className="font-bold text-[var(--color-dark-brown)] text-sm mb-3">Data Pengiriman</h3>
                <div className="flex flex-col gap-3">
                  <input 
                    type="text" 
                    placeholder="Nama Lengkap" 
                    value={nama}
                    onChange={(e) => setNama(e.target.value)}
                    className="w-full border border-gray-200 rounded-md px-3 py-2 text-sm focus:outline-none focus:border-[var(--color-terracotta)] transition-colors"
                  />
                  <input 
                    type="tel" 
                    placeholder="Nomor HP / WhatsApp" 
                    value={whatsapp}
                    onChange={(e) => setWhatsapp(e.target.value)}
                    className="w-full border border-gray-200 rounded-md px-3 py-2 text-sm focus:outline-none focus:border-[var(--color-terracotta)] transition-colors"
                  />
                  <textarea 
                    placeholder="Alamat Lengkap" 
                    rows={2}
                    value={alamat}
                    onChange={(e) => setAlamat(e.target.value)}
                    className="w-full border border-gray-200 rounded-md px-3 py-2 text-sm focus:outline-none focus:border-[var(--color-terracotta)] transition-colors resize-none"
                  />
                  <div className="mt-2">
                    <h4 className="font-bold text-[var(--color-dark-brown)] text-sm mb-2">Pilih Titik Lokasi Pengiriman (Shopee Style)</h4>
                    <MapPicker onLocationSelect={handleLocationSelect} />
                    <div className="mt-2 text-sm text-[var(--color-terracotta)] font-bold">
                      Jarak Pengiriman: {distance} KM
                    </div>
                  </div>
                </div>
              </div>

              {/* Order List */}
              <div className="p-5 flex flex-col gap-4">
                <h3 className="font-bold text-[var(--color-dark-brown)] text-sm mb-1">Daftar Pesanan</h3>
                {cart.length === 0 ? (
                  <div className="text-center py-6 text-gray-400 border border-dashed border-gray-200 rounded-lg">
                    <p className="text-sm">Belum ada pesanan.</p>
                  </div>
                ) : (
                  cart.map((item) => (
                    <div key={item.id} className="flex flex-col gap-2 border-b border-gray-50 pb-4">
                      <div className="flex justify-between items-start">
                        <div>
                          <p className="font-bold text-[var(--color-dark-brown)] text-sm">{item.name}</p>
                          <p className="text-xs text-gray-500">Rp {item.price.toLocaleString("id-ID")} x {item.quantity}</p>
                        </div>
                        <p className="font-bold text-[var(--color-terracotta)] text-sm">
                          Rp {(item.price * item.quantity).toLocaleString("id-ID")}
                        </p>
                      </div>
                      <div className="flex items-center gap-2">
                        <div className="flex items-center bg-gray-100 rounded p-0.5 border border-gray-200 shrink-0">
                          <button onClick={() => updateQuantity(item.id, -1)} className="w-6 h-6 flex items-center justify-center bg-white rounded text-gray-600 font-bold text-xs shadow-sm">-</button>
                          <span className="w-6 text-center text-xs font-bold">{item.quantity}</span>
                          <button onClick={() => updateQuantity(item.id, 1)} className="w-6 h-6 flex items-center justify-center bg-[var(--color-terracotta)] rounded text-white font-bold text-xs shadow-sm">+</button>
                        </div>
                        <input 
                          type="text" 
                          placeholder="Catatan (opsional)..." 
                          value={item.note}
                          onChange={(e) => updateNote(item.id, e.target.value)}
                          className="text-xs w-full bg-gray-50 border border-gray-200 rounded px-2 py-1.5 focus:outline-none focus:border-[var(--color-terracotta)] transition-colors"
                        />
                      </div>
                    </div>
                  ))
                )}
              </div>

            </div>

            <div className="p-5 bg-gray-50 border-t border-gray-200 flex flex-col gap-4 shrink-0">
              
              {/* Summary */}
              <div className="flex flex-col gap-1 text-sm">
                <div className="flex justify-between text-gray-500">
                  <span>Subtotal</span>
                  <span>Rp {subtotal.toLocaleString("id-ID")}</span>
                </div>
                <div className="flex justify-between text-gray-500">
                  <span>PB1 (10%)</span>
                  <span>Rp {tax.toLocaleString("id-ID")}</span>
                </div>
                <div className="flex justify-between text-gray-500">
                  <span>Ongkos Kirim</span>
                  <span>Rp {ongkir.toLocaleString("id-ID")}</span>
                </div>
                <div className="flex justify-between font-bold text-[var(--color-dark-brown)] text-lg mt-2 pt-2 border-t border-gray-200">
                  <span>Total Payment</span>
                  <span className="text-[var(--color-terracotta)]">Rp {grandTotal.toLocaleString("id-ID")}</span>
                </div>
              </div>

              {/* Payment Method */}
              <div className="flex flex-col gap-2 mt-2">
                <p className="font-bold text-sm text-[var(--color-dark-brown)]">Metode Pembayaran</p>
                <div className="grid grid-cols-2 gap-2">
                  <label className={`cursor-pointer border rounded-lg text-center py-2 text-sm font-semibold transition-colors ${paymentMethod === 'COD' ? 'border-[var(--color-terracotta)] bg-red-50 text-[var(--color-terracotta)]' : 'border-gray-200 text-gray-500 hover:bg-gray-50'}`}>
                    <input type="radio" name="payment" className="hidden" checked={paymentMethod === 'COD'} onChange={() => setPaymentMethod('COD')} />
                    COD (Bayar di Tempat)
                  </label>
                  <label className={`cursor-pointer border rounded-lg text-center py-2 text-sm font-semibold transition-colors ${paymentMethod === 'QRIS' ? 'border-[var(--color-terracotta)] bg-red-50 text-[var(--color-terracotta)]' : 'border-gray-200 text-gray-500 hover:bg-gray-50'}`}>
                    <input type="radio" name="payment" className="hidden" checked={paymentMethod === 'QRIS'} onChange={() => setPaymentMethod('QRIS')} />
                    QRIS
                  </label>
                </div>
              </div>

              {/* Dynamic Payment UI */}
              <div className="mt-2 text-sm text-center bg-white rounded-lg p-3 border border-gray-200">
                {paymentMethod === 'COD' ? (
                  <p className="text-gray-600">Siapkan uang tunai sesuai total pesanan saat kurir tiba.</p>
                ) : (
                  <div className="flex flex-col items-center gap-2">
                    <p className="text-gray-600 font-semibold mb-1">Scan QRIS ini untuk membayar</p>
                    <Image src="/images/qris.jpeg" alt="QRIS" width={150} height={150} className="rounded-lg shadow-sm" />
                  </div>
                )}
              </div>

              <button 
                onClick={handleCheckout}
                disabled={cart.length === 0}
                className="w-full bg-[var(--color-terracotta)] text-white font-bold text-lg py-4 rounded-xl hover:bg-[var(--color-terracotta-dark)] transition-colors shadow-lg disabled:opacity-50 disabled:cursor-not-allowed mt-2"
              >
                Pesan & Antar Sekarang
              </button>
            </div>

          </div>
        </div>

      </main>
    </div>
  );
}
