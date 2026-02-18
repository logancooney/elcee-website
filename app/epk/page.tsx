import Image from "next/image";
import Link from "next/link";

export const metadata = {
  title: "EPK - Electronic Press Kit | Elcee the Alchemist",
  description: "Electronic Press Kit for Elcee the Alchemist - Manchester alternative rap artist. Press photos, bio, music, and booking information.",
};

export default function EPKPage() {
  return (
    <div className="min-h-screen bg-white text-black">
      {/* Navigation */}
      <nav className="fixed top-0 w-full bg-white/90 backdrop-blur-sm z-50 border-b border-black/10">
        <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
          <Link href="/">
            <Image 
              src="/logos/eta-logo-black.png" 
              alt="Elcee the Alchemist" 
              width={120} 
              height={40}
              className="h-10 w-auto"
            />
          </Link>
          <div className="flex gap-8 text-sm font-medium">
            <Link href="/" className="hover:text-gray-600 transition">Home</Link>
            <Link href="/studio" className="hover:text-gray-600 transition">Studio</Link>
            <Link href="/shop" className="hover:text-gray-600 transition">Shop</Link>
            <Link href="/contact" className="hover:text-gray-600 transition">Contact</Link>
          </div>
        </div>
      </nav>

      {/* Header */}
      <section className="pt-32 pb-12 px-6 bg-black text-white">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-5xl md:text-6xl font-bold mb-4">Electronic Press Kit</h1>
          <p className="text-xl text-gray-400">Elcee the Alchemist</p>
        </div>
      </section>

      {/* Quick Facts */}
      <section className="py-12 px-6 border-b border-black/10">
        <div className="max-w-4xl mx-auto">
          <div className="grid md:grid-cols-3 gap-8 text-center">
            <div>
              <h3 className="font-bold mb-2">Genre</h3>
              <p className="text-gray-600">Alternative Rap</p>
            </div>
            <div>
              <h3 className="font-bold mb-2">Location</h3>
              <p className="text-gray-600">Manchester, England</p>
            </div>
            <div>
              <h3 className="font-bold mb-2">Experience</h3>
              <p className="text-gray-600">6 Years</p>
            </div>
          </div>
        </div>
      </section>

      {/* Bio */}
      <section className="py-16 px-6">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-4xl font-bold mb-8">Biography</h2>
          
          <div className="space-y-6 text-lg leading-relaxed">
            <p>
              <strong>Elcee the Alchemist</strong> is an independent alternative rap artist from Manchester, England, 
              who has spent six years carving out a unique space in the UK music scene. Operating completely solo — 
              without a team, manager, or label — Elcee embodies the DIY spirit, controlling every aspect of his 
              artistic vision from production to performance.
            </p>
            
            <p>
              As both a skilled recording engineer and producer, Elcee not only creates his own music but also runs 
              a professional recording studio, working with artists across Manchester and beyond. This dual role gives 
              him a deep understanding of both the creative and technical sides of music production, reflected in the 
              polished, experimental soundscapes that define his work.
            </p>
            
            <p>
              His music blends raw, introspective lyricism with alchemical production — transforming pain, ambition, 
              and social commentary into tracks that push the boundaries of alternative rap. Influenced by both UK 
              underground culture and global hip-hop, Elcee's sound is distinctly his own: gritty, atmospheric, and 
              unapologetically authentic.
            </p>
            
            <p>
              In 2026, Elcee is committing to an aggressive release schedule: a minimum of 2 tracks per month, 
              alongside multiple EPs. This relentless output is part of his evolution as an artist — building 
              momentum, expanding his reach, and cementing his place in the alternative rap landscape.
            </p>
            
            <p>
              Beyond the music, Elcee is also an educator, teaching music production and songwriting to the next 
              generation of Manchester talent. His mission is clear: create transformative music, support other 
              artists, and prove that independence doesn't mean compromise — it means control.
            </p>
          </div>

          <div className="mt-12 p-8 bg-black text-white">
            <h3 className="text-2xl font-bold mb-4">Short Bio (100 words)</h3>
            <p className="leading-relaxed">
              Elcee the Alchemist is a Manchester-based alternative rap artist with six years of independent 
              experience. Operating solo without a team or label, he creates raw, introspective music that pushes 
              genre boundaries. As a recording engineer, producer, and performer, Elcee controls every aspect of 
              his craft. In 2026, he's releasing a minimum of 2 tracks per month, building momentum across streaming 
              platforms and live performances. He also teaches music production in Manchester, helping develop the 
              next generation of artists while cementing his place in the UK alternative rap scene.
            </p>
          </div>
        </div>
      </section>

      {/* Press Photos */}
      <section className="py-16 px-6 bg-gray-50">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl font-bold mb-8">Press Photos</h2>
          <p className="text-gray-600 mb-8">High-resolution images available for press and promotional use.</p>
          
          <div className="grid md:grid-cols-2 gap-6">
            <div className="border border-black/10 p-4 bg-white">
              <Image 
                src="/photos/press-shot-bw.jpg" 
                alt="Elcee the Alchemist - Press Photo 1" 
                width={600} 
                height={800}
                className="w-full h-auto mb-4"
              />
              <a 
                href="/photos/press-shot-bw.jpg" 
                download 
                className="inline-block bg-black text-white px-6 py-2 text-sm font-medium hover:bg-gray-800 transition"
              >
                Download High-Res
              </a>
            </div>
            
            {/* Placeholder for more photos */}
            <div className="border border-black/10 p-4 bg-white flex items-center justify-center min-h-[400px]">
              <p className="text-gray-400 text-center">Additional press photos<br/>coming soon</p>
            </div>
          </div>
        </div>
      </section>

      {/* Music & Streaming */}
      <section className="py-16 px-6">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-4xl font-bold mb-8">Music & Streaming</h2>
          
          <div className="grid md:grid-cols-2 gap-6 mb-12">
            <a 
              href="https://open.spotify.com/artist/6E8xwOloHnzGWVlNV9K8n7" 
              className="border-2 border-black p-6 hover:bg-black hover:text-white transition"
              target="_blank"
              rel="noopener noreferrer"
            >
              <h3 className="text-xl font-bold mb-2">Spotify</h3>
              <p className="text-sm opacity-70">Stream full discography</p>
            </a>
            
            <a 
              href="https://music.apple.com/gb/artist/elcee-the-alchemist/1479992060" 
              className="border-2 border-black p-6 hover:bg-black hover:text-white transition"
              target="_blank"
              rel="noopener noreferrer"
            >
              <h3 className="text-xl font-bold mb-2">Apple Music</h3>
              <p className="text-sm opacity-70">Stream full discography</p>
            </a>
            
            <a 
              href="https://youtube.com/@elceethealchemist" 
              className="border-2 border-black p-6 hover:bg-black hover:text-white transition"
              target="_blank"
              rel="noopener noreferrer"
            >
              <h3 className="text-xl font-bold mb-2">YouTube</h3>
              <p className="text-sm opacity-70">Music videos & visuals</p>
            </a>
            
            <a 
              href="https://elceethealchemist.bandcamp.com" 
              className="border-2 border-black p-6 hover:bg-black hover:text-white transition"
              target="_blank"
              rel="noopener noreferrer"
            >
              <h3 className="text-xl font-bold mb-2">Bandcamp</h3>
              <p className="text-sm opacity-70">Support directly</p>
            </a>
          </div>

          {/* Stats placeholder */}
          <div className="bg-black text-white p-8">
            <h3 className="text-2xl font-bold mb-6">Statistics</h3>
            <div className="grid md:grid-cols-3 gap-8 text-center">
              <div>
                <p className="text-4xl font-bold mb-2">6</p>
                <p className="text-sm text-gray-400">Years Active</p>
              </div>
              <div>
                <p className="text-4xl font-bold mb-2">24+</p>
                <p className="text-sm text-gray-400">Tracks Planned 2026</p>
              </div>
              <div>
                <p className="text-4xl font-bold mb-2">100%</p>
                <p className="text-sm text-gray-400">Independent</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Social Media */}
      <section className="py-16 px-6 bg-gray-50">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-4xl font-bold mb-8">Social Media</h2>
          
          <div className="grid md:grid-cols-2 gap-4">
            <a href="https://instagram.com/elceethealchemist" className="flex justify-between items-center border border-black/10 bg-white p-4 hover:border-black transition" target="_blank" rel="noopener noreferrer">
              <span className="font-medium">Instagram</span>
              <span className="text-sm text-gray-600">@elceethealchemist →</span>
            </a>
            
            <a href="https://tiktok.com/@elceethealchemist" className="flex justify-between items-center border border-black/10 bg-white p-4 hover:border-black transition" target="_blank" rel="noopener noreferrer">
              <span className="font-medium">TikTok</span>
              <span className="text-sm text-gray-600">@elceethealchemist →</span>
            </a>
            
            <a href="https://twitter.com/elceejpg" className="flex justify-between items-center border border-black/10 bg-white p-4 hover:border-black transition" target="_blank" rel="noopener noreferrer">
              <span className="font-medium">Twitter/X</span>
              <span className="text-sm text-gray-600">@elceejpg →</span>
            </a>
            
            <a href="https://youtube.com/@elceethealchemist" className="flex justify-between items-center border border-black/10 bg-white p-4 hover:border-black transition" target="_blank" rel="noopener noreferrer">
              <span className="font-medium">YouTube</span>
              <span className="text-sm text-gray-600">@elceethealchemist →</span>
            </a>
            
            <a href="https://facebook.com/elceethealchemist" className="flex justify-between items-center border border-black/10 bg-white p-4 hover:border-black transition" target="_blank" rel="noopener noreferrer">
              <span className="font-medium">Facebook</span>
              <span className="text-sm text-gray-600">@elceethealchemist →</span>
            </a>
            
            <a href="https://soundcloud.com/elceethealchemist" className="flex justify-between items-center border border-black/10 bg-white p-4 hover:border-black transition" target="_blank" rel="noopener noreferrer">
              <span className="font-medium">SoundCloud</span>
              <span className="text-sm text-gray-600">@elceethealchemist →</span>
            </a>
          </div>
        </div>
      </section>

      {/* Contact */}
      <section className="py-16 px-6 bg-black text-white">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl font-bold mb-6">Booking & Press Inquiries</h2>
          <p className="text-xl text-gray-400 mb-8">
            For performances, interviews, collaborations, or press requests:
          </p>
          <Link 
            href="/contact" 
            className="inline-block bg-white text-black px-8 py-4 text-lg font-semibold hover:bg-gray-200 transition"
          >
            Get in Touch
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 px-6 border-t border-black/10">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-sm text-gray-600">© 2026 Elcee the Alchemist. All rights reserved.</p>
          <Image 
            src="/logos/ankh.png" 
            alt="Ankh" 
            width={30} 
            height={30}
            className="opacity-30"
          />
        </div>
      </footer>
    </div>
  );
}
