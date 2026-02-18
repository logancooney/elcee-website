# Testing Checklist

## Before Adding API Key

### ✅ Test Form Validation
1. Go to: https://elcee-website.vercel.app/studio
2. Try submitting empty form → Should show validation errors
3. Try invalid email → Should reject
4. Fill form properly → Should submit successfully

### ✅ Test Navigation
1. Click all nav links (Home, Studio, Shop, Contact)
2. Verify pages load
3. Check mobile menu works (on phone)

### ✅ Test Links
Currently placeholders (`#`) - will add real URLs later:
- Music platform links (Spotify, Apple, YouTube)
- Social media links (IG, TikTok, Twitter)

### ✅ Check Vercel Logs
1. Submit test booking
2. Go to: https://vercel.com/logancooney/elcee-website
3. Click "Logs" tab
4. Look for: `✅ Booking processed:`
5. Verify booking details appear

**Expected log:**
```
✅ Booking processed: {
  name: "Test Name",
  email: "test@test.com",
  service: "Recording & Engineering",
  method: "console",
  timestamp: "2026-02-18T09:30:00.000Z"
}
```

---

## After Adding API Key

### ✅ Test Email Delivery
1. Submit real booking with your email
2. Check inbox (within 30 seconds)
3. Should receive professional HTML email

**Expected email:**
- Subject: "New Studio Booking: [Service Name]"
- From: bookings@elceethealchemist.com (if domain verified) OR onboarding@resend.dev
- Contains all booking details
- Professional formatting

### ✅ Test Customer Confirmation
1. Submit booking with different email
2. Customer should receive confirmation
3. Subject: "Studio Booking Request Received"

### ✅ Verify in Resend Dashboard
1. Go to: https://resend.com/emails
2. See sent emails list
3. Check delivery status
4. Verify no bounces

---

## Mobile Testing

### ✅ On Your Phone
1. Visit: https://elcee-website.vercel.app
2. Test all pages
3. Fill out booking form
4. Check responsive layout
5. Tap all buttons/links

**Common issues:**
- Text too small → Need to adjust font sizes
- Buttons hard to tap → Need larger touch targets
- Form fields awkward → Adjust spacing
- Images slow to load → Optimize image sizes

---

## Performance Testing

### ✅ Page Speed
1. Go to: https://pagespeed.web.dev/
2. Test: https://elcee-website.vercel.app
3. Should score 90+ on mobile/desktop

**If slow:**
- Optimize images
- Reduce bundle size
- Enable caching

### ✅ Load Testing
1. Have a friend submit booking
2. Verify you receive email
3. Check Vercel logs show both submissions

---

## SEO Testing

### ✅ Google Search Console
1. Add site: https://search.google.com/search-console
2. Verify ownership (Vercel DNS)
3. Submit sitemap: `/sitemap.xml`

### ✅ Meta Tags
1. Share site URL on social media
2. Check preview card shows correctly
3. Should show: Title, description, image

---

## Accessibility Testing

### ✅ Keyboard Navigation
1. Tab through site (no mouse)
2. Should be able to access everything
3. Form should be keyboard-friendly

### ✅ Screen Reader
1. Enable VoiceOver (Mac) or screen reader
2. Navigate site
3. Verify all content readable
4. Form labels should be clear

---

## Error Testing

### ✅ Network Issues
1. Turn off wifi mid-form submit
2. Should show helpful error message
3. Turn wifi back on, retry

### ✅ Invalid Inputs
- Very long names (500+ chars) → Should handle gracefully
- XSS attempts (`<script>alert('test')</script>`) → Should sanitize
- SQL injection attempts → Should be safe (we don't use SQL)

### ✅ API Failures
1. Temporarily break API key
2. Submit booking
3. Should fallback to console logging
4. User still sees success message

---

## Real-World Testing

### ✅ Friend Test
1. Send link to someone who doesn't know tech
2. Ask them to book a session
3. Watch for confusion
4. Note any UX issues

### ✅ Different Browsers
- Chrome ✅
- Safari ✅
- Firefox ✅
- Edge ✅

### ✅ Different Devices
- iPhone ✅
- Android ✅
- iPad ✅
- Desktop ✅

---

## What to Look For

**🚨 Red Flags:**
- Emails not arriving (check spam)
- Form doesn't submit
- Pages load slowly
- Broken images
- Links don't work
- Mobile layout broken

**✅ Good Signs:**
- Emails arrive in <30 seconds
- Form submits smoothly
- Pages load fast
- Everything works on mobile
- No console errors

---

## When Everything Works

**You should have:**
✅ Live website  
✅ Working booking form  
✅ Email notifications  
✅ Customer confirmations  
✅ Professional appearance  
✅ Mobile-friendly  
✅ Fast loading  

**Then you can:**
1. Share the link publicly
2. Add to Instagram bio
3. Use in email signatures
4. Promote for studio bookings
5. Start taking real clients!

---

**Questions? Issues?** Let me know and I'll help troubleshoot.
