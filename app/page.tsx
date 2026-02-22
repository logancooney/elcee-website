import Image from "next/image";
import Link from "next/link";
import { FeaturedRelease, MediaGrid } from "./components/MediaEmbeds";
import Achievements from "./components/Achievements";

export default function Home() {
  return (
    <div className="min-h-screen bg-black text-white">
      {/* Navigation */}
      <nav className="fixed top-0 w-full bg-black/90 backdrop-blur-sm z-50 border-b border-white/10">
        <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
          <Image 
            src="/logos/eta-logo-white.png" 
            alt="Elcee the Alchemist" 
            width={360} 
            height={120}
            className="h-24 w-auto"
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
                className="bg-white text-black px-10 py-4 font-bold rounded-full hover:bg-gray-200 transition-all duration-300"
                target="_blank"
                rel="noopener noreferrer"
              >
                Listen Now
              </a>
              <Link 
                href="/studio" 
                className="border-2 border-white px-10 py-4 font-bold rounded-full hover:bg-white hover:text-black transition-all duration-300"
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
              Elcee the Alchemist is redefining UK Alternative Rap. Winner of the JBL Martin Garrix Music Academy 
              and named an adidas Rising Star, he's recorded at Abbey Road Studios and hit 100K views on his 
              debut Boiler Room performance in just one week.
            </p>
            <p className="text-lg leading-relaxed mb-6">
              Rooted in London's Grime scene, he moved to Manchester to study Electronic Music Production, 
              where he's been shaping the next-gen sound of the North ever since. Operating completely solo — 
              no team, no label, just pure vision.
            </p>
            <p className="text-lg leading-relaxed">
              Elcee weaves raw energy with deep introspection, alchemizing sound into a force for 
              empowerment and transcendence.
            </p>
          </div>
        </div>
      </section>

      {/* Achievements */}
      <Achievements />

      {/* OPTION A: Featured Release (Vertical) - Currently disabled */}
      {/* <FeaturedRelease /> */}

      {/* OPTION B: Media Grid (Side-by-Side) - Currently active */}
      <MediaGrid />

      {/* All Platforms Links */}
      <section className="py-12 px-6 bg-white text-black">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl font-bold mb-8">All Platforms</h2>
          <div className="flex justify-center gap-8 flex-wrap text-lg">
            <a href="https://open.spotify.com/artist/6E8xwOloHnzGWVlNV9K8n7" className="hover:underline transition-colors" target="_blank" rel="noopener noreferrer">Spotify</a>
            <a href="https://music.apple.com/gb/artist/elcee-the-alchemist/1479992060" className="hover:underline transition-colors" target="_blank" rel="noopener noreferrer">Apple Music</a>
            <a href="https://youtube.com/@elceethealchemist" className="hover:underline transition-colors" target="_blank" rel="noopener noreferrer">YouTube</a>
            <a href="https://soundcloud.com/elceethealchemist" className="hover:underline transition-colors" target="_blank" rel="noopener noreferrer">SoundCloud</a>
            <a href="https://elceethealchemist.bandcamp.com" className="hover:underline transition-colors" target="_blank" rel="noopener noreferrer">Bandcamp</a>
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

      {/* Footer */}
      <footer className="py-16 px-6 border-t border-white/10">
        <div className="max-w-7xl mx-auto text-center">
          <Image 
            src="/logos/ankh-white.png" 
            alt="Ankh" 
            width={50} 
            height={50}
            className="mx-auto mb-6"
          />
          <p className="text-sm text-gray-500">© 2026 Elcee the Alchemist. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}
