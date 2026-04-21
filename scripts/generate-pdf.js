const puppeteer = require('puppeteer-core');
const path = require('path');
const fs = require('fs');

const PUBLIC_DIR = path.join(__dirname, '..', 'public');
const OUTPUT = path.join(PUBLIC_DIR, 'home-recording-guide.pdf');

const logoWhite = fs.readFileSync(path.join(PUBLIC_DIR, 'logo-white.png')).toString('base64');
const ankh = fs.readFileSync(path.join(PUBLIC_DIR, 'ankh.png')).toString('base64');
const bg = fs.readFileSync(path.join(PUBLIC_DIR, 'pdf-bg.jpg')).toString('base64');
const nimbusSansBlack = fs.readFileSync('/Users/logancooney/Library/Application Support/Adobe/CoreSync/plugins/livetype/.r/.10799.otf').toString('base64');

const sections = [
  {
    number: '01',
    title: 'Your room is not the problem. Your relationship with it is.',
    pull: 'Every room has a sound. The artists who record well at home are the ones who actually know what theirs sounds like.',
    body: `<p>Most artists spend months worrying about their room acoustics and not a single day learning what their room actually sounds like. Those are completely different things.</p>
<p>Record a dry clap in different corners of the room. Record yourself speaking at different distances from the mic. Then listen back on headphones. You will hear your room for the first time — the flutter, the low-end buildup, where it is dead and where it rings. That knowledge is worth more than any acoustic panel you could buy.</p>
<p>Comfort matters too, and nobody talks about it honestly. Some of the best takes I have captured came from artists who refused to record in the studio because their bedroom is where they feel like themselves. A technically imperfect room with a fully present performer beats a treated room with a nervous one every time.</p>`,
  },
  {
    number: '02',
    title: 'A clipped vocal cannot be fixed. Not in the mix. Not anywhere.',
    pull: 'People set their gain at conversational volume, then perform at full intensity. That is where recordings die.',
    body: `<p>When audio clips, the waveform physically cannot hold the information. It cuts off, and that cut is permanent. By the time it reaches an engineer there is nothing to be done with it.</p>
<p>The fix is simple and almost everyone gets it wrong the same way: they set their gain while speaking normally, then deliver at full emotional intensity and wonder why the recording sounds blown out.</p>
<p>Before you record anything, perform at the absolute loudest you will reach in the session. Your most aggressive hook. Your loudest ad-lib. The moment where you always lose control. Set your gain there. Everything else sits safely below it, and you have room to work with.</p>`,
  },
  {
    number: '03',
    title: 'The microphone is the last thing worth upgrading.',
    pull: 'I have recorded vocals on wired Apple earphones. The track sounded exactly how it needed to sound.',
    body: `<p>The signal chain goes: voice, into a microphone, into a preamp, into an interface, into your computer. Every step affects the result, and the mic is only one of them.</p>
<p>Before spending money on a microphone, ask honestly whether you have addressed everything before it — your room, your technique, your distance and angle — and everything that processes it after. Most artists who tell me their mic is the problem are actually struggling with their room or their habits. A better mic in the same situation gives them a more expensive version of the same result.</p>
<p>There is also a creative question nobody asks: what does this recording actually need to sound like? The right mic is the one that suits the sound you are making. If the destination is lo-fi, gritty, or heavily processed, a high-end condenser is not a starting point — it is a detour.</p>`,
  },
  {
    number: '04',
    title: 'There is already reverb in your recording. Everything you add goes on top of it.',
    pull: 'You cannot stack reverb on a reverberant recording and expect it to feel like the sound is in one place.',
    body: `<p>Every recording made in an untreated room has reverb baked in before you touch a single plugin. The reflections from your walls, floor, and ceiling are in the take permanently.</p>
<p>This is not always a problem — plenty of records use room sound deliberately. But it changes how you handle everything in the mix. If you add reverb without knowing how much is already there, the result is a vocal that sounds washed out and unfocused: two different reverbs fighting each other in two different spaces.</p>
<p>To check what your room is doing, record yourself at normal distance and listen back at high volume on headphones. You will hear exactly what is in there. If it is a lot, move closer, add soft furnishings around you, or commit to it as a deliberate texture. What you cannot do is pretend it is not there.</p>`,
  },
  {
    number: '05',
    title: 'Your reflection shield is only solving half the problem.',
    pull: 'The reflection from above your head is just as damaging as the one behind the mic. Almost nobody addresses it.',
    body: `<p>A reflection shield absorbs reflections from behind the microphone capsule. It does what it is built to do. The problem is that sound also reflects off your ceiling and anything above and around the mic that the shield does not cover.</p>
<p>Put a pillow on top of your reflection shield. Rest it across the top to create a soft ceiling above the mic. This kills the ceiling reflection that most home setups completely ignore, and it noticeably cleans up the top end of a home recording.</p>
<p>If you want to go further: record in a wardrobe full of clothes. Clothes on all sides, clothes above you, absorbing every reflection before it reaches the capsule. It costs nothing, it is already in your house, and it outperforms most acoustic treatment people spend serious money on.</p>`,
  },
  {
    number: '06',
    title: 'Where you breathe is a technical decision. Start treating it like one.',
    pull: 'If you are running out of breath mid-line, the listener hears it. Not sometimes — every single time.',
    body: `<p>Running out of breath is not a performance issue. It is a preparation issue, and it is the most preventable mistake in home recording.</p>
<p>Before you record a take, go through the lyric line by line and decide exactly where you are breathing. Not roughly, not in the moment — decided in advance, marked if necessary, practiced until it is automatic. A breath in the wrong place chops a phrase and drains it of meaning. A breath in the right place adds tension, space, or emphasis. It becomes part of the delivery.</p>
<p>Beyond placement, breath support is what keeps your pitch stable and your tone full. Performing on almost no air produces a thin, strained sound that no processing fixes. Fill before you deliver.</p>`,
  },
  {
    number: '07',
    title: 'The microphone does not care how loud you are. It only cares about the truth.',
    pull: 'A whisper recorded close to a good microphone can carry more weight than a shout from three feet away.',
    body: `<p>A microphone is not a live sound system. It picks up what is in front of it with the same intimacy at low volume as at high volume. Artists from a live background often oversing in the studio because they are projecting to the back of a room that does not exist.</p>
<p>Proximity changes your voice dramatically. Moving closer adds warmth and body. Moving back opens the sound and reduces intimacy. Experiment with both before you decide your voice sounds a particular way — a few inches makes more difference than most people realise.</p>
<p>Projection is about the energy behind what you are delivering, not the volume. The artists who understand this can drop to almost nothing and still hold you. The microphone picks up emotional truth, and it is brutally honest about when it is missing.</p>`,
  },
  {
    number: '08',
    title: 'Every time you move during a take, you give the engineer a problem to solve.',
    pull: 'The takes engineers love to work with are the ones where every dynamic comes from the voice, not the body.',
    body: `<p>A recording session produces raw material for a mix. The quality of that material sets the ceiling of what the mix can achieve.</p>
<p>Inconsistent delivery — drifting closer on quieter phrases, pulling back when the intensity rises, shifting angle or posture mid-take — creates a vocal that is changing tonally for reasons nothing to do with your performance. You might think you are being expressive. What you are actually doing is making it impossible for an engineer to process the vocal uniformly, because the sound is different from line to line in ways that cannot be corrected afterwards.</p>
<p>Find your position before you start. Distance from the mic, angle to the capsule, footing. Then commit to it completely. If a moment calls for more intensity, give it with your voice. Stay in your spot. Consistency in a recording is invisible when it is there — you only notice it by its absence.</p>`,
  },
];

