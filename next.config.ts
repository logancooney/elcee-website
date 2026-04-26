import type { NextConfig } from "next";

const securityHeaders = [
  { key: 'X-DNS-Prefetch-Control', value: 'on' },
  { key: 'X-Frame-Options', value: 'SAMEORIGIN' },
  { key: 'X-Content-Type-Options', value: 'nosniff' },
  { key: 'Referrer-Policy', value: 'strict-origin-when-cross-origin' },
  { key: 'Permissions-Policy', value: 'camera=(), microphone=(), geolocation=()' },
  {
    key: 'Content-Security-Policy',
    value: [
      "default-src 'self'",
      "script-src 'self' 'unsafe-inline' 'unsafe-eval' https://use.typekit.net https://assets.calendly.com https://va.vercel-scripts.com",
      "style-src 'self' 'unsafe-inline' https://use.typekit.net",
      "font-src 'self' https://use.typekit.net https://p.typekit.net",
      "img-src 'self' data: blob: https:",
      "frame-src https://calendly.com",
      "connect-src 'self' https://api.resend.com https://*.supabase.co https://calendly.com https://va.vercel-scripts.com",
    ].join('; '),
  },
];

const nextConfig: NextConfig = {
  async headers() {
    return [
      {
        source: '/(.*)',
        headers: securityHeaders,
      },
    ];
  },
};

export default nextConfig;
