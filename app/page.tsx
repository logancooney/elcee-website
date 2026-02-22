import Image from "next/image";
import Link from "next/link";

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
        <div className="max-w-6xl mx-auto text-center">
          <h2 className="text-4xl font-bold mb-12">Listen</h2>
          <div className="flex justify-center items-center gap-8 flex-wrap">
            <a 
              href="https://open.spotify.com/artist/6E8xwOloHnzGWVlNV9K8n7" 
              className="group"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Listen on Spotify"
            >
              <svg className="w-16 h-16 fill-white group-hover:fill-green-500 transition-colors duration-300" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path d="M12 0C5.4 0 0 5.4 0 12s5.4 12 12 12 12-5.4 12-12S18.66 0 12 0zm5.521 17.34c-.24.359-.66.48-1.021.24-2.82-1.74-6.36-2.101-10.561-1.141-.418.122-.779-.179-.899-.539-.12-.421.18-.78.54-.9 4.56-1.021 8.52-.6 11.64 1.32.42.18.479.659.301 1.02zm1.44-3.3c-.301.42-.841.6-1.262.3-3.239-1.98-8.159-2.58-11.939-1.38-.479.12-1.02-.12-1.14-.6-.12-.48.12-1.021.6-1.141C9.6 9.9 15 10.561 18.72 12.84c.361.181.54.78.241 1.2zm.12-3.36C15.24 8.4 8.82 8.16 5.16 9.301c-.6.179-1.2-.181-1.38-.721-.18-.601.18-1.2.72-1.381 4.26-1.26 11.28-1.02 15.721 1.621.539.3.719 1.02.419 1.56-.299.421-1.02.599-1.559.3z"/>
              </svg>
            </a>
            <a 
              href="https://music.apple.com/gb/artist/elcee-the-alchemist/1479992060" 
              className="group"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Listen on Apple Music"
            >
              <svg className="w-16 h-16 fill-white group-hover:fill-pink-500 transition-colors duration-300" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path d="M23.997 6.124c0-.738-.065-1.47-.24-2.19-.317-1.31-1.062-2.31-2.18-3.043C21.003.517 20.373.285 19.7.164c-.517-.093-1.038-.135-1.564-.15-.04-.003-.083-.01-.124-.013H5.988c-.152.01-.303.017-.455.026C4.786.07 4.043.15 3.34.428 2.004.958 1.04 1.88.475 3.208c-.192.448-.292.925-.363 1.408-.056.392-.088.785-.1 1.18 0 .032-.007.062-.01.093v12.223c.01.14.017.283.027.424.05.815.154 1.624.497 2.373.65 1.42 1.738 2.353 3.234 2.801.42.127.856.187 1.293.228.555.053 1.11.06 1.667.06h11.03c.525 0 1.048-.007 1.57-.06.437-.04.873-.1 1.293-.228 1.496-.448 2.584-1.38 3.234-2.8.343-.75.447-1.56.497-2.374.01-.142.017-.284.027-.425v-12.23zm-5.847-.283c.283-.01.565-.048.848-.05.998-.012 1.99-.024 2.985-.074.51-.026 1.024-.05 1.536-.054.08 0 .16.04.24.062-.022.12-.035.24-.058.36-.18 1.03-.36 2.058-.54 3.086-.18 1.028-.36 2.058-.54 3.086-.18 1.028-.36 2.06-.54 3.09-.18 1.03-.36 2.058-.54 3.086-.06.328-.116.657-.173.988-.017.097-.035.19-.058.286-.017-.012-.03-.024-.042-.036-.122-.31-.244-.62-.366-.93-.856-2.175-1.714-4.347-2.57-6.52-.614-1.557-1.23-3.115-1.844-4.673-.068-.173-.122-.35-.188-.524-.05-.13-.033-.13.104-.135.495-.02.988-.04 1.482-.06.496-.03.99-.06 1.484-.09zm-1.322 4.54c.01.017.02.034.03.05.118.3.235.596.352.894.706 1.79 1.412 3.58 2.12 5.37.028.07.046.145.07.217.012.025.012.053.02.08-.014 0-.03.01-.046.01-.9 0-1.8.01-2.702.01-1.02 0-2.042.01-3.062.01-.038 0-.076-.01-.112-.01.03-.09.055-.177.087-.26.357-.96.714-1.92 1.07-2.88.57-1.54 1.14-3.08 1.712-4.62.025-.068.046-.14.07-.21.01-.018.02-.035.03-.053.01.018.02.036.03.054l1.33 1.33z"/>
              </svg>
            </a>
            <a 
              href="https://youtube.com/@elceethealchemist" 
              className="group"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Watch on YouTube"
            >
              <svg className="w-16 h-16 fill-white group-hover:fill-red-600 transition-colors duration-300" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
              </svg>
            </a>
            <a 
              href="https://soundcloud.com/elceethealchemist" 
              className="group"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Listen on SoundCloud"
            >
              <svg className="w-16 h-16 fill-white group-hover:fill-orange-500 transition-colors duration-300" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path d="M1.175 12.225c-.051 0-.094.046-.101.1l-.233 2.154.233 2.105c.007.058.05.098.101.098.05 0 .09-.04.099-.098l.255-2.105-.27-2.154c0-.057-.045-.1-.09-.1m-.899.828c-.051 0-.09.04-.099.099l-.135 1.344.135 1.31c0 .054.044.09.09.099.051 0 .09-.04.099-.099l.18-1.31-.18-1.343c0-.05-.04-.09-.09-.1zm1.83-1.229c-.05 0-.094.04-.103.095l-.313 2.572.313 2.48c.01.056.053.095.103.095.051 0 .098-.04.108-.1l.346-2.48-.346-2.567c-.01-.057-.053-.095-.103-.095zm.955-.598c-.06 0-.104.045-.118.105l-.38 3.17.38 3.089c.013.06.058.102.118.102.06 0 .106-.045.119-.102l.424-3.09-.424-3.17c-.013-.06-.059-.105-.119-.105zm.964-.107c-.068 0-.124.055-.137.12l-.405 3.382.405 3.296c.013.066.07.12.137.12s.123-.054.137-.12l.449-3.296-.449-3.381c-.014-.066-.07-.12-.137-.12zm.962-.117c-.076 0-.137.06-.151.138l-.432 3.51.432 3.415c.014.075.075.137.151.137.075 0 .137-.062.15-.137l.478-3.415-.478-3.51c-.013-.077-.075-.138-.15-.138zm.971.01c-.084 0-.153.07-.166.151l-.458 3.5.458 3.458c.013.08.082.15.166.15.083 0 .152-.07.165-.15l.507-3.458-.507-3.5c-.013-.081-.082-.15-.165-.15zm.96.037c-.09 0-.165.076-.178.166l-.483 3.463.483 3.454c.013.09.088.166.178.166.091 0 .166-.076.18-.166l.532-3.454-.532-3.463c-.014-.09-.089-.166-.18-.166zm.959.117c-.1 0-.18.08-.195.18l-.508 3.346.508 3.44c.015.099.095.18.195.18.098 0 .178-.081.194-.18l.558-3.44-.558-3.346c-.016-.1-.096-.18-.194-.18zm.96.234c-.108 0-.194.086-.21.194l-.532 3.112.532 3.44c.016.108.102.193.21.193.106 0 .193-.085.207-.194l.588-3.44-.588-3.112c-.014-.108-.101-.194-.207-.194zm.958.33c-.114 0-.206.091-.222.206l-.557 2.782.557 3.44c.016.115.108.207.222.207.113 0 .206-.092.221-.206l.61-3.44-.61-2.783c-.015-.115-.108-.206-.221-.206zm.964.342c-.122 0-.221.1-.237.221l-.583 2.44.583 3.438c.016.122.115.223.237.223.121 0 .221-.1.237-.223l.637-3.438-.637-2.44c-.016-.122-.116-.221-.237-.221zm.965.362c-.13 0-.238.108-.254.238l-.605 2.078.605 3.437c.016.13.124.237.254.237.13 0 .237-.107.254-.237l.663-3.437-.663-2.078c-.017-.13-.124-.238-.254-.238zm.959.377c-.138 0-.25.114-.267.254l-.63 1.701.63 3.437c.017.14.129.254.267.254.137 0 .249-.114.266-.254l.692-3.437-.692-1.7c-.017-.14-.129-.255-.266-.255zm4.895 1.7l-.63-3.437c-.018-.14-.13-.254-.267-.254-.139 0-.25.114-.268.254l-.63 3.437.63 3.438c.018.139.13.254.268.254.137 0 .249-.115.267-.254l.63-3.438zm.963-.254c0-.138-.111-.254-.254-.254-.14 0-.254.116-.254.254l-.63 3.437.63 3.438c0 .138.114.254.254.254.143 0 .254-.116.254-.254l.692-3.438-.692-3.437zm.965.254c0-.14-.115-.254-.254-.254-.14 0-.255.115-.255.254l-.63 3.437.63 3.438c0 .139.115.254.255.254.139 0 .254-.115.254-.254l.663-3.438-.663-3.437zm.958-.377c0-.13-.108-.237-.237-.237-.13 0-.237.107-.237.237l-.63 3.437.63 3.438c0 .129.107.237.237.237.129 0 .237-.108.237-.237l.636-3.438-.636-3.437zm.96-.342c0-.122-.1-.221-.222-.221-.121 0-.22.099-.22.221l-.61 3.437.61 3.438c0 .122.099.223.22.223.122 0 .222-.101.222-.223l.61-3.438-.61-3.437zm.959-.33c0-.115-.092-.207-.207-.207-.115 0-.207.092-.207.207l-.588 3.437.588 3.438c0 .114.092.206.207.206.115 0 .207-.092.207-.206l.587-3.438-.587-3.437zm.959-.234c0-.107-.086-.193-.193-.193-.106 0-.193.086-.193.193l-.559 3.437.559 3.438c0 .107.087.194.193.194.107 0 .193-.087.193-.194l.558-3.438-.558-3.437z"/>
              </svg>
            </a>
            <a 
              href="https://elceethealchemist.bandcamp.com" 
              className="group"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Support on Bandcamp"
            >
              <svg className="w-16 h-16 fill-white group-hover:fill-cyan-400 transition-colors duration-300" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path d="M0 18.75l7.437-13.5H24l-7.438 13.5H0z"/>
              </svg>
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

      {/* Footer */}
      <footer className="py-16 px-6 border-t border-white/10">
        <div className="max-w-7xl mx-auto text-center">
          <Image 
            src="/logos/ankh-white.png" 
            alt="Ankh" 
            width={50} 
            height={50}
            className="opacity-70 mx-auto mb-6"
          />
          <p className="text-sm text-gray-500">© 2026 Elcee the Alchemist. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}
