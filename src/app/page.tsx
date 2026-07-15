import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <>
      <nav className="relative top-0 w-full py-6 px-6 lg:px-12 flex justify-between items-center z-50">
        <Link href="/" className="font-serif font-bold text-2xl lg:text-3xl text-[var(--color-terracotta)] uppercase tracking-wide">
          Pringgondani
        </Link>
        
        <div className="hidden md:flex items-center gap-8 text-base">
          <Link href="#" className="transition-colors hover:text-[var(--color-terracotta)]">Beranda</Link>
          <Link href="#" className="transition-colors hover:text-[var(--color-terracotta)]">Menu</Link>
          <Link href="#" className="transition-colors hover:text-[var(--color-terracotta)]">Sejarah</Link>
          <Link href="#" className="transition-colors hover:text-[var(--color-terracotta)]">Lokasi</Link>
        </div>
      </nav>

      <section className="py-12 px-6 lg:py-16 lg:px-12 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          
          {/* Left Column */}
          <div className="flex flex-col justify-center">
            <h1 className="font-serif font-bold text-4xl sm:text-5xl lg:text-6xl text-[var(--color-dark-brown)] uppercase leading-tight whitespace-pre-line">
              Soto Ayam{"\n"}Pringgondani
            </h1>
            
            <p className="mt-6 text-lg text-[var(--color-grayish-brown)] max-w-lg leading-relaxed">
              Kelezatan autentik masakan Jawa yang diwariskan turun-temurun, diracik dengan cinta dan rempah pilihan dari tanah Jawa.
            </p>
            
            <div className="mt-8">
              <button className="bg-[var(--color-terracotta)] text-white font-bold px-8 py-3 rounded-full hover:bg-[var(--color-terracotta-dark)] transition-colors shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 duration-200">
                Pesan Sekarang
              </button>
            </div>
          </div>

          {/* Right Column */}
          <div className="relative w-full animate-float lg:ml-8 flex justify-end">
            <div className="rounded-3xl overflow-hidden shadow-[0_20px_50px_rgba(0,0,0,0.15)] flex">
              <Image 
                src="/images/home.png" 
                alt="Soto Ayam Pringgondani" 
                width={800}
                height={533}
                priority
                className="w-full h-auto object-contain"
              />
            </div>
          </div>

        </div>
      </section>
      <section className="bg-[#F8EFE5] py-16 lg:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          {/* Header */}
          <div className="text-center">
            <h2 className="font-serif font-bold text-[var(--color-dark-brown)] text-4xl">
              Menu Andalan
            </h2>
            <p className="font-sans text-[var(--color-grayish-brown)] text-base lg:text-lg mt-4 max-w-2xl mx-auto">
              Hidangan terbaik kami yang telah menjadi favorit pelanggan selama puluhan tahun
            </p>
          </div>

          {/* Menu Grid */}
          <div className="mt-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
            
            {/* Card 1 */}
            <div className="bg-white rounded-2xl shadow-md hover:shadow-lg transition-shadow">
              <div className="relative w-full h-48 sm:h-56">
                <Image 
                  src="/images/soto.png" 
                  alt="Soto Ayam" 
                  fill 
                  className="object-cover rounded-t-2xl" 
                  sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 25vw" 
                />
              </div>
              <div className="p-6">
                <h3 className="font-serif font-bold text-[var(--color-dark-brown)] text-xl mb-2">Soto Ayam</h3>
                <p className="font-sans text-[var(--color-grayish-brown)] text-sm leading-relaxed">Kuah kaldu kuning gurih dengan suwiran ayam kampung asli</p>
              </div>
            </div>

            {/* Card 2 */}
            <div className="bg-white rounded-2xl shadow-md hover:shadow-lg transition-shadow">
              <div className="relative w-full h-48 sm:h-56">
                <Image 
                  src="/images/rawon.png" 
                  alt="Rawon" 
                  fill 
                  className="object-cover rounded-t-2xl" 
                  sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 25vw" 
                />
              </div>
              <div className="p-6">
                <h3 className="font-serif font-bold text-[var(--color-dark-brown)] text-xl mb-2">Rawon</h3>
                <p className="font-sans text-[var(--color-grayish-brown)] text-sm leading-relaxed">Kaya rempah kluwek hitam dengan potongan daging sapi empuk</p>
              </div>
            </div>

            {/* Card 3 */}
            <div className="bg-white rounded-2xl shadow-md hover:shadow-lg transition-shadow">
              <div className="relative w-full h-48 sm:h-56">
                <Image 
                  src="/images/pecel.png" 
                  alt="Pecel Madiun" 
                  fill 
                  className="object-cover rounded-t-2xl" 
                  sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 25vw" 
                />
              </div>
              <div className="p-6">
                <h3 className="font-serif font-bold text-[var(--color-dark-brown)] text-xl mb-2">Pecel Madiun</h3>
                <p className="font-sans text-[var(--color-grayish-brown)] text-sm leading-relaxed">Sayuran segar dengan siraman bumbu kacang khas yang medok</p>
              </div>
            </div>

            {/* Card 4 */}
            <div className="bg-white rounded-2xl shadow-md hover:shadow-lg transition-shadow">
              <div className="relative w-full h-48 sm:h-56">
                <Image 
                  src="/images/campur.png" 
                  alt="Nasi Campur" 
                  fill 
                  className="object-cover rounded-t-2xl" 
                  sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 25vw" 
                />
              </div>
              <div className="p-6">
                <h3 className="font-serif font-bold text-[var(--color-dark-brown)] text-xl mb-2">Nasi Campur</h3>
                <p className="font-sans text-[var(--color-grayish-brown)] text-sm leading-relaxed">Perpaduan lauk pauk nusantara lengkap dalam satu piring</p>
              </div>
            </div>

          </div>

          {/* Bottom CTA Button */}
          <div className="mt-12 flex justify-center">
            <button className="bg-[var(--color-terracotta)] text-white font-sans font-bold px-8 py-3 rounded-full hover:bg-[var(--color-terracotta-dark)] transition-colors shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 duration-200">
              Lihat Semua Menu
            </button>
          </div>
          
        </div>
      </section>
      <section className="bg-[var(--color-cream)] py-20 lg:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="relative flex flex-col lg:flex-row items-center">
            
            {/* Image (Left Side) */}
            <div className="relative w-full lg:w-2/3 min-h-[400px] lg:min-h-[500px] rounded-3xl overflow-hidden shadow-xl">
              <Image 
                src="/images/warung.png" 
                alt="Suasana Warung Pringgondani" 
                fill 
                className="object-cover" 
                sizes="(max-width: 1024px) 100vw, 66vw" 
              />
            </div>
            
            {/* Text Card (Right Side Overlap) */}
            <div className="relative lg:absolute lg:right-0 lg:top-1/2 lg:-translate-y-1/2 w-full lg:w-auto -mt-12 lg:mt-0 z-10 flex justify-center lg:block px-4 lg:px-0">
              <div className="bg-white/95 backdrop-blur-sm rounded-3xl shadow-2xl p-8 sm:p-10 lg:p-12 max-w-lg">
                <h2 className="font-serif font-bold text-[var(--color-dark-brown)] text-3xl lg:text-4xl leading-tight">
                  Resep Warisan Keluarga, Berdiri Sejak 1980
                </h2>
                <p className="font-sans text-[var(--color-grayish-brown)] text-base lg:text-lg leading-relaxed mt-6">
                  Selama lebih dari empat dekade, kami menjaga cita rasa otentik Jawa yang diwariskan dari generasi ke generasi. Setiap mangkuk soto yang tersaji membawa kehangatan tradisi dan dedikasi kami dalam memilih rempah-rempah terbaik dari tanah Jawa.
                </p>
              </div>
            </div>

          </div>

        </div>
      </section>
    </>
  );
}
