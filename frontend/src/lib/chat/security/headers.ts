import { RateLimitResult } from "./rate-limiter";

export const RATE_LIMIT_HEADERS = {
  LIMIT: "X-RateLimit-Limit",
  REMAINING: "X-RateLimit-Remaining",
  RESET: "X-RateLimit-Reset",
  RETRY_AFTER: "Retry-After",
} as const;

export function buildRateLimitHeaders(
  maxRequests: number,
  result: RateLimitResult,
): Headers {
  const headers = new Headers();
  headers.set(RATE_LIMIT_HEADERS.LIMIT, maxRequests.toString());
  headers.set(RATE_LIMIT_HEADERS.REMAINING, result.remaining.toString());
  headers.set(
    RATE_LIMIT_HEADERS.RESET,
    Math.ceil(result.resetAt / 1000).toString(),
  );
  return headers;
}

export function buildRateLimitErrorHeaders(
  maxRequests: number,
  result: RateLimitResult,
): Headers {
  const headers = buildRateLimitHeaders(maxRequests, result);
  headers.set(
    RATE_LIMIT_HEADERS.RETRY_AFTER,
    Math.ceil((result.resetAt - Date.now()) / 1000).toString(),
  );
  return headers;
}
