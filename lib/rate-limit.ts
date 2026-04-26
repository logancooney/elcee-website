// Simple in-memory rate limiter — sufficient for a low-traffic site.
// Resets per serverless instance restart (that's fine).

const store = new Map<string, { count: number; windowStart: number }>();

export function rateLimit(key: string, maxRequests = 5, windowMs = 60_000): boolean {
  const now = Date.now();
  const entry = store.get(key);

  if (!entry || now - entry.windowStart > windowMs) {
    store.set(key, { count: 1, windowStart: now });
    return true; // allowed
  }

  if (entry.count >= maxRequests) {
    return false; // blocked
  }

  entry.count += 1;
  return true; // allowed
}

export function ipKey(request: Request): string {
  const fwd = (request as Request & { headers: Headers }).headers.get('x-forwarded-for');
  return fwd ? fwd.split(',')[0].trim() : 'unknown';
}
