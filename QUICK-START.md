# Quick Start - Get Bookings Working Now

**Goal:** Get email notifications working in 15 minutes.

---

## Step 1: Get API Key (5 mins)

1. Go to: **https://resend.com/signup**
2. Sign up with your email
3. Verify your email (check inbox)
4. Click **"API Keys"** in sidebar
5. Click **"Create API Key"**
6. Copy the key (starts with `re_`)

**Keep this tab open** - you'll need it in a moment.

---

## Step 2: Add to Vercel (5 mins)

1. Go to: **https://vercel.com/logancooney/elcee-website**
2. Click **"Settings"** tab
3. Click **"Environment Variables"** in sidebar
4. Add first variable:
   - **Name:** `RESEND_API_KEY`
   - **Value:** `re_your_actual_key_here` (paste from Step 1)
   - Click **"Save"**

5. Add second variable:
   - **Name:** `BOOKING_EMAIL`
   - **Value:** `elcee.mgmt@gmail.com`
   - Click **"Save"**

6. Click **"Deployments"** tab
7. Find the latest deployment
8. Click **⋯** (three dots)
9. Click **"Redeploy"**
10. Wait ~2 minutes

---

## Step 3: Test It (5 mins)

1. Go to: **https://elcee-website.vercel.app/studio**
2. Fill out the booking form with **your email**
3. Click **"Submit Booking Request"**
4. **Check your email** (should arrive in 30 seconds)
5. Check spam folder if not in inbox

**Expected email:**
- Subject: "New Studio Booking: [Service Name]"
- Professional HTML formatting
- All booking details
- From: onboarding@resend.dev (or bookings@elceethealchemist.com if you verify domain)

**You should also receive:**
- Confirmation email at the address you used
- Subject: "Studio Booking Request Received"

---

## ✅ Success!

If both emails arrived, **you're live!**

You can now:
- Share the website publicly
- Add link to Instagram bio
- Promote for studio bookings
- Start taking real clients

---

## 🚨 Troubleshooting

### Email didn't arrive?

**Check:**
1. Spam folder (especially Gmail)
2. Resend dashboard: https://resend.com/emails
3. Vercel logs: https://vercel.com/logancooney/elcee-website/logs
4. API key is correct in Vercel env vars

**Common fixes:**
- Wait 2 minutes (Vercel redeploy)
- Check API key doesn't have extra spaces
- Verify BOOKING_EMAIL is correct
- Try submitting again

### Still not working?

**Tell me:**
1. What error message you see (if any)
2. What's in Vercel logs (copy/paste)
3. Did Resend show email was sent?

I'll help debug!

---

## 🎨 Optional: Professional Email Address

Instead of emails from `onboarding@resend.dev`, use `bookings@elceethealchemist.com`:

1. **Resend Dashboard** → **Domains** → **Add Domain**
2. Enter: `elceethealchemist.com`
3. Add DNS records (at your domain registrar)
4. Wait ~10 minutes for DNS propagation
5. Click **"Verify"**

**DNS records to add:**
- Type: TXT
- Name: `@`
- Value: (Resend will tell you)

**Why bother?**
- More professional
- Better deliverability
- Builds trust with clients

**But honestly:** Not critical. The free onboarding email works fine.

---

## What's Next?

### Add Real Links (5 mins)
Replace placeholder links with your actual URLs:
- Spotify artist page
- Apple Music
- YouTube channel
- Instagram, TikTok, Twitter

See: `LINKS-TO-ADD.md` for instructions.

### Design Improvements
- Better spacing/typography
- Studio photo gallery
- Client testimonials
- Before/after audio examples

### More Features
- Google Calendar integration (show availability)
- Payment integration (deposits)
- Client portal (login, view bookings)

**Tell me what you want next!**

---

**Total time:** 15 minutes  
**Cost:** £0  
**Result:** Professional booking system ✅