const bgLayer = `<img src="data:image/jpeg;base64,${bg}" style="position:absolute;inset:0;width:100%;height:100%;object-fit:cover;z-index:0;display:block;"/>`;

function sectionPage(s) {
  return `
<div class="page section-page">
  ${bgLayer}
  <div class="page-inner">
    <div class="section-bg-number">${s.number}</div>

    <div class="section-content">
      <div class="section-top">
        <span class="section-num-label">${s.number}</span>
        <div class="section-rule"></div>
      </div>
      <h2 class="section-title">${s.title}</h2>
      <p class="section-pull">${s.pull}</p>
      <div class="section-body">${s.body}</div>
    </div>

    <div class="page-footer">
      <img class="footer-logo" src="data:image/png;base64,${logoWhite}" alt="Elcee The Alchemist">
      <span class="footer-label">Home Recording Guide for Vocalists</span>
      <span class="footer-url">elceethealchemist.com</span>
    </div>
  </div>
</div>`;
}

const html = `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<link href="https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@300;400;500;600;700&display=swap" rel="stylesheet">
<style>
@font-face {
  font-family: 'Nimbus Sans Black';
  src: url('data:font/otf;base64,${nimbusSansBlack}') format('opentype');
  font-weight: 900;
  font-style: normal;
}

* { margin: 0; padding: 0; box-sizing: border-box; }

body {
  background: #000;
  color: #fff;
  font-family: 'Space Grotesk', sans-serif;
  -webkit-print-color-adjust: exact;
  print-color-adjust: exact;
}

.page {
  width: 210mm;
  height: 297mm;
  position: relative;
  overflow: hidden;
  page-break-after: always;
}

/* Full-bleed inner wrapper — sits above bg image */
.page-inner {
  position: absolute;
  inset: 0;
  z-index: 10;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  padding: 52px 56px 52px;
}

/* ── COVER ── */
.cover .page-inner {
  align-items: center;
  justify-content: flex-start;
  padding-top: 56px;
  text-align: center;
}

.cover-logo {
  width: 240px;
  margin-bottom: 44px;
}

.cover-eyebrow {
  font-size: 10px;
  letter-spacing: 3.5px;
  text-transform: uppercase;
  color: #fff;
  margin-bottom: 16px;
  font-weight: 500;
}

.cover-title {
  font-family: 'Nimbus Sans Black', sans-serif;
  font-size: 76px;
  line-height: 0.9;
  letter-spacing: -0.04em;
  color: #fff;
  max-width: 460px;
  margin-bottom: 24px;
}

.cover-rule {
  width: 40px;
  height: 2px;
  background: #fff;
  margin: 0 auto 20px;
}

.cover-subtitle {
  font-size: 12px;
  font-weight: 300;
  color: #fff;
  line-height: 1.7;
  max-width: 280px;
}

/* ── SECTION PAGES ── */
.section-bg-number {
  font-family: 'Nimbus Sans Black', sans-serif;
  font-size: 300px;
  line-height: 1;
  color: rgba(255,255,255,0.15);
  position: absolute;
  right: -20px;
  top: -10px;
  letter-spacing: -0.04em;
  user-select: none;
  pointer-events: none;
}

.section-content {
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding: 16px 0;
  position: relative;
}

.section-top {
  display: flex;
  align-items: center;
  gap: 16px;
  margin-bottom: 28px;
}

.section-num-label {
  font-family: 'Bebas Neue', sans-serif;
  font-size: 14px;
  color: #fff;
  letter-spacing: 4px;
}

.section-rule {
  flex: 1;
  height: 1px;
  background: rgba(255,255,255,0.1);
  max-width: 380px;
}

.section-title {
  font-family: 'Nimbus Sans Black', sans-serif;
  font-size: 28px;
  line-height: 1.1;
  letter-spacing: -0.04em;
  color: #fff;
  max-width: 460px;
  margin-bottom: 18px;
}

.section-pull {
  font-size: 14.5px;
  font-weight: 500;
  color: #fff;
  max-width: 460px;
  margin-bottom: 18px;
  line-height: 1.55;
  font-style: italic;
}

.section-body {
  font-size: 12.5px;
  font-weight: 400;
  color: #fff;
  line-height: 1.8;
  max-width: 460px;
}

.section-body p {
  margin-bottom: 12px;
}
.section-body p:last-child {
  margin-bottom: 0;
}

/* ── FOOTER ── */
.page-footer {
  display: flex;
  align-items: center;
  justify-content: space-between;
  border-top: 1px solid rgba(255,255,255,0.25);
  padding-top: 14px;
  /* leave room for ankh baked into bg at bottom */
  margin-bottom: 36px;
}

.footer-logo { width: 80px; opacity: 0.7; }
.footer-label { font-size: 8.5px; color: #fff; letter-spacing: 1.5px; text-transform: uppercase; }
.footer-url { font-size: 8.5px; color: #fff; letter-spacing: 1px; }

/* ── BACK PAGE ── */
.back-page .page-inner {
  align-items: center;
  justify-content: center;
  text-align: center;
}

.back-content { display: flex; flex-direction: column; align-items: center; }

.back-rule {
  width: 32px;
  height: 2px;
  background: #fff;
  margin-bottom: 32px;
}

.back-heading {
  font-family: 'Nimbus Sans Black', sans-serif;
  font-size: 52px;
  line-height: 0.95;
  color: #fff;
  max-width: 360px;
  margin-bottom: 20px;
  letter-spacing: -0.04em;
}

.back-body {
  font-size: 13px;
  font-weight: 300;
  color: #fff;
  max-width: 300px;
  line-height: 1.8;
  margin-bottom: 28px;
}

.back-cta {
  font-size: 13px;
  font-weight: 600;
  color: #fff;
  letter-spacing: 1px;
  margin-bottom: 60px;
}

.back-logo { width: 160px; opacity: 0.45; }
</style>
</head>
<body>

<!-- COVER -->
<div class="page cover">
  ${bgLayer}
  <div class="page-inner">
    <img class="cover-logo" src="data:image/png;base64,${logoWhite}" alt="Elcee The Alchemist">
    <div class="cover-rule"></div>
    <p class="cover-eyebrow">Free Guide</p>
    <h1 class="cover-title">Home Recording Guide for Vocalists</h1>
    <p class="cover-subtitle">8 things that actually make the difference — from someone who records for a living.</p>
  </div>
</div>

<!-- SECTION PAGES -->
${sections.map(sectionPage).join('\n')}

<!-- BACK PAGE -->
<div class="page back-page">
  ${bgLayer}
  <div class="page-inner">
    <div class="back-content">
      <div class="back-rule"></div>
      <h2 class="back-heading">Want to talk through your setup?</h2>
      <p class="back-body">Happy to jump on a call and go through it with you. I run a recording studio so this is something I work with every day.</p>
      <p class="back-cta">elceethealchemist.com/free</p>
      <img class="back-logo" src="data:image/png;base64,${logoWhite}" alt="Elcee The Alchemist">
    </div>
  </div>
</div>

</body>
</html>`;

async function generate() {
  const tmpHtml = path.join(PUBLIC_DIR, '_tmp_pdf.html');
  fs.writeFileSync(tmpHtml, html);

  const browser = await puppeteer.launch({
    executablePath: '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome',
    headless: 'new',
    args: ['--no-sandbox', '--allow-file-access-from-files'],
  });

  const page = await browser.newPage();
  await page.goto(`file://${tmpHtml}`, { waitUntil: 'networkidle0', timeout: 60000 });
  await page.pdf({
    path: OUTPUT,
    format: 'A4',
    printBackground: true,
    margin: { top: 0, right: 0, bottom: 0, left: 0 },
  });

  await browser.close();
  fs.unlinkSync(tmpHtml);
  console.log('PDF saved to:', OUTPUT);
}

generate().catch(console.error);
