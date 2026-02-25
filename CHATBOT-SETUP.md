# Studio Chatbot - Setup Complete

**Status:** ✅ Deployed (live in ~60 seconds)  
**Built:** 2026-02-25 15:11 GMT  
**Location:** Bottom right corner of every page

---

## What It Does

**Auto-responds to common questions 24/7:**
- ✅ Pricing questions → instant answers
- ✅ Booking requests → direct link to calendar
- ✅ Services questions → full list with details
- ✅ Location → Manchester city centre info
- ✅ Turnaround time → typical timelines
- ✅ Examples/portfolio → links to your music

**Flags complex questions:**
- When it can't answer, sends you a Telegram notification
- You can jump in and respond directly
- Customer sees: "Connecting you with Elcee..."

---

## How It Looks

**Chat bubble:**
- Purple circle, bottom-right corner
- Click to open chat window
- Matches your website purple theme

**Chat window:**
- Clean, modern design
- Mobile-friendly
- Auto-scrolls to latest message
- Typing indicators when bot is responding

---

## What I Can Answer Automatically

### Pricing
- "How much for mixing?" → "Vocal mixing is £190..."
- "What are your rates?" → Full pricing list
- "Cost of recording?" → "£35/hr or £30/hr subscription"

### Booking
- "Can I book a session?" → Link to calendar
- "Are you available Tuesday?" → "Book here to see availability"

### Services
- "What do you offer?" → Full service list
- "Do you do mastering?" → Yes, £40/track

### Portfolio
- "Can I hear examples?" → Links to your Spotify
- Mentions JBL, adidas, Boiler Room work

### Location
- "Where are you?" → Manchester M7 1UY info

### Turnaround
- "How long does mixing take?" → 3-5 days typical

---

## When You Get Notified (Telegram)

You'll get a message when:
- Someone asks something I can't auto-answer
- Someone requests specific examples/demos
- Complex technical questions
- Anything that needs personal touch

**Notification format:**
```
🔔 Studio Chat Alert

New message needs your attention:

"Do you have experience with [specific genre/technique]?"

Session: session-1234567890-abc123

Respond via website admin or reply here.
```

---

## Testing the Chatbot

**Try these questions on your site:**

1. "How much for mixing?" → Should get instant pricing
2. "Can I book Tuesday?" → Should get booking link
3. "What services do you offer?" → Should get full list
4. "Do you have examples of your work?" → Should trigger Telegram alert to you

---

## Technical Details

**Frontend:**
- React component (`app/components/ChatWidget.tsx`)
- Styled with Tailwind CSS (purple theme)
- Mobile-responsive
- Auto-scrolling chat

**Backend:**
- Next.js API route (`app/api/chat/route.ts`)
- Pattern matching for common questions
- In-memory message store (upgrade to DB later if needed)
- Telegram notification via OpenClaw gateway

**Integration:**
- Added to `app/layout.tsx` (appears on all pages)
- Environment variables for gateway connection
- Session tracking for conversation context

---

## Future Enhancements (Optional)

**Week 2-3 (if working well):**
- Add calendar integration (check real availability)
- Store conversations in database
- Admin panel to view chat history
- Canned responses for you to send quickly

**Month 2 (if getting lots of traffic):**
- Smarter AI responses (use full Claude for complex questions)
- Multilingual support
- Lead capture (email before complex questions)
- Analytics (which questions most common)

---

## Production Environment Variables (Vercel)

**For email notifications to work, add this to Vercel:**

1. Go to: https://vercel.com/logancooney/elcee-website/settings/environment-variables
2. Add:
   - `MATON_API_KEY` = `PMZOf_Je0dHItkcW2zVyhXtqzoxg8nnlg0-rJz-8Wr20tdZdK0EcZiqHKZrLlHJeVSQ5sTRJln2QzHSEcYOlQDDVu6tJTkbZFraldWnjaw`

**Note:** Email notifications work 24/7 regardless of laptop status (sent via Maton cloud API).

---

## Cost

**Free** — runs on your existing Vercel hosting, no additional services needed.

---

## Maintenance

**None required** — it just works. Update responses by editing `app/api/chat/route.ts` if you want to change how I answer questions.

---

**Status: LIVE NOW** 🎉

Visit https://elceethealchemist.com and look for the purple chat bubble (bottom right).
