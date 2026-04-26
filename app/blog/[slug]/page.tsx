import Link from "next/link";
import { notFound } from "next/navigation";
import Navigation from "../../components/Navigation";
import SiteFooter from "../../components/SiteFooter";

const blogPosts: Record<string, { title: string; date: string; category: string; readTime: string; content: string }> = {
  "preparing-first-studio-session": {
    title: "How to Prepare for Your First Studio Session",
    date: "2026-02-18",
    category: "Studio Tips",
    readTime: "5 min read",
    content: `
# How to Prepare for Your First Studio Session

Your first time recording in a professional studio can be intimidating. After six years of running sessions for independent artists in Manchester, I've seen every level of preparation—from artists who walk in ready to nail their vocals in one take, to those who waste their first hour figuring out what key their track is in.

Here's how to make the most of your studio time and money.

## Before You Book

### 1. Know Your Song Inside Out

This seems obvious, but you'd be surprised. Before you step into a studio:

- **Practice your vocals until you can do them in your sleep.** Studio time is expensive (£30-35/hr). Don't use it for rehearsal.
- **Know your lyrics front to back.** Print them out or have them on your phone, but memorize them if possible. Reading lyrics in the booth always sounds stiffer.
- **Record rough demos at home.** Even a phone recording helps. It shows me what you're going for and helps you identify problem areas before the session.

### 2. Have Your Instrumental Ready

If you're working with a producer or beatmaker:

- **Get the instrumental in advance.** Don't show up hoping to write to a beat you've never heard.
- **Request stems if possible.** Having separate tracks (drums, bass, melody) gives us more mixing flexibility.
- **Know the BPM and key.** This saves time and prevents awkward moments.

### 3. Set Clear Goals

What do you want to achieve in this session?

- Recording vocals for one track?
- Laying down multiple songs?
- Recording and mixing?

Be realistic about time. A 3-hour session can handle:
- 1-2 vocal recordings (with comping and editing)
- OR 1 vocal recording + rough mix
- NOT 5 songs from scratch unless they're very simple

## Day of the Session

### What to Bring

**Essential:**
- Your instrumental (WAV or high-quality MP3, on a USB or cloud link)
- Lyrics (printed or on phone/tablet)
- Water (room temperature, not ice cold—cold water tightens your vocal cords)
- Headphones (if you have a preferred pair)

**Optional but helpful:**
- Reference tracks (songs with a vibe you're going for)
- Any specific notes or ideas you want to try
- A friend for moral support (but not a crowd—too many opinions slow things down)

### Warm Up Your Voice

Don't walk into the studio cold. Do 10-15 minutes of vocal warmups before your session:

- Humming scales
- Lip trills
- Singing through your song a few times

This isn't just for singers—rappers benefit from warmups too. Your delivery will be cleaner and more confident.

## In the Studio

### Communication is Key

A good engineer will guide you, but you need to speak up:

- **If something doesn't sound right in your headphones, say so immediately.** We can't read your mind.
- **Ask questions.** There's no such thing as a stupid question. If you don't understand something, ask.
- **Give honest feedback.** If a take felt good but sounded off, or vice versa, tell me. We'll figure it out together.

### Don't Overthink It

Perfectionism kills momentum. Here's the truth:

- **Your first 3-5 takes are usually the best.** After that, you start overthinking and losing the energy.
- **Small imperfections add character.** A perfectly autotuned, time-aligned, overly polished vocal often sounds lifeless. Embrace the rawness.
- **Trust your engineer.** If I say we got it, we probably did. I've heard hundreds of takes—I know when it's good.

## Bottom Line

A great studio session comes down to preparation, communication, and trust. Come ready, stay open, and work with your engineer—not against them.

---

**Questions about recording?** [Get in touch](/contact) and I'll help you prepare for your session.
    `
  },
  "mixing-mistakes-independent-artists": {
    title: "5 Mixing Mistakes Every Independent Artist Makes",
    date: "2026-02-17",
    category: "Mixing & Mastering",
    readTime: "7 min read",
    content: `
# 5 Mixing Mistakes Every Independent Artist Makes

After mixing hundreds of tracks for independent artists in Manchester over the past six years, I've noticed patterns. The same mistakes show up again and again—not because artists are careless, but because mixing is technical and counterintuitive.

Here are the five biggest mistakes I see, and how to fix them.

## 1. Over-Compressing Vocals

**The Mistake:**
You want your vocals loud and upfront, so you crank the compressor until the vocal sits perfectly on top of the beat. Problem: it sounds lifeless, flat, and fatiguing to listen to.

**The Fix:**
- Use compression to control peaks, not flatten everything.
- Start with a ratio of 3:1 or 4:1 (not 8:1 or higher).
- Aim for 3-6dB of gain reduction, not 10-15dB.

## 2. Not Cutting Low-End Mud

**The Mistake:**
Your mix sounds fine on your laptop speakers or headphones, but on a real system it's muddy, boomy, and the bass is fighting with everything else.

**The Fix:**
- High-pass filter everything that isn't bass or kick.
- Cut, don't boost. If something sounds muddy, cut 200-400Hz.
- Reference your mix on different speakers.

## 3. Making Everything Loud

**The Mistake:**
Every element is at maximum volume. Result: a cluttered, fatiguing mess where nothing stands out.

**The Fix:**
- Start your mix with faders at -10dB to -15dB.
- Create a hierarchy. In most tracks: vocals are loudest, drums/bass next.
- Use automation for dynamic sections.

## 4. Relying on Mastering to Fix a Bad Mix

**The Mistake:**
Your mix sounds weak or messy, but you think the mastering engineer will fix it.

**The Fix:**
- Get your mix right first. Mastering makes a good mix great—it can't fix fundamental problems.
- If your mix doesn't sound good before mastering, it won't sound good after.

## 5. Not Using Reference Tracks

**The Mistake:**
You mix in a vacuum. Your mix sounds "good" to you, but compared to professional tracks it's thin, dull, or harsh.

**The Fix:**
- Load a reference track into your DAW from the same genre.
- A/B constantly. Listen to your mix, then the reference, then back.
- If you're not referencing, you're guessing.

---

**Want professional mixing?** [Book a session](/studio) with me. I offer mixing and mastering for independent artists in Manchester and beyond.
    `
  },
};

