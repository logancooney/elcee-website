import Image from "next/image";
import Link from "next/link";

export const metadata = {
  title: "Blog - Studio Tips & Music Insights | Elcee the Alchemist",
  description: "Music production tips, recording techniques, and insights from a Manchester recording studio engineer. Learn from 6 years of independent music experience.",
};

const blogPosts = [
  {
    slug: "preparing-first-studio-session",
    title: "How to Prepare for Your First Studio Session",
    excerpt: "First time recording in a professional studio? Here's everything you need to know to make the most of your session and avoid common mistakes.",
    date: "2026-02-18",
    category: "Studio Tips",
    readTime: "5 min read"
  },
  {
    slug: "mixing-mistakes-independent-artists",
    title: "5 Mixing Mistakes Every Independent Artist Makes",
    excerpt: "After mixing hundreds of tracks for independent artists, these are the most common mixing mistakes I see—and how to fix them.",
    date: "2026-02-17",
    category: "Mixing & Mastering",
    readTime: "7 min read"
  },
  {
    slug: "manchester-music-scene-2026",
    title: "The State of Manchester's Independent Music Scene in 2026",
    excerpt: "What's happening in Manchester's alternative and hip-hop scene right now, and why it's the best time to be an independent artist in the city.",
    date: "2026-02-16",
    category: "Music Industry",
    readTime: "6 min read"
  },
  {
    slug: "home-recording-vs-professional-studio",
    title: "Home Recording vs Professional Studio: When to Make the Switch",
    excerpt: "Recording at home has its place, but there comes a point where a professional studio is worth the investment. Here's how to know when.",
    date: "2026-02-15",
    category: "Studio Tips",
    readTime: "5 min read"
  },
  {
    slug: "vocal-recording-techniques",
    title: "Vocal Recording Techniques That Actually Work",
    excerpt: "From mic placement to room acoustics, here are the techniques I use to capture professional-quality vocals in my Manchester studio.",
    date: "2026-02-14",
    category: "Recording",
    readTime: "8 min read"
  },
];

export default function BlogPage() {
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
            <Link href="/blog" className="hover:text-gray-600 transition font-bold">Blog</Link>
            <Link href="/contact" className="hover:text-gray-600 transition">Contact</Link>
          </div>
        </div>
      </nav>

      {/* Header */}
      <section className="pt-32 pb-12 px-6">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-5xl md:text-6xl font-bold mb-6">Blog</h1>
          <p className="text-xl text-gray-600">
            Studio tips, music production insights, and perspectives from 6 years 
            as an independent artist and recording engineer in Manchester.
          </p>
        </div>
      </section>

      {/* Blog Posts Grid */}
      <section className="py-12 px-6">
        <div className="max-w-4xl mx-auto">
          <div className="space-y-12">
            {blogPosts.map((post) => (
              <article 
                key={post.slug}
                className="border-b border-black/10 pb-12 last:border-0"
              >
                <div className="flex gap-4 text-sm text-gray-500 mb-3">
                  <span className="bg-black text-white px-3 py-1">{post.category}</span>
                  <span>{post.date}</span>
                  <span>•</span>
                  <span>{post.readTime}</span>
                </div>
                
                <Link href={`/blog/${post.slug}`}>
                  <h2 className="text-3xl font-bold mb-4 hover:text-gray-600 transition">
                    {post.title}
                  </h2>
                </Link>
                
                <p className="text-lg text-gray-700 mb-4 leading-relaxed">
                  {post.excerpt}
                </p>
                
                <Link 
                  href={`/blog/${post.slug}`}
                  className="inline-block font-medium hover:underline"
                >
                  Read more →
                </Link>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-6 bg-black text-white">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl font-bold mb-6">Need Professional Recording?</h2>
          <p className="text-xl text-gray-300 mb-8">
            Book a session at my Manchester studio and get the quality your music deserves.
          </p>
          <Link 
            href="/studio"
            className="inline-block bg-white text-black px-8 py-4 text-lg font-semibold hover:bg-gray-200 transition"
          >
            View Studio Services
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
