import Image from "next/image";
import Link from "next/link";

const menuData = {
  utama: [
    { name: "Soto Ayam", image: "/images/soto.png", desc: "Kuah kaldu kuning gurih dengan suwiran ayam kampung asli." },
    { name: "Rawon", image: "/images/rawon.png", desc: "Kaya rempah kluwek hitam dengan potongan daging sapi empuk." },
    { name: "Pecel Madiun", image: "/images/pecel.png", desc: "Sayuran segar dengan siraman bumbu kacang khas medok." },
    { name: "Nasi Campur", image: "/images/campur.png", desc: "Perpaduan lauk pauk nusantara lengkap dalam satu piring." },
  ],
  minuman: [
    { name: "Es Teh / Teh Panas", image: "/images/esteh.png", desc: "Teh melati pilihan segar.", contain: true },
    { name: "Es Jeruk", image: "/images/esjeruk.png", desc: "Perasan jeruk manis segar kaya vitamin C.", contain: true },
    { name: "Kopi Hitam", image: "/images/hitam.png", desc: "Kopi tubruk hitam pekat beraroma khas.", contain: true },
    { name: "Kopi Susu", image: "/images/susu.png", desc: "Perpaduan kopi dan susu kental manis.", contain: true },
    { name: "Lemon Tea", image: "/images/lemontea.png", desc: "Teh segar dengan irisan lemon asli.", contain: true },
    { name: "Air Mineral", image: "/images/mineral.png", desc: "Air mineral botol segar.", contain: true },
    { name: "Sprite", image: "/images/sprite.png", desc: "Minuman soda rasa lemon-lime yang menyegarkan.", contain: true },
    { name: "Coca Cola", image: "/images/cola.png", desc: "Minuman soda cola klasik penawar dahaga.", contain: true },
    { name: "Fanta", image: "/images/fanta.png", desc: "Minuman soda rasa stroberi ceria.", contain: true },
    { name: "Floridina", image: "/images/floridina.png", desc: "Minuman rasa jeruk dengan bulir utuh.", contain: true },
    { name: "Teh Pucuk", image: "/images/pucuk.png", desc: "Teh melati dalam kemasan praktis.", contain: true },
  ],
  pendamping: [
    { name: "Sate Ati Ampela", image: "/images/ati.png", desc: "Sate ati ampela bumbu kuning yang meresap." },
    { name: "Sate Telur Puyuh", image: "/images/puyuh.png", desc: "Sate telur puyuh kecap gurih manis." },
    { name: "Sate Usus", image: "/images/usus.png", desc: "Sate usus ayam bumbu gurih yang renyah." },
    { name: "Ayam Goreng", image: "/images/ayamgoreng.png", desc: "Ayam goreng bumbu lengkuas gurih dan empuk." },
    { name: "Telur Dadar", image: "/images/dadar.png", desc: "Telur dadar tebal khas rumahan." },
    { name: "Telur Asin", image: "/images/telurasin.png", desc: "Telur bebek asin masir gurih sempurna.", contain: true },
    { name: "Telur Rebus", image: "/images/telurrebus.png", desc: "Telur rebus matang sempurna kaya protein." },
    { name: "Bakwan Jagung", image: "/images/bakwan.png", desc: "Bakwan jagung manis renyah di luar lembut di dalam." },
    { name: "Tempe Goreng", image: "/images/tempegoreng.png", desc: "Tempe goreng bumbu ketumbar gurih." },
    { name: "Tahu Goreng", image: "/images/tahu.png", desc: "Tahu goreng dengan tekstur lembut." },
  ],
  tambahan: [
    { name: "Nasi Putih", image: "/images/nasi.png", desc: "Nasi putih hangat pulen porsi pas." },
    { name: "Sayur Terong/Lodeh", image: "/images/lodeh.png", desc: "Sayur lodeh kuah santan gurih sedap." },
    { name: "Kari", image: "/images/kari.png", desc: "Kuah kari kental kaya rempah pilihan." },
    { name: "Mangut Lele", image: "/images/mangut.png", desc: "Lele asap masak mangut kuah santan pedas." },
    { name: "Peyek Kacang", image: "/images/peyek.png", desc: "Peyek renyah bertabur kacang tanah." },
    { name: "Kerupuk", image: "/images/krupuk.png", desc: "Kerupuk kaleng renyah pelengkap santapan." },
    { name: "Kripik Tempe", image: "/images/kripiktempe.png", desc: "Kripik tempe renyah bumbu gurih ketumbar." },
    { name: "Kripik Pisang", image: "/images/pisang.png", desc: "Kripik pisang gurih renyah teman ngemil." },
    { name: "Kripik Singkong", image: "/images/singkong.png", desc: "Kripik singkong gurih ekstra renyah." },
    { name: "Sambal Pecel", image: "/images/sambelpecel.png", desc: "Bumbu pecel kacang medok pedas manis." },
  ]
};

