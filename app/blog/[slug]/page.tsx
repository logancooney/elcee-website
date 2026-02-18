import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";

const blogPosts: Record<string, any> = {
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

### Be Open to Trying Things

Sometimes I'll suggest:

- Doubling a vocal line for emphasis
- Trying a different delivery style
- Adding adlibs or harmonies you didn't plan

Stay open. Some of the best moments happen spontaneously.

## After the Session

### What to Expect

- **Rough mix:** I'll usually send a rough mix within 24-48 hours so you can hear what we recorded.
- **Final mix/master:** If we're doing full mixing, expect 3-7 days depending on complexity.
- **Revisions:** Most engineers (including me) offer 2-3 rounds of revisions. Use them wisely—don't ask for major changes, but definitely speak up if something's not sitting right.

### Follow-Up

- **Provide clear feedback on the rough mix.** "Make it louder" isn't helpful. "The vocals feel buried—can we bring them up 2dB?" is.
- **Reference other tracks if you're struggling to articulate what you want.** "I want the vocal clarity of [Artist X]" gives me a target.
- **Be patient.** Mixing takes time. Rushing it leads to subpar results.

## Common First-Timer Mistakes

**1. Not hydrating properly**  
Your voice needs water. Start hydrating the day before your session, not 10 minutes before.

**2. Bringing too many people**  
A supportive friend? Great. Five friends with five different opinions? Disaster.

**3. Trying to record and mix in one session**  
Unless it's a very simple track, this rarely works well. Focus on getting a great recording first, then mix separately.

**4. Not trusting the process**  
You hired a professional. Trust their judgment. If something feels off, communicate—but don't micromanage every decision.

**5. Showing up late**  
Studio time is expensive. Being 15 minutes late means you just lost £7-10 and threw off the whole session's rhythm.

## Bottom Line

A great studio session comes down to preparation, communication, and trust. Come ready, stay open, and work with your engineer—not against them.

And if you're looking for a recording studio in Manchester, [book a session](/studio) with me. I specialize in working with independent artists who are serious about their sound but don't have major-label budgets.

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

**Why It Happens:**  
Compression makes quiet parts louder and loud parts quieter, creating a more consistent volume. But too much compression removes all the dynamics—the natural rise and fall that makes vocals feel human.

**The Fix:**  
- Use compression to control peaks, not flatten everything.
- Start with a ratio of 3:1 or 4:1 (not 8:1 or higher).
- Aim for 3-6dB of gain reduction, not 10-15dB.
- If you need more presence, use EQ or saturation instead of more compression.

**Rule of thumb:** If you mute the compressor and the vocal disappears, you're compressing too hard.

## 2. Not Cutting Low-End Mud

**The Mistake:**  
Your mix sounds fine on your laptop speakers or headphones, but on a real system it's muddy, boomy, and the bass is fighting with everything else.

**Why It Happens:**  
Most instruments—even vocals—have low-frequency content you don't need. This "mud" builds up and clutters your mix, especially between 200-500Hz.

**The Fix:**  
- **High-pass filter everything that isn't bass or kick.** Start around 80-100Hz for vocals, 100-150Hz for guitars, etc.
- **Cut, don't boost.** If something sounds muddy, cut 200-400Hz with a narrow EQ band. Don't boost highs to compensate—that just makes it harsh.
- **Reference your mix on different speakers.** What sounds fine on laptop speakers might be a mess on a real system.

**Rule of thumb:** If it's not the bass or kick drum, it probably doesn't need to be loud below 100Hz.

## 3. Making Everything Loud

**The Mistake:**  
Every element in your mix is at maximum volume because you want it all to be heard. Result: a cluttered, fatiguing mess where nothing stands out.

**Why It Happens:**  
When you're making music, every part feels important. But good mixing is about contrast—some things need to be quiet so others can shine.

**The Fix:**  
- **Start your mix with faders at -10dB to -15dB.** This gives you headroom and forces you to make intentional choices about what's loudest.
- **Create a hierarchy.** In most tracks: vocals are loudest, drums/bass next, then everything else. Don't fight this.
- **Use automation.** If a part only needs to be loud during the chorus, automate it—don't leave it blasting through the whole track.

**Rule of thumb:** If everything is loud, nothing is loud.

## 4. Relying on Mastering to Fix a Bad Mix

**The Mistake:**  
Your mix sounds weak, thin, or messy, but you think "the mastering engineer will fix it." Spoiler: they won't.

**Why It Happens:**  
Mastering is often misunderstood as magic fairy dust that makes everything sound professional. In reality, mastering is about making a *good mix* sound *great*—it can't fix fundamental mix problems.

**The Fix:**  
- **Get your mix right first.** If the vocal is buried, mastering won't suddenly make it audible. If the bass is muddy, mastering will just make it louder mud.
- **Master your own tracks if you're learning.** Use a reference track in the same genre and match its overall loudness and tone. Tools like Ozone or free alternatives can get you 80% there.
- **Hire a mastering engineer for important releases.** But only once your mix is actually finished.

**Rule of thumb:** If your mix doesn't sound good before mastering, it won't sound good after.

## 5. Not Using Reference Tracks

**The Mistake:**  
You mix in a vacuum, trusting your ears and your monitors. Your mix sounds "good" to you, but when you compare it to professional tracks, it's thin, dull, or harsh.

**Why It Happens:**  
Your ears adjust to what you're hearing. After an hour of mixing, you lose objectivity. What sounded "bright" at the start now sounds normal, so you keep adding more highs.

**The Fix:**  
- **Load a reference track into your DAW** from the same genre as your song. Match the loudness (turn the reference down to match your mix level).
- **A/B constantly.** Listen to your mix, then the reference, then your mix again. Pay attention to:
  - How loud is the vocal relative to the beat?
  - How much bass is there?
  - How bright are the hi-hats?
  - How wide does it feel?
- **Steal the vibe, not the sound.** You're not trying to copy the reference exactly—you're using it as a north star to stay objective.

**Rule of thumb:** If you're not referencing, you're guessing.

## Bonus: Mixing at Loud Volumes

Not technically one of the five, but it's worth mentioning: **don't mix at loud volumes.**

Loud volumes trick your ears into thinking the mix sounds better than it does (the Fletcher-Munson curve). You'll also fatigue your ears, making it impossible to judge accurately after an hour.

**Mix at conversational volume**—quiet enough that you can talk over it comfortably. Check your mix at loud volumes occasionally, but don't make decisions there.

## Bottom Line

Mixing is a skill that takes time to develop. These mistakes aren't signs you're bad at music—they're part of the learning process. The key is recognizing them and fixing them.

And if you'd rather leave the mixing to someone who's made all these mistakes (and learned from them), [book a mixing session](/studio) with me. I offer professional mixing and mastering for independent artists in Manchester and beyond.

---

**Want more mixing tips?** [Follow me on Instagram](https://instagram.com/elceethealchemist) where I share quick production insights and before/after examples.
    `
  },
  // Additional blog posts truncated for brevity - can add more later
};

export async function generateMetadata({ params }: { params: { slug: string } }) {
  const post = blogPosts[params.slug];
  
  if (!post) {
    return {
      title: "Post Not Found",
    };
  }

  return {
    title: `${post.title} | Elcee the Alchemist`,
    description: post.content.substring(0, 155),
  };
}

export default function BlogPost({ params }: { params: { slug: string } }) {
  const post = blogPosts[params.slug];

  if (!post) {
    notFound();
  }

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
            <Link href="/blog" className="hover:text-gray-600 transition">Blog</Link>
            <Link href="/contact" className="hover:text-gray-600 transition">Contact</Link>
          </div>
        </div>
      </nav>

      {/* Article Header */}
      <article className="pt-32 pb-20 px-6">
        <div className="max-w-3xl mx-auto">
          <Link 
            href="/blog"
            className="inline-block text-sm font-medium mb-6 hover:underline"
          >
            ← Back to Blog
          </Link>

          <div className="flex gap-4 text-sm text-gray-500 mb-4">
            <span className="bg-black text-white px-3 py-1">{post.category}</span>
            <span>{post.date}</span>
            <span>•</span>
            <span>{post.readTime}</span>
          </div>

          <h1 className="text-4xl md:text-5xl font-bold mb-8 leading-tight">
            {post.title}
          </h1>

          {/* Article Content */}
          <div 
            className="prose prose-lg max-w-none"
            dangerouslySetInnerHTML={{ 
              __html: post.content
                .split('\n')
                .map((line: string) => {
                  if (line.startsWith('# ')) return `<h1 class="text-4xl font-bold mt-12 mb-6">${line.slice(2)}</h1>`;
                  if (line.startsWith('## ')) return `<h2 class="text-3xl font-bold mt-10 mb-4">${line.slice(3)}</h2>`;
                  if (line.startsWith('### ')) return `<h3 class="text-2xl font-bold mt-8 mb-3">${line.slice(4)}</h3>`;
                  if (line.startsWith('**') && line.endsWith('**')) return `<p class="font-bold mt-4 mb-2">${line.slice(2, -2)}</p>`;
                  if (line.startsWith('- ')) return `<li class="ml-6">${line.slice(2)}</li>`;
                  if (line.startsWith('---')) return `<hr class="my-8 border-black/10" />`;
                  if (line.trim() === '') return '<br />';
                  if (line.includes('[') && line.includes('](')) {
                    const linkRegex = /\[([^\]]+)\]\(([^\)]+)\)/g;
                    return `<p class="mb-4 leading-relaxed">${line.replace(linkRegex, '<a href="$2" class="underline font-medium">$1</a>')}</p>`;
                  }
                  return `<p class="mb-4 leading-relaxed">${line}</p>`;
                })
                .join('')
            }}
          />
        </div>
      </article>

      {/* CTA Section */}
      <section className="py-20 px-6 bg-black text-white">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl font-bold mb-6">Ready to Work Together?</h2>
          <p className="text-xl text-gray-300 mb-8">
            Professional recording, mixing, and mastering services in Manchester.
          </p>
          <Link 
            href="/studio"
            className="inline-block bg-white text-black px-8 py-4 text-lg font-semibold hover:bg-gray-200 transition"
          >
            Book Studio Time
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

export async function generateStaticParams() {
  return Object.keys(blogPosts).map((slug) => ({
    slug,
  }));
}
