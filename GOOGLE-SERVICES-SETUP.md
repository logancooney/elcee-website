# Google Services Setup Guide

**What I Built:** Google Sheets CRM + Google Calendar integration for the booking system.

**Why It Matters:**
- **Sheets:** All bookings in one place, easy to manage, track status, build client database
- **Calendar:** Show real availability, prevent double-booking, auto-create tentative events

---

## Part 1: Google Sheets CRM (30 mins)

### Step 1: Create Google Sheet (5 mins)

1. Go to: https://sheets.google.com
2. Create new sheet, name it: **"Studio Bookings"**
3. Rename the first tab to: **"Bookings"**
4. Add these column headers in row 1:

```
A: Timestamp
B: Name
C: Email
D: Phone
E: Service
F: Preferred Date
G: Preferred Time
H: Message
I: Status
J: Notes
```

5. Format columns:
   - A: Date & time format
   - I: Data validation → List: "New, Confirmed, Cancelled, Completed"

6. **Copy the Sheet ID** from URL:
   - URL looks like: `https://docs.google.com/spreadsheets/d/SHEET_ID_HERE/edit`
   - Copy the `SHEET_ID_HERE` part

### Step 2: Create Service Account (10 mins)

1. Go to: https://console.cloud.google.com/
2. Create new project (or select existing)
3. Enable Google Sheets API:
   - Search "Google Sheets API"
   - Click "Enable"
