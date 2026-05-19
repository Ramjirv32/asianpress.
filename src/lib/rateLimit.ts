// Simple in-memory rate limiting map: IP -> array of request timestamps (numbers)
const ipCache = new Map<string, number[]>();

export function isRateLimited(ip: string): boolean {
  const now = Date.now();
  const oneMinuteAgo = now - 60 * 1000;

  // Get timestamps for this IP
  let timestamps = ipCache.get(ip) || [];

  // Filter out timestamps older than 1 minute
  timestamps = timestamps.filter(ts => ts > oneMinuteAgo);

  // Check if count exceeds 3
  if (timestamps.length >= 3) {
    return true;
  }

  // Add new timestamp and update cache
  timestamps.push(now);
  ipCache.set(ip, timestamps);
  return false;
}
