#!/bin/bash

# Test booking form submission
# Usage: ./scripts/test-booking.sh [url]

URL=${1:-"http://localhost:3000"}

echo "🧪 Testing booking form at: $URL/api/booking"
echo ""

curl -X POST "$URL/api/booking" \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Test Customer",
    "email": "test@example.com",
    "phone": "07700900000",
    "service": "Recording & Engineering",
    "date": "2026-02-25",
    "time": "14:00",
    "message": "This is a test booking to verify the system works."
  }' \
  -w "\n\nHTTP Status: %{http_code}\n" \
  -s | jq '.'

echo ""
echo "✅ If you see success:true above, the form works!"
echo "📧 Check your email (if API key configured)"
echo "📝 Check Vercel logs: https://vercel.com/logancooney/elcee-website/logs"