export async function generateMetadata({ params }: { params: { slug: string } }) {
  const post = blogPosts[params.slug];
  if (!post) return { title: "Post Not Found" };
  return {
    title: `${post.title} | Elcee the Alchemist`,
    description: post.content.substring(0, 155).replace(/[#*-]/g, '').trim(),
  };
}

function renderContent(content: string): string {
  return content
    .split('\n')
    .map((line: string) => {
      if (line.startsWith('# ')) return `<h1>${line.slice(2)}</h1>`;
      if (line.startsWith('## ')) return `<h2>${line.slice(3)}</h2>`;
      if (line.startsWith('### ')) return `<h3>${line.slice(4)}</h3>`;
      if (line.startsWith('- **') || line.startsWith('- ')) {
        const inner = line.slice(2).replace(/\*\*([^*]+)\*\*/g, '<strong>$1</strong>');
        return `<li>${inner}</li>`;
      }
      if (line.startsWith('---')) return `<hr />`;
      if (line.trim() === '') return '';
      const withLinks = line.replace(/\[([^\]]+)\]\(([^)]+)\)/g, '<a href="$2">$1</a>');
      const withBold = withLinks.replace(/\*\*([^*]+)\*\*/g, '<strong>$1</strong>');
      return `<p>${withBold}</p>`;
    })
    .join('');
}

