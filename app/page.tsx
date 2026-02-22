import Image from "next/image";
import Link from "next/link";
import Signature from "./components/Signature";

export default function Home() {
  return (
    <div className="min-h-screen bg-black text-white">
      {/* Navigation */}
      <nav className="fixed top-0 w-full bg-black/90 backdrop-blur-sm z-50 border-b border-white/10">
        <div className="max-w-7xl mx-auto px-6 py-6 flex justify-between items-center">
          <Image 
            src="/logos/eta-logo-white.png" 
            alt="Elcee the Alchemist" 
            width={240} 
            height={80}
            className="h-16 w-auto"
          />
          <div className="flex gap-8 text-sm font-medium">
            <Link href="/" className="hover:text-gray-400 transition">Home</Link>
            <Link href="/studio" className="hover:text-gray-400 transition">Studio</Link>
            <Link href="/shop" className="hover:text-gray-400 transition">Shop</Link>
            <Link href="/contact" className="hover:text-gray-400 transition">Contact</Link>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="pt-32 pb-20 px-6">
        <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-12 items-center">
          <div className="order-2 md:order-1">
            <h1 className="text-5xl md:text-7xl font-bold mb-6 leading-tight">
              ELCEE THE ALCHEMIST
            </h1>
            <p className="text-xl text-gray-400 mb-8 leading-relaxed">
              Alternative rap artist from Manchester pushing boundaries with raw lyricism and alchemical soundscapes.
            </p>
            <div className="flex gap-4">
              <a 
                href="https://open.spotify.com/artist/6E8xwOloHnzGWVlNV9K8n7" 
                className="bg-white text-black px-8 py-3 font-semibold hover:bg-gray-200 transition"
                target="_blank"
                rel="noopener noreferrer"
              >
                Listen Now
              </a>
              <Link 
                href="/studio" 
                className="border border-white px-8 py-3 font-semibold hover:bg-white hover:text-black transition"
              >
                Book Studio
              </Link>
            </div>
          </div>
          <div className="order-1 md:order-2">
            <Image 
              src="/photos/press-shot-bw.jpg" 
              alt="Elcee the Alchemist" 
              width={600} 
              height={800}
              className="w-full h-auto grayscale"
              priority
            />
          </div>
        </div>
      </section>

      {/* Bio Section */}
      <section className="py-20 px-6 bg-white text-black">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-4xl font-bold mb-8">About</h2>
          <div className="prose prose-lg max-w-none">
            <p className="text-lg leading-relaxed mb-6">
              Six years deep in the game, Elcee the Alchemist is Manchester's independent alternative rap force. 
              Operating completely solo — no team, no label, just pure vision.
            </p>
            <p className="text-lg leading-relaxed mb-6">
              From the studio to the stage, Elcee crafts every element of the experience. 
              A recording engineer, producer, and performer who doesn't just make music — transforms it.
            </p>
            <p className="text-lg leading-relaxed">
              2026: Minimum 2 tracks per month. EPs. Evolution. The alchemy continues.
            </p>
          </div>
        </div>
      </section>

      {/* Music Links */}
      <section className="py-20 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl font-bold mb-12">Listen</h2>
          <div className="grid md:grid-cols-3 gap-6">
            <a 
              href="https://open.spotify.com/artist/6E8xwOloHnzGWVlNV9K8n7" 
              className="border border-white p-8 hover:bg-white hover:text-black transition"
              target="_blank"
              rel="noopener noreferrer"
            >
              <h3 className="text-2xl font-bold mb-2">Spotify</h3>
              <p className="text-sm text-gray-400">Stream now</p>
            </a>
            <a 
              href="https://music.apple.com/gb/artist/elcee-the-alchemist/1479992060" 
              className="border border-white p-8 hover:bg-white hover:text-black transition"
              target="_blank"
              rel="noopener noreferrer"
            >
              <h3 className="text-2xl font-bold mb-2">Apple Music</h3>
              <p className="text-sm text-gray-400">Stream now</p>
            </a>
            <a 
              href="https://youtube.com/@elceethealchemist" 
              className="border border-white p-8 hover:bg-white hover:text-black transition"
              target="_blank"
              rel="noopener noreferrer"
            >
              <h3 className="text-2xl font-bold mb-2">YouTube</h3>
              <p className="text-sm text-gray-400">Watch now</p>
            </a>
            <a 
              href="https://soundcloud.com/elceethealchemist" 
              className="border border-white p-8 hover:bg-white hover:text-black transition"
              target="_blank"
              rel="noopener noreferrer"
            >
              <h3 className="text-2xl font-bold mb-2">SoundCloud</h3>
              <p className="text-sm text-gray-400">Stream now</p>
            </a>
            <a 
              href="https://elceethealchemist.bandcamp.com" 
              className="border border-white p-8 hover:bg-white hover:text-black transition"
              target="_blank"
              rel="noopener noreferrer"
            >
              <h3 className="text-2xl font-bold mb-2">Bandcamp</h3>
              <p className="text-sm text-gray-400">Support directly</p>
            </a>
          </div>
        </div>
      </section>

      {/* Social Links */}
      <section className="py-20 px-6 bg-white text-black">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl font-bold mb-12">Connect</h2>
          <div className="flex justify-center gap-8 flex-wrap">
            <a href="https://instagram.com/elceethealchemist" className="text-lg hover:underline" target="_blank" rel="noopener noreferrer">Instagram</a>
            <a href="https://tiktok.com/@elceethealchemist" className="text-lg hover:underline" target="_blank" rel="noopener noreferrer">TikTok</a>
            <a href="https://twitter.com/elceejpg" className="text-lg hover:underline" target="_blank" rel="noopener noreferrer">Twitter</a>
            <a href="https://youtube.com/@elceethealchemist" className="text-lg hover:underline" target="_blank" rel="noopener noreferrer">YouTube</a>
            <a href="https://facebook.com/elceethealchemist" className="text-lg hover:underline" target="_blank" rel="noopener noreferrer">Facebook</a>
          </div>
        </div>
      </section>

      {/* Signature Section */}
      <section className="py-20 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <Signature className="w-full max-w-md mx-auto text-white opacity-80" />
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
            className="opacity-40 mx-auto mb-6"
          />
          <p className="text-sm text-gray-500">© 2026 Elcee the Alchemist. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}