4. Create Service Account:
   - Navigate to: IAM & Admin → Service Accounts
   - Click "Create Service Account"
   - Name: `studio-bookings`
   - Click "Create and Continue"
   - Role: None needed (we'll grant direct sheet access)
   - Click "Done"
5. Create JSON key:
   - Click on the service account you just created
   - Go to "Keys" tab
   - "Add Key" → "Create new key" → JSON
   - Download the JSON file (keep it safe!)

### Step 3: Share Sheet with Service Account (2 mins)

1. Open the JSON file you downloaded
2. Find the `client_email` field (looks like: `studio-bookings@project-id.iam.gserviceaccount.com`)
3. Go back to your Google Sheet
4. Click "Share"
5. Paste the `client_email`
6. Give it **Editor** permissions
7. Uncheck "Notify people"
8. Click "Share"

### Step 4: Add to Vercel (5 mins)

1. Go to: https://vercel.com/logancooney/elcee-website/settings/environment-variables
2. Add these variables:

**GOOGLE_SHEETS_CLIENT_EMAIL:**
```
(paste client_email from JSON file)
```

**GOOGLE_SHEETS_PRIVATE_KEY:**
```
(paste private_key from JSON file - keep the quotes and \n characters)
```

**GOOGLE_SHEET_ID:**
```
(paste the Sheet ID from Step 1)
```

3. Redeploy: Deployments → Latest → ⋯ → Redeploy

### Step 5: Test It (5 mins)

1. Submit a test booking on your site
2. Check the Google Sheet
3. Should see a new row with all booking details
4. Status should be "New"

**Expected result:**
```
Timestamp          | Name          | Email             | ...
18/02/2026 09:45  | Test Customer | test@example.com  | ...
```

---

## Part 2: Google Calendar Integration (30 mins)

### Step 1: Enable Calendar API (5 mins)

1. Go to: https://console.cloud.google.com/
2. Same project as above
3. Search "Google Calendar API"
4. Click "Enable"

### Step 2: Create Calendar (Optional - 5 mins)

**Option A:** Use existing "Studio time" calendar
- Get the Calendar ID from settings

**Option B:** Create new dedicated calendar
1. Go to: https://calendar.google.com
2. Create new calendar: "Studio Bookings"
3. Settings → Integrate calendar → Copy "Calendar ID"

### Step 3: Grant Service Account Access (3 mins)

1. Open Google Calendar settings
2. Find your calendar (Studio time or Studio Bookings)
3. Settings and sharing
4. Share with specific people
5. Add the service account email (same as before)
6. Permission: **Make changes to events**
7. Send (don't notify)

### Step 4: Add to Vercel (2 mins)

**GOOGLE_CALENDAR_CREDENTIALS:**
```json
(paste entire contents of the JSON file from Part 1)
```

**GOOGLE_CALENDAR_ID:**
```
your-calendar-id@group.calendar.google.com
```

**Tip:** Make GOOGLE_CALENDAR_CREDENTIALS one line (no line breaks in the JSON)

### Step 5: Test It (5 mins)

1. Submit booking with date + time
2. Check your Google Calendar
3. Should see tentative event: `[TENTATIVE] Service Name - Customer Name`
4. Event should be marked as tentative (different color)

---

## What Happens Now

### When Someone Books:

**Without Google Services:**
- ✅ Email sent to you
- ✅ Customer confirmation sent
- ✅ Logged to Vercel
- ⚠️ You track manually

**With Google Sheets:**
- ✅ Email sent to you
- ✅ Customer confirmation sent
- ✅ **Saved to spreadsheet**
- ✅ Logged to Vercel
- ✅ You have a CRM!

**With Google Sheets + Calendar:**
- ✅ Email sent to you
- ✅ Customer confirmation sent
- ✅ **Saved to spreadsheet**
- ✅ **Added to calendar**
- ✅ Logged to Vercel
- ✅ Full booking system!

---

## Using the CRM

### Track Booking Status

**In Google Sheet:**
1. Find the booking row
2. Change Status column (I):
   - "New" → Just received
   - "Confirmed" → You confirmed the date/time
   - "Cancelled" → Client cancelled
   - "Completed" → Session finished

3. Add notes in Notes column (J):
   - "Paid £340 via bank transfer"
   - "Needs vocal tuning add-on"
   - "Repeat client - 10% discount"

### Filter & Sort

- **See only new bookings:** Filter Status = "New"
- **Find a client:** Search by name/email
- **Sort by date:** Sort Timestamp column
- **Export for taxes:** File → Download → CSV

### Analytics

Add formulas:
- Count total bookings: `=COUNTA(B2:B1000)`
- Count confirmed: `=COUNTIF(I2:I1000,"Confirmed")`
- Most popular service: `=MODE(E2:E1000)`

---

## Calendar Features

### Availability Checking (Future)

Next step: Show only available time slots in booking form
- Queries your calendar
- Shows only free slots
- Prevents double-booking
- Real-time availability

**Not built yet** - but the foundation is ready. Want me to add this?

### Managing Bookings

**In Google Calendar:**
- Tentative bookings are auto-created
- Color-coded (red = tentative)
- Contains client details in description
- Reminders set (1 day + 1 hour before)

**To confirm:**
1. Reply to client via email
2. Update calendar event:
   - Remove "[TENTATIVE]" from title
   - Change to regular event
   - Update to your default calendar color

**To cancel:**
1. Delete calendar event
2. Update Sheet status to "Cancelled"
3. Email client

---

## Troubleshooting

### Sheet not updating?

1. Check service account email is shared on the sheet
2. Verify GOOGLE_SHEET_ID is correct
3. Check Vercel logs for errors
4. Ensure credentials are valid JSON

### Calendar event not created?

1. Verify service account has calendar access
2. Check GOOGLE_CALENDAR_ID is correct
3. Ensure booking includes date + time
4. Check Vercel logs

### "Permission denied" error?

- Service account needs Editor permissions
- Both Sheet and Calendar must be shared
- Check credentials are not expired

---

## Cost

**Google Sheets API:** FREE (unlimited within reason)
**Google Calendar API:** FREE (unlimited within reason)
**Google Cloud Project:** FREE (no billing required for this usage)

**Total cost:** £0

---

## Security Notes

**Service Account Credentials:**
- Stored as Vercel environment variables ✅
- Not in code ✅
- Not in GitHub ✅
- Can be rotated if compromised ✅

**Access Level:**
- Service account can only access sheets/calendars you explicitly share
- Cannot access your entire Google account
- Can be revoked anytime

---

## Next Steps

**Priority 1 (Now):**
1. Set up Google Sheets CRM
2. Test booking flow
3. Familiarize yourself with the sheet

**Priority 2 (Later):**
1. Set up Calendar integration
2. Test tentative booking creation
3. Refine your workflow

**Priority 3 (Future):**
1. Real-time availability checking
2. Auto-confirmation workflow
3. Payment tracking in CRM

---

**Ready?** Start with Google Sheets (Part 1). It's the most useful and takes 30 mins total.

Let me know if you get stuck!