export default function BlogPost({ params }: { params: { slug: string } }) {
  const post = blogPosts[params.slug];
  if (!post) notFound();

  return (
    <div style={{ background: '#080808', color: '#fafafa', minHeight: '100vh' }}>
      <Navigation />

      <article style={{ paddingTop: 120, paddingBottom: 80, paddingLeft: 48, paddingRight: 48 }}>
        <div style={{ maxWidth: 720, margin: '0 auto' }}>
          <Link href="/blog" style={{
            fontSize: 9, letterSpacing: '0.2em', textTransform: 'uppercase',
            color: 'rgba(255,255,255,0.35)', textDecoration: 'none', display: 'inline-block', marginBottom: 32,
          }}>
            ← Back to Blog
          </Link>

          <div style={{ display: 'flex', gap: 16, alignItems: 'center', marginBottom: 24, flexWrap: 'wrap' }}>
            <span style={{
              fontSize: 8, letterSpacing: '0.2em', textTransform: 'uppercase',
              padding: '4px 10px', border: '1px solid rgba(255,255,255,0.2)',
              color: 'rgba(255,255,255,0.5)',
            }}>{post.category}</span>
            <span style={{ fontSize: 11, color: 'rgba(255,255,255,0.25)' }}>{post.date}</span>
            <span style={{ fontSize: 11, color: 'rgba(255,255,255,0.25)' }}>·</span>
            <span style={{ fontSize: 11, color: 'rgba(255,255,255,0.25)' }}>{post.readTime}</span>
          </div>

          <h1 style={{ fontWeight: 900, fontSize: 'clamp(28px, 4vw, 56px)', letterSpacing: '-0.03em', lineHeight: 1.1, marginBottom: 48, borderBottom: '1px solid #1a1a1a', paddingBottom: 48 }}>
            {post.title}
          </h1>

          <div
            style={{ fontSize: 15, lineHeight: 1.9, color: 'rgba(255,255,255,0.65)' }}
            dangerouslySetInnerHTML={{ __html: renderContent(post.content) }}
          />
        </div>
      </article>

      {/* Inline style block for article typography */}
      <style>{`
        article h1 { font-weight: 900; font-size: clamp(22px, 3vw, 40px); letter-spacing: -0.02em; color: #fafafa; margin: 48px 0 16px; line-height: 1.15; }
        article h2 { font-weight: 900; font-size: clamp(18px, 2.5vw, 28px); letter-spacing: -0.01em; color: #fafafa; margin: 40px 0 12px; line-height: 1.2; }
        article h3 { font-weight: 900; font-size: 17px; color: #fafafa; margin: 32px 0 8px; }
        article p { margin-bottom: 16px; }
        article li { padding-left: 16px; position: relative; margin-bottom: 8px; }
        article li::before { content: '—'; position: absolute; left: 0; color: rgba(255,255,255,0.25); }
        article hr { border: none; border-top: 1px solid #1a1a1a; margin: 40px 0; }
        article strong { color: #fafafa; font-weight: 900; }
        article a { color: #fafafa; text-decoration: underline; }
      `}</style>

      {/* CTA — light section */}
      <section style={{ padding: '80px 48px', background: '#f0ede8', color: '#080808' }}>
        <div style={{ maxWidth: 640, margin: '0 auto', textAlign: 'center' }}>
          <div style={{ fontSize: 9, letterSpacing: '0.3em', textTransform: 'uppercase', color: 'rgba(0,0,0,0.4)', marginBottom: 16 }}>
            Ready to Work Together?
          </div>
          <h2 style={{ fontWeight: 900, fontSize: 'clamp(28px, 4vw, 56px)', letterSpacing: '-0.03em', textTransform: 'uppercase', lineHeight: 0.9, marginBottom: 20 }}>
            Book Studio Time
          </h2>
          <p style={{ fontSize: 14, lineHeight: 1.8, color: 'rgba(0,0,0,0.55)', marginBottom: 36 }}>
            Professional recording, mixing, and mastering services in Manchester.
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

export async function generateStaticParams() {
  return Object.keys(blogPosts).map((slug) => ({ slug }));
}
