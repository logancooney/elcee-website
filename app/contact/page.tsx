import Image from "next/image";
import Link from "next/link";

export default function ContactPage() {
  return (
    <div className="min-h-screen bg-black text-white">
      {/* Navigation */}
      <nav className="fixed top-0 w-full bg-black/90 backdrop-blur-sm z-50 border-b border-white/10">
        <div className="max-w-7xl mx-auto px-6 py-6 flex justify-between items-center">
          <Link href="/">
            <Image 
              src="/logos/eta-logo-white.png" 
              alt="Elcee the Alchemist" 
              width={240} 
              height={80}
              className="h-16 w-auto"
            />
          </Link>
          <div className="flex gap-8 text-sm font-medium">
            <Link href="/" className="hover:text-gray-400 transition">Home</Link>
            <Link href="/studio" className="hover:text-gray-400 transition">Studio</Link>
            <Link href="/shop" className="hover:text-gray-400 transition">Shop</Link>
            <Link href="/contact" className="hover:text-gray-400 transition">Contact</Link>
          </div>
        </div>
      </nav>

      {/* Hero */}
      <section className="pt-32 pb-12 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-5xl md:text-7xl font-bold mb-6">GET IN TOUCH</h1>
          <p className="text-xl text-gray-400">
            For bookings, collaborations, or general enquiries.
          </p>
        </div>
      </section>

      {/* Contact Options */}
      <section className="py-20 px-6">
        <div className="max-w-6xl mx-auto grid md:grid-cols-3 gap-12">
          {/* Studio Bookings */}
          <div className="text-center">
            <div className="w-20 h-20 bg-white rounded-full flex items-center justify-center mx-auto mb-6">
              <span className="text-4xl">🎙️</span>
            </div>
            <h2 className="text-2xl font-bold mb-4">Studio Bookings</h2>
            <p className="text-gray-400 mb-6">
              Book recording, mixing, mastering, or production sessions.
            </p>
            <Link 
              href="/studio" 
              className="inline-block bg-white text-black px-6 py-3 font-semibold hover:bg-gray-200 transition"
            >
              Book Now
            </Link>
          </div>

          {/* Email */}
          <div className="text-center">
            <div className="w-20 h-20 bg-white rounded-full flex items-center justify-center mx-auto mb-6">
              <span className="text-4xl">📧</span>
            </div>
            <h2 className="text-2xl font-bold mb-4">Email</h2>
            <p className="text-gray-400 mb-6">
              General enquiries, collaborations, business.
            </p>
            <a 
              href="mailto:elcee.mgmt@gmail.com" 
              className="inline-block border border-white px-6 py-3 font-semibold hover:bg-white hover:text-black transition"
            >
              Send Email
            </a>
          </div>

          {/* Social */}
          <div className="text-center">
            <div className="w-20 h-20 bg-white rounded-full flex items-center justify-center mx-auto mb-6">
              <span className="text-4xl">💬</span>
            </div>
            <h2 className="text-2xl font-bold mb-4">Social Media</h2>
            <p className="text-gray-400 mb-6">
              DM for quick questions or just to connect.
            </p>
            <div className="flex flex-col gap-2 items-center">
              <a href="https://instagram.com/elceethealchemist" className="hover:underline" target="_blank" rel="noopener noreferrer">Instagram</a>
              <a href="https://twitter.com/elceejpg" className="hover:underline" target="_blank" rel="noopener noreferrer">Twitter</a>
              <a href="https://tiktok.com/@elceethealchemist" className="hover:underline" target="_blank" rel="noopener noreferrer">TikTok</a>
            </div>
          </div>
        </div>
      </section>

      {/* Location */}
      <section className="py-20 px-6 bg-white text-black">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl font-bold mb-6">Location</h2>
          <p className="text-xl mb-4">Manchester, England</p>
          <p className="text-gray-600">
            Studio sessions available in Manchester. Remote mixing and mastering available worldwide.
          </p>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-16 px-6 border-t border-white/10">
        <div className="max-w-7xl mx-auto text-center">
          <Image 
            src="/logos/ankh.png" 
            alt="Ankh" 
            width={50} 
            height={50}
            className="opacity-40 mx-auto mb-6 invert"
          />
          <p className="text-sm text-gray-500">© 2026 Elcee the Alchemist. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}
