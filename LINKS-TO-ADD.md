# Links to Add Before Going Live

Replace all placeholder `#` links with real URLs.

## Music Platform Links (Homepage)

Find these in your artist accounts:

### Spotify
- Go to: https://artists.spotify.com/
- Find your artist profile
- Click "Share" → Copy Artist Link
- Example: `https://open.spotify.com/artist/XXXXX`
- **Add to:** `app/page.tsx` line ~40 (Spotify link)

### Apple Music
- Go to: https://music.apple.com/
- Search for "Elcee the Alchemist"
- Copy URL from address bar
- Example: `https://music.apple.com/artist/elcee-the-alchemist/XXXXX`
- **Add to:** `app/page.tsx` line ~47 (Apple Music link)

### YouTube
- Your channel URL
- Example: `https://www.youtube.com/@elceethealchemist`
- Or: `https://www.youtube.com/c/ElceeTheAlchemist`
- **Add to:** `app/page.tsx` line ~54 (YouTube link)

## Social Media Links (Homepage)

### Instagram
- `https://instagram.com/elceethealchemist`
- **Add to:** `app/page.tsx` line ~65 (Instagram link)

### TikTok
- `https://tiktok.com/@elceethealchemist`
- **Add to:** `app/page.tsx` line ~66 (TikTok link)

### Twitter
- `https://twitter.com/elceethealchemist`
- Or `https://x.com/elceethealchemist`
- **Add to:** `app/page.tsx` line ~67 (Twitter link)

### YouTube (same as above)
- **Add to:** `app/page.tsx` line ~68 (YouTube link again)

## How to Update

### Option 1: Edit Directly
```bash
cd /Users/logancooney/.openclaw/workspace/elcee-website
nano app/page.tsx
# Or use your preferred text editor
```

Find lines with `href="#"` and replace with real URLs.

### Option 2: Ask Me
When you're ready, send me:
- Spotify artist link
- Apple Music artist link  
- YouTube channel link
- Instagram handle
- TikTok handle
- Twitter handle

I'll update the file for you.

## After Adding Links

1. Save the file
2. Check dev server: http://localhost:3000
3. Click each link to verify they work
4. Redeploy to Vercel (automatic if using GitHub, or run `vercel --prod`)

## Optional: Add More Links

Consider adding:
- SoundCloud
- Bandcamp
- Audiomack
- Facebook
- Threads
- Discord

Add these to the social section in `app/page.tsx`.

## Service Agreement PDF

Upload your studio service agreement:
1. Save as PDF: `service-agreement.pdf`
2. Place in: `/Users/logancooney/.openclaw/workspace/elcee-website/public/`
3. Link works automatically (already coded)

If you don't have one yet, I can help create a basic service agreement template.
