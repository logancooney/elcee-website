import Link from "next/link";
import Navigation from "../components/Navigation";
import SiteFooter from "../components/SiteFooter";

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
    readTime: "5 min read",
  },
  {
    slug: "mixing-mistakes-independent-artists",
    title: "5 Mixing Mistakes Every Independent Artist Makes",
    excerpt: "After mixing hundreds of tracks for independent artists, these are the most common mixing mistakes I see — and how to fix them.",
    date: "2026-02-17",
    category: "Mixing & Mastering",
    readTime: "7 min read",
  },
  {
    slug: "manchester-music-scene-2026",
    title: "The State of Manchester's Independent Music Scene in 2026",
    excerpt: "What's happening in Manchester's alternative and hip-hop scene right now, and why it's the best time to be an independent artist in the city.",
    date: "2026-02-16",
    category: "Music Industry",
    readTime: "6 min read",
  },
  {
    slug: "home-recording-vs-professional-studio",
    title: "Home Recording vs Professional Studio: When to Make the Switch",
    excerpt: "Recording at home has its place, but there comes a point where a professional studio is worth the investment. Here's how to know when.",
    date: "2026-02-15",
    category: "Studio Tips",
    readTime: "5 min read",
  },
  {
    slug: "vocal-recording-techniques",
    title: "Vocal Recording Techniques That Actually Work",
    excerpt: "From mic placement to room acoustics, here are the techniques I use to capture professional-quality vocals in my Manchester studio.",
    date: "2026-02-14",
    category: "Recording",
    readTime: "8 min read",
  },
];

export default function BlogPage() {
  return (
    <div style={{ background: '#080808', color: '#fafafa', minHeight: '100vh' }}>
      <Navigation />

      {/* Hero */}
      <section style={{ paddingTop: 120, paddingBottom: 80, paddingLeft: 48, paddingRight: 48 }}>
        <div style={{ maxWidth: 900, margin: '0 auto' }}>
          <div style={{ fontSize: 9, letterSpacing: '0.3em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.3)', marginBottom: 16 }}>
            Studio Insights
          </div>
          <h1 style={{ fontWeight: 900, fontSize: 'clamp(40px, 6vw, 96px)', letterSpacing: '-0.03em', textTransform: 'uppercase', lineHeight: 0.9, marginBottom: 24 }}>
            Blog
          </h1>
          <p style={{ fontSize: 16, lineHeight: 1.8, color: 'rgba(255,255,255,0.45)', maxWidth: 520 }}>
            Studio tips, production insights, and perspectives from 6 years as an independent artist and recording engineer in Manchester.
          </p>
        </div>
      </section>

      {/* Posts */}
      <section style={{ padding: '0 48px 80px', borderTop: '1px solid #1a1a1a' }}>
        <div style={{ maxWidth: 900, margin: '0 auto' }}>
          {blogPosts.map((post, i) => (
            <article key={post.slug} style={{
              paddingTop: 48, paddingBottom: 48,
              borderBottom: i < blogPosts.length - 1 ? '1px solid #1a1a1a' : 'none',
            }}>
              <div style={{ display: 'flex', gap: 16, alignItems: 'center', marginBottom: 16, flexWrap: 'wrap' }}>
                <span style={{
                  fontSize: 8, letterSpacing: '0.2em', textTransform: 'uppercase',
                  padding: '4px 10px', border: '1px solid rgba(255,255,255,0.2)',
                  color: 'rgba(255,255,255,0.5)',
                }}>{post.category}</span>
                <span style={{ fontSize: 11, color: 'rgba(255,255,255,0.25)', letterSpacing: '0.05em' }}>{post.date}</span>
                <span style={{ fontSize: 11, color: 'rgba(255,255,255,0.25)' }}>·</span>
                <span style={{ fontSize: 11, color: 'rgba(255,255,255,0.25)', letterSpacing: '0.05em' }}>{post.readTime}</span>
              </div>
              <Link href={`/blog/${post.slug}`} style={{ textDecoration: 'none', color: 'inherit' }}>
                <h2 style={{ fontWeight: 900, fontSize: 'clamp(20px, 2.5vw, 32px)', letterSpacing: '-0.02em', lineHeight: 1.15, marginBottom: 12 }}>
                  {post.title}
                </h2>
              </Link>
              <p style={{ fontSize: 14, lineHeight: 1.8, color: 'rgba(255,255,255,0.45)', maxWidth: 600, marginBottom: 20 }}>
                {post.excerpt}
              </p>
              <Link href={`/blog/${post.slug}`} style={{
                fontSize: 9, letterSpacing: '0.2em', textTransform: 'uppercase',
                color: 'rgba(255,255,255,0.5)', textDecoration: 'none',
              }}>
                Read More →
              </Link>
            </article>
          ))}
        </div>
      </section>

      {/* CTA — light section */}
      <section style={{ padding: '80px 48px', background: '#f0ede8', color: '#080808' }}>
        <div style={{ maxWidth: 640, margin: '0 auto', textAlign: 'center' }}>
          <div style={{ fontSize: 9, letterSpacing: '0.3em', textTransform: 'uppercase', color: 'rgba(0,0,0,0.4)', marginBottom: 16 }}>
            Need Professional Recording?
          </div>
          <h2 style={{ fontWeight: 900, fontSize: 'clamp(28px, 4vw, 56px)', letterSpacing: '-0.03em', textTransform: 'uppercase', lineHeight: 0.9, marginBottom: 20 }}>
            Book a Session
          </h2>
          <p style={{ fontSize: 14, lineHeight: 1.8, color: 'rgba(0,0,0,0.55)', marginBottom: 36 }}>
            Get the quality your music deserves. Manchester studio, professional results.
          </p>
          <Link href="/studio" style={{
            display: 'inline-flex', alignItems: 'center', padding: '13px 28px',
            fontWeight: 900, fontSize: 10, letterSpacing: '0.18em', textTransform: 'uppercase',
            background: '#080808', color: '#fafafa', textDecoration: 'none',
          }}>
            View Studio Services
          </Link>
        </div>
      </section>

      <SiteFooter />
    </div>
  );
}
