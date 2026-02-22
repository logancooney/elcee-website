import Image from "next/image";
import Link from "next/link";

export default function ContactPage() {
  return (
    <div className="min-h-screen bg-black text-white">
      {/* Navigation */}
      <nav className="fixed top-0 w-full bg-black/90 backdrop-blur-sm z-50 border-b border-white/10">
        <div className="max-w-7xl mx-auto px-6 py-2 flex justify-between items-center">
          <Link href="/">
            <Image 
              src="/logos/eta-logo-white-cropped.png" 
              alt="Elcee the Alchemist" 
              width={400} 
              height={100}
              className="h-20 w-auto"
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

      {/* Contact Form */}
      <section className="py-20 px-6">
        <div className="max-w-3xl mx-auto">
          <div className="bg-white/5 backdrop-blur-sm p-8 md:p-12 rounded-2xl border border-white/10">
            <h2 className="text-3xl font-bold mb-8 text-center">Get in Touch</h2>
            <form className="space-y-6">
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium mb-2">Name</label>
                  <input 
                    type="text" 
                    id="name" 
                    name="name"
                    className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl focus:outline-none focus:border-white/40 transition"
                    required
                  />
                </div>
                <div>
                  <label htmlFor="email" className="block text-sm font-medium mb-2">Email</label>
                  <input 
                    type="email" 
                    id="email" 
                    name="email"
                    className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl focus:outline-none focus:border-white/40 transition"
                    required
                  />
                </div>
              </div>
              
              <div>
                <label htmlFor="subject" className="block text-sm font-medium mb-2">Subject</label>
                <input 
                  type="text" 
                  id="subject" 
                  name="subject"
                  className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl focus:outline-none focus:border-white/40 transition"
                  required
                />
              </div>

              <div>
                <label htmlFor="message" className="block text-sm font-medium mb-2">Message</label>
                <textarea 
                  id="message" 
                  name="message"
                  rows={6}
                  className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl focus:outline-none focus:border-white/40 transition resize-none"
                  required
                />
              </div>

              <button 
                type="submit"
                className="w-full bg-white text-black px-8 py-4 font-bold rounded-full hover:bg-gray-200 transition-all duration-300"
              >
                Send Message
              </button>
            </form>
          </div>

          <div className="mt-12 text-center space-y-4">
            <p className="text-gray-400">Or reach out directly:</p>
            <div className="flex flex-wrap justify-center gap-6 text-lg">
              <a href="mailto:elcee.mgmt@gmail.com" className="hover:underline">elcee.mgmt@gmail.com</a>
              <a href="tel:07552772559" className="hover:underline">07552 772559</a>
            </div>
            <div className="flex flex-wrap justify-center gap-6 text-base pt-4">
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
          <div className="mt-8">
            <Link 
              href="/studio"
              className="inline-block bg-black text-white px-10 py-4 font-bold rounded-full hover:bg-gray-800 transition-all duration-300"
            >
              Book Studio Time
            </Link>
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
