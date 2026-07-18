export interface RateLimitResult {
  success: boolean;
  remaining: number;
  resetAt: number;
}

interface RateLimitEntry {
  count: number;
  resetAt: number;
}

export interface RateLimiter {
  check(ip: string): RateLimitResult;
}

function createRateLimiter(
  windowMs: number,
  maxRequests: number,
): RateLimiter {
  const store = new Map<string, RateLimitEntry>();

  // Intervalo de limpieza
  setInterval(() => {
    const now = Date.now();
    for (const [ip, entry] of store.entries()) {
      if (now > entry.resetAt) {
        store.delete(ip);
      }
    }
  }, windowMs);

  return {
    check(ip: string): RateLimitResult {
      const now = Date.now();
      const entry = store.get(ip);

      if (!entry || now > entry.resetAt) {
        // Nueva ventana
        const resetAt = now + windowMs;
        store.set(ip, { count: 1, resetAt });
        return { success: true, remaining: maxRequests - 1, resetAt };
      }

      if (entry.count >= maxRequests) {
        return { success: false, remaining: 0, resetAt: entry.resetAt };
      }

      entry.count++;
      store.set(ip, entry);
      return { success: true, remaining: maxRequests - entry.count, resetAt: entry.resetAt };
    },
  };
}

export const RATE_LIMIT_WINDOW_MS = 60_000; // 1 minuto
export const RATE_LIMIT_MAX_REQUESTS = 15; // 15 solicitudes por minuto por IP

export const rateLimiter = createRateLimiter(RATE_LIMIT_WINDOW_MS, RATE_LIMIT_MAX_REQUESTS);