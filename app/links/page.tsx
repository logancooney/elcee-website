'use client';

export default function LinksPage() {
  return (
    <div className="min-h-screen bg-black text-white">
      <div className="max-w-2xl mx-auto px-6 py-12">
        
        {/* Header */}
        <div className="text-center mb-12">
          <div className="w-24 h-24 mx-auto mb-4 rounded-full overflow-hidden bg-gray-800">
            <img src="/icon.png" alt="Elcee the Alchemist" className="w-full h-full object-cover" />
          </div>
          <h1 className="text-3xl font-bold mb-2">Elcee the Alchemist</h1>
          <p className="text-gray-400">Alternative Rap | Manchester</p>
        </div>

        {/* Main Links */}
        <div className="space-y-4 mb-12">
          
          {/* Studio Booking */}
          <a
            href="https://elceethealchemist.com/studio"
            className="block w-full bg-white hover:bg-gray-100 text-black font-semibold text-center py-4 px-6 rounded-lg transition"
          >
            🎙️ Book Studio Time
          </a>

          {/* Latest Release - Update this when new music drops */}
          <a
            href="https://open.spotify.com/artist/6E8xwOloHnzGWVlNV9K8n7"
            target="_blank"
            rel="noopener noreferrer"
            className="block w-full bg-gradient-to-r from-green-600 to-green-500 hover:from-green-700 hover:to-green-600 text-white font-semibold text-center py-4 px-6 rounded-lg transition"
          >
            🎵 Listen on Spotify
          </a>

          {/* Pre-Save (when active) */}
          {/* <a
            href="/presave/upcoming-release"
            className="block w-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white font-semibold text-center py-4 px-6 rounded-lg transition animate-pulse"
          >
            ⭐ Pre-Save New Release
          </a> */}

        </div>

        {/* Music Platforms */}
        <div className="mb-12">
          <h2 className="text-lg font-semibold mb-4 text-center text-gray-400">Listen Everywhere</h2>
          <div className="grid grid-cols-2 gap-3">
            
            <a
              href="https://open.spotify.com/artist/6E8xwOloHnzGWVlNV9K8n7"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center bg-green-600 hover:bg-green-700 text-white font-medium py-3 px-4 rounded-lg transition"
            >
              <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 0C5.4 0 0 5.4 0 12s5.4 12 12 12 12-5.4 12-12S18.66 0 12 0zm5.521 17.34c-.24.359-.66.48-1.021.24-2.82-1.74-6.36-2.101-10.561-1.141-.418.122-.779-.179-.899-.539-.12-.421.18-.78.54-.9 4.56-1.021 8.52-.6 11.64 1.32.42.18.479.659.301 1.02zm1.44-3.3c-.301.42-.841.6-1.262.3-3.239-1.98-8.159-2.58-11.939-1.38-.479.12-1.02-.12-1.14-.6-.12-.48.12-1.021.6-1.141C9.6 9.9 15 10.561 18.72 12.84c.361.181.54.78.241 1.2zm.12-3.36C15.24 8.4 8.82 8.16 5.16 9.301c-.6.179-1.2-.181-1.38-.721-.18-.601.18-1.2.72-1.381 4.26-1.26 11.28-1.02 15.721 1.621.539.3.719 1.02.419 1.56-.299.421-1.02.599-1.559.3z"/>
              </svg>
              Spotify
            </a>

            <a
              href="https://music.apple.com/artist/1479992060"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center bg-pink-600 hover:bg-pink-700 text-white font-medium py-3 px-4 rounded-lg transition"
            >
              <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 24 24">
                <path d="M23.994 6.124a9.23 9.23 0 0 0-.24-2.132c-.317-1.231-1.05-2.247-2.244-3.056-.38-.257-.758-.473-1.142-.67C19.114.066 17.845-.015 16.516.001c-1.428.017-2.787.266-4.116.627-1.627.442-3.228.973-4.847 1.45-.804.236-1.624.419-2.45.538-.78.11-1.565.144-2.353.15-.68.004-1.349-.04-2.011-.172-.656-.13-1.291-.323-1.907-.599C0 2.252 0 2.252 0 5.976v11.967c0 .144.001.237.015.335.093 1.122.478 2.092 1.193 2.93.746.877 1.71 1.396 2.84 1.652.985.223 1.965.221 2.963-.012.956-.224 1.875-.556 2.784-.917 1.583-.629 3.14-1.323 4.697-1.991 1.657-.71 3.315-1.424 4.995-2.065.73-.278 1.483-.504 2.242-.682 1.246-.292 2.474-.24 3.69.164 1.005.334 1.842.96 2.485 1.86.516.722.801 1.543.862 2.437.01.15.014.3.014.45v.172c0 .024 0 .024.008 0h.016v-5.774c0-.016 0-.032-.002-.048v-.412c-.005-.26-.01-.52-.05-.776-.136-1.054-.54-1.97-1.206-2.744-.74-.865-1.663-1.375-2.764-1.596-.907-.182-1.808-.14-2.695.124-.972.29-1.908.689-2.836 1.108-1.634.736-3.246 1.518-4.86 2.294-1.57.755-3.14 1.508-4.732 2.206-.729.32-1.484.592-2.25.81-1.223.347-2.442.298-3.644-.158-.925-.35-1.651-.946-2.195-1.77-.457-.693-.681-1.474-.694-2.308v-9.125c0-.026.002-.052.002-.078 0 .026 0 .026.005 0 .008-.145.013-.29.028-.434.093-.892.388-1.69.939-2.385.65-.82 1.497-1.304 2.517-1.495.746-.14 1.496-.128 2.24.015.972.187 1.906.495 2.832.83 1.64.593 3.258 1.252 4.877 1.903 1.65.664 3.3 1.326 4.973 1.926.764.274 1.544.494 2.337.65 1.254.247 2.486.19 3.697-.226.96-.33 1.777-.87 2.435-1.65.54-.64.88-1.386.997-2.22.037-.267.044-.535.046-.803v-.06c0-.03 0-.03-.007 0h-.014v5.06c0 .016 0 .032.002.048v.463c.004.26.01.52.05.776.136 1.053.54 1.97 1.206 2.743.74.865 1.663 1.376 2.764 1.596.907.183 1.808.14 2.695-.124.972-.29 1.908-.689 2.836-1.108 1.634-.736 3.246-1.518 4.86-2.294 1.57-.755 3.14-1.508 4.732-2.206.729-.32 1.484-.592 2.25-.81 1.223-.347 2.442-.298 3.644.158.925.35 1.651.946 2.195 1.77.457.693.681 1.474.694 2.308v9.125c0 .026-.002.052-.002.078 0-.026 0-.026-.005 0-.008.145-.013.29-.028.434-.093.892-.388 1.69-.939 2.385-.65.82-1.497 1.304-2.517 1.495-.746.14-1.496.128-2.24-.015-.972-.187-1.906-.495-2.832-.83-1.64-.593-3.258-1.252-4.877-1.903-1.65-.664-3.3-1.326-4.973-1.926-.764-.274-1.544-.494-2.337-.65-1.254-.247-2.486-.19-3.697.226-.96.33-1.777.87-2.435 1.65-.54.64-.88 1.386-.997 2.22-.037.267-.044.535-.046.803v.06z"/>
              </svg>
              Apple Music
            </a>

            <a
              href="https://www.youtube.com/@elceethealchemist"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center bg-red-600 hover:bg-red-700 text-white font-medium py-3 px-4 rounded-lg transition"
            >
              <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 24 24">
                <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
              </svg>
              YouTube
            </a>

            <a
              href="https://soundcloud.com/elceethealchemist"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center bg-orange-600 hover:bg-orange-700 text-white font-medium py-3 px-4 rounded-lg transition"
            >
              <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 24 24">
                <path d="M1.175 12.225c-.051 0-.094.046-.101.1l-.233 2.154.233 2.105c.007.058.05.098.101.098.05 0 .09-.04.099-.098l.255-2.105-.27-2.154c0-.057-.045-.1-.084-.1zm-.542.016c-.052 0-.096.046-.103.098l-.213 2.138.213 2.012c.007.053.051.094.103.094.05 0 .09-.041.099-.094l.234-2.012-.234-2.138c-.009-.052-.05-.098-.099-.098zm1.09.018c-.062 0-.113.05-.116.107l-.255 2.12.255 2.06c.003.059.054.11.116.11.061 0 .111-.051.114-.11l.283-2.06-.283-2.12c-.003-.057-.053-.107-.114-.107zm.553-.02c-.064 0-.117.052-.122.113l-.237 2.136.237 2.024c.005.06.058.113.122.113.063 0 .116-.053.12-.113l.264-2.024-.264-2.136c-.004-.061-.057-.113-.12-.113zm.555 0c-.068 0-.124.055-.129.117L2.451 14.5l.251 2.011c.005.062.061.117.129.117.066 0 .122-.055.125-.117l.277-2.011-.277-2.144c-.003-.062-.059-.117-.125-.117zm1.117.016c-.073 0-.134.059-.139.129l-.234 2.109.234 2.003c.005.068.066.127.139.127.072 0 .133-.059.137-.127l.258-2.003-.258-2.109c-.004-.07-.065-.129-.137-.129zm.556-.004c-.076 0-.138.062-.144.133l-.213 2.097.213 1.989c.006.07.068.132.144.132.075 0 .137-.062.142-.132l.235-1.989-.235-2.097c-.005-.071-.067-.133-.142-.133zm.555.004c-.079 0-.144.065-.148.141l-.194 2.093.194 1.976c.004.075.069.14.148.14.078 0 .143-.065.146-.14l.214-1.976-.214-2.093c-.003-.076-.068-.141-.146-.141zm.556-.004c-.082 0-.149.067-.154.146l-.174 2.089.174 1.965c.005.08.072.146.154.146.081 0 .148-.066.152-.146l.192-1.965-.192-2.089c-.004-.079-.071-.146-.152-.146z"/>
              </svg>
              SoundCloud
            </a>

          </div>
        </div>

        {/* Social Media */}
        <div className="mb-12">
          <h2 className="text-lg font-semibold mb-4 text-center text-gray-400">Follow</h2>
          <div className="grid grid-cols-2 gap-3">
            
            <a
              href="https://www.instagram.com/elceethealchemist"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white font-medium py-3 px-4 rounded-lg transition"
            >
              <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
              </svg>
              Instagram
            </a>

            <a
              href="https://www.tiktok.com/@elceethealchemist"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center bg-black hover:bg-gray-900 border border-white text-white font-medium py-3 px-4 rounded-lg transition"
            >
              <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97-.57-.26-1.1-.59-1.62-.93-.01 2.92.01 5.84-.02 8.75-.08 1.4-.54 2.79-1.35 3.94-1.31 1.92-3.58 3.17-5.91 3.21-1.43.08-2.86-.31-4.08-1.03-2.02-1.19-3.44-3.37-3.65-5.71-.02-.5-.03-1-.01-1.49.18-1.9 1.12-3.72 2.58-4.96 1.66-1.44 3.98-2.13 6.15-1.72.02 1.48-.04 2.96-.04 4.44-.99-.32-2.15-.23-3.02.37-.63.41-1.11 1.04-1.36 1.75-.21.51-.15 1.07-.14 1.61.24 1.64 1.82 3.02 3.5 2.87 1.12-.01 2.19-.66 2.77-1.61.19-.33.4-.67.41-1.06.1-1.79.06-3.57.07-5.36.01-4.03-.01-8.05.02-12.07z"/>
              </svg>
              TikTok
            </a>

            <a
              href="https://twitter.com/elceejpg"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center bg-blue-500 hover:bg-blue-600 text-white font-medium py-3 px-4 rounded-lg transition"
            >
              <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 24 24">
                <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z"/>
              </svg>
              Twitter
            </a>

            <a
              href="https://www.facebook.com/elceethealchemist"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 px-4 rounded-lg transition"
            >
              <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 24 24">
                <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
              </svg>
              Facebook
            </a>

          </div>
        </div>

        {/* Contact */}
        <div className="text-center">
          <a
            href="/contact"
            className="inline-block text-gray-400 hover:text-white transition"
          >
            Contact
          </a>
          <span className="mx-3 text-gray-600">•</span>
          <a
            href="/epk"
            className="inline-block text-gray-400 hover:text-white transition"
          >
            EPK
          </a>
        </div>

        {/* Footer */}
        <div className="mt-12 text-center text-gray-600 text-sm">
          <p>Manchester, UK</p>
          <p className="mt-2">© 2026 Elcee the Alchemist</p>
        </div>

      </div>
    </div>
  );
}
