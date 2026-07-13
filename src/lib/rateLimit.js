const rateLimit = {
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 5, // Limit each IP to 5 requests per window for auth endpoints
  store: new Map(),
};

export function checkRateLimit(request) {
  // Get IP address from request
  const forwardedFor = request.headers.get('x-forwarded-for');
  const ip = forwardedFor ? forwardedFor.split(',')[0].trim() : 'unknown-ip';

  const now = Date.now();
  const record = rateLimit.store.get(ip) || { count: 0, resetTime: now + rateLimit.windowMs };

  if (now > record.resetTime) {
    record.count = 1;
    record.resetTime = now + rateLimit.windowMs;
  } else {
    record.count++;
  }

  rateLimit.store.set(ip, record);

  // Optional: Simple cleanup to prevent unbounded memory growth
  if (rateLimit.store.size > 10000) {
    for (const [key, value] of rateLimit.store.entries()) {
      if (value.resetTime < now) {
        rateLimit.store.delete(key);
      }
    }
  }

  return {
    success: record.count <= rateLimit.max,
    limit: rateLimit.max,
    remaining: Math.max(0, rateLimit.max - record.count),
    reset: record.resetTime
  };
}
