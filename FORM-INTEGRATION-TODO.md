# Form Integration TODO

## Current State
Booking form collects data but only logs to console. Needs backend integration.

## Quick Solution: Email Notifications (1 hour setup)

### Option 1: Resend (Recommended - Simplest)
Free tier: 100 emails/day

```bash
npm install resend
```

Create `.env.local`:
```
RESEND_API_KEY=re_xxxxx
BOOKING_EMAIL=elcee.mgmt@gmail.com
```

Update `app/api/booking/route.ts`:
```typescript
import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(request: Request) {
  const data = await request.json();
  
  await resend.emails.send({
    from: 'bookings@elceethealchemist.com',
    to: process.env.BOOKING_EMAIL!,
    subject: `New Booking: ${data.service}`,
    text: `
      Name: ${data.name}
      Email: ${data.email}
      Phone: ${data.phone}
      Service: ${data.service}
      Date: ${data.date}
      Time: ${data.time}
      Message: ${data.message}
    `
  });
  
  return NextResponse.json({ success: true });
}
```

**Setup Steps:**
1. Sign up at resend.com
2. Verify domain `elceethealchemist.com` (add DNS records)
3. Get API key
4. Add to Vercel environment variables
5. Deploy

### Option 2: Google Sheets CRM (Better long-term)
Free tier: Unlimited (within reasonable usage)

```bash
npm install googleapis
```

**Setup:**
1. Google Cloud Console → Create project
2. Enable Google Sheets API
3. Create Service Account
4. Download JSON credentials
5. Create Google Sheet with columns: Timestamp, Name, Email, Phone, Service, Date, Time, Message
6. Share sheet with service account email (viewer/editor)
7. Add service account credentials to `.env.local`
8. Update API route to append to sheet

**Benefit:** All bookings in one spreadsheet, easy to manage, export, analyze

### Option 3: Hybrid (Best)
- Email notification for instant alerts
- Google Sheets for CRM/record keeping
- Auto-reply email to customer confirming receipt

## Recommended Implementation Order
1. **Day 1:** Resend email notifications (get bookings working ASAP)
2. **Week 1:** Add Google Sheets CRM (build client database)
3. **Month 1:** Add calendar integration (show real availability)
4. **Month 2:** Add payment integration via Shopify Buy Button

## Calendar Integration (Phase 2)
Once bookings are working, add calendar sync:
- Check Google Calendar for available slots
- Display only available times in booking form
- Auto-create tentative calendar events
- Require manual confirmation before finalizing

## Payment Integration (Phase 3)
Options:
1. **Manual:** Take payment in person or via bank transfer
2. **Shopify Buy Button:** Embed Shopify checkout for deposits
3. **Stripe:** Direct payment integration
4. **Square:** Good for in-person + online

**Recommendation:** Start manual, add Shopify Buy Button for deposits later

## Test Booking Form
Before going live, test:
- Required field validation
- Email format validation
- Form submission success/error states
- Email delivery
- Sheet writing (if using)
- Mobile responsiveness

## Customer Journey
1. Customer fills form → instant email to you
2. You receive notification → check calendar manually
3. Reply within 24hrs confirming availability
4. Send payment link or take deposit
5. Add to calendar as confirmed
6. Send reminder 24hrs before

Later (automated):
1. Form checks real-time availability
2. Customer selects only open slots
3. Auto-confirmation email sent
4. Payment collected upfront
5. Calendar auto-updated
6. Auto-reminders sent