function MenuCard({ item }: { item: { name: string, image: string, desc: string, contain?: boolean } }) {
  return (
    <div className="bg-white rounded-2xl shadow-md hover:shadow-xl transition-shadow flex flex-col overflow-hidden h-full">
      <div className="relative w-full h-48">
        <Image 
          src={item.image} 
          alt={item.name} 
          fill 
          className={`${item.contain ? 'object-contain p-4' : 'object-cover'} rounded-t-2xl`} 
          sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 25vw" 
        />
      </div>
      <div className="p-5 flex flex-col flex-grow">
        <h3 className="font-serif font-bold text-[var(--color-dark-brown)] text-lg mb-2">{item.name}</h3>
        <p className="font-sans text-[var(--color-grayish-brown)] text-sm line-clamp-2 flex-grow">{item.desc}</p>
        <button className="mt-4 w-full bg-[var(--color-terracotta)] text-white rounded-full py-2 font-bold hover:bg-[var(--color-terracotta-dark)] transition-colors shadow-sm hover:shadow">
          + Keranjang
        </button>
      </div>
    </div>
  );
}

export default function MenuPage() {
  return (
    <div className="min-h-screen bg-[var(--color-cream)] pt-8 pb-24">
      {/* Navbar (Minimal for inner page) */}
      <nav className="w-full px-6 lg:px-12 flex justify-between items-center mb-12 max-w-7xl mx-auto">
        <Link href="/" className="font-serif font-bold text-2xl lg:text-3xl text-[var(--color-terracotta)] uppercase tracking-wide">
          Pringgondani
        </Link>
        <Link href="/" className="font-sans text-[var(--color-dark-brown)] font-semibold border-b-2 border-transparent hover:border-[var(--color-terracotta)] hover:text-[var(--color-terracotta)] transition-colors pb-1">
          &larr; Kembali
        </Link>
      </nav>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Page Header */}
        <div className="text-center mb-16">
          <h1 className="font-serif text-4xl text-[var(--color-dark-brown)] font-bold">
            Menu Lengkap
          </h1>
          <p className="font-sans text-[var(--color-grayish-brown)] mt-4 text-base lg:text-lg">
            Pilih hidangan favorit Anda dari resep warisan kami.
          </p>
        </div>

        {/* Makanan Utama */}
        <section>
          <h2 className="font-serif text-3xl text-[var(--color-dark-brown)] font-bold border-b border-[#E5D3B3] pb-2 mb-8 mt-16">
            Makanan Utama
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {menuData.utama.map((item, idx) => (
              <MenuCard key={idx} item={item} />
            ))}
          </div>
        </section>

        {/* Minuman */}
        <section>
          <h2 className="font-serif text-3xl text-[var(--color-dark-brown)] font-bold border-b border-[#E5D3B3] pb-2 mb-8 mt-16">
            Minuman
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {menuData.minuman.map((item, idx) => (
              <MenuCard key={idx} item={item} />
            ))}
          </div>
        </section>

        {/* Lauk Pendamping */}
        <section>
          <h2 className="font-serif text-3xl text-[var(--color-dark-brown)] font-bold border-b border-[#E5D3B3] pb-2 mb-8 mt-16">
            Lauk Pendamping
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {menuData.pendamping.map((item, idx) => (
              <MenuCard key={idx} item={item} />
            ))}
          </div>
        </section>

        {/* Tambahan */}
        <section>
          <h2 className="font-serif text-3xl text-[var(--color-dark-brown)] font-bold border-b border-[#E5D3B3] pb-2 mb-8 mt-16">
            Tambahan
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {menuData.tambahan.map((item, idx) => (
              <MenuCard key={idx} item={item} />
            ))}
          </div>
        </section>

      </div>
    </div>
  );
}
