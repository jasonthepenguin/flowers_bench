import { Ratelimit } from "@upstash/ratelimit";
import { Redis } from "@upstash/redis";

// Create a new ratelimiter that allows 10 requests per 10 seconds
export const ratelimit = new Ratelimit({
  redis: Redis.fromEnv(),
  limiter: Ratelimit.slidingWindow(10, "10 s"),
  analytics: true,
  prefix: "@upstash/ratelimit",
});

// More restrictive rate limiter for sensitive operations
export const strictRatelimit = new Ratelimit({
  redis: Redis.fromEnv(),
  limiter: Ratelimit.slidingWindow(5, "1 m"),
  analytics: true,
  prefix: "@upstash/ratelimit/strict",
});

// Helper function to get client identifier
export function getClientIdentifier(request: Request): string {
  // Try to get the real IP from various headers
  const forwarded = request.headers.get("x-forwarded-for");
  const realIp = request.headers.get("x-real-ip");
  const vercelIp = request.headers.get("x-vercel-forwarded-for");
  
  // Prioritize Vercel's forwarded IP, then other headers, fallback to a default
  const ip = vercelIp || forwarded?.split(",")[0] || realIp || "anonymous";
  
  return ip;
}