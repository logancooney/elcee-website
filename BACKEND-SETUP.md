# Backend Setup Guide

## Current Status
✅ Booking form UI complete  
✅ Form validation working  
✅ API endpoint created (`/api/booking`)  
⚠️ Email service ready but needs API key  
⚠️ Logs to Vercel console (temporary fallback)  

---

## Email Notifications Setup (15 minutes)

### Step 1: Get Resend API Key

1. **Sign up:** https://resend.com/signup
2. **Verify email**
3. **Go to:** API Keys → Create API Key
4. **Copy the key** (starts with `re_`)

### Step 2: Add to Vercel

1. **Go to:** https://vercel.com/logancooney/elcee-website
2. **Settings** → **Environment Variables**
3. **Add these:**

```
RESEND_API_KEY = re_your_actual_key_here
BOOKING_EMAIL = elcee.mgmt@gmail.com
```

4. **Click:** Add
5. **Redeploy:** Deployments → (latest) → ⋯ → Redeploy

### Step 3: Verify Domain (for professional emails)

To send from `bookings@elceethealchemist.com` instead of `onboarding@resend.dev`:

1. **Resend Dashboard** → Domains → Add Domain
2. **Enter:** elceethealchemist.com
3. **Add DNS records** (at your domain registrar):
   - SPF: `v=spf1 include:_spf.resend.com ~all`
   - DKIM: (they'll give you a record)
4. **Wait** ~10 minutes for DNS propagation
5. **Verify** in Resend dashboard

**OR** skip this step and use `onboarding@resend.dev` (works fine, just less professional)

---

## Testing

### Before Email Setup
- Form logs to Vercel console
- Check: Vercel Dashboard → Project → Logs
- You'll see booking details there

### After Email Setup
1. **Submit test booking** on live site
2. **Check your email** (should arrive instantly)
3. **Customer gets confirmation** email automatically
4. **Verify Vercel logs** show success

**Test Booking:**
- Name: Test Customer
- Email: your-email@gmail.com
- Service: Recording & Engineering
- Submit → Check inbox

---

## What Happens When Someone Books

### Current (No API Key)
1. Customer fills form ✅
2. Data validated ✅
3. Logged to Vercel console ✅
4. Success message shown ✅
5. ⚠️ **You have to check Vercel logs manually**

### After Setup (With API Key)
1. Customer fills form ✅
2. Data validated ✅
3. **Email sent to you instantly** ✅
4. **Customer gets confirmation email** ✅
5. Logged to Vercel console ✅
6. Success message shown ✅

---

## Alternative: Google Sheets CRM

If you want bookings saved to a spreadsheet instead:

### Setup (30 minutes)

1. **Google Cloud Console**
   - Create project
   - Enable Google Sheets API
   - Create service account
   - Download credentials JSON

2. **Create Google Sheet**
   - Columns: Timestamp, Name, Email, Phone, Service, Date, Time, Message, Status
   - Share with service account email

3. **Add to Vercel**
   - Upload credentials JSON as environment variable
   - Or add individual values

4. **Update code** (I can do this when ready)

**Benefits:**
- All bookings in one place
- Easy to filter/sort/export
- Track booking status
- Build client database

---

## Monitoring

### Check Booking Activity

**Vercel Dashboard:**
- Deployments → Latest → Logs
- Filter by "booking" or "✅"
- See all submissions + email status

**Resend Dashboard:**
- See all sent emails
- Delivery status
- Bounce/spam reports

### Common Issues

**Not receiving emails:**
1. Check Resend API key is correct
2. Verify BOOKING_EMAIL is set
3. Check spam folder
4. Look at Vercel logs for errors

**Customer not getting confirmation:**
- Non-critical (you'll still get notified)
- Check their email in spam
- Verify Resend domain setup

**Form not submitting:**
- Check browser console for errors
- Verify API route deployed
- Check Vercel function logs

---

## Cost

**Resend Free Tier:**
- 3,000 emails/month
- 100 emails/day
- Perfect for studio bookings

**Estimate:**
- 50 bookings/month = 100 emails (50 to you, 50 confirmations)
- Well within free tier

**If you exceed:**
- $10/month for 50,000 emails
- Highly unlikely for studio bookings

---

## Next Steps

**Priority 1 (NOW):**
1. Get Resend API key
2. Add to Vercel
3. Test booking form

**Priority 2 (LATER):**
1. Verify domain for professional emails
2. Add Google Sheets integration
3. Set up calendar sync

---

## When You're Ready

**Give me:**
- Resend API key (I'll add to Vercel securely)

**Or do it yourself:**
1. Follow steps above
2. Test with your email
3. Let me know if issues

I'll be here to help troubleshoot! 🙂‍↕️
