import Image from "next/image";
import Link from "next/link";

export const metadata = {
  title: "Recording Studio Manchester | Professional Mixing & Mastering | Elcee the Alchemist",
  description: "Professional recording studio in Manchester offering expert mixing, mastering, production, and Ableton tutoring. Competitive rates from £30/hr. Book your session today.",
  keywords: "recording studio manchester, mixing and mastering manchester, music production manchester, ableton tutor manchester, affordable recording studio, rap recording studio manchester, independent artist recording",
};

export default function RecordingStudioManchesterPage() {
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

      {/* Hero Section */}
      <section className="pt-32 pb-20 px-6 bg-black text-white">
        <div className="max-w-6xl mx-auto text-center">
          <h1 className="text-5xl md:text-7xl font-bold mb-6">
            Recording Studio in Manchester
          </h1>
          <p className="text-2xl text-gray-300 mb-8 max-w-3xl mx-auto">
            Professional recording, mixing, mastering, and production services for independent artists. 
            Competitive rates, premium quality.
          </p>
          <div className="flex gap-4 justify-center flex-wrap">
            <Link 
              href="/studio#booking" 
              className="bg-white text-black px-8 py-4 text-lg font-semibold hover:bg-gray-200 transition"
            >
              Book Studio Time
            </Link>
            <Link 
              href="#services" 
              className="border-2 border-white px-8 py-4 text-lg font-semibold hover:bg-white hover:text-black transition"
            >
              View Services
            </Link>
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-20 px-6">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl font-bold mb-12 text-center">Why Choose Our Manchester Studio?</h2>
          
          <div className="grid md:grid-cols-3 gap-8">
            <div className="border-2 border-black p-8">
              <h3 className="text-2xl font-bold mb-4">Professional Equipment</h3>
              <p className="text-gray-700 leading-relaxed">
                Industry-standard recording gear, acoustic treatment, and monitoring for pristine sound quality. 
                The same tools used by top studios, at independent artist prices.
              </p>
            </div>
            
            <div className="border-2 border-black p-8">
              <h3 className="text-2xl font-bold mb-4">Expert Engineer</h3>
              <p className="text-gray-700 leading-relaxed">
                6 years of experience recording, mixing, and producing for independent artists across genres. 
                As an artist myself, I understand your vision and workflow.
              </p>
            </div>
            
            <div className="border-2 border-black p-8">
              <h3 className="text-2xl font-bold mb-4">Affordable Rates</h3>
              <p className="text-gray-700 leading-relaxed">
                Starting at £30/hr for loyalty clients. Transparent pricing, no hidden fees. 
                Payment plans available for larger projects like EPs and albums.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section id="services" className="py-20 px-6 bg-gray-50">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl font-bold mb-4 text-center">Studio Services & Pricing</h2>
          <p className="text-center text-gray-600 mb-12 max-w-2xl mx-auto">
            Professional recording and production services tailored for independent artists in Manchester and beyond.
          </p>
          
          <div className="grid md:grid-cols-2 gap-8 mb-12">
            {/* Recording */}
            <div className="bg-white border-2 border-black p-8">
              <h3 className="text-3xl font-bold mb-4">Recording Sessions</h3>
              <div className="space-y-3 mb-6">
                <div className="flex justify-between items-baseline">
                  <span className="font-medium">Ad-hoc hourly rate</span>
                  <span className="text-2xl font-bold">£35/hr</span>
                </div>
                <div className="flex justify-between items-baseline">
                  <span className="font-medium">Loyalty subscription (£240/mo)</span>
                  <span className="text-2xl font-bold">£30/hr</span>
                </div>
              </div>
              <ul className="space-y-2 text-gray-700">
                <li>✓ Vocal recording & comping</li>
                <li>✓ Live instrument tracking</li>
                <li>✓ Professional microphones & preamps</li>
                <li>✓ Real-time monitoring & feedback</li>
                <li>✓ Stems provided after session</li>
              </ul>
            </div>

            {/* Mixing & Mastering */}
            <div className="bg-white border-2 border-black p-8">
              <h3 className="text-3xl font-bold mb-4">Mixing & Mastering</h3>
              <div className="space-y-3 mb-6">
                <div className="flex justify-between items-baseline">
                  <span className="font-medium">Full Mix & Master</span>
                  <span className="text-2xl font-bold">£340</span>
                </div>
                <div className="flex justify-between items-baseline">
                  <span className="font-medium">Vocal Mix (no master)</span>
                  <span className="text-2xl font-bold">£190</span>
                </div>
                <div className="flex justify-between items-baseline">
                  <span className="font-medium">Mastering only</span>
                  <span className="text-2xl font-bold">£40</span>
                </div>
              </div>
              <ul className="space-y-2 text-gray-700">
                <li>✓ Industry-standard plugins & processing</li>
                <li>✓ Up to 3 revisions included</li>
                <li>✓ Mastered for streaming platforms</li>
                <li>✓ Fast turnaround (3-7 days)</li>
              </ul>
            </div>

            {/* Production */}
            <div className="bg-white border-2 border-black p-8">
              <h3 className="text-3xl font-bold mb-4">Music Production</h3>
              <div className="space-y-3 mb-6">
                <div className="flex justify-between items-baseline">
                  <span className="font-medium">Bespoke production</span>
                  <span className="text-2xl font-bold">£400+</span>
                </div>
                <div className="flex justify-between items-baseline">
                  <span className="font-medium">Additional production</span>
                  <span className="text-2xl font-bold">£150+</span>
                </div>
              </div>
              <ul className="space-y-2 text-gray-700">
                <li>✓ Custom beats from scratch</li>
                <li>✓ Arrangement & composition</li>
                <li>✓ Sound design & sampling</li>
                <li>✓ Co-production sessions available</li>
                <li>✓ Stems & project files included</li>
              </ul>
            </div>

            {/* Tutoring */}
            <div className="bg-white border-2 border-black p-8">
              <h3 className="text-3xl font-bold mb-4">Ableton Tutoring</h3>
              <div className="space-y-3 mb-6">
                <div className="flex justify-between items-baseline">
                  <span className="font-medium">1-on-1 sessions</span>
                  <span className="text-2xl font-bold">£35/hr</span>
                </div>
              </div>
              <ul className="space-y-2 text-gray-700">
                <li>✓ Beginner to advanced levels</li>
                <li>✓ Music production fundamentals</li>
                <li>✓ Mixing & mastering techniques</li>
                <li>✓ Workflow optimization</li>
                <li>✓ Personalized curriculum</li>
              </ul>
            </div>
          </div>

          {/* Add-ons */}
          <div className="bg-black text-white p-8">
            <h3 className="text-2xl font-bold mb-6">Add-On Services</h3>
            <div className="grid md:grid-cols-3 gap-6">
              <div>
                <p className="font-medium mb-1">Vocal Tuning</p>
                <p className="text-gray-400">£40</p>
              </div>
              <div>
                <p className="font-medium mb-1">Stem Separation</p>
                <p className="text-gray-400">£75</p>
              </div>
              <div>
                <p className="font-medium mb-1">Rush Service (+40%)</p>
                <p className="text-gray-400">Available</p>
              </div>
            </div>
          </div>

          {/* Packages */}
          <div className="mt-12 grid md:grid-cols-2 gap-8">
            <div className="bg-white border-2 border-black p-8">
              <h3 className="text-2xl font-bold mb-4">3-Song Package</h3>
              <p className="text-4xl font-bold mb-4">£920</p>
              <p className="text-gray-700 mb-4">Perfect for singles or small EPs</p>
              <ul className="space-y-2 text-gray-700">
                <li>✓ Recording + Mixing + Mastering</li>
                <li>✓ £307 per song (save £99)</li>
                <li>✓ Payment plan available</li>
              </ul>
            </div>

            <div className="bg-white border-2 border-black p-8">
              <h3 className="text-2xl font-bold mb-4">5-Song Package</h3>
              <p className="text-4xl font-bold mb-4">£1,450</p>
              <p className="text-gray-700 mb-4">Ideal for full EPs or mixtapes</p>
              <ul className="space-y-2 text-gray-700">
                <li>✓ Recording + Mixing + Mastering</li>
                <li>✓ £290 per song (save £250)</li>
                <li>✓ Payment plan available</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Portfolio/Testimonials */}
      <section className="py-20 px-6">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-4xl font-bold mb-12 text-center">What Artists Say</h2>
          
          <div className="space-y-8">
            <div className="border-l-4 border-black pl-6">
              <p className="text-lg italic mb-4">
                "Working with Elcee transformed my sound. Professional setup, great ear for detail, and actually understands what independent artists need."
              </p>
              <p className="font-bold">— Manchester Artist</p>
            </div>
            
            <div className="border-l-4 border-black pl-6">
              <p className="text-lg italic mb-4">
                "Best value recording studio in Manchester. Quality rivals the big studios but at a fraction of the price. Highly recommend."
              </p>
              <p className="font-bold">— Local Producer</p>
            </div>

            <div className="border-l-4 border-black pl-6">
              <p className="text-lg italic mb-4">
                "As someone new to recording, Elcee made the whole process easy and stress-free. Explained everything clearly and got amazing results."
              </p>
              <p className="font-bold">— Singer-Songwriter</p>
            </div>
          </div>
        </div>
      </section>

      {/* Location & Contact */}
      <section className="py-20 px-6 bg-gray-50">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl font-bold mb-6">Based in Manchester</h2>
          <p className="text-xl text-gray-700 mb-8">
            Professional recording studio serving independent artists across Manchester and the North West. 
            Remote mixing and mastering services available UK-wide.
          </p>
          <div className="flex gap-4 justify-center flex-wrap">
            <Link 
              href="/studio#booking" 
              className="bg-black text-white px-8 py-4 text-lg font-semibold hover:bg-gray-800 transition"
            >
              Book Your Session
            </Link>
            <Link 
              href="/contact" 
              className="border-2 border-black px-8 py-4 text-lg font-semibold hover:bg-black hover:text-white transition"
            >
              Get in Touch
            </Link>
          </div>
        </div>
      </section>

      {/* SEO Content */}
      <section className="py-20 px-6">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold mb-6">Recording Studio Manchester: Professional Services for Independent Artists</h2>
          <div className="prose prose-lg max-w-none text-gray-700 space-y-4">
            <p>
              Looking for a professional <strong>recording studio in Manchester</strong>? Our studio offers high-quality 
              recording, mixing, and mastering services designed specifically for independent artists, rappers, singers, 
              and producers who demand professional results without the premium price tag.
            </p>
            <p>
              With 6 years of experience in <strong>music production</strong> and engineering, we understand the unique 
              challenges independent artists face. Whether you're recording your debut single, working on an EP, or 
              need professional mixing and mastering for existing tracks, our Manchester studio provides the expertise 
              and equipment to bring your vision to life.
            </p>
            <p>
              Our services include <strong>vocal recording</strong>, <strong>beat production</strong>, <strong>mixing and mastering</strong>, 
              and <strong>Ableton tutoring</strong>. We work with artists across all genres, specializing in hip-hop, rap, 
              alternative, and electronic music. Competitive hourly rates start at just £30/hr for loyalty clients, with 
              package deals available for EPs and albums.
            </p>
            <p>
              Based in Manchester, we're easily accessible to artists across the North West, including Salford, Stockport, 
              Oldham, and surrounding areas. Remote mixing and mastering services are also available for artists anywhere 
              in the UK.
            </p>
            <p>
              Ready to take your music to the next level? <Link href="/studio#booking" className="underline font-medium">Book your studio session today</Link> or 
              <Link href="/contact" className="underline font-medium"> get in touch</Link> to discuss your project.
            </p>
          </div>
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
